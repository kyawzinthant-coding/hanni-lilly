"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import PetalCanvas from "@/components/shared/PetalCanvas";
import PhotoFrame from "@/components/shared/PhotoFrame";
import { useCallback, useEffect, useRef, useState } from "react";

function vibrateLight() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(10);
  }
}

function EnvelopeLetter({
  opened,
  onOpen,
  showTapHint,
}: {
  opened: boolean;
  onOpen?: () => void;
  showTapHint?: boolean;
}) {
  const lines: { text: string; myanmar?: boolean }[] = [
    { text: "I saw you on April 14, 2023." },
    { text: "" },
    { text: "ချစ်ရပါသောလေး —", myanmar: true },
    { text: "" },
    { text: "Happy Valentine's Day." },
  ];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      {showTapHint && !opened && (
        <motion.p
          className="absolute -top-8 left-2 -translate-x-1/ whitespace-nowrap font-body text-md text-[var(--gold)] opacity-60 md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          Tap to open
        </motion.p>
      )}
      <div
        role={onOpen && !opened ? "button" : undefined}
        tabIndex={onOpen && !opened ? 0 : undefined}
        onClick={onOpen && !opened ? onOpen : undefined}
        onKeyDown={
          onOpen && !opened
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen();
                }
              }
            : undefined
        }
        className="relative h-[180px] w-[240px] overflow-hidden rounded-lg shadow-2xl md:h-[220px] md:w-[300px]"
        style={{
          background: "var(--ivory)",
          boxShadow:
            "0 10px 40px rgba(200,68,90,0.2), 0 4px 16px rgba(0,0,0,0.3)",
          cursor: onOpen && !opened ? "pointer" : undefined,
        }}
        aria-label={onOpen && !opened ? "Open letter" : undefined}
      >
        <motion.div
          className="absolute -top-2 left-[105px] z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full md:h-10 md:w-10"
          style={{
            background: "var(--rose)",
            boxShadow: "0 2px 8px rgba(200,68,90,0.5)",
          }}
          animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 md:h-5 md:w-5"
            fill="var(--ivory)"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute -top-[1px] left-0 z-10 w-full origin-top"
          style={{
            height: 60,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(135deg, #e6d5b8 0%, #d4c4a5 100%)",
            transformStyle: "preserve-3d",
          }}
          animate={
            opened ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }
          }
          transition={{ duration: 0.8 }}
        />

        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 p-4 md:gap-1 md:p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {lines.map((line, i) =>
                line.text === "" ? (
                  <div key={i} className="h-2" />
                ) : (
                  <motion.p
                    key={i}
                    className={`text-center font-handwritten text-[22px] text-[var(--burgundy)] md:text-[22px] ${
                      line.myanmar ? "font-myanmar" : ""
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.5 }}
                  >
                    {line.text}
                  </motion.p>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function NamesAndHeart() {
  return (
    <motion.div
      className="flex items-center gap-2 md:gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.span
        className="font-display text-3xl italic text-[var(--ivory)] sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        Hanni
      </motion.span>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-7 md:w-7">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--rose)"
            style={{
              animation: "heartbeat 1.5s ease-in-out infinite",
              filter: "drop-shadow(0 0 8px var(--rose))",
            }}
          />
        </svg>
      </motion.div>
      <motion.span
        className="font-display text-3xl italic text-[var(--ivory)] sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        Lilly
      </motion.span>
    </motion.div>
  );
}

export default function Chapter10_ForYouAlways({
  onReplay,
}: {
  onReplay: () => void;
}) {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const confettiFiredRef = useRef(false);

  const openEnvelope = useCallback(() => {
    vibrateLight();
    setEnvelopeOpened(true);
  }, []);

  const fireConfetti = useCallback(async () => {
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;
    vibrateLight();
    try {
      const confetti = (await import("canvas-confetti")).default;
      const colors = ["#C8445A", "#D4A853", "#F2A7BB", "#F5ECD7"];
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors,
        gravity: 0.5,
        ticks: 300,
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setEnvelopeOpened(false);
      confettiFiredRef.current = false;
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 5500),
      setTimeout(() => {
        setStep(4);
        fireConfetti();
      }, 6500),
      setTimeout(() => setStep(5), 8000),
      setTimeout(() => setStep(6), 9500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView, fireConfetti]);

  useEffect(() => {
    if (!isInView || step < 2 || envelopeOpened) return;
    const t = setTimeout(() => setEnvelopeOpened(true), 8000);
    return () => clearTimeout(t);
  }, [isInView, step, envelopeOpened]);

  return (
    <section
      ref={ref}
      className="chapter relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #C8445A 0%, #D4A853 100%)",
      }}
    >
      <PetalCanvas
        count={55}
        colors={["#C8445A", "#F2A7BB", "#D4A853", "#F5ECD7"]}
        speed="slow"
        active={isInView}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(26,8,16,0.6) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 overflow-y-auto px-6 py-8 md:gap-6">
        {step >= 2 && (
          <EnvelopeLetter
            opened={envelopeOpened}
            onOpen={openEnvelope}
            showTapHint={step >= 2 && !envelopeOpened}
          />
        )}

        {step >= 3 && <NamesAndHeart />}

        {step >= 4 && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <PhotoFrame
              src="/images/first-date-2.png"
              caption="The beginning 🌸"
              rotation={-2}
              delay={0}
            />
            <PhotoFrame
              src="/images/becomes-together.png"
              caption="October 6, 2025"
              rotation={0}
              delay={0.15}
            />
            <PhotoFrame
              src="/images/holding-hand.png"
              caption="Always. 🤍"
              rotation={2}
              delay={0.3}
            />
          </motion.div>
        )}

        {step >= 5 && (
          <motion.p
            className="text-center font-body text-[12px] tracking-widest text-[var(--ivory)] opacity-50 md:text-[12px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HanniNLilly — February 14, 2026
          </motion.p>
        )}

        {step >= 6 && (
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={onReplay}
              className="rounded-full border border-[var(--gold)] bg-transparent px-6 py-2.5 font-body text-sm text-[var(--ivory)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--rose)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)] md:px-8 md:py-3 md:text-base"
              aria-label="Replay our story"
            >
              Replay Our Story ↺
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
