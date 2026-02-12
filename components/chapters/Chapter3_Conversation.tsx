"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import ChatBubble from "@/components/shared/ChatBubble";
import { useEffect, useState } from "react";

function GoldenThread() {
  return (
    <div className="flex w-full max-w-[280px] items-center gap-2">
      {/* Left phone icon */}
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0"
        fill="var(--gold)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.2 }}
      >
        <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <circle cx="12" cy="18" r="1" fill="var(--gold)" />
      </motion.svg>

      {/* Thread line */}
      <svg viewBox="0 0 200 10" className="h-2 flex-1">
        <motion.line
          x1="0"
          y1="5"
          x2="200"
          y2="5"
          stroke="var(--gold)"
          strokeWidth={1.5}
          filter="drop-shadow(0 0 4px var(--gold))"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Right phone icon */}
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0"
        fill="var(--gold)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5 }}
      >
        <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <circle cx="12" cy="18" r="1" fill="var(--gold)" />
      </motion.svg>
    </div>
  );
}

export default function Chapter3_Conversation() {
  const [ref, isInView] = useChapterInView(0.5);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 5000),
      setTimeout(() => setStep(3), 7000),
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
        {/* Chat bubbles */}
        {step >= 1 && (
          <div className="flex w-full max-w-[320px] flex-col gap-3 md:max-w-[440px]">
            <ChatBubble
              message="Hey, I saw your shoot with the brand — that product is honestly amazing"
              side="right"
              delay={0}
            />
            <ChatBubble
              message="Haha really? Thanks!"
              side="left"
              delay={1.2}
              showTyping
            />
            <ChatBubble
              message="Yeah! How was it working with them?"
              side="right"
              delay={2.8}
            />
            <ChatBubble
              message="It was fun actually! They're really cool people"
              side="left"
              delay={4}
              showTyping
            />
          </div>
        )}

        {/* Overlay text after chat */}
        {step >= 2 && (
          <motion.div
            className="mt-8 flex flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-[24px] italic text-[var(--gold)] sm:text-[28px] md:text-[36px]">
              1 year. 6 months. Still talking.
            </p>
            <p className="font-body text-sm text-[var(--ivory)] opacity-80">
              Every day. About everything. About nothing.
            </p>
          </motion.div>
        )}

        {/* Golden thread */}
        {step >= 3 && (
          <motion.div
            className="mt-6 flex w-full items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GoldenThread />
          </motion.div>
        )}
      </div>
    </section>
  );
}
