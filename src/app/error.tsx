"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section style={{ padding: "180px 0 120px" }}>
        <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot" /> Error
          </div>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 88px)", margin: "24px 0 20px" }}>
            Something broke<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p style={{ marginBottom: 40, maxWidth: "52ch", margin: "0 auto 40px" }}>
            An unexpected error occurred while loading this page. You can try again, or head back home.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={reset} className="btn btn-primary">Try again</button>
            <a href="/" className="btn btn-ghost">Go home</a>
          </div>
          {error.digest && (
            <div
              style={{
                marginTop: 32,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-3)",
              }}
            >
              ref · {error.digest}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
