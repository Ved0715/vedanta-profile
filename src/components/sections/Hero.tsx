'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCheck } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { useState } from 'react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Large blur orb - center top */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[500px] w-[1400px] opacity-20 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 30%, transparent 70%)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        {/* Dot pattern with mask */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
          }}
        />
      </div>

      {/* Main content container */}
      <div className="container relative z-20 mx-auto mb-14 flex w-full flex-col items-center justify-center gap-y-6 px-4 md:px-6">
        {/* Top badge */}
        <motion.a
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          href="#contact"
          className="group flex cursor-pointer items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm text-sm lg:text-base transition-all duration-300 ease-in hover:scale-[1.02]"
        >
          <span className="mx-1 rounded-full bg-green-600 px-2 py-0.5 text-white text-xs font-medium">
            Available
          </span>
          <span className="relative px-3 py-1.5 text-white/90">
            Open for opportunities
          </span>
          <ArrowRight className="mr-2 h-4 w-4 text-neutral-100/70 transition-transform duration-300 group-hover:translate-x-0.5" />
        </motion.a>

        {/* Main headline with serif font */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full text-balance text-center text-4xl md:text-5xl lg:text-6xl text-white font-serif leading-tight"
        >
          <span className="md:text-nowrap">Building intelligent systems</span>
          <br className="hidden md:block" />
          {' '}that bridge{' '}
          <span className="bg-gradient-to-b from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent italic tracking-tight">
            AI and Enterprise Scale
          </span>
        </motion.h2>

        {/* Name with inline avatar */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-20 flex flex-col sm:flex-row items-center justify-center text-center text-xl md:text-xl lg:text-2xl tracking-tight text-zinc-300"
        >
          <span className="flex items-center justify-center gap-2">
            Hello, I'm {personalInfo.name.split(' ')[0]}
            <motion.div
              className="group relative"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 md:w-20 h-10 md:h-12 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-violet-500 p-0.5">
                <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-purple-500/20">
                  {personalInfo.name.split(' ')[0][0]}{personalInfo.name.split(' ')[1][0]}
                </div>
              </div>
            </motion.div>
          </span>
          <span className="leading-relaxed mt-2 sm:mt-0 sm:ml-2">
            a GenAI & Full-Stack Engineer
          </span>
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="z-100 mt-4 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10"
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur-sm py-1 pr-1 pl-3 md:pl-4 font-medium text-base transition-all hover:bg-white/5"
          >
            <span className="z-10 px-3 text-white transition-colors duration-300 group-hover:text-black">
              Let's Connect
            </span>
            <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
            <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-white p-2 md:p-2.5 transition-colors duration-300 group-hover:bg-transparent">
              <ArrowRight className="h-[18px] w-[18px] text-black transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0 group-hover:text-white" />
              <ArrowRight className="h-[18px] w-[18px] -translate-x-5 absolute text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </button>

          {/* Secondary CTA - Copy Email */}
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 py-2 font-light text-base text-white/75 outline-none transition-all duration-300 cursor-pointer hover:text-white/90"
            type="button"
          >
            {copied ? (
              <CheckCheck className="h-5 w-5 text-green-400" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
            {personalInfo.email}
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient shine effect - Enhanced */}
      <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none">
        <div className="relative h-60 w-full z-[19] mt-4">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 h-[400px] w-[1200px] transform overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
            }}
          >
            {/* Animated purple/indigo glow */}
            <motion.div
              className="absolute bottom-[167px] left-1/2 -translate-x-1/2 h-[111px] w-[787px] transform overflow-hidden blur-[57px]"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, #6366f1 0%, rgba(10,10,10,0) 100%)',
              }}
              animate={{
                x: [-40, 40, -40],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Secondary blue glow */}
            <motion.div
              className="absolute bottom-[200px] left-1/2 -translate-x-1/2 h-[150px] w-[600px] transform overflow-hidden blur-[70px]"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, rgba(59, 130, 246, 0.6) 0%, transparent 100%)',
              }}
              animate={{
                x: [40, -40, 40],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />

            {/* Dark gradient circle - top layer */}
            <div className="absolute -left-[454px] -right-[432px] -bottom-[753px] h-[955px] rounded-[100%] bg-gradient-to-b from-black to-transparent" />

            {/* Bright shine circle - bottom layer */}
            <div
              className="absolute -left-[532px] -right-[510px] -bottom-[759px] h-[956px] rounded-[100%] bg-black"
              style={{
                boxShadow: `
                  inset 0 2px 40px rgba(99, 102, 241, 0.4),
                  inset 0 4px 60px rgba(59, 130, 246, 0.3),
                  0 -10px 80px 2px rgba(99, 102, 241, 0.25),
                  0 -20px 100px 3px rgba(139, 92, 246, 0.15)
                `,
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating light orbs decoration */}
      <motion.div
        className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-indigo-400/70 blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          boxShadow: '0 0 20px 2px rgba(99, 102, 241, 0.5)',
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-4 h-4 rounded-full bg-purple-400/60 blur-sm"
        animate={{
          y: [0, 20, 0],
          opacity: [0.4, 0.9, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          boxShadow: '0 0 25px 3px rgba(168, 85, 247, 0.4)',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-blue-400/80 blur-sm"
        animate={{
          y: [0, -15, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{
          boxShadow: '0 0 22px 2px rgba(59, 130, 246, 0.6)',
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-violet-400/70 blur-sm"
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 0.95, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          boxShadow: '0 0 20px 2px rgba(139, 92, 246, 0.5)',
        }}
      />

      {/* Additional accent lights */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-cyan-400/60 blur-sm"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        style={{
          boxShadow: '0 0 18px 2px rgba(34, 211, 238, 0.4)',
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-fuchsia-400/60 blur-sm"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        style={{
          boxShadow: '0 0 18px 2px rgba(232, 121, 249, 0.4)',
        }}
      />
    </section>
  );
}
