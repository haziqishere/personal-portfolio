import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Safari } from "@/components/ui/safari";
import { DATA } from "../../../public/data/resume";
import { getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../../public/data/technologies";
import LightPillar from "@/components/LightPillar";

const BLUR_FADE_DELAY = 0.04;

// Same live status embed as the homepage's homelab section — placeholder
// for the Grafana dashboard until that's ready.
const STATUS_PAGE_URL = "https://kuma.haziqhakimi.online/status/self-hosted-apps";

// The actual stack this page itself is built with — not a generic dev-icon
// assortment. Three, matching the restraint of the reference (not five).
const FLOAT_ICONS: Array<{ slug: TechnologySlug; delay: number; duration: number }> = [
  { slug: "nextjs", delay: -1, duration: 5 },
  { slug: "typescript", delay: -2.5, duration: 4.5 },
  { slug: "react", delay: -0.5, duration: 5.5 },
];

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
      {/* Hero — dark full-bleed band (same bg-black precedent as the
          homepage's Vortex CTA section, not a new bespoke color), a single
          restrained blue glow behind the mockup, three of this site's own
          stack icons gently floating above it. Scoped entirely to this
          page. The breakout classes go directly on this flex container
          itself (not a wrapper nested inside one) — -mx-[50vw]/left-[50%]
          math only cancels correctly with a flex-start static position,
          which nesting inside a *different* items-center parent breaks. */}
      <section className="relative -mx-[50vw] left-[50%] right-[50%] -mt-12 flex w-screen flex-col items-center gap-8 overflow-hidden bg-black px-4 pb-16 pt-16 text-center sm:-mt-24">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={0.8}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={1}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={0}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
        />
        </div>

        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative z-10 mx-auto max-w-2xl space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              I build things, then I run them myself
            </h1>
            <p className="text-white/60 md:text-lg">
              From SaaS products to the homelab powering my own infrastructure
              — here&apos;s a live look at what&apos;s actually running.
            </p>
          </div>
        </BlurFade>

        <div
          aria-hidden="true"
          className="relative z-10 flex flex-wrap items-center justify-center gap-4"
        >
          {FLOAT_ICONS.map((spec) => {
            const tech = getTechnologyBySlug(spec.slug);
            if (!tech) return null;
            return (
              <div
                key={spec.slug}
                className="float-icon flex size-11 items-center justify-center rounded-full border bg-white/90 p-2.5 shadow-md dark:bg-zinc-800/90"
                style={{
                  animation: `float ${spec.duration}s ease-in-out infinite`,
                  animationDelay: `${spec.delay}s`,
                }}
              >
                <img src={tech.icon} alt="" className="h-full w-full object-contain" />
              </div>
            );
          })}
        </div>

        {/* Fills the bottom of the dark hero with the page's normal
            background. Sits above the rays (z-0) but below the mockup
            (z-10), so the mockup's lower half visually rests on this white
            strip while its upper half stays against the dark glow — the
            illusion of the mockup bridging the two sections. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[1] h-64 bg-background"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
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
