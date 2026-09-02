'use client';

import { categories } from '@/data/projects';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap gap-3 justify-center mb-10"
      role="group"
      aria-label="Filter projects by category"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat}
          type="button"
          onClick={() => onFilterChange(cat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={activeFilter === cat}
          aria-label={`Filter by ${cat}`}
          className={cn(
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500',
            activeFilter === cat
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/25 text-white border border-purple-500/40 shadow-glow-purple'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/30 hover:text-white hover:bg-purple-500/10'
          )}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  );
}
