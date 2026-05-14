import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section style={{ padding: "180px 0 120px" }}>
        <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot" /> 404
          </div>
          <h1 style={{ fontSize: "clamp(80px, 12vw, 160px)", margin: "16px 0 12px" }}>
            <span className="serif" style={{ color: "var(--accent)" }}>404</span>
          </h1>
          <h2 style={{ fontSize: 40, marginBottom: 20 }}>Page not found</h2>
          <p style={{ marginBottom: 40, maxWidth: "52ch", margin: "0 auto 40px" }}>
            The page you&apos;re looking for has either moved or never existed. Here are some places worth visiting.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">Home</Link>
            <Link href="/projects" className="btn btn-ghost">Projects</Link>
            <Link href="/blog" className="btn btn-ghost">Writing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
