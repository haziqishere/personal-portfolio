import BlurFade from "@/components/magicui/blur-fade";
import { ReadingCarousel } from "@/components/readings/reading-carousel";
import { SpineChart } from "@/components/readings/spine-chart";
import { fetchBookEnrichment } from "@/lib/google-books";
import { type EnrichedReading } from "@/lib/readings";
import { READINGS } from "../../../public/data/readings";

const BLUR_FADE_DELAY = 0.04;

// Covers/page counts are cached individually (see google-books.ts); this just
// bounds how stale the whole page's data can get before Next refetches.
export const revalidate = 60 * 60 * 24 * 7;

export default async function ReadingsPage() {
  const enriched: EnrichedReading[] = await Promise.all(
    READINGS.map(async (seed) => ({
      ...seed,
      ...(await fetchBookEnrichment(seed)),
    })),
  );

  const years = Array.from(new Set(enriched.map((b) => b.year))).sort((a, b) => b - a);

  return (
    <main className="flex flex-col gap-12 py-2">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Readings</h1>
          <p className="text-muted-foreground">
            Books I&apos;ve actually finished, tracked by year — the good, the skimmed, the reread.
          </p>
        </div>
      </BlurFade>

      {/* Break out of the layout's max-w-4xl so the carousel/chart get real
          horizontal room, same trick as the projects page hero. */}
      <div className="relative -mx-[50vw] left-1/2 right-1/2 w-screen px-6">
        <div className="mx-auto max-w-6xl space-y-16">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <ReadingCarousel books={enriched} years={years} />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <SpineChart books={enriched} years={years} />
          </BlurFade>
        </div>
      </div>
    </main>
  );
}
