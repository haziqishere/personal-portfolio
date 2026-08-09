import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "../../../public/data/resume";
import { getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../../public/data/technologies";

const BLUR_FADE_DELAY = 0.04;

interface ProjectsPageProps {
  searchParams: { skill?: string };
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const activeSlugs = (searchParams.skill?.split(",").filter(Boolean) ??
    []) as TechnologySlug[];
  const activeSkills = activeSlugs
    .map((slug) => getTechnologyBySlug(slug))
    .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

  const projects =
    activeSlugs.length === 0
      ? DATA.projects
      : DATA.projects.filter((project) =>
          activeSlugs.every((slug) => project.skills.includes(slug)),
        );

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8 max-w-4xl mx-auto py-12 px-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Projects
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {activeSkills.length > 0 ? "Filtered projects" : "All projects"}
          </h1>
        </div>
      </BlurFade>

      {activeSkills.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtered by:</span>
            {activeSkills.map((skill) => (
              <Badge key={skill.slug} variant="secondary">
                {skill.name}
              </Badge>
            ))}
            <Link
              href="/projects"
              className="text-sm text-blue-500 hover:underline"
            >
              Clear filter
            </Link>
          </div>
        </BlurFade>
      )}

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 3 + id * 0.05}
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="text-muted-foreground">
            No projects match this filter yet.
          </p>
        </BlurFade>
      )}
    </main>
  );
}
