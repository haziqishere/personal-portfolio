import { DATA } from "../../public/data/resume";
import {
  TECHNOLOGIES,
  type Technology,
  type TechnologySlug,
} from "../../public/data/skills";

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return TECHNOLOGIES.find((technology) => technology.slug === slug);
}

// Reverse index of the skill -> projects edge. Computed on demand from
// each project's `skills` field so it can never drift out of sync with
// the projects it's derived from — there is nothing here to keep updated.
export function getProjectsBySkill(slug: TechnologySlug, limit?: number) {
  const matches = DATA.projects.filter((project) => project.skills.includes(slug));
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

export function getProjectsBySkills(slugs: TechnologySlug[]) {
  if (slugs.length === 0) return DATA.projects;
  return DATA.projects.filter((project) =>
    slugs.every((slug) => project.skills.includes(slug)),
  );
}
