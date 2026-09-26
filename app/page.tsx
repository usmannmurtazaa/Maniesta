'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import TracingBeam from '@/components/ui/tracing-beam';

// Below-the-fold sections are dynamically imported for bundle splitting.
// SSR is enabled (no `ssr: false`) so their markup is included in the
// initial HTML response - required for search engine indexing.
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section'), {
  loading: () => <SectionSkeleton height="h-96" />,
});

const GlobalSection = dynamic(() => import('@/components/sections/global-section'), {
  loading: () => <SectionSkeleton height="h-96" />,
});

const TechnologySection = dynamic(() => import('@/components/sections/technology-section'), {
  loading: () => <SectionSkeleton height="h-64" />,
});

const AboutSection = dynamic(() => import('@/components/sections/about-section'), {
  loading: () => <SectionSkeleton height="h-64" />,
});

const ContactSection = dynamic(() => import('@/components/sections/contact-section'), {
  loading: () => <SectionSkeleton height="h-64" />,
});

// Lightweight skeleton shown only while a lazy chunk is streaming in.
// Hidden from screen readers; not part of the initial HTML for SSR'd content.
function SectionSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div
      className={`w-full ${height} bg-[#0a0a12] flex items-center justify-center`}
      aria-hidden="true"
    >
      <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <Navigation />

      <main>
        {/* Hero - above the fold, always server-rendered */}
        <section id="hero" aria-label="Introduction">
          <HeroSection />
        </section>

        {/* Projects - the flagship product list */}
        <section id="projects" aria-label="Maniesta products">
          <TracingBeam>
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <ProjectsSection />
            </Suspense>
          </TracingBeam>
        </section>

        {/* Global reach / stats / mission */}
        <section id="global" aria-label="Global reach and mission">
          <TracingBeam>
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <GlobalSection />
            </Suspense>
          </TracingBeam>
        </section>

        {/* Technology stack */}
        <section id="technology" aria-label="Technology stack">
          <TracingBeam>
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
              <TechnologySection />
            </Suspense>
          </TracingBeam>
        </section>

        {/* About - founder story */}
        <section id="about" aria-label="About Maniesta and its creator">
          <TracingBeam>
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
              <AboutSection />
            </Suspense>
          </TracingBeam>
        </section>

        {/* Contact */}
        <section id="contact" aria-label="Contact">
          <TracingBeam>
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
              <ContactSection />
            </Suspense>
          </TracingBeam>
        </section>
      </main>

      <Footer />
    </div>
  );
}
