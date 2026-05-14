"use client";

export function CmdKTrigger() {
  return (
    <button
      type="button"
      className="cmdk-nav-btn"
      aria-label="Open command palette"
      onClick={() => window.dispatchEvent(new Event("cmdk:open"))}
    >
      <span className="label">Search</span>
      <kbd>⌘</kbd>
      <kbd>K</kbd>
    </button>
  );
}
