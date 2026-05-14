"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";

  if (!isHome) {
    return (
      <footer
        style={{
          borderTop: "1px solid var(--hairline)",
          padding: "64px 0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
              paddingBottom: 32,
              borderBottom: "1px solid var(--hairline)",
              marginBottom: 32,
            }}
          >
            <h2 style={{ fontSize: 36, maxWidth: "16ch", margin: 0 }}>
              Have a <span className="serif" style={{ color: "var(--accent)" }}>project</span> in mind?
            </h2>
            <Link href="/#contact" className="btn btn-primary">
              Start a conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--text-3)",
            }}
          >
            <span>© 2026 {profile.name}</span>
            <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--green)",
                  boxShadow: "0 0 6px var(--green)",
                }}
              />
              All systems operational
            </span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      style={{
        borderTop: "1px solid var(--hairline)",
        padding: "64px 0 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
        >
          <div>
            <div className="nav-brand" style={{ marginBottom: 16 }}>
              <span className="sigil">V</span>
              <span>vedant.dev</span>
            </div>
            <p style={{ fontSize: 14, maxWidth: "36ch", color: "var(--text-3)" }}>
              Building intelligent systems with care, in {profile.location}.
            </p>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Sitemap
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <li><Link href="/" style={{ color: "var(--text-2)" }}>Home</Link></li>
              <li><Link href="/projects" style={{ color: "var(--text-2)" }}>Projects</Link></li>
              <li><Link href="/blog" style={{ color: "var(--text-2)" }}>Writing</Link></li>
              <li><a href="#contact" style={{ color: "var(--text-2)" }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Elsewhere
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <li><a href={profile.socials.github.url} style={{ color: "var(--text-2)" }}>GitHub</a></li>
              <li><a href={profile.socials.linkedin.url} style={{ color: "var(--text-2)" }}>LinkedIn</a></li>
              <li><a href={profile.socials.twitter.url} style={{ color: "var(--text-2)" }}>Twitter / X</a></li>
              <li><a href={profile.resume} style={{ color: "var(--text-2)" }}>Resume PDF</a></li>
            </ul>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Colophon
            </div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 13,
                color: "var(--text-3)",
              }}
            >
              <li>Next.js 15 · Tailwind</li>
              <li>React 19 · TypeScript</li>
              <li>Inter Tight · Instrument Serif</li>
              <li>JetBrains Mono</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid var(--hairline)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--text-3)",
          }}
        >
          <span>© 2026 {profile.name} · made with care</span>
          <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 6px var(--green)",
              }}
            />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
