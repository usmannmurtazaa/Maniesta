'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import GlobalSection from '@/components/sections/global-section';
import TechnologySection from '@/components/sections/technology-section';
import AboutSection from '@/components/sections/about-section';
import ContactSection from '@/components/sections/contact-section';
import TracingBeam from '@/components/ui/tracing-beam';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0f' }}>
      <Navigation />

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0f]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '3px solid rgba(139,92,246,0.2)',
                borderTopColor: '#8b5cf6',
                boxShadow: '0 0 30px rgba(139,92,246,0.3)',
              }}
            />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <HeroSection />
            <TracingBeam>
              <ProjectsSection />
            </TracingBeam>
            <TracingBeam>
              <GlobalSection />
            </TracingBeam>
            <TracingBeam>
              <TechnologySection />
            </TracingBeam>
            <TracingBeam>
              <AboutSection />
            </TracingBeam>
            <TracingBeam>
              <ContactSection />
            </TracingBeam>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}