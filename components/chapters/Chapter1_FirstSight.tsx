"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function SparkleParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[var(--gold)]"
          style={{
            left: `${40 + Math.cos((i / 5) * Math.PI * 2) * 22}%`,
            top: `${25 + Math.sin((i / 5) * Math.PI * 2) * 12}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.6, 1, 0],
            scale: [0, 1.2, 0.8, 1, 0],
          }}
          transition={{
            delay: 1.6 + i * 0.2,
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}
    </div>
  );
}

export default function Chapter1_FirstSight() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1400),
      setTimeout(() => setStep(4), 1800),
      setTimeout(() => setStep(5), 2600),
      setTimeout(() => setStep(6), 4200),
      setTimeout(() => setStep(7), 5800),
      setTimeout(() => setStep(8), 7200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{ background: "#2C1810" }}
    >
      {/* Stronger grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      {/* Spotlight */}
      {step >= 3 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "radial-gradient(circle at 50% 25%, rgba(212, 168, 83, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 35%, transparent 30%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      )}

      <SparkleParticles />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Polaroid */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="mb-6"
          >
            <div className="bg-[var(--ivory)] p-2 pb-10 shadow-xl" style={{ width: 150 }}>
              <div
                className="h-[110px] w-full"
                style={{
                  background:
                    "linear-gradient(135deg, #C8445A 0%, #D4A853 100%)",
                  filter: "sepia(0.3)",
                }}
              />
              <p className="mt-2 text-center font-handwritten text-xs text-[var(--burgundy)]">
                {"2022 \u2014 The Very First Moment"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Romantic story text - staggered reveal */}
        <div className="flex max-w-[320px] flex-col items-center gap-4 text-center md:max-w-[480px]">
          {step >= 5 && (
            <motion.p
              className="font-handwritten text-[21px] leading-relaxed text-[var(--gold)] md:text-[28px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              I saw you. And the room went quiet.
            </motion.p>
          )}

          {step >= 6 && (
            <motion.p
              className="font-body text-sm leading-relaxed italic text-[var(--ivory)] opacity-75 md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Everything around me blurred{"\u2014"}the noise, the people, the
              world outside. There was only you.
            </motion.p>
          )}

          {step >= 7 && (
            <motion.p
              className="font-handwritten text-[20px] leading-relaxed text-[var(--petal-pink)] md:text-[26px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              I didn{"'"}t know your name yet.
              But my heart already knew you.
            </motion.p>
          )}
        </div>

        {/* Heart stroke */}
        {step >= 7 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="mx-auto h-7 w-7">
              <motion.path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="var(--rose)"
                strokeWidth={1.5}
                fill="none"
                filter="drop-shadow(0 0 6px var(--rose))"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        )}

        {/* Scroll indicator */}
        {step >= 8 && (
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-[11px] tracking-widest text-[var(--ivory)]">
              scroll
            </span>
            <ChevronDown className="h-4 w-4 text-[var(--ivory)]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
