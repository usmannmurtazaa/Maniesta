'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/data/projects';
import ProjectCard from './project-card';

interface HeroParallaxProps {
  projects: Project[];
}

export default function HeroParallax({ projects }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const row1X = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const row2X = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const row3X = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [3, -2]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.7]);

  const row1 = projects.slice(0, 4);
  const row2 = projects.slice(4, 8);
  const row3 = projects.slice(8, 12);

  const renderRow = (items: Project[], xTransform: any, keyPrefix: string) => (
    <motion.div
      className="flex gap-5 mb-5"
      style={{ x: xTransform, transformStyle: 'preserve-3d' }}
    >
      {[...items, ...items].map((project, i) => (
        <div
          key={`${keyPrefix}-${project.id}-${i}`}
          className="flex-shrink-0 w-[300px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <ProjectCard project={project} index={i} />
        </div>
      ))}
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      className="relative py-16 overflow-hidden"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {renderRow(row1, row1X, 'row1')}
        {renderRow(row2, row2X, 'row2')}
        {renderRow(row3, row3X, 'row3')}
      </motion.div>
    </div>
  );
}