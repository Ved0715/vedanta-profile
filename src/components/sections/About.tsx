import { Reveal } from "@/components/ui/reveal";

const SKILL_COLS = [
  {
    title: "// languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Go", "Bash", "HTML / CSS"],
  },
  {
    title: "// frameworks",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "AutoGen",
      "MCP",
      "PyTorch",
      "TensorFlow",
      "Transformers",
      "Streamlit",
      "Pydantic",
      "Tailwind",
    ],
  },
  {
    title: "// infra",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "PostgreSQL",
      "MongoDB",
      "pgvector",
      "Pinecone",
      "Weaviate",
      "FAISS",
      "Redis",
      "RabbitMQ",
      "Celery",
      "Kafka",
      "Neo4j",
      "Nginx",
      "Hugging Face",
      "Ollama",
      "GitHub Actions",
      "Vercel",
      "WebSockets",
    ],
  },
  {
    title: "// focus",
    items: [
      "Multi-agent systems",
      "Agent orchestration",
      "RAG at scale",
      "Hybrid retrieval",
      "Event-driven arch",
      "Distributed systems",
      "Vector search",
      "Knowledge graphs",
      "Tool calling",
      "Cost optimization",
      "Observability",
      "Eval harnesses",
    ],
  },
];

const colTitle: React.CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  color: "var(--accent)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: 14,
};

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontFamily: "var(--mono)",
  fontSize: 13,
  color: "var(--text-2)",
};

export function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 02</span> · About
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "flex-start" }}>
          <Reveal>
            <h2 style={{ maxWidth: "16ch", marginBottom: 32 }}>
              I build the{" "}
              <span className="serif" style={{ color: "var(--accent)" }}>
                unglamorous
              </span>{" "}
              parts of AI products — the parts that make them work.
            </h2>
            <p style={{ marginBottom: 20 }}>
              Most AI demos are easy. Production isn&apos;t. I spend my days in the slow, careful work of turning
              prompts into pipelines: chunking strategies that actually retrieve, evaluation harnesses that don&apos;t
              lie, fallback chains that don&apos;t blow up at 3am.
            </p>
            <p style={{ marginBottom: 20 }}>
              Right now I&apos;m at <span className="text-strong">Meragi Events</span> as SDE 1 — building a
              5-node multi-agent BOM Chat in LangGraph, a Lead Analysis Agent that lifted conversion 30%, and a
              Venue Intelligence Pipeline that cut assessment time by 60%.
            </p>
            <p>
              Before Meragi I shipped enterprise document AI at <span className="text-strong">AIVI.in</span> —
              sub-second semantic search at 95%+ extraction accuracy and an 85% reduction in inference cost.
              Earlier still: DeepFake detection research at NIT Trichy and cloud security AI at Digifortex.
              B.Tech CSE from IIIT Kottayam, 2025.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {SKILL_COLS.map((col) => (
                <div key={col.title}>
                  <div style={colTitle}>{col.title}</div>
                  <ul style={list}>
                    {col.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
