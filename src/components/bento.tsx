"use client";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

import Image from "next/image";
import {
  MedalIcon,
  LaptopIcon,
  CircleDollarSignIcon,
  TrophyIcon,
} from "lucide-react";

import { Marquee3D } from "./bento components/awardMarquee";
import FinTechVisual from "./bento components/fintech";

const features = [
  {
    Icon: MedalIcon,
    name: "Involve Competitively in Hackathon",
    description: "Sharpen technical, problem-solving, and teamwork skills.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {/*  <Image
          className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom_right,white_10%,transparent)]"
          src="/asset/wave-2.svg"
          alt="wave background"
          fill
          style={{ objectFit: "cover" }}
        /> */}
        <div className="absolute right-[-15%] md:right-[-12%] h-full z-10">
          <Image
            className="object-cover w-full h-full"
            src="/hackathon-picture/um_hackathon.png"
            alt="umhackathon"
            width={1000}
            height={300}
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent z-20" />
        </div>
      </div>
    ),
    className: "lg:col-span-2 lg:row-span-1",
    iconColor: "text-blue-500",
  },
  {
    Icon: LaptopIcon,
    name: "Big Passion For Tech",
    description:
      "Participated in Tech Meetups and Events. Loves to read engineering blogs and tech-related books",
    href: "/",
    cta: "Learn more",
    background: <div></div>,
    className: "lg:col-span-1 lg:row-span-1",
    iconColor: "text-slate-500",
  },
  {
    Icon: CircleDollarSignIcon,
    name: "Specialize in FinTech",
    description:
      "Sell through marketplaces, physical stores, etc., and manage from one unified overview.",
    href: "/",
    cta: "Learn more",
    background: <FinTechVisual />,
    className: "lg:col-span-1 lg:row-span-1",
    iconColor: "text-green-500",
  },
  {
    Icon: TrophyIcon,
    name: "Award-winning Faculty Icon",
    description:
      "Faculty's Icon Award for outstanding academic performance and contribution to the university. Technology and Innovation Icon for outstanding hackathon achievements. Athlete Icon Award for Gold Medal in SUKIPT and MASUM.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="relative w-full h-full">
        <div className="absolute right-[-90%] md:right-[-70%] w-[150%] md:w-[120%] h-full [mask-image:radial-gradient(450px_circle_at_center,white_30%,transparent)]">
          <Marquee3D />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/50 to-transparent z-20" />
      </div>
    ),
    className: "lg:col-span-2 lg:row-span-1",
    iconColor: "text-yellow-500",
  },
];

const Bento = () => {
  return (
    <BentoGrid className="lg:grid-cols-3 lg:grid-rows-2 lg:max-w-6xl mx-auto gap-4">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          {...feature}
          className={cn(
            feature.className,
            "h-[23rem]",
            "bg-white dark:bg-neutral-950 dark:hover:bg-neutral-900 transition-all duration-300",
            "border border-neutral-200 dark:border-neutral-800",
            "rounded-3xl overflow-hidden",
            "group relative"
          )}
        />
      ))}
    </BentoGrid>
  );
};

export default Bento;
