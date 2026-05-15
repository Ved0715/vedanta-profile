If you've shipped vector search at scale, you've seen its blind spot: it finds chunks that *sound* like the query but it doesn't *understand* relationships. "Who reports to Jane's manager?" — vector search either finds "Jane" or finds "manager" but won't answer the question. Knowledge graphs do.

This post is the practical guide to combining knowledge graphs and AI agents — what they buy you, when to use them, and how to wire the two together without either eating the other.

## Why vector search alone is insufficient

Vector search excels at *semantic similarity*. It collapses when:

- The question requires **traversal** — "what acquisitions did the parent company of X make last year?"
- The answer requires **counting** — "how many engineers report to this VP?"
- Entities have **disambiguation** issues — three people named John Smith, one company called "Apple."
- You need **set operations** — "show me customers who bought A but not B."
- The corpus encodes **schema** — relational data already structured.

These aren't fuzzy problems. They have right answers. A vector store guesses; a graph database knows.

## Knowledge graphs in 60 seconds

A knowledge graph encodes:

- **Nodes** — entities (people, products, events, documents).
- **Edges** — typed relationships between entities (`reports_to`, `owns`, `mentions`, `authored`).
- **Properties** — attributes on nodes and edges.

You query it with a graph query language — Cypher (Neo4j), Gremlin (Apache Tinkerpop), SPARQL (RDF) — that lets you say things like "find all employees whose manager's manager is in the executive team."

The mental model is "the corpus, indexed by structure rather than content."

## Entity relationships as a first-class signal

When you ingest a document into a knowledge graph, you don't store the document. You extract:

- The **entities** mentioned (people, organisations, products, dates).
- The **relationships** asserted (Alice manages Bob; Acme acquired Beta in 2023).
- The **statements** as edges with the source document as provenance.

This is the *graph extraction* step. It's done with NER (Named Entity Recognition), relation extraction, or — increasingly — LLMs prompted to emit structured graph triples.

Once the graph exists, you can query the *structure* of your domain without ever re-reading the source documents.

## Graph traversal

The reason graphs are useful: traversal is cheap. Cypher example:

```cypher
MATCH (p:Person {name: "Jane Smith"})
      -[:REPORTS_TO]->(m:Person)
      -[:REPORTS_TO]->(grandboss:Person)
RETURN grandboss.name
```

Two hops, instant answer. Vector search would need to embed the query, retrieve docs about Jane, hope a doc mentions her manager, retrieve docs about that manager, hope they mention *their* manager. Brittle.

## Context-aware reasoning

The unlock for agents: when the agent needs context that's *structural*, it queries the graph; when it needs context that's *prose*, it queries the vector store. The agent decides which based on the question.

Practical pattern: tool-based routing. The agent has two retrieval tools:

- `semantic_search(query)` — vector store.
- `graph_query(cypher)` — knowledge graph.

The agent's system prompt explains when each is appropriate. For simple cases, a small classifier model can route automatically.

## Hybrid vector + graph systems

The best architectures use both. Three patterns:

### Vectors retrieve, graph enriches

Vector search returns candidate chunks. For each chunk, look up the entities it mentions in the graph. Pull the entities' attributes and 1-hop neighbours. Stuff the enriched context into the prompt.

Useful when the question is "what does the corpus say about X" but the model also needs structured facts about X.

### Graph retrieves, vectors verify

The agent uses graph queries to identify candidate documents/entities. Then vector search retrieves *snippets* about those candidates. Lower hallucination because the structural part is exact.

Useful for entity-centric questions ("everything we know about customer Y").

### GraphRAG: communities, then text

Microsoft's pattern. Pre-process: extract entities and relationships, run community detection on the graph. Each community gets a generated summary.

At query time:

1. Identify which communities are relevant.
2. Use the community summaries (high-level) for broad questions.
3. Drill into specific entities and their documents for specific questions.

Especially effective on questions like "what are the major themes in this corpus" — pure vector RAG struggles; GraphRAG handles it naturally.

## Building the graph: extraction pipelines

The hardest part is *getting good graph data out of unstructured docs*. The modern recipe:

1. **Parse** the document into text + structure (sections, tables, lists).
2. **NER** to identify entities. Tools: spaCy, Flair, or LLM-based.
3. **Resolve** entities — match "Apple Inc.", "Apple", "AAPL" to a single canonical entity. This is hard. Embedding-based clustering helps; humans-in-the-loop are still common.
4. **Extract relationships** with a relation-extraction model or LLM. Prompt: "List all (subject, predicate, object) triples in this passage."
5. **Validate** — schema-check the triples (the predicate must be one of N allowed; objects must be of the right type).
6. **Write** triples to the graph with source document as provenance.

The single highest-leverage decision: *constrain the schema*. Define the entity types and relationship types you care about. Reject triples that don't fit. An open-world graph becomes a quagmire fast.

## Neo4j integration: the practical stack

For most teams, Neo4j is the right starting point:

- Mature query language.
- Solid Python and JavaScript drivers.
- Graph-aware embeddings (Neo4j now supports vector indexes on nodes).
- Decent open-source story; managed cloud (Aura) for ops simplicity.

A workable architecture:

```
Document ingest pipeline
  → text + entity/relation extractor
  → Neo4j (graph) + Pinecone/pgvector (chunks)
  → both indexed with shared document_id

Agent retrieval
  → routing decision (graph or vector or both)
  → execute → merge → rerank → prompt
```

Cypher queries return entity IDs. Use those IDs to filter vector retrieval. Use vector retrieval to find docs that mention those entities. The two stores are joined by entity_id, document_id, or chunk_id.

## Ontologies: the discipline you'll resist

An ontology is a schema for your graph — what entity types exist, what relationships are allowed, what properties each has. Teams skip this because it sounds bureaucratic.

The teams that skip it end up with graphs full of `Person--RELATES_TO--Thing` edges that nobody can query.

Even a small ontology (5 entity types, 10 relationship types) imposes the discipline needed for queries to be expressive. Schema.org and Wikidata are reference points; design your own subset.

## Relationship-aware retrieval

A retrieval pattern that's hard to replicate without a graph:

> "Find documents that mention any product owned by a competitor of our top customer."

That's three hops. With a graph:

```cypher
MATCH (us:Company {name: "Us"})-[:CUSTOMER]->(c:Company)
       <-[:COMPETITOR]-(comp:Company)
       -[:OWNS]->(p:Product)
       <-[:MENTIONS]-(d:Document)
WHERE c.tier = "top"
RETURN DISTINCT d
```

Then take those documents, vector-retrieve the relevant chunks, send to the LLM.

This is the pattern that makes knowledge graphs *worth* the implementation cost. Without it, you're paying for infrastructure that only serves one-hop queries you could have done with vectors.

## Use cases that genuinely need this

### Enterprise search

Large org corpus — hundreds of teams, thousands of docs, complex org chart, shifting product portfolios. The structural questions matter as much as the content questions. Knowledge graphs are common in enterprise search products for exactly this reason.

### Cybersecurity

Threat intel is fundamentally relational — actors, indicators, infrastructure, campaigns, victims. Graph DBs are the dominant pattern in security tooling (Splunk, MITRE ATT&CK, modern XDR systems).

### Research assistants

Academic literature has a rich graph — papers cite papers, authors co-author, methods build on methods. A research agent over a graph can answer "what are the seminal papers in this method's lineage" in a way a vector store cannot.

### Recommendation systems

E-commerce, content platforms. The graph of user-product-tag-category is fundamentally graph-shaped. Adding agent reasoning over the graph unlocks recommendations that aren't just "similar items" but "items that complete this set."

### Healthcare

Patient histories are deeply relational — conditions, medications, procedures, providers. Knowledge graphs over EHRs are growing rapidly. Agents on top of them are early but coming.

## When NOT to use a knowledge graph

- Your corpus is small (< a few thousand docs).
- Questions are pointed and fact-shaped.
- Latency budget is tight.
- You don't have the engineering capacity to maintain extraction pipelines.

Vector RAG plus good rerank handles most "find me the answer in these docs" workloads. Don't add a graph because it's fashionable. Add it when the *questions you're seeing in production* are structurally graph-shaped.

## The toolbox in 2026

- **Neo4j** — production default. Cypher is great.
- **TigerGraph** — strong at scale-out graph analytics.
- **Amazon Neptune** — when you're already AWS-heavy.
- **Memgraph** — fast, real-time graph operations.
- **NetworkX** — Python in-memory for prototyping.
- **Llama Index Graph** — opinionated GraphRAG-style abstractions.
- **Spacy + DSPy** — entity/relation extraction.
- **LangChain GraphQAChain** — convenient adapter for LLM-over-graph.

Don't pick a tool first. Pick the *questions* you want to answer first. The tool falls out.

## The takeaway

Knowledge graphs are not a replacement for vector RAG. They're a complement. The agent picks the right tool for the question. Structural questions go to the graph; semantic questions go to the vectors; complex questions use both.

Build the graph for the questions your users actually ask. Constrain the schema ruthlessly. Maintain the extraction pipeline. The payoff is queries that vectors alone simply cannot answer — and a retrieval layer that feels noticeably smarter to users.
