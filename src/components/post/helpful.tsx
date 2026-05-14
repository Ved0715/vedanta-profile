"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "@/components/ui/icons";

export function Helpful() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 24,
        padding: 28,
        background: "var(--bg-elev-1)",
        border: "1px solid var(--hairline)",
        borderRadius: "var(--r-md)",
      }}
    >
      <div>
        <div style={{ fontSize: 15, marginBottom: 6 }}>Did you find this helpful?</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>
          No backend — just lets me know.
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button className={`helpful-btn${vote === "up" ? " active" : ""}`} onClick={() => setVote("up")} aria-label="Helpful">
          <ThumbsUp />
        </button>
        <button className={`helpful-btn${vote === "down" ? " active" : ""}`} onClick={() => setVote("down")} aria-label="Not helpful">
          <ThumbsDown />
        </button>
      </div>
    </div>
  );
}
