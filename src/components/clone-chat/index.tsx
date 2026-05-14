"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Msg = { role: "bot" | "user"; text: string; typing?: boolean };

const INITIAL_BOT_GREETING =
  "Hey 👋 I'm Vedant's portfolio clone — ask me anything about his work, projects, or what he's been building lately.";

const SUGGESTIONS = [
  "What's MCP Server?",
  "How do you do RAG at scale?",
  "Are you available to hire?",
];

function mockReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("rag"))
    return "I build production RAG with LlamaIndex + Pinecone/FAISS. At AIVI my pipelines hit 95%+ extraction accuracy via hybrid retrieval and careful chunking.";
  if (lower.includes("agent") || lower.includes("meragi") || lower.includes("langgraph"))
    return "At Meragi I built a 5-node multi-agent BOM Chat in LangGraph plus a Lead Analysis Agent that lifted conversion 30% and a Venue Intelligence Pipeline that cut assessment time 60%.";
  if (lower.includes("hire") || lower.includes("available"))
    return `I'm at ${profile.currentRole.company} full-time, but always open to interesting engineering problems. Drop me a note at ${profile.contact.email}.`;
  if (lower.includes("mcp"))
    return "MCP Server is a production-grade AI infra layer I built — async LangChain agentic flow, SQL + RAG + web APIs, sub-second queries, 80% faster processing.";
  return `Good question. I'm ${profile.name} — SDE 1 at ${profile.currentRole.company}. Ask me about agents, RAG, LangGraph, or my projects.`;
}

export function CloneChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: INITIAL_BOT_GREETING },
  ]);
  const [input, setInput] = useState("");
  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("clone-chat:open", onOpen);
    return () => window.removeEventListener("clone-chat:open", onOpen);
  }, []);

  const send = useCallback(
    (qIn: string) => {
      const q = qIn.trim();
      if (!q) return;
      setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: "thinking…", typing: true }]);
      setInput("");

      // Local mock — replace with real backend call when wired up.
      setTimeout(() => {
        setMessages((m) => {
          const copy = m.slice();
          for (let i = copy.length - 1; i >= 0; i--) {
            if (copy[i].typing) {
              copy[i] = { role: "bot", text: mockReply(q) };
              break;
            }
          }
          return copy;
        });
      }, 600);
    },
    [],
  );

  return (
    <>
      <button className="clone-toggle" aria-label="Ask my clone" onClick={() => setOpen((o) => !o)}>
        <div className="avatar">V</div>
        <span>Ask my clone</span>
        <span className="live" />
      </button>

      <div className={`clone-panel${open ? " open" : ""}`}>
        <div className="head">
          <div className="who">
            <div className="avatar">V</div>
            <div>
              <div className="name">Vedant&apos;s clone</div>
              <div className="status">
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
                online · trained on Vedant
              </div>
            </div>
          </div>
          <button className="close" aria-label="Close" onClick={() => setOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="clone-stream" ref={streamRef}>
          {messages.map((m, i) => (
            <div key={i} className={`clone-msg ${m.role}${m.typing ? " typing" : ""}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="clone-suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="sug" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>

        <div className="clone-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send(input);
            }}
          />
          <button aria-label="Send" onClick={() => send(input)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
