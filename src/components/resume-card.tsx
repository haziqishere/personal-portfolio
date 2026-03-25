"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Role {
  title: string;
  period: string;
  description?: string;
  badges?: readonly string[];
}

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  roles?: readonly Role[]; // Changed to readonly Role[]
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  roles,
}: ResumeCardProps) => {
  // Default to showing descriptions
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Only toggle if there's a description to show
    if (description || (roles && roles.length > 0)) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              {/* When we have multiple roles, we don't show the period here */}
              {!roles && (
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  {period}
                </div>
              )}
            </div>
            {subtitle && !roles && <div className="font-sans text-xs">{subtitle}</div>}
          </CardHeader>

          {/* Content area for description or roles */}
          <motion.div
            initial={{ opacity: 1, height: "auto" }} // Start expanded
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="px-6 pb-4"
          >
            {/* Single role case */}
            {description && !roles && (
              <div className="whitespace-pre-line text-xs sm:text-sm">
                {description}
              </div>
            )}

            {/* Multiple roles case */}
            {roles && roles.length > 0 && (
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="border-t pt-2 first:border-t-0 first:pt-0"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-sans text-xs font-semibold">
                        {role.title}
                      </div>
                      <div className="text-xs tabular-nums text-muted-foreground text-right">
                        {role.period}
                      </div>
                    </div>

                    {role.badges && role.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1">
                        {role.badges.map((badge, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="align-middle text-xs"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {role.description && (
                      <div className="whitespace-pre-line text-xs sm:text-sm">
                        {role.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </Card>
    </Link>
  );
};
