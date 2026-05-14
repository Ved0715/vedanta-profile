import type { Post } from "@/types";

/**
 * SINGLE SOURCE OF POST METADATA.
 *
 * To add a new post:
 *   1. Append a new object to this array.
 *   2. Create `src/content/posts/<slug>.md` with the body in plain markdown.
 *      The TOC, heading IDs, and reading order are generated automatically.
 *
 * No code changes anywhere else are needed.
 */
export const posts: Post[] = [
  {
    slug: "multi-agent-collaboration-systems",
    title: "Multi-Agent Collaboration Systems: How AI Agents Coordinate Like Engineering Teams",
    description:
      "How real multi-agent systems work in production — agent roles, communication protocols, shared memory, conflict resolution, and the orchestration patterns that hold them together.",
    excerpt:
      "What an agent mesh actually is, how planners, executors and critics talk to each other, and why event-driven orchestration beats hand-rolled glue every time.",
    publishedAt: "2026-05-14",
    publishedLabel: "May 14, 2026",
    readingTime: 14,
    tags: [
      { label: "Multi-Agent", tone: "accent" },
      { label: "LangGraph", tone: "purple" },
      { label: "Architecture", tone: "green" },
    ],
    featured: true,
  },
  {
    slug: "agent-memory-architectures",
    title: "Agent Memory Architectures: Building AI Systems That Actually Remember",
    description:
      "Short-term, long-term, episodic, semantic. Why memory matters more than the model, how to design hybrid hierarchies, and the retrieval tricks that keep latency low without trashing recall.",
    excerpt:
      "Why memory matters more than the model, how to design hybrid hierarchies, and the retrieval tricks that keep latency low without trashing recall.",
    publishedAt: "2026-05-13",
    publishedLabel: "May 13, 2026",
    readingTime: 13,
    tags: [
      { label: "Memory", tone: "accent" },
      { label: "RAG", tone: "purple" },
      { label: "Vector DB", tone: "green" },
    ],
    featured: false,
  },
  {
    slug: "scalable-agent-infrastructure",
    title: "Designing Scalable AI Agent Infrastructure for Production",
    description:
      "Why agent prototypes fall apart at scale, the production architecture that fixes them, and the queue/worker/cache topology I keep reaching for.",
    excerpt:
      "Why agent prototypes fall apart at scale, the architecture that fixes them, and the queue/worker/cache topology I keep reaching for.",
    publishedAt: "2026-05-12",
    publishedLabel: "May 12, 2026",
    readingTime: 15,
    tags: [
      { label: "Infrastructure", tone: "accent" },
      { label: "Kubernetes", tone: "purple" },
      { label: "Production", tone: "green" },
    ],
    featured: false,
  },
  {
    slug: "ai-agent-orchestration",
    title: "The Complete Guide to AI Agent Orchestration",
    description:
      "Sequential, parallel, hierarchical, DAG. Framework comparisons across LangGraph, CrewAI, AutoGen, Semantic Kernel, and Temporal — with the operational reasons each one wins.",
    excerpt:
      "Sequential vs parallel vs DAG-based orchestration. LangGraph, CrewAI, AutoGen, Semantic Kernel, Temporal — what each one is actually good at.",
    publishedAt: "2026-05-11",
    publishedLabel: "May 11, 2026",
    readingTime: 12,
    tags: [
      { label: "Orchestration", tone: "accent" },
      { label: "LangGraph", tone: "purple" },
      { label: "Workflows", tone: "default" },
    ],
    featured: false,
  },
  {
    slug: "autonomous-coding-agents",
    title: "Building Autonomous Coding Agents: Architecture, Memory, and Tool Usage",
    description:
      "Inside Devin, Cursor, Claude Code, OpenHands — codebase indexing, AST-aware reasoning, sandboxed execution, git-native agents, and what it takes to ship one that actually edits real repos.",
    excerpt:
      "Inside Devin, Cursor, Claude Code, OpenHands — codebase indexing, AST-aware reasoning, sandboxed execution, and shipping an agent that edits real repos.",
    publishedAt: "2026-05-10",
    publishedLabel: "May 10, 2026",
    readingTime: 16,
    tags: [
      { label: "Coding Agents", tone: "accent" },
      { label: "Tool Use", tone: "purple" },
      { label: "Sandboxing", tone: "default" },
    ],
    featured: false,
  },
  {
    slug: "ai-agent-security",
    title: "AI Agent Security: The Hidden Risks Nobody Talks About",
    description:
      "Prompt injection, memory poisoning, tool hijacking, privilege escalation. The threat model for agentic systems, and the permission, sandbox, and audit patterns that actually mitigate it.",
    excerpt:
      "Prompt injection, memory poisoning, tool hijacking, privilege escalation. The threat model for agentic systems and the mitigations that actually work.",
    publishedAt: "2026-05-09",
    publishedLabel: "May 9, 2026",
    readingTime: 13,
    tags: [
      { label: "Security", tone: "accent" },
      { label: "Threat Model", tone: "purple" },
      { label: "Zero Trust", tone: "default" },
    ],
    featured: false,
  },
  {
    slug: "rag-vs-agentic-rag",
    title: "RAG vs Agentic RAG: The Evolution of Intelligent Retrieval Systems",
    description:
      "Static RAG retrieves once and prays. Agentic RAG plans, reranks, recurses, and reflects. Query planners, multi-hop reasoning, GraphRAG, and self-reflective retrieval — explained with real numbers.",
    excerpt:
      "Static RAG retrieves once and prays. Agentic RAG plans, reranks, recurses, and reflects. Query planners, multi-hop reasoning, GraphRAG — with real numbers.",
    publishedAt: "2026-05-08",
    publishedLabel: "May 8, 2026",
    readingTime: 14,
    tags: [
      { label: "RAG", tone: "accent" },
      { label: "Agentic Retrieval", tone: "purple" },
      { label: "GraphRAG", tone: "green" },
    ],
    featured: false,
  },
  {
    slug: "event-driven-ai-systems",
    title: "Event-Driven AI Systems: Building Reactive Agent Architectures",
    description:
      "Why polling-based agents drown at scale. Event buses, Kafka, RabbitMQ, Redis Streams, and the reactive agent patterns powering fraud detection, DevOps automation, and incident response.",
    excerpt:
      "Why polling-based agents drown at scale. Event buses, Kafka, RabbitMQ, Redis Streams, and the reactive agent patterns running in production today.",
    publishedAt: "2026-05-07",
    publishedLabel: "May 7, 2026",
    readingTime: 12,
    tags: [
      { label: "Event-Driven", tone: "accent" },
      { label: "Kafka", tone: "purple" },
      { label: "Reactive", tone: "default" },
    ],
    featured: false,
  },
  {
    slug: "ai-agents-knowledge-graphs",
    title: "AI Agents + Knowledge Graphs: The Future of Context-Aware Intelligence",
    description:
      "Vector search is a blunt instrument. Knowledge graphs encode relationships, traversal, and intent. How hybrid vector + graph systems (GraphRAG, Neo4j-backed retrieval) outperform pure RAG.",
    excerpt:
      "Vector search is a blunt instrument. Knowledge graphs encode relationships. Why hybrid vector + graph systems outperform pure RAG.",
    publishedAt: "2026-05-06",
    publishedLabel: "May 6, 2026",
    readingTime: 13,
    tags: [
      { label: "Knowledge Graph", tone: "accent" },
      { label: "Neo4j", tone: "purple" },
      { label: "GraphRAG", tone: "green" },
    ],
    featured: false,
  },
  {
    slug: "cost-optimization-ai-systems",
    title: "Cost Optimization in Large-Scale AI Systems",
    description:
      "Token economics, semantic caching, model routing, inference batching, AI FinOps. The boring infra moves that took our inference bill from terrifying to predictable.",
    excerpt:
      "Token economics, semantic caching, model routing, inference batching. The boring infra moves that took our bill from terrifying to predictable.",
    publishedAt: "2026-05-05",
    publishedLabel: "May 5, 2026",
    readingTime: 12,
    tags: [
      { label: "Cost", tone: "accent" },
      { label: "FinOps", tone: "purple" },
      { label: "Caching", tone: "default" },
    ],
    featured: false,
  },
  // --- earlier posts (kept) ---
  {
    slug: "production-rag-pipeline",
    title: "Building a production RAG pipeline: lessons from 95% accuracy",
    description:
      "Everyone has a toy RAG demo. Almost nobody has one that holds up under production load. Here's what actually moved the needle: chunking, reranking, eval harnesses, and the boring kind of caching.",
    excerpt:
      "Chunking, reranking, eval harnesses, and the boring kind of caching. Notes from shipping retrieval that survives messy enterprise documents.",
    publishedAt: "2026-03-12",
    publishedLabel: "Mar 12, 2026",
    readingTime: 12,
    tags: [
      { label: "RAG", tone: "accent" },
      { label: "LlamaIndex", tone: "purple" },
      { label: "Production", tone: "green" },
    ],
    featured: false,
  },
  {
    slug: "mcp-servers-explained",
    title: "MCP Servers Explained: Building Your First AI Infrastructure with LangChain",
    description:
      "What MCP actually is, why it matters more than the protocol-spec docs suggest, and how to build your first async agentic flow in production.",
    excerpt:
      "What MCP actually is, why it matters more than the protocol-spec docs suggest, and how to build your first async agentic flow in production.",
    publishedAt: "2026-02-28",
    publishedLabel: "Feb 28, 2026",
    readingTime: 9,
    tags: [
      { label: "MCP", tone: "purple" },
      { label: "LangChain", tone: "accent" },
    ],
    featured: false,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
