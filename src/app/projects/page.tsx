import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Safari } from "@/components/ui/safari";
import { DATA } from "../../../public/data/resume";
import { getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../../public/data/technologies";

const BLUR_FADE_DELAY = 0.04;

// Same live status embed as the homepage's homelab section — placeholder
// for the Grafana dashboard until that's ready.
const STATUS_PAGE_URL = "https://kuma.haziqhakimi.online/status/self-hosted-apps";

interface ProjectsPageProps {
  searchParams: { skill?: string };
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const activeSlugs = (searchParams.skill?.split(",").filter(Boolean) ??
    []) as TechnologySlug[];
  const activeSkills = activeSlugs
    .map((slug) => getTechnologyBySlug(slug))
    .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

  const selectedWork = DATA.projects.filter((project) => project.is_selected_work);
  const projects =
    activeSlugs.length === 0
      ? selectedWork
      : selectedWork.filter((project) =>
          activeSlugs.every((slug) => project.skills.includes(slug)),
        );

  return (
    <main className="flex flex-col min-h-[100dvh] max-w-5xl mx-auto px-4">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 pt-16 text-center">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="mx-auto max-w-2xl space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              I build things, then I run them myself
            </h1>
            <p className="text-muted-foreground md:text-lg">
              From SaaS products to the homelab powering my own infrastructure
              — here&apos;s a live look at what&apos;s actually running.
            </p>
          </div>
        </BlurFade>
      </section>

      {/* Safari mockup — its own top-level section (not nested inside the
          items-center hero above) so the -mx-[50vw]/left-[50%] full-bleed
          math has the same flex-start static position it has everywhere
          else this pattern is used on the site. Nesting it inside an
          items-center flex parent shifts that static position and throws
          the cancellation off, which is what caused the rightward drift. */}
      <section className="relative -mx-[50vw] left-[50%] right-[50%] w-screen px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Safari url="kuma.haziqhakimi.online" className="w-full">
            <iframe
              src={STATUS_PAGE_URL}
              title="Live homelab status"
              loading="lazy"
              className="h-full w-full border-0"
            />
          </Safari>
        </div>
      </section>

      {/* Selected work */}
      <section className="space-y-8 pb-16">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Selected work
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              {activeSkills.length > 0 ? "Filtered projects" : "Projects I'm proud of"}
            </h2>
          </div>
        </BlurFade>

        {activeSkills.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 5 + id * 0.05}
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
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <p className="text-muted-foreground">
              No projects match this filter yet.
            </p>
          </BlurFade>
        )}
      </section>
    </main>
  );
}
