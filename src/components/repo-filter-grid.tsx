"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getTechnologyBySlug } from "@/lib/skills";
import type { TechnologySlug } from "../../public/data/technologies";

interface RepoProject {
  title: string;
  href?: string;
  slug?: string;
  description: string;
  dates: string;
  skills: readonly TechnologySlug[];
  image?: string;
  links?: readonly { icon: ReactNode; type: string; href: string }[];
}

interface RepoFilterGridProps {
  projects: readonly RepoProject[];
}

export function RepoFilterGrid({ projects }: RepoFilterGridProps) {
  const [selected, setSelected] = useState<Set<TechnologySlug>>(new Set());

  const techOptions = Array.from(new Set(projects.flatMap((p) => p.skills)))
    .map((slug) => getTechnologyBySlug(slug))
    .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech))
    .sort((a, b) => a.name.localeCompare(b.name));

  const techGroups = techOptions.reduce<Record<string, typeof techOptions>>(
    (groups, tech) => {
      const letter = tech.name[0]!.toUpperCase();
      (groups[letter] ??= []).push(tech);
      return groups;
    },
    {},
  );

  const filtered =
    selected.size === 0
      ? projects
      : projects.filter((project) =>
          Array.from(selected).every((slug) => project.skills.includes(slug)),
        );

  const toggle = (slug: TechnologySlug) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {techOptions.length > 0 && (
        <Menubar className="h-auto w-fit border-none bg-transparent p-0 shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="rounded-full border px-3 py-1.5 text-sm">
              Filter by tech{selected.size > 0 ? ` (${selected.size})` : ""}
            </MenubarTrigger>
            <MenubarContent className="w-[28rem] max-w-[90vw]">
              <div className="columns-2 gap-4">
                {Object.entries(techGroups).map(([letter, techs]) => (
                  <div key={letter} className="break-inside-avoid">
                    <MenubarLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {letter}
                    </MenubarLabel>
                    {techs.map((tech) => (
                      <MenubarCheckboxItem
                        key={tech.slug}
                        checked={selected.has(tech.slug)}
                        onCheckedChange={() => toggle(tech.slug)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-3.5 w-3.5 shrink-0">
                            <Image
                              src={tech.icon}
                              alt=""
                              width={14}
                              height={14}
                              className="h-full w-full object-contain"
                            />
                          </span>
                          {tech.name}
                        </span>
                      </MenubarCheckboxItem>
                    ))}
                  </div>
                ))}
              </div>
              {selected.size > 0 && (
                <>
                  <MenubarSeparator />
                  <MenubarItem onSelect={() => setSelected(new Set())}>
                    Clear filter
                  </MenubarItem>
                </>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, id) => (
            <BlurFade key={project.title} delay={id * 0.05}>
              <ProjectCard
                href={project.href}
                slug={project.slug}
                title={project.title}
                description={project.description}
                dates={project.dates}
                skills={project.skills}
                image={project.image}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No repositories match this filter yet.
        </p>
      )}
    </div>
  );
}
