'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Maniesta"
      className="relative py-20 md:py-28 bg-[#0c0c14]"
    >
      <DottedGlowBackground className="opacity-15" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="About Maniesta"
          title="Digital Products, Built with Purpose"
          description="A growing collection of practical digital products created around real problems, modern interfaces, and emerging technologies."
        />

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 border border-white/10 space-y-6"
        >
          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-white">
              Who is behind Maniesta?
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              I'm <span className="font-semibold text-white">Usman Murtaza</span>, a Computer
              Science student and web developer focused on building modern digital products and
              interactive web applications.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-3">
              Through Maniesta, I build and showcase practical digital products across different
              areas: AI applications, productivity tools, education platforms, weather apps,
              calculators, real estate experiences, and other web‑based products.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-3">
              My work focuses on modern frontend development, responsive UI/UX, interactive
              experiences, AI integrations, and full‑stack web technologies using React, Next.js,
              TypeScript, Tailwind CSS, Firebase, APIs, Motion, and other modern tools depending on
              each project's requirements.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-3">
              Maniesta is my digital product ecosystem, a place where I showcase applications and
              experiments that I've designed, developed, and continuously improved.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
