"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { useEffect, useState } from "react";

function BloomingFlower() {
  const petals = Array.from({ length: 6 });
  return (
    <div className="relative h-16 w-16">
      {/* Center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      {/* Petals unfolding */}
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-5 w-3 -translate-x-1/2 rounded-full bg-[var(--rose)]"
          style={{
            transformOrigin: "center bottom",
            rotate: i * 60,
            filter: "drop-shadow(0 0 4px var(--rose))",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.8 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
        />
      ))}
    </div>
  );
}

function FrayedThread() {
  return (
    <svg viewBox="0 0 280 20" className="mx-auto h-4 w-full max-w-[280px]">
      {/* Frayed line with gaps that heal */}
      <motion.line
        x1="0"
        y1="10"
        x2="70"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.line
        x1="85"
        y1="10"
        x2="130"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.line
        x1="145"
        y1="10"
        x2="200"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      />
      <motion.line
        x1="215"
        y1="10"
        x2="280"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      />
      {/* Healing gaps */}
      <motion.line
        x1="70"
        y1="10"
        x2="85"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      />
      <motion.line
        x1="130"
        y1="10"
        x2="145"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 2.3 }}
      />
      <motion.line
        x1="200"
        y1="10"
        x2="215"
        y2="10"
        stroke="var(--gold)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 3px var(--gold))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 2.6 }}
      />
    </svg>
  );
}

export default function Chapter5_Return() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);
  const [saturation, setSaturation] = useState(0.2);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setSaturation(0.2);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => { setStep(2); setSaturation(0.4); }, 1000),
      setTimeout(() => { setStep(3); setSaturation(0.6); }, 3000),
      setTimeout(() => { setStep(4); setSaturation(0.8); }, 4000),
      setTimeout(() => { setStep(5); setSaturation(1); }, 5000),
      setTimeout(() => setStep(6), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{
        background: step >= 3 ? "var(--burgundy)" : "#0D0D0D",
        transition: "background 2s ease",
      }}
    >
      {/* Breath: brief dark hold when entering chapter (time jump after 6 months) */}
      {isInView && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-[#0D0810]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          aria-hidden
        />
      )}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6"
        style={{
          filter: `saturate(${saturation})`,
          transition: "filter 1s ease",
        }}
      >
        {/* Chapter header */}
        {isInView && (
          <motion.p
            className="absolute top-8 left-1/2 -translate-x-1/2 font-body text-sm tracking-wide text-[var(--gold)] opacity-70 md:top-12 md:text-base"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            After 6 months of silence
          </motion.p>
        )}

        {/* Notification pulse */}
        {step >= 1 && step < 2 && (
          <motion.div
            className="h-3 w-3 rounded-full bg-[var(--gold)]"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              boxShadow: "0 0 12px var(--gold), 0 0 24px var(--gold)",
            }}
          />
        )}

        {/* Her message */}
        {step >= 2 && (
          <motion.div
            className="flex w-full max-w-[300px] justify-start md:max-w-[400px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          >
            <div className="rounded-2xl rounded-bl-none bg-[var(--ivory)] px-4 py-3">
              <span className="font-handwritten text-2xl text-[var(--burgundy)]">
                Hey...
              </span>
            </div>
          </motion.div>
        )}

        {/* His reply */}
        {step >= 3 && (
          <div className="flex w-full max-w-[300px] flex-col items-end gap-2 md:max-w-[400px]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              <div className="rounded-2xl rounded-br-none bg-[var(--rose)] px-4 py-3">
                <span className="font-handwritten text-2xl text-[var(--ivory)]">
                  Hey.
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="rounded-2xl rounded-br-none bg-[var(--rose)] px-3 py-2">
                <span className="text-lg">
                  {"\u263A\uFE0F"}
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Frayed thread healing */}
        {step >= 4 && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FrayedThread />
          </motion.div>
        )}

        {/* Blooming flower */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BloomingFlower />
          </motion.div>
        )}

        {/* Final text */}
        {step >= 6 && (
          <motion.div
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="font-display text-xl italic text-[var(--gold)] md:text-2xl">
              Some things find their way back.
            </p>
            <p className="font-body text-sm text-[var(--ivory)] opacity-80">
              And some people are worth waiting for.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
