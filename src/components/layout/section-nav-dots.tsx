"use client";

import { useEffect, useState } from "react";
import { homeSections } from "@/data/nav";

const items = homeSections;

export function SectionNavDots() {
  const [active, setActive] = useState<string>(items[0].id);

  useEffect(() => {
    const elements = items
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="section-nav" aria-label="Section navigation">
      {items.map((s) => (
        <div
          key={s.id}
          className={`nav-item${active === s.id ? " active" : ""}`}
          data-target={s.id}
          onClick={() => goTo(s.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goTo(s.id);
            }
          }}
        >
          <span className="label">{s.label}</span>
          <span className="dot-mark" />
        </div>
      ))}
    </aside>
  );
}
