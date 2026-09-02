'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WavyBackgroundProps {
  colors?: string[];
  blur?: number;
  speed?: 'slow' | 'medium' | 'fast';
  waveOpacity?: number;
  className?: string;
}

export default function WavyBackground({
  colors = ['#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
  blur = 30,
  speed = 'slow',
  waveOpacity = 0.5,
  className,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const colorsKey = colors ? colors.join(',') : '';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let time = 0;

    const colorValues = colorsKey.split(',').map((c) => {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      return [r, g, b];
    });

    const speedFactor = speed === 'slow' ? 0.003 : speed === 'medium' ? 0.006 : 0.01;

    const drawWave = (
      offsetY: number,
      amplitude: number,
      frequency: number,
      phase: number,
      color: number[],
      opacity: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x <= width; x += 3) {
        const y =
          offsetY +
          Math.sin(x * frequency + time + phase) * amplitude +
          Math.cos(x * frequency * 0.7 + time * 1.3 + phase) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.filter = `blur(${blur}px)`;

      const centerY = height * 0.5;

      colorValues.forEach((color, i) => {
        const offsetY = centerY + (i - colorValues.length / 2) * 20;
        const amplitude = 30 + i * 8;
        const frequency = 0.005 + i * 0.001;
        const opacity = waveOpacity * (1 - i * 0.08);
        drawWave(offsetY, amplitude, frequency, i * 0.8, color, Math.max(0.05, opacity));
      });

      ctx.filter = 'none';
      time += speedFactor;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    } else {
      colorValues.forEach((color, i) => {
        const offsetY = height * 0.5 + (i - colorValues.length / 2) * 20;
        const amplitude = 30 + i * 8;
        const frequency = 0.005 + i * 0.001;
        const opacity = waveOpacity * (1 - i * 0.08);
        drawWave(offsetY, amplitude, frequency, i * 0.8, color, Math.max(0.05, opacity));
      });
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
  }, [colorsKey, blur, speed, waveOpacity, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ pointerEvents: 'none' }}
    />
  );
}