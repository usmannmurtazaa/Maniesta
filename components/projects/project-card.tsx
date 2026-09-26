'use client';

import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Project } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink, FiCpu, FiGlobe } from 'react-icons/fi';
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
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const techIconMap: Record<string, JSX.Element> = {
  React: <SiReact className="w-3 h-3" />,
  'Next.js': <SiNextdotjs className="w-3 h-3" />,
  TypeScript: <SiTypescript className="w-3 h-3" />,
  JavaScript: <SiJavascript className="w-3 h-3" />,
  'Tailwind CSS': <SiTailwindcss className="w-3 h-3" />,
  Motion: <SiFramer className="w-3 h-3" />,
  'Three.js': <SiThreedotjs className="w-3 h-3" />,
  Firebase: <SiFirebase className="w-3 h-3" />,
  'AI APIs': <FiCpu className="w-3 h-3" />,
  'REST APIs': <TbApi className="w-3 h-3" />,
  'Web APIs': <FiGlobe className="w-3 h-3" />,
  Git: <SiGit className="w-3 h-3" />,
  GitHub: <SiGithub className="w-3 h-3" />,
  Netlify: <SiNetlify className="w-3 h-3" />,
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const fallbackGradient = `linear-gradient(135deg, ${project.colors[0]}25, ${project.colors[1]}20, ${project.colors[2]}15)`;
  const detailHref = `/projects/${project.slug}`;

  return (
    <CardContainer>
      {/* Outer is a plain <div>. The primary link lives on the title and
          uses an `after:` pseudo-element to extend its hit area across
          the whole card - a common pattern that keeps the card fully
          clickable without nesting interactive elements. */}
      <CardBody className="relative hover:border-purple-500/40 hover:shadow-glow-combined">
        <CardItem translateZ={20}>
          <div className="relative h-48 overflow-hidden flex items-center justify-center">
            {!imageError ? (
              <Image
                src={project.thumbnail}
                alt={`${project.title} interface`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={project.featured}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: fallbackGradient }}
              >
                <span className="text-5xl font-bold text-white/90 font-display">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center z-10">
              <span className="text-xs font-semibold tracking-wider uppercase text-white/70 bg-black/30 px-2 py-1 rounded">
                {project.category}
              </span>
              <FiExternalLink className="w-4 h-4 text-white/50" aria-hidden="true" />
            </div>
          </div>
        </CardItem>

        <CardItem translateZ={40} className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              <Link
                href={detailHref}
                className="after:absolute after:inset-0 after:content-[''] hover:text-purple-300 transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-purple-400 focus-visible:underline-offset-4"
                aria-label={`View details about ${project.title}`}
              >
                {project.title}
              </Link>
            </h3>
            <span className="text-xs font-semibold uppercase text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            {project.shortDescription || project.description.slice(0, 90)}...
          </p>
        </CardItem>

        <CardItem translateZ={50} className="px-5 pb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-white/60 border border-white/10"
            >
              {techIconMap[tech] || null}
              {tech}
            </span>
          ))}
        </CardItem>

        {/* This CardItem sits above the extended link area so the "View
            Project" <a> remains independently clickable. */}
        <CardItem translateZ={60} className="relative z-10 px-5 pb-5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500/60 to-purple-500/60 hover:shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
            aria-label={`Open ${project.title} live project in a new tab`}
          >
            View Project <span aria-hidden>→</span>
          </a>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
