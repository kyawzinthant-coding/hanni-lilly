"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import HeartbeatLine from "@/components/shared/HeartbeatLine";
import { useEffect, useState } from "react";

function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

const RAIN_COUNT = 40;
const RAIN_SEED = 12345;

function HeavyRain() {
  const styles = useMemo(() => {
    const rng = seeded(RAIN_SEED);
    return Array.from({ length: RAIN_COUNT }, () => ({
      left: `${rng() * 100}%`,
      height: `${40 + rng() * 80}px`,
      duration: `${0.8 + rng() * 1.2}s`,
      delay: `${rng() * 2}s`,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {styles.map((s, i) => (
        <div
          key={i}
          className="absolute w-px bg-white/[0.15]"
          style={{
            left: s.left,
            height: s.height,
            animationName: "rain-fall",
            animationDuration: s.duration,
            animationDelay: s.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Chapter4_Heartbreak() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);
  const [heartMode, setHeartMode] = useState<"beating" | "flatline">("beating");

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setHeartMode("beating");
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setHeartMode("flatline"), 5500),
      setTimeout(() => setStep(4), 6500),
      setTimeout(() => setStep(5), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{ background: "var(--cold-blue)" }}
    >
      <HeavyRain />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Step 1 only: Valentine's Day — her story */}
        {step === 1 && (
          <motion.div
            className="w-full max-w-[260px] rounded-xl bg-gradient-to-b from-[var(--cold-blue)] to-[#2a3545] p-5 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 flex gap-0.5">
              <div className="h-0.5 flex-1 rounded-full bg-[#1877F2]/60" />
              <div className="h-0.5 flex-1 rounded-full bg-white/10" />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--petal-pink)]" />
              <div className="h-2 w-14 rounded-full bg-white/20" />
            </div>
            <p className="font-handwritten text-center text-sm text-[var(--ivory)] md:text-base">
              It is Valendine day and I got nothing 🙄
            </p>
            <p className="mt-2 text-center font-body text-[10px] text-[var(--ivory)] opacity-40">
              Facebook Story
            </p>
          </motion.div>
        )}

        {/* Step 2 only: He sent flowers */}
        {step === 2 && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-end justify-center gap-1">
              {["#C8445A", "#F2A7BB", "#e8738a", "#D4A853"].map((color, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    background: color,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <p className="font-handwritten text-base text-[var(--gold)] md:text-lg">
              He sent flowers.
            </p>
          </motion.div>
        )}

        {/* Step 3 only: She blocked him */}
        {step === 3 && (
          <motion.div
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm text-gray-400 md:text-base">
              She got mad about that
            </p>
            <p className="font-body text-xs text-gray-600 md:text-sm">
              she unfriend him and disconnected
            </p>
          </motion.div>
        )}

        {/* Step 4 only: Heartbeat flatline */}
        {step === 4 && (
          <motion.div
            className="flex w-full justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HeartbeatLine mode={heartMode} color1="var(--rose)" />
          </motion.div>
        )}

        {/* Step 5 only: He never stopped */}
        {step === 5 && (
          <motion.div
            className="flex max-w-[320px] flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-lg italic text-[var(--ivory)] opacity-80 md:text-xl">
              The first story ended there
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
