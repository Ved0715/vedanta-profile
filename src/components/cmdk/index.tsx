"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { buildCommands, type CmdKCommand, ICON_PATHS, rank } from "./commands";
import { profile } from "@/data/profile";

const MAX_RESULTS = 12;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

function highlight(text: string, q: string): string {
  if (!q) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return escapeHtml(text);
  return (
    escapeHtml(text.slice(0, idx)) +
    "<mark>" +
    escapeHtml(text.slice(idx, idx + q.length)) +
    "</mark>" +
    escapeHtml(text.slice(idx + q.length))
  );
}

export function CmdK() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allCommands = useMemo(() => buildCommands(isHome), [isHome]);
  const filtered = useMemo(() => {
    const r = rank(allCommands, query.trim());
    return query.trim() ? r.slice(0, MAX_RESULTS) : r;
  }, [allCommands, query]);

  const close = useCallback(() => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActive(0);
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  // Global ⌘K / Ctrl+K toggle + custom open event from nav trigger.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cmdOrCtrl = e.metaKey || e.ctrlKey;
      if (cmdOrCtrl && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openPalette();
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, [open, close, openPalette]);

  const execute = useCallback(
    (cmd: CmdKCommand | undefined) => {
      if (!cmd) return;

      if (cmd.action === "copy-email") {
        const email = profile.contact.email;
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(email).then(() => setToast("Email copied to clipboard"));
        } else {
          setToast("Email: " + email);
        }
        close();
        setTimeout(() => setToast(null), 2200);
        return;
      }
      if (cmd.action === "open-clone") {
        close();
        setTimeout(() => window.dispatchEvent(new Event("clone-chat:open")), 220);
        return;
      }
      if (cmd.href) {
        close();
        if (cmd.external) {
          window.open(cmd.href, "_blank", "noopener,noreferrer");
          return;
        }
        if (cmd.href.startsWith("#")) {
          document.querySelector(cmd.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (cmd.href.startsWith("mailto:") || cmd.href.endsWith(".pdf")) {
          window.location.href = cmd.href;
          return;
        }
        // Same-origin anchor with hash → next router does not smooth-scroll into anchors
        // on hash links, so use plain navigation.
        if (cmd.href.includes("#")) {
          window.location.href = cmd.href;
          return;
        }
        router.push(cmd.href);
      }
    },
    [close, router],
  );

  // List keyboard nav.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        execute(filtered[active]);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        setActive(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        setActive(filtered.length - 1);
        return;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered, active, close, execute]);

  // Scroll active row into view.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const row = list.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }, [active, filtered]);

  // Reset selection on query change.
  useEffect(() => {
    setActive(0);
  }, [query]);

  const renderRow = (c: CmdKCommand, i: number) => {
    const iconInner =
      c.mono != null ? (
        <span className="mono-glyph">{c.mono}</span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          dangerouslySetInnerHTML={{ __html: c.iconKey ? ICON_PATHS[c.iconKey] : ICON_PATHS.arrowRight }}
        />
      );

    const meta = c.external ? (
      <span className="ext-mark">
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICON_PATHS.external }} />
      </span>
    ) : c.kbd ? (
      <span className="kbd-hint">
        {c.kbd.map((k) => (
          <kbd key={k}>{k}</kbd>
        ))}
      </span>
    ) : (
      <span className="ext-mark">
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICON_PATHS.arrowRight }} />
      </span>
    );

    return (
      <div
        key={`${c.group}-${c.label}-${i}`}
        className={`cmdk-row${i === active ? " active" : ""}`}
        data-idx={i}
        onMouseMove={() => setActive(i)}
        onClick={() => execute(c)}
      >
        <span className="icon">{iconInner}</span>
        <div className="label-col">
          <div className="label-main" dangerouslySetInnerHTML={{ __html: highlight(c.label, query.trim()) }} />
          <div className="label-sub" dangerouslySetInnerHTML={{ __html: highlight(c.sub || "", query.trim()) }} />
        </div>
        <div className="meta">{meta}</div>
      </div>
    );
  };

  const groupedRows = () => {
    const q = query.trim();
    if (q) return filtered.map(renderRow);

    const out: React.ReactNode[] = [];
    let lastGroup: string | null = null;
    filtered.forEach((c, i) => {
      if (c.group !== lastGroup) {
        out.push(
          <div key={`g-${c.group}`} className="cmdk-group">
            {c.group}
          </div>,
        );
        lastGroup = c.group;
      }
      out.push(renderRow(c, i));
    });
    return out;
  };

  return (
    <>
      <div
        className={`cmdk-backdrop${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="cmdk-panel">
          <div className="cmdk-input-row">
            <span className="cmdk-prompt">›</span>
            <input
              ref={inputRef}
              className="cmdk-input"
              type="text"
              placeholder="Type a command, page, or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="cmdk-esc" onClick={close}>
              esc
            </span>
          </div>
          <div className="cmdk-list" ref={listRef}>
            {filtered.length === 0 ? (
              <div className="cmdk-empty">
                <div className="glyph">∅</div>
                <div>no matches for &quot;{query}&quot;</div>
                <div className="hint">try: &quot;about&quot;, &quot;projects&quot;, &quot;github&quot;, &quot;email&quot;</div>
              </div>
            ) : (
              groupedRows()
            )}
          </div>
          <div className="cmdk-footer">
            <div className="row">
              <span className="kbd-group">
                <kbd>↑</kbd>
                <kbd>↓</kbd> navigate
              </span>
              <span className="kbd-group">
                <kbd>↵</kbd> select
              </span>
              <span className="kbd-group">
                <kbd>esc</kbd> close
              </span>
            </div>
            <span className="brand">
              <span className="dot" /> v.dev / cmdk
            </span>
          </div>
        </div>
      </div>

      <div className={`cmdk-toast${toast ? " show" : ""}`}>
        <span className="dot" />
        <span className="msg">{toast}</span>
      </div>
    </>
  );
}
