'use client';

import { motion } from 'framer-motion';
import AnimatedButton from '@/components/ui/animated-button';
import SparklesCore from '@/components/ui/sparkles';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';

export default function FinalCTASection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#0a0a12] overflow-hidden">
      <DottedGlowBackground className="opacity-25" />
      <SparklesCore
        className="w-full h-40 absolute inset-0"
        particleColor="#8b5cf6"
        particleDensity={15}
        minSize={0.3}
        maxSize={1}
        speed={0.4}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-5"
        >
          Explore the <span className="gradient-text">Maniesta Ecosystem.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto"
        >
          Explore the applications, experiments and digital products built under Maniesta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AnimatedButton onClick={() => scrollTo('projects')}>
            Explore Projects <span>→</span>
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            href="https://Usmanmurtaza.netlify.app/"
          >
            Usman Murtaza
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}