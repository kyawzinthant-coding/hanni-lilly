"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const STORAGE_KEY = "story-audio-enabled";

// YouTube video to play as background music (audio only; video is hidden).
// Link: https://youtu.be/ytjLaWlzqgs
const YOUTUBE_VIDEO_ID = "ytjLaWlzqgs";
const DEFAULT_VOLUME = 50; // 0–100; moderate level, not too loud or quiet

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
};

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: { onReady?: (event: { target: YTPlayer }) => void };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function MusicToggle() {
  const [enabled, setEnabled] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const hasAutoPlayedRef = useRef(false);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT?.Player) {
      setApiReady(true);
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  const createAndPlay = useCallback(() => {
    if (playerRef.current) {
      const p = playerRef.current as { playVideo: () => void; setVolume?: (v: number) => void };
      if (typeof p.setVolume === "function") p.setVolume(DEFAULT_VOLUME);
      p.playVideo();
      return;
    }
    if (!window.YT?.Player) return;
    const player = new window.YT.Player("youtube-audio-player", {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          const target = event.target as { setVolume?: (v: number) => void; playVideo: () => void };
          if (typeof target.setVolume === "function") target.setVolume(DEFAULT_VOLUME);
          target.playVideo();
        },
      },
    });
    playerRef.current = player;
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }

    if (next) {
      if (apiReady) {
        createAndPlay();
      } else {
        const check = setInterval(() => {
          if (window.YT?.Player) {
            clearInterval(check);
            setApiReady(true);
            createAndPlay();
          }
        }, 100);
        return () => clearInterval(check);
      }
    } else {
      if (playerRef.current) {
        playerRef.current.pauseVideo();
      }
    }
  }, [enabled, apiReady, createAndPlay]);

  // When music is on by default, start playback once the API is ready (may be blocked by browser autoplay policy)
  useEffect(() => {
    if (!enabled || !apiReady || hasAutoPlayedRef.current) return;
    hasAutoPlayedRef.current = true;
    createAndPlay();
  }, [enabled, apiReady, createAndPlay]);

  // Restore preference; default to ON when never set (music plays by default)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setEnabled(stored !== "false");
    } catch {
      setEnabled(true);
    }
  }, []);

  return (
    <>
      {/* Hidden YouTube player (audio only; video not visible). YT.Player injects iframe here. */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <div id="youtube-audio-player" />
      </div>
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
