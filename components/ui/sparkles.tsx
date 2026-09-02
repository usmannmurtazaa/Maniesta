'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SparklesCoreProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  phase: number;
}

export default function SparklesCore({
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1.5,
  particleDensity = 40,
  className,
  particleColor = '#8b5cf6',
  speed = 0.5,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate particles based on current dimensions
    const generateParticles = (w: number, h: number): Particle[] => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleDensity; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * (maxSize - minSize) + minSize,
          alpha: Math.random() * 0.6 + 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    };

    particlesRef.current = generateParticles(width, height);

    const animate = () => {
      if (!isVisibleRef.current) {
        // Skip rendering when offscreen
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.twinkleSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.phase + time * speed));
        const size = p.size * (0.8 + 0.4 * Math.sin(p.phase * 1.5 + time));

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const staticDraw = () => {
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    if (reducedMotion) {
      staticDraw();
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }

    // IntersectionObserver to pause/resume when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '50px' }
    );
    observer.observe(canvas);

    // Handle resize with particle regeneration
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = canvas.offsetWidth;
      const newHeight = canvas.offsetHeight;
      if (newWidth === 0 || newHeight === 0) return;

      canvas.width = newWidth;
      canvas.height = newHeight;
      width = newWidth;
      height = newHeight;

      // Regenerate particles for new dimensions
      particlesRef.current = generateParticles(newWidth, newHeight);

      if (reducedMotion) {
        staticDraw();
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [minSize, maxSize, particleDensity, particleColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('block w-full h-full', className)}
      style={{ background, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
