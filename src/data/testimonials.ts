export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  title: string;
  gradient: string;
  textColor: string;
  image: string;
}

export const testimonials: Testimonial[] = [
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
