'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo, skills } from '@/data/personal';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
        >
          {/* Content */}
          <div className="space-y-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
                About
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-transparent mb-12" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <p className="text-xl text-neutral-300 leading-relaxed">
                I architect enterprise AI platforms that serve 100+ documents with sub-second semantic search and 95%+ accuracy.
              </p>
              
              <p className="text-lg text-neutral-400 leading-relaxed">
                Currently at <span className="text-blue-400 font-medium">AIVI.in</span>, I specialize in LLM workflows, RAG systems, and intelligent document processing. My work spans from research at NIT Trichy—improving DeepFake detection by 25%—to production systems that reduce operational costs by 85%.
              </p>

              <p className="text-lg text-neutral-400 leading-relaxed">
                B.Tech Computer Science at <span className="text-blue-400 font-medium">IIIT Kottayam</span>, focusing on building AI systems that deliver real business impact.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href="/about"
                className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <span>More about my journey</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>

          {/* Skills */}
          <div className="space-y-12">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-light mb-8 text-neutral-200">
                Core Technologies
              </h3>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              {/* AI/ML */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">
                  AI & Machine Learning
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TensorFlow', 'LangChain', 'RAG', 'GPT-4', 'Transformers', 'PyTorch'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-sm rounded-full border border-neutral-700/50 hover:border-blue-500/50 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Development */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">
                  Development
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-sm rounded-full border border-neutral-700/50 hover:border-blue-500/50 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">
                  Tools & Platforms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'Docker', 'Git', 'Pinecone', 'Hugging Face', 'Vector DB'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-sm rounded-full border border-neutral-700/50 hover:border-blue-500/50 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Current focus */}
            <motion.div variants={itemVariants}>
              <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800/50">
                <h4 className="text-lg font-medium text-neutral-200 mb-3">
                  Currently Working On
                </h4>
                <ul className="space-y-2 text-neutral-400">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                    <span>Enterprise AI platform scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                    <span>Advanced RAG architectures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                    <span>Multi-agent AI systems</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}