'use client';

import { motion } from 'framer-motion';
import { technologies } from '@/data/technologies';
import SectionHeading from '@/components/ui/section-heading';
import TechCard from '@/components/technology/tech-card';
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

export default function TechnologySection() {
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section id="technology" className="relative py-20 md:py-28 bg-[#0a0a12] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="Modern Stack"
          title="Technology Behind Maniesta"
          description="Every product is built with modern, production-grade technologies chosen for performance, scalability and user experience."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-5 gap-4"
        >
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} name={tech.name} index={i} />
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="mt-12 overflow-hidden relative" aria-hidden="true">
          <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap animate-marquee">
            {marqueeItems.map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="flex items-center gap-2 text-sm text-gray-400 font-medium"
              >
                <span style={{ color: getColor(tech.name) }}>{getIcon(tech.name)}</span>
                {tech.name}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a12] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a12] to-transparent pointer-events-none" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-gray-500"
        >
          And more — the stack evolves with each new product.
        </motion.p>
      </div>
    </section>
  );
}

// Helper functions
function getIcon(name: string) {
  const icons: Record<string, JSX.Element> = {
    React: <SiReact className="w-4 h-4" />,
    'Next.js': <SiNextdotjs className="w-4 h-4" />,
    TypeScript: <SiTypescript className="w-4 h-4" />,
    JavaScript: <SiJavascript className="w-4 h-4" />,
    'Tailwind CSS': <SiTailwindcss className="w-4 h-4" />,
    Motion: <SiFramer className="w-4 h-4" />,
    'Three.js': <SiThreedotjs className="w-4 h-4" />,
    'React Three Fiber': <FiLayers className="w-4 h-4" />,
    Firebase: <SiFirebase className="w-4 h-4" />,
    'AI APIs': <FiCpu className="w-4 h-4" />,
    'REST APIs': <TbApi className="w-4 h-4" />,
    'Web APIs': <FiGlobe className="w-4 h-4" />,
    Git: <SiGit className="w-4 h-4" />,
    GitHub: <SiGithub className="w-4 h-4" />,
    Netlify: <SiNetlify className="w-4 h-4" />,
  };
  return icons[name] || <SiReact className="w-4 h-4" />;
}

function getColor(name: string) {
  const colors: Record<string, string> = {
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
  return colors[name] || '#22d3ee';
}
