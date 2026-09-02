'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  href?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  className,
  href,
  ariaLabel,
  disabled = false,
}: AnimatedButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';

  const variantClasses =
    variant === 'primary'
      ? 'px-7 py-3.5 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-magenta-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95'
      : 'px-6 py-3 text-white bg-white/5 border border-white/15 backdrop-blur-md hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-glow-purple hover:-translate-y-0.5 active:scale-95';

  const content = (
    <motion.span
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className="inline-flex items-center gap-2 relative z-10"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={cn(baseClasses, variantClasses, className)}
        aria-label={ariaLabel}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses, className)}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
