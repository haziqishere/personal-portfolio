"use client";

import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";

// Define the type for a role
interface Role {
  title: string;
  period: string;
  badges?: readonly string[];
  description?: string;
}

// Define the type for work experience
interface WorkExperience {
  company: string;
  href?: string;
  location?: string;
  logoUrl: string;
  start: string;
  end?: string;
  roles: readonly Role[];
}

interface WorkExperienceSectionProps {
  experiences: readonly WorkExperience[];
  blurFadeDelay: number;
}

export function WorkExperienceSection({
  experiences,
  blurFadeDelay,
}: WorkExperienceSectionProps) {
  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      <BlurFade delay={blurFadeDelay}>
        <h2 className="text-xl font-bold">Work Experience</h2>
      </BlurFade>

      {experiences.map((work, id) => (
        <BlurFade
          key={work.company + id}
          delay={blurFadeDelay + (id + 1) * 0.05}
        >
          <ResumeCard
            logoUrl={work.logoUrl}
            altText={work.company}
            title={work.company}
            href={work.href}
            period={`${work.start} - ${work.end ?? "Present"}`}
            roles={work.roles}
          />
        </BlurFade>
      ))}
    </div>
  );
}

export default WorkExperienceSection;
