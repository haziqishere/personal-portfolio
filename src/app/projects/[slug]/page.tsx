import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { MobileTableOfContents } from "@/components/blog/mobile-toc";
import { HashScrollHandler } from "@/components/blog/hash-scroll-handler";
import { getMDXComponents } from "@/components/blog/mdx-components";
import { DATA } from "../../../../public/data/resume";
import { getProjectSource } from "../../../../public/data/projects";

export { generateMetadata } from "./metadata";

const BLUR_FADE_DELAY = 0.04;

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return DATA.projects
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug }));
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function ProjectCaseStudy({ params }: PageProps) {
  const project = DATA.projects.find((p) => p.slug === params.slug);
  const post = getProjectSource(params.slug);

  if (!project || !post) {
    notFound();
  }

  const { content, frontmatter } = post;

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <HashScrollHandler />

      <BlurFade delay={BLUR_FADE_DELAY}>
        <Button asChild variant="outline" size="icon" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to projects</span>
          </Link>
        </Button>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="space-y-3 border-b border-foreground/10 pb-8">
          {frontmatter.date && (
            <time className="text-sm text-muted-foreground">
              {formatDate(frontmatter.date)}
            </time>
          )}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {frontmatter.title || project.title}
          </h1>
          {frontmatter.summary && (
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              {frontmatter.summary}
            </p>
          )}
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.links.map((link, idx) => (
                <Link href={link.href} key={idx} target="_blank">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </BlurFade>

      {frontmatter.cover && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="relative mt-8 h-[360px] w-full overflow-hidden rounded-xl border">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </BlurFade>
      )}

      <div className="mt-10 flex gap-12">
        <article className="prose min-w-0 max-w-none flex-1 text-pretty font-sans dark:prose-invert prose-headings:scroll-mt-20 prose-headings:tracking-tight">
          <MDXRemote
            source={content}
            components={getMDXComponents()}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: { light: "min-light", dark: "min-dark" },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </article>

        <aside className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-20">
            <TableOfContents />
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
    </main>
  );
}
