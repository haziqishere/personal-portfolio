import { HackathonCard } from "@/components/hackathon/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "../../public/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import Bento from "@/components/bento components/bento";

import { StatusShowcase } from "@/components/infrastructure/container-scroll";
import { WavyBackground } from "@/components/ui/wavy-background";
import { WavyBackgroundSection } from "@/components/cta/wavy-background";
import { VortexSection } from "@/components/cta/vortext-section";
import { SkillsGrid } from "@/components/skills/skills";
import { ProfilePanel } from "@/components/profile/panel";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Profile Panel + About + Skills row */}
      <section className="relative -mx-[50vw] left-[50%] right-[50%] w-screen">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16 lg:items-stretch">
          <div className="lg:h-full">
            <BlurFade delay={BLUR_FADE_DELAY} className="lg:h-full">
              <ProfilePanel />
            </BlurFade>
          </div>

          <div className="mt-10 flex flex-col space-y-10 lg:mt-0">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                About Me
              </h2>
            </BlurFade>

            {/* About Section */}
            <section id="about">
              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                  {DATA.summary}
                </Markdown>
              </BlurFade>
            </section>

            <section id="skills">
              <div className="flex min-h-0 flex-col">
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <h2 className="text-xl font-bold">Skills</h2>
                </BlurFade>
                <div className="flex flex-wrap">
                  <BlurFade delay={BLUR_FADE_DELAY * 10}>
                    <SkillsGrid />
                  </BlurFade>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Infrastructure Showcase */}
      <section className="relative -mx-[50vw] left-[50%] right-[50%] w-screen bg-gradient-to-b from-white to-slate-50">
        <StatusShowcase />
      </section>

      {/* Projects Overview */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
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
        </div>
      </section>

      {/* Vortx Background CTA Section */}
      <section
        id="cta"
        className="relative py-20 bg-black -mx-[50vw] left-[50%] right-[50%] w-screen -mt-12 sm:-mt-24 mb-10 overflow-hidden"
      >
        <VortexSection />
      </section>

      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
