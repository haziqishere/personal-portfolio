"use client";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import {
  motion,
  useScroll as useScrollBase,
  useMotionValue,
} from "framer-motion";

export default function GeminiHero() {
  const { scrollY } = useScrollBase();
  const pathLengths = Array(5)
    .fill(0)
    .map(() => useMotionValue(0));

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      const maxScroll = 500;
      const percentage = Math.min(latest / maxScroll, 1);
      pathLengths.forEach((length) => length.set(percentage));
    });
  }, [scrollY, pathLengths]);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="text-center relative z-10 w-full max-w-7xl mx-auto px-4">
        <GoogleGeminiEffect
          pathLengths={pathLengths}
          title="Haziq Hakimi"
          description="Data Scientist passionate about turning data into actionable insights"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
            Data Scientist @ PayNet
          </button>
        </div>
      </div>
    </div>
  );
}
