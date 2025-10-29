export const projects = [
  {
    id: 1,
    title: "MCP Server",
    subtitle: "Production-grade AI Infrastructure",
    description: "Developed a production-grade MCP server with SQL, RAG, web APIs, and Pinecone, using async LangChain Agentic Flow to automate tools and data processing. Achieved 80% faster processing, 95%+ document analysis accuracy, and sub-second query performance across distributed microservices.",
    longDescription: "A comprehensive AI infrastructure solution that demonstrates enterprise-grade architecture and performance optimization. The system leverages async LangChain workflows for intelligent data processing and maintains high accuracy while delivering exceptional performance.",
    technologies: [
      "Python", "LangChain", "RAG", "Pinecone", "SQL", "FastAPI", "Microservices", "Vector Database"
    ],
    features: [
      "95%+ document analysis accuracy",
      "Sub-second query performance",
      "80% faster data processing",
      "Distributed microservices architecture",
      "Async LangChain Agentic Flow",
      "Production-grade scalability"
    ],
    github: "https://github.com/Ved0715/mcp-server",
    demo: "",
    image: "/projects/mcp-server.jpg",
    category: "AI Infrastructure",
    status: "Production",
    gradient: "from-blue-500 via-purple-500 to-cyan-500",
    icon: "🤖"
  },
  {
    id: 2,
    title: "Flox",
    subtitle: "AI-Powered GitHub Assistant",
    description: "An AI-powered GitHub assistant using Next.js, Prisma, NeonDB, and RAG pipelines with LLMs and vector databases. Delivers context-aware repository insights and commit explanations in under 2 seconds.",
    longDescription: "Flox revolutionizes developer productivity by providing intelligent insights into GitHub repositories. Using advanced RAG pipelines and vector databases, it can understand codebases and provide contextual explanations, suggestions, and analysis.",
    technologies: [
      "Next.js", "Prisma", "NeonDB", "RAG", "LLMs", "Vector Database", "TypeScript", "TailwindCSS"
    ],
    features: [
      "Context-aware repository insights",
      "Commit explanation in <2 seconds",
      "RAG-powered code analysis",
      "Vector database integration",
      "Real-time AI responses",
      "Developer-friendly interface"
    ],
    github: "https://github.com/Ved0715/flox",
    demo: "https://flox-ai.vercel.app",
    image: "/projects/flox.jpg",
    category: "Developer Tools",
    status: "Live",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: "💻"
  },
  {
    id: 3,
    title: "PoGen",
    subtitle: "AI Image Generation Platform",
    description: "Developed and deployed PoGen, an AI-powered image generation platform using React, Node.js, MongoDB, AWS, and Hugging Face's FLUX.1-dev model. Supporting 500+ users in generating, sharing, and showcasing digital artwork within a vibrant community.",
    longDescription: "PoGen is a comprehensive platform that democratizes AI-powered image generation. Built with scalability in mind, it serves a growing community of digital artists and creators, providing powerful AI tools with an intuitive interface.",
    technologies: [
      "React", "Node.js", "MongoDB", "AWS", "Hugging Face", "FLUX.1-dev", "Docker", "Express.js"
    ],
    features: [
      "500+ active users",
      "FLUX.1-dev model integration",
      "Community artwork sharing",
      "Scalable cloud infrastructure",
      "Real-time image generation",
      "User gallery and profiles"
    ],
    github: "https://github.com/Ved0715/pogen",
    demo: "https://pogen-ai.com",
    image: "/projects/pogen.jpg",
    category: "AI Art",
    status: "Live",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    icon: "🎨"
  },
  {
    id: 4,
    title: "Image Captioning System",
    subtitle: "BLIP-based Caption Generator",
    description: "Created an advanced image captioning system based on BLIP Image Captioning to generate descriptive and relevant captions for a wide range of images. Trained on Flickr dataset with 30,000 images paired with curated captions.",
    longDescription: "A sophisticated computer vision project that leverages state-of-the-art BLIP architecture for generating human-like image descriptions. The system demonstrates expertise in transformer models and large-scale dataset training.",
    technologies: [
      "Python", "BLIP", "PyTorch", "Computer Vision", "Transformers", "Flickr Dataset", "Deep Learning"
    ],
    features: [
      "BLIP architecture implementation",
      "30,000 image training dataset",
      "Descriptive caption generation",
      "Multi-domain image support",
      "High accuracy captioning",
      "Real-time inference"
    ],
    github: "https://github.com/Ved0715/image-captioning",
    demo: "",
    image: "/projects/image-captioning.jpg",
    category: "Computer Vision",
    status: "Completed",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: "📸"
  }
];

export const researchProjects = [
  {
    id: 1,
    title: "DeepFake Detection",
    institution: "National Institute of Technology Trichy",
    duration: "May 2024 - July 2024",
    description: "Researched DeepFake detection using Vision Transformer (ViT) and Video Vision Transformer (ViViT), developing novel preprocessing and algorithms that improved detection accuracy by 25%.",
    technologies: ["Vision Transformer", "ViViT", "Python", "Computer Vision", "Deep Learning"],
    achievements: [
      "25% improvement in detection accuracy",
      "Novel preprocessing algorithms",
      "Large-scale video dataset training (100K+ samples)",
      "Robust DeepFake detection system"
    ],
    status: "Published Research",
    category: "Computer Vision"
  }
];