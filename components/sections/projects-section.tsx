'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import ProjectCard from '@/components/projects/project-card';
import ProjectFilter from '@/components/projects/project-filter';
import HeroParallax from '@/components/projects/hero-parallax';
import SectionHeading from '@/components/ui/section-heading';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-[#0a0a12]">
      <DottedGlowBackground className="opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
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
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Parallax rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 text-center mb-6">
            Scroll Through the Ecosystem
          </p>
          <HeroParallax projects={projects} />
        </motion.div>
      </div>
    </section>
  );
}
