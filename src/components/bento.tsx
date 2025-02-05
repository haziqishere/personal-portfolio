import Image from "next/image";
import {
  GlobeIcon,
  ShoppingCartIcon,
  PackageIcon,
  TramFrontIcon,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

const features = [
  {
    Icon: GlobeIcon,
    name: "Involve Competitively in Hackathon",
    description: "Sharpen technical, problem-solving, and teamwork skills.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {" "}
        {/* Added overflow-hidden and rounded corners */}
        <div className="absolute inset-0 w-full h-full bg-slate-200/70 z-10" />{" "}
        {/* Made overlay cover full dimensions */}
        <Image
          className="object-cover w-full h-full"
          src="/hackathon-picture/um_hackathon.jpg"
          alt="umhackathon"
          width={1000}
          height={300}
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent z-20" />
      </div>
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: ShoppingCartIcon,
    name: "Leadership",
    description:
      "A lightning-fast Cart API complete with discounts, gift cards, shipping, and payment.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: TramFrontIcon,
    name: "Sports",
    description:
      "Sell through marketplaces, physical stores, etc., and manage from one unified overview.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-50" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: PackageIcon,
    name: "Big Passion For Tech",
    description:
      "Spent semester break to became Full Stack Developer Summer Intern. Participated in Tech Meetups and Events.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-50" />
    ),
    className: "lg:col-span-2 lg:row-span-1",
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
