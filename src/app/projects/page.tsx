import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { research } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Vedant Narwade",
  description:
    "Production-grade AI systems, research, and developer tools. Each is a real shipped thing, not a tutorial fork.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section style={{ padding: "180px 0 60px" }}>
        <div className="container">
          <Reveal style={{ marginBottom: 24 }}>
            <div className="eyebrow">
              <Link href="/" style={{ color: "var(--text-3)" }}>← Home</Link>
              &nbsp;·&nbsp; <span>/projects</span>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 64,
              alignItems: "flex-end",
              marginBottom: 64,
            }}
          >
            <Reveal
              as="h1"
              delay={1}
              style={{
                fontSize: "clamp(56px, 8vw, 112px)",
                letterSpacing: "-0.04em",
                maxWidth: "14ch",
              }}
            >
              All{" "}
              <span className="serif" style={{ color: "var(--accent)" }}>
                projects
              </span>{" "}
              —<br />
              the receipts.
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: 17, color: "var(--text-2)", maxWidth: "40ch" }}>
                Production-grade AI systems, research, and developer tools. Each is a real shipped thing, not a tutorial fork.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 24 }}>
                <div>
                  <div className="serif" style={{ fontSize: 32, color: "var(--accent)" }}>04</div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Shipped
                  </div>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 32, color: "var(--amber)" }}>01</div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Research
                  </div>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 32, color: "var(--text)" }}>05</div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Total
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <ProjectsGrid />
        </div>
      </section>

      <section style={{ padding: "40px 0 120px", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <Reveal className="section-marker">
            <span className="num">§</span> · Research
          </Reveal>

          <Reveal>
            <Link
              href="/"
              className="project-tile"
              style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: 240 }}
            >
              <div className="tile-band band-research" style={{ height: "100%" }}>
                <span className="glyph">{research.monoChar}</span>
                <div className="band-meta">{research.bandMeta}</div>
              </div>
              <div
                className="tile-body"
                style={{
                  padding: 32,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 32,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <span className="pill pill-amber">Published</span>
                    <span className="pill">{research.category}</span>
                  </div>
                  <h3 style={{ fontSize: 24, marginBottom: 8 }}>{research.title}</h3>
                  <p style={{ marginBottom: 0 }}>{research.summary}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    paddingLeft: 32,
                    borderLeft: "1px solid var(--hairline)",
                  }}
                >
                  {research.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="serif" style={{ fontSize: 32, lineHeight: 1, color: "var(--amber)" }}>
                        {m.value}
                      </div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
