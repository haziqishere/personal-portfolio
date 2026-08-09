"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DATA } from "../../public/data/resume";

const NAV_LINKS = [
  { label: "About", href: "/" },
  { label: "Accolades", href: "/accolades" },
  { label: "Projects", href: "/projects" },
  { label: "Readings", href: "/readings" },
  { label: "Contact", href: "/#contact" },
];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur transition-colors duration-200",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Avatar className="size-7 border">
            <AvatarImage src={DATA.avatarUrl} alt={DATA.name} className="object-cover" />
            <AvatarFallback>{DATA.initials[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold">{DATA.name.split(" ")[0]}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default SiteNavbar;
