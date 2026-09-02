'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LampContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function LampContainer({ children, className }: LampContainerProps) {
  return (
    <div className={cn('relative flex flex-col items-center w-full', className)}>
      {/* Outer soft glow (wider, more intense) */}
      <div
        aria-hidden="true"
        className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[100%] max-w-[900px] h-24 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(34,211,238,0.8) 15%, rgba(59,130,246,1) 50%, rgba(34,211,238,0.8) 85%, transparent)',
          filter: 'blur(100px)',
          borderRadius: '9999px',
          animation: 'tubeGlow 3s ease-in-out infinite',
          willChange: 'opacity',
        }}
      />

      {/* Middle glow (intense) */}
      <div
        aria-hidden="true"
        className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[85%] max-w-[700px] h-8 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, #22d3ee 20%, #ffffff 50%, #22d3ee 80%, transparent)',
          filter: 'blur(20px)',
          borderRadius: '9999px',
          animation: 'tubeCorePulse 2s ease-in-out infinite',
          willChange: 'box-shadow, opacity',
        }}
      />

      {/* Bright core line */}
      <div
        aria-hidden="true"
        className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-[80%] max-w-[500px] h-1.5 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, #22d3ee 10%, #ffffff 50%, #22d3ee 90%, transparent)',
          borderRadius: '9999px',
          boxShadow:
            '0 0 30px #22d3ee, 0 0 60px #3b82f6, 0 0 120px rgba(139,92,246,0.8), 0 0 200px rgba(34,211,238,0.6)',
          animation: 'tubeCorePulse 2s ease-in-out infinite',
          willChange: 'box-shadow, opacity',
        }}
      />

      {/* End caps (bright) */}
      <div
        aria-hidden="true"
        className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[80%] max-w-[500px] flex justify-between pointer-events-none"
      >
        <span
          className="w-2.5 h-2.5 rounded-full bg-white"
          style={{ boxShadow: '0 0 20px #22d3ee, 0 0 40px #3b82f6, 0 0 80px #22d3ee' }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-white"
          style={{ boxShadow: '0 0 20px #22d3ee, 0 0 40px #3b82f6, 0 0 80px #22d3ee' }}
        />
      </div>

      <style jsx>{`
        @keyframes tubeGlow {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes tubeCorePulse {
          0%,
          100% {
            box-shadow:
              0 0 25px #22d3ee,
              0 0 50px #3b82f6,
              0 0 100px rgba(139, 92, 246, 0.6);
          }
          50% {
            box-shadow:
              0 0 40px #22d3ee,
              0 0 80px #3b82f6,
              0 0 160px rgba(139, 92, 246, 0.9),
              0 0 250px rgba(34, 211, 238, 0.8);
          }
        }
      `}</style>

      {children}
    </div>
  );
}
