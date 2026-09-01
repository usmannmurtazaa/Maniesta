'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import WavyBackground from '@/components/ui/wavy-background';
import LampContainer from '@/components/ui/lamp';
import TextHoverEffect from '@/components/ui/text-hover-effect';
import SparklesCore from '@/components/ui/sparkles';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';
import AnimatedButton from '@/components/ui/animated-button';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 10,
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <WavyBackground
        colors={['#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef']}
        blur={20}
        speed="slow"
        waveOpacity={0.35}
        className="opacity-70"
      />

      <DottedGlowBackground className="opacity-40" />

      <div
        className="relative z-10 text-center px-4"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.4}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <LampContainer>
          <div className="mb-[-10px]">
            <TextHoverEffect text="MANIESTA" />
          </div>
        </LampContainer>

        <SparklesCore
          className="w-64 h-16 mx-auto mt-4"
          particleColor="#8b5cf6"
          particleDensity={25}
          minSize={0.3}
          maxSize={1.2}
          speed={0.6}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-2xl md:text-3xl font-semibold mt-6 text-white/80 tracking-tight"
        >
          Digital Products. <span className="gradient-text">Intelligent Experiences.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-white/55 leading-relaxed"
        >
          Maniesta is a collection of modern applications and digital products built across AI,
          productivity, education, utilities, weather, entertainment and business solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton onClick={() => scrollTo('projects')}>
            Explore Projects <span>→</span>
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={() => scrollTo('technology')}>
            View Technology
          </AnimatedButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/40 text-xs tracking-[0.15em] uppercase text-center"
        >
          Scroll to explore
          <div className="w-[1px] h-[30px] bg-white/30 mx-auto mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}