'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { personalInfo, skills } from '@/data/personal';
import { getTechColor } from '@/lib/utils';

export default function AboutSection() {
  return (
    <div className="min-h-screen flex items-center py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-6">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mb-8" />
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                I'm an AI Engineer at <span className="text-neon-blue font-medium">AIVI.in</span>, 
                where I architect and deploy enterprise-grade AI platforms that serve hundreds of documents 
                with sub-second semantic search and 95%+ content extraction accuracy.
              </p>
              
              <p>
                My expertise spans the full AI/ML pipeline—from research and model development to 
                production deployment. I specialize in <span className="text-neon-purple font-medium">LLM workflows</span>, 
                <span className="text-neon-green font-medium"> RAG systems</span>, and building scalable 
                AI microservices that deliver real business value.
              </p>

              <p>
                Currently pursuing my B.Tech in Computer Science at <span className="text-neon-blue font-medium">
                IIIT Kottayam</span>, I've led research projects at NIT Trichy, improving DeepFake 
                detection accuracy by 25% using Vision Transformers.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {personalInfo.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-lg bg-dark-card/50 border border-white/10"
                >
                  <div className="text-2xl font-bold text-neon-blue mb-1">
                    {highlight.split(' ')[0]}
                  </div>
                  <div className="text-sm text-gray-400">
                    {highlight.split(' ').slice(1).join(' ')}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-8">
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 font-medium"
              >
                Read my full story
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Programming Languages */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTechColor(skill)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">AI/ML & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTechColor(skill)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTechColor(skill)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Focus */}
            <div className="bg-dark-card/50 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-neon-blue mb-3">Currently Working On</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Enterprise AI platform scaling</li>
                <li>• Advanced RAG architectures</li>
                <li>• Multi-agent AI systems</li>
                <li>• Computer vision research</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}