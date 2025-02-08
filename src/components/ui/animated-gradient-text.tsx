import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const achievementVariants = {
  champion: {
    border: "from-[#FFE223FF]/50 via-[#E9A318FF]/50 to-[#E7CC30FF]/50",
    text: "from-[#D1B200FF] via-[#B98826FF] to-[#C5A803FF]",
  },
  runner: {
    border: "from-[#C0C0C0]/50 via-[#E8E8E8]/50 to-[#C0C0C0]/50",
    text: "from-[#A7A7A7FF] via-[#B6B6B6FF] to-[#818181FF]",
  },
  third: {
    border: "from-[#CD7F32]/50 via-[#B87333]/50 to-[#CD7F32]/50",
    text: "from-[#CD7F32] via-[#B87333] to-[#CD7F32]",
  },
  finalist: {
    border: "from-gray-400/50 via-gray-500/50 to-gray-400/50 !animate-none",
    text: "from-slate-400 via-slate-500 to-slate-400 !animate-none",
  },
};

export type AchievementVariant = keyof typeof achievementVariants;

export default function AnimatedGradientText({
  children,
  className,
  variant = "finalist",
}: {
  children: ReactNode;
  className?: string;
  variant?: AchievementVariant;
}) {
  return (
    <div
      className={cn(
        "group relative flex max-w-fit flex-row items-start justify-start rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
        className
      )}
    >
      <div
        className={cn(
          `absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
          variant ? achievementVariants[variant].border : ""
        )}
      />
      <div
        className={cn(
          "animate-gradient bg-gradient-to-r bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
          variant ? achievementVariants[variant].text : ""
        )}
      >
        {children}
      </div>
    </div>
  );
}
