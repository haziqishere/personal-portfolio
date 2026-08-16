import type { ReadingSeed } from "@/lib/readings";

interface BookEnrichment {
  cover: string | null;
  pageCount: number | null;
}

const FALLBACK: BookEnrichment = { cover: null, pageCount: null };

// Covers rarely change once a book has an edition on Google Books — cache for a month.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

export async function fetchBookEnrichment(
  seed: Pick<ReadingSeed, "title" | "author" | "isbn">,
): Promise<BookEnrichment> {
  // ISBN lookups tend to resolve to print/metadata-only editions (no scanned
  // cover — Google serves its generic "image not available" bitmap for
  // those). Title+author search surfaces the actual scanned editions.
  const q = `intitle:${seed.title} inauthor:${seed.author}`;
  // Ask for a few candidates — the top match is sometimes a metadata-only
  // listing with no imageLinks at all, so we need to look past it.
  const params: Record<string, string> = { q, maxResults: "5" };
  // Unauthenticated requests share a small daily quota per calling IP, which
  // gets exhausted fast on shared infra (CI, serverless). A free API key
  // (Google Cloud Console → enable "Books API" → create API key) gets its
  // own project-level quota instead.
  if (process.env.GOOGLE_BOOKS_API_KEY) {
    params.key = process.env.GOOGLE_BOOKS_API_KEY;
  }
  const url = `https://www.googleapis.com/books/v1/volumes?${new URLSearchParams(params)}`;

  try {
    // Google's backend occasionally throws a transient 503 — worth one retry
    // since this result gets cached for a month either way.
    let res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return FALLBACK;

    const data = await res.json();
    type VolumeInfo = {
      title?: string;
      language?: string;
      imageLinks?: { thumbnail?: string; smallThumbnail?: string };
      pageCount?: number;
    };
    const items: Array<{ volumeInfo?: VolumeInfo }> = data?.items ?? [];
    if (items.length === 0) return FALLBACK;

    const hasCover = (vi?: VolumeInfo) => Boolean(vi?.imageLinks?.thumbnail ?? vi?.imageLinks?.smallThumbnail);
    const normalize = (s: string) => s.trim().toLowerCase();
    const seedTitle = normalize(seed.title);
    const isExactTitle = (vi?: VolumeInfo) => Boolean(vi?.title && normalize(vi.title) === seedTitle);

    // `intitle:` only guarantees the words appear somewhere in the title, so
    // companion books ("… Workbook") and foreign editions rank alongside the
    // real one. Prefer, in order: exact-title English cover, any English
    // cover, any-language cover, then just the top match (pageCount only).
    const info =
      items.find((item) => isExactTitle(item.volumeInfo) && item.volumeInfo?.language === "en" && hasCover(item.volumeInfo))
        ?.volumeInfo ??
      items.find((item) => item.volumeInfo?.language === "en" && hasCover(item.volumeInfo))?.volumeInfo ??
      items.find((item) => hasCover(item.volumeInfo))?.volumeInfo ??
      items[0].volumeInfo;
    if (!info) return FALLBACK;

    const rawCover = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail;
    const cover = rawCover ? rawCover.replace(/^http:/, "https:").replace("zoom=1", "zoom=2") : null;

    return { cover, pageCount: info.pageCount ?? null };
  } catch {
    return FALLBACK;
  }
}
