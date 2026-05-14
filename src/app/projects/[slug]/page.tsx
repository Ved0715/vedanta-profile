import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Check, ArrowLeft, ArrowRight, ExternalLink, Github } from "@/components/ui/icons";
import { adjacentProjects, getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case Study · Vedant Narwade`,
    description: p.description,
  };
}

const STACK_ICONS: { label: string; bg: string; abbr: string }[] = [
  { label: "Python", bg: "linear-gradient(135deg, #3776AB, #FFD43B)", abbr: "Py" },
  { label: "LangChain", bg: "linear-gradient(135deg, #1c3d5a, #2c5d8a)", abbr: "LC" },
  { label: "FastAPI", bg: "linear-gradient(135deg, #009688, #00695C)", abbr: "FA" },
  { label: "Pinecone", bg: "linear-gradient(135deg, #4f46e5, #7c3aed)", abbr: "PC" },
  { label: "PostgreSQL", bg: "linear-gradient(135deg, #336791, #1e3a5f)", abbr: "SQ" },
  { label: "Docker", bg: "linear-gradient(135deg, #2496ED, #0d5a8a)", abbr: "Dk" },
  { label: "JWT Auth", bg: "linear-gradient(135deg, #d97706, #b45309)", abbr: "JW" },
  { label: "Redis", bg: "linear-gradient(135deg, #DC382D, #8B0000)", abbr: "Rd" },
];

const metricColor: Record<string, string> = {
  accent: "var(--accent)",
  amber: "var(--amber)",
  green: "var(--green)",
  text: "var(--text)",
};

const parseNumeric = (v: string): { num: number; prefix: string; suffix: string } => {
  const match = v.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: v };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = adjacentProjects(slug);
  const index = projects.findIndex((p) => p.slug === slug);
  const total = projects.length;

  return (
    <main>
      <section className="cs-hero">
        <div className="cs-hero-bg" aria-hidden />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal style={{ marginBottom: 32 }}>
            <Link href="/projects" className="eyebrow" style={{ color: "var(--text-3)" }}>
              <ArrowLeft />
              Projects · case study {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </Link>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 56, alignItems: "flex-start" }}>
            <Reveal delay={1}>
              <div className={`monogram mono-${project.monoKey}`} style={{ width: 120, height: 120, fontSize: 64 }}>
                <span>{project.monoChar}</span>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {project.featured && <span className="pill pill-accent">Featured</span>}
                <span className="pill pill-green">{project.status === "production" ? "Production" : project.status === "live" ? "Live" : "Completed"}</span>
                <span className="pill">{project.category}</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(56px, 8vw, 112px)",
                  letterSpacing: "-0.04em",
                  maxWidth: "14ch",
                  marginBottom: 24,
                }}
              >
                {project.title.split(" ")[0]}{" "}
                <span className="serif" style={{ color: "var(--accent)" }}>
                  {project.title.split(" ").slice(1).join(" ") || ""}
                </span>
              </h1>

              <p className="lede" style={{ color: "var(--text)", maxWidth: "60ch", marginBottom: 40 }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <Github />
                    View on GitHub
                    <ExternalLink />
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Live demo
                    <ExternalLink />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <Reveal className="section-marker">
            <span className="num">§ 01</span> · Overview
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "flex-start" }}>
            <Reveal>
              <h2 style={{ fontSize: 40, marginBottom: 28, maxWidth: "16ch" }}>
                The boring problem behind every{" "}
                <span className="serif" style={{ color: "var(--accent)" }}>AI agent</span>.
              </h2>
              <p style={{ marginBottom: 18 }}>{project.description}</p>
              <p style={{ marginBottom: 18 }}>
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--hairline)" }}>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--text-3)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Quick facts
                  </div>
                </div>
                <div style={{ padding: "8px 24px" }}>
                  {[
                    { k: "status", v: <span className={`pill ${project.status === "production" ? "pill-accent" : "pill-green"}`}>{project.status}</span> },
                    { k: "category", v: project.category },
                    { k: "stack", v: `${project.stack.length} frameworks` },
                    { k: "year", v: String(project.year) },
                  ].map((row, i, arr) => (
                    <div
                      key={row.k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "14px 0",
                        borderBottom: i < arr.length - 1 ? "1px solid var(--hairline)" : undefined,
                      }}
                    >
                      <span style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "var(--mono)" }}>{row.k}</span>
                      <span style={{ fontSize: 14 }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="container">
          <Reveal className="section-marker">
            <span className="num">§ 02</span> · What it does
          </Reveal>

          <Reveal as="h2" style={{ marginBottom: 56, maxWidth: "16ch" }}>
            {project.features.length} pieces that make it{" "}
            <span className="serif" style={{ color: "var(--accent)" }}>work</span>.
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {project.features.map((f, i) => (
              <Reveal key={f} delay={(i % 5) as 0 | 1 | 2 | 3 | 4 | 5} className="feature-card">
                <div className="check">
                  <Check />
                </div>
                <div>
                  <h4 style={{ marginBottom: 6 }}>{f.split(/[—.]/, 1)[0]}.</h4>
                  <p style={{ fontSize: 14, margin: 0 }}>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section>
        <div className="container">
          <Reveal className="section-marker">
            <span className="num">§ 03</span> · Built with
          </Reveal>
          <Reveal as="h2" style={{ marginBottom: 48 }}>
            Stack<span style={{ color: "var(--accent)" }}>.</span>
          </Reveal>

          <Reveal style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {project.stack.map((s) => {
              const ico = STACK_ICONS.find((i) => i.label === s);
              return (
                <span key={s} className="stack-pill">
                  <span className="ico" style={ico ? { background: ico.bg } : undefined}>
                    {ico ? ico.abbr : s.slice(0, 2)}
                  </span>
                  {s}
                </span>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Results */}
      <section
        id="results"
        style={{
          padding: "120px 0",
          background: "linear-gradient(180deg, transparent, var(--bg-tinted), transparent)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div className="container">
          <Reveal className="section-marker">
            <span className="num">§ 04</span> · Results
          </Reveal>
          <Reveal as="h2" style={{ marginBottom: 56 }}>
            What it actually <span className="serif" style={{ color: "var(--accent)" }}>changed</span>.
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {project.metrics.map((m, i) => {
              const { num, prefix, suffix } = parseNumeric(m.value);
              const colorVar = metricColor[m.color ?? "text"];
              const topColor = m.color === "accent" ? "var(--accent)" : m.color === "amber" ? "var(--amber)" : m.color === "green" ? "#5ec98a" : "#b39dff";
              return (
                <Reveal
                  key={m.label}
                  delay={(i as 0 | 1 | 2 | 3) || 0}
                  className="metric-card"
                  style={{ ["--top-color" as string]: topColor } as React.CSSProperties}
                >
                  <AnimatedCounter
                    value={num}
                    prefix={prefix}
                    suffix={suffix}
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 80,
                      lineHeight: 0.95,
                      letterSpacing: "-0.04em",
                      color: colorVar,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "var(--text-3)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 10,
                    }}
                  >
                    {m.label}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project nav */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Link
              href={`/projects/${prev.slug}`}
              className="card"
              style={{ padding: 32, display: "flex", gap: 20, alignItems: "center" }}
            >
              <ArrowLeft size={24} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  ← Previous
                </div>
                <h4>{prev.title}</h4>
              </div>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="card"
              style={{
                padding: 32,
                display: "flex",
                gap: 20,
                alignItems: "center",
                textAlign: "right",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Next →
                </div>
                <h4>{next.title}</h4>
              </div>
              <ArrowRight size={24} />
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/projects" className="btn-link mono" style={{ fontSize: 12 }}>
              ↑ Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
