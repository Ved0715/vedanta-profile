Every AI agent demo I've ever seen looked great. Then it went to production. Then it fell over.

This post is the operational playbook for taking the agent from "works on my laptop" to "serves 10,000 users at a known latency SLO." It is the architecture I keep redrawing on whiteboards for teams who just had their first traffic spike.

## Why prototypes fail in production

A demo runs as a single Python process. The LLM call is the only latency cost. There's one user. Memory fits in RAM. Errors get printed to the terminal.

Production has none of those properties:

- **Concurrent users.** Hundreds, then thousands, then tens of thousands.
- **Variable inference latency.** A 200ms call yesterday is a 4s call today.
- **Cascading failures.** One tool times out → agent retries → other agents stall → queue depth explodes.
- **Cost.** Inference at scale is the budget. Get this wrong and you don't have a business.
- **Observability.** A `print()` does not help when 1,200 agents are running simultaneously.

The architecture has to assume failure, variability, and concurrency from day one. Bolting them on later is a year of suffering.

## Five problems you'll hit, in order

1. **Latency.** Single agent takes 8 seconds. Users abandon.
2. **Cost.** Bill is 4× what you projected because no caching.
3. **Hallucinations.** You can't tell if outputs are wrong until they make it to a user. No eval gate.
4. **Context overflow.** A 50-turn conversation blows past the model's window. Agent breaks mid-task.
5. **Rate limiting.** Provider rate limits hit at exactly the wrong time. You have no fallback.

Each of these has an architectural answer. None of them have a "smarter prompt" answer.

## Stateless vs stateful agents

The single biggest architectural fork.

**Stateless** agents take all the context they need on every call. State lives in the database, the cache, or the request itself. Trivially horizontally scalable. Easy to reason about. The default choice unless you have a reason.

**Stateful** agents keep in-memory state — a long-running conversation, a working canvas, a partially-built plan. Faster per-call, but harder to scale, harder to recover from crashes, and pinned to a specific worker (sticky sessions or session-affinity load balancing).

**Default: stateless.** Move state to Redis or Postgres. Recover instantly on worker failure. Only go stateful when you measurably can't tolerate the load+save latency.

## Horizontal scaling

The shape that works:

- **Stateless API layer** (FastAPI / Express) — handles auth, request validation, routes to a queue.
- **Worker pool** — pulls from queue, runs the agent loop, writes results back.
- **Queue** — Redis Lists, Celery, RabbitMQ, or SQS depending on durability needs.
- **State store** — Redis for session memory, Postgres for durable conversation history.
- **Vector store / RAG** — separate service, also horizontally scaled.

When traffic spikes, you add workers. When traffic falls, you remove workers. The API is fronted by autoscaling. The whole thing fits on Kubernetes or a managed equivalent.

## Queue-based processing

Don't process agent requests inside the HTTP request lifecycle past about 2 seconds. Queue them.

```
POST /agent/query
  → validate
  → enqueue {request_id, payload}
  → return {request_id, status: "queued"}

worker:
  pull from queue
  run agent
  write result to Redis with TTL=10min, keyed by request_id
  publish "done" to user channel (websocket or SSE)
```

Three reasons this is right:

1. **Resilience.** API restart doesn't kill in-flight requests.
2. **Backpressure.** When the queue grows, you see it. You scale workers or shed load.
3. **Priority lanes.** Free-tier in one queue, paid-tier in another, internal in a third. Each gets its own SLO.

## Async orchestration

The agent loop itself should be async, end to end. Synchronous code wastes seconds waiting for tools that could have run in parallel.

```python
async def run_agent(query: str):
    plan = await planner.plan(query)
    # All research tasks fire in parallel
    research = await asyncio.gather(*(researcher.run(s) for s in plan.steps))
    draft = await executor.draft(plan, research)
    review = await critic.review(draft)
    return draft if review.ok else await executor.revise(draft, review)
```

A fully async agent loop is typically 40–60% faster end-to-end than the same logic synchronously.

## API gateways

You will not put your worker pool on the open internet. The gateway gives you:

- **Authentication and authorisation.** Without leaking to every agent.
- **Rate limiting per user/key/tier.**
- **Request logging.** Every prompt, every response.
- **Response transformation.** Strip provider artefacts, normalise errors.
- **Provider failover.** When OpenAI is down, switch to Anthropic. The gateway is where this lives.

Run Nginx, Envoy, or a managed gateway (AWS API Gateway, Cloudflare, Kong) in front of every agent system.

## Worker systems

A worker is just a process that pulls from the queue and runs the agent. The interesting bit is everything around it:

- **Concurrency per worker.** Async means one worker can run dozens of agents concurrently. Right number is workload-specific; benchmark.
- **Crash semantics.** Worker dies → message returns to queue → another worker picks it up. The agent must be idempotent enough not to do bad things if the request is retried.
- **Heartbeats.** Long-running agents must heartbeat to the queue; otherwise the broker thinks they crashed and double-delivers.
- **Graceful shutdown.** On deploy, the worker stops pulling new work but finishes its current task before exiting. Critical for in-flight conversations.

## Background task queues: Celery, RQ, Sidekiq-equivalents

For Python: **Celery** when you need scheduling, retries, chord/group primitives, and have a few thousand jobs/sec or more. **RQ** when you want simplicity. **arq** for an async-first option. **Temporal** when you need durable, long-running workflows that survive restarts — increasingly the choice for agent orchestration that runs for minutes or hours.

Don't roll your own. The amount of correctness work in a queue you didn't write is the entire reason to use one.

## Caching strategies

Caching is the cheapest performance win. Three layers I always have:

- **Embedding cache.** Same text → same embedding. Hash the text; key the cache by hash. Saves model calls and money.
- **Retrieval cache.** Same query + same filters within a session → same retrieval. Short TTL (1–5 min).
- **Response cache.** Identical prompt + identical context → identical response. Useful only for deterministic, non-personalised flows.
- **Semantic cache.** *Nearly* identical prompts → reuse the answer if cosine similarity > threshold. Cuts inference cost dramatically on FAQ-style traffic. Tools: GPTCache, Redis with vector ext.

Cache hit rates of 30–60% in production are normal once the cache warms.

## Distributed tracing

Without tracing you cannot debug a multi-agent pipeline. Period.

- **Trace ID** propagated through every agent call, tool call, LLM call.
- **Span per LLM call**, span per tool invocation, span per memory read.
- **Latency and token counts** on every span.
- **Errors and retries** as events.

Tools: OpenTelemetry as the standard. Backends: Tempo, Honeycomb, Datadog APM, Phoenix (specifically for LLM tracing), Langfuse, LangSmith.

When the on-call engineer is paged at 3am, a clean Honeycomb trace lets them find the failing tool in 30 seconds. Otherwise it's 30 minutes.

## Observability beyond traces

Three signals matter:

- **Latency histograms** per agent, per tool, per LLM call. P50, P95, P99.
- **Cost per request.** Tokens in, tokens out, dollars per query. Tracked over time.
- **Quality metrics.** Eval scores on production samples. Otherwise you're flying blind on regressions.

Build a per-agent dashboard with these three on day one. Update it as the agent evolves.

## The infrastructure stack

The current production-ready toolkit:

- **Kubernetes** — orchestration. Don't fight it.
- **Docker** — packaging. One image per service.
- **Redis** — short-term state, queues, semantic cache.
- **Celery / RQ / arq / Temporal** — task processing.
- **Kafka / RabbitMQ / NATS** — event streams between agents.
- **FastAPI** — Python API layer. Async by default. The right tool 95% of the time.
- **Nginx / Envoy** — gateway.
- **PostgreSQL + pgvector** — durable state and vector retrieval when you don't need a dedicated vector DB.
- **Pinecone / Weaviate / Qdrant** — when you do.
- **OpenTelemetry + Langfuse / LangSmith** — tracing.
- **GitHub Actions / GitLab CI** — deploy automation.

This stack scales from 10 RPS to 10,000 RPS without architectural change.

## The takeaway

Scaling agents is distributed systems engineering with an LLM at the end of every span. The shape is: stateless API → durable queue → worker pool → tiered state and cache → observability everywhere.

Get this architecture right on day one. The model can change. The framework can change. The architecture has to stay.
