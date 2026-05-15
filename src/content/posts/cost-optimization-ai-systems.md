There's a moment in every AI product's life where Finance walks over with a printout and asks, very quietly, what is happening. The bill is 4× the projection. The CFO is unsmiling. Welcome to the cost conversation.

This post is the operational playbook for taking a runaway AI inference bill and making it predictable, without sacrificing the parts of quality that users actually feel.

## Why AI systems become expensive in non-obvious ways

Three independent forces compound:

- **Tokens add up.** A 4K-token prompt × 10,000 daily users × 30 days = 1.2 billion tokens per month. At meaningful per-million-token prices, that's real money.
- **Latency-vs-cost tradeoffs are inverted.** Faster models are *cheaper* — but smaller models hallucinate more, which trigger retries, which cost *more*. The cheap path isn't always cheaper.
- **Every product feature adds inference.** "Auto-summarise" adds a call. "Suggest next action" adds a call. "Polish the user's draft" adds a call. The bill grows multiplicatively.

If you're not tracking cost per request, you don't know where the bill is going. That's the first move.

## Token economics: know what you're paying for

Three numbers matter:

- **Input tokens per call.** Includes system prompt, retrieved context, conversation history.
- **Output tokens per call.** Often dwarfed by input but priced higher per token.
- **Calls per task.** A single user action can fan out to 10 agent calls.

Track these per feature, per model, per user tier. Build a dashboard. Without one, every optimisation is guesswork.

A useful metric: **dollars per user per month (DPU)**. When DPU is rising and revenue per user isn't, you have a problem.

## Prompt optimisation: low effort, high return

The system prompt is paid for on *every* call. Pruning it has compound returns:

- **Remove redundancy.** Two sentences that say the same thing become one.
- **Move examples to function-call schemas.** A well-described tool with a schema doesn't need three examples in the prompt.
- **Externalise long-tail content.** Move FAQ-style content into retrieval; don't stuff it into the system prompt.
- **Use shorter delimiters.** Custom XML-style tags can save tokens versus verbose markdown.
- **Compress with abbreviations** for stable jargon ("SOP" instead of "Standard Operating Procedure" once defined).

20–40% prompt-token reduction is common after a careful pass. That's free money.

## Output token control

Output tokens cost 3–5× input tokens on most providers. Optimise:

- **Tight schemas.** Structured outputs (JSON schema, Pydantic, Zod) prevent the model from wandering.
- **Explicit length budgets.** "Respond in at most 3 sentences" is cheap to add and often respected.
- **Stop sequences.** When the answer naturally ends with a particular token, set it as a stop sequence.
- **Streaming + early termination.** For interactive UX, stream tokens and let the user terminate. Surprisingly effective for long-form content.

## Caching: the highest-leverage cost lever

Three layers of cache that I always have:

### Embedding cache

Identical text → identical embedding. Hash and cache. Saves embedding model calls, which are cheap individually but happen on every request.

### Retrieval result cache

The same query, in the same session, with the same filters, yields the same results. Cache for a few minutes. Surprisingly impactful for chat-style UIs where users iterate.

### Semantic cache

The big one. If a new query is semantically near a previous one (cosine similarity > 0.97), return the previous answer. Tools: GPTCache, Redis with vector indexing, Langfuse with cache integration.

Hit rates of 30–60% are realistic on FAQ-shaped traffic. Each hit saves a full LLM call. At scale this is the difference between a healthy bill and a problematic one.

### Prompt prefix cache

Several providers (Anthropic, OpenAI, Google) now offer **prompt caching** — the system prompt and other fixed prefixes are cached on their side. Hits are 80–90% cheaper. If you have a long system prompt and many calls, enable it. Free margin.

## Response compression

Sometimes the cheapest call is the one you don't make:

- **Cache summaries.** For each document or session, store a pre-computed summary. Use it as context instead of re-summarising.
- **Lazy retrieval.** Don't pull context until you know you need it. Tool-based RAG (the agent decides when to retrieve) is often cheaper than always-retrieve RAG.
- **Aggregate batched calls.** When processing N items, sometimes one batched call with all N items is cheaper than N calls. Provider batch APIs are even cheaper for non-interactive workloads.

## Model routing: small models for small jobs

A counterintuitive cost lever: **don't use your biggest model for everything**. Route by task:

- **Classification** ("is this user complaint angry?") → small fast model. Often 50× cheaper than the big one.
- **Extraction** ("pull out the date from this text") → small model with structured output.
- **Routing** ("is this question billing or technical?") → smallest available.
- **Reasoning / synthesis** → big model.
- **Code generation** → big model with code optimisation.

A router function dispatches based on task type. Pareto rule applies: 80% of calls don't need GPT-class reasoning, and routing them away cuts the bill substantially without hurting quality.

## Small-model delegation

The mature form: the big model calls smaller models as *tools*. "Classify this with the cheap classifier; if confidence > 0.9, use that answer; otherwise reason about it myself."

This is genuinely subtle to implement well — you need calibration data to set the confidence threshold — but the cost wins are large. We've seen 30–50% inference cost reductions on classification-heavy workloads.

## Inference batching

When the workload is not strictly real-time, batch:

- **Embeddings.** Embed 100 chunks in one call instead of 100 calls.
- **Classifications.** Score 50 items in one call.
- **Batch APIs.** Most providers offer batch endpoints at 50% the cost for non-real-time workloads. Asynchronous, ~24h SLA. Perfect for nightly re-indexing, analytics, training data prep.

The discipline: tag every workload as either "interactive" (needs real-time) or "non-interactive" (batchable). Route non-interactive to batch APIs.

## Dynamic context windows

Don't pay for tokens you don't need:

- **Trim conversation history** aggressively. Most "remember everything" prompts retain context far beyond what the current turn actually needs.
- **Drop tool-call outputs** from history once you've extracted the relevant facts.
- **Summarise older turns** as you go, replacing them in the context.
- **Use streaming summarisation** — every N turns, the system summarises and prunes.

A 12K-token conversation that's been intelligently compressed to 3K tokens costs 75% less per call and is often *higher quality*, because the model isn't drowning in detail.

## Semantic caching, done properly

The single most impactful cost intervention for chat workloads. The mechanics:

1. Compute embedding of the new query.
2. Search a small vector index of "cached query → cached answer" pairs.
3. If top result cosine > threshold (often 0.95–0.98), return the cached answer.
4. Otherwise, run normally. Cache the new (query, answer) pair.

Two failure modes to design against:

- **False positives.** A similar-but-not-equivalent query returns the wrong cached answer. Mitigations: high threshold, exclude personalised queries (anything with user-specific names/numbers), invalidate cache aggressively when knowledge base updates.
- **Stale answers.** Answers in cache may have been correct yesterday but wrong today. Mitigations: TTL, content-version invalidation, periodic re-validation.

When tuned well, semantic cache hit rates on customer support / FAQ workloads exceed 50%. Every hit is a saved LLM call.

## Multi-model architectures

The frontier: orchestrating across model providers, not just within one. Reasons:

- **Per-task best model.** Anthropic for analysis, OpenAI for tool use, Google for long context, a local Llama for routing. Each is best at something.
- **Provider diversity.** Resilience to outages, rate limits, and price changes.
- **Workload-shape arbitrage.** Pick the cheapest provider for *this particular* prompt shape.

The cost of multi-provider is real (more SDKs, more secrets, more tracing surfaces). For high-spend systems, the savings dwarf the cost.

## Cost observability

What to dashboard:

- **Tokens in / tokens out / dollars** per request type, per model, per user, per feature.
- **Cache hit rate** at each cache layer.
- **Retry rate** — high retries mask quality problems and inflate cost.
- **Per-feature dollars per day.** Catch the feature that suddenly tripled overnight.

Tools: Helicone, Langfuse, LangSmith, OpenLLMetry, your own dashboards over OpenTelemetry. Pick one. Run it from day one.

## GPU utilisation (for self-hosted)

If you self-host models, GPU utilisation is the cost lever:

- **Batching at inference time.** vLLM, TGI (Text Generation Inference), TensorRT-LLM all batch concurrent requests. Throughput per dollar improves 5–10×.
- **Quantisation.** 4-bit or 8-bit quantised models lose < 2% quality typically and cut memory + cost dramatically.
- **Speculative decoding.** A small "draft" model proposes tokens; the big model verifies. 2–3× speedup on many workloads.
- **KV-cache optimisation.** Tools like PagedAttention (vLLM) make long-context inference dramatically cheaper.

Self-hosting is rarely cheaper than API providers for general traffic — providers' batching across many customers is brutal to compete with. Self-host when you have specific privacy, latency, or fine-tuning requirements that justify it.

## AI FinOps: the discipline emerging

In 2026, "AI FinOps" is becoming a real role at large companies. The job: predict, monitor, and optimise AI infrastructure spend.

Practices:

- **Per-team budgets** with alerts.
- **Cost attribution** by feature, team, customer cohort.
- **Forecast vs actual** monthly review.
- **Quality-cost Pareto curves** — when a model is too expensive, what's the cheapest model with acceptable quality?

If you're spending six figures monthly on inference, this role pays for itself many times over.

## The takeaway

AI cost optimisation is unsexy infrastructure work that compounds. Track every dollar. Cache aggressively. Route to small models. Batch what you can. Compress prompts ruthlessly. Stream and terminate early. Measure constantly.

The teams winning in 2026 on margin aren't the ones with the cleverest prompts. They're the ones whose dashboards make the bill predictable — and whose architectures keep it that way as they scale.
