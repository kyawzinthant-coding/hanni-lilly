"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { useEffect, useState } from "react";

export default function Chapter3_Conversation() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #1A0810, #2A1520)",
      }}
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-12">
        {/* Step 1 only: her story about coffee, he replied — conversation start */}
        {step === 1 && (
          <motion.div
            className="w-full max-w-[280px] rounded-xl bg-gradient-to-b from-[#2a3545] to-[#1A0810] p-5 shadow-xl md:max-w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 flex gap-0.5">
              <div className="h-0.5 flex-1 rounded-full bg-[#1877F2]/60" />
              <div className="h-0.5 flex-1 rounded-full bg-white/10" />
            </div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--petal-pink)]" />
              <div className="h-2 w-14 rounded-full bg-white/20" />
            </div>
            <p className="font-handwritten text-center text-sm text-[var(--ivory)] md:text-base">
              Lovita Coffee ☕
            </p>
            <p className="mt-1 text-center font-body text-[10px] text-[var(--ivory)] opacity-50">
              Her story
            </p>
            <motion.div
              className="mt-4 rounded-lg border border-white/20 bg-white/5 px-3 py-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <p className="font-body text-xs text-[var(--ivory)] opacity-90">
                He replied: I wanna drink coffee too 😄
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2 only: that's how the conversation started */}
        {step === 2 && (
          <motion.div
            className="flex max-w-[320px] flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-[22px] italic text-[var(--gold)] sm:text-[26px] md:text-[30px]">
              That&apos;s how the conversation started.
            </p>
            <p className="font-body text-sm text-[var(--ivory)] opacity-80">
              One story. One reply. Then everything.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
