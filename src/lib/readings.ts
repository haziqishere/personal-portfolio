export interface ReadingSeed {
  title: string;
  author: string;
  /** Year finished reading. */
  year: number;
  /** 1-5, half steps allowed (e.g. 4.5). */
  rating: number;
  isbn?: string;
  is_reading?: boolean;
}

export interface EnrichedReading extends ReadingSeed {
  cover: string | null;
  pageCount: number | null;
}

export function groupByYear(books: EnrichedReading[]): Map<number, EnrichedReading[]> {
  const map = new Map<number, EnrichedReading[]>();
  for (const book of books) {
    const bucket = map.get(book.year);
    if (bucket) {
      bucket.push(book);
    } else {
      map.set(book.year, [book]);
    }
  }
  return map;
}
