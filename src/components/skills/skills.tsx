"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getProjectsBySkill, getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../../public/data/technologies";

const PREVIEW_LIMIT = 3;

// Which technologies show up on the Skills page, grouped by category.
// Not every technology in the registry belongs here — some are only
// referenced from Projects.
const SKILL_CATEGORIES: Record<
  string,
  {
    title: string;
    description: string;
    color: string;
    technologies: TechnologySlug[];
  }
> = {
  languages: {
    title: "Languages",
    description: "Primary programming languages",
    color: "from-yellow-500/20 to-orange-500/20",
    technologies: ["python", "java", "sql", "typescript"],
  },
  web: {
    title: "Web Development",
    description: "Full-stack app tooling",
    color: "from-blue-500/20 to-cyan-500/20",
    technologies: ["react", "nextjs", "nodejs", "tailwindcss", "prisma"],
  },
  platform: {
    title: "Platform",
    description: "Data processing and building ETL",
    color: "from-red-500/20 to-yellow-500/20",
    technologies: [
      "terraform",
      "kubernetes",
      "digitalocean",
      "aws",
      "gcp",
      "argocd",
    ],
  },
  tools: {
    title: "Technology and Tools",
    description: "Development and deployment tools. Iaas and PaaS",
    color: "from-purple-500/20 to-red-500/20",
    technologies: ["git", "gitlab", "docker", "linux", "podman", "insomnia"],
  },
  "data-engineering": {
    title: "Data Engineering",
    description: "Data processing and building ETL",
    color: "from-red-500/20 to-yellow-500/20",
    technologies: [
      "apache-airflow",
      "prefect",
      "snowflake",
      "apache-kafka",
      "trino",
      "apache-iceberg",
      "apache-spark",
      "redis",
      "great-expectations",
      "dbt",
      "postgresql",
    ],
  },
  "ds-ml": {
    title: "DS/ML Engineering",
    description: "Data analysis and machine learning",
    color: "from-green-500/20 to-blue-500/20",
    technologies: [
      "tensorflow",
      "pytorch",
      "weights-and-biases",
      "kubeflow",
      "ray",
      "rapidminer",
      "tableau",
    ],
  },
};

function SkillPreviewCard({
  slug,
  name,
}: {
  slug: TechnologySlug;
  name: string;
}) {
  const projects = getProjectsBySkill(slug, PREVIEW_LIMIT + 1);
  const preview = projects.slice(0, PREVIEW_LIMIT);
  const hasMore = projects.length > PREVIEW_LIMIT;

  return (
    <HoverCardContent className="w-56 p-3">
      <p className="text-xs font-semibold">{name}</p>
      {preview.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {preview.map((project) => (
            <li key={project.title}>
              <Link
                href={project.href || "#"}
                className="text-xs text-muted-foreground hover:text-foreground hover:underline"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          No projects yet.
        </p>
      )}
      {preview.length > 0 && (
        <Link
          href={`/projects?skill=${slug}`}
          className="mt-3 block text-xs font-medium text-blue-500 hover:underline"
        >
          {hasMore ? "View more →" : "View project →"}
        </Link>
      )}
    </HoverCardContent>
  );
}

export function SkillsGrid() {
  const categorySlugs = Object.keys(SKILL_CATEGORIES);

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorySlugs.map((categorySlug, idx) => {
          const category = SKILL_CATEGORIES[categorySlug];
          const technologies = category.technologies
            .map((slug) => getTechnologyBySlug(slug))
            .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech));
          if (technologies.length === 0) return null;

          return (
            <motion.div
              key={categorySlug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-xl p-6 bg-white/5 hover:bg-white/10
                         border border-gray-200 hover:border-gray-300
                         transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <HoverCard key={tech.slug} openDelay={150} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-1.5 rounded-full border border-gray-200
                                   px-3 py-1.5 hover:bg-gray-50 hover:border-gray-300
                                   transition-colors duration-200 cursor-pointer"
                      >
                        <div className="w-4 h-4 shrink-0">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-xs font-medium whitespace-nowrap">
                          {tech.name}
                        </span>
                      </motion.div>
                    </HoverCardTrigger>
                    <SkillPreviewCard slug={tech.slug} name={tech.name} />
                  </HoverCard>
                ))}
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color}
                           opacity-0 group-hover:opacity-100 transition-opacity
                           duration-500 -z-10 rounded-xl`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsGrid;
