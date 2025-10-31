'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Project data type
interface Project {
  id: string;
  title: string;
  description: string;
  gradient: string;
  tech: string[];
  features: string[];
  link: string;
}

// Projects data
const projects: Project[] = [
  {
    id: 'rag-document-qa',
    title: 'RAG Document QA System',
    description: 'Enterprise AI platform for intelligent document processing with 95%+ accuracy and sub-second retrieval',
    gradient: 'linear-gradient(10deg, #DB2777 49.9%, #DB2777 81.7%, #F472B6 99.88%)',
    tech: ['Python', 'LangChain', 'FAISS', 'FastAPI', 'React', 'PostgreSQL'],
    features: [
      'Built RAG system with LangChain for semantic document search',
      'Implemented vector embeddings with FAISS for sub-second retrieval',
      'Achieved 95%+ content extraction accuracy using LLMs',
      'Deployed scalable API with FastAPI serving 100+ documents'
    ],
    link: '/projects/rag-document-qa'
  },
  {
    id: 'deepfake-detection',
    title: 'DeepFake Detection System',
    description: 'AI model for detecting manipulated media with 25% improved accuracy using transfer learning',
    gradient: 'linear-gradient(10deg, #2932CB 49.9%, #2932CB 81.7%, #7980FF 99.88%)',
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Streamlit'],
    features: [
      'Developed CNN-based model for deepfake detection',
      'Improved detection accuracy by 25% using transfer learning',
      'Built real-time detection pipeline with video processing',
      'Created interactive demo with Streamlit for visualization'
    ],
    link: '/projects/deepfake-detection'
  },
  {
    id: 'ai-chatbot',
    title: 'Multi-Agent AI Chatbot',
    description: 'Intelligent chatbot system with context-aware responses, memory, and multi-agent orchestration',
    gradient: 'linear-gradient(10deg, #14B8A6 49.9%, #14B8A6 81.7%, #5EEAD4 99.88%)',
    tech: ['Python', 'LangChain', 'CrewAI', 'Next.js', 'MongoDB', 'Pinecone'],
    features: [
      'Built multi-agent system using CrewAI for task delegation',
      'Implemented conversation memory with Pinecone vector storage',
      'Integrated multiple LLM providers (OpenAI, Anthropic, Ollama)',
      'Created responsive chat interface with Next.js and real-time updates'
    ],
    link: '/projects/ai-chatbot'
  }
];

const StickyScrollReveal = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set<number>());
  const containerRef = useRef<HTMLDivElement>(null);

  // Visibility tracking with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...Array.from(prev), cardIndex]));
          } else {
            setVisibleCards(prev => {
              const newSet = new Set(Array.from(prev));
              newSet.delete(cardIndex);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Active project detection with scroll listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const cards = Array.from(containerRef.current.querySelectorAll('.project-card'));
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const viewportCenter = scrollY + windowHeight / 2;

          let closestIndex = 0;
          let closestDistance = Infinity;

          cards.forEach((card, index) => {
            const cardElement = card as HTMLElement;
            const rect = cardElement.getBoundingClientRect();
            const cardCenter = rect.top + scrollY + rect.height / 2;
            const distance = Math.abs(viewportCenter - cardCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          setActiveProject(closestIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const currentProject = projects[activeProject];

  return (
    <div className="w-full lg:flex lg:gap-x-12" ref={containerRef}>
      {/* Left Side - Project Cards */}
      <div className="flex flex-col gap-y-6 lg:w-[65%] lg:gap-y-[15vh] lg:pr-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-index={index}
            className="project-card flex w-full flex-row transition-all duration-700 ease-out"
            style={{
              opacity: visibleCards.has(index) ? 1 : 0,
              transform: visibleCards.has(index) ? 'none' : 'translateY(20px) scale(0.9)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '60vh'
            }}
          >
            <div className="flex w-full flex-col lg:mx-10 lg:w-full">
              <a
                draggable="false"
                className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#f2f2f20c] p-1 shadow-2xl lg:rounded-3xl lg:p-2 w-full"
                href={project.link}
              >
                {/* Top gradient line */}
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 5%, rgba(255, 255, 255, 0.8) 35%, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0.8) 65%, rgba(0, 0, 0, 0) 95%)'
                  }}
                />

                <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-b from-black/20 to-black/45 transition-colors duration-300 hover:from-black/20 lg:from-black/35">
                  {/* Gradient background */}
                  <div
                    className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: project.gradient,
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                    }}
                  />

                  {/* Top inner line */}
                  <div
                    className="absolute inset-x-0 top-px z-10 h-[0.8px] opacity-70"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 20%, rgb(255, 255, 255) 50%, rgba(0, 0, 0, 0) 80%)'
                    }}
                  />

                  {/* Description (Desktop) */}
                  <div className="hidden w-full flex-row items-center justify-between gap-8 px-10 py-8 text-white/70 lg:flex">
                    <h3 className="text-xl tracking-tight xl:text-2xl">
                      {project.description}
                    </h3>
                    <ArrowRight className="size-6 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </div>

                  {/* Project Image Placeholder */}
                  <div
                    className="w-full max-w-[85%] translate-y-5 rounded-t-lg will-change-transform transition-all duration-700 -rotate-3 lg:rotate-0 lg:group-hover:-rotate-3 lg:group-hover:scale-[1.08] shadow-[0px_40px_50px_10px_rgba(0,0,0,0.22)]"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                    }}
                  >
                    <div className="w-full aspect-[16/10] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-t-lg flex items-center justify-center text-white/50 text-xl md:text-2xl font-bold p-8 text-center">
                      {project.title}
                    </div>
                  </div>
                </div>
              </a>

              {/* Mobile Project Details */}
              <div className="mt-6 mb-12 flex flex-col lg:hidden">
                <div className="flex items-center">
                  <h2 className="my-auto line-clamp-1 text-base text-white/80">
                    {project.title}
                  </h2>
                </div>
                <div className="mt-1 flex w-full flex-row items-center justify-between gap-8 text-base text-white">
                  <h3>{project.description}</h3>
                  <ArrowRight className="size-6 shrink-0" />
                </div>
                <div className="my-4 flex max-w-fit flex-wrap items-center gap-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap border font-mono text-white transition-[color,box-shadow] border-white/[0.14] bg-neutral-900 rounded p-0.5 px-1.5 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Sticky Sidebar (Desktop only) */}
      <div className="hidden lg:block lg:w-[35%]">
        <div className="sticky top-28 h-fit">
          <div className="flex w-full">
            {/* Color Indicator */}
            <div
              aria-hidden="true"
              className="my-4 mr-4 h-[2px] min-w-6 rounded-full transition-all duration-300 ease-out"
              style={{
                backgroundColor: activeProject === 0 ? '#DB2777' : activeProject === 1 ? '#2932CB' : '#14B8A6',
                transform: 'scaleX(1)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            />

            {/* Project Details */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <h3 className="font-bold font-serif text-3xl text-white transition-all duration-300 ease-out">
                  {currentProject.title}
                </h3>
              </div>

              <p className="my-2 font-light text-base text-white/90 leading-relaxed transition-all duration-300 ease-out">
                {currentProject.description}
              </p>

              {/* Features */}
              <ul className="mt-4 flex flex-col gap-y-2 text-base text-white/90">
                {currentProject.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm transition-all duration-300 ease-out"
                    style={{
                      opacity: 1,
                      transform: 'translateX(0)',
                      transitionDelay: `${index * 20}ms`
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1 mr-2 size-5 shrink-0 transition-all duration-300"
                      style={{
                        fill: activeProject === 0 ? '#DB2777' : activeProject === 1 ? '#2932CB' : '#14B8A6'
                      }}
                    >
                      <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="mt-10 flex flex-wrap gap-3 text-sm">
                {currentProject.tech.map((tech, index) => (
                  <div
                    key={tech}
                    style={{
                      opacity: 1,
                      transform: 'none',
                      transition: `all 0.2s ease-out ${index * 10}ms`
                    }}
                  >
                    <span className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border px-3 py-1 font-mono text-white text-sm border-white/[0.14] bg-neutral-900 hover:scale-105 transition-transform">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen py-20 bg-black"
      id="projects"
    >
      {/* Section Header */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <p className="mb-4 font-mono text-xs md:text-sm uppercase tracking-widest text-white/70">
            Featured Case Studies
          </p>
          <h2
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight"
            style={{
              textShadow: '0px 4px 8px rgba(255,255,255,.05), 0px 8px 30px rgba(255,255,255,.25)'
            }}
          >
            <span className="text-white">Curated</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic animate-gradient-x">
              work
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Sticky Scroll Reveal Component */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <StickyScrollReveal />
      </div>

      {/* See more projects link */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="group flex w-fit items-center justify-center gap-2 font-mono text-white/90 transition-colors hover:text-white mx-auto md:mt-20 mt-10"
          href="/projects"
        >
          See more projects
          <div className="size-[25px] overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:bg-white/10">
            <div className="-translate-x-1/2 flex w-12 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
              <span className="flex size-6">
                <ArrowRight className="m-auto size-[14px]" />
              </span>
              <span className="flex size-6">
                <ArrowRight className="m-auto size-[14px]" />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
