export default function Loading() {
  return (
    <main>
      <section style={{ padding: "180px 0", textAlign: "center" }}>
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot" /> Loading
          </div>
          <h2
            className="serif"
            style={{ marginTop: 24, color: "var(--text-2)", fontSize: 48 }}
          >
            One moment…
          </h2>
        </div>
      </section>
    </main>
  );
}
