export const homeSections = [
  { id: "home", label: "Index", sub: "Hero" },
  { id: "about", label: "About", sub: "Bio · skills" },
  { id: "numbers", label: "Numbers", sub: "Stats" },
  { id: "work", label: "Selected work", sub: "Featured projects" },
  { id: "research", label: "Research", sub: "DeepFake detection · NIT Trichy" },
  { id: "experience", label: "Experience", sub: "Career timeline" },
  { id: "words", label: "Words", sub: "Testimonials" },
  { id: "contact", label: "Contact", sub: "Get in touch" },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export const routes = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
] as const;
