'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { getTechColor } from '@/lib/utils';

export default function ProjectsSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen flex items-center py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-6">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-8" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in AI, machine learning, and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
            >
              {/* Project Image/Visual */}
              <div className="flex-1">
                <div className="relative group">
                  <div className={`aspect-video rounded-lg bg-gradient-to-br ${project.gradient} p-0.5`}>
                    <div className="w-full h-full bg-dark-card rounded-lg flex items-center justify-center">
                      <div className="text-6xl">{project.icon}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-neon-blue/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Project Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-neon-blue">{project.category}</span>
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    <span className="text-sm text-neon-green">{project.status}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-neon-blue font-medium text-lg mb-4">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2 text-sm">
                        <span className="text-neon-blue mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-blue flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 border border-gray-600">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors duration-300"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 font-medium"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue rounded-lg font-medium hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/25"
          >
            View All Projects
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}