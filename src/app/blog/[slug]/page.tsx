import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeft, Twitter, Linkedin, Link2, ArrowRight } from "@/components/ui/icons";
import { PostToc } from "@/components/post/toc";
import { Helpful } from "@/components/post/helpful";
import { getPost, posts } from "@/data/posts";
import { extractToc, getPostBody } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Vedant Narwade`,
    description: p.description,
  };
}

const tagClass = (tone?: "accent" | "purple" | "green" | "default") =>
  tone === "accent"
    ? "pill pill-accent"
    : tone === "green"
    ? "pill pill-green"
    : tone === "purple"
    ? "pill pill-purple"
    : "pill";

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const body = getPostBody(slug);
  const toc = body ? extractToc(body) : [];

  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <main>
      <section style={{ padding: "160px 0 60px" }}>
        <div className="container">
          <Reveal style={{ maxWidth: 720, margin: "0 auto" }}>
            <Link
              href="/blog"
              className="eyebrow"
              style={{ color: "var(--text-3)", marginBottom: 24, display: "inline-flex" }}
            >
              <ArrowLeft />
              Back to writing
            </Link>

            <div style={{ display: "flex", gap: 6, marginBottom: 24, marginTop: 16, flexWrap: "wrap" }}>
              {post.tags.map((t) => (
                <span key={t.label} className={tagClass(t.tone)}>{t.label}</span>
              ))}
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 5.5vw, 64px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: 28,
              }}
            >
              {post.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderTop: "1px solid var(--hairline)",
                borderBottom: "1px solid var(--hairline)",
                marginBottom: 16,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="author-chip" style={{ width: 36, height: 36, fontSize: 18 }}>
                  V
                </div>
                <div>
                  <div style={{ fontSize: 14 }}>Vedant Narwade</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>
                    SDE 1 · Meragi Events
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24, fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-3)" }}>
                <span>{post.publishedLabel}</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "20px 0 80px" }}>
        <div className="container container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(0, 720px) 1fr", gap: 56 }}>
            {toc.length > 0 ? <PostToc items={toc} /> : <div />}

            <Reveal as="article" className="article">
              {body ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                  {body}
                </ReactMarkdown>
              ) : (
                <>
                  <p style={{ fontSize: 21, color: "var(--text)", lineHeight: 1.55, marginBottom: 32 }}>
                    {post.description}
                  </p>
                  <p>This post is being drafted. Subscribe via RSS or check back soon for the full writeup.</p>
                </>
              )}

              <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--hairline)" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 32, flexWrap: "wrap" }}>
                  {post.tags.map((t) => (
                    <span key={t.label} className={tagClass(t.tone)}>{t.label}</span>
                  ))}
                </div>
                <Helpful />
              </div>
            </Reveal>

            <aside style={{ position: "sticky", top: 100, alignSelf: "start", paddingTop: 12 }}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Share
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="card" style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 10 }}>
                  <Twitter />
                  Share on X
                </button>
                <button className="card" style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 10 }}>
                  <Linkedin />
                  LinkedIn
                </button>
                <button className="card" style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 10 }}>
                  <Link2 />
                  Copy link
                </button>
              </div>

              <div style={{ marginTop: 40 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Status
                </div>
                <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                  Last updated
                  <br />
                  <span className="mono" style={{ color: "var(--text-3)", fontSize: 12 }}>
                    {post.publishedLabel}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0 80px", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Link
              href={`/blog/${next.slug}`}
              className="card"
              style={{ padding: 28, display: "flex", gap: 18, alignItems: "center" }}
            >
              <ArrowLeft size={20} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  ← Previous
                </div>
                <h4 style={{ fontSize: 16 }}>{next.title}</h4>
              </div>
            </Link>
            <Link
              href="/blog"
              className="card"
              style={{ padding: 28, display: "flex", gap: 18, alignItems: "center", textAlign: "right" }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Back to →
                </div>
                <h4 style={{ fontSize: 16 }}>All writing</h4>
              </div>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
