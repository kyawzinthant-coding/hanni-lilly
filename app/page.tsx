"use client";

import {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import ProgressDots from "@/components/shared/ProgressDots";
import Chapter0_Opening from "@/components/chapters/Chapter0_Opening";
import Chapter1_FirstSight from "@/components/chapters/Chapter1_FirstSight";
import Chapter2_SocialMedia from "@/components/chapters/Chapter2_SocialMedia";
import Chapter3_Conversation from "@/components/chapters/Chapter3_Conversation";
import Chapter4_Heartbreak from "@/components/chapters/Chapter4_Heartbreak";
import Chapter4_Reconnect from "@/components/chapters/Chapter4_Reconnect";
import Chapter6_Festival from "@/components/chapters/Chapter6_Festival";
import Chapter7_BirthdayNewYear from "@/components/chapters/Chapter7_BirthdayNewYear";
import Chapter8_ThingsOnlyIKnow from "@/components/chapters/Chapter8_ThingsOnlyIKnow";
import Chapter9_EvenIf from "@/components/chapters/Chapter9_EvenIf";
import Chapter10_ForYouAlways from "@/components/chapters/Chapter10_ForYouAlways";
import MusicToggle from "@/components/shared/MusicToggle";

const TOTAL_CHAPTERS = 11;
const DEFAULT_FROM = "Hanni";
const DEFAULT_TO = "Lilly";

function useNamesFromUrl(): { nameFrom: string; nameTo: string } {
  const searchParams = useSearchParams();
  return useMemo(() => {
    const from = searchParams.get("from")?.trim();
    const to = searchParams.get("to")?.trim();
    if (from && to) return { nameFrom: from, nameTo: to };
    const names = searchParams
      .get("names")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (names?.length >= 2) return { nameFrom: names[0], nameTo: names[1] };
    return { nameFrom: DEFAULT_FROM, nameTo: DEFAULT_TO };
  }, [searchParams]);
}

function PageFallback() {
  return (
    <main
      className="film-grain relative mx-auto h-screen w-full flex items-center justify-center"
      style={{ background: "var(--burgundy)" }}
    >
      <div className="h-8 w-8 rounded-full border-2 border-[var(--gold)]/50 border-t-[var(--gold)] animate-spin" />
    </main>
  );
}

function HanniNLilly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const { nameFrom, nameTo } = useNamesFromUrl();

  const scrollToChapter = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const chapters = container.querySelectorAll(".chapter");
    if (chapters[index]) {
      chapters[index].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleBegin = useCallback(() => {
    scrollToChapter(1);
  }, [scrollToChapter]);

  const handleReplay = useCallback(() => {
    scrollToChapter(0);
  }, [scrollToChapter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chapters = container.querySelectorAll(".chapter");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Array.from(chapters).indexOf(entry.target as Element);
            if (index !== -1) {
              setCurrentChapter(index);
            }
          }
        }
      },
      { root: container, threshold: 0.6 }
    );

    chapters.forEach((ch) => observer.observe(ch));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "button") return;
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        scrollToChapter(Math.min(currentChapter + 1, TOTAL_CHAPTERS - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToChapter(Math.max(currentChapter - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChapter, scrollToChapter]);

  return (
    <main className="film-grain relative mx-auto h-screen w-full">
      <MusicToggle />
      <ProgressDots
        total={TOTAL_CHAPTERS}
        current={currentChapter}
        onDotClick={scrollToChapter}
      />

      <div ref={containerRef} className="story-container" tabIndex={0}>
        <Chapter0_Opening
          onBegin={handleBegin}
          nameFrom={nameFrom}
          nameTo={nameTo}
          currentChapter={currentChapter}
        />
        <Chapter1_FirstSight />
        <Chapter2_SocialMedia />
        <Chapter3_Conversation />
        <Chapter4_Heartbreak />
        <Chapter4_Reconnect />
        <Chapter6_Festival />
        <Chapter7_BirthdayNewYear />
        <Chapter8_ThingsOnlyIKnow />
        <Chapter9_EvenIf />
        <Chapter10_ForYouAlways onReplay={handleReplay} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <HanniNLilly />
    </Suspense>
  );
}
