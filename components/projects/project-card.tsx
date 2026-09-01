'use client';

import { Project } from '@/data/projects';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const handleClick = () => {
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardBody className="hover:border-purple-500/40 hover:shadow-glow-combined">
        <CardItem translateZ={20}>
          <div
            className="relative h-48 overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.colors[0]}25, ${project.colors[1]}20, ${project.colors[2]}15)`,
            }}
          >
            <span
              className="text-5xl font-bold text-white/90 font-display"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              {project.title.charAt(0)}
            </span>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
              <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
                {project.category}
              </span>
              <span className="text-xs text-white/50">↗</span>
            </div>
          </div>
        </CardItem>

        <CardItem translateZ={40} className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <span className="text-xs font-semibold uppercase text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            {project.description.slice(0, 90)}...
          </p>
        </CardItem>

        <CardItem translateZ={50} className="px-5 pb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-white/60 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </CardItem>

        <CardItem translateZ={60} className="px-5 pb-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.link, '_blank', 'noopener,noreferrer');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500/60 to-purple-500/60 hover:shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
          >
            View Project <span>→</span>
          </button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}