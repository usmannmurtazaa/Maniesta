'use client';

import { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardItemProps {
  children: ReactNode;
  className?: string;
  translateZ?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function CardContainer({ children, className, onClick }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glow, setGlow] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    );
    setGlow(`radial-gradient(circle at ${x}px ${y}px, rgba(139,92,246,0.12), transparent 60%)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlow('');
  };

  return (
    <div
      ref={containerRef}
      className={cn('cursor-pointer', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transform, transition: 'transform 0.25s ease', position: 'relative' }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: glow, zIndex: 10 }}
      />
      {children}
    </div>
  );
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#141423] to-[#0a0a14] transition-all duration-300 shadow-xl',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateZ = 0,
  as: Tag = 'div',
  style,
  ...props
}: CardItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tag
      className={cn(className)}
      style={{
        transform: isHovered ? `translateZ(${translateZ}px)` : 'translateZ(0px)',
        transition: 'transform 0.3s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        setIsHovered(true);
        e.stopPropagation();
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        setIsHovered(false);
        e.stopPropagation();
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
