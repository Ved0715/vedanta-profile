'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { navigationItems, personalInfo } from '@/data/personal';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-8 left-0 right-0 z-50 hidden md:flex justify-center">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
            }}
            animate={{
              opacity: scrolled ? [0.3, 0.5, 0.3] : [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className={cn(
            "relative flex items-center px-3 py-2.5 rounded-full transition-all duration-700 ease-out",
            "backdrop-blur-2xl bg-gradient-to-r from-black/50 via-black/40 to-black/50",
            "border border-white/10",
            "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]",
            scrolled && "bg-gradient-to-r from-black/70 via-black/60 to-black/70 border-white/20 shadow-[0_8px_40px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
          )}>
            {/* Top gradient border */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6) 20%, rgba(168, 85, 247, 0.6) 50%, rgba(236, 72, 153, 0.6) 80%, transparent)',
              }}
            />

            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative px-5 py-2.5 mx-1 rounded-full text-sm font-medium group"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="navHighlight"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.6
                    }}
                  />
                )}

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  }}
                />

                <span className={cn(
                  "relative z-10 transition-all duration-300",
                  activeSection === item.href.substring(1)
                    ? "text-white font-semibold"
                    : "text-gray-400 group-hover:text-white"
                )}>
                  {item.name}
                </span>
              </motion.button>
            ))}

            {/* Divider */}
            <div className="w-px h-6 mx-2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <motion.a
              href={personalInfo.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="relative ml-1 flex items-center space-x-2 px-5 py-2.5 rounded-full text-white text-sm font-medium overflow-hidden group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['-200% 0', '200% 0'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

              <Download size={16} className="relative z-10" />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation Toggle */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-6 right-6 z-50 md:hidden"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative p-4 rounded-full transition-all duration-300 overflow-hidden",
            "backdrop-blur-2xl bg-gradient-to-br from-black/50 to-black/40",
            "border shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]",
            scrolled
              ? "border-white/20 shadow-[0_8px_40px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
              : "border-white/10"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 blur-lg"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
            }}
            animate={{
              opacity: isOpen ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] overflow-hidden"
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-neutral-900/95 to-black/95 backdrop-blur-2xl" />

              {/* Border */}
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />

              {/* Glow effect */}
              <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

              <div className="relative flex flex-col h-full pt-24 px-6">
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "relative w-full text-left px-5 py-3.5 rounded-xl font-medium text-base transition-all duration-300 overflow-hidden group",
                        activeSection === item.href.substring(1)
                          ? "text-white"
                          : "text-gray-400"
                      )}
                    >
                      {/* Active background */}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          layoutId="mobileNavHighlight"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                          }}
                        />
                      )}

                      {/* Hover effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5" />

                      {/* Border indicator */}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          layoutId="mobileNavBorder"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-400 to-purple-400"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                          }}
                        />
                      )}

                      <span className="relative z-10">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  href={personalInfo.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-8 flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl text-white font-medium overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                  <Download size={18} className="relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}