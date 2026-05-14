"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { Github, Linkedin, Twitter } from "@/components/ui/icons";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--mono)",
  fontSize: 11,
  color: "var(--text-3)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--hairline)",
  borderRadius: 10,
  padding: "12px 14px",
  color: "var(--text)",
  font: "inherit",
  fontSize: 14,
};

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // No backend wired up yet — the design ships a static form.
    // Replace with a fetch("/api/contact") call once the API route exists.
    setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <section id="contact" style={{ padding: "140px 0" }}>
      <div className="container">
        <Reveal className="section-marker">
          <span className="num">§ 07</span> · Let&apos;s talk
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "flex-start" }}>
          {/* Form */}
          <Reveal className="card" style={{ padding: 40 }}>
            <h2 style={{ fontSize: 36, marginBottom: 8 }}>
              Got a <span className="serif" style={{ color: "var(--accent)" }}>problem</span> worth solving?
            </h2>
            <p style={{ marginBottom: 32, fontSize: 15 }}>
              Tell me what you&apos;re building. I read everything.
            </p>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="What's this about?"
                  style={inputStyle}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell me about the project, the problem, the timeline…"
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: 8, alignSelf: "flex-start" }}
                disabled={status === "sending"}
              >
                {status === "sent" ? "Message sent" : status === "sending" ? "Sending…" : "Send message"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)" }}>
                Powered by Resend · usually reply within 24h
              </div>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal delay={1} style={{ paddingTop: 12 }}>
            <h2 style={{ fontSize: 48, marginBottom: 24, lineHeight: 1.05 }}>
              Or just<br />
              <span className="serif" style={{ color: "var(--accent)" }}>email</span> me
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>

            <a
              href={`mailto:${profile.contact.email}`}
              style={{
                fontSize: 18,
                color: "var(--text)",
                display: "inline-flex",
                gap: 8,
                alignItems: "center",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 4,
                marginBottom: 40,
              }}
            >
              {profile.contact.email}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>

            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Availability
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: "rgba(94,201,138,0.08)",
                  border: "1px solid rgba(94,201,138,0.25)",
                  borderRadius: "var(--r-pill)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#5ec98a",
                    boxShadow: "0 0 8px #5ec98a",
                  }}
                />
                <span style={{ fontSize: 13 }}>Open to interesting AI engineering work</span>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Find me
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { Icon: Github, url: profile.socials.github.url, label: "GitHub", handle: `@${profile.socials.github.handle}` },
                  { Icon: Linkedin, url: profile.socials.linkedin.url, label: "LinkedIn", handle: profile.socials.linkedin.handle },
                  { Icon: Twitter, url: profile.socials.twitter.url, label: "Twitter / X", handle: `@${profile.socials.twitter.handle}` },
                ].map(({ Icon, url, label, handle }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      border: "1px solid var(--hairline)",
                      borderRadius: 12,
                      fontSize: 14,
                    }}
                  >
                    <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <Icon />
                      {label}
                    </span>
                    <span className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <a href={profile.resume} className="btn-link mono" style={{ fontSize: 13 }}>
                ↓ Download resume.pdf
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
