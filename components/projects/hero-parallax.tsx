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

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 100]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ position: 'relative' }} // explicit inline position to ensure Framer Motion calculates correctly
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold text-white">
          The Ultimate
          <br />
          Digital Product Ecosystem
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 text-white/60">
          Explore the collection of modern applications and experiments built with cutting‑edge
          technology.
        </p>
      </div>

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[20rem] md:w-[30rem]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[20rem] md:w-[30rem]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[20rem] md:w-[30rem]"
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