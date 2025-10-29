'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '@/data/personal';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20 px-6 lg:px-8 bg-neutral-900/20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
            Let&apos;s Connect
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-transparent mx-auto mb-8" />
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Ready to collaborate on cutting-edge AI projects? Let&apos;s discuss how we can build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-light mb-6 text-white">
                Get in Touch
              </h3>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Whether you&apos;re looking for an AI engineer, need consultation on machine learning projects, 
                or want to discuss research opportunities, I&apos;d love to hear from you.
              </p>
            </div>

            {/* Contact Method */}
            <div className="group">
              <a
                href={`mailto:${personalInfo.email}?subject=Let's collaborate&body=Hi Vedant, I'd like to discuss...`}
                className="flex items-center gap-6 p-6 bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-800/50 hover:border-neutral-700/50 transition-all duration-300 group-hover:bg-neutral-900/50"
              >
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Email</div>
                  <div className="text-neutral-400">{personalInfo.email}</div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-200 ml-auto" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium text-white mb-6">Follow Along</h4>
              <div className="flex gap-4">
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900/50 border border-neutral-800/50 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700/50 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-900/50 border border-neutral-800/50 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700/50 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Main CTA */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-medium text-white mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-neutral-300 mb-8 leading-relaxed">
                I&apos;m currently available for new opportunities and consulting projects. 
                Let&apos;s discuss how we can bring your AI vision to life.
              </p>
              
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Send me an email</span>
                </motion.a>
                
                <motion.a
                  href={personalInfo.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-neutral-700 text-white rounded-xl font-medium hover:border-neutral-500 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.a>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-6 border border-neutral-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Available for opportunities</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Currently open to full-time positions, consulting projects, and research collaborations 
                in AI/ML, especially in enterprise AI systems and computer vision.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20 pt-8 border-t border-neutral-800/50"
        >
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. Crafted with Next.js & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </div>
  );
}