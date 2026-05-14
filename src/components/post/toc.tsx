"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string; l3?: boolean };

export function PostToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (headings.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    headings.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside className="toc" style={{ paddingTop: 12 }}>
      <div className="label">On this page</div>
      <ul>
        {items.map((i) => (
          <li key={i.id} className={i.l3 ? "l3" : undefined}>
            <a href={`#${i.id}`} className={active === i.id ? "active" : ""}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
