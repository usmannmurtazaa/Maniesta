'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TracingBeamProps {
  children: ReactNode;
  className?: string;
}

export default function TracingBeam({ children, className }: TracingBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const dot = dotRef.current;
    if (!container || !progress || !dot) return;

    let rafId: number | null = null;

    const updateBeam = () => {
      const rect = container.getBoundingClientRect();
      const scrollY = window.scrollY;
      const containerTop = rect.top + scrollY;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const start = containerTop - viewportHeight * 0.5;
      const end = containerTop + containerHeight - viewportHeight * 0.5;
      const current = scrollY;

      let progressPct = 0;
      if (current > start && current < end) {
        progressPct = ((current - start) / (end - start)) * 100;
      } else if (current >= end) {
        progressPct = 100;
      }

      progress.style.transform = `scaleY(${progressPct / 100})`;
      dot.style.transform = `translateY(${progressPct}%)`;
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(updateBeam);
    };

    updateBeam();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)} style={{ position: 'relative' }}>
      {/* Decorative beam line (responsive left offset) */}
      <div
        aria-hidden="true"
        className="absolute left-4 md:left-5 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden"
      >
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            height: '100%',
            background: 'linear-gradient(180deg, #22d3ee, #3b82f6, #8b5cf6, #d946ef)',
            borderRadius: '1px',
            willChange: 'transform',
            transform: 'scaleY(0)',
          }}
        />
      </div>

      {/* Glowing dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="absolute left-[15px] md:left-[19px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#8b5cf6,0_0_24px_#8b5cf6] z-10"
        style={{
          top: '0%',
          willChange: 'transform',
          transform: 'translateY(0)',
        }}
      />

      {/* Content container with responsive padding */}
      <div className="pl-12 md:pl-16">{children}</div>
    </div>
  );
}
