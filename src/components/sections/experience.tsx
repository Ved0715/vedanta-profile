import { Reveal } from "@/components/ui/reveal";
import { roles, education, leadership } from "@/data/work";
import { Mortarboard, Users, Flask, Star } from "@/components/ui/icons";

const LEAD_ICON = { users: Users, flask: Flask, star: Star } as const;

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "180px 1fr 220px",
  gap: 48,
  padding: "36px 0",
  borderTop: "1px solid var(--hairline)",
  alignItems: "flex-start",
};

export function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 05</span> · Experience
        </Reveal>

        <Reveal as="h2" style={{ marginBottom: 56, maxWidth: "18ch" }}>
          A short{" "}
          <span className="serif" style={{ color: "var(--accent)" }}>timeline</span> of the work that shaped me.
        </Reveal>

        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          {roles.map((r, i) => (
            <Reveal
              key={r.id}
              delay={(i as 0 | 1 | 2) || 0}
              style={{
                ...rowStyle,
                borderBottom: i === roles.length - 1 ? "1px solid var(--hairline)" : undefined,
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: i === 0 ? "var(--accent)" : "var(--text-2)", marginBottom: 6 }}>
                  {r.startLabel}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em" }}>
                  {r.endLabel}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 24, marginBottom: 4 }}>{r.title}</h3>
                <div style={{ fontSize: 16, color: "var(--text-2)", marginBottom: 16 }}>
                  {r.company} · {r.type} · {r.location}
                </div>
                <p style={{ fontSize: 15, marginBottom: 18, maxWidth: "60ch" }}>{r.summary}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {r.stack.map((s) => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  paddingLeft: 24,
                  borderLeft: "1px solid var(--hairline)",
                }}
              >
                {r.achievements.map((a) => (
                  <div key={a.label}>
                    <div className="serif" style={{ fontSize: 32, lineHeight: 1, color: "var(--text)" }}>
                      {a.value}
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>
                      {a.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal style={{ marginTop: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ height: 1, flex: 1, background: "var(--hairline)" }} />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-3)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Education
            </span>
            <div style={{ height: 1, flex: 1, background: "var(--hairline)" }} />
          </div>

          <div
            className="card"
            style={{ padding: 36, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center" }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                display: "grid",
                placeItems: "center",
                border: "1px solid var(--hairline-2)",
                borderRadius: 14,
                background: "var(--bg-elev-2)",
              }}
            >
              <Mortarboard size={32} style={{ stroke: "var(--accent)" }} />
            </div>
            <div>
              <h3 style={{ fontSize: 22, marginBottom: 6 }}>
                <span className="serif" style={{ color: "var(--accent)" }}>B.Tech</span> {education.degree.replace("B.Tech ", "")}
              </h3>
              <div style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 12 }}>
                {education.institution} · {education.location}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {education.tags.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text-2)" }}>{education.range}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>
                {education.rangeMeta}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Leadership */}
        <Reveal style={{ marginTop: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {leadership.map((l) => {
              const Icon = LEAD_ICON[l.icon];
              return (
                <div key={l.title} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "var(--bg-elev-2)",
                        border: "1px solid var(--hairline-2)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon style={{ stroke: "var(--accent)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{l.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{l.note}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
