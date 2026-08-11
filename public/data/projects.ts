import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface ProjectFrontmatter {
  title: string;
  date?: string;
  summary?: string;
  cover?: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "public/data/projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"));
}

export function getProjectSource(
  slug: string,
): { content: string; frontmatter: ProjectFrontmatter } | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data as ProjectFrontmatter };
}
