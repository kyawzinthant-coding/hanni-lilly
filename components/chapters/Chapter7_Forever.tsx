"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import PetalCanvas from "@/components/shared/PetalCanvas";
import { useEffect, useState, useCallback } from "react";

function vibrateLight() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(10);
  }
}

/* ── Floating hearts that rise endlessly ── */
function FloatingHearts({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${8 + Math.random() * 84}%`, bottom: -20 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -800],
            opacity: [0, 0.6, 0.4, 0],
            x: [0, (Math.random() - 0.5) * 60],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 md:h-4 md:w-4"
            fill={i % 3 === 0 ? "var(--gold)" : "var(--rose)"}
            style={{
              filter: `drop-shadow(0 0 4px ${i % 3 === 0 ? "var(--gold)" : "var(--rose)"})`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Warm glowing ring behind the names ── */
function GlowRing() {
  return (
    <motion.div
      className="absolute z-0 h-48 w-48 rounded-full md:h-64 md:w-64"
      style={{
        background:
          "radial-gradient(circle, rgba(200,68,90,0.2) 0%, rgba(212,168,83,0.1) 40%, transparent 70%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [1, 1.08, 1], opacity: 1 }}
      transition={{
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 1.5 },
      }}
    />
  );
}

/* ── Envelope that opens to reveal letter ── */
function EnvelopeLetter({
  opened,
  onOpen,
  showTapHint,
}: {
  opened: boolean;
  onOpen?: () => void;
  showTapHint?: boolean;
}) {
  const lines = [
    "I saw you and everything changed.",
    "",
    "I would do it all again.",
    "",
    "Every single day. Forever.",
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
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs text-[var(--gold)] opacity-60 md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          Tap to open
        </motion.p>
      )}
      {/* Envelope body */}
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
        {/* Wax seal */}
        <motion.div
          className="absolute -top-2 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full md:h-10 md:w-10"
          style={{
            background: "var(--rose)",
            boxShadow: "0 2px 8px rgba(200,68,90,0.5)",
          }}
          animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="var(--ivory)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Flap */}
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

        {/* Letter content */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 p-4 md:gap-1 md:p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {lines.map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-2" />
                ) : (
                  <motion.p
                    key={i}
                    className="text-center font-handwritten text-[12px] text-[var(--burgundy)] md:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.5 }}
                  >
                    {line}
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

/* ── Two names meeting with a beating heart ── */
function NamesAndHeart({
  nameFrom = "Hanni",
  nameTo = "Lilly",
  onHeartClick,
}: {
  nameFrom?: string;
  nameTo?: string;
  onHeartClick?: () => void;
}) {
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
        {nameFrom}
      </motion.span>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      >
        {onHeartClick ? (
          <motion.button
            type="button"
            onClick={onHeartClick}
            aria-label="Celebrate"
            className="focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)] rounded-full p-1 -m-1"
            whileTap={{ scale: 0.9 }}
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
          </motion.button>
        ) : (
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
        )}
      </motion.div>

      <motion.span
        className="font-display text-3xl italic text-[var(--ivory)] sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        {nameTo}
      </motion.span>
    </motion.div>
  );
}

export default function Chapter7_Forever({
  onReplay,
  nameFrom = "Hanni",
  nameTo = "Lilly",
}: {
  onReplay: () => void;
  nameFrom?: string;
  nameTo?: string;
}) {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [heartConfettiUsed, setHeartConfettiUsed] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const openEnvelope = useCallback(() => {
    vibrateLight();
    setEnvelopeOpened(true);
  }, []);

  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      const colors = ["#C8445A", "#D4A853", "#F2A7BB", "#F5ECD7"];

      const fire = (opts: object) =>
        confetti({
          ...opts,
          colors,
          particleCount: 40,
          spread: 70,
          startVelocity: 35,
          gravity: 0.7,
          ticks: 200,
        });

      fire({ angle: 60, origin: { x: 0, y: 0.65 } });
      setTimeout(() => fire({ angle: 120, origin: { x: 1, y: 0.65 } }), 250);
      setTimeout(() => fire({ angle: 80, origin: { x: 0.3, y: 0.75 } }), 500);
      setTimeout(() => fire({ angle: 100, origin: { x: 0.7, y: 0.75 } }), 700);
      setTimeout(
        () => {
          confetti({
            particleCount: 60,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors,
            gravity: 0.5,
            ticks: 300,
          });
          vibrateLight();
        },
        1000
      );
    } catch {
      // canvas-confetti not available
    }
  }, []);

  const fireHeartConfetti = useCallback(async () => {
    if (heartConfettiUsed) return;
    setHeartConfettiUsed(true);
    vibrateLight();
    try {
      const confetti = (await import("canvas-confetti")).default;
      const colors = ["#C8445A", "#D4A853", "#F2A7BB", "#F5ECD7"];
      confetti({
        particleCount: 30,
        spread: 80,
        origin: { x: 0.5, y: 0.5 },
        colors,
        gravity: 0.5,
        ticks: 200,
      });
    } catch {
      // canvas-confetti not available
    }
  }, [heartConfettiUsed]);

  const handleShare = useCallback(async () => {
    const title = `${nameFrom} & ${nameTo}`;
    const text = "A love story. 3 years of us.";
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      const toCopy = `${text}\n${url}`;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(toCopy);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    } catch {
      // Share cancelled or failed
    }
  }, [nameFrom, nameTo]);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setEnvelopeOpened(false);
      setHeartConfettiUsed(false);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(4), 5500),
      setTimeout(() => {
        setStep(5);
        fireConfetti();
      }, 7000),
      setTimeout(() => setStep(6), 9000),
      setTimeout(() => setStep(7), 10500),
      setTimeout(() => setStep(8), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView, fireConfetti]);

  // Fallback: open envelope after 8s if user hasn't opened it
  useEffect(() => {
    if (!isInView || step < 2 || envelopeOpened) return;
    const t = setTimeout(() => setEnvelopeOpened(true), 8000);
    return () => clearTimeout(t);
  }, [isInView, step, envelopeOpened]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #3a1525 0%, #1A0810 60%, #0D0810 100%)",
      }}
    >
      {/* Slow petals */}
      <PetalCanvas
        count={8}
        colors={["#C8445A", "#F2A7BB", "#D4A853", "#F5ECD7"]}
        speed="slow"
        active={isInView}
      />

      {/* Floating hearts appear after confetti */}
      <FloatingHearts active={step >= 5} />

      {/* Warm vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(26,8,16,0.7) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 md:gap-8">
        {/* Glow ring behind content */}
        {step >= 4 && <GlowRing />}

        {/* Envelope */}
        {step >= 2 && (
          <EnvelopeLetter
            opened={envelopeOpened}
            onOpen={openEnvelope}
            showTapHint={step >= 2 && !envelopeOpened}
          />
        )}

        {/* Names + heart */}
        {step >= 4 && (
          <NamesAndHeart
            nameFrom={nameFrom}
            nameTo={nameTo}
            onHeartClick={step >= 5 ? fireHeartConfetti : undefined}
          />
        )}

        {/* The forever text */}
        {step >= 5 && (
          <motion.div
            className="flex max-w-[320px] flex-col items-center gap-3 text-center md:max-w-[480px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <p className="font-handwritten text-xl text-[var(--petal-pink)] md:text-2xl">
              This is forever.
            </p>
            <p className="font-body text-sm italic leading-relaxed text-[var(--ivory)] opacity-80 md:text-base">
              Not because it was easy. But because through every silence,
              every distance, every heartbreak{"\u2014"}we chose each other.
              Again and again.
            </p>
          </motion.div>
        )}

        {/* Date marker */}
        {step >= 7 && (
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
          >
            <div className="h-px w-16 bg-[var(--gold)] opacity-40 md:w-24" />
            <p className="font-display text-xs tracking-widest text-[var(--ivory)] md:text-sm">
              February 14 {"\u2022"} 3 Years {"\u2022"} Valentine&apos;s Day
            </p>
            <p className="font-handwritten text-sm text-[var(--petal-pink)] opacity-90">
              Happy Valentine&apos;s Day
            </p>
            <div className="h-px w-16 bg-[var(--gold)] opacity-40 md:w-24" />
          </motion.div>
        )}

        {/* Replay + Share */}
        {step >= 8 && (
          <motion.div
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={onReplay}
              className="rounded-full border border-[var(--gold)]/40 bg-transparent px-6 py-2.5 font-body text-sm text-[var(--ivory)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--rose)]/10 hover:shadow-[0_0_20px_rgba(200,68,90,0.2)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)] md:px-8 md:py-3 md:text-base"
              aria-label="Replay our story"
            >
              {"Replay Our Story \u21BA"}
            </motion.button>
            <motion.button
              onClick={handleShare}
              className="rounded-full border border-[var(--gold)]/40 bg-transparent px-6 py-2.5 font-body text-sm text-[var(--ivory)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--rose)]/10 hover:shadow-[0_0_20px_rgba(200,68,90,0.2)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)] md:px-8 md:py-3 md:text-base"
              aria-label="Share this story"
            >
              {shareCopied ? "Link copied!" : "Share this story"}
            </motion.button>
            <p className="font-body text-xs text-[var(--ivory)] opacity-40">
              Happy Valentine&apos;s Day. Thank you for reading our story.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
