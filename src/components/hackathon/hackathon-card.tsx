// src/components/hackathon-card.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AnimatedGradientText, {
  AchievementVariant,
} from "../ui/animated-gradient-text";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  achievement?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  achievement,
  links,
  centerAvatar = true,
}: Props & { centerAvatar?: boolean }) {
  function getVariant(
    achievement?: string
  ): "champion" | "runner" | "third" | "finalist" {
    if (!achievement) return "finalist";
    const lowered = achievement.toLowerCase();
    if (lowered.includes("champion")) return "champion";
    if (lowered.includes("runner")) return "runner";
    if (lowered.includes("3rd") || lowered.includes("third")) return "third";
    return "finalist";
  }

  return (
    <div className="relative flex items-start gap-4 list-none">
      {/* Hackathon Logo Avatar - Now absolutely positioned */}
      <div className="absolute -left-[4.5rem] top-0">
        <Avatar className="h-12 w-12 border bg-white">
          <AvatarImage src={image} alt={title} className="object-cover" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {achievement && (
          <AnimatedGradientText
            variant={getVariant(achievement)}
            className="w-full items-start mb-1.5"
          >
            {achievement}
          </AnimatedGradientText>
        )}
        <h2 className="font-semibold leading-none mb-1">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground">{location}</p>
        )}
        {dates && (
          <time className="text-xs text-muted-foreground">{dates}</time>
        )}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground mt-2">
            {description}
          </span>
        )}

        {links && links.length > 0 && (
          <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
            {links?.map((link, idx) => (
              <Link href={link.href} key={idx}>
                <Badge key={idx} title={link.title} className="flex gap-2">
                  {link.icon}
                  {link.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
