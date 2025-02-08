// src/components/sections/vortex-section.tsx
"use client";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";
import { DATA } from "@/app/data/resume";

export function VortexSection() {
  return (
    <div className="w-full mx-auto rounded-md overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-4 py-20 w-full min-h-[40rem]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8 max-w-5xl mx-auto"
        >
          <h2 className="text-white text-3xl md:text-6xl font-bold">
            Transforming Data into Impact
          </h2>
          <p className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto">
            Building scalable data solutions and innovative applications that
            drive real-world results.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] flex items-center gap-2"
            >
              <span>View Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            <a
              href={`mailto:${DATA.contact.email}`}
              className="px-6 py-3 border border-white/20 hover:bg-white/10 transition duration-200 rounded-lg text-white flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { label: "Projects", value: DATA.projects.length },
              { label: "Hackathons", value: DATA.hackathons.length },
              { label: "Tech Stack", value: DATA.skills.length },
              { label: "Years Experience", value: "2+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}+
                </div>
                <div className="text-white/60 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Vortex>
    </div>
  );
}
