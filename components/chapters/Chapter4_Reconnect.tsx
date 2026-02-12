"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";

export default function Chapter4_Reconnect() {
  const [ref, isInView] = useChapterInView(0.5);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #1A2535 0%, #1A0810 60%, #0D0810 100%)",
      }}
    >
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center">
        <motion.p
          className="font-body text-md text-[var(--gold)] opacity-90"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.9, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          After a long period of silence, he commented on her shared post.
        </motion.p>
        <motion.div
          className="flex min-h-[45vh] w-full max-w-[420px] items-center justify-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/reunion-state.png"
            alt="They became connected again"
            className="max-h-[50vh] w-full object-contain"
          />
        </motion.div>
        <motion.p
          className="font-handwritten text-base text-[var(--ivory)] md:text-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          They talked and connected again.
        </motion.p>
      </div>
    </section>
  );
}
