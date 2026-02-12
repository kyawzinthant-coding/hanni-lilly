"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import HeartbeatLine from "@/components/shared/HeartbeatLine";
import { useEffect, useState } from "react";

// Seeded RNG so server and client render the same rain (avoids hydration mismatch)
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

function CrackSVG() {
  return (
    <svg
      viewBox="0 0 400 600"
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
    >
      <motion.path
        d="M50,0 L120,80 L90,160 L180,250 L140,350 L200,420 L160,500 L220,600"
        fill="none"
        stroke="rgba(26, 37, 53, 0.6)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FacebookStoryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="w-[200px] rounded-xl bg-gradient-to-b from-[var(--cold-blue)] to-[#2a3545] p-4 shadow-xl md:w-[260px] md:p-5"
    >
      {/* Facebook story progress bar */}
      <div className="mb-3 flex gap-0.5">
        <div className="h-0.5 flex-1 rounded-full bg-[#1877F2]/60" />
        <div className="h-0.5 flex-1 rounded-full bg-white/10" />
      </div>
      {/* Facebook header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--petal-pink)]" />
        <div className="flex flex-col gap-0.5">
          <div className="h-2 w-14 rounded-full bg-white/20" />
          <div className="h-1 w-8 rounded-full bg-white/10" />
        </div>
      </div>
      {/* Story text */}
      <p className="font-handwritten text-center text-sm text-[var(--ivory)] opacity-90 md:text-base">
        {"Valentine's Day..."}
      </p>
      <p className="mt-1 text-center font-body text-xs text-[var(--ivory)] opacity-70 md:text-sm">
        {"and I got nothing."}
      </p>
      <div className="mt-2 flex items-center justify-center gap-1">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2]/40">
          <span className="text-[8px] font-bold text-white md:text-[10px]">f</span>
        </div>
        <p className="text-center font-body text-[10px] text-[var(--ivory)] opacity-30 md:text-xs">
          Facebook Story
        </p>
      </div>
    </motion.div>
  );
}

function FlowerBouquet({ scattering }: { scattering: boolean }) {
  const flowers = ["#C8445A", "#F2A7BB", "#e8738a", "#D4A853", "#f5c6d0"];
  return (
    <div className="relative flex items-end justify-center">
      {/* Stem */}
      <motion.div
        className="h-12 w-0.5 bg-green-700/60"
        animate={{ opacity: scattering ? 0 : 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      {/* Petals */}
      {flowers.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 14,
            height: 14,
            background: color,
            bottom: 40 + Math.sin(i * 1.2) * 8,
            left: `calc(50% + ${(i - 2) * 10}px)`,
          }}
          animate={
            scattering
              ? {
                  y: 200 + Math.random() * 100,
                  x: (Math.random() - 0.5) * 120,
                  opacity: 0,
                  filter: "grayscale(1)",
                  rotate: Math.random() * 360,
                }
              : { y: 0, opacity: 1 }
          }
          transition={{ duration: 1.5, delay: i * 0.1 }}
        />
      ))}
      {!scattering && (
        <motion.div
          className="pointer-events-none absolute -inset-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
}

function CalendarCrossout() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, i) => (
        <div key={day} className="relative flex h-6 w-6 items-center justify-center md:h-7 md:w-7">
          <span className="font-body text-[10px] text-[var(--ivory)] opacity-30 md:text-xs">
            {day}
          </span>
          <motion.span
            className="absolute font-body text-xs font-bold text-[var(--rose)] opacity-60 md:text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: i * 0.03 }}
          >
            x
          </motion.span>
        </div>
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
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 2800),
      setTimeout(() => setStep(5), 3200),
      setTimeout(() => setStep(6), 3800),
      setTimeout(() => setStep(7), 5000),
      setTimeout(() => setHeartMode("flatline"), 6000),
      setTimeout(() => setStep(8), 7500),
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

      {step >= 3 && <CrackSVG />}

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6">
        {/* Facebook Story card */}
        {step >= 1 && <FacebookStoryCard />}

        {/* Flower bouquet */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <FlowerBouquet scattering={step >= 4} />
            {step < 4 && (
              <p className="font-handwritten text-base text-[var(--gold)] md:text-lg">
                He sent flowers.
              </p>
            )}
          </motion.div>
        )}

        {/* Failed message */}
        {step >= 5 && (
          <motion.div
            className="flex flex-col items-center gap-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
          >
            <p className="font-body text-sm text-gray-400 md:text-base">
              {"\"I'm sorry, I didn't mean to\u2014\""}
            </p>
            <p className="font-body text-xs text-gray-500 md:text-sm">
              Message failed to deliver
            </p>
            <p className="font-body text-xs text-gray-600 md:text-sm">Not friends</p>
          </motion.div>
        )}

        {/* Calendar */}
        {step >= 6 && (
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CalendarCrossout />
            <p className="font-body text-sm text-[var(--ivory)] opacity-60 md:text-base">
              6 months of silence
            </p>
          </motion.div>
        )}

        {/* Heartbeat → flatline */}
        {step >= 7 && <HeartbeatLine mode={heartMode} color1="var(--rose)" />}

        {/* Final text */}
        {step >= 8 && (
          <motion.div
            className="flex max-w-[340px] flex-col items-center gap-3 text-center md:max-w-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <p className="font-display text-lg italic text-[var(--ivory)] opacity-60 md:text-xl">
              He never stopped.
            </p>
            <p className="font-body text-sm leading-relaxed italic text-[var(--ivory)] opacity-40 md:text-base">
              Even when the messages wouldn{"'"}t send. Even when the silence felt
              like it would swallow him whole. His heart still whispered her name
              every single night.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
