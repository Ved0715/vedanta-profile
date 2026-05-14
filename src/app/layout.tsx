import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Background } from "@/components/layout/background";
import { Cursor } from "@/components/layout/cursor";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { FloatingWidgets } from "@/components/layout/floating-widgets";
import { CloneChat } from "@/components/clone-chat";
import { CmdK } from "@/components/cmdk";
import { profile } from "@/data/profile";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.bio.short,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} dark`} data-scroll-behavior="smooth">
      <body>
        <Background />
        <Cursor />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <FloatingWidgets />
        <CloneChat />
        <CmdK />
      </body>
    </html>
  );
}
