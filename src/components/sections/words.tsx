import { Reveal } from "@/components/ui/reveal";
import { Quote } from "@/components/ui/icons";
import { testimonials } from "@/data/testimonials";

export function Words() {
  return (
    <section id="words">
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 06</span> · Words from collaborators
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i as 0 | 1) || 0}
              className="card"
              style={{ padding: 36 }}
            >
              <Quote />
              <p className="lede" style={{ margin: "24px 0", fontSize: 19, color: "var(--text)" }}>
                <span className="serif" style={{ color: "var(--accent)" }}>&ldquo;</span>
                {t.quote}
                <span className="serif" style={{ color: "var(--accent)" }}>&rdquo;</span>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingTop: 24,
                  borderTop: "1px solid var(--hairline)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    color: t.textColor ?? "#000",
                    fontSize: 14,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
