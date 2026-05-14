import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Writing — Vedant Narwade",
  description: "Thoughts on AI engineering, building things, and the parts of the work nobody puts in the demo videos.",
};

const TOPICS = [
  { label: "RAG", count: "02" },
  { label: "LangChain", count: "02" },
  { label: "MCP", count: "01" },
  { label: "Production", count: "02" },
  { label: "LlamaIndex", count: "01" },
  { label: "Agents", count: "01" },
];

const pillClass = (tone?: "accent" | "purple" | "green" | "default") =>
  tone === "accent" ? "pill pill-accent" : tone === "green" ? "pill pill-green" : tone === "purple" ? "pill pill-purple" : "pill";

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const all = posts;

  return (
    <main>
      <section style={{ padding: "180px 0 80px" }}>
        <div className="container">
          <Reveal style={{ marginBottom: 24 }}>
            <div className="eyebrow">
              <Link href="/" style={{ color: "var(--text-3)" }}>← Home</Link>
              &nbsp;·&nbsp; <span>/writing</span>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 64,
              alignItems: "flex-end",
              marginBottom: 32,
            }}
          >
            <Reveal
              as="h1"
              delay={1}
              style={{ fontSize: "clamp(56px, 8vw, 112px)", letterSpacing: "-0.04em", maxWidth: "14ch" }}
            >
              Notes from the<br />
              <span className="serif" style={{ color: "var(--accent)" }}>trenches</span>.
            </Reveal>
            <Reveal className="lede" delay={2} style={{ color: "var(--text-2)", marginBottom: 12 }}>
              Thoughts on AI engineering, building things, and the parts of the work nobody puts in the demo videos.
            </Reveal>
          </div>

          <Reveal
            delay={3}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingTop: 32,
              borderTop: "1px solid var(--hairline)",
            }}
          >
            <div style={{ display: "flex", gap: 56 }}>
              <div>
                <div className="serif" style={{ fontSize: 32, color: "var(--text)" }}>
                  {String(posts.length).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Posts
                </div>
              </div>
              <div>
                <div className="serif" style={{ fontSize: 32, color: "var(--text)" }}>~18m</div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Total reading
                </div>
              </div>
              <div>
                <div className="serif" style={{ fontSize: 32, color: "var(--accent)" }}>06</div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Topics
                </div>
              </div>
            </div>
            <a href="/rss.xml" className="btn-link mono" style={{ fontSize: 12 }}>
              ↓ Subscribe via RSS
            </a>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 0,
                minHeight: 420,
                background: "var(--bg-elev-1)",
                border: "1px solid var(--hairline)",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                transition: "all 0.35s var(--ease)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  background: "linear-gradient(135deg, #0a1830 0%, #1e2d5a 40%, #4a3a7a 80%, #0d4a6f 100%)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 20% 30%, rgba(124, 196, 240, 0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(179, 157, 255, 0.25), transparent 50%)",
                  }}
                />
                <div style={{ position: "absolute", top: 24, left: 24 }}>
                  <span className="pill pill-accent" style={{ background: "rgba(124,196,240,0.18)", backdropFilter: "blur(8px)" }}>
                    Featured
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Fig 01 · pipeline overview
                </div>
              </div>

              <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                    {featured.tags.map((t) => (
                      <span key={t.label} className={pillClass(t.tone)}>{t.label}</span>
                    ))}
                  </div>
                  <h2 style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20, maxWidth: "16ch" }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-2)", marginBottom: 28 }}>
                    {featured.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 24,
                    borderTop: "1px solid var(--hairline)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="author-chip">V</div>
                    <div>
                      <div style={{ fontSize: 13 }}>Vedant Narwade</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>
                        {featured.publishedLabel} · {featured.readingTime} min read
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--accent)" }}>
                    Read article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All posts + sidebar */}
      <section style={{ padding: "40px 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 56 }}>
            <div>
              <Reveal className="section-marker" style={{ marginBottom: 32 }}>
                <span className="num">§</span> · All posts
              </Reveal>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {all.map((p, i) => (
                  <Reveal key={p.slug} delay={(i as 0 | 1) || 0}>
                    <Link href={`/blog/${p.slug}`} className="post-card" style={{ display: "flex" }}>
                      <div className="tags">
                        {p.tags.map((t) => (
                          <span key={t.label} className={pillClass(t.tone)}>{t.label}</span>
                        ))}
                      </div>
                      <h3>{p.title}</h3>
                      <p className="excerpt">{p.excerpt}</p>
                      <div className="meta">
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="author-chip" style={{ width: 18, height: 18, fontSize: 10 }}>V</div>
                          VN
                        </span>
                        <span>
                          {p.publishedLabel} · {p.readingTime} min
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}

                <Reveal
                  delay={2}
                  style={{
                    gridColumn: "1 / -1",
                    background: "transparent",
                    border: "1px dashed var(--hairline-2)",
                    borderRadius: "var(--r-lg)",
                    padding: "36px 32px",
                    display: "flex",
                    gap: 28,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 56,
                      color: "var(--text-4)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    ∙ ∙ ∙
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        color: "var(--text-3)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      In drafts
                    </div>
                    <h4 style={{ fontSize: 18, marginBottom: 4, color: "var(--text-2)" }}>
                      More posts coming on: agent observability, hybrid retrieval, eval harnesses, FastAPI patterns
                    </h4>
                    <div style={{ fontSize: 13, color: "var(--text-3)" }}>
                      Subscribe via RSS or ping me on email for notifications.
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <Reveal style={{ marginBottom: 40 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  // topics
                </div>
                <ul className="topics" style={{ listStyle: "none" }}>
                  {TOPICS.map((t) => (
                    <li key={t.label}>
                      {t.label} <span className="count">{t.count}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={1} style={{ marginBottom: 40 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  // most read
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {all.map((p, i) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: "block" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", marginBottom: 4 }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div style={{ fontSize: 14, lineHeight: 1.4 }}>{p.title}</div>
                    </Link>
                  ))}
                </div>
              </Reveal>

              <Reveal
                delay={2}
                style={{
                  padding: 24,
                  background: "var(--bg-elev-1)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "var(--r-md)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  // new posts
                </div>
                <p style={{ fontSize: 14, marginBottom: 16 }}>
                  Get a note when I publish. No spam, no list-rental, just writing.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    style={{
                      flex: 1,
                      background: "var(--bg)",
                      border: "1px solid var(--hairline)",
                      borderRadius: 8,
                      padding: "8px 12px",
                      color: "var(--text)",
                      font: "inherit",
                      fontSize: 13,
                    }}
                  />
                  <button className="btn btn-primary" style={{ padding: "8px 12px", fontSize: 12 }}>
                    →
                  </button>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
