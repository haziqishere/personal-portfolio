import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getTechnologyBySlug } from "@/lib/skills";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import type { TechnologySlug } from "../../public/data/technologies";

interface Props {
  title: string;
  href?: string;
  slug?: string;
  description: string;
  dates: string;
  skills?: readonly TechnologySlug[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  slug,
  description,
  dates,
  skills,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const technologies = (skills ?? [])
    .map((techSlug) => getTechnologyBySlug(techSlug))
    .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech));
  const detailHref = slug ? `/projects/${slug}` : href;
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={detailHref || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {technologies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {technologies.map((tech) => (
              <div
                key={tech.slug}
                className="flex items-center gap-1 rounded-full border px-2 py-0.5"
              >
                <div className="h-3 w-3 shrink-0">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={12}
                    height={12}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-medium whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
