"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
  text: string;
};

export function AppleHelloEffect({
  className,
  speed = 1,
  onAnimationComplete,
  text = "Vedant Narwade",
  ...props
}: Props) {
  return (
    <motion.svg
      className={cn("h-32 md:h-40 lg:h-48 w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 200"
      fill="none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>{text}</title>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="nameGradient" gradientUnits="userSpaceOnUse" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
      </defs>

      {/* Handwritten text with stroke animation */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "var(--font-dancing-script), 'Dancing Script', cursive",
          fontSize: '120px',
          fontWeight: 700,
          fill: 'none',
          stroke: 'url(#nameGradient)',
          strokeWidth: '2.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          paintOrder: 'stroke',
        }}
        initial={{
          strokeDasharray: 3000,
          strokeDashoffset: 3000,
          opacity: 0,
        }}
        animate={{
          strokeDashoffset: 0,
          opacity: 1,
        }}
        transition={{
          strokeDashoffset: {
            duration: 3.5 / speed,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.3 / speed,
          },
        }}
        onAnimationComplete={onAnimationComplete}
      >
        {text}
      </motion.text>
    </motion.svg>
  );
}
