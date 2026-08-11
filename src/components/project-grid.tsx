import type { ReactNode } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import type { TechnologySlug } from "../../public/data/technologies";

interface Project {
  title: string;
  href?: string;
  description: string;
  dates: string;
  skills?: readonly TechnologySlug[];
  image?: string;
  video?: string;
  links?: readonly { icon: ReactNode; type: string; href: string }[];
}

interface ProjectGridProps {
  projects: readonly Project[];
  delayOffset: number;
  delayStep?: number;
  className?: string;
  emptyState?: ReactNode;
}

export function ProjectGrid({
  projects,
  delayOffset,
  delayStep = 0.05,
  className,
  emptyState = null,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
      {projects.map((project, id) => (
        <BlurFade key={project.title} delay={delayOffset + id * delayStep}>
          <ProjectCard
            href={project.href}
            title={project.title}
            description={project.description}
            dates={project.dates}
            skills={project.skills}
            image={project.image}
            video={project.video}
            links={project.links}
          />
        </BlurFade>
      ))}
    </div>
  );
}
