"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  id?: string;
};

export function Reveal({ as: Tag = "div", delay = 0, className, style, children, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in viewport on mount, reveal immediately.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      requestAnimationFrame(() => setShown(true));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);

    // Safety fallback if IO doesn't fire.
    const t = setTimeout(() => setShown(true), 3000);

    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      className={cn(`reveal${delayClass}`, shown && "in", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
