'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { workExperience } from '@/data/experience';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20 px-6 lg:px-8 bg-neutral-900/20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
            Experience
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <p className="text-xl text-neutral-400 max-w-2xl">
            Building AI systems that deliver measurable impact across research and production environments.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-16">
          {workExperience.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative group"
            >
              {/* Timeline connector */}
              {index < workExperience.length - 1 && (
                <div className="absolute left-6 top-20 w-px h-32 bg-gradient-to-b from-blue-500/50 to-neutral-800 hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline dot */}
                <div className="hidden md:flex items-start pt-6">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border-4 border-neutral-950 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800/50 hover:border-neutral-700/50 transition-colors duration-300">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-medium text-white mb-2">
                        {experience.position}
                      </h3>
                      <div className="text-blue-400 font-medium text-lg mb-4">
                        {experience.company}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-neutral-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {experience.location}
                        </div>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                          {experience.type}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-300 mb-6 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-8">
                      <h4 className="text-white font-medium mb-4">Key Achievements</h4>
                      <div className="space-y-3">
                        {experience.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-neutral-300 text-sm leading-relaxed">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {experience.highlights.map((highlight, i) => (
                        <div key={i} className="text-center p-4 bg-neutral-800/30 rounded-lg border border-neutral-700/30">
                          <div className="text-lg font-bold text-blue-400 mb-1">
                            {highlight.split(' ')[0]}
                          </div>
                          <div className="text-xs text-neutral-400 leading-tight">
                            {highlight.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-medium mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.slice(0, 8).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-xs rounded-full border border-neutral-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {experience.technologies.length > 8 && (
                          <span className="px-3 py-1 text-neutral-400 text-xs rounded-full border border-neutral-700/50">
                            +{experience.technologies.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}