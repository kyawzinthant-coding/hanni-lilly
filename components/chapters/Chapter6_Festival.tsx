"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import LanternCanvas from "@/components/shared/LanternCanvas";
import HeartbeatLine from "@/components/shared/HeartbeatLine";
import { useEffect, useState } from "react";

function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

function Moon() {
  return (
    <motion.div
      className="absolute left-1/2 top-8 z-[3] -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <div
        className="h-16 w-16 rounded-full bg-[var(--ivory)]"
        style={{
          filter: "blur(1px)",
          boxShadow:
            "0 0 30px rgba(245, 236, 215, 0.4), 0 0 60px rgba(245, 236, 215, 0.2)",
        }}
      />
    </motion.div>
  );
}

function Silhouettes() {
  return (
    <motion.div
      className="absolute bottom-16 left-1/2 z-[4] flex -translate-x-1/2 items-end gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {/* Him */}
      <svg viewBox="0 0 30 60" className="h-20 w-auto">
        <ellipse cx="15" cy="10" rx="6" ry="7" fill="#1a1a1a" />
        <rect x="10" y="17" width="10" height="25" rx="3" fill="#1a1a1a" />
        <rect x="8" y="42" width="5" height="18" rx="2" fill="#1a1a1a" />
        <rect x="17" y="42" width="5" height="18" rx="2" fill="#1a1a1a" />
      </svg>
      {/* Warm glow between */}
      <div
        className="mb-8 h-6 w-3"
        style={{
          background: "radial-gradient(circle, rgba(212,168,83,0.3) 0%, transparent 70%)",
        }}
      />
      {/* Her */}
      <svg viewBox="0 0 30 55" className="h-[72px] w-auto">
        <ellipse cx="15" cy="9" rx="5.5" ry="6.5" fill="#1a1a1a" />
        <path d="M8,16 Q15,14 22,16 L20,40 Q15,42 10,40 Z" fill="#1a1a1a" />
        <rect x="9" y="38" width="4.5" height="16" rx="2" fill="#1a1a1a" />
        <rect x="16.5" y="38" width="4.5" height="16" rx="2" fill="#1a1a1a" />
      </svg>
    </motion.div>
  );
}

function RedThread() {
  return (
    <svg
      viewBox="0 0 200 30"
      className="absolute bottom-[110px] left-1/2 z-[5] h-6 w-48 -translate-x-1/2"
    >
      <motion.path
        d="M30,15 C60,15 80,8 100,15 C120,22 140,15 170,15"
        fill="none"
        stroke="var(--rose)"
        strokeWidth={1.5}
        filter="drop-shadow(0 0 4px var(--rose))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* Knot */}
      <motion.circle
        cx="100"
        cy="15"
        r="4"
        fill="none"
        stroke="var(--rose)"
        strokeWidth={1}
        filter="drop-shadow(0 0 3px var(--rose))"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </svg>
  );
}

function Starbursts() {
  const positions = useMemo(() => {
    const rng = seeded(67890);
    return Array.from({ length: 6 }, (_, i) => ({
      left: `${20 + rng() * 60}%`,
      top: `${10 + rng() * 50}%`,
      color: i % 2 === 0 ? "var(--gold)" : "var(--rose)",
    }));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: 5.5 + i * 0.3,
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Chapter6_Festival() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 3500),
      setTimeout(() => setStep(5), 4500),
      setTimeout(() => setStep(6), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #0A0A1F 0%, #0A0A1F 60%, #FF9B3E 100%)",
      }}
    >
      {/* Lanterns */}
      <LanternCanvas count={20} active={isInView} />

      {/* Moon */}
      {step >= 1 && <Moon />}

      {/* Silhouettes */}
      {step >= 2 && <Silhouettes />}

      {/* Red thread */}
      {step >= 4 && <RedThread />}

      {/* Starbursts */}
      {step >= 6 && <Starbursts />}

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6">
        {/* Text */}
        {step >= 3 && (
          <motion.div
            className="flex max-w-md flex-col items-center gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-xl italic text-[var(--gold)] sm:text-2xl md:text-3xl">
              That night at the festival...
            </p>
            <motion.p
              className="font-body text-sm leading-relaxed italic text-[var(--ivory)] sm:text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Under a thousand lights, we became one. Hand in hand, just us and
              the glow of the lanterns—no one else in the world.
            </motion.p>
            <motion.p
              className="font-handwritten text-base text-[var(--petal-pink)] sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              We didn&apos;t need words. We had each other.
            </motion.p>
            <motion.p
              className="font-body text-xs italic leading-relaxed text-[var(--ivory)] opacity-80 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              That was the night we knew—we were in this together. Forever.
            </motion.p>
          </motion.div>
        )}

        {/* Syncing heartbeats */}
        {step >= 5 && (
          <motion.div
            className="w-full max-w-[280px] md:max-w-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HeartbeatLine
              mode="syncing"
              color1="var(--rose)"
              color2="var(--gold)"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
