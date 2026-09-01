'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Globe from '@/components/global/globe';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';

export default function GlobalSection() {
  return (
    <section id="global" className="relative py-20 md:py-28 bg-[#0c0c14]">
      <DottedGlowBackground className="opacity-15" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="Global Reach"
          title="Built for a Global Audience."
          description="Maniesta is designed around digital experiences that can serve users across different regions, industries and use cases."
        />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4 gradient-text">
              Global by Design
            </h3>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
              Digital products can connect people, ideas and services across borders. Maniesta is
              built with a global perspective — from responsive interfaces to accessibility
              standards and performance optimization.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Live globe rendering — interactive 3D visualization</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Globe className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}