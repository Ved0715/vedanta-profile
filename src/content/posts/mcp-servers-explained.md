If you only read the spec, **MCP** sounds like a pedestrian addition to the LLM tooling story: a JSON-RPC protocol for hooking models up to tools. Useful, sure. But the spec hides the actual point. MCP matters because it solves the *organisational* problem of tool use, not the technical one.

This post is the version of "what is MCP and how do I build one" I wish I'd had on day one.

## What MCP actually is

A **Model Context Protocol server** exposes three kinds of capability to a client (your agent, IDE, or LLM application):

- **Resources** — readable context, like files, database rows, or API responses.
- **Tools** — callable functions the model can invoke with typed arguments.
- **Prompts** — reusable prompt templates the host can dispatch to a model.

The protocol is just JSON-RPC over stdio or HTTP. There is no magic. The interesting part is that *anyone* can run an MCP server and *any* client that speaks MCP can use it. Tools become portable across hosts the way HTTP made services portable across clients.

## Why the protocol matters more than the spec lets on

In a pre-MCP world, every agent framework reinvents tool plumbing. LangChain has its `Tool`. AutoGen has its function registry. Custom shops write yet another decorator. Each one is incompatible with the others, every team writes its own glue, and the "tool ecosystem" is mostly a wishlist.

MCP standardises the **wire protocol**, not the language. That is a huge unlock:

- A Notion MCP server written in Python can be called from a Claude desktop app, a VS Code extension, and a Python agent — without changing one line of code.
- Your enterprise's internal database, internal RAG, and internal logging stack each become a server. Compose them.
- Tools become **versioned** and **discoverable**, because the protocol says so.

The protocol is JSON-RPC because nobody needed to invent something new. The point isn't the bytes. The point is the convention.

## Your first MCP server

Let's build a minimal one in Python that exposes a single tool: `search_docs`. The official SDK is the easiest path.

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("docs-server")

@mcp.tool()
async def search_docs(query: str, top_k: int = 5) -> list[dict]:
    """Search internal docs for the query and return top_k matches."""
    results = await vector_store.search(query, k=top_k)
    return [{"title": r.title, "snippet": r.snippet, "url": r.url} for r in results]

if __name__ == "__main__":
    mcp.run()
```

That's the whole server. Register the binary in your MCP-aware host (Claude desktop, your custom agent, etc.) and the tool shows up automatically.

## Async agentic flows over MCP

Where it gets interesting is composing many servers behind a single agent loop. Your agent doesn't need to know what kind of system it's calling — only that the MCP server speaks the protocol. This means tool dispatch can be:

- **Async** — multiple tools fire in parallel, with proper backpressure.
- **Typed** — every tool publishes a JSON schema. Bad arguments fail loud, fast.
- **Auditable** — every call has a request/response on the wire. Trace it.

The same async loop I built for our production MCP server handles SQL, RAG, and web APIs through a single router. Each is a separate MCP server. The agent doesn't care.

## Where to go next

- Write a server for your internal vector DB. It's the highest-leverage starting point.
- Add a `resources` endpoint for your codebase. Suddenly any MCP client can read it.
- Wrap your CI/CD pipeline. Now your agent can deploy.
- Read the [official MCP docs](https://modelcontextprotocol.io/) for the wire-level details.

The protocol is small. The implications are not. Build one tool today, expose it, and watch what happens when your agent doesn't need glue code to use it.
