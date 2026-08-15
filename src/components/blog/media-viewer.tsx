"use client";

import { cn } from "@/lib/utils";
import { CopyHeader } from "@/components/blog/copy-header";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MediaViewerProps {
  src: string;
  alt?: string;
  /** Optional caption shown below the media, e.g. an attribution line
   * ("Retrieved and edited from BI Insights Inc"). */
  caption?: string;
  type?: "image" | "video";
  className?: string;
  width?: number;
  height?: number;
}

// A caption starting with "# " or "## " renders as an actual heading
// (same CopyHeader the article body uses) instead of a plain caption line —
// lets a MediaViewer caption double as a section label when that's what's
// needed, e.g. `caption="## Setting Up Local Data Infrastructure"`.
function Caption({ children }: { children: string }) {
  const h2 = children.match(/^##\s+(.*)/);
  if (h2) {
    return (
      <CopyHeader level={2} className="mt-4 text-center text-2xl font-bold md:text-3xl">
        {h2[1]}
      </CopyHeader>
    );
  }

  const h1 = children.match(/^#\s+(.*)/);
  if (h1) {
    return (
      <CopyHeader level={1} className="mt-4 text-center text-3xl font-bold md:text-4xl">
        {h1[1]}
      </CopyHeader>
    );
  }

  return (
    <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
      {children}
    </figcaption>
  );
}

export function MediaViewer({
  src,
  alt = "",
  caption,
  type = "image",
  className,
  width,
  height,
}: MediaViewerProps) {
  const mediaProps = {
    src,
    alt,
    className: cn("w-full h-auto rounded-lg border", className),
    ...(width && height ? { width, height } : {}),
  };

  if (type === "video") {
    return (
      <figure className="my-6 w-full">
        <video {...mediaProps} controls loop>
          Your browser does not support the video tag.
        </video>
        {caption && <Caption>{caption}</Caption>}
      </figure>
    );
  }

  return (
    <figure className="my-6 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="block w-full cursor-zoom-in"
            aria-label={alt ? `Expand image: ${alt}` : "Expand image"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img {...mediaProps} />
          </button>
        </DialogTrigger>
        <DialogContent className="border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{alt || "Expanded image"}</DialogTitle>
          <DialogClose asChild>
            <button type="button" className="cursor-zoom-out" aria-label="Close">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

// Helper components for easier MDX usage
export function ImageViewer(props: Omit<MediaViewerProps, "type">) {
  return <MediaViewer {...props} type="image" />;
}

export function VideoViewer(props: Omit<MediaViewerProps, "type">) {
  return <MediaViewer {...props} type="video" />;
}