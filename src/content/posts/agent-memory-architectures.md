Memory is the most under-engineered part of every AI agent I've ever audited. Teams obsess over which model to use, which framework to pick, which prompt template to copy from Twitter — and then handle memory with a `list` they push messages onto. Then they wonder why their agent forgets what the user said three turns ago, or contradicts itself, or "hallucinates" facts it learned in the same session.

This piece is the architecture guide I wish existed when I started building memory layers for production agents.

## Why memory matters more than the model

Consider what an LLM does without memory: every turn, it sees the same fixed context window and emits a probability distribution over tokens. That's it. *Everything* you'd call "knowledge," "personality," "preferences," or "history" is something you handed it inside that context. The model is stateless. Memory is the system around it.

Upgrading from GPT-4 to a hypothetical GPT-5 buys you maybe 10–20% in reasoning quality. **Upgrading your memory layer from "list of messages" to a proper hierarchical store buys you 2–5× in user-perceived usefulness.** Different orders of magnitude.

## The five kinds of memory worth distinguishing

Cognitive science calls these out for a reason. They map cleanly onto engineering primitives:

- **Short-term memory.** The current conversation. Lives in the prompt. Bounded by context window. Wiped between sessions unless you persist it.
- **Working memory.** Active intermediate state during a single task. The agent's "scratch pad" — running plan, partial results, current hypothesis. Often stored on a blackboard, not in the prompt.
- **Episodic memory.** Recollections of specific past events ("last Tuesday the user asked about pricing"). Time-stamped, retrieval-keyed by recency and topic.
- **Semantic memory.** Generalised knowledge ("this user is on the Pro plan; their preferred channel is email"). Schemaful where possible. Updated via consolidation, not append.
- **Long-term memory.** The union of episodic + semantic, persisted indefinitely. Stored externally — vector store, graph DB, relational store, or a mix.

A real agent uses all five. They live in different data stores. They have different write paths and different retrieval policies.

## Vector databases: the foundation, not the architecture

Vector DBs (Pinecone, Weaviate, Chroma, pgvector, FAISS) are the obvious building block for long-term memory. Embed it, store it, retrieve by similarity. Necessary but not sufficient.

The mistake teams make: treating the vector store as *the* memory. Cosine similarity is a recall mechanism; it is not a memory model. Without a layer above it, you get:

- **Recency bias inverted.** Yesterday's irrelevant message might score higher than today's relevant one.
- **No semantic deduplication.** The same fact stored ten times will dominate retrieval.
- **No forgetting.** The store grows unbounded; retrieval quality decays.
- **No metadata reasoning.** Vector search alone can't answer "what did we agree on in last week's session?"

Use vector DBs as one tier in a hierarchy, not the whole hierarchy.

## Retrieval strategies that actually work

Top-k cosine retrieval is the baseline. Production memory layers compound it:

- **Hybrid retrieval.** Combine dense (embedding) search with sparse (BM25 / keyword) search. Re-rank with a cross-encoder. Catches both fuzzy and exact-match recall.
- **Time-decayed scoring.** Multiply similarity by a `decay(t)` factor — typically exponential — so older memories yield to newer ones unless they're a strong match.
- **Metadata filters.** Always filter by user, session, or topic *before* vector search. Cuts the search space by 1000× in multi-tenant systems.
- **Query rewriting.** A small model rewrites the user's question into a retrieval-friendly version before searching. Embeddings of "thx for the help yesterday btw what was that thing" retrieve nothing useful. Rewrite it first.

## Context compression

You will run out of context window. Plan for it.

- **Conversation summarisation.** Every N turns, summarise the last M turns into a single paragraph. Replace the raw turns in the prompt. Free.
- **Selective retention.** Keep the system prompt + last 3 turns + a summary of everything older.
- **Importance scoring.** A side model rates each message's "importance" (0–10). High-importance messages survive compression; low-importance ones merge into summaries.
- **Outline + recall.** Maintain a structured outline of what's happened ("topics discussed, decisions made, open questions"). Recall any specific detail from long-term memory only when needed.

The right compression strategy depends on what your agent needs to remember. A pair-programming agent needs *every* code edit. A customer-support agent only needs *what was promised*.

## Memory pruning: the discipline most teams skip

Memory that never forgets becomes memory that can't recall anything. Decide your forgetting policy explicitly:

- **TTL-based.** Anything older than X days gets archived or deleted.
- **Importance-based.** Below-threshold memories age out faster.
- **Consolidation.** Multiple related memories merge into a summary; the originals are dropped.
- **Cap + LRU.** Hard cap on memory size; least-recently-retrieved entries evict.

A useful prompt to a side model: "Given these 10 memories, which are still useful for the user's current goals? Which can be consolidated? Which can be discarded?" Run it nightly. It works.

## Memory ranking and reranking

A great trick: when retrieving from long-term memory, return many candidates (top-50), then rerank with a cross-encoder against the *current* query + recent context. Sounds expensive; isn't. Cross-encoder reranking adds 30–80ms and routinely moves the right answer from rank 12 to rank 1.

This is the single biggest memory-quality lever after vector retrieval itself.

## RAG pipelines as the spine

Long-term memory in 2026 is essentially RAG, but turned inward. The user's data is the corpus. Their past conversations are the documents. The agent's job is to retrieve from *itself*.

A production memory pipeline looks like this:

```
Write path
  raw event → enricher (entity extraction, timestamps)
            → importance scorer
            → embedder
            → write(metadata + vector + raw) to memory store

Read path
  query → query rewriter
        → metadata filter (user/session/topic)
        → hybrid search (dense + sparse) → top-50
        → cross-encoder rerank → top-5
        → optional summarisation → injected into prompt
```

Every arrow is a place to optimise. Most teams stop at "embedder → vector store → top-k." That's the demo. Everything before and after the arrows is where production lives.

## Hybrid memory systems

The architecture I keep returning to:

- **Working memory:** in-process state object (Python dict, blackboard).
- **Short-term episodic:** Redis with TTL. Last N messages keyed by session.
- **Long-term episodic:** Postgres + pgvector. Time-stamped, user-scoped.
- **Long-term semantic:** A structured store — Postgres, MongoDB, or a knowledge graph. User attributes, learned preferences, decisions made.
- **External facts:** Vector store over your knowledge base / docs.

Each tier has its own write path, its own retrieval, its own retention. The agent reads from all of them in parallel and the orchestrator decides what to put in the prompt.

## Hierarchical memory

A pattern from the long-context literature that works well in practice: organise memory into a tree.

- **Leaves** are raw events.
- **Internal nodes** are summaries of their children.
- **Root** is a one-paragraph précis of everything.

Retrieval starts at the root and descends only where relevance scores warrant. This gives you "skim or zoom" semantics — cheap retrieval for high-level questions, deep retrieval for specific ones.

Frameworks like MemGPT, Letta, and various research systems implement variants of this. You can roll your own with three Postgres tables.

## Latency optimisation

Memory retrieval will become the dominant latency in your agent. Optimise mercilessly:

- **Cache embeddings.** The user's last message is probably nearly identical to one you've embedded recently. Cache by content hash.
- **Cache retrieval results.** For session-scoped memory, the same query in the same session yields the same results.
- **Asynchronous writes.** Never block on memory writes. Push to a queue; consumer writes downstream.
- **Pre-fetch during reasoning.** While the LLM streams its first 200 tokens, kick off the next likely retrieval.
- **Co-locate the vector store with your app.** A network round trip to a managed vector DB in another region is a P99 you do not need.

## Token-efficient memory retrieval

You can have all the memory in the world; it doesn't matter if it doesn't fit in the prompt. Tactics that move the needle:

- **Retrieve the answer, not the source.** A summariser can compress 5 chunks into 1 paragraph that costs 10× fewer tokens.
- **Structured returns.** Return `{name, value}` JSON, not prose. The model reads it equally well and you save 50% on tokens.
- **De-duplicate.** Always. Cross-encoders happily return five variants of the same fact.
- **Budget enforcement.** Pre-allocate a token budget per memory tier ("short-term: 1500 tokens, long-term: 2000 tokens, facts: 1000 tokens"). Truncate intelligently.

## Persistent agent memory across sessions

The frontier today is agents that *carry* memory across sessions — i.e. real long-term memory, not just session-scoped. The recipe:

1. Tag every memory with `user_id`.
2. At session start, load the user's *semantic profile* (preferences, key facts) into the prompt unconditionally.
3. Make episodic recall *opt-in* via tool call ("recall_past_session(topic)") so the model only pays for it when needed.
4. Update the semantic profile on every session end via a consolidation pass.

This pattern is what makes agents feel like they "know" you across weeks. It's also the most subtle privacy surface — see the security post for what to lock down.

## The toolbox

- **Pinecone, Weaviate, Chroma, Qdrant** — managed vector stores. Pinecone if you want zero ops; Qdrant/Weaviate if you want more control.
- **pgvector** — Postgres extension. Use this when you already run Postgres and don't need extreme scale. Underrated.
- **Redis** — short-term session memory, TTL-based caches. The unsung hero.
- **Letta / MemGPT** — opinionated long-term memory frameworks. Worth studying even if you build your own.
- **Neo4j** — when relationships matter (see the knowledge graphs post).

## The takeaway

Memory is the most under-engineered piece of agent stacks today, and it's the highest-leverage place to invest engineering effort. Build a real hierarchy. Decide what to forget. Rerank, don't just retrieve. Measure latency at every stage.

An agent with a great memory layer on a mediocre model beats a mediocre memory layer on a great model. Every single time.
