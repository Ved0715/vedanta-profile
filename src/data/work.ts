import type { Role } from "@/types";

export const roles: Role[] = [
  {
    id: "meragi-2025",
    company: "Meragi Events",
    title: "SDE 1",
    type: "Full-time",
    location: "Karnataka, India",
    start: "2025-02",
    end: null,
    startLabel: "FEB 2025 →",
    endLabel: "PRESENT",
    summary:
      "Architected a 5-node multi-agent BOM Chat system in LangGraph with warehouse tool-calling, sourcing guardrails, and CRM integration — eliminating manual Bill of Materials generation for 100+ events. Built a Lead Analysis Agent aggregating CRM notes, WhatsApp, and venue data to generate real-time health scores, driving a 30% lift in lead conversion. Developed a 2-phase Venue Intelligence Pipeline that transcribes audio with speaker ID and sentiment tagging, cutting venue assessment time by 60%.",
    stack: ["LangGraph", "Python", "FastAPI", "PostgreSQL", "CRM"],
    achievements: [
      { value: "100+", label: "events automated" },
      { value: "+30%", label: "lead conversion rate" },
      { value: "60%", label: "faster venue assessment" },
    ],
  },
  {
    id: "aivi-2025",
    company: "AIVI.in",
    title: "SDE 1 · AI Engineer",
    type: "Full-time",
    location: "Karnataka, India",
    start: "2025-06",
    end: "2025-10",
    startLabel: "JUN 2025 →",
    endLabel: "OCT 2025",
    summary:
      "Architected and deployed an enterprise AI platform delivering sub-second semantic search across 100+ documents with optimized chunk filtering and RAG workflows. Designed scalable full-stack apps using FastAPI, Next.js, and PostgreSQL with LangChain, Pinecone, and LlamaParse. Hit 85% cost reduction via deliberate model selection, hybrid retrieval, and production-ready deployment (JWT, Docker).",
    stack: ["FastAPI", "Next.js", "LangChain", "Pinecone", "LlamaParse", "Docker"],
    achievements: [
      { value: "95%+", label: "extraction accuracy" },
      { value: "85%", label: "cost reduction" },
    ],
  },
  {
    id: "digifortex-2024",
    company: "Digifortex Technologies",
    title: "SDE Intern · AI/ML & CyberSecurity",
    type: "Internship",
    location: "Karnataka, India",
    start: "2024-07",
    end: "2025-04",
    startLabel: "JUL 2024 →",
    endLabel: "APR 2025",
    summary:
      "Built a cloud cost management platform using Node.js, React, and PostgreSQL, leveraging AI-driven optimization to improve analysis speed and accuracy by 30% while reducing manual effort by 40%.",
    stack: ["Node.js", "React", "PostgreSQL", "AI/ML"],
    achievements: [
      { value: "+30%", label: "accuracy improvement" },
      { value: "−40%", label: "manual effort" },
    ],
  },
  {
    id: "nit-trichy-2024",
    company: "NIT Trichy",
    title: "AI Research Intern",
    type: "Research Internship",
    location: "Tamil Nadu, India",
    start: "2024-05",
    end: "2024-07",
    startLabel: "MAY 2024 →",
    endLabel: "JUL 2024",
    summary:
      "Researched DeepFake detection using Vision Transformer (ViT) and Video Vision Transformer (ViViT). Developed novel preprocessing and algorithms that improved detection accuracy by 25% over baseline.",
    stack: ["ViT", "ViViT", "PyTorch", "Research"],
    achievements: [
      { value: "+25%", label: "detection accuracy" },
      { value: "100K+", label: "video samples" },
    ],
  },
];

export const education = {
  degree: "B.Tech Computer Science & Engineering",
  institution: "Indian Institute of Information Technology, Kottayam",
  location: "Kerala, India",
  range: "2021 — 2025",
  rangeMeta: "Dec → Apr",
  tags: ["AI & Machine Learning", "Systems Programming", "Deep Learning Research"],
};

export const leadership = [
  {
    title: "Event Manager · Adayva",
    note: "Led a team of 20",
    icon: "users" as const,
  },
  {
    title: "FACTS-H Lab Member",
    note: "Fairness, accountability, transparency in AI",
    icon: "flask" as const,
  },
  {
    title: "Social Impact Club Lead",
    note: "Connected 10+ organisations",
    icon: "star" as const,
  },
];
