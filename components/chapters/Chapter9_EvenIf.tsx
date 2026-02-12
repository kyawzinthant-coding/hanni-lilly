"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { useEffect, useMemo, useState } from "react";

function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

const RAIN_COUNT = 25;
const RAIN_SEED = 9999;

function LightRain() {
  const styles = useMemo(() => {
    const rng = seeded(RAIN_SEED);
    return Array.from({ length: RAIN_COUNT }, () => ({
      left: `${rng() * 100}%`,
      height: `${30 + rng() * 50}px`,
      duration: `${1 + rng() * 1.5}s`,
      delay: `${rng() * 2}s`,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-[0.15]"
      aria-hidden
    >
      {styles.map((s, i) => (
        <div
          key={i}
          className="absolute w-px bg-white"
          style={{
            left: s.left,
            height: s.height,
            animation: `rain-fall ${s.duration} linear ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

type LineItem = { text: string; delayMs: number; myanmar?: boolean };

// Plan: 1.5s first line, then pauses 2s, 1.5s, 1s, 1s, 2s, 2s → cumulative: 1.5, 3.5, 5, 6, 7, 9, 11 (ms)
const LINES: LineItem[] = [
  { text: "Things ended.", delayMs: 1500 },
  { text: "But last Friday at 8:30 PM...", delayMs: 3500 },
  { text: "her friend called that .", delayMs: 5000, myanmar: true },
  { text: "Hanni was drunk.", delayMs: 6000 },
  { text: "and he went to pick her up.", delayMs: 7000 },
  { text: "No questions. No conditions.", delayMs: 9000 },
  { text: "He just went.", delayMs: 11000 },
];

export default function Chapter9_EvenIf() {
  const [ref, isInView] = useChapterInView(0.5);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showGoldLine, setShowGoldLine] = useState(false);
  const [showMyanmarBlock, setShowMyanmarBlock] = useState(false);
  const [showEnglishBlock, setShowEnglishBlock] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setVisibleLines(0);
      setShowGoldLine(false);
      setShowMyanmarBlock(false);
      setShowEnglishBlock(false);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), LINES[i].delayMs));
    });
    // After all 7 lines visible (11s), 3s pause then gold line → 14s
    timers.push(setTimeout(() => setShowGoldLine(true), 14000));
    timers.push(setTimeout(() => setShowMyanmarBlock(true), 14500));
    timers.push(setTimeout(() => setShowEnglishBlock(true), 15500));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="chapter relative overflow-hidden bg-[#0D0D0D]"
    >
      <LightRain />

      <div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6"
        style={{ lineHeight: 2 }}
      >
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            className={`text-center text-[22px] italic text-[var(--ivory)] ${
              line.myanmar ? "font-myanmar" : "font-display"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleLines > i ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {line.text}
          </motion.p>
        ))}

        {showGoldLine && (
          <motion.div
            className="h-px bg-[var(--gold)]"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ maxWidth: 200 }}
          />
        )}

        {showEnglishBlock && (
          <motion.div
            className="flex flex-col items-center gap-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[14px] italic text-[var(--ivory)] opacity-60">
              Even if you don&apos;t love me back —
            </p>
            <p className="font-body text-[14px] italic text-[var(--ivory)] opacity-60">
              I still will.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
