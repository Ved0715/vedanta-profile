import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { homeSections } from "@/data/nav";

const ICON_PATHS = {
  home: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  quote:
    '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 .985 0 1 0 1 1v1c0 1-1 2-2 2-.985 0-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" stroke="none"/>',
  github:
    '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  twitter:
    '<path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.947-1.327L2.875 1.56h3.246l6.086 8.523.948 1.327 7.91 11.078h-3.246z" fill="currentColor" stroke="none"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  sparkle: '<path d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>',
  external: '<path d="M7 17L17 7M7 7h10v10"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
} as const;

export type CmdKAction = "copy-email" | "open-clone";

export type CmdKCommand = {
  group: "Go to page" | "Section" | "Project" | "Elsewhere" | "Action";
  label: string;
  sub?: string;
  href?: string;
  external?: boolean;
  action?: CmdKAction;
  iconKey?: keyof typeof ICON_PATHS;
  mono?: string;
  kbd?: string[];
};

export { ICON_PATHS };

export function buildCommands(isHome: boolean): CmdKCommand[] {
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const sectionIcon: Record<string, keyof typeof ICON_PATHS> = {
    home: "arrowUp",
    numbers: "hash",
    about: "user",
    work: "star",
    research: "book",
    experience: "briefcase",
    words: "quote",
    contact: "mail",
  };

  return [
    { group: "Go to page", label: "Home", sub: "/", href: "/", iconKey: "home", kbd: ["G", "H"] },
    { group: "Go to page", label: "All projects", sub: "/projects", href: "/projects", iconKey: "grid", kbd: ["G", "P"] },
    { group: "Go to page", label: "Writing", sub: "/writing", href: "/blog", iconKey: "edit", kbd: ["G", "W"] },
    { group: "Go to page", label: "Contact", sub: "Get in touch", href: sectionHref("contact"), iconKey: "mail", kbd: ["G", "C"] },

    ...homeSections.map<CmdKCommand>((s) => ({
      group: "Section",
      label: s.label,
      sub: s.sub,
      href: sectionHref(s.id),
      iconKey: sectionIcon[s.id] ?? "arrowRight",
    })),

    ...projects.map<CmdKCommand>((p) => ({
      group: "Project",
      label: p.title,
      sub: p.subtitle,
      href: `/projects/${p.slug}`,
      mono: p.monoChar,
    })),

    {
      group: "Elsewhere",
      label: "GitHub",
      sub: `@${profile.socials.github.handle}`,
      href: profile.socials.github.url,
      external: true,
      iconKey: "github",
    },
    {
      group: "Elsewhere",
      label: "LinkedIn",
      sub: profile.socials.linkedin.handle,
      href: profile.socials.linkedin.url,
      external: true,
      iconKey: "linkedin",
    },
    {
      group: "Elsewhere",
      label: "Twitter / X",
      sub: `@${profile.socials.twitter.handle}`,
      href: profile.socials.twitter.url,
      external: true,
      iconKey: "twitter",
    },

    { group: "Action", label: "Copy email address", sub: profile.contact.email, action: "copy-email", iconKey: "copy" },
    { group: "Action", label: "Email Vedant", sub: "Opens your mail client", href: `mailto:${profile.contact.email}`, iconKey: "mail" },
    { group: "Action", label: "Download resume", sub: "PDF · 1 page", href: profile.resume, iconKey: "download" },
    { group: "Action", label: "Ask my clone", sub: "Chat with the AI of me", action: "open-clone", iconKey: "sparkle" },
  ];
}

export function fuzzyScore(text: string, q: string): number {
  if (!q) return 1;
  const t = text.toLowerCase();
  const query = q.toLowerCase();
  if (t === query) return 1000;
  if (t.startsWith(query)) return 500;
  const idx = t.indexOf(query);
  if (idx !== -1) return 200 - idx;
  let ti = 0;
  let matches = 0;
  for (const c of query) {
    const found = t.indexOf(c, ti);
    if (found === -1) return 0;
    matches++;
    ti = found + 1;
  }
  return matches;
}

export function rank(commands: CmdKCommand[], q: string): CmdKCommand[] {
  if (!q) return commands;
  return commands
    .map((c) => {
      const labelScore = fuzzyScore(c.label, q);
      const subScore = fuzzyScore(c.sub || "", q) * 0.4;
      const groupScore = fuzzyScore(c.group || "", q) * 0.3;
      const total = Math.max(labelScore, subScore, groupScore);
      return { c, total };
    })
    .filter((x) => x.total > 0)
    .sort((a, b) => b.total - a.total)
    .map((x) => x.c);
}
