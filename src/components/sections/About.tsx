'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { personalInfo } from '@/data/personal';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: personalInfo.links.linkedin,
      icon: () => (
        <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect height="12" width="4" x="2" y="9"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: personalInfo.links.github,
      icon: () => (
        <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: personalInfo.links.twitter || '#',
      icon: () => (
        <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )
    },
    {
      name: 'Email',
      href: `mailto:${personalInfo.email}`,
      icon: Mail
    },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-20 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orb */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl"
          >
            {/* Small Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 font-mono text-xs md:text-sm uppercase tracking-widest text-white/70"
            >
              Know About Me
            </motion.p>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white"
              style={{
                textShadow: 'rgba(255, 255, 255, 0.05) 0px 4px 8px, rgba(255, 255, 255, 0.25) 0px 8px 30px',
              }}
            >
              GenAI Engineer and a little bit of{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic">
                everything
              </span>
            </motion.h2>

            {/* Description Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-base lg:text-lg text-neutral-300 leading-relaxed tracking-wide"
            >
              <p>
                I'm Vedant Narwade, a passionate engineer who loves building intelligent systems that make a real impact.
                From AI to full-stack, I thrive on solving complex challenges with elegant solutions.
              </p>

              <p>
                When I'm not deep in code, I'm exploring new technologies, diving into research, or sharing knowledge
                with the community. Life's about continuous learning, and I embrace every opportunity.
              </p>

              <p>
                I believe in waking up each day eager to build something meaningful!
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 mt-8"
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-neutral-300 hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    {typeof IconComponent === 'function' && IconComponent.name === '' ? (
                      <IconComponent />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </motion.a>
                );
              })}
            </motion.div>

          </motion.div>

          {/* Right: Profile Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative w-64 h-64 lg:w-96 lg:h-96"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-[58px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-3xl"
                animate={{
                  opacity: isHovered ? 0.4 : 0.2,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Main card */}
              <motion.div
                className="relative w-full h-full rounded-[58px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(20px)',
                }}
              >
                {/* Inner content - Replace with actual profile image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Placeholder - Replace with Next Image component and actual photo */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl lg:text-9xl font-bold text-white/90">
                      {personalInfo.name.split(' ')[0][0]}{personalInfo.name.split(' ')[1][0]}
                    </div>
                  </div>
                </div>

                {/* Overlay grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? '100%' : '-100%',
                  }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-400/80 blur-sm"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.6)',
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-purple-400/80 blur-sm"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                style={{
                  boxShadow: '0 0 20px 2px rgba(168, 85, 247, 0.5)',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
