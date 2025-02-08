import { HackathonCard } from "@/components/hackathon/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/app/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import Bento from "@/components/bento";

import { ETLPipelineShowcase } from "@/components/pipeline/container-scroll";
import RolesCarousel from "@/components/roles/carousel";
import HackathonTimeline from "@/components/hackathon/timeline";
import GeminiHero from "@/components/hero/gemini";
import { WavyBackground } from "@/components/ui/wavy-background";
import { WavyBackgroundSection } from "@/components/cta/wavy-background";
import { VortexSection } from "@/components/cta/vortext-section";
import { BackgroundBeamSection } from "@/components/hero/background-beam";
import { SkillsGrid } from "@/components/skills/skills";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 ">
      {/* Background Beam Section */}
      <section className="relative">
        <BackgroundBeamSection />
      </section>
      <section
        id="bento"
        className="relative -mx-[50vw] left-[50%] right-[50%] w-screen overflow-hidden"
      >
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-transparent">
          {/* Gradient circles */}
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-[120px] animate-pulse hover:animate-[pulse_5s_ease-in-out_forwards] hover:w-[50%] hover:h-[50%]" />
          <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-l from-purple-400/20 to-pink-500/20 blur-[120px] animate-pulse delay-[2s] hover:animate-[pulse_5s_ease-in-out_forwards] hover:w-[50%] hover:h-[50%]" />

          {/* SVG Circle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/public/images/circles.svg')] bg-cover bg-center opacity-50" />
        </div>
        {/* Content container */}
        <div className="relative mx-auto max-w-4xl pt-24 md:pt-32 px-6"></div>ß
        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        {/* Bento */}
        <div className="pb-24">
          <Bento />
        </div>
      </section>
      {/* Apple Carousel */}
      <section className="relative -mx-[50vw] left-[50%] right-[50%] w-screen -mt-12 sm:-mt-24 overflow-hidden ">
        <RolesCarousel />
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
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
      {/* Hackathon Timeline */}
      <section className="py-2" id="hackathons">
        <HackathonTimeline />
      </section>
      {/* ETL Pipeline */}
      <section className="relative -mx-[50vw] left-[50%] right-[50%] w-screen overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <ETLPipelineShowcase />
      </section>
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
