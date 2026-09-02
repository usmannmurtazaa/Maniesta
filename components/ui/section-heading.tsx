'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'center' | 'left';
  id?: string;
  headingLevel?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'center',
  id,
  headingLevel: HeadingTag = 'h2',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">{label}</p>
      <HeadingTag
        id={id}
        className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            'text-gray-400 text-base md:text-lg max-w-2xl',
            align === 'center' ? 'mx-auto' : ''
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}