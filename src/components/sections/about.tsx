import { Reveal } from "@/components/ui/reveal";

type SkillCol = {
  label: string;
  badge: string;
  count: number;
  featured: string[];
  items: string[];
};

const SKILL_COLS: SkillCol[] = [
  {
    label: "languages",
    badge: "L",
    count: 8,
    featured: ["Python", "TypeScript"],
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Go", "Bash", "HTML / CSS"],
  },
  {
    label: "frameworks",
    badge: "F",
    count: 17,
    featured: ["Next.js", "FastAPI", "LangChain", "LangGraph", "MCP"],
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
    label: "infra",
    badge: "I",
    count: 20,
    featured: ["Docker", "AWS", "PostgreSQL", "Redis", "Kafka", "Pinecone"],
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
    label: "focus",
    badge: "*",
    count: 12,
    featured: ["Multi-agent systems", "Agent orchestration", "RAG at scale"],
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

export function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 02</span> · About
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 80,
            alignItems: "flex-start",
          }}
        >
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
            <div className="skill-stack">
              {SKILL_COLS.map((col) => (
                <div key={col.label} className="skill-cat">
                  <div className="skill-cat-head">
                    <span className="skill-cat-badge">{col.badge}</span>
                    <span className="skill-cat-label">{col.label}</span>
                    <span className="skill-cat-count">
                      {String(col.count).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="skill-chips">
                    {col.items.map((s) => (
                      <span
                        key={s}
                        className={`skill-chip${col.featured.includes(s) ? " featured" : ""}`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
