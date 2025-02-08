// src/components/sections/wavy-section.tsx
"use client";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";

export function WavyBackgroundSection() {
  return (
    <WavyBackground className="max-w-7xl mx-auto h-[40rem] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
          Let&apos;s Build Something Great
        </h1>
        <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl mx-auto px-4">
          From data pipelines to full-stack applications, I bring ideas to life
          with code and creativity.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            className="px-6 py-3 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            View Resume
          </a>
        </div>
      </motion.div>
    </WavyBackground>
  );
}
