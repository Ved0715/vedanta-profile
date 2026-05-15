"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingWidgets() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch the contact section (home only) — float-contact hides while it's in view.
  useEffect(() => {
    if (!isHome) {
      setContactInView(false);
      return;
    }
    const el = document.getElementById("contact");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setContactInView(e.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [isHome, pathname]);

  // Watch the footer on every page — when it's visible the floating widgets
  // would overlap the copyright row, so hide them. Also gives the clone-toggle
  // and back-top a clean ledge to disappear at.
  useEffect(() => {
    const el = document.querySelector("footer");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setFooterInView(e.isIntersecting),
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pathname]);

  const showFloat = scrolled && !contactInView && !footerInView;
  // back-to-top shows when scrolled past the contact section OR when the footer
  // is in view on inner pages (where there's no contact section to anchor to).
  const showBackTop = scrolled && (contactInView || (!isHome && footerInView));

  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <>
      <Link href={contactHref} className={`float-contact${showFloat ? " show" : ""}`}>
        <span className="pulse" />
        Let&apos;s talk
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>

      <button
        className={`back-top${showBackTop ? " show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
