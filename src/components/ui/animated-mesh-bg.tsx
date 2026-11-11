"use client";

import { useRef, useEffect, useCallback } from "react";

interface AnimatedMeshBgProps {
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
}

export function AnimatedMeshBg({
  baseColor = "#15361c",
  accentColor = "#46b867",
  highlightColor = "#2de1fc",
}: AnimatedMeshBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const t = Date.now() * 0.0003;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, baseColor);
    bg.addColorStop(0.5, "#19302a");
    bg.addColorStop(1, baseColor);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Draw flowing mesh grid
    const cols = 28;
    const rows = 16;
    const cellW = w / (cols - 1);
    const cellH = h / (rows - 1);

    // Build distorted grid points
    const points: { x: number; y: number }[][] = [];
    for (let r = 0; r < rows; r++) {
      points[r] = [];
      for (let c = 0; c < cols; c++) {
        const baseX = c * cellW;
        const baseY = r * cellH;
        const distort = 18;
        const dx =
          Math.sin(t * 1.2 + c * 0.3 + r * 0.15) * distort +
          Math.sin(t * 0.7 + c * 0.15 + r * 0.4) * distort * 0.5;
        const dy =
          Math.cos(t * 0.9 + r * 0.25 + c * 0.2) * distort +
          Math.cos(t * 1.4 + r * 0.1 + c * 0.35) * distort * 0.4;
        points[r][c] = { x: baseX + dx, y: baseY + dy };
      }
    }

    // Draw mesh lines
    ctx.lineWidth = 0.5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p = points[r][c];

        // Compute glow intensity based on wave
        const wave =
          Math.sin(t * 2 + c * 0.2 + r * 0.3) * 0.5 +
          Math.sin(t * 1.5 + c * 0.4 - r * 0.1) * 0.3 +
          0.2;
        const intensity = Math.max(0, Math.min(1, wave));

        // Horizontal lines
        if (c < cols - 1) {
          const next = points[r][c + 1];
          const alpha = 0.04 + intensity * 0.12;
          ctx.strokeStyle =
            intensity > 0.65
              ? `rgba(45, 225, 252, ${alpha * 0.8})`
              : `rgba(70, 184, 103, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }

        // Vertical lines
        if (r < rows - 1) {
          const below = points[r + 1][c];
          const alpha = 0.04 + intensity * 0.12;
          ctx.strokeStyle =
            intensity > 0.65
              ? `rgba(45, 225, 252, ${alpha * 0.8})`
              : `rgba(70, 184, 103, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(below.x, below.y);
          ctx.stroke();
        }

        // Node dots at intersections
        if (intensity > 0.4) {
          const dotSize = 1 + intensity * 2;
          const dotAlpha = intensity * 0.3;
          ctx.fillStyle =
            intensity > 0.7
              ? `rgba(45, 225, 252, ${dotAlpha})`
              : `rgba(70, 184, 103, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Add subtle radial glow that moves
    const glowX = w * 0.5 + Math.sin(t * 0.8) * w * 0.3;
    const glowY = h * 0.4 + Math.cos(t * 0.6) * h * 0.2;
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, w * 0.4);
    glow.addColorStop(0, "rgba(70, 184, 103, 0.06)");
    glow.addColorStop(0.5, "rgba(70, 184, 103, 0.02)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Second accent glow
    const glow2X = w * 0.3 + Math.cos(t * 1.1) * w * 0.2;
    const glow2Y = h * 0.6 + Math.sin(t * 0.5) * h * 0.3;
    const glow2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, w * 0.25);
    glow2.addColorStop(0, "rgba(45, 225, 252, 0.03)");
    glow2.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, w, h);

    animRef.current = requestAnimationFrame(render);
  }, [baseColor]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
