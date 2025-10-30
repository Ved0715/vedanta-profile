'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const decorativeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: decorativeRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // AI/ML & Data Science skills
  const aiSkills = [
    'python', 'tensorflow', 'pytorch', 'scikitlearn',
    'opencv', 'numpy', 'pandas'
  ];

  // Frontend skills
  const frontendSkills = [
    'react', 'nextjs', 'typescript', 'tailwindcss',
    'css', 'html', 'javascript', 'framer'
  ];

  // Backend & Database skills
  const backendSkills = [
    'nodejs', 'expressjs', 'fastapi', 'postgresql',
    'mongodb', 'redis', 'prisma', 'docker'
  ];

  // DevOps & Tools
  const devopsSkills = [
    'git', 'github', 'githubactions', 'vercel',
    'aws', 'cloudflare', 'figma', 'vscode'
  ];

  const allSkills = [...aiSkills, ...frontendSkills, ...backendSkills, ...devopsSkills];

  const skillRows = [
    aiSkills,
    frontendSkills,
    backendSkills,
    devopsSkills
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-6 bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
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

        {/* Additional floating particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full opacity-20 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl z-10 overflow-visible">
        {/* Rotating decorative element */}
        <div className="relative mx-auto w-fit mb-0">
          <div
            className="relative"
            style={{
              maskImage: 'linear-gradient(to top, transparent, black 50%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, transparent, black 50%, black 90%, transparent)',
            }}
          >
            <motion.div
              ref={decorativeRef}
              className="relative mx-auto w-[300px] h-[300px] md:w-[380px] md:h-[380px] translate-y-36 md:translate-y-40"
              style={{ rotate }}
            >
              {/* Decorative rotating shape */}
              <div className="relative w-full h-full">
                {/* Central circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-xl" />
                </div>

                {/* Orbiting elements */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(${120 + i * 10}px)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
                      } blur-sm`}
                      style={{
                        boxShadow: `0 0 20px 2px ${
                          i % 3 === 0 ? 'rgba(59, 130, 246, 0.6)' :
                          i % 3 === 1 ? 'rgba(168, 85, 247, 0.6)' :
                          'rgba(236, 72, 153, 0.6)'
                        }`,
                      }}
                    />
                  </motion.div>
                ))}

                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-blue-500/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-8 border-2 border-purple-500/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-16 border-2 border-pink-500/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-center z-30 -translate-y-10 mb-16 px-6 md:px-8"
          style={{
            textShadow: '0px 4px 8px rgba(255,255,255,.05), 0px 8px 30px rgba(255,255,255,.25)',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 font-mono text-xs md:text-sm uppercase tracking-widest text-white/70"
          >
            My Skills
          </motion.p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-tight text-white overflow-visible">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
              className="inline-block"
            >
              The Secret
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 100 }}
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic animate-gradient-x"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              Sauce
            </motion.span>
          </h2>

          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '60px' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '60px' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
          </div>
        </motion.div>

        {/* Skills Grid - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block w-full max-w-5xl mx-auto relative"
          style={{ perspective: '1000px' }}
        >
          {/* Floating glow effect behind icons */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {skillRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, rotateX: 45, z: -100 }}
              animate={isInView ? { opacity: 1, rotateX: 0, z: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.6 + rowIndex * 0.15,
                type: 'spring',
                stiffness: 80,
              }}
              className="mb-3 flex flex-wrap justify-center gap-3"
            >
              {row.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
                  animate={isInView ? {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + rowIndex * 0.15 + index * 0.05,
                    type: 'spring',
                    stiffness: 120,
                    damping: 12,
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -8,
                    rotateZ: 5,
                    transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                  }}
                  style={{
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: rowIndex % 3 === 0 ? 'rgba(59, 130, 246, 0.5)' :
                                  rowIndex % 3 === 1 ? 'rgba(168, 85, 247, 0.5)' :
                                  'rgba(236, 72, 153, 0.5)',
                    }}
                  />

                  <motion.img
                    alt={`${skill} icon`}
                    aria-label={skill}
                    src={`https://go-skill-icons.vercel.app/api/icons?i=${skill}&theme=dark&titles=true`}
                    className="inline-block max-w-11 md:max-w-14 will-change-transform relative z-10 rounded-lg"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid - Mobile (no 3D effects) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:hidden w-full max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2.5">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill}
                className="relative group"
                initial={{ opacity: 0, scale: 0.3, rotate: -45 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.025,
                  type: 'spring',
                  stiffness: 150,
                  damping: 10,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: index % 3 === 0 ? 'rgba(59, 130, 246, 0.5)' :
                                index % 3 === 1 ? 'rgba(168, 85, 247, 0.5)' :
                                'rgba(236, 72, 153, 0.5)',
                  }}
                />

                <motion.img
                  alt={`${skill} icon`}
                  aria-label={skill}
                  src={`https://go-skill-icons.vercel.app/api/icons?i=${skill}&theme=dark&titles=true`}
                  className="inline-block max-w-11 relative z-10 rounded-lg"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
