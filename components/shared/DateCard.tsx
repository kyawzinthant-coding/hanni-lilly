"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export interface DateCardProps {
  date: string;
  location: string;
  caption: string;
  subCaption?: string;
  myanmarDetail?: string;
  images: string[];
  rotation?: number;
  delay?: number;
}

export default function DateCard({
  date,
  location,
  caption,
  subCaption,
  myanmarDetail,
  images,
  rotation = 0,
  delay = 0,
}: DateCardProps) {
  const hasImage = images.length > 0;
  const firstImage = hasImage ? images[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 15 }}
      style={{ rotate: rotation }}
      className="w-[85%] max-w-[340px] overflow-hidden rounded-[20px] border border-[var(--gold)]/30 bg-[var(--burgundy)] shadow-xl"
    >
      {/* Top 55%: photo area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {firstImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImage}
              alt={caption}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--burgundy)] to-transparent"
              aria-hidden
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--rose)] to-[var(--gold)]">
            <div className="flex flex-col items-center gap-1 opacity-60">
              <Camera className="h-8 w-8 text-[var(--ivory)]" />
              <span className="font-body text-xs text-[var(--ivory)]">
                Add Photo
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom 45%: content */}
      <div className="flex flex-col gap-1 p-4">
        <p className="font-body text-[11px] text-[var(--gold)]">{date}</p>
        <p className="font-body text-[11px] text-[var(--ivory)] opacity-50">
          {location}
        </p>
        <p className="font-handwritten text-lg text-[var(--ivory)]">
          {caption}
        </p>
        {subCaption && (
          <p className="font-body text-[11px] text-[var(--ivory)] opacity-60">
            {subCaption}
          </p>
        )}
        {myanmarDetail && (
          <p
            className="font-myanmar mt-1 line-clamp-2 text-xs text-[var(--ivory)] opacity-60"
            dir="ltr"
          >
            {myanmarDetail}
          </p>
        )}
      </div>
    </motion.div>
  );
}
