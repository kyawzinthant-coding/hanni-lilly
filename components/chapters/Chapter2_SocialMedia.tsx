"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { useEffect, useState, useRef, useCallback } from "react";

function TwinklingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<
    { x: number; y: number; size: number; speed: number; phase: number }[]
  >([]);

  const initStars = useCallback((canvas: HTMLCanvasElement) => {
    starsRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.4 + Math.random() * 1,
      speed: 0.003 + Math.random() * 0.01,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas);
    };
    resize();
    window.addEventListener("resize", resize);
    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;
      for (const star of starsRef.current) {
        const opacity =
          0.1 + Math.abs(Math.sin(time * star.speed + star.phase)) * 0.5;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}

function SoftRain() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-white/[0.08]"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${30 + Math.random() * 50}px`,
            animationName: "rain-fall",
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 4}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        />
      ))}
    </div>
  );
}

function FacebookPhoneMockup({ step }: { step: number }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (step >= 2) {
      const timer = setTimeout(() => setFollowing(true), 400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="relative"
    >
      <div className="w-[185px] rounded-[20px] border border-white/10 bg-[#151525] p-3 shadow-2xl md:w-[240px] md:p-4">
        {/* Facebook-style top bar */}
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2]">
            <span className="text-[7px] font-bold text-white">f</span>
          </div>
          <div className="h-1.5 w-12 rounded-full bg-white/15" />
        </div>

        {/* Profile section */}
        <div className="flex flex-col items-center gap-2 py-3">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--petal-pink)]" />
          <div className="h-2 w-20 rounded-full bg-white/20" />
          <div className="h-1.5 w-12 rounded-full bg-white/10" />

          {/* Add Friend button (Facebook style) */}
          <div className="mt-2 flex gap-1.5">
            <motion.div
              className={`rounded-md px-4 py-1.5 text-[9px] font-semibold transition-colors duration-300 ${
                following
                  ? "bg-white/10 text-[var(--ivory)]"
                  : "bg-[#1877F2] text-white"
              }`}
              animate={step >= 2 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {following ? "Friends" : "Add Friend"}
            </motion.div>
            <div className="rounded-md bg-white/10 px-3 py-1.5 text-[9px] text-white/50">
              Message
            </div>
          </div>

          {/* Heart burst on follow */}
          <AnimatePresence>
            {following && (
              <div className="pointer-events-none absolute top-[60%]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-[10px]"
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 0.5,
                      x: (Math.random() - 0.5) * 50,
                      y: -20 - Math.random() * 35,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-[var(--rose)]">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-sm bg-white/5" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Chapter2_SocialMedia() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 3000),
      setTimeout(() => setStep(5), 4800),
      setTimeout(() => setStep(6), 6500),
      setTimeout(() => setStep(7), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{ background: "var(--deep-navy)" }}
    >
      <TwinklingStars />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6">
        {/* Phone mockup */}
        {step >= 1 && <FacebookPhoneMockup step={step} />}

        {/* Finding her online */}
        {step >= 3 && (
          <motion.div
            className="flex max-w-[300px] flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="font-handwritten text-[19px] leading-relaxed text-[var(--petal-pink)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              I searched for her on Facebook.
            </motion.p>
            <motion.p
              className="font-body text-sm leading-relaxed italic text-[var(--ivory)] opacity-75"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              And there she was{"\u2014"}her photo glowing on my screen
              like a quiet miracle.
            </motion.p>
          </motion.div>
        )}

        {/* Adding her */}
        {step >= 4 && (
          <motion.div
            className="flex max-w-[300px] flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="font-handwritten text-[19px] leading-relaxed text-[var(--ivory)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              I pressed Add Friend. One click.
            </motion.p>
          </motion.div>
        )}

        {/* Staying connected */}
        {step >= 5 && (
          <motion.div
            className="flex max-w-[300px] flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="font-body text-sm leading-relaxed italic text-[var(--ivory)] opacity-70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              From that moment on, we stayed connected{"\u2014"}two
              people on each other{"'"}s screens, slowly becoming
              part of each other{"'"}s world.
            </motion.p>
          </motion.div>
        )}

        {/* Year 1 timeline */}
        {step >= 6 && (
          <div className="w-full max-w-[240px]">
            <motion.p
              className="mb-2 font-handwritten text-sm text-[var(--gold)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Year 1
            </motion.p>
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-full bg-[var(--gold)]"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Soft rain at the end */}
      {step >= 7 && <SoftRain />}
    </section>
  );
}
