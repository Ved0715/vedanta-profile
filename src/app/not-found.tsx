'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        {/* 404 Number */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <motion.h1
            className="text-[120px] md:text-[180px] font-black tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.5))',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            404
          </motion.h1>

          {/* Floating particles around 404 */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? '#3B82F6' : '#EC4899',
                boxShadow: `0 0 20px ${i % 2 === 0 ? '#3B82F6' : '#EC4899'}`,
              }}
              animate={{
                x: [
                  Math.cos(angle * Math.PI / 180) * 80,
                  Math.cos(angle * Math.PI / 180) * 100,
                  Math.cos(angle * Math.PI / 180) * 80,
                ],
                y: [
                  Math.sin(angle * Math.PI / 180) * 80,
                  Math.sin(angle * Math.PI / 180) * 100,
                  Math.sin(angle * Math.PI / 180) * 80,
                ],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <motion.div
            className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
            animate={{
              scale: [1, 1.5, 1],
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
            }}
          />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* Go Home Button */}
          <motion.button
            onClick={() => router.push('/')}
            className="group relative px-8 py-4 rounded-xl text-white font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
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
                ease: "linear",
              }}
            />

            {/* Hover shine */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />

            <div className="relative z-10 flex items-center gap-2">
              <Home size={20} />
              <span>Go Home</span>
            </div>
          </motion.button>

          {/* Go Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="group relative px-8 py-4 rounded-xl text-white font-medium border-2 border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Error code */}
        <motion.p
          className="mt-12 text-xs font-mono text-gray-600 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          ERROR_CODE: 404_PAGE_NOT_FOUND
        </motion.p>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-full h-full border-l-2 border-t-2 border-blue-500/30 rounded-tl-3xl" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-full h-full border-r-2 border-b-2 border-purple-500/30 rounded-br-3xl" />
      </motion.div>
    </div>
  );
}
