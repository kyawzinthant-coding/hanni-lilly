"use client";

import { motion } from "framer-motion";

interface HeartbeatLineProps {
  mode: "beating" | "flatline" | "syncing";
  color1?: string;
  color2?: string;
}

const beatingPath =
  "M0,50 L30,50 L35,50 L40,20 L45,80 L50,35 L55,65 L60,50 L90,50 L95,50 L100,20 L105,80 L110,35 L115,65 L120,50 L150,50 L155,50 L160,20 L165,80 L170,35 L175,65 L180,50 L210,50 L215,50 L220,20 L225,80 L230,35 L235,65 L240,50 L280,50";

const flatlinePath = "M0,50 L280,50";

const beatingPath2 =
  "M0,50 L25,50 L30,50 L35,25 L40,75 L45,40 L50,60 L55,50 L85,50 L90,50 L95,25 L100,75 L105,40 L110,60 L115,50 L145,50 L150,50 L155,25 L160,75 L165,40 L170,60 L175,50 L205,50 L210,50 L215,25 L220,75 L225,40 L230,60 L235,50 L280,50";

export default function HeartbeatLine({
  mode,
  color1 = "var(--rose)",
  color2 = "var(--gold)",
}: HeartbeatLineProps) {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <svg viewBox="0 0 280 100" className="w-full h-auto">
        {mode === "syncing" ? (
          <>
            <motion.path
              d={beatingPath}
              fill="none"
              stroke={color1}
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d={beatingPath2}
              fill="none"
              stroke={color2}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
          </>
        ) : (
          <motion.path
            d={mode === "beating" ? beatingPath : flatlinePath}
            fill="none"
            stroke={color1}
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: mode === "beating" ? 2 : 1,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </div>
  );
}
