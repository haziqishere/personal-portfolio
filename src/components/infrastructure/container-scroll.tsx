// src/components/infrastructure/container-scroll.tsx
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../../public/data/technologies";
import { Highlighter } from "../ui/highlighter";

const STATUS_PAGE_URL = "https://kuma.haziqhakimi.online/status/self-hosted-apps";

type OrbitSpec = {
  slug: TechnologySlug;
  top: string;
  inset: string;
  radius: number;
  duration: number;
  delay: number;
  // Tailwind size-* utility — literal strings so the JIT scanner picks
  // them up. Randomized per icon; kubernetes is the deliberate outlier,
  // largest of the set so it reads as the anchor/hero of the cluster.
  sizeClass: string;
};

// Two tight clusters per side — one hugging the top corner, one hugging
// the bottom corner — instead of spread evenly down the middle. Frames
// the card top and bottom, leaves the mid-height clear. Slow, long
// durations (20-31s/revolution) keep the orbit subtle even at a bigger
// radius. Negative delays start each icon mid-cycle so they never sync.
const LEFT_ORBIT: OrbitSpec[] = [
  // top-left cluster
  { slug: "kubernetes", top: "10%", inset: "4%", radius: 60, duration: 26, delay: -10, sizeClass: "size-28" },
  { slug: "prometheus", top: "24%", inset: "8%", radius: 44, duration: 21, delay: -5, sizeClass: "size-16" },
  // bottom-left cluster
  { slug: "nvidia-cuda", top: "76%", inset: "6%", radius: 40, duration: 29, delay: -14, sizeClass: "size-14" },
  { slug: "raspberry-pi", top: "90%", inset: "3%", radius: 50, duration: 23, delay: -19, sizeClass: "size-20" },
  { slug: "cloudflare", top: "50%", inset: "10%", radius: 40, duration: 23, delay: -15, sizeClass: "size-20" },
];

const RIGHT_ORBIT: OrbitSpec[] = [
  // top-right cluster — argocd bumped up to the second-largest, after
  // kubernetes, so it pops alongside the hero instead of hiding small
  // in a corner.
  { slug: "argocd", top: "8%", inset: "3%", radius: 56, duration: 25, delay: -7, sizeClass: "size-24" },
  { slug: "grafana", top: "22%", inset: "8%", radius: 48, duration: 30, delay: -12, sizeClass: "size-20" },
  // bottom-right cluster
  { slug: "apache-spark", top: "78%", inset: "7%", radius: 42, duration: 22, delay: -16, sizeClass: "size-16" },
  { slug: "helm", top: "90%", inset: "5%", radius: 36, duration: 27, delay: -4, sizeClass: "size-12" },
];

function OrbitIcon({ spec, side }: { spec: OrbitSpec; side: "left" | "right" }) {
  const tech = getTechnologyBySlug(spec.slug);
  if (!tech) return null;

  return (
    <span
      className={`orbit-icon pointer-events-none absolute flex ${spec.sizeClass} items-center justify-center rounded-full border bg-white/90 p-2.5 shadow-md dark:bg-zinc-800/90`}
      style={{
        top: spec.top,
        [side]: spec.inset,
        ["--orbit-radius" as string]: `${spec.radius}px`,
        animation: `orbit ${spec.duration}s linear infinite`,
        animationDelay: `${spec.delay}s`,
      }}
    >
      <img src={tech.icon} alt={tech.name} className="h-full w-full object-contain" />
    </span>
  );
}

function OrbitingLogos() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {LEFT_ORBIT.map((spec) => (
        <OrbitIcon key={spec.slug} spec={spec} side="left" />
      ))}
      {RIGHT_ORBIT.map((spec) => (
        <OrbitIcon key={spec.slug} spec={spec} side="right" />
      ))}
    </div>
  );
}

export function StatusShowcase() {
  return (
    <div className="flex flex-col">
      <ContainerScroll
        decoration={<OrbitingLogos />}
        trackHeight="110vh"
        // 0, not just "small": the title has a rough-notation Highlighter
        // in it, which positions its underline via a one-time
        // getBoundingClientRect() call. It doesn't track CSS transforms,
        // so any scroll-driven translateY on this header desyncs the
        // underline from the text as you scroll. Keep this header static.
        headerParallax={0}
        cardOffset={24}
        titleComponent={
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-center mb-4">
              How do I learn new things? By{" "}
              <Highlighter action="underline" color="#FF9800">
                self-hosting
              </Highlighter>{" "}
              them, of course!
            </h1>
            <p className="text-muted-foreground">
              Real-time status of my self-hosted 
              {" "}<Highlighter action="highlight" color="#e2ffe2" strokeWidth={1}>
                apps
              </Highlighter>{" "}
              and {" "}
              <Highlighter action="highlight" color="#e2ffe2">
                data platform
              </Highlighter>{" "}
            </p>
          </div>
        }
      >
        <iframe
          src={STATUS_PAGE_URL}
          title="Self-hosted apps status"
          loading="lazy"
          className="h-full w-full rounded-2xl border-0"
        />
      </ContainerScroll>
    </div>
  );
}

export default StatusShowcase;
