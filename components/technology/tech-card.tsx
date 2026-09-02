'use client';

import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiFirebase,
  SiGit,
  SiGithub,
  SiNetlify,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FiGlobe, FiCpu, FiLayers } from 'react-icons/fi';

const iconMap: Record<string, JSX.Element> = {
  React: <SiReact className="w-6 h-6" />,
  'Next.js': <SiNextdotjs className="w-6 h-6" />,
  TypeScript: <SiTypescript className="w-6 h-6" />,
  JavaScript: <SiJavascript className="w-6 h-6" />,
  'Tailwind CSS': <SiTailwindcss className="w-6 h-6" />,
  Motion: <SiFramer className="w-6 h-6" />,
  'Three.js': <SiThreedotjs className="w-6 h-6" />,
  'React Three Fiber': <FiLayers className="w-6 h-6" />, // or SiThreedotjs if preferred
  Firebase: <SiFirebase className="w-6 h-6" />,
  'AI APIs': <FiCpu className="w-6 h-6" />,
  'REST APIs': <TbApi className="w-6 h-6" />,
  'Web APIs': <FiGlobe className="w-6 h-6" />,
  Git: <SiGit className="w-6 h-6" />,
  GitHub: <SiGithub className="w-6 h-6" />,
  Netlify: <SiNetlify className="w-6 h-6" />,
};

const techColors: Record<string, string> = {
  React: '#61dafb',
  'Next.js': '#ffffff',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  'Tailwind CSS': '#38bdf8',
  Motion: '#a855f7',
  'Three.js': '#ffffff',
  'React Three Fiber': '#8b5cf6',
  Firebase: '#ffca28',
  'AI APIs': '#8b5cf6',
  'REST APIs': '#34d399',
  'Web APIs': '#22d3ee',
  Git: '#f05032',
  GitHub: '#ffffff',
  Netlify: '#00c7b7',
};

interface TechCardProps {
  name: string;
  index: number;
}

export default function TechCard({ name, index }: TechCardProps) {
  const icon = iconMap[name] || <SiReact className="w-6 h-6" />;
  const color = techColors[name] || '#22d3ee';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5 hover:shadow-glow-purple cursor-default select-none"
      role="listitem"
      aria-label={name}
      title={name}
    >
      <div className="text-2xl mb-2 flex justify-center" style={{ color }}>
        {icon}
      </div>
      <div className="text-sm font-semibold text-white">{name}</div>
    </motion.div>
  );
}
