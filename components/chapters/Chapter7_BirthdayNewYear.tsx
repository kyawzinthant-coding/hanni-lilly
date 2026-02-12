"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import PhotoFrame from "@/components/shared/PhotoFrame";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

function FireworkBursts() {
  const positions = useMemo(() => {
    const rng = seeded(7777);
    const colors = ["var(--gold)", "var(--rose)", "var(--ivory)"];
    return Array.from({ length: 6 }, (_, i) => ({
      left: `${15 + rng() * 70}%`,
      top: `${10 + rng() * 60}%`,
      color: colors[i % 3],
      delay: rng() * 0.4,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            background: p.color,
            boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 4, 2],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            delay: p.delay,
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Chapter7_BirthdayNewYear() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const confettiFiredRef = useRef(false);

  const fireConfetti = useCallback(async () => {
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;
    try {
      const confetti = (await import("canvas-confetti")).default;
      const colors = ["#D4A853", "#C8445A", "#F5ECD7"];
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors,
        gravity: 0.6,
        ticks: 150,
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setShowCountdown(false);
      confettiFiredRef.current = false;
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 2500),
      setTimeout(() => {
        setShowCountdown(true);
        setStep(4);
      }, 3500),
      setTimeout(() => {
        setShowCountdown(false);
        fireConfetti();
        setStep(5);
      }, 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView, fireConfetti]);

  return (
    <section
      ref={ref}
      className="chapter vignette relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #1A0810 0%, #2A1A05 50%, #1A0810 100%)",
      }}
    >
      {step >= 1 && <FireworkBursts />}

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6">
        {step >= 1 && (
          <motion.p
            className="font-body text-[13px] text-[var(--gold)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            December 31, 2025 — Burma Bistro
          </motion.p>
        )}

        {step >= 2 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PhotoFrame
              src="/images/her-birthday.png"
              caption="Her birthday 🎂"
              rotation={-3}
              delay={0}
            />
            <PhotoFrame
              src="/images/her-birthday-story.png"
              caption="He kept her story. As always."
              rotation={1}
              delay={0.25}
            />
            <PhotoFrame
              src="/images/holding-hand.png"
              caption="31.12.2025 — 🤍"
              rotation={-2}
              delay={0.5}
            />
          </div>
        )}

        {step >= 3 && (
          <motion.div
            className="flex max-w-sm flex-col items-center gap-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-2xl italic text-[var(--gold)] md:text-[26px]">
              The last night of the year.
            </p>
            <p className="font-body text-[15px] text-[var(--ivory)]">
              And the first seconds of the next — he kissed her.
            </p>
          </motion.div>
        )}

        {showCountdown && (
          <motion.p
            className="font-display text-2xl tracking-[0.2em] text-[var(--gold)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            00:00:00
          </motion.p>
        )}

        {step >= 5 && (
          <motion.div
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-3xl text-[var(--ivory)] md:text-[32px]">
              Happy Birthday, Lilly.
            </p>
            <p className="font-myanmar font-handwritten text-lg text-[var(--petal-pink)]">
              ချစ်ရပါသောလေး 🌸
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
