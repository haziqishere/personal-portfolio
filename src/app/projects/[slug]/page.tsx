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
    // Breaks out of the global max-w-4xl layout wrapper (same -mx-[50vw]
    // trick used elsewhere in this codebase, e.g. the /projects hero) so
    // this page can use its own wider column, and so the back button's
    // sticky wrapper below spans the true viewport width — its `left`
    // offsets are computed against that width, not the narrower default
    // column.
    <main className="relative -mx-[50vw] left-[50%] right-[50%] flex w-screen flex-col min-h-[100dvh]">
      <HashScrollHandler />

      {/* Sticky in the page's left margin, like Medium/Confluence — the
          wrapper is h-0 so it takes no space in the article flow (the
          title isn't pushed down), while `sticky` on it still tracks
          scroll normally. The button is absolute inside that zero-height
          wrapper purely to place it horizontally, and that wrapper spans
          the full viewport width (main is broken out above), so the xl:
          calc is relative to true viewport width, not the content column.
          Below xl there's no real gutter next to the max-w-6xl column, so
          it sits near the viewport edge instead; at xl+ it hugs the
          content's own left edge (50% - half of max-w-6xl - gap). */}
      <div className="sticky top-[8.5rem] z-40 h-0">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="absolute left-4 md:left-8 xl:left-[calc(50%-39rem)]"
        >
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to projects</span>
          </Link>
        </Button>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
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
      </div>

      <MobileTableOfContents />
    </main>
  );
}
