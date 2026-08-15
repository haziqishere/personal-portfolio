// Technology registry — single source of truth for name/icon per technology.
// Projects and work roles reference technologies by slug (see resume.tsx
// `skills` fields). Category grouping is NOT stored here: not every
// technology is featured on the Skills page — some only show up on
// Projects — so which categories exist and which technologies belong to
// them lives in src/components/skills/skills.tsx, next to where it's used.

export const TECHNOLOGIES = [
  // Languages
  { slug: "python", name: "Python", icon: "/icons/python.svg" },
  { slug: "java", name: "Java", icon: "/icons/java.svg" },
  { slug: "sql", name: "SQL", icon: "/icons/sql.svg" },
  { slug: "typescript", name: "TypeScript", icon: "/icons/typescript.svg" },

  // Web development
  { slug: "react", name: "React", icon: "/icons/react.svg" },
  { slug: "nextjs", name: "Next.js", icon: "/icons/nextjs.svg" },
  { slug: "nodejs", name: "Node.js", icon: "/icons/nodejs.svg" },
  { slug: "tailwindcss", name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { slug: "prisma", name: "Prisma", icon: "/icons/prisma.svg" },

  // Platform
  { slug: "terraform", name: "Terraform", icon: "/icons/terraform.svg" },
  { slug: "kubernetes", name: "Kubernetes", icon: "/icons/kubernetes.svg" },
  { slug: "digitalocean", name: "DigitalOcean", icon: "/icons/digitalocean.svg" },
  { slug: "aws", name: "AWS", icon: "/icons/aws.svg" },
  { slug: "gcp", name: "GCP", icon: "/icons/gcp.svg" },
  { slug: "argocd", name: "ArgoCD", icon: "/icons/argocd.svg" },
  { slug: "grafana", name: "Grafana", icon: "/icons/grafana.svg" },
  { slug: "prometheus", name: "Prometheus", icon: "/icons/prometheus.svg" },
  { slug: "cloudflare", name: "Cloudflare", icon: "/icons/cloudflare.svg" },

  // Infrastructure
  { slug: "nvidia-cuda", name: "NVIDIA CUDA", icon: "/icons/cuda.svg" },
  { slug: "raspberry-pi", name: "Raspberry Pi", icon: "/icons/raspberrypi.svg" },
  { slug: "helm", name: "Helm", icon: "/icons/helm.svg" },


  // Tools
  { slug: "git", name: "Git", icon: "/icons/git.svg" },
  { slug: "gitlab", name: "GitLab", icon: "/icons/gitlab.svg" },
  { slug: "docker", name: "Docker", icon: "/icons/docker.svg" },
  { slug: "linux", name: "Linux", icon: "/icons/linux.svg" },
  { slug: "podman", name: "Podman", icon: "/icons/podman.svg" },
  { slug: "insomnia", name: "Insomnia", icon: "/icons/insomnia.svg" },

  // Data Engineering
  { slug: "apache-airflow", name: "Airflow", icon: "/icons/airflow.svg" },
  { slug: "prefect", name: "Prefect", icon: "/icons/prefect.svg" },
  { slug: "snowflake", name: "Snowflake", icon: "/icons/snowflake.svg" },
  { slug: "apache-kafka", name: "Kafka", icon: "/icons/kafka.svg" },
  { slug: "trino", name: "Trino", icon: "/icons/trino.svg" },
  { slug: "apache-iceberg", name: "Iceberg", icon: "/icons/iceberg.svg" },
  { slug: "apache-spark", name: "Spark", icon: "/icons/spark.svg" },
  { slug: "redis", name: "Redis", icon: "/icons/redis.svg" },
  { slug: "great-expectations", name: "Great Expectations", icon: "/icons/gx.svg" },
  { slug: "dbt", name: "Dbt", icon: "/icons/dbt.svg" },
  { slug: "postgresql", name: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { slug: "duckdb", name: "DuckDB", icon: "/icons/duckdb.svg" },

  // DS/ML Engineering
  { slug: "tensorflow", name: "TensorFlow", icon: "/icons/tensorflow.svg" },
  { slug: "pytorch", name: "PyTorch", icon: "/icons/pytorch.svg" },
  { slug: "weights-and-biases", name: "Weights & Biases", icon: "/icons/wandb.svg" },
  { slug: "kubeflow", name: "Kubeflow", icon: "/icons/kubeflow.svg" },
  { slug: "ray", name: "Ray", icon: "/icons/ray.svg" },
  { slug: "rapidminer", name: "RapidMiner", icon: "/icons/rapidminer.png" },
  { slug: "tableau", name: "Tableau", icon: "/icons/tableu.svg" },
] as const satisfies ReadonlyArray<{
  slug: string;
  name: string;
  icon: string;
}>;

export type Technology = (typeof TECHNOLOGIES)[number];
export type TechnologySlug = Technology["slug"];
