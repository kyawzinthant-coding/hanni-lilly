"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const STORAGE_KEY = "story-audio-enabled";
// Royalty-free ambient track so music plays without adding a file (SoundHelix, CC-friendly).
// To use your own: add public/audio/ambient.mp3 and set DEFAULT_AUDIO to "/audio/ambient.mp3".
const DEFAULT_AUDIO =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function MusicToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (next) {
      audio.volume = 0.25;
      audio.play().catch(() => setEnabled(false));
    } else {
      audio.pause();
    }
  }, [enabled]);

  // Restore preference for label only; do not auto-play (browser would block)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setEnabled(stored === "true");
    } catch {
      setEnabled(false);
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src={DEFAULT_AUDIO} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--burgundy)]/80 px-3 py-2 font-body text-xs text-[var(--ivory)] backdrop-blur-sm transition-all hover:border-[var(--gold)] hover:bg-[var(--rose)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--burgundy)] md:bottom-8 md:left-8 md:px-4 md:text-sm"
        aria-label={enabled ? "Turn off music" : "Turn on music"}
      >
        {enabled ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Music className="h-4 w-4" />
        )}
        <span>{enabled ? "Music on" : "Turn on music"}</span>
      </button>
    </>
  );
}
