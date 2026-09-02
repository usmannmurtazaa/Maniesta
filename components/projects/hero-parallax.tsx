'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Project } from '@/data/projects';
import ProjectCard from './project-card';

interface HeroParallaxProps {
  projects: Project[];
}

export default function HeroParallax({ projects }: HeroParallaxProps) {
  const firstRow = projects.slice(0, 5);
  const secondRow = projects.slice(5, 10);
  const thirdRow = projects.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [12, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.3, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-400, 80]), springConfig);

  return (
    <div
      ref={ref}
      className="relative h-[200vh] md:h-[300vh] py-20 md:py-40 overflow-x-hidden antialiased flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ position: 'relative' }}
    >
      <div className="max-w-7xl mx-auto py-16 md:py-32 px-4 w-full">
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          The Ultimate
          <br />
          Digital Product Ecosystem
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-6 text-white/60">
          Explore the collection of modern applications and experiments built with cutting‑edge
          technology.
        </p>
      </div>

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="w-full overflow-x-visible"
      >
        {/* Row 1 – reverse */}
        <motion.div
          className="flex flex-row-reverse gap-6 md:gap-10 mb-8 md:mb-16"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {firstRow.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[280px] md:w-[480px]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>

        {/* Row 2 – normal */}
        <motion.div
          className="flex gap-6 md:gap-10 mb-8 md:mb-16"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {secondRow.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[280px] md:w-[480px]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>

        {/* Row 3 – reverse */}
        <motion.div
          className="flex flex-row-reverse gap-6 md:gap-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {thirdRow.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[280px] md:w-[480px]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
