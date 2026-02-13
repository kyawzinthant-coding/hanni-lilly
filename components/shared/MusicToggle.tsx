"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const STORAGE_KEY = "story-audio-enabled";
const AUDIO_SRC = "/audio/loft.mp3";
const DEFAULT_VOLUME = 0.5; // 0–1, moderate level

function getInitialEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "false";
  } catch {
    return true;
  }
}

export default function MusicToggle() {
  const [enabled, setEnabled] = useState(getInitialEnabled);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = DEFAULT_VOLUME;
    audio.play().catch(() => {
      // Autoplay blocked (e.g. mobile); will start on first user interaction
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
    if (next) play();
    else pause();
  }, [enabled, play, pause]);

  // Try to autoplay when enabled: immediately and when audio is ready (canplay), plus short delayed retries
  useEffect(() => {
    if (!enabled) return;
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (enabledRef.current && audio.paused) play();
    };

    tryPlay();
    audio.addEventListener("canplay", tryPlay);
    audio.addEventListener("loadeddata", tryPlay);

    const t1 = setTimeout(tryPlay, 150);
    const t2 = setTimeout(tryPlay, 500);

    return () => {
      audio.removeEventListener("canplay", tryPlay);
      audio.removeEventListener("loadeddata", tryPlay);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [enabled, play]);

  // On mobile, start music on first user interaction if enabled and not yet playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startOnFirstInteraction = () => {
      if (!enabledRef.current) return;
      if (audio.paused) play();
      removeListeners();
    };

    const removeListeners = () => {
      document.removeEventListener("click", startOnFirstInteraction);
      document.removeEventListener("touchstart", startOnFirstInteraction, {
        capture: true,
      });
    };

    document.addEventListener("click", startOnFirstInteraction, { once: true });
    document.addEventListener("touchstart", startOnFirstInteraction, {
      once: true,
      capture: true,
    });

    return removeListeners;
  }, [play]);

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
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
