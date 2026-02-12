"use client";

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
      className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 md:right-8"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick?.(i)}
          aria-label={`Go to chapter ${i}`}
          aria-current={i === current ? "step" : undefined}
          className={`h-2 w-2 rounded-full border transition-all duration-300 ${
            i === current
              ? "scale-[1.3] border-[var(--gold)] bg-[var(--gold)]"
              : "border-[var(--ivory)] border-opacity-40 bg-transparent opacity-40"
          }`}
        />
      ))}
    </nav>
  );
}
