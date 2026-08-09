// src/components/infrastructure/container-scroll.tsx
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../../public/data/skills";

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
  { slug: "kubernetes", top: "8%", inset: "3%", radius: 60, duration: 25, delay: -8, sizeClass: "size-28" },
  { slug: "nvidia-cuda", top: "20%", inset: "7%", radius: 40, duration: 22, delay: -4, sizeClass: "size-14" },
  // bottom-left cluster
  { slug: "raspberry-pi", top: "78%", inset: "4%", radius: 50, duration: 28, delay: -12, sizeClass: "size-20" },
  { slug: "prometheus", top: "90%", inset: "8%", radius: 44, duration: 31, delay: -18, sizeClass: "size-16" },
];

const RIGHT_ORBIT: OrbitSpec[] = [
  // top-right cluster
  { slug: "apache-spark", top: "10%", inset: "4%", radius: 48, duration: 23, delay: -9, sizeClass: "size-20" },
  { slug: "helm", top: "22%", inset: "8%", radius: 36, duration: 24, delay: -6, sizeClass: "size-12" },
  // bottom-right cluster
  { slug: "grafana", top: "76%", inset: "3%", radius: 56, duration: 27, delay: -15, sizeClass: "size-24" },
  { slug: "argocd", top: "88%", inset: "7%", radius: 42, duration: 20, delay: -3, sizeClass: "size-14" },
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
        headerParallax={40}
        cardOffset={24}
        titleComponent={
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-center mb-4">
              How do I learn new things? By self-hosting them, of course!
            </h1>
            <p className="text-muted-foreground">
              Real-time status of my self-hosted apps and data platform .
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
