'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.slice(0, 3);

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
            Featured Work
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <p className="text-xl text-neutral-400 max-w-2xl">
            A selection of projects showcasing expertise in AI, machine learning, and full-stack development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/50">
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <div className="text-8xl opacity-50">{project.icon}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/80" />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Project Info */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-400 font-medium">
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-light mb-4 text-white">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-blue-400 font-medium mb-6">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-neutral-300 leading-relaxed text-lg">
                  {project.description}
                </p>

                {/* Key Features */}
                <div>
                  <h4 className="text-white font-medium mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-neutral-400 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-sm rounded-full border border-neutral-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-3 py-1 text-neutral-400 text-sm rounded-full border border-neutral-700/50">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-neutral-700 text-white rounded-full font-medium hover:border-neutral-500 transition-all duration-300"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}