// Skill registry — single source of truth for skill name/icon/category.
// Projects reference skills by slug (see resume.tsx `skills` field);
// the reverse direction (skill -> projects) is derived in src/lib/skills.ts,
// never stored here, so the two never drift out of sync.

export type SkillCategorySlug =
  | "languages"
  | "web"
  | "platform"
  | "tools"
  | "data-engineering"
  | "ds-ml";

export const SKILL_CATEGORIES: Record<
  SkillCategorySlug,
  { title: string; description: string; color: string }
> = {
  languages: {
    title: "Languages",
    description: "Primary programming languages",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  web: {
    title: "Web Development",
    description: "Full-stack app tooling",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  platform: {
    title: "Platform",
    description: "Data processing and building ETL",
    color: "from-red-500/20 to-yellow-500/20",
  },
  tools: {
    title: "Technology and Tools",
    description: "Development and deployment tools. Iaas and PaaS",
    color: "from-purple-500/20 to-red-500/20",
  },
  "data-engineering": {
    title: "Data Engineering",
    description: "Data processing and building ETL",
    color: "from-red-500/20 to-yellow-500/20",
  },
  "ds-ml": {
    title: "DS/ML Engineering",
    description: "Data analysis and machine learning",
    color: "from-green-500/20 to-blue-500/20",
  },
};

export const SKILLS = [
  // Languages
  { slug: "python", name: "Python", icon: "/icons/python.svg", category: "languages" },
  { slug: "java", name: "Java", icon: "/icons/java.svg", category: "languages" },
  { slug: "sql", name: "SQL", icon: "/icons/sql.svg", category: "languages" },
  { slug: "typescript", name: "TypeScript", icon: "/icons/typescript.svg", category: "languages" },

  // Web development
  { slug: "react", name: "React", icon: "/icons/react.svg", category: "web" },
  { slug: "nextjs", name: "Next.js", icon: "/icons/nextjs.svg", category: "web" },
  { slug: "nodejs", name: "Node.js", icon: "/icons/nodejs.svg", category: "web" },
  { slug: "tailwindcss", name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", category: "web" },
  { slug: "prisma", name: "Prisma", icon: "/icons/prisma.svg", category: "web" },

  // Platform
  { slug: "terraform", name: "Terraform", icon: "/icons/terraform.svg", category: "platform" },
  { slug: "kubernetes", name: "Kubernetes", icon: "/icons/kubernetes.svg", category: "platform" },
  { slug: "digitalocean", name: "DigitalOcean", icon: "/icons/digitalocean.svg", category: "platform" },
  { slug: "aws", name: "AWS", icon: "/icons/aws.svg", category: "platform" },
  { slug: "gcp", name: "GCP", icon: "/icons/gcp.svg", category: "platform" },
  { slug: "argocd", name: "ArgoCD", icon: "/icons/argocd.svg", category: "platform" },

  // Tools
  { slug: "git", name: "Git", icon: "/icons/git.svg", category: "tools" },
  { slug: "gitlab", name: "GitLab", icon: "/icons/gitlab.svg", category: "tools" },
  { slug: "docker", name: "Docker", icon: "/icons/docker.svg", category: "tools" },
  { slug: "linux", name: "Linux", icon: "/icons/linux.svg", category: "tools" },
  { slug: "podman", name: "Podman", icon: "/icons/podman.svg", category: "tools" },
  { slug: "insomnia", name: "Insomnia", icon: "/icons/insomnia.svg", category: "tools" },

  // Data Engineering
  { slug: "apache-airflow", name: "Airflow", icon: "/icons/airflow.svg", category: "data-engineering" },
  { slug: "prefect", name: "Prefect", icon: "/icons/prefect.svg", category: "data-engineering" },
  { slug: "snowflake", name: "Snowflake", icon: "/icons/snowflake.svg", category: "data-engineering" },
  { slug: "apache-kafka", name: "Kafka", icon: "/icons/kafka.svg", category: "data-engineering" },
  { slug: "trino", name: "Trino", icon: "/icons/trino.svg", category: "data-engineering" },
  { slug: "apache-iceberg", name: "Iceberg", icon: "/icons/iceberg.svg", category: "data-engineering" },
  { slug: "apache-spark", name: "Spark", icon: "/icons/spark.svg", category: "data-engineering" },
  { slug: "redis", name: "Redis", icon: "/icons/redis.svg", category: "data-engineering" },
  { slug: "great-expectations", name: "Great Expectations", icon: "/icons/gx.svg", category: "data-engineering" },
  { slug: "dbt", name: "Dbt", icon: "/icons/dbt.svg", category: "data-engineering" },
  { slug: "postgresql", name: "PostgreSQL", icon: "/icons/postgresql.svg", category: "data-engineering" },

  // DS/ML Engineering
  { slug: "tensorflow", name: "TensorFlow", icon: "/icons/tensorflow.svg", category: "ds-ml" },
  { slug: "pytorch", name: "PyTorch", icon: "/icons/pytorch.svg", category: "ds-ml" },
  { slug: "weights-and-biases", name: "Weights & Biases", icon: "/icons/wandb.svg", category: "ds-ml" },
  { slug: "kubeflow", name: "Kubeflow", icon: "/icons/kubeflow.svg", category: "ds-ml" },
  { slug: "ray", name: "Ray", icon: "/icons/ray.svg", category: "ds-ml" },
  { slug: "rapidminer", name: "RapidMiner", icon: "/icons/rapidminer.png", category: "ds-ml" },
  { slug: "tableau", name: "Tableau", icon: "/icons/tableu.svg", category: "ds-ml" },
] as const satisfies ReadonlyArray<{
  slug: string;
  name: string;
  icon: string;
  category: SkillCategorySlug;
}>;

export type Skill = (typeof SKILLS)[number];
export type SkillSlug = Skill["slug"];
