'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

// Deterministic particle positions (no Math.random = no hydration mismatch)
const PARTICLES: { x: number; y: number; size: number; delay: number; dur: number }[] = [
  { x: 12, y: 18, size: 2, delay: 0.3, dur: 3 },
  { x: 85, y: 25, size: 3, delay: 0.5, dur: 2.5 },
  { x: 30, y: 72, size: 2, delay: 0.8, dur: 3.5 },
  { x: 72, y: 80, size: 2.5, delay: 0.2, dur: 2.8 },
  { x: 45, y: 15, size: 1.5, delay: 1.0, dur: 4 },
  { x: 90, y: 55, size: 2, delay: 0.6, dur: 3.2 },
  { x: 8, y: 60, size: 2.5, delay: 0.4, dur: 2.6 },
  { x: 55, y: 88, size: 2, delay: 0.7, dur: 3.8 },
  { x: 20, y: 40, size: 1.5, delay: 1.2, dur: 2.4 },
  { x: 78, y: 42, size: 2, delay: 0.9, dur: 3.1 },
  { x: 38, y: 30, size: 1.5, delay: 0.1, dur: 3.6 },
  { x: 65, y: 65, size: 2, delay: 0.35, dur: 2.9 },
  { x: 50, y: 50, size: 3, delay: 0.55, dur: 3.3 },
  { x: 15, y: 85, size: 2, delay: 0.75, dur: 2.7 },
  { x: 82, y: 12, size: 2.5, delay: 0.95, dur: 3.4 },
  { x: 42, y: 92, size: 1.5, delay: 0.15, dur: 4.2 },
  { x: 95, y: 70, size: 2, delay: 0.45, dur: 2.3 },
  { x: 5, y: 35, size: 2, delay: 0.65, dur: 3.7 },
  { x: 60, y: 20, size: 2.5, delay: 0.85, dur: 2.5 },
  { x: 25, y: 55, size: 1.5, delay: 1.1, dur: 3.9 },
];

// Animated counter component
function AnimatedCounter({ isVisible }: { isVisible: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const controls = animate(count, 100, {
      duration: 2.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isVisible, count]);

  return (
    <span className="tabular-nums">{display}</span>
  );
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 100);   // Start animations
    const t1 = setTimeout(() => setPhase(2), 2600);   // Sweep + intensify
    const t2 = setTimeout(() => setPhase(3), 3400);   // Begin exit
    const t3 = setTimeout(() => setShow(false), 4200); // Hide
    const t4 = setTimeout(() => onComplete(), 4600);   // Callback

    return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const lettersVisible = phase >= 1;
  const sweepActive = phase >= 2;
  const isExiting = phase >= 3;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ═══════ BACKGROUND EFFECTS ═══════ */}

          {/* Animated radial gradient that pulses */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 30%, transparent 60%)',
            }}
            animate={{
              opacity: isExiting ? 0 : [0.5, 1, 0.5],
              scale: isExiting ? 1.5 : [1, 1.05, 1],
            }}
            transition={{
              duration: isExiting ? 0.8 : 4,
              repeat: isExiting ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Animated orbital ring 1 */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '600px',
              height: '600px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '1px solid rgba(99,102,241,0.08)',
            }}
            initial={{ scale: 0.3, opacity: 0, rotate: 0 }}
            animate={{
              scale: isExiting ? 2 : lettersVisible ? 1 : 0.3,
              opacity: isExiting ? 0 : lettersVisible ? 0.6 : 0,
              rotate: 360,
            }}
            transition={{
              scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: isExiting ? 0.5 : 1.5 },
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            }}
          />

          {/* Animated orbital ring 2 */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '800px',
              height: '400px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.06)',
            }}
            initial={{ scale: 0.2, opacity: 0, rotate: 45 }}
            animate={{
              scale: isExiting ? 2.5 : lettersVisible ? 1 : 0.2,
              opacity: isExiting ? 0 : lettersVisible ? 0.5 : 0,
              rotate: -315,
            }}
            transition={{
              scale: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
              opacity: { duration: isExiting ? 0.5 : 2 },
              rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            }}
          />

          {/* Animated orbital ring 3 - smaller, faster */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '350px',
              height: '350px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '1px dashed rgba(168,85,247,0.1)',
            }}
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={{
              scale: isExiting ? 3 : lettersVisible ? 1 : 0,
              opacity: isExiting ? 0 : lettersVisible ? 0.4 : 0,
              rotate: 330,
            }}
            transition={{
              scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
              opacity: { duration: isExiting ? 0.3 : 1.8 },
              rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            }}
          />

          {/* Grid with mask - more visible */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage:
                'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)',
            }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* ═══════ FLOATING PARTICLES ═══════ */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background:
                  i % 4 === 0
                    ? 'rgba(129,140,248,0.7)'
                    : i % 4 === 1
                      ? 'rgba(167,139,250,0.6)'
                      : i % 4 === 2
                        ? 'rgba(99,102,241,0.5)'
                        : 'rgba(255,255,255,0.3)',
                boxShadow:
                  i % 3 === 0
                    ? `0 0 ${p.size * 3}px rgba(129,140,248,0.5)`
                    : `0 0 ${p.size * 2}px rgba(167,139,250,0.3)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isExiting ? 0 : lettersVisible ? [0, 0.8, 0] : 0,
                scale: isExiting ? 0 : lettersVisible ? [0, 1.2, 0] : 0,
                y: isExiting ? -80 : [0, -15, 0],
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: isExiting ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* ═══════ ANIMATED LINES ═══════ */}
          {/* Horizontal scan line */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 30%, rgba(139,92,246,0.5) 50%, rgba(99,102,241,0.3) 70%, transparent 100%)',
            }}
            initial={{ top: '30%', opacity: 0 }}
            animate={{
              top: isExiting ? ['50%', '0%'] : ['30%', '70%', '30%'],
              opacity: isExiting ? 0 : lettersVisible ? 0.6 : 0,
            }}
            transition={{
              top: {
                duration: isExiting ? 0.5 : 6,
                repeat: isExiting ? 0 : Infinity,
                ease: 'easeInOut',
              },
              opacity: { duration: 0.5 },
            }}
          />

          {/* Vertical scan line */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: 0,
              bottom: 0,
              width: '1px',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.2) 30%, rgba(168,85,247,0.4) 50%, rgba(139,92,246,0.2) 70%, transparent 100%)',
            }}
            initial={{ left: '40%', opacity: 0 }}
            animate={{
              left: isExiting ? ['50%', '50%'] : ['40%', '60%', '40%'],
              opacity: isExiting ? 0 : lettersVisible ? 0.4 : 0,
            }}
            transition={{
              left: {
                duration: isExiting ? 0.3 : 8,
                repeat: isExiting ? 0 : Infinity,
                ease: 'easeInOut',
              },
              opacity: { duration: 0.5 },
            }}
          />

          {/* ═══════ MAIN TEXT ═══════ */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-0 px-4"
            style={{ perspective: '1200px' }}
            animate={
              isExiting
                ? { scale: 1.2, opacity: 0, filter: 'blur(20px)', y: -40 }
                : { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── VEDANT ── */}
            <div className="overflow-visible relative">
              {/* Text glow behind */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 900,
                  fontSize: 'clamp(56px, 14vw, 170px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.85,
                  color: 'transparent',
                  textAlign: 'center',
                  WebkitTextStroke: '0px transparent',
                  textShadow: '0 0 60px rgba(255,255,255,0.15), 0 0 120px rgba(99,102,241,0.1)',
                }}
                animate={{
                  opacity: lettersVisible ? [0.3, 0.6, 0.3] : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                VEDANT
              </motion.div>

              <div
                className="text-center leading-[0.85] tracking-tight relative"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 900,
                  fontSize: 'clamp(56px, 14vw, 170px)',
                  letterSpacing: '-0.03em',
                }}
              >
                {'VEDANT'.split('').map((letter, i) => (
                  <motion.span
                    key={`v-${i}`}
                    className="inline-block text-white"
                    initial={{
                      opacity: 0,
                      y: 80,
                      rotateX: -90,
                      filter: 'blur(10px)',
                      scale: 0.5,
                    }}
                    animate={
                      lettersVisible
                        ? {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            filter: 'blur(0px)',
                            scale: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      delay: i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      textShadow: sweepActive
                        ? '0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(99,102,241,0.2)'
                        : 'none',
                      transition: 'text-shadow 0.5s ease',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── NARWADE ── */}
            <div className="overflow-visible mt-1 md:mt-2 relative">
              {/* Text glow behind */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 900,
                  fontSize: 'clamp(56px, 14vw, 170px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.85,
                  textAlign: 'center',
                  color: 'transparent',
                  textShadow: '0 0 80px rgba(139,92,246,0.3), 0 0 140px rgba(99,102,241,0.15)',
                }}
                animate={{
                  opacity: lettersVisible ? [0.4, 0.7, 0.4] : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                NARWADE
              </motion.div>

              <div
                className="text-center leading-[0.85] tracking-tight relative"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 900,
                  fontSize: 'clamp(56px, 14vw, 170px)',
                  letterSpacing: '-0.03em',
                }}
              >
                {'NARWADE'.split('').map((letter, i) => (
                  <motion.span
                    key={`n-${i}`}
                    className="inline-block"
                    initial={{
                      opacity: 0,
                      y: 80,
                      rotateX: -90,
                      filter: 'blur(10px)',
                      scale: 0.5,
                    }}
                    animate={
                      lettersVisible
                        ? {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            filter: 'blur(0px)',
                            scale: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      delay: 0.35 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      background:
                        'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 25%, #818cf8 50%, #6366f1 75%, #8b5cf6 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── Light sweep across text ── */}
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ zIndex: 20 }}
            >
              <motion.div
                className="absolute top-0 h-full"
                style={{
                  width: '250px',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.08) 70%, transparent 100%)',
                  filter: 'blur(3px)',
                }}
                initial={{ left: '-250px' }}
                animate={
                  sweepActive
                    ? { left: ['calc(-250px)', 'calc(100% + 250px)'] }
                    : { left: '-250px' }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>
          </motion.div>

          {/* ═══════ SUBTITLE ═══════ */}
          <motion.div
            className="relative z-10 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isExiting
                ? { opacity: 0, y: -30, filter: 'blur(8px)' }
                : lettersVisible
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : {}
            }
            transition={{
              duration: 0.7,
              delay: isExiting ? 0 : 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
                initial={{ width: 0 }}
                animate={
                  isExiting ? { width: 0, opacity: 0 } : lettersVisible ? { width: 60 } : {}
                }
                transition={{ duration: 0.9, delay: isExiting ? 0 : 1.1, ease: 'easeOut' }}
              />
              <span
                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/40"
              >
                GenAI Engineer
              </span>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
                initial={{ width: 0 }}
                animate={
                  isExiting ? { width: 0, opacity: 0 } : lettersVisible ? { width: 60 } : {}
                }
                transition={{ duration: 0.9, delay: isExiting ? 0 : 1.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* ═══════ LOADING COUNTER ═══════ */}
          <motion.div
            className="absolute bottom-10 right-10 z-20 font-mono text-xs md:text-sm text-white/25 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isExiting ? 0 : lettersVisible ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: isExiting ? 0 : 0.5 }}
          >
            <AnimatedCounter isVisible={lettersVisible} />
            <span className="text-white/15">%</span>
          </motion.div>

          {/* ═══════ PROGRESS BAR ═══════ */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #818cf8 15%, #a78bfa 40%, #6366f1 70%, #818cf8 85%, transparent 100%)',
              }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={
                lettersVisible
                  ? { scaleX: 1 }
                  : { scaleX: 0 }
              }
              transition={{
                duration: 3,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>

          {/* ═══════ CORNER BRACKETS ═══════ */}
          {[
            { pos: 'top-6 left-6', borders: 'border-l border-t' },
            { pos: 'top-6 right-6', borders: 'border-r border-t' },
            { pos: 'bottom-6 left-6', borders: 'border-l border-b' },
            { pos: 'bottom-6 right-6', borders: 'border-r border-b' },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.pos} pointer-events-none`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isExiting ? 0 : lettersVisible ? 0.25 : 0,
                scale: isExiting ? 1.5 : lettersVisible ? 1 : 0.5,
              }}
              transition={{
                duration: 0.6,
                delay: isExiting ? 0 : 0.4 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={`w-10 h-10 ${corner.borders} border-white/15`} />
            </motion.div>
          ))}

          {/* ═══════ SMALL CROSS MARKERS ═══════ */}
          {[
            { x: '20%', y: '25%' },
            { x: '80%', y: '30%' },
            { x: '15%', y: '75%' },
            { x: '85%', y: '70%' },
          ].map((pos, i) => (
            <motion.div
              key={`cross-${i}`}
              className="absolute pointer-events-none"
              style={{ left: pos.x, top: pos.y }}
              initial={{ opacity: 0, rotate: 45, scale: 0 }}
              animate={{
                opacity: isExiting ? 0 : lettersVisible ? 0.2 : 0,
                rotate: isExiting ? 135 : 45,
                scale: isExiting ? 0 : lettersVisible ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                delay: isExiting ? 0 : 0.8 + i * 0.15,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
