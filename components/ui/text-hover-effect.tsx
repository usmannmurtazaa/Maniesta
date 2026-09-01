'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

export default function TextHoverEffect({ text = 'MANIESTA', className }: TextHoverEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const gradientId = `text-gradient-${text.replace(/\s/g, '-')}`;

  return (
    <div
      ref={containerRef}
      className={cn('text-hover-container relative inline-block cursor-pointer', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <svg viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet" className="w-full h-auto">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="25%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="75%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <clipPath id={`${gradientId}-clip`}>
            <text
              x="400"
              y="120"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="110"
              fontWeight="700"
              fontFamily="'Outfit', 'Inter', sans-serif"
              letterSpacing="-2"
            >
              {text}
            </text>
          </clipPath>
          <mask id={`${gradientId}-mask`}>
            <text
              x="400"
              y="120"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="110"
              fontWeight="700"
              fontFamily="'Outfit', 'Inter', sans-serif"
              letterSpacing="-2"
              fill="white"
            >
              {text}
            </text>
          </mask>
          <radialGradient id={`${gradientId}-cursor`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.9)" />
            <stop offset="30%" stopColor="rgba(59,130,246,0.7)" />
            <stop offset="60%" stopColor="rgba(139,92,246,0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Outline text */}
        <text
          x="400"
          y="120"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="110"
          fontWeight="700"
          fontFamily="'Outfit', 'Inter', sans-serif"
          letterSpacing="-2"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          style={{ transition: 'stroke 0.5s ease' }}
        >
          {text}
        </text>

        {/* Gradient fill text */}
        <text
          x="400"
          y="120"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="110"
          fontWeight="700"
          fontFamily="'Outfit', 'Inter', sans-serif"
          letterSpacing="-2"
          fill={`url(#${gradientId})`}
          opacity={hovered ? 0.85 : 0}
          style={{ transition: 'opacity 0.5s ease' }}
        >
          {text}
        </text>

        {/* Cursor glow overlay */}
        {hovered && (
          <g mask={`url(#${gradientId}-mask)`}>
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="120"
              fill={`url(#${gradientId}-cursor)`}
              style={{ mixBlendMode: 'overlay' }}
            />
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="60"
              fill="rgba(255,255,255,0.25)"
              style={{ mixBlendMode: 'overlay' }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}