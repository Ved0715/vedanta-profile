"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Github, ExternalLink } from "@/components/ui/icons";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/types";

type Filter = "all" | ProjectCategory;

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: projects.length + 1 },
  { id: "ai", label: "AI / ML", count: projects.filter((p) => p.categories.includes("ai")).length },
  { id: "web", label: "Web Apps", count: projects.filter((p) => p.categories.includes("web")).length },
  { id: "research", label: "Research", count: 1 },
  { id: "tools", label: "Tools", count: projects.filter((p) => p.categories.includes("tools")).length },
];

const bandClass = (key: string) => `tile-band band-${key}`;

export function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const isShown = (cats: string[]) => filter === "all" || cats.includes(filter);

  return (
    <>
      <Reveal
        delay={3}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={filter === f.id ? "active" : ""}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span style={{ opacity: 0.5, marginLeft: 4 }}>{String(f.count).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--text-3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          ↓ Sorted by impact
        </div>
      </Reveal>

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {projects.map((p, i) => {
          const shown = isShown(p.categories);
          return (
            <Reveal
              key={p.slug}
              delay={(i as 0 | 1 | 2 | 3) % 4 as 0 | 1 | 2 | 3}
              style={{
                opacity: shown ? 1 : 0.15,
                transform: shown ? undefined : "scale(0.95)",
                pointerEvents: shown ? "auto" : "none",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              <div className="project-tile" style={{ display: "flex", position: "relative" }}>
                {/* Stretched link: covers the tile but sits below the action anchors. */}
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={p.title}
                  style={{ position: "absolute", inset: 0, zIndex: 1 }}
                />
                <div className={bandClass(p.bandKey)}>
                  {p.featured && (
                    <div className="featured-badge">
                      <span className="pill pill-accent" style={{ background: "rgba(124,196,240,0.18)", backdropFilter: "blur(8px)" }}>
                        Featured
                      </span>
                    </div>
                  )}
                  <span className="glyph">{p.monoChar}</span>
                  <div className="band-meta">{p.bandMeta}</div>
                </div>
                <div className="tile-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <h3>{p.title}</h3>
                    <span
                      className={`pill ${p.status === "production" ? "pill-accent" : p.status === "live" ? "pill-green" : ""}`}
                    >
                      {p.status === "production"
                        ? "Production"
                        : p.status === "live"
                        ? p.slug === "pogen"
                          ? "Live · 500+"
                          : "Live"
                        : "Completed"}
                    </span>
                  </div>
                  <div className="sub">{p.subtitle}</div>
                  <p>{p.summary}</p>
                  <div className="tile-stack">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="pill">{s}</span>
                    ))}
                    {p.stack.length > 4 && <span className="pill">+{p.stack.length - 4}</span>}
                  </div>
                  <div className="tile-actions" style={{ position: "relative", zIndex: 2 }}>
                    <a
                      href={p.links.github ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={p.links.github ? "" : "disabled"}
                    >
                      <Github />
                      GitHub
                    </a>
                    <a
                      href={p.links.demo ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={p.links.demo ? "" : "disabled"}
                    >
                      <ExternalLink />
                      {p.links.demo ? "Demo" : "No demo"}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}

        {/* Empty hint card */}
        <Reveal
          delay={1}
          style={{
            background: "transparent",
            border: "1px dashed var(--hairline-2)",
            borderRadius: "var(--r-lg)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: 380,
            gridColumn: "span 2",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              marginBottom: 16,
            }}
          >
            // in progress
          </div>
          <h3 className="serif" style={{ fontSize: 32, color: "var(--text-2)", marginBottom: 8 }}>
            Next project, brewing.
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-3)", maxWidth: "32ch" }}>
            Something at the intersection of agents and infrastructure. Subscribe to writing for the build log.
          </p>
          <Link href="/blog" className="btn btn-ghost" style={{ marginTop: 24, fontSize: 13 }}>
            Read the writing →
          </Link>
        </Reveal>
      </div>
    </>
  );
}
