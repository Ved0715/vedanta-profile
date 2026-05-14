import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "mcp-server",
    title: "MCP Server",
    subtitle: "Production-grade AI infrastructure",
    category: "AI Infrastructure",
    categories: ["ai"],
    status: "production",
    featured: true,
    year: 2025,

    monoChar: "m",
    monoKey: "mcp",
    bandKey: "mcp",
    bandMeta: "AI Infra · 2025",

    summary:
      "Async LangChain agentic flow over SQL, RAG, web APIs, and Pinecone — sub-second queries at 95%+ accuracy.",
    description:
      "A production-grade Model Context Protocol server with SQL, RAG, web APIs, and Pinecone — orchestrated by async LangChain agentic flows. Sub-second queries across distributed microservices.",

    metrics: [
      { value: "95%+", label: "Document accuracy", color: "accent" },
      { value: "80%", label: "Faster processing", color: "text" },
      { value: "<1s", label: "P95 latency", color: "text" },
      { value: "100+", label: "Documents indexed", color: "amber" },
    ],
    stack: ["Python", "LangChain", "Pinecone", "FastAPI", "PostgreSQL", "Docker", "JWT Auth", "Redis"],
    features: [
      "Async LangChain agentic flow — all tool calls run concurrently with proper backpressure.",
      "95%+ document analysis accuracy via hybrid retrieval (dense + sparse) and reranking.",
      "Sub-second query performance through caching, connection pooling, and parallel tool dispatch.",
      "80% faster data processing via streamed ingest replacing a batch job.",
      "Distributed microservices behind a thin gateway, each scaling on its own load profile.",
      "Production-grade observability — every tool call traced end-to-end.",
    ],

    links: { github: "https://github.com/Ved0715/mcp-server", demo: null },
  },
  {
    slug: "flox",
    title: "Flox",
    subtitle: "AI-powered GitHub assistant",
    category: "Developer Tools",
    categories: ["ai", "web", "tools"],
    status: "live",
    featured: false,
    year: 2024,

    monoChar: "f",
    monoKey: "flox",
    bandKey: "flox",
    bandMeta: "Dev Tools · 2024",

    summary:
      "Context-aware repository insights and commit explanations in under 2 seconds. RAG over NeonDB.",
    description:
      "AI-powered GitHub assistant. Context-aware repository insights and commit explanations in under 2 seconds. RAG pipeline over a NeonDB vector store.",

    metrics: [
      { value: "<2s", label: "Inference latency", color: "accent" },
      { value: "100%", label: "Open source", color: "green" },
    ],
    stack: ["Next.js", "Prisma", "NeonDB", "RAG", "TypeScript", "TailwindCSS", "OpenAI"],
    features: [
      "Context-aware repository Q&A grounded in commit history and source.",
      "Commit explanation pipeline using a RAG index over NeonDB.",
      "Sub-2-second responses via streaming + cached embeddings.",
    ],

    links: { github: "https://github.com/Ved0715/flox", demo: "https://flox.dev" },
  },
  {
    slug: "pogen",
    title: "PoGen",
    subtitle: "AI image generation platform",
    category: "AI Art",
    categories: ["ai", "web"],
    status: "live",
    featured: true,
    year: 2024,

    monoChar: "p",
    monoKey: "pogen",
    bandKey: "pogen",
    bandMeta: "AI Art · 2024",

    summary:
      "FLUX.1-dev served behind a community gallery. AWS infra, real-time generation, user profiles & sharing.",
    description:
      "FLUX.1-dev served behind a community gallery. AWS-hosted scalable infra, real-time generation, user profiles, sharing.",

    metrics: [
      { value: "500+", label: "Active users", color: "accent" },
      { value: "Live", label: "In production", color: "green" },
    ],
    stack: ["React", "Node", "MongoDB", "AWS", "HuggingFace", "FLUX.1-dev", "S3", "Lambda"],
    features: [
      "FLUX.1-dev image generation served via HuggingFace inference.",
      "Community gallery with user profiles and sharing.",
      "AWS-hosted, autoscaling worker pool for real-time generation.",
    ],

    links: { github: "https://github.com/Ved0715/pogen", demo: "https://pogen.app" },
  },
  {
    slug: "image-captioning",
    title: "Image Captioning",
    subtitle: "BLIP-based caption generator",
    category: "Computer Vision",
    categories: ["ai"],
    status: "completed",
    featured: false,
    year: 2024,

    monoChar: "i",
    monoKey: "vision",
    bandKey: "vision",
    bandMeta: "Computer Vision · 2024",

    summary:
      "30K Flickr image-caption pairs. Multi-domain support, real-time inference, transformer-based.",
    description:
      "BLIP-based caption generator trained on 30K image-caption pairs from Flickr. Real-time inference, multi-domain support.",

    metrics: [
      { value: "30K+", label: "Training pairs", color: "accent" },
      { value: "Real-time", label: "Inference", color: "text" },
    ],
    stack: ["BLIP", "PyTorch", "CV", "Transformers", "Flickr30K", "HuggingFace"],
    features: [
      "BLIP architecture fine-tuned on Flickr30K caption pairs.",
      "Multi-domain caption transfer for new image distributions.",
      "Real-time inference path via HuggingFace pipelines.",
    ],

    links: { github: "https://github.com/Ved0715/image-captioning", demo: null },
  },
];

export const research = {
  slug: "deepfake-vit",
  title: "DeepFake Detection via ViT & ViViT",
  bandMeta: "NIT Trichy · 2024",
  monoChar: "r",
  category: "Computer Vision",
  summary:
    "Vision Transformer and Video Vision Transformer architectures for DeepFake detection — novel preprocessing improved accuracy 25% over baseline. Trained on 100K+ video samples.",
  metrics: [
    { value: "+25%", label: "Accuracy gain" },
    { value: "100K+", label: "Samples" },
  ],
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const len = projects.length;
  const prev = projects[(i - 1 + len) % len];
  const next = projects[(i + 1) % len];
  return { prev, next };
}
