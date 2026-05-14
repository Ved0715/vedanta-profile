export const profile = {
  name: "Vedant Narwade",
  title: "AI Engineer & Full-Stack Developer",
  tagline: "Building intelligent systems that scale",
  location: "Karnataka, India",
  timezone: "UTC+5:30",
  available: true,

  contact: {
    email: "vedant.narwade.17@gmail.com",
    phone: "+91 7387440715",
  },

  socials: {
    github: { handle: "Ved0715", url: "https://github.com/Ved0715" },
    linkedin: { handle: "vedant-narwade", url: "https://linkedin.com/in/vedant-narwade" },
    twitter: { handle: "vedant_dev", url: "https://twitter.com/vedant_dev" },
  },

  currentRole: {
    company: "Meragi Events",
    title: "SDE 1",
    startedAt: "2025-02",
  },

  bio: {
    short:
      "Software engineer building intelligent systems that scale — multi-agent flows, RAG pipelines, and the infrastructure underneath.",
    long:
      "SDE 1 at Meragi Events shipping multi-agent BOM and lead-analysis systems. Previously built enterprise document AI at AIVI.in (95%+ extraction accuracy, 85% cost reduction), researched DeepFake detection at NIT Trichy, and built cloud security AI at Digifortex. B.Tech CSE from IIIT Kottayam, 2025.",
  },

  resume: "/resume.pdf",
} as const;
