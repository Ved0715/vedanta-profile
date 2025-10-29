'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { workExperience } from '@/data/experience';
import { getTechColor } from '@/lib/utils';

export default function ExperienceSection() {
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
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-8" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Building AI systems that deliver real business impact across research and production environments.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {workExperience.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              {index < workExperience.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-32 bg-gradient-to-b from-neon-blue to-transparent hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline dot */}
                <div className="hidden md:flex items-start pt-6">
                  <div className="w-3 h-3 bg-neon-blue rounded-full border-4 border-dark-bg shadow-lg shadow-neon-blue/30" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-dark-card/50 rounded-lg p-8 border border-white/10 hover:border-neon-blue/30 transition-colors duration-300">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {experience.position}
                        </h3>
                        <div className="text-neon-blue font-semibold text-lg mb-2">
                          {experience.company}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {experience.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {experience.location}
                          </div>
                          <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs">
                            {experience.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-300 flex items-start gap-2">
                            <span className="text-neon-blue mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-blue flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getTechColor(tech)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {experience.highlights.map((highlight, i) => (
                        <div key={i} className="text-center p-3 rounded-lg bg-dark-bg/50">
                          <div className="text-lg font-bold text-neon-blue mb-1">
                            {highlight.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-400">
                            {highlight.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/research"
            className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 font-medium"
          >
            View my research work
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}