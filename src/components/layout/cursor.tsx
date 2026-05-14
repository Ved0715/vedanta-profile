"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    document.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onEnter = () => {
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.borderColor = "rgba(124,196,240,0.9)";
    };
    const onLeave = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "rgba(124,196,240,0.5)";
    };

    // Delegated hover detection — catches dynamically added elements.
    const enter = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest("a, button, .card, .clickable")) onEnter();
    };
    const leave = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest("a, button, .card, .clickable")) onLeave();
    };
    document.addEventListener("mouseover", enter, true);
    document.addEventListener("mouseout", leave, true);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", enter, true);
      document.removeEventListener("mouseout", leave, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
