'use client';

import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import TracingBeam from '@/components/ui/tracing-beam';

const ProjectsSection = lazy(() => import('@/components/sections/projects-section'));
const GlobalSection = lazy(() => import('@/components/sections/global-section'));
const TechnologySection = lazy(() => import('@/components/sections/technology-section'));
const AboutSection = lazy(() => import('@/components/sections/about-section'));
const ContactSection = lazy(() => import('@/components/sections/contact-section'));

function LazySection({
  children,
  placeholder,
}: {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{isVisible ? children : placeholder}</div>;
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

            <LazySection placeholder={<div className="h-64" />}>
              <TracingBeam>
                <Suspense fallback={<div className="h-96" />}>
                  <ProjectsSection />
                </Suspense>
              </TracingBeam>
            </LazySection>

            <LazySection placeholder={<div className="h-64" />}>
              <TracingBeam>
                <Suspense fallback={<div className="h-96" />}>
                  <GlobalSection />
                </Suspense>
              </TracingBeam>
            </LazySection>

            <LazySection placeholder={<div className="h-64" />}>
              <TracingBeam>
                <Suspense fallback={<div className="h-64" />}>
                  <TechnologySection />
                </Suspense>
              </TracingBeam>
            </LazySection>

            <LazySection placeholder={<div className="h-64" />}>
              <TracingBeam>
                <Suspense fallback={<div className="h-64" />}>
                  <AboutSection />
                </Suspense>
              </TracingBeam>
            </LazySection>

            <LazySection placeholder={<div className="h-64" />}>
              <TracingBeam>
                <Suspense fallback={<div className="h-64" />}>
                  <ContactSection />
                </Suspense>
              </TracingBeam>
            </LazySection>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}