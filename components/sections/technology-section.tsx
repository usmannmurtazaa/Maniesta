'use client';

import { motion } from 'framer-motion';
import { technologies } from '@/data/technologies';
import SectionHeading from '@/components/ui/section-heading';
import TechCard from '@/components/technology/tech-card';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';

export default function TechnologySection() {
  return (
    <section id="technology" className="relative py-20 md:py-28 bg-[#0a0a12]">
      <DottedGlowBackground className="opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="Modern Stack"
          title="Technology Behind Maniesta"
          description="Every product is built with modern, production-grade technologies chosen for performance, scalability and user experience."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-5 gap-4"
        >
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} name={tech.name} index={i} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          And more — the stack evolves with each new product.
        </motion.p>
      </div>
    </section>
  );
}
