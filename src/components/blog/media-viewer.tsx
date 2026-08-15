"use client";

import { cn } from "@/lib/utils";
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
  type?: "image" | "video";
  className?: string;
  width?: number;
  height?: number;
}

export function MediaViewer({
  src,
  alt = "",
  type = "image",
  className,
  width,
  height,
}: MediaViewerProps) {
  const mediaProps = {
    src,
    alt,
    className: cn(
      "w-full h-full object-cover rounded-lg border overflow-hidden aspect-video",
      className
    ),
    ...(width && height ? { width, height } : {}),
  };

  if (type === "video") {
    return (
      <div className="my-6 w-full">
        <div className="relative w-full aspect-video">
          <video {...mediaProps} controls loop>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="relative block w-full aspect-video cursor-zoom-in"
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
    </div>
  );
}

// Helper components for easier MDX usage
export function ImageViewer(props: Omit<MediaViewerProps, "type">) {
  return <MediaViewer {...props} type="image" />;
}

export function VideoViewer(props: Omit<MediaViewerProps, "type">) {
  return <MediaViewer {...props} type="video" />;
}