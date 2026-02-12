"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { useEffect, useState } from "react";

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
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 5500),
      setTimeout(() => setStep(4), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{ background: "var(--deep-navy)" }}
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Step 1 only: found her on Facebook */}
        {step === 1 && (
          <motion.div
            className="flex max-w-[300px] flex-col items-center gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-handwritten text-[19px] leading-relaxed text-[var(--petal-pink)]">
              I searched for her on Facebook.
            </p>
            <p className="font-body text-sm leading-relaxed italic text-[var(--ivory)] opacity-75">
              And there she was — her photo glowing on my screen like a quiet
              miracle.
            </p>
          </motion.div>
        )}

        {/* Step 2 only: Add Friend */}
        {step === 2 && (
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-[200px] rounded-[20px] border border-white/10 bg-[#151525] p-4 shadow-2xl">
              <div className="mb-3 flex items-center gap-1.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2]">
                  <span className="text-[7px] font-bold text-white">f</span>
                </div>
                <div className="h-1.5 w-12 rounded-full bg-white/15" />
              </div>
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--petal-pink)]" />
                <div className="rounded-md bg-[#1877F2] px-5 py-2 text-[10px] font-semibold text-white">
                  Add Friend
                </div>
              </div>
            </div>
            <p className="font-handwritten text-[18px] text-[var(--ivory)]">
              I pressed Add Friend. One click.
            </p>
          </motion.div>
        )}

        {/* Step 3 only: stayed connected */}
        {step === 3 && (
          <motion.div
            className="flex max-w-[320px] flex-col items-center gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm leading-relaxed italic text-[var(--ivory)] opacity-85">
              We stayed connected. Two people on each other&apos;s screens,
              slowly becoming part of each other&apos;s world.
            </p>
          </motion.div>
        )}

        {/* Step 4 only: closing */}
        {step === 4 && (
          <motion.div
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-handwritten text-sm text-[var(--gold)]">
              Year 1
            </p>
            <div className="h-px w-32 bg-white/20">
              <motion.div
                className="h-full bg-[var(--gold)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
