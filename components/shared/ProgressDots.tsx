"use client";

import { Heart } from "lucide-react";

interface ProgressDotsProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export default function ProgressDots({
  total,
  current,
  onDotClick,
}: ProgressDotsProps) {
  return (
    <nav
      aria-label="Story progress"
      className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3 md:right-8"
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        return (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            aria-label={`Go to chapter ${i}`}
            aria-current={isActive ? "step" : undefined}
            className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)] ${
              isActive ? "scale-110 text-[var(--rose)]" : "opacity-40 hover:opacity-70 text-[var(--ivory)]"
            }`}
          >
            {isActive ? (
              <Heart className="h-4 w-4 fill-[var(--rose)]" strokeWidth={1.5} />
            ) : (
              <span className="block h-2 w-2 rounded-full border border-[var(--ivory)] border-opacity-40 bg-transparent" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
