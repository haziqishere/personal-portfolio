"use client";
import { useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { HackathonCard } from "./hackathon-card";
import { DATA } from "../../../public/data/resume";

const PREVIEW_COUNT = 2;

export function HackathonTimeline() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? DATA.hackathons
    : DATA.hackathons.slice(0, PREVIEW_COUNT);

  return (
    <div className="relative">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-8 relative pl-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">
              Hackathon Journey
            </h1>
            <p className="text-base text-muted-foreground mt-2">
              From participant to champion - a journey of building MVPs and
              solving real problems
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 inset-y-0 w-[2px] bg-gradient-to-b from-blue-500/30 to-purple-500/30" />

            {/* Content */}
            <div className="space-y-12 list-none">
              {visible.map((hackathon, index) => (
                <div key={hackathon.title} className="relative list-none">
                  <div className="ml-16">
                    <HackathonCard
                      title={hackathon.title}
                      description={hackathon.description}
                      location={hackathon.location}
                      dates={hackathon.dates}
                      image={hackathon.image}
                      achievement={hackathon.achievement}
                      links={hackathon.links}
                      centerAvatar={true}
                    />
                    {/* Image Gallery */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="relative h-48 rounded-lg overflow-hidden bg-gray-50">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                          <span>Award Ceremony Image Coming Soon</span>
                        </div>
                      </div>
                      <div className="relative h-48 rounded-lg overflow-hidden bg-gray-50">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                          <span>Action Shot Coming Soon</span>
                        </div>
                      </div>
                    </div>
                    {/* Dotted Separator */}
                    {index !== visible.length - 1 && (
                      <div className="absolute left-0 right-0 bottom-0 h-[1px] border-b border-dashed border-gray-200 translate-y-6" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade + Read more / Show less */}
          {DATA.hackathons.length > PREVIEW_COUNT && (
            <div className="relative">
              {/* Blur fade overlay — only when collapsed */}
              {!expanded && (
                <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
              )}
              <div className="relative flex justify-center pt-4">
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                >
                  {expanded ? (
                    <>Show less <span>↑</span></>
                  ) : (
                    <>Read more <span className="animate-bounce inline-block">↓</span></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </TracingBeam>
    </div>
  );
}

export default HackathonTimeline;
