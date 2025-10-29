import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vedant Narwade | AI Engineer",
  description: "AI Engineer at AIVI.in building enterprise AI platforms with 95%+ accuracy. Specializing in LLMs, RAG systems, and intelligent document processing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
