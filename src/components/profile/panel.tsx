"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTechnologyBySlug } from "@/lib/skills";
import { cn } from "@/lib/utils";
import { DATA } from "../../../public/data/resume";

type Mode = "career" | "education";

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.35 };

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function parseMonthYear(str: string): { year: number; month: number } | null {
  const match = str.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase());
  if (month === -1) return null;
  return { year: Number(match[2]), month };
}

function formatDuration(period: string): string {
  const [startPart, endPart] = period.split(" - ");
  if (!startPart || !endPart) return "";
  const start = parseMonthYear(startPart);
  if (!start) return "";
  const now = new Date();
  const end = /current|present/i.test(endPart)
    ? { year: now.getFullYear(), month: now.getMonth() }
    : parseMonthYear(endPart);
  if (!end) return "";

  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (months <= 0) return "";

  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const parts: string[] = [];
  if (yrs > 0) parts.push(`${yrs}yr${yrs > 1 ? "s" : ""}`);
  if (mos > 0 || yrs === 0) parts.push(`${mos}mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function flattenWork() {
  return DATA.work.flatMap((company) =>
    company.roles.map((role) => ({
      key: `${company.company}-${role.title}`,
      company: company.company,
      logoUrl: company.logoUrl,
      title: role.title,
      period: role.period,
      isCurrent: role.period.toLowerCase().includes("current"),
      skills: role.skills,
      description: role.description,
    })),
  );
}

const socialLinks = Object.entries(DATA.contact.social).filter(
  ([, social]) => social.navbar,
);

export function ProfilePanel() {
  const [mode, setMode] = useState<Mode>("career");
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const workItems = flattenWork();
  const spring = reduceMotion ? { duration: 0 } : SPRING;

  return (
    <div className="mx-auto flex h-full w-full max-w-sm flex-col rounded-3xl border bg-card p-5 shadow-sm">
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

      <div className="relative mt-6 flex rounded-full bg-muted p-1">
        {(["career", "education"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="relative flex-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide active:scale-[0.97]"
          >
            {mode === m && (
              <motion.div
                layoutId="panel-pill"
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={spring}
              />
            )}
            <span
              className={cn(
                "relative z-10",
                mode === m ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {m === "career" ? "Career" : "Education"}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="mt-6 space-y-6"
        >
          {mode === "education" ? (
            <div className="relative space-y-5">
              {DATA.education.length > 1 && (
                <div className="absolute bottom-5 left-[19px] top-5 w-px bg-border" />
              )}
              {DATA.education.map((edu) => (
                <div
                  key={edu.school}
                  className="relative flex items-start gap-3"
                >
                  <Avatar className="relative z-10 size-10 shrink-0 border bg-background">
                    <AvatarImage
                      src={edu.logoUrl}
                      alt={edu.school}
                      className="object-contain"
                    />
                    <AvatarFallback>{edu.school[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{edu.school}</div>
                    <div className="text-sm text-muted-foreground">
                      {edu.degree}
                    </div>
                    <div className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                      {edu.start} - {edu.end}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
                <div className="relative space-y-5">
                  {workItems.length > 1 && (
                    <div className="absolute bottom-5 left-[19px] top-5 w-px bg-border" />
                  )}
                  {workItems.map((item) => {
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
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span className="text-sm font-semibold">
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
                            <div className="text-sm text-muted-foreground">
                              {item.title}
                            </div>
                            <div className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                              {item.period}
                            </div>
                          </div>
                          <div className="shrink-0 text-xs tabular-nums text-muted-foreground">
                            {formatDuration(item.period)}
                          </div>
                        </button>

                        {item.skills.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5 pl-[52px]">
                            {item.skills.map((slug) => {
                              const skill = getTechnologyBySlug(slug);
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
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ProfilePanel;
