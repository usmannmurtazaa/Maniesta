'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DottedGlowBackgroundProps {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorDark?: string;
  glowColorDark?: string;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
}

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  phase: number;
  alpha: number;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 };
}

export default function DottedGlowBackground({
  className = '',
  opacity = 1,
  gap = 12,
  radius = 1.4,
  colorDark = '#6366f1',
  glowColorDark = '#8b5cf6',
  backgroundOpacity = 0,
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
}: DottedGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const dots: Dot[] = [];
    const spacing = gap || 12;
    const dotRadius = radius || 1.4;

    for (let x = spacing; x < width; x += spacing) {
      for (let y = spacing; y < height; y += spacing) {
        dots.push({
          baseX: x,
          baseY: y,
          x,
          y,
          speedX:
            (Math.random() * (speedMax - speedMin) + speedMin) *
            (Math.random() > 0.5 ? 1 : -1) *
            speedScale,
          speedY:
            (Math.random() * (speedMax - speedMin) + speedMin) *
            (Math.random() > 0.5 ? 1 : -1) *
            speedScale,
          phase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
    }

    const colorRGB = hexToRgb(colorDark);
    const glowRGB = hexToRgb(glowColorDark);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = backgroundOpacity;
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      const time = Date.now() * 0.001;

      dots.forEach((dot) => {
        dot.x = dot.baseX + Math.sin(time * dot.speedX + dot.phase) * 3;
        dot.y = dot.baseY + Math.cos(time * dot.speedY + dot.phase) * 3;

        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dotRadius * 4);
        gradient.addColorStop(0, `rgba(${glowRGB.r}, ${glowRGB.g}, ${glowRGB.b}, ${dot.alpha})`);
        gradient.addColorStop(
          0.5,
          `rgba(${glowRGB.r}, ${glowRGB.g}, ${glowRGB.b}, ${dot.alpha * 0.3})`
        );
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${dot.alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const staticDraw = () => {
      dots.forEach((dot) => {
        const gradient = ctx.createRadialGradient(
          dot.baseX,
          dot.baseY,
          0,
          dot.baseX,
          dot.baseY,
          dotRadius * 4
        );
        gradient.addColorStop(0, `rgba(${glowRGB.r}, ${glowRGB.g}, ${glowRGB.b}, ${dot.alpha})`);
        gradient.addColorStop(
          0.5,
          `rgba(${glowRGB.r}, ${glowRGB.g}, ${glowRGB.b}, ${dot.alpha * 0.3})`
        );
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, dotRadius * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${dot.alpha})`;
        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (!reducedMotion) {
      draw();
    } else {
      staticDraw();
    }

    const resizeObserver = new ResizeObserver(() => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      resizeObserver.disconnect();
    };
  }, [
    opacity,
    gap,
    radius,
    colorDark,
    glowColorDark,
    backgroundOpacity,
    speedMin,
    speedMax,
    speedScale,
    reducedMotion,
  ]);

  return (
    <canvas ref={canvasRef} className={cn('absolute inset-0 pointer-events-none', className)} />
  );
}