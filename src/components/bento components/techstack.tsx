import { motion } from "framer-motion";

const TechStackGrid = () => {
  const technologies = [
    { name: "React", placeholder: "/tech/react.svg" },
    { name: "Python", placeholder: "/tech/python.svg" },
    { name: "TypeScript", placeholder: "/tech/typescript.svg" },
    { name: "Snowflake", placeholder: "/tech/snowflake.svg" },
    { name: "Docker", placeholder: "/tech/docker.svg" },
    { name: "dbt", placeholder: "/tech/dbt.svg" },
    { name: "Airflow", placeholder: "/tech/airflow.svg" },
    { name: "Terraform", placeholder: "/tech/terraform.svg" },
  ];

  // TODO: Replace placeholder with actual SVG and make
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
        >
          <div className="w-12 h-12 relative flex items-center justify-center">
            {/* Placeholder for SVG - you can replace with actual SVG later */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
            <span className="text-xs">{tech.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechStackGrid;
