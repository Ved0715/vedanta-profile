import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type TocItem = { id: string; label: string; l3?: boolean };

export function getPostBody(slug: string): string | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf-8");
}

// Slugify the same way rehype-slug does (kebab-case, drop punctuation) so anchor
// links in the TOC match the IDs that rehype-slug injects into rendered headings.
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractToc(md: string): TocItem[] {
  const lines = md.split("\n");
  const toc: TocItem[] = [];
  let inCode = false;
  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h2) {
      toc.push({ id: slugifyHeading(h2[1]), label: h2[1] });
    } else if (h3) {
      toc.push({ id: slugifyHeading(h3[1]), label: h3[1], l3: true });
    }
  }
  return toc;
}
