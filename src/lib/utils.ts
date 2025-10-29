import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation utility functions
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

// Smooth scroll utility
export const smoothScrollTo = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Create a separate hooks file for React hooks

// Format date utility
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

// Get technology color based on name
export const getTechColor = (tech: string): string => {
  const techColors: Record<string, string> = {
    // Languages
    'Python': 'bg-blue-500',
    'TypeScript': 'bg-blue-600',
    'JavaScript': 'bg-yellow-500',
    'C++': 'bg-purple-600',
    'SQL': 'bg-orange-500',
    
    // AI/ML
    'LangChain': 'bg-green-500',
    'RAG': 'bg-cyan-500',
    'GPT-4': 'bg-purple-500',
    'TensorFlow': 'bg-orange-600',
    'PyTorch': 'bg-red-500',
    'Transformers': 'bg-pink-500',
    
    // Frameworks
    'Next.js': 'bg-gray-800',
    'React': 'bg-cyan-400',
    'FastAPI': 'bg-teal-500',
    'Node.js': 'bg-green-600',
    
    // Databases
    'PostgreSQL': 'bg-blue-700',
    'MongoDB': 'bg-green-700',
    'Pinecone': 'bg-purple-400',
    
    // Tools
    'Docker': 'bg-blue-400',
    'AWS': 'bg-orange-400',
    'Git': 'bg-red-600',
  };
  
  return techColors[tech] || 'bg-gray-500';
};

// Generate random particles for background
export const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));
};

// Typing animation utility
export const typeWriter = (text: string, speed: number = 100) => {
  return new Promise<void>((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
};