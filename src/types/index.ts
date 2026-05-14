export type Metric = {
  value: string;
  label: string;
  color?: "accent" | "amber" | "green" | "text";
};

export type ProjectCategory = "ai" | "web" | "tools" | "research";
export type ProjectStatus = "production" | "live" | "completed" | "research";
export type MonoKey = "mcp" | "flox" | "pogen" | "vision" | "research";
export type BandKey = "mcp" | "flox" | "pogen" | "vision" | "research";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  featured: boolean;
  year: number;

  monoChar: string;
  monoKey: MonoKey;
  bandKey: BandKey;
  bandMeta: string;

  summary: string;
  description: string;

  metrics: Metric[];
  stack: string[];
  features: string[];

  links: { github: string | null; demo: string | null; paper?: string };
};

export type Role = {
  id: string;
  company: string;
  title: string;
  type: "Full-time" | "Internship" | "Research Internship" | "Contract";
  location: string;
  start: string;
  end: string | null;
  startLabel: string;
  endLabel: string;
  summary: string;
  stack: string[];
  achievements: { value: string; label: string }[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  publishedLabel: string;
  readingTime: number;
  tags: { label: string; tone?: "accent" | "purple" | "green" | "default" }[];
  featured?: boolean;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  initial: string;
  gradient: [string, string];
  textColor?: string;
};
