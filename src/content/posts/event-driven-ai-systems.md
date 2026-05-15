Most agent systems start synchronous. A user makes a request, the orchestrator drives a chain of agent calls, and a response comes back. This works wonderfully — up to a point. The point arrives somewhere between "10 concurrent users" and "an internal-facing workflow that takes 90 seconds to complete." At that point, the synchronous model cracks.

The answer is to flip the architecture: instead of the orchestrator calling agents, agents react to *events*. This post is the operational guide to event-driven AI systems.

## Why synchronous agents drown at scale

Three problems compound:

- **Head-of-line blocking.** One slow tool call stalls the whole pipeline. Other agents that could have made progress are idle, holding a connection.
- **Tight coupling.** Adding a new agent means modifying the orchestrator. Removing one means a code change. Every system change touches the hottest code path.
- **No replay.** When something fails, there's no recording of what happened. You re-run from scratch and hope it's the same.

Event-driven architecture (EDA) directly addresses each.

## Event-driven systems in 30 seconds

An event-driven system has three primitives:

- **Producers** — emit events when something happens ("user uploaded a doc", "lead score updated", "an alert fired").
- **Bus** — durable channel that stores events and delivers them.
- **Consumers** — subscribe to event types and react.

Agents are consumers. They react to events, do work, and emit new events. The bus is the spine.

## Reactive agents

A reactive agent is one whose entrypoint is a *subscription*, not an API call. Typical signature:

```python
@subscribe("ticket.created")
async def triage_agent(event: TicketCreatedEvent):
    classification = await classify(event.body)
    await publish("ticket.classified", {
        "ticket_id": event.ticket_id,
        "category": classification,
    })
```

The agent doesn't know who called it. It doesn't know what comes next. It reacts to "ticket created" and produces "ticket classified." The orchestration emerges from the chain of events.

## Async pipelines

The same shape applied to longer flows:

```
upload.created → extractor agent → text.extracted
text.extracted → classifier agent → doc.classified
doc.classified → router agent → either
  doc.routed.fast_path or doc.routed.slow_path
slow_path → expert agent → doc.processed
fast_path → simple agent → doc.processed
doc.processed → notifier agent → user.notified
```

Each step is independent. Each step has its own scaling policy. Each step's logic lives in one place.

## Architecture: event buses

The bus is the most important decision. Three families:

- **Log-based** — Kafka, Redpanda, Apache Pulsar. Durable, replayable, scales to millions of events/s. The right choice when events have business value beyond immediate processing.
- **Queue-based** — RabbitMQ, AWS SQS, Redis Streams. Lighter weight, simpler operations. Good for "task queue with publish/subscribe."
- **Pub/Sub** — Redis Pub/Sub, NATS, Google Pub/Sub. Fastest, ephemeral. Good when missing an event is acceptable.

For agent systems I default to **Kafka or Redpanda** when the system has > 3 agents and any of them might benefit from replay. For simpler systems, **Redis Streams**.

## Pub/Sub patterns

Three patterns recur:

- **Topic per event type.** `ticket.created`, `ticket.classified`, etc. Subscribers pick what they care about.
- **Fan-out.** One event, multiple consumers. The bus duplicates. Different agents process the same event for different purposes.
- **Competing consumers.** One topic, multiple worker instances of the same agent. The bus delivers each message to exactly one worker. Horizontal scaling for one agent role.

These compose. A typical system uses all three.

## Streaming systems

When events arrive faster than agents can process individually, **stream processing** becomes relevant. Frameworks like Flink, Kafka Streams, or Materialize let you express transformations on the event stream as code, with stateful operators (windows, joins, aggregates).

Use cases for agents on streams:

- **Anomaly detection** — agent triggered when a metric stream crosses a threshold.
- **Rolling summarisation** — agent maintains a continuously updated summary of an event stream.
- **Aggregation-then-action** — accumulate signals, then act when a rule fires.

## Webhooks

The external-facing analog. Your system exposes a webhook endpoint. External services push events. A handler translates the webhook payload into your internal event format and publishes to the bus.

Pattern that I find essential:

```
POST /webhooks/github
  → verify signature
  → translate to internal event {type, payload, source: "github"}
  → publish to bus
  → return 200 immediately

agent subscribes to "github.push" events and acts asynchronously
```

This decouples webhook *receipt* from webhook *processing*. The external service gets a fast 200; your system handles the work at its own pace.

## Distributed messaging: the durability question

For agentic systems, durability matters more than throughput. A user-uploaded document that gets lost mid-pipeline is worse than a slow pipeline.

Rules:

- **Producer acks.** The producer waits for the broker to confirm receipt. Most brokers can do this with sync flush.
- **Consumer acks after commit.** The consumer processes the event, *then* commits to the broker. If the consumer crashes mid-processing, the event is re-delivered.
- **Dead-letter queues.** Events that fail repeatedly go to a DLQ for human review.
- **Outbox pattern.** Producers write the event to a database transactionally with the business state, then a separate process publishes from the outbox. Prevents lost events when the producer crashes between DB commit and broker publish.

These are not optional. Agent systems that handle real workflows must implement them.

## Real-world example: fraud detection

A common deployment pattern:

```
transaction.created → enrichment agent (adds context) → transaction.enriched
transaction.enriched → in parallel:
  ↳ rule-engine agent → maybe transaction.flagged
  ↳ model-scoring agent → transaction.scored
flagged|scored above threshold → review agent → transaction.reviewed
transaction.reviewed → action agent → either approve, hold, or escalate
```

Each agent specialises. Each runs at its own latency. The system scales by adding workers to the bottleneck stage. New rules become new subscribers, not edits to the orchestrator.

## DevOps monitoring agents

Another canonical EDA agent system:

```
log.line → log-classifier agent → log.classified
metric.threshold_breach → alerts.fired
alerts.fired → triage agent → incident.diagnosed_initial
incident.diagnosed_initial → in parallel:
  ↳ historical-context agent (look up past similar incidents)
  ↳ deployment-context agent (what shipped recently)
both → root-cause agent → incident.root_cause_hypothesised
hypothesis confirmed → remediation agent → either auto-fix or open ticket
```

The agents are reactive. The on-call engineer sees the unfolding chain in their incident channel. The system handles the boring 80% of incidents automatically.

## AI observability for event-driven systems

Three layers of observability matter:

- **The event log.** Browse by event type, time range, correlation ID. Critical for debugging.
- **Agent traces.** Within an agent's processing of one event, a trace shows tool calls, LLM calls, latencies. OpenTelemetry-compatible.
- **Causal chains.** Across agents, a correlation ID propagates so you can see "this transaction went through these 6 events across these 4 agents."

Tools: Datadog APM, Honeycomb, Tempo, Langfuse, Phoenix Arize.

The single most useful instrumentation: **every event carries a `causation_id` and a `correlation_id`**. Causation = the event that caused this one. Correlation = the original event that started the chain. With these two fields, you can reconstruct any flow.

## Incident response agents

A specific class of reactive agent worth highlighting: agents that wake up on alerts and start the diagnostic loop. The architecture:

1. Alert fires → event published.
2. Triage agent classifies severity.
3. Context agents (in parallel) gather:
   - Last 24h of deploys.
   - Related metrics.
   - Similar past incidents.
   - Service dependency map.
4. Hypothesis agent forms 2–3 ranked candidates.
5. Verification agent runs read-only checks against each.
6. Synthesis agent posts a structured summary to the incident channel.

Result: an on-call engineer who joins the incident has a written-up working hypothesis waiting. Mean time to first useful action drops by half or more in the deployments I've seen.

## Technologies in 2026

The current operational stack:

- **Kafka / Redpanda** — durable event log. The default for serious systems.
- **RabbitMQ** — when you want classic queue semantics with simple ops.
- **Redis Streams** — light, fast, single-node story; great for small systems.
- **NATS** — ultra-low-latency pub/sub, increasingly used for inter-service comms.
- **Apache Pulsar** — when you need geo-replication built in.
- **Temporal** — durable workflows that interop with event-driven agents.
- **Materialize / Flink / Kafka Streams** — stream processing.
- **OpenTelemetry + Langfuse / Honeycomb** — observability.

Don't reach for Kafka on day one if you don't need it. Redis Streams will get you to a few thousand events/s with one server. Migrate when you outgrow it.

## The takeaway

Event-driven architectures are the right scaling answer for agent systems that need to be reactive, durable, and decoupled. They cost more upfront in tooling and discipline. They pay back at scale, when the operational properties — replay, dead-letter, fan-out, independent scaling — start mattering more than raw throughput.

The pattern: synchronous to start, event-driven once it earns its complexity. Have the migration sketched in your head from day one so the move isn't a rewrite.
