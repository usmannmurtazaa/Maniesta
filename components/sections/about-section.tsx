'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#0c0c14]">
      <DottedGlowBackground className="opacity-15" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="The Vision"
          title="What is Maniesta?"
          description="Maniesta is a growing collection of digital products created around practical problems, modern interfaces and emerging technologies. The projects explore AI, productivity, education, utilities, entertainment, business and interactive web experiences."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 text-center border border-white/10"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
            Creator
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-white">
            Built by Usman Murtaza
          </h3>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Usman Murtaza is a computer science focused developer interested in software engineering, AI,
            modern web technologies, UI/UX and interactive digital experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
