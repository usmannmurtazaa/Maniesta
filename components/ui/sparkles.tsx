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
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const particles: any[] = [];
    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        alpha: Math.random() * 0.6 + 0.2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.twinkleSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.phase + time * speed));
        const size = p.size * (0.8 + 0.4 * Math.sin(p.phase * 1.5 + time));

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = particleColor;
        ctx!.globalAlpha = Math.max(0, alpha);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
    };
  }, [minSize, maxSize, particleDensity, particleColor, speed]);

  return <canvas ref={canvasRef} className={cn('absolute', className)} style={{ background, pointerEvents: 'none' }} />;
}