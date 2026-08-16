"use client";

import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { groupByYear, type EnrichedReading } from "@/lib/readings";

const MAX_COLUMN_HEIGHT_PX = 260;
const MIN_SPINE_HEIGHT_PX = 22;
// Used only when Google Books can't report a page count, so the bar still renders at a plausible scale.
const DEFAULT_PAGE_COUNT = 320;
// Rough average trade-paperback thickness per page — just enough realism for the fun comparison label.
const CM_PER_PAGE = 0.0083;

const COMPARISONS = [
  { name: "a pencil", emoji: "✏️", cm: 19 },
  { name: "a banana", emoji: "🍌", cm: 20 },
  { name: "a school ruler", emoji: "📏", cm: 30 },
  { name: "a skateboard", emoji: "🛹", cm: 80 },
  { name: "a baseball bat", emoji: "⚾", cm: 86 },
  { name: "a katana", emoji: "🗡️", cm: 100 },
  { name: "a golf club", emoji: "⛳", cm: 114 },
  { name: "a surfboard", emoji: "🏄", cm: 180 },
  { name: "a front door", emoji: "🚪", cm: 200 },
];

function nearestComparison(cm: number) {
  return COMPARISONS.reduce((best, current) =>
    Math.abs(current.cm - cm) < Math.abs(best.cm - cm) ? current : best,
  );
}

// Simple string hash — deterministic so colors/widths stay stable across
// reloads (and don't cause a hydration mismatch, unlike Math.random()).
function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// A believable cover-cloth color, not just a hue sweep: saturation and
// lightness wander too, seeded off title+author so near-identical titles
// (e.g. two O'Reilly books) don't land on the same shade.
function spinePalette(book: Pick<EnrichedReading, "title" | "author">) {
  const h1 = hashString(book.title);
  const h2 = hashString(`${book.author}:${book.title}`);
  const hue = Math.abs(h1) % 360;
  const saturation = 42 + (Math.abs(h2) % 32); // 42-73%
  const lightness = 38 + (Math.abs(h1 >> 8) % 22); // 38-59%
  const jitter = Math.abs(h2 >> 4) % 9; // 0-8, per-book width wobble
  return { hue, saturation, lightness, jitter };
}

// A stacked pile settles wide at the base and tapers up, not a uniform
// column — bias width by position (bottom = index 0) on top of the jitter.
function spineWidthPercent(index: number, count: number, jitter: number) {
  const takenFromTop = count > 1 ? (index / (count - 1)) * 18 : 0; // 0 at bottom .. 18 at top
  return Math.max(70, 100 - takenFromTop - jitter);
}

export function SpineChart({ books, years }: { books: EnrichedReading[]; years: number[] }) {
  const byYear = useMemo(() => groupByYear(books), [books]);

  const columns = years.map((year) => {
    const list = byYear.get(year) ?? [];
    const totalPages = list.reduce((sum, b) => sum + (b.pageCount ?? DEFAULT_PAGE_COUNT), 0);
    return { year, list, totalPages };
  });

  const maxTotalPages = Math.max(...columns.map((c) => c.totalPages), 1);
  const pxPerPage = MAX_COLUMN_HEIGHT_PX / maxTotalPages;

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">The shelf, by year</h2>
        <p className="text-sm text-muted-foreground">
          Every spine stacked to scale — height is page count, not vibes.
        </p>
      </div>

      <div className="flex items-end gap-16 overflow-x-auto pb-4">
        {columns.map(({ year, list, totalPages }) => {
          const comparison = nearestComparison(totalPages * CM_PER_PAGE);

          return (
            <div key={year} className="flex flex-col items-center gap-3">
              <div
                className="flex w-72 flex-col-reverse items-center sm:w-96"
                style={{ height: MAX_COLUMN_HEIGHT_PX }}
              >
                {list.map((book, index) => {
                  const height = Math.max(
                    (book.pageCount ?? DEFAULT_PAGE_COUNT) * pxPerPage,
                    MIN_SPINE_HEIGHT_PX,
                  );
                  const { hue, saturation, lightness, jitter } = spinePalette(book);
                  const widthPercent = spineWidthPercent(index, list.length, jitter);
                  const base = `hsl(${hue} ${saturation}% ${lightness}%)`;
                  const light = lightness > 55;
                  const textColor = light ? "rgba(20,15,10,0.82)" : "rgba(255,255,255,0.92)";
                  const subTextColor = light ? "rgba(20,15,10,0.55)" : "rgba(255,255,255,0.6)";

                  return (
                    <Tooltip key={book.title}>
                      <TooltipTrigger asChild>
                        <div
                          className="relative flex w-full items-center overflow-hidden border-t border-black/15 first:rounded-b-sm first:border-t-0 last:rounded-t-sm"
                          style={{
                            height,
                            width: `${widthPercent}%`,
                            backgroundColor: base,
                            backgroundImage: [
                              // glossy highlight along the top edge, fading out
                              "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 20%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.16) 100%)",
                              // faint cloth-weave texture
                              "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
                            ].join(", "),
                            boxShadow: "inset -3px 0 6px -2px rgba(0,0,0,0.3), inset 3px 0 4px -2px rgba(255,255,255,0.15)",
                          }}
                        >
                          {/* publisher-band accent near the spine head */}
                          <span
                            className="absolute inset-y-0 left-0 w-2"
                            style={{ backgroundColor: "rgba(0,0,0,0.14)" }}
                          />
                          <span className="relative flex min-w-0 flex-col justify-center gap-0.5 pl-5 pr-3">
                            <span
                              className="truncate font-serif text-xs font-semibold tracking-tight"
                              style={{ color: textColor }}
                            >
                              {book.title}
                            </span>
                            {height >= 34 && (
                              <span
                                className="truncate font-serif text-[10px]"
                                style={{ color: subTextColor }}
                              >
                                {book.author}
                              </span>
                            )}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-primary-foreground/70">
                          {book.author} · {book.pageCount ?? `~${DEFAULT_PAGE_COUNT}`} pages
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
              <div className="h-1.5 w-72 rounded-full bg-foreground/10 sm:w-96" />

              <div className="space-y-0.5 text-center">
                <p className="text-sm font-bold">{year}</p>
                <p className="text-xs text-muted-foreground">
                  {list.length} {list.length === 1 ? "book" : "books"} · {totalPages.toLocaleString()} pages
                </p>
                <p className="text-xs text-muted-foreground">
                  {comparison.emoji} tall as {comparison.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
