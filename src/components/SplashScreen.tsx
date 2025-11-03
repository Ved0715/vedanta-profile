'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 3500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient background glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Expanding circle wave */}
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full border-2"
            style={{
              width: 80,
              height: 80,
              x: '-50%',
              y: '-50%',
              borderColor: 'rgba(16, 185, 129, 0.4)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2.5, 5],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Second expanding circle */}
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full border-2"
            style={{
              width: 80,
              height: 80,
              x: '-50%',
              y: '-50%',
              borderColor: 'rgba(59, 130, 246, 0.4)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2.5, 5],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Main content */}
          <motion.div className="relative flex flex-col items-center justify-center px-6">
            {/* Name with glowing effect and split animation */}
            <motion.div className="relative">
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black text-center mb-6 relative z-10"
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', -apple-system, system-ui, sans-serif",
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Animate each word separately */}
                <motion.span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    x: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
                    opacity: { duration: 0.8, delay: 0.5 },
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                >
                  Vedant
                </motion.span>
                {' '}
                <motion.span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    x: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
                    opacity: { duration: 0.8, delay: 0.6 },
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 0.5,
                    },
                  }}
                >
                  Narwade
                </motion.span>
              </motion.h1>

              {/* Glowing backdrop */}
              <motion.div
                className="absolute inset-0 blur-3xl -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Subtitle with line animation */}
            <motion.div className="flex items-center gap-4">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: 60,
                  opacity: 1,
                }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />

              <motion.p
                className="text-sm md:text-lg font-mono text-gray-400 tracking-[0.3em] uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                AI Engineer & Full-Stack Developer
              </motion.p>

              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: 60,
                  opacity: 1,
                }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
