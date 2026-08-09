"use client";
import React, { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  MotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  decoration,
  children,
  // How much extra scroll (beyond 100vh) the card stays pinned for while it
  // un-rotates — e.g. "150vh" gives a 50vh runway. Tune per-instance based
  // on how tall your titleComponent + card combo actually is.
  trackHeight = "150vh",
  // How far the header drifts upward (px) over the scroll — parallax that
  // hints the card is about to take its place. Shrink this if your title
  // has more than one line, so it doesn't drift into the card.
  headerParallax = 100,
  // Card's margin-top (px, can be negative). Negative pulls it up under
  // the header for a tight single-line title; use a small positive value
  // if your titleComponent has a subtitle line that needs breathing room.
  cardOffset = -48,
}: {
  titleComponent: string | React.ReactNode;
  decoration?: React.ReactNode;
  children: React.ReactNode;
  trackHeight?: string;
  headerParallax?: number;
  cardOffset?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Raw scrollYProgress jumps in discrete steps with wheel/trackpad input,
  // which reads as stiff/mechanical. Springing it smooths those steps into
  // fluid motion without changing where the animation starts or ends.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [20, 0],
  );
  const scale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : scaleDimensions(),
  );
  const translate = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -headerParallax],
  );

  // Tall scroll track: the extra height beyond 100vh is how long the card
  // stays pinned center-screen while it un-rotates. The sticky child
  // releases exactly when this track runs out, so "flat" always lands
  // centered in view. Skipped entirely under reduced motion — the card
  // just renders flat, in normal flow, no scroll-jacked dead zone.
  return (
    <div
      ref={containerRef}
      className="relative"
      style={shouldReduceMotion ? undefined : { height: trackHeight }}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center py-10 md:py-20",
          !shouldReduceMotion && "sticky top-0 h-screen",
        )}
        style={shouldReduceMotion ? undefined : { perspective: "1000px" }}
      >
        {!shouldReduceMotion && decoration}
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} offset={cardOffset}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  offset,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  offset: number;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        marginTop: offset,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};
