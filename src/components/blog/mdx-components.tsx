import type { MDXComponents } from "mdx/types";
import React from "react";
import {
  MediaViewer,
  ImageViewer,
  VideoViewer,
} from "@/components/blog/media-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyHeader } from "@/components/blog/copy-header";
import { globalComponents } from "@/components/mdx";

const createHeading = (level: number) => {
  const Heading = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return <CopyHeader level={level} {...props}>{children}</CopyHeader>;
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
};


export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...globalComponents,
    MediaViewer,
    ImageViewer,
    VideoViewer,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;