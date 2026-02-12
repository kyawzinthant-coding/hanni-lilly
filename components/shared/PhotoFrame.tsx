"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface PhotoFrameProps {
  src?: string;
  caption?: string;
  subCaption?: string;
  rotation?: number;
  delay?: number;
}

export default function PhotoFrame({
  src,
  caption = "",
  subCaption,
  rotation = 0,
  delay = 0,
}: PhotoFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 15 }}
      style={{ rotate: rotation }}
      className="inline-block"
    >
      <div
        className="bg-[var(--ivory)] p-2 pb-10 shadow-xl"
        style={{ width: 150 }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={caption || "Photo memory"}
            className="h-[120px] w-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Photo placeholder — replace src prop with real image path */
          <div className="flex h-[120px] w-full items-center justify-center bg-gradient-to-br from-[var(--rose)] to-[var(--gold)]">
            <div className="flex flex-col items-center gap-1 opacity-60">
              <Camera className="h-5 w-5 text-[var(--ivory)]" />
              <span className="font-body text-[10px] text-[var(--ivory)]">
                Add Photo
              </span>
            </div>
          </div>
        )}
        <p className="mt-2 text-center font-handwritten text-xs text-[var(--burgundy)]">
          {caption}
        </p>
        {subCaption && (
          <p className="mt-0.5 text-center font-body text-[11px] text-gray-500">
            {subCaption}
          </p>
        )}
      </div>
    </motion.div>
  );
}
