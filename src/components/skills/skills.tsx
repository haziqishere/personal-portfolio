// src/components/skills/skills-grid.tsx
"use client";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  icon: string; // Path to SVG
}

interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
  color: string; // For category accent
}

export function SkillsGrid() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      description: "Primary programming languages",
      color: "from-yellow-500/20 to-orange-500/20",
      skills: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "Java", icon: "/icons/java.svg" },
        { name: "SQL", icon: "/icons/sql.svg" },
      ],
    },
    {
      title: "Platform",
      description: "Data processing and building ETL",
      color: "from-red-500/20 to-yellow-500/20",
      skills: [
        { name: "Terraform", icon: "/icons/terraform.svg" },
        { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
        { name: "DigitalOcean", icon: "/icons/digitalocean.svg" },
        { name: "AWS", icon: "/icons/aws.svg" },
        { name: "GCP", icon: "/icons/gcp.svg" },
        { name: "ArgoCD", icon: "/icons/argocd.svg" },
      ],
    },
    {
      title: "Technology and Tools",
      description: "Development and deployment tools. Iaas and PaaS",
      color: "from-purple-500/20 to-red-500/20",
      skills: [
        { name: "Git", icon: "/icons/git.svg" },
        { name: "GitLab", icon: "/icons/gitlab.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "Linux", icon: "/icons/linux.svg" },
        { name: "Podman", icon: "/icons/podman.svg" },
        { name: "Insomnia", icon: "/icons/insomnia.svg" },
      ],
    },
    {
      title: "Data Engineering",
      description: "Data processing and building ETL",
      color: "from-red-500/20 to-yellow-500/20",
      skills: [
        { name: "Apache Airflow", icon: "/icons/airflow.svg" },
        { name: "Prefect", icon: "/icons/prefect.svg" },
        { name: "Snowflake", icon: "/icons/snowflake.svg" },
        { name: "Apache Kafka", icon: "/icons/kafka.svg" },
        { name: "Trino", icon: "/icons/trino.svg" },
        { name: "Apache Iceberg", icon: "/icons/iceberg.svg" },
        { name: "Apache Spark", icon: "/icons/spark.svg" },
        { name: "Redis", icon: "/icons/redis.svg" },
        { name: "Great Expectations", icon: "/icons/gx.svg" },
        { name: "Dbt", icon: "/icons/dbt.svg" },
        { name: "Postgres", icon: "/icons/postgresql.svg" },
      ],
    },

    {
      title: "DS/ML Engineering",
      description: "Data analysis and machine learning",
      color: "from-green-500/20 to-blue-500/20",
      skills: [
        { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
        { name: "PyTorch", icon: "/icons/pytorch.svg" },
        { name: "Weights & Biases", icon: "/icons/wandb.svg" },
        { name: "Kubeflow", icon: "/icons/kubeflow.svg" },
        { name: "Ray", icon: "/icons/ray.svg" },
        { name: "RapidMiner", icon: "/icons/rapidminer.png" },
        { name: "Tableu", icon: "/icons/tableu.svg" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Top row with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.slice(0, 3).map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-xl p-6 bg-white/5 hover:bg-white/10 
                                         border border-gray-200 hover:border-gray-300 
                                         transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Category Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg
                                                     hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs text-center font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Category Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} 
                                                     opacity-0 group-hover:opacity-100 transition-opacity 
                                                     duration-500 -z-10 rounded-xl`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom row with 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.slice(3).map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx + 3) * 0.1 }}
              className="group relative rounded-xl p-6 bg-white/5 hover:bg-white/10 
                                         border border-gray-200 hover:border-gray-300 
                                         transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Category Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg
                                                     hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs text-center font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Category Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} 
                                                     opacity-0 group-hover:opacity-100 transition-opacity 
                                                     duration-500 -z-10 rounded-xl`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsGrid;
