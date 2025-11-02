'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  title: string;
  gradient: string;
  textColor: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Lena Torres',
    role: 'Product Lead',
    company: 'Creatify',
    title: 'An AI engineer who transforms visions into reality',
    quote: 'Vedant has an exceptional ability to bring our AI concepts to life. His attention to detail and dedication to creating intelligent systems have greatly enhanced our projects. His skills in AI and machine learning are truly impressive, and he\'s always ready to tackle any challenge that comes his way.',
    gradient: 'linear-gradient(rgb(255, 204, 222), rgb(153, 122, 133))',
    textColor: 'text-black',
    image: '/testimonials/1.jpg'
  },
  {
    name: 'Emma Thompson',
    role: 'Senior Designer',
    company: 'PixelCraft',
    title: 'Efficient, innovative, and a pleasure to work with',
    quote: 'Working with Vedant has been a fantastic experience. He\'s not only highly skilled in AI technologies but also brings a refreshing creativity to every project. His ability to solve complex problems quickly and effectively makes him a key asset to our team. Plus, he\'s a great collaborator who makes the work environment better for everyone.',
    gradient: 'linear-gradient(rgb(72, 133, 255), rgb(2, 63, 186))',
    textColor: 'text-white',
    image: '/testimonials/2.jpg'
  },
  {
    name: 'Ethan Parker',
    role: 'Manager',
    company: 'TechFusion',
    title: 'A reliable developer with a keen eye for detail',
    quote: 'Vedant delivered exceptional work on our AI project. His meticulous approach and strong communication skills greatly enhanced the quality of our applications. He\'s a dependable developer who collaborates seamlessly with the team.',
    gradient: 'linear-gradient(rgb(87, 56, 175), rgb(36, 23, 73))',
    textColor: 'text-white',
    image: '/testimonials/3.jpg'
  },
  {
    name: 'Ryan Mitchell',
    role: 'CTO',
    company: 'Innovate Solutions',
    title: 'Consistent excellence in every project',
    quote: 'Vedant is a standout AI engineer. His ability to deliver high-quality code and intelligent solutions consistently makes him a valuable team member. He\'s proactive, reliable, and always willing to go the extra mile to ensure the success of our projects. It\'s been a pleasure working with him, and I look forward to future collaborations.',
    gradient: 'linear-gradient(rgb(15, 88, 136), rgb(0, 47, 78))',
    textColor: 'text-white',
    image: '/testimonials/4.jpg'
  },
  {
    name: 'Emily Thompson',
    role: 'Creative Director',
    company: 'H. Studios',
    title: 'A master of AI development with a keen design sensibility',
    quote: 'Vedant is a fantastic AI engineer! He took our requirements and turned them into something amazing. His attention to detail, creativity, and clear communication made the whole process smooth. We\'re extremely happy with the results and would highly recommend him!',
    gradient: 'linear-gradient(rgb(2, 156, 114), rgb(0, 75, 54))',
    textColor: 'text-white',
    image: '/testimonials/5.jpg'
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      ref={ref}
      className="relative w-full py-32 md:py-52 bg-black overflow-hidden"
    >
      <div className="w-full px-4 md:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-36 text-center"
        >
          <p className="mb-3 font-mono text-xs md:text-sm uppercase tracking-widest text-white/70">
            TESTIMONIALS
          </p>
          <h2
            className="font-serif text-5xl md:text-6xl font-medium tracking-tight"
            style={{
              textShadow: '0px 4px 8px rgba(255,255,255,.05), 0px 8px 30px rgba(255,255,255,.25)'
            }}
          >
            <span className="text-white">Word on the street</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic animate-gradient-x">
              about me
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          <motion.div
            className="flex gap-2 sm:gap-4"
            animate={{
              x: [0, -1 * (testimonials.length * 416)], // 400px width + 16px gap
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="shrink-0"
              >
                <div
                  className={`relative flex h-[370px] w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl p-2 antialiased md:h-[440px] md:w-[400px] md:rounded-2xl lg:px-6 lg:py-7 ${testimonial.textColor}`}
                  style={{ background: testimonial.gradient }}
                >
                  <div>
                    <h4 className="mb-5 font-bold font-serif text-lg tracking-wide md:text-2xl">
                      {testimonial.title}
                    </h4>
                    <p className="mb-3 line-clamp-7 font-extralight text-base tracking-tight md:line-clamp-10 md:text-lg">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="size-11 lg:size-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-base tracking-wide md:text-xl block">
                        {testimonial.name}
                      </span>
                      <p className="text-sm opacity-80 md:text-base">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
