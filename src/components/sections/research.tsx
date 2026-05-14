import { Reveal } from "@/components/ui/reveal";

const BULLETS = [
  "Novel preprocessing pipeline for temporal artifacts",
  "Trained on 100K+ video samples from public benchmarks",
  "Robust to compression artifacts and adversarial inputs",
  "Hybrid spatial-temporal feature fusion approach",
];

const STACK = ["Vision Transformer", "ViViT", "PyTorch", "Python", "Computer Vision"];

export function Research() {
  return (
    <section id="research">
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 04</span> · Research & publications
        </Reveal>

        <Reveal
          className="card"
          style={{
            padding: 0,
            background: "linear-gradient(135deg, rgba(245,165,36,0.08), rgba(245,165,36,0.02) 60%), var(--bg-elev-1)",
            borderColor: "rgba(245,165,36,0.18)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(245,165,36,0.15), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr 240px",
              gap: 48,
              padding: 48,
              position: "relative",
            }}
          >
            {/* Left meta */}
            <div>
              <span className="pill pill-amber" style={{ marginBottom: 16 }}>Published research</span>
              <div style={{ marginTop: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Institution
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.4 }}>National Institute of Technology, Trichy</div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Duration
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", fontFamily: "var(--mono)" }}>May 2024 — Jul 2024</div>
              </div>
            </div>

            {/* Center paper */}
            <div>
              <h3 style={{ marginBottom: 14, maxWidth: "22ch" }}>
                DeepFake detection via{" "}
                <span className="serif" style={{ color: "var(--amber)", fontStyle: "italic" }}>
                  Vision Transformers
                </span>{" "}
                & ViViT
              </h3>
              <p style={{ fontSize: 16, marginBottom: 24 }}>
                Investigated Vision Transformer (ViT) and Video Vision Transformer (ViViT) architectures for DeepFake
                detection, developing novel preprocessing and algorithmic refinements that improved detection accuracy
                by 25% over baseline.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {BULLETS.map((b) => (
                  <div key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(245,165,36,0.9)"
                      strokeWidth="2"
                      style={{ flexShrink: 0, marginTop: 3 }}
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span style={{ fontSize: 14, color: "var(--text-2)" }}>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <div
                  style={{
                    padding: "14px 20px",
                    background: "rgba(245,165,36,0.10)",
                    border: "1px solid rgba(245,165,36,0.25)",
                    borderRadius: 12,
                  }}
                >
                  <div className="serif" style={{ fontSize: 28, lineHeight: 1, color: "var(--amber)" }}>+25%</div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "var(--text-3)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    Accuracy gain
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 20px",
                    background: "rgba(245,165,36,0.10)",
                    border: "1px solid rgba(245,165,36,0.25)",
                    borderRadius: 12,
                  }}
                >
                  <div className="serif" style={{ fontSize: 28, lineHeight: 1, color: "var(--amber)" }}>100K+</div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "var(--text-3)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    Samples trained
                  </div>
                </div>
              </div>
            </div>

            {/* Right stack */}
            <div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Stack
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {STACK.map((s) => (
                  <span key={s} className="pill" style={{ justifyContent: "flex-start" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
