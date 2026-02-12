"use client";

import { useEffect, useRef, useCallback } from "react";

interface Lantern {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  swayAmplitude: number;
  swayFrequency: number;
  phase: number;
  glow: number;
  color: string;
}

interface LanternCanvasProps {
  count?: number;
  active?: boolean;
}

export default function LanternCanvas({
  count = 20,
  active = true,
}: LanternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const lanternsRef = useRef<Lantern[]>([]);
  const timeRef = useRef(0);

  const createLantern = useCallback(
    (canvas: HTMLCanvasElement, startFromBottom = false): Lantern => {
      const colors = ["#FF9B3E", "#D4A853", "#FFB347", "#FFD700"];
      return {
        x: Math.random() * canvas.width,
        y: startFromBottom
          ? canvas.height + Math.random() * 100
          : Math.random() * canvas.height,
        width: 14 + Math.random() * 16,
        height: 20 + Math.random() * 25,
        speed: 0.3 + Math.random() * 0.5,
        swayAmplitude: 15 + Math.random() * 25,
        swayFrequency: 0.003 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        glow: 10 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    lanternsRef.current = Array.from({ length: count }, () =>
      createLantern(canvas)
    );

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current++;

      for (const l of lanternsRef.current) {
        l.y -= l.speed;
        const swayX =
          Math.sin(timeRef.current * l.swayFrequency + l.phase) *
          l.swayAmplitude;

        if (l.y < -l.height - 50) {
          Object.assign(l, createLantern(canvas, true));
        }

        const drawX = l.x + swayX;
        const drawY = l.y;

        ctx.save();
        ctx.shadowColor = l.color;
        ctx.shadowBlur = l.glow;
        ctx.fillStyle = l.color;
        ctx.globalAlpha = 0.8;

        // Lantern body
        const r = l.width * 0.3;
        ctx.beginPath();
        ctx.moveTo(drawX - l.width / 2 + r, drawY);
        ctx.arcTo(
          drawX + l.width / 2,
          drawY,
          drawX + l.width / 2,
          drawY + l.height,
          r
        );
        ctx.lineTo(drawX + l.width / 2, drawY + l.height);
        ctx.lineTo(drawX - l.width / 2, drawY + l.height);
        ctx.arcTo(
          drawX - l.width / 2,
          drawY,
          drawX - l.width / 2 + r,
          drawY,
          r
        );
        ctx.closePath();
        ctx.fill();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          drawX,
          drawY + l.height * 0.4,
          0,
          drawX,
          drawY + l.height * 0.4,
          l.width
        );
        gradient.addColorStop(0, "rgba(255, 255, 200, 0.6)");
        gradient.addColorStop(1, "rgba(255, 155, 62, 0)");
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active, count, createLantern]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
