"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import type { EnrichedReading } from "@/lib/readings";

export function BookCard({ book }: { book: EnrichedReading }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Critically damped by default (apple-design: overshoot only belongs on
  // gestures that carry momentum — a hover tilt should settle cleanly).
  const spring = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), spring);
  const translateZ = useSpring(useTransform(x, [-0.5, 0, 0.5], [0, 24, 0]), spring);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="flex h-full flex-col">
      <div
        style={{ perspective: 800 }}
        className="relative aspect-square w-full rounded-2xl bg-muted/40 p-8 sm:p-10"
      >
        {book.is_reading && <CurrentlyReadingBadge />}

        <motion.div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ rotateX, rotateY, translateZ, transformStyle: "preserve-3d" }}
          className="mx-auto flex h-full items-center justify-center"
        >
          <div className="relative aspect-[2/3] h-full">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 40vw, 65vw"
                className="rounded-md object-cover shadow-[0_24px_40px_-16px_rgba(0,0,0,0.55)]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-muted to-muted/50 p-3 text-center text-xs font-medium text-muted-foreground shadow-[0_24px_40px_-16px_rgba(0,0,0,0.55)]">
                {book.title}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mt-3 space-y-1 text-center sm:mt-4">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{book.title}</p>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <StarRating rating={book.rating} />
      </div>
    </div>
  );
}

// Scalloped-edge "wax seal" sticker: a 12-point alternating-radius polygon
// (computed on a 100x100 box) stands in for a proper SVG blob — cheap, no
// asset, and small enough at badge size that the facets read as scallops.
const SCALLOP_CLIP =
  "[clip-path:polygon(96%_50%,81.18%_68%,73%_89.84%,50%_86%,27%_89.84%,18.82%_68%,4%_50%,18.82%_32%,27%_10.16%,50%_14%,73%_10.16%,81.18%_32%)]";

function CurrentlyReadingBadge() {
  return (
    <div
      className={`absolute -right-3 -top-3 z-20 flex h-20 w-20 rotate-12 items-center justify-center bg-[#B8A4FF] text-center text-[#4A3B7A] ${SCALLOP_CLIP}`}
    >
      <span className="text-[10px] font-semibold italic leading-tight tracking-wide">
        currently
        <br />
        reading
      </span>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1) * 100;
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="absolute inset-0 h-3.5 w-3.5 text-muted-foreground/30" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
