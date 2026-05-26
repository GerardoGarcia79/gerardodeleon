"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@teispace/next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

// Colors by theme - adjust to your pallete
const THEME_COLORS = {
  dark: {
    particle: "190, 95%, 55%", // same value as --glow-primary in globals.css -> :dark
    connection: "190, 95%, 55%",
  },
  light: {
    particle: "190, 80%, 35%", // darker than --glow-primary in globals.css -> :root for contrast on a light background
    connection: "190, 80%, 35%",
  },
};

const CONNECTION_DISTANCE = 150;
const PARTICLE_DENSITY = 15000; // px² by particle — rise for fewer particles

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Ref for reading the theme INSIDE the loop without recreating the animation
  const themeRef = useRef(resolvedTheme ?? "dark");

  useEffect(() => {
    themeRef.current = resolvedTheme ?? "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // ─── HiDPI / Retina display Support ────────────────────────────────────────────
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = { width: window.innerWidth, height: window.innerHeight };

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      return rect;
    };

    // ─── Spatial grid to reduce comparisons O(n²) → O(n·k) ──────────
    // Divide the canvas into cells; only compare particles in neighboring cells
    const buildGrid = (
      pts: Particle[],
      canvasW: number,
      canvasH: number,
      cellSize: number,
    ): Map<string, Particle[]> => {
      const grid = new Map<string, Particle[]>();
      for (const p of pts) {
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        const key = `${cx},${cy}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(p);
      }
      return grid;
    };

    // ─── Create particles ─────────────────────────────────────────────────
    let logicalW = window.innerWidth;
    let logicalH = window.innerHeight;

    const createParticles = (w: number, h: number) => {
      particles = [];
      const count = Math.floor((w * h) / PARTICLE_DENSITY);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // ─── Animation loop ────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, logicalW, logicalH);

      const colors =
        THEME_COLORS[themeRef.current as keyof typeof THEME_COLORS] ??
        THEME_COLORS.dark;

      // Moving particles and bouncing
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > logicalW) p.vx *= -1;
        if (p.y < 0 || p.y > logicalH) p.vy *= -1;
      }

      // Spatial grid — cell size = connection distance
      const grid = buildGrid(
        particles,
        logicalW,
        logicalH,
        CONNECTION_DISTANCE,
      );

      const drawn = new Set<string>();

      for (const p of particles) {
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${colors.particle}, ${p.opacity})`;
        ctx.fill();

        // Search for neighbors only in adjacent cells
        const cx = Math.floor(p.x / CONNECTION_DISTANCE);
        const cy = Math.floor(p.y / CONNECTION_DISTANCE);

        for (let nx = cx - 1; nx <= cx + 1; nx++) {
          for (let ny = cy - 1; ny <= cy + 1; ny++) {
            const neighbors = grid.get(`${nx},${ny}`);
            if (!neighbors) continue;

            for (const q of neighbors) {
              if (q === p) continue;

              // Avoid drawing the same connection twice
              const pairKey =
                p.x < q.x || (p.x === q.x && p.y < q.y)
                  ? `${p.x},${p.y}-${q.x},${q.y}`
                  : `${q.x},${q.y}-${p.x},${p.y}`;
              if (drawn.has(pairKey)) continue;
              drawn.add(pairKey);

              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < CONNECTION_DISTANCE) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `hsla(${colors.connection}, ${
                  0.12 * (1 - dist / CONNECTION_DISTANCE)
                })`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // ─── Resize with debounce ──────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const rect = setupCanvas();
        logicalW = rect.width;
        logicalH = rect.height;
        createParticles(logicalW, logicalH);
      }, 150);
    };

    // ─── Initialize ──────────────────────────────────────────────────────
    const rect = setupCanvas();
    logicalW = rect.width;
    logicalH = rect.height;
    createParticles(logicalW, logicalH);
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Loop isn't recreated when changing themes thanks to themeRef

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
