"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { BookCard } from "@/components/readings/book-card";
import type { EnrichedReading } from "@/lib/readings";

export function ReadingCarousel({
  books,
  years,
}: {
  books: EnrichedReading[];
  years: number[];
}) {
  const [activeYear, setActiveYear] = useState<number | null>(years[0] ?? null);
  // Stable plugin instance — a fresh array/instance every render would make
  // Embla tear down and re-init the wheel listener on every keystroke/state
  // change elsewhere on the page.
  const [plugins] = useState(() => [WheelGesturesPlugin()]);

  const counts = useMemo(() => {
    const map = new Map<number, number>();
    for (const book of books) {
      map.set(book.year, (map.get(book.year) ?? 0) + 1);
    }
    return map;
  }, [books]);

  const filtered = activeYear === null ? books : books.filter((b) => b.year === activeYear);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <YearTab
          label="All"
          count={books.length}
          active={activeYear === null}
          onClick={() => setActiveYear(null)}
        />
        {years.map((year) => (
          <YearTab
            key={year}
            label={String(year)}
            count={counts.get(year) ?? 0}
            active={activeYear === year}
            onClick={() => setActiveYear(year)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Carousel opts={{ align: "start" }} plugins={plugins} className="relative">
            <div className="mb-3 hidden justify-end gap-2 sm:flex">
              <CarouselPrevious className="static h-8 w-8 translate-y-0 rounded-full" />
              <CarouselNext className="static h-8 w-8 translate-y-0 rounded-full" />
            </div>
            <CarouselContent viewportClassName="pt-4 pr-4 -mt-4 -mr-4">
              {filtered.map((book) => (
                <CarouselItem
                  key={`${book.title}-${book.year}`}
                  className="basis-full md:basis-2/3 lg:basis-1/2 xl:basis-2/5"
                >
                  <BookCard book={book} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function YearTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {label}
      <Badge
        variant="secondary"
        className={cn(
          "h-5 min-w-5 justify-center rounded-full px-1 text-[10px]",
          active && "bg-background/20 text-inherit hover:bg-background/20",
        )}
      >
        {count}
      </Badge>
    </button>
  );
}
