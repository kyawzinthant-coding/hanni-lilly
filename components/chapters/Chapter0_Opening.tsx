"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import PetalCanvas from "@/components/shared/PetalCanvas";
import { useEffect, useState } from "react";

interface Chapter0Props {
  onBegin: () => void;
  nameFrom?: string;
  nameTo?: string;
  currentChapter?: number;
}

function HeartSVG() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="mx-auto h-8 w-8 pulse-glow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <motion.path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="var(--rose)"
        strokeWidth={1.5}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function OrnamentSVG() {
  return (
    <motion.svg
      viewBox="0 0 120 20"
      className="mx-auto h-5 w-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0 }}
    >
      <motion.line
        x1="20"
        y1="10"
        x2="50"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.circle
        cx="60"
        cy="10"
        r="3"
        fill="var(--gold)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.line
        x1="70"
        y1="10"
        x2="100"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
    </motion.svg>
  );
}

export default function Chapter0_Opening({
  onBegin,
  nameFrom = "Hanni",
  nameTo = "Lilly",
  currentChapter = 0,
}: Chapter0Props) {
  const [ref, isInView] = useChapterInView(0.5);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const title = `${nameFrom} & ${nameTo}`;

  useEffect(() => {
    if (currentChapter !== 0) setScrollHintVisible(false);
  }, [currentChapter]);

  useEffect(() => {
    if (currentChapter !== 0) return;
    const t = setTimeout(() => setScrollHintVisible(false), 3000);
    return () => clearTimeout(t);
  }, [currentChapter]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(200,68,90,0.12) 0%, var(--burgundy) 50%, #0D0810 100%)",
      }}
    >
      <PetalCanvas count={14} speed="slow" active={isInView} />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <OrnamentSVG />

        <motion.h1
          className="font-display text-[32px] font-semibold italic tracking-[0.15em] text-[var(--ivory)] sm:text-[38px] md:text-[52px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="font-handwritten text-lg text-[var(--gold)] sm:text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Our 2 Years of Moments
        </motion.p>

        <motion.p
          className="font-body text-xs uppercase tracking-[0.2em] text-[var(--petal-pink)] opacity-80 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
        >
          A Valentine&apos;s Day Love Story
        </motion.p>

        <motion.div
          className="h-px bg-[var(--gold)]"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />

        <motion.p
          className="font-body text-[13px] text-[var(--ivory)] opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.4 }}
        >
          February 14 · Valentine&apos;s Day
        </motion.p>

        <HeartSVG />

        <motion.button
          onClick={onBegin}
          className="mt-4 rounded-full border border-[var(--gold)] bg-transparent px-8 py-3.5 font-body text-sm text-[var(--ivory)] transition-colors duration-300 hover:bg-[var(--rose)] hover:text-[var(--ivory)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          aria-label="Begin our story"
        >
          {"Begin Our Story \u2192"}
        </motion.button>

        {scrollHintVisible && currentChapter === 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--ivory)] opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <span className="font-body text-xs">Scroll to continue</span>
            <ChevronDown className="h-4 w-4 bounce-gentle" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
