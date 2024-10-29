import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
      // light styles
      "bg-white shadow-sm hover:shadow-md",
      // dark styles
      "dark:bg-neutral-950 dark:hover:bg-neutral-900",
      "border border-neutral-200 dark:border-neutral-800",
      "transition-all duration-300",
      className
    )}
  >
    <div className="absolute inset-0">{background}</div>
    <div className="relative z-10 p-6">
      <div className="flex items-center gap-4 mb-4">
        <Icon className="h-8 w-8 text-neutral-600 dark:text-neutral-300" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
          {name}
        </h3>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>

    <div className="relative z-10 p-6 pt-0">
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <a href={href} className="flex items-center">
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
