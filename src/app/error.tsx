'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%)',
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
            backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        {/* Error icon */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <motion.div
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(239, 68, 68, 0.3)',
                '0 0 60px rgba(239, 68, 68, 0.5)',
                '0 0 40px rgba(239, 68, 68, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AlertTriangle size={64} className="text-red-500" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Orbiting particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-red-500"
              style={{
                boxShadow: '0 0 10px #EF4444',
              }}
              animate={{
                x: [
                  Math.cos(angle * Math.PI / 180) * 60,
                  Math.cos((angle + 120) * Math.PI / 180) * 60,
                  Math.cos((angle + 240) * Math.PI / 180) * 60,
                  Math.cos(angle * Math.PI / 180) * 60,
                ],
                y: [
                  Math.sin(angle * Math.PI / 180) * 60,
                  Math.sin((angle + 120) * Math.PI / 180) * 60,
                  Math.sin((angle + 240) * Math.PI / 180) * 60,
                  Math.sin(angle * Math.PI / 180) * 60,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
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
            Something Went Wrong
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto">
            An unexpected error occurred. Don't worry, we're on it!
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <motion.div
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
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
          {/* Try Again Button */}
          <motion.button
            onClick={reset}
            className="group relative px-8 py-4 rounded-xl text-white font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 50%, #EC4899 100%)',
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

            <div className="relative z-10 flex items-center gap-2">
              <RefreshCw size={20} />
              <span>Try Again</span>
            </div>
          </motion.button>

          {/* Go Home Button */}
          <motion.button
            onClick={() => (window.location.href = '/')}
            className="group relative px-8 py-4 rounded-xl text-white font-medium border-2 border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <Home size={20} />
              <span>Go Home</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Error details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.details
            className="mt-8 text-left w-full max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <summary className="text-sm font-mono text-gray-500 cursor-pointer hover:text-gray-400 transition-colors">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg text-xs text-red-400 overflow-auto max-h-40">
              {error.message}
            </pre>
          </motion.details>
        )}

        {/* Error code */}
        <motion.p
          className="mt-8 text-xs font-mono text-gray-600 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {error.digest ? `ERROR_CODE: ${error.digest}` : 'ERROR_CODE: UNKNOWN_ERROR'}
        </motion.p>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-full h-full border-l-2 border-t-2 border-red-500/30 rounded-tl-3xl" />
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
