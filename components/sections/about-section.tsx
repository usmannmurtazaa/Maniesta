'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/section-heading';
import { FiArrowRight, FiBox, FiGlobe, FiZap } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Maniesta"
      className="relative py-20 md:py-28 bg-[#0c0c14] overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 30%, transparent 70%)',
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

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="About Maniesta"
          title="Digital Products, Built with Purpose"
          description="A growing collection of practical digital products created around real problems, modern interfaces, and emerging technologies."
        />

        {/* Main glass card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl p-8 md:p-10 border border-white/10 space-y-8 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-purple-500/10"
        >
          {/* Gradient border */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(139,92,246,0.2), rgba(217,70,239,0.1))',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          <div className="relative z-10 space-y-6">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
              Who is behind Maniesta?
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              I&apos;m <span className="font-semibold text-white">Usman Murtaza</span>, a Computer
              Science student and web developer focused on building modern digital products and
              interactive web applications.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Through Maniesta, I build and showcase practical digital products across different
              areas: AI applications, productivity tools, education platforms, weather apps,
              calculators, real estate experiences, and other web‑based products.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              My work focuses on modern frontend development, responsive UI/UX, interactive
              experiences, AI integrations, and full‑stack web technologies using React, Next.js,
              TypeScript, Tailwind CSS, Firebase, APIs, Motion, and other modern tools depending on
              each project&apos;s requirements.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Maniesta is my digital product ecosystem, a place where I showcase applications and
              experiments that I&apos;ve designed, developed, and continuously improved.
            </p>
          </div>
        </motion.article>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            {
              icon: <FiZap className="w-6 h-6" />,
              title: 'AI-Powered',
              text: 'Intelligent features that enhance everyday tasks',
            },
            {
              icon: <FiBox className="w-6 h-6" />,
              title: 'Product-Focused',
              text: 'Practical tools built to solve real problems',
            },
            {
              icon: <FiGlobe className="w-6 h-6" />,
              title: 'Global Ready',
              text: 'Designed for users across different regions and use cases',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5"
            >
              <div className="text-blue-400 mb-3">{item.icon}</div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.text}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-500 via-purple-500 to-magenta-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Projects <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
