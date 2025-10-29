'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Download } from 'lucide-react';
import { personalInfo } from '@/data/personal';

export default function ContactSection() {
  return (
    <div className="min-h-screen flex items-center py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-6">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-8" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, collaborations, or just chatting about AI and technology. 
            Let's connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's talk about your next project</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you're looking for an AI engineer, need consultation on machine learning projects, 
                or want to discuss research opportunities, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-dark-card/50 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center group-hover:bg-neon-blue/30 transition-colors duration-300">
                  <Mail className="text-neon-blue" size={24} />
                </div>
                <div>
                  <div className="text-white font-medium">Email</div>
                  <div className="text-gray-400">{personalInfo.email}</div>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-dark-card/50 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center group-hover:bg-neon-purple/30 transition-colors duration-300">
                  <Phone className="text-neon-purple" size={24} />
                </div>
                <div>
                  <div className="text-white font-medium">Phone</div>
                  <div className="text-gray-400">{personalInfo.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-dark-card/50 border border-white/10">
                <div className="w-12 h-12 bg-neon-green/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-neon-green" size={24} />
                </div>
                <div>
                  <div className="text-white font-medium">Location</div>
                  <div className="text-gray-400">{personalInfo.location}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow me</h4>
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all duration-300"
                >
                  <Github size={24} />
                </a>
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all duration-300"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-dark-card/50 rounded-lg p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Ready to work together?</h3>
              <p className="text-gray-300 mb-6">
                I'm currently available for new opportunities and consulting projects. 
                Let's discuss how we can bring your AI vision to life.
              </p>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}?subject=Let's work together&body=Hi Vedant, I'd like to discuss a potential collaboration...`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-neon-blue text-dark-bg rounded-lg font-medium hover:bg-neon-blue/90 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/25"
                >
                  <Mail size={20} />
                  Send me an email
                </a>
                
                <a
                  href={personalInfo.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-neon-blue text-neon-blue rounded-lg font-medium hover:bg-neon-blue hover:text-dark-bg transition-all duration-300"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-dark-card/50 rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                <span className="text-neon-green font-medium">Available for opportunities</span>
              </div>
              <p className="text-gray-300 text-sm">
                Currently open to full-time positions, consulting projects, and research collaborations 
                in AI/ML, especially in enterprise AI systems and computer vision.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js and Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </div>
  );
}