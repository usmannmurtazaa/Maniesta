'use client';

import { useMemo, Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/project-card';
import ProjectFilter from '@/components/projects/project-filter';
import SectionHeading from '@/components/ui/section-heading';

const HeroParallax = lazy(() => import('@/components/projects/hero-parallax'));

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 bg-[#0a0a12]"
      style={{ position: 'relative' }}
    >
      <div
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        style={{ position: 'relative' }}
      >
        <SectionHeading
          label="The Collection"
          title="Built to Solve Real Problems."
          description="Maniesta brings together a growing collection of applications built for productivity, education, AI, utilities, entertainment, business and everyday digital experiences."
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14"
          style={{ position: 'relative' }}
        >
          {[
            { value: '12+', label: 'Digital Products' },
            { value: 'Multiple', label: 'Technology Domains' },
            { value: 'AI', label: 'Powered Solutions' },
            { value: 'Global', label: 'Ready Experiences' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl glass glass-hover border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold font-display gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Filtered grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          style={{ position: 'relative' }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Parallax showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative' }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 text-center mb-6">
            Scroll Through the Ecosystem
          </p>
          <Suspense fallback={<div className="h-96" />}>
            <HeroParallax projects={projects} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
