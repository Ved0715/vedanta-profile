import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

const STACK = ["LangChain", "LlamaIndex", "Pinecone", "FAISS", "FastAPI", "Next.js", "PyTorch", "Docker"];

export function Hero() {
  return (
    <section id="home" style={{ padding: "180px 0 100px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56 }}>
          <Reveal>
            <div className="eyebrow">
              <span className="dot" /> Portfolio · 2026 · v3
            </div>
          </Reveal>

          <Reveal as="h1" delay={1} style={{ maxWidth: "14ch" }}>
            Vedant
            <br />
            Narwade<span style={{ color: "var(--accent)" }}>.</span>
          </Reveal>

          <Reveal delay={2} style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: 1, minWidth: 320, maxWidth: 560 }}>
              <p className="lede" style={{ color: "var(--text)" }}>
                AI engineer building{" "}
                <span className="serif" style={{ color: "var(--accent)", fontSize: "1.15em" }}>
                  intelligent
                </span>{" "}
                systems that scale — LLM workflows, RAG pipelines, and the infrastructure underneath.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
                <Link href="/projects" className="btn btn-primary">
                  See selected work
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="#contact" className="btn btn-ghost">
                  Get in touch
                </a>
              </div>
            </div>

            <div style={{ minWidth: 280 }}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                // currently
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--green)",
                      boxShadow: "0 0 8px var(--green)",
                    }}
                  />
                  SDE 1 at <span style={{ color: "var(--text)" }}>Meragi Events</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-2)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-4)" }} />
                  Karnataka, India · UTC+5:30
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-2)" }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow: "0 0 8px var(--accent-line)",
                    }}
                  />
                  Shipping multi-agent systems, daily
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={3}
            style={{
              marginTop: 80,
              paddingTop: 32,
              borderTop: "1px solid var(--hairline)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Built with
            </div>
            <div
              style={{
                display: "flex",
                gap: 28,
                flexWrap: "wrap",
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              {STACK.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <a
              href="#about"
              className="mono"
              style={{ fontSize: 12, color: "var(--text-3)", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              ↓ Scroll
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
