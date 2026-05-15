For three years "RAG" has been the default answer to "how do we ground LLMs in our data." It worked. It still works. But it has a ceiling, and in 2026 the teams pushing past that ceiling are doing something distinct enough to deserve its own name: **agentic RAG**.

This post walks through the spectrum from naïve RAG to agentic RAG, with the real numbers from production systems, and where each one belongs.

## Traditional RAG: the architecture

The classic pipeline:

1. Chunk documents.
2. Embed each chunk.
3. Store in a vector database.
4. At query time, embed the question and retrieve top-k similar chunks.
5. Stuff the chunks into the prompt and ask the model.

It's elegant. It works for FAQ-style questions. It has carried more production AI features than any other pattern. It is also, in 2026, increasingly the floor — not the ceiling — of what users expect.

## The limitations of static RAG

Five places traditional RAG hits a wall:

- **Single-shot retrieval.** One query, one retrieval. If the answer requires synthesising info from multiple disjoint documents, you either retrieve enough chunks to cover all of them (drowning the model) or you miss some (wrong answer).
- **Query-document mismatch.** Users ask "what's our cancellation policy" — your doc says "Subscription Termination Provisions." Naive embeddings miss it. You need rewriting.
- **No reasoning about retrieval quality.** The retrieved chunks are taken at face value. If retrieval failed, the model hallucinates confidently.
- **Static ranking.** Cosine similarity decides everything. There's no consideration of *recency*, *authority*, or *context fit*.
- **No multi-hop.** "What was the revenue impact of the policy change we made after the legal review?" Three hops. Static RAG retrieves chunks about one of them, at best.

## What "agentic RAG" actually means

Agentic RAG replaces single-shot retrieval with **a small agent that reasons about retrieval itself**. The agent can:

- Rewrite the query.
- Decompose it into sub-queries.
- Call retrieval multiple times.
- Choose between retrieval sources (this corpus vs that corpus vs web).
- Decide it has enough information to answer, or that it needs more.
- Verify retrieved content against the question before generating.

In practice it looks like a small loop. The "outer" model is the user-facing one; an inner retrieval-agent decides what to fetch and from where. Many production systems use the *same* model for both, with a different prompt and tool surface.

## Query planning agents

The first useful piece. Instead of embedding the user's question verbatim, a planning agent inspects it and emits a plan:

```text
User: "What changed in our pricing between Q3 and Q4, and what was the customer reaction?"

Plan:
  1. Retrieve pricing-policy docs from Q3.
  2. Retrieve pricing-policy docs from Q4.
  3. Diff them.
  4. Retrieve customer-feedback signals from Q4.
  5. Synthesise.
```

Each plan step becomes a retrieval call with its own targeted query. The synthesis step is the final LLM call. Latency is higher than single-shot, but quality is dramatically better.

## Multi-hop reasoning

Where multiple retrievals chain. The output of retrieval N becomes input to retrieval N+1. Classic example: "Who signed the contract with the vendor that we replaced last year?"

- Hop 1: retrieve "which vendor did we replace last year?" → "Acme Corp."
- Hop 2: retrieve "who signed the contract with Acme Corp?" → "Jane Smith, Dec 2023."

Static RAG cannot do this. Agentic RAG does it naturally. The cost: each hop is a retrieval call + an LLM step.

## Query rewriting

A small, fast model rewrites the user's question before retrieval. The rewrites are tuned to the corpus's vocabulary. Examples:

- "what's our refund policy" → "subscription cancellation and reimbursement terms"
- "can I get more storage" → "plan upgrade options storage tier"
- "the thing about taxes" + recent context "European customer" → "VAT treatment European customers"

A query rewriter that's been fine-tuned on your corpus is the single highest-ROI rerank you can build. The lift is typically 5–15 points of recall on hard queries.

## Search orchestration

When you have multiple retrieval sources, an orchestrator decides which to call:

- Internal docs corpus.
- Customer-support knowledge base.
- Codebase index.
- Public web search.
- A SQL database.

The orchestrator routes — sometimes in parallel — and merges results. Routing can be a small classifier, a learned ranker, or a planning agent's explicit choice.

## Context ranking

Once you have N candidates from multiple sources, you must rank them. Beyond cosine similarity:

- **Cross-encoder rerank** — the cheapest big win. 30–80ms per call, 9+ point quality gain typically.
- **Recency weighting** — `score *= exp(-age / tau)`. Old policy docs lose to current ones.
- **Authority weighting** — official docs outrank Slack messages.
- **Context-fit scoring** — does this chunk *contradict* something else we've retrieved? Is it self-consistent with the user's recent context?
- **Diversity penalty** — penalise near-duplicates. Three near-identical chunks waste budget.

## Hybrid retrieval

Combine dense (vector) and sparse (BM25/TF-IDF) search. Almost always wins over either alone, because:

- Sparse catches exact keyword matches that dense misses ("Form W-2", "Section 230").
- Dense catches paraphrases that sparse misses.
- Reciprocal-rank-fusion (RRF) is the standard merge.

In production I always run hybrid. The extra implementation cost is one Elasticsearch / Lucene node and a 50ms merge. The quality gain is consistently meaningful.

## Knowledge graphs + RAG

When relationships matter as much as content, layer a graph on top of vectors:

- Vectors find candidate chunks.
- Graph traversal finds related entities.
- Combine for context-aware retrieval.

Example: "find prior litigation involving any subsidiary of company X". Vector search misses. Graph traversal nails it: `Company X --owns--> Subsidiary Y --party_to--> Case 123`.

See the knowledge-graphs post for the full architecture.

## Advanced architectures

The frontier patterns showing up in production:

### GraphRAG

Microsoft's published pattern (and several open-source implementations). The idea: pre-process the corpus to extract entities and relationships, build a graph, and use the graph at retrieval time to identify *communities* of related content. Better at synthesis questions ("what's the company's stance on X") than vector RAG.

Worth using when:

- Your corpus has natural entities (people, products, events) and relationships.
- Users ask broad questions whose answer requires "what does the corpus collectively say about X."

Not worth it when your corpus is FAQ-shaped and users ask pointed questions.

### Multi-vector retrieval

Instead of one embedding per chunk, store *several* — title embedding, body embedding, hypothetical-question embedding (HyDE-style). Retrieve against the right vector for the query type.

Especially effective for product catalogs, where the title and description need different treatment.

### Recursive retrieval

The agent retrieves, summarises, and decides whether to retrieve more. The loop continues until the agent declares it has enough or a budget trips. Pairs well with hierarchical document trees (retrieve summary → if relevant, retrieve children).

### Self-reflective retrieval agents

A two-model loop: a retrieval model fetches; a critic model evaluates "is this enough to answer the question?" If no, the retrieval model re-tries with a different query or source. Self-RAG and CRAG (Corrective RAG) are research-published variants. Production teams build their own simpler versions.

## The latency tradeoff

Agentic RAG is slower than static RAG. Plan for it.

- Static RAG: typically 200–600ms end-to-end.
- Agentic RAG with one rewrite + rerank: 600–1200ms.
- Agentic RAG with planning + multi-hop + critic: 2–5s.

For chat UX, 5s is the ceiling before users start to abandon. Mitigations:

- **Stream** the first token early — display the plan or "searching..." status.
- **Parallelise** all independent retrievals.
- **Cache** at every layer (query embeddings, retrieval results, rerank scores).
- **Skip the agentic loop for easy queries** — a router can detect "this is a simple question, just do static RAG."

## When to choose which

**Static RAG** is right when:

- The corpus is small or homogeneous.
- Questions are pointed and well-scoped.
- Latency budget is tight (< 1s).
- You're starting and want a quick baseline.

**Agentic RAG** earns its complexity when:

- The corpus is large and heterogeneous (multiple sources, formats, time ranges).
- Questions are open-ended or multi-hop.
- Users tolerate 2–5s for noticeably better answers.
- Accuracy matters more than throughput.

Most production systems blend both — fast path for easy queries, agentic path for hard ones.

## The takeaway

Static RAG is a baseline, not a destination. Add a rewriter, then a reranker, then a planner. Each step is a measurable lift in quality at a measurable cost in latency.

The teams shipping the best retrieval in 2026 are not the ones with the fanciest vector DB. They're the ones who treat retrieval as a sequence of decisions an agent makes, and engineer each decision deliberately.
