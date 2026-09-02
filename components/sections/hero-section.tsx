'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WavyBackground from '@/components/ui/wavy-background';
import LampContainer from '@/components/ui/lamp';
import TextHoverEffect from '@/components/ui/text-hover-effect';
import SparklesCore from '@/components/ui/sparkles';
import AnimatedButton from '@/components/ui/animated-button';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || prefersReducedMotion) return;
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
      className="relative flex flex-col items-center justify-between overflow-hidden min-h-[100svh] pt-24 pb-12 px-4"
      onMouseMove={handleMouseMove}
      aria-label="Hero"
    >
      <h1 className="sr-only">MANIESTA – Digital Products & Interactive Experiences</h1>

      {/* Background effects (z-index 0) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WavyBackground
          colors={['#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef']}
          blur={20}
          speed="slow"
          waveOpacity={0.9}
          verticalOffset={0.6} // 0.5 center, 0.3 upar shift
          className="opacity-70"
        />
      </div>

      {/* Main content – fills available vertical space and is centered */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl"
        style={{
          transform:
            isTouchDevice || prefersReducedMotion
              ? 'none'
              : `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.4}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Lamp – sits directly above MANIESTA */}
        <div className="w-full flex justify-center relative z-[5] -mb-6 md:-mb-10">
          <LampContainer className="h-32 md:h-40 w-full overflow-visible" />
        </div>

        {/* MANIESTA heading */}
        <div className="w-full flex justify-center relative z-10">
          <TextHoverEffect text="MANIESTA" className="w-[80%] md:w-[70%] max-w-[800px]" />
        </div>

        {/* Sparkles directly below MANIESTA */}
        <div className="w-full flex justify-center items-center relative z-10 -mt-2 md:-mt-4">
          <div className="w-[200px] h-[40px] sm:w-[280px] sm:h-[50px] md:w-[400px] md:h-[70px] relative overflow-hidden">
            <SparklesCore
              className="absolute inset-0"
              particleColor="#8b5cf6"
              particleDensity={isTouchDevice ? 25 : 45}
              minSize={2}
              maxSize={2}
              speed={prefersReducedMotion ? 0 : 0.6}
            />
          </div>
        </div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 md:mt-6 text-white/80 tracking-tight text-center"
        >
          Digital Products. <span className="gradient-text">Intelligent Experiences.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-3 md:mt-4 text-sm md:text-base lg:text-lg max-w-2xl mx-auto text-white/55 leading-relaxed text-center"
        >
          Maniesta is a collection of modern applications and digital products built across AI,
          productivity, education, utilities, weather, entertainment and business solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton onClick={() => scrollTo('projects')}>
            Explore Projects <span>→</span>
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={() => scrollTo('technology')}>
            View Technology
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Scroll indicator – now in normal flow at the bottom */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative z-10 mb-2 text-center"
        >
          <div className="text-white/40 text-xs tracking-[0.15em] uppercase mt-8">
            Scroll to explore
            <div className="w-[1px] h-[30px] bg-white/30 mx-auto mt-2" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
