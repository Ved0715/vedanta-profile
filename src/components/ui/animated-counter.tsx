"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
};

export function AnimatedCounter({ value, suffix = "", prefix = "", className, style, duration = 1600 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Number.isInteger(value) ? Math.round(value * eased) : parseFloat((value * eased).toFixed(1)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className={className} style={style}>
      {prefix}
      {n}
      {suffix}
    </div>
  );
}
