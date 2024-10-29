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
    name: "Global sales from day one",
    description:
      "Control currencies, payment & fulfillment providers, tax, shipping options, and more.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: ShoppingCartIcon,
    name: "Cart & checkout",
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
    name: "Omnichannel ready",
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
    name: "Powerful order management features",
    description:
      "Fulfill from multiple locations, instantly create return and exchange flows, and much more.",
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
