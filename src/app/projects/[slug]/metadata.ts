import { Metadata } from "next";
import { DATA } from "../../../../public/data/resume";
import { getProjectSource } from "../../../../public/data/projects";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = DATA.projects.find((p) => p.slug === params.slug);
  const post = getProjectSource(params.slug);

  if (!project || !post) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const { frontmatter } = post;
  const title = frontmatter.title || project.title;
  const description = frontmatter.summary || project.description;
  const ogUrl = `${DATA.url}/projects/${params.slug}`;

  return {
    title,
    description,
    authors: [{ name: DATA.name, url: DATA.url }],
    openGraph: {
      title,
      description,
      type: "article",
      url: ogUrl,
      publishedTime: frontmatter.date,
      images: [
        {
          url: frontmatter.cover || `${ogUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: DATA.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: ogUrl,
    },
  };
}
