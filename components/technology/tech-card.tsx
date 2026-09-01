'use client';

import { motion } from 'framer-motion';

interface TechCardProps {
  name: string;
  icon: string;
  index: number;
}

export default function TechCard({ name, icon, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5 hover:shadow-glow-purple cursor-default select-none"
    >
      <div className="text-2xl mb-2 gradient-text">{icon}</div>
      <div className="text-sm font-semibold text-white">{name}</div>
    </motion.div>
  );
}