"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSkillBySlug } from "@/lib/skills";
import { DATA } from "../../../public/data/resume";

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.35 };

function flattenWork() {
  return DATA.work.flatMap((company) =>
    company.roles.map((role) => ({
      key: `${company.company}-${role.title}`,
      company: company.company,
      logoUrl: company.logoUrl,
      title: role.title,
      period: role.period,
      isCurrent: role.period.toLowerCase().includes("current"),
      employmentType: role.employmentType,
      skills: role.skills,
      description: role.description,
    })),
  );
}

function groupByEmploymentType(items: ReturnType<typeof flattenWork>) {
  const order: string[] = [];
  const groups = new Map<string, typeof items>();
  for (const item of items) {
    if (!groups.has(item.employmentType)) order.push(item.employmentType);
    const list = groups.get(item.employmentType) ?? [];
    list.push(item);
    groups.set(item.employmentType, list);
  }
  return order.map((type) => [type, groups.get(type)!] as const);
}

const socialLinks = Object.entries(DATA.contact.social).filter(
  ([, social]) => social.navbar,
);

export function ProfilePanel() {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const workGroups = groupByEmploymentType(flattenWork());
  const spring = reduceMotion ? { duration: 0 } : SPRING;

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border bg-card p-5 shadow-sm">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={DATA.avatarUrl}
          alt={DATA.name}
          fill
          sizes="384px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-semibold leading-tight">{DATA.name}</h1>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {DATA.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {socialLinks.map(([name, social]) => (
          <a
            key={name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-transform hover:text-foreground active:scale-[0.97]"
          >
            <social.icon className="size-4" />
            <span className="sr-only">{social.name}</span>
          </a>
        ))}
        <a
          href={`mailto:${DATA.contact.email}`}
          className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-transform hover:text-foreground active:scale-[0.97]"
        >
          <DATA.contact.social.email.icon className="size-4" />
          <span className="sr-only">Email</span>
        </a>
      </div>

      <div className="mt-6 space-y-6">
        {workGroups.map(([employmentType, items]) => (
              <div key={employmentType}>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {employmentType}
                </p>
                <div className="relative space-y-5">
                  {items.length > 1 && (
                    <div className="absolute bottom-5 left-[19px] top-5 w-px bg-border" />
                  )}
                  {items.map((item) => {
                    const expanded = expandedKey === item.key;
                    return (
                      <div key={item.key} className="relative">
                        <button
                          onClick={() =>
                            setExpandedKey(expanded ? null : item.key)
                          }
                          className="flex w-full items-start gap-3 text-left active:scale-[0.99]"
                        >
                          <Avatar className="relative z-10 size-10 shrink-0 border bg-background">
                            <AvatarImage
                              src={item.logoUrl}
                              alt={item.company}
                              className="object-contain"
                            />
                            <AvatarFallback>{item.company[0]}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold">
                                {item.company}
                              </span>
                              {item.isCurrent && (
                                <Badge
                                  variant="secondary"
                                  className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                >
                                  Current
                                </Badge>
                              )}
                            </div>
                            <div className="truncate text-sm text-muted-foreground">
                              {item.title}
                            </div>
                          </div>
                          <div className="shrink-0 text-xs tabular-nums text-muted-foreground">
                            {item.period}
                          </div>
                        </button>

                        {item.skills.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5 pl-[52px]">
                            {item.skills.map((slug) => {
                              const skill = getSkillBySlug(slug);
                              if (!skill) return null;
                              return (
                                <Tooltip key={slug}>
                                  <TooltipTrigger asChild>
                                    <img
                                      src={skill.icon}
                                      alt={skill.name}
                                      className="size-4 object-contain"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>{skill.name}</TooltipContent>
                                </Tooltip>
                              );
                            })}
                          </div>
                        )}

                        <motion.div
                          initial={false}
                          animate={{
                            height: expanded ? "auto" : 0,
                            opacity: expanded ? 1 : 0,
                          }}
                          transition={spring}
                          className="overflow-hidden pl-[52px]"
                        >
                          <p className="mt-2 whitespace-pre-line text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ProfilePanel;
