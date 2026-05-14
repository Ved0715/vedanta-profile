The phrase "multi-agent system" used to mean a research curiosity. In 2026 it is a production architecture, and the difference between a team that ships one and a team that ships one that *works* comes down to design discipline. This piece is the playbook I keep handy when designing them.

## What a multi-agent system actually is

A single-agent system is one LLM, one loop. It plans, reasons, calls tools, repeats. It is wonderful at narrow tasks and miserable at anything that needs *separation of concerns*. The moment you ask one model to do research, then write, then critique its own writing, then verify, you have built a single-agent system that is bad at all four jobs at once.

A **multi-agent system** decomposes those jobs across specialised agents — each with its own prompt, its own tools, its own memory — and coordinates them through an explicit protocol. Think of it as turning a one-person band into an engineering team. The team is slower per individual but dramatically better at sustained, high-quality output.

## Single agent vs multi-agent: when to upgrade

Stay single-agent when:

- The task is short, well-scoped, and within one model's working context.
- Latency matters more than quality. (Two hops cost a second each.)
- You don't need any kind of cross-checking or debate.

Move to multi-agent when:

- The task has **structurally distinct stages** (research → synthesise → critique → revise).
- A single context window can't hold all the relevant information.
- You need **specialisation** — e.g. a code agent that uses a different model than a writing agent.
- You want **independent failure modes**: one agent crashing shouldn't take the whole pipeline down.

## The canonical agent roles

Most production multi-agent systems converge on the same set of archetypes. Naming them up front saves arguments later.

- **Planner.** Decomposes the user goal into subgoals and emits a plan. Often a stronger reasoning model on a short prompt.
- **Researcher.** Gathers context — web search, internal RAG, database queries. Optimised for tool use, not synthesis.
- **Executor.** Does the actual work — writes code, drafts the email, runs the analysis. The "hands."
- **Critic.** Evaluates outputs against the plan and quality rubric. Catches hallucinations, missed requirements, broken code.
- **Memory agent.** Owns persistence — what to store, what to forget, what to retrieve when. Often the difference between a demo and a production system.

You don't always need all five. But naming the role first and the prompt second forces clean boundaries.

## Communication protocols between agents

This is where teams cut corners and pay for it later. There are three real options:

- **Direct message passing.** Agent A calls Agent B with a typed payload. Cheap. Tightly couples them.
- **Shared blackboard.** Every agent reads and writes from a common state object. Easy to introspect. Becomes a coordination nightmare past five agents.
- **Event bus.** Agents publish events to topics; subscribers react asynchronously. Decoupled, scales horizontally, harder to debug.

For most production systems, start with a shared blackboard and graduate to an event bus when you outgrow it. LangGraph's `StateGraph` is the canonical blackboard pattern; Kafka or Redis Streams underpin the event-bus version.

## Shared memory vs isolated memory

A subtle decision with big consequences:

- **Shared memory** — every agent sees the same context. Great for tight workflows. Risk: context bloat, prompt collisions.
- **Isolated memory** — each agent keeps its own context, communicates only via messages. Great for specialisation. Risk: agents lose situational awareness and re-derive things from scratch.

The hybrid that wins: **isolated working memory + shared long-term memory**. Each agent thinks privately, but writes to a common vector store / KV store that all agents can query.

## Task decomposition: planner patterns

A planner is only as good as the decomposition primitive it uses. Three patterns I see survive contact with production:

- **Sequential plan** — list of steps, executed in order. Brittle for anything non-linear.
- **DAG plan** — directed graph of steps with dependencies. Tools like LangGraph, Temporal, and AutoGen lean here.
- **Hierarchical plan** — top-level steps, each of which decomposes further on demand. Best for open-ended tasks; worst for predictability.

For 80% of business workflows a DAG is the right answer. Hierarchies are for research-style problems where you cannot enumerate steps up front.

## Agent negotiation and conflict resolution

When two agents disagree — and they will — your system needs an explicit resolution policy. The mature ones I see:

- **Critic-veto.** The critic's score is binary: pass or revise. The executor must comply.
- **Vote-based.** Three agents propose, majority wins. Used in research-grade systems for hallucination reduction.
- **Confidence-weighted.** Each agent emits a confidence score; the orchestrator picks the highest.
- **Human-in-the-loop fallback.** If agents disagree past N rounds, escalate to a human. Non-negotiable in regulated domains.

Pick one. Write it down. Without an explicit policy, the system has whichever resolution your most recent prompt accidentally implements.

## Real-world examples that ship today

- **Customer support.** Triage agent classifies; KB agent retrieves; response agent drafts; tone agent rewrites. Quality jumped ~20% over single-agent at scale.
- **Coding assistants.** Planner sketches changes; codegen agent writes; review agent runs tests and lints; PR agent opens the merge request. This is the architecture Devin-class systems use.
- **Autonomous research.** Question decomposed by a planner; multiple researchers fan out across sources; synthesiser combines; critic checks citations.
- **DevOps agents.** Monitoring agent watches signals; diagnosis agent forms hypotheses; remediation agent acts; postmortem agent writes it up.
- **At Meragi**, my 5-node BOM Chat is exactly this — a planner, a CRM-search agent, a warehouse-pricing agent, a guardrails agent, and a sourcing/critic agent. The split is what made it production-grade, not the model size.

## Event-driven orchestration

For systems that scale past handful-of-agents, synchronous orchestration breaks. Move to events:

- Each agent **subscribes** to topics it cares about.
- Each agent **publishes** its outputs as new events.
- The orchestrator becomes a *router*, not a *driver*.

This buys you:

- **Independent scaling** — slow agents get more workers, fast ones don't.
- **Replayability** — a recorded event stream can rebuild state.
- **Observability** — every transition is a log line, automatically.

Tools: Kafka, Redis Streams, NATS, Apache Pulsar.

## Async agent workflows

Synchronous "call agent A, wait for response, call agent B" is the wrong default. Most agent calls can happen in parallel. Treat the orchestrator like an async function:

```python
async def run_pipeline(user_query: str):
    plan = await planner.plan(user_query)
    research_tasks = [researcher.gather(s) for s in plan.steps]
    findings = await asyncio.gather(*research_tasks)
    draft = await executor.write(plan, findings)
    review = await critic.review(draft, plan)
    if not review.ok:
        draft = await executor.revise(draft, review.feedback)
    return draft
```

Parallel research alone usually cuts wall-clock time by 40–60%.

## Agent mesh architecture

The endgame is an **agent mesh** — many agents, many services, discovered dynamically. You'll see this when:

- You expose agents over MCP and let other agents discover them.
- Agents are deployable independently (each is its own service).
- A service-mesh layer (envoy, linkerd) handles retries, timeouts, observability for inter-agent traffic.

This sounds futuristic; it isn't. If you build agents at all in 2026, you should be designing toward it.

## Failure handling between agents

Three failure modes will hit you:

- **An agent times out.** Need: per-call timeout, retry-with-backoff, fallback agent.
- **An agent produces invalid output.** Need: schema validation (Pydantic, Zod), critic loop, hard-fail on N retries.
- **Two agents deadlock.** Need: max-rounds guard on the orchestrator, deterministic tie-breaking.

The single most useful pattern: **every agent call has a strict JSON schema for its output**. Invalid output is treated as a failure, retried with a "your last response was invalid because X" prompt. This alone eliminates 80% of mysterious pipeline hangs.

## The toolbox in 2026

- **LangChain / LangGraph.** State-graph based. Great for medium-complexity DAGs.
- **CrewAI.** Role-based; good for sequential team workflows.
- **Microsoft AutoGen.** Conversation-based agents; strong for research-style tasks.
- **Semantic Kernel.** Microsoft's enterprise-flavoured orchestrator.
- **Temporal.** Not agent-specific but the workflow engine of choice for durable, long-running flows.
- **Ray.** When you need to scale agents across a cluster.
- **Redis Pub/Sub / Kafka.** The event-bus backbone.

Pick the smallest tool that fits. The biggest mistake I see is reaching for Kafka on day one.

## The takeaway

Multi-agent systems are not magic. They are software architecture with a new primitive — an agent — that happens to be probabilistic. Treat them like distributed systems: name your roles, type your messages, version your protocols, and instrument the whole thing.

The teams that win in 2026 aren't the ones with the biggest models. They're the ones whose agent meshes have the cleanest interfaces.
