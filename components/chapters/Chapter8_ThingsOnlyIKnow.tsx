"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";
import { useEffect, useState } from "react";

type NoteCard = {
  id: number;
  text: string;
  sub: string | null;
  rotation: number;
  x: string;
  y: string;
  myanmar?: boolean;
};

const NOTE_CARDS: NoteCard[] = [
  {
    id: 1,
    text: "☕ Medium sweet coffee. Not too bitter. Not too sweet.",
    sub: null,
    rotation: -4,
    x: "8%",
    y: "12%",
  },
  {
    id: 2,
    text: "🎨 Red and Black. Always.",
    sub: null,
    rotation: 2,
    x: "52%",
    y: "8%",
  },
  {
    id: 3,
    text: "Lilly. အူကြူး. ပူတူး. ချစ်ရပါသောလေး.",
    sub: null,
    rotation: -2,
    x: "12%",
    y: "38%",
    myanmar: true,
  },
  {
    id: 4,
    text: "She's the jealous type. And it's the most adorable thing.",
    sub: null,
    rotation: 3,
    x: "58%",
    y: "35%",
  },
  {
    id: 5,
    text: "He's allergic to hot sun. And to spicy chinese snacks too. She doesn't always know these things.",
    sub: null,
    rotation: -3,
    x: "6%",
    y: "62%",
    myanmar: true,
  },
  {
    id: 6,
    text: "He screenshotted her stories. Every time.",
    sub: "Because one day he knew he'd want to remember.",
    rotation: 1,
    x: "50%",
    y: "58%",
  },
];

const STAGGER = 0.3;

export default function Chapter8_ThingsOnlyIKnow() {
  const [ref, isInView] = useChapterInView(0.5);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setRevealed(0);
      return;
    }
    const interval = setInterval(() => {
      setRevealed((r) => Math.min(r + 1, 7));
    }, 350);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="chapter relative overflow-hidden bg-[#0D0D0D]"
    >
      {/* Very subtle warm center glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,168,83,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {NOTE_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            className="absolute w-[160px] rounded-lg bg-[var(--ivory)] p-3 shadow-lg"
            style={{
              left: card.x,
              top: card.y,
              rotate: card.rotation,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: revealed > i ? 1 : 0,
              y: revealed > i ? 0 : 20,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: i * STAGGER,
            }}
          >
            <p
              className={`font-handwritten text-[15px] leading-snug text-[var(--burgundy)] ${
                card.myanmar ? "font-myanmar" : ""
              }`}
            >
              {card.text}
            </p>
            {card.sub && (
              <p className="mt-1.5 font-body text-[12px] italic text-[var(--burgundy)] opacity-70">
                {card.sub}
              </p>
            )}
          </motion.div>
        ))}

        {revealed >= 6 && (
          <motion.p
            className="absolute left-1/2 top-1/2 z-20 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-6 text-center font-display text-[22px] italic text-[var(--ivory)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            The small things. The real things.
          </motion.p>
        )}
      </div>
    </section>
  );
}
