'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheckCircle, FiCode } from 'react-icons/fi';
import { Project } from '@/data/projects';
import Gallery from './gallery';

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0a0a0f] overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-8"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Title and description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">{project.title}</h1>
          <p className="text-lg text-gray-400 max-w-3xl">{project.description}</p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-500 via-purple-500 to-magenta-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
          >
            Live Demo <FiExternalLink className="w-4 h-4" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-glow-purple hover:-translate-y-0.5 transition-all"
            >
              GitHub <FiGithub className="w-4 h-4" />
            </a>
          )}
        </motion.div>

        {/* Featured preview with gradient border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mb-12"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(139,92,246,0.25), rgba(217,70,239,0.15))',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
            <Image
              src={project.thumbnail}
              alt={`${project.title} interface`}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Features and Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Features card */}
          <div className="relative p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div className="relative z-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold mb-4 text-white">
                <FiCheckCircle className="w-5 h-5 text-emerald-400" />
                Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech stack card */}
          <div className="relative p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.15))',
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div className="relative z-10">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold mb-4 text-white">
                <FiCode className="w-5 h-5 text-cyan-400" />
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200 hover:border-purple-500/30 hover:bg-purple-500/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Screenshots Gallery */}
        {project.screenshots.length > 0 && (
          <Gallery images={project.screenshots} altPrefix={project.title} />
        )}
      </div>
    </div>
  );
}
