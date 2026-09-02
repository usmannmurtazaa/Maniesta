'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { Project } from '@/data/projects';
import Gallery from './gallery';

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <FiArrowLeft /> Back to Projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-gray-400 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Live Demo <FiExternalLink className="ml-2" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub <FiGithub className="ml-2" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Featured Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10"
        >
          <Image
            src={project.thumbnail}
            alt={`${project.title} interface`}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">→</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Screenshots Gallery */}
        {project.screenshots.length > 0 && (
          <Gallery images={project.screenshots} altPrefix={project.title} />
        )}
      </div>
    </div>
  );
}
