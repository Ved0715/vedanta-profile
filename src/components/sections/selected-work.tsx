import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

const ARCH_NODES = [
  { x: 80, y: 80, label: "query", accent: true },
  { x: 200, y: 80, label: "agent" },
  { x: 320, y: 80, label: "tool" },
  { x: 80, y: 180, label: "SQL" },
  { x: 200, y: 180, label: "router", accent: true },
  { x: 320, y: 180, label: "RAG" },
  { x: 80, y: 280, label: "pinecone" },
  { x: 200, y: 280, label: "cache" },
  { x: 320, y: 280, label: "response", accent: true },
];

const ARCH_PATHS = [
  "M85 80 L195 80",
  "M205 80 L315 80",
  "M200 85 L200 175",
  "M85 180 L195 180",
  "M205 180 L315 180",
  "M200 185 L200 275",
  "M85 280 L195 280",
  "M205 280 L315 280",
];

export function SelectedWork() {
  return (
    <section id="work">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <Reveal className="section-marker" style={{ marginBottom: 24 }}>
              <span className="num">§ 03</span> · Selected work
            </Reveal>
            <Reveal as="h2" delay={1} style={{ maxWidth: "14ch" }}>
              Four projects I&apos;d<br />defend over coffee<span style={{ color: "var(--accent)" }}>.</span>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link href="/projects" className="btn btn-ghost">
              All projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* MCP — featured wide */}
          <Reveal>
            <Link
              href="/projects/mcp-server"
              className="card"
              style={{
                gridColumn: "1 / -1",
                padding: 0,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: 360,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div className="monogram mono-mcp"><span>m</span></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span className="pill pill-accent">Featured</span>
                    <span className="pill">Production</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 10 }}>
                    AI INFRASTRUCTURE / 2025
                  </div>
                  <h3 style={{ marginBottom: 8 }}>MCP Server</h3>
                  <div style={{ color: "var(--text-3)", fontSize: 15, marginBottom: 16 }}>Production-grade AI infrastructure</div>
                  <p style={{ fontSize: 15 }}>
                    Async LangChain agentic flow over SQL, RAG, web APIs and Pinecone. Sub-second queries, 95%+ document
                    analysis, 80% faster processing across distributed microservices.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Python", "LangChain", "Pinecone", "FastAPI", "RAG"].map((p) => (
                    <span key={p} className="pill">{p}</span>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", background: "linear-gradient(135deg, #0d1a2e, #050a14)", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(124, 196, 240, 0.25), transparent 50%), radial-gradient(circle at 70% 70%, rgba(124, 196, 240, 0.12), transparent 50%)",
                  }}
                />
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 360" preserveAspectRatio="xMidYMid meet">
                  <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#7cc4f0">
                    {ARCH_NODES.map((n) => (
                      <g key={`${n.x}-${n.y}`}>
                        <circle cx={n.x} cy={n.y} r="5" fill={n.accent ? "#7cc4f0" : "#fff"} opacity={n.accent ? 1 : 0.4} />
                        <text x={n.x + 12} y={n.y + 4} fill={n.accent ? "#7cc4f0" : "#a3a3a3"}>
                          {n.label}
                        </text>
                      </g>
                    ))}
                  </g>
                  <g stroke="rgba(124,196,240,0.25)" strokeWidth="1" fill="none">
                    {ARCH_PATHS.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                </svg>
                <div
                  style={{
                    position: "absolute",
                    bottom: 18,
                    left: 24,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ARCH · async / agentic
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Flox */}
          <Reveal delay={1}>
            <Link href="/projects/flox" className="card" style={{ padding: 32, display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                <div className="monogram mono-flox"><span>f</span></div>
                <span className="pill pill-green">Live</span>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 10 }}>
                DEVELOPER TOOLS / 2024
              </div>
              <h3 style={{ marginBottom: 8 }}>Flox</h3>
              <div style={{ color: "var(--text-3)", fontSize: 15, marginBottom: 18 }}>AI-powered GitHub assistant</div>
              <p style={{ fontSize: 15, marginBottom: 24 }}>
                Context-aware repository insights and commit explanations in under 2 seconds. RAG pipeline over a NeonDB vector store.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Next.js", "Prisma", "NeonDB", "RAG"].map((p) => (
                  <span key={p} className="pill">{p}</span>
                ))}
              </div>
            </Link>
          </Reveal>

          {/* PoGen */}
          <Reveal delay={2}>
            <Link href="/projects/pogen" className="card" style={{ padding: 32, display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                <div className="monogram mono-pogen"><span>p</span></div>
                <span className="pill pill-green">Live</span>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 10 }}>
                AI ART / 2024
              </div>
              <h3 style={{ marginBottom: 8 }}>PoGen</h3>
              <div style={{ color: "var(--text-3)", fontSize: 15, marginBottom: 18 }}>Image generation platform · 500+ users</div>
              <p style={{ fontSize: 15, marginBottom: 24 }}>
                FLUX.1-dev served behind a community gallery. AWS-hosted scalable infra, real-time generation, user profiles.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["React", "Node", "AWS", "HuggingFace"].map((p) => (
                  <span key={p} className="pill">{p}</span>
                ))}
              </div>
            </Link>
          </Reveal>

          {/* Image Captioning - full width */}
          <Reveal delay={3}>
            <Link
              href="/projects/image-captioning"
              className="card"
              style={{ padding: 32, gridColumn: "1 / -1", display: "block" }}
            >
              <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
                <div className="monogram mono-vision" style={{ flexShrink: 0 }}><span>i</span></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 6 }}>
                    COMPUTER VISION / 2024
                  </div>
                  <h3 style={{ marginBottom: 6 }}>Image Captioning System</h3>
                  <p style={{ fontSize: 15, color: "var(--text-2)", margin: 0 }}>
                    BLIP-based caption generator trained on 30K image-caption pairs from Flickr. Real-time inference,
                    multi-domain support.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
                  {["BLIP", "PyTorch", "CV", "Completed"].map((p) => (
                    <span key={p} className="pill">{p}</span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
