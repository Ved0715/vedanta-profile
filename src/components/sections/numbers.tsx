import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const STATS = [
  { value: 3, suffix: "+", num: "01", label: "Roles · companies & labs", accent: false },
  { value: 4, suffix: "", num: "02", label: "Projects shipped to production", accent: false },
  { value: 95, suffix: "%", num: "03", label: "Extraction accuracy · RAG pipeline", accent: true },
  { value: 85, suffix: "%", num: "04", label: "Cost reduction · model selection", accent: false },
  { value: 500, suffix: "+", num: "05", label: "Active users on PoGen platform", accent: false },
] as const;

const counterStyle = (accent: boolean): React.CSSProperties => ({
  fontFamily: "var(--serif)",
  fontStyle: "italic",
  fontSize: "clamp(56px, 8vw, 112px)",
  lineHeight: 0.95,
  letterSpacing: "-0.04em",
  color: accent ? "var(--accent)" : "var(--text)",
});

export function Numbers() {
  return (
    <section
      id="numbers"
      style={{
        padding: "100px 0",
        background: "linear-gradient(180deg, transparent, var(--bg-tinted), transparent)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 01</span> · By the numbers
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0,
            borderLeft: "1px solid var(--hairline)",
          }}
        >
          {STATS.map((s, i) => (
            <Reveal
              key={s.num}
              delay={(i as 0 | 1 | 2 | 3 | 4) || 0}
              style={{ padding: 32, borderRight: i < STATS.length - 1 ? "1px solid var(--hairline)" : undefined }}
            >
              <AnimatedCounter value={s.value} suffix={s.suffix} style={counterStyle(s.accent)} />
              <div style={{ marginTop: 18 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
