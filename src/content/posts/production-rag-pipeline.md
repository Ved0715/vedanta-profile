Everyone has a toy RAG demo. Almost nobody has one that holds up under production load with messy enterprise documents. **Here's what actually moved the needle for our pipeline at AIVI** — and what I'd tell my past self when starting.

## Why RAG is harder than it looks

The hello-world version of retrieval-augmented generation is famously easy: chunk a doc, embed it, throw it in a vector store, retrieve top-k, stuff the chunks into a prompt. **It works on a Paul Graham essay.** It does not work on a 200-page insurance contract with nested tables, footnotes, and three different definitions of "premium."

When we started, our baseline was at 71% extraction accuracy on real customer docs. Eight weeks later we were at 95%+. None of the moves that got us there were clever. All of them were boring. That's the lesson.

> The biggest single accuracy gain came from a 200-line file I wrote on a Tuesday afternoon. The eval set.

## Chunking is the entire ballgame

If you only do one thing differently, change your chunking. The default — split every 512 tokens with 50 overlap — destroys semantic units. A table gets sliced. A list of definitions ends mid-bullet. Your embeddings end up looking at fragments that mean nothing alone.

### Three rules that worked

1. **Respect document structure.** Headings, tables, and lists are signals. Parse them first, chunk inside them second.
2. **Variable chunk size.** A definition needs ~100 tokens. A procedural section needs ~800. One fixed number is wrong everywhere.
3. **Preserve parent context.** Every chunk gets a small header noting the section it came from. Cheap, drastically improves retrieval.

Here's roughly what our chunker looks like, simplified:

```python
def chunk_document(doc: Document) -> list[Chunk]:
    sections = parser.parse_sections(doc)
    chunks = []
    for section in sections:
        # adapt size to section type
        size = 100 if section.kind == "definition" else 800
        for part in split_semantically(section.text, size):
            chunks.append(Chunk(
                text=f"[{section.title}]\n\n{part}",
                meta={"section": section.title},
            ))
    return chunks
```

## Reranking is not optional

Vector similarity is a coarse signal. It will happily put a near-duplicate of your query at rank 1 even when the actually-useful chunk is at rank 8. The fix is a reranker — a cross-encoder model that scores `(query, chunk)` pairs directly.

We use a two-stage approach: retrieve top-30 with the vector store (fast), rerank those with a cross-encoder, take top-5 (accurate). The cost is one ~50ms model call. The accuracy gain was nine points on our eval set. It is the single biggest "boring" lever in the entire pipeline.

## Build the eval set on day one

I delayed this for two weeks because it felt like "non-production code." That was a mistake. The first day we had a real eval set with 80 hand-labeled queries-and-correct-answers, we went from *flying blind* to *shipping deliberate changes*. Every PR now ran the eval. Every chunking tweak had a measurable verdict.

You don't need anything fancy. A JSON file of `{question, expected_answer, source_chunk_id}` tuples is enough to start. Add to it every time you find a failure case in prod.

## The boring win: caching everywhere

The biggest latency win was not a smarter index or a faster model. It was a Redis layer caching three things: embedding lookups, reranker scores, and full LLM responses keyed by retrieved chunks. P95 went from 2.4 seconds to under a second.

You will get a cache hit rate around 60% in production once you've been running for a week. That's free latency. Take it.

## What I'd build next

The next leg is observability. Today our traces tell us *what* retrieved-and-failed. They don't tell us *why*. I want a UI where, for every failed query in production, I can see the top-30 retrieval candidates with reranker scores, the embedding similarity heatmap, and which chunks the LLM *actually attended to*.

That's the next post. If you're building something similar, [drop me a line](/#contact) — I love comparing notes.
