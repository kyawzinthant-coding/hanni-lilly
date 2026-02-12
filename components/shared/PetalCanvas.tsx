"use client";

import { useEffect, useRef, useCallback } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  color: string;
  amplitude: number;
  frequency: number;
  phase: number;
}

interface PetalCanvasProps {
  count?: number;
  colors?: string[];
  speed?: "slow" | "normal" | "fast";
  active?: boolean;
}

export default function PetalCanvas({
  count = 12,
  colors = ["#C8445A", "#F2A7BB", "#D4A853", "#e8738a"],
  speed = "slow",
  active = true,
}: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const speedMultiplier = speed === "slow" ? 0.5 : speed === "fast" ? 1.5 : 1;

  const createPetal = useCallback(
    (canvas: HTMLCanvasElement, startFromTop = false): Petal => {
      return {
        x: Math.random() * canvas.width,
        y: startFromTop
          ? -Math.random() * canvas.height * 0.3
          : Math.random() * canvas.height,
        size: 6 + Math.random() * 12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        vx: 0,
        vy: (0.15 + Math.random() * 0.35) * speedMultiplier,
        color: colors[Math.floor(Math.random() * colors.length)],
        amplitude: 0.5 + Math.random() * 1.5,
        frequency: 0.005 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
      };
    },
    [colors, speedMultiplier]
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

    petalsRef.current = Array.from({ length: count }, () =>
      createPetal(canvas)
    );

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current++;

      for (const p of petalsRef.current) {
        p.vy += 0.008 * speedMultiplier;
        p.vx = Math.sin(timeRef.current * p.frequency + p.phase) * p.amplitude;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          Object.assign(p, createPetal(canvas, true));
          p.y = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
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
  }, [active, count, createPetal, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
