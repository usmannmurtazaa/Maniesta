'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LampContainerProps {
  children: ReactNode;
  className?: string;
}

export default function LampContainer({ children, className }: LampContainerProps) {
  return (
    <div className={cn('relative flex flex-col items-center w-full', className)}>
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(34,211,238,0.25) 0%, rgba(59,130,246,0.15) 30%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'lampPulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[200px] h-[60px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(34,211,238,0.3) 0%, rgba(59,130,246,0.12) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <style jsx>{`
        @keyframes lampPulse {
          0%, 100% {
            opacity: 0.7;
            transform: translateX(-50%) scaleY(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scaleY(1.1);
          }
        }
      `}</style>
      {children}
    </div>
  );
}