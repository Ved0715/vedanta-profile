import { Hero } from "@/components/sections/hero";
import { Numbers } from "@/components/sections/numbers";
import { About } from "@/components/sections/about";
import { SelectedWork } from "@/components/sections/selected-work";
import { Research } from "@/components/sections/research";
import { Experience } from "@/components/sections/experience";
import { Words } from "@/components/sections/words";
import { Contact } from "@/components/sections/contact";
import { SectionNavDots } from "@/components/layout/section-nav-dots";

export default function HomePage() {
  return (
    <>
      <SectionNavDots />
      <main>
        <Hero />
        <Numbers />
        <About />
        <SelectedWork />
        <Research />
        <Experience />
        <Words />
        <Contact />
      </main>
    </>
  );
}
