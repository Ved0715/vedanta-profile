"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CmdKTrigger } from "@/components/cmdk/trigger";

const SECTION_IDS = ["home", "about", "work", "research", "contact"] as const;

export function Nav() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (!isHome) return;
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  const isRouteActive = (href: string) => pathname.startsWith(href);
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <nav className="nav">
      <Link className="nav-brand" href="/">
        <span className="sigil">V</span>
        <span>
          vedant<span style={{ color: "var(--text-3)" }}>.dev</span>
        </span>
        <span className="meta">/ Software Engineer</span>
      </Link>

      <div className="nav-links">
        {isHome ? (
          <>
            <a className={`nav-link section${activeSection === "home" ? " active" : ""}`} href="#home">
              Index
            </a>
            <a className={`nav-link section${activeSection === "about" ? " active" : ""}`} href="#about">
              About
            </a>
            <a className={`nav-link section${activeSection === "work" ? " active" : ""}`} href="#work">
              Work
            </a>
            <a className={`nav-link section${activeSection === "research" ? " active" : ""}`} href="#research">
              Research
            </a>
            <Link className="nav-link route" href="/projects">
              Projects
            </Link>
            <Link className="nav-link route" href="/blog">
              Writing
            </Link>
            <a className={`nav-link section${activeSection === "contact" ? " active" : ""}`} href="#contact">
              Contact
            </a>
          </>
        ) : (
          <>
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className={`nav-link route${isRouteActive("/projects") ? " active" : ""}`} href="/projects">
              Projects
            </Link>
            <Link className={`nav-link route${isRouteActive("/blog") ? " active" : ""}`} href="/blog">
              Writing
            </Link>
            <a className="nav-link" href={sectionHref("contact")}>
              Contact
            </a>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <CmdKTrigger />
        <a className="nav-cta" href={sectionHref("contact")}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#5ec98a",
              boxShadow: "0 0 6px #5ec98a",
            }}
          />
          Available
        </a>
      </div>
    </nav>
  );
}
