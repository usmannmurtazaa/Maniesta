'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import TracingBeam from '@/components/ui/tracing-beam';

// Dynamically import heavy sections – loaded after initial render
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section'), {
  ssr: false,
  loading: () => <SectionSkeleton height="h-96" />,
});

const GlobalSection = dynamic(() => import('@/components/sections/global-section'), {
  ssr: false,
  loading: () => <SectionSkeleton height="h-96" />,
});

const TechnologySection = dynamic(() => import('@/components/sections/technology-section'), {
  ssr: false,
  loading: () => <SectionSkeleton height="h-64" />,
});

const AboutSection = dynamic(() => import('@/components/sections/about-section'), {
  ssr: false,
  loading: () => <SectionSkeleton height="h-64" />,
});

const ContactSection = dynamic(() => import('@/components/sections/contact-section'), {
  ssr: false,
  loading: () => <SectionSkeleton height="h-64" />,
});

// Simple skeleton placeholder to avoid layout shift
function SectionSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`w-full ${height} bg-[#0a0a12] flex items-center justify-center`}>
      <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f]" style={{ position: 'relative' }}>
      <Navigation />

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0f]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '40px',
                height: '40px',
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
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <HeroSection />

            <TracingBeam>
              <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <ProjectsSection />
              </Suspense>
            </TracingBeam>

            <TracingBeam>
              <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <GlobalSection />
              </Suspense>
            </TracingBeam>

            <TracingBeam>
              <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <TechnologySection />
              </Suspense>
            </TracingBeam>

            <TracingBeam>
              <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <AboutSection />
              </Suspense>
            </TracingBeam>

            <TracingBeam>
              <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <ContactSection />
              </Suspense>
            </TracingBeam>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}