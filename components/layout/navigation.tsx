'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://maniesta.netlify.app';

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'technology', label: 'Technology' },
  { id: 'global', label: 'Global' },
  { id: 'contact', label: 'Contact' },
];

/* SiteNavigationElement — tells Google which anchors on this page are
   primary navigation, and how they are grouped. Uses the same section
   IDs the actual <a href="#..."> links point at. */
const navigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  '@id': `${SITE_URL}/#primary-navigation`,
  name: 'Main navigation',
  hasPart: [
    { '@type': 'WebPageElement', name: 'Projects', url: `${SITE_URL}/#projects` },
    { '@type': 'WebPageElement', name: 'About', url: `${SITE_URL}/#about` },
    { '@type': 'WebPageElement', name: 'Technology', url: `${SITE_URL}/#technology` },
    { '@type': 'WebPageElement', name: 'Global', url: `${SITE_URL}/#global` },
    { '@type': 'WebPageElement', name: 'Contact', url: `${SITE_URL}/#contact` },
  ],
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      let currentSection = '';
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPosition) currentSection = item.id;
      });
      setActiveId(currentSection);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* Smooth-scroll helper. Kept as an onClick handler so JS-enabled users
     get the smooth scroll; JS-disabled visitors still jump via the
     real #anchor href on each link. */
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-[999] transition-all duration-300 backdrop-blur-xl bg-[#0a0a0f]/70 border-b border-white/5',
        scrolled ? 'py-3 shadow-lg shadow-black/20' : 'py-5'
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo — a real <a> so it links to the site root for crawlers. */}
        <motion.a
          href="/"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          aria-label="MANIESTA home"
        >
          <div className="icon-glow w-9 h-9">
            <Image
              src="/favicon-96x96.png"
              alt="Maniesta logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          <span
            className="text-xl md:text-2xl font-bold tracking-tight shimmer-text"
            style={{
              fontFamily: 'Outfit, Inter, sans-serif',
            }}
          >
            MANIESTA
          </span>
        </motion.a>

        {/* Desktop nav — real <a href> for each section. */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              className={cn(
                'relative text-sm font-medium transition-colors cursor-pointer',
                activeId === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-current={activeId === item.id ? 'page' : undefined}
            >
              {item.label}
              <motion.span
                className="absolute bottom-[-4px] left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: activeId === item.id ? '100%' : 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </motion.a>
          ))}
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('projects');
            }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(139,92,246,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
          </motion.a>
        </div>

        {/* Mobile hamburger — stays a button because it opens the menu,
            not navigates to a URL. That is correct HTML semantics. */}
        <motion.button
          type="button"
          className="md:hidden text-gray-300 bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </motion.button>
      </div>

      {/* Mobile menu — links become real <a href> so crawlers see them. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className={cn(
                    'text-left cursor-pointer py-3 px-4 text-base font-medium transition-colors rounded-lg block',
                    activeId === item.id
                      ? 'text-white bg-purple-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                  whileTap={{ scale: 0.98 }}
                  aria-current={activeId === item.id ? 'page' : undefined}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('projects');
                }}
                className="mt-3 px-5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 text-center"
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .icon-glow {
          animation: iconPulse 5s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%,
          100% {
            filter: drop-shadow(0 0 1px #22d3ee) drop-shadow(0 0 2px #3b82f6)
              drop-shadow(0 0 8px #8b5cf6);
          }
          50% {
            filter: drop-shadow(0 0 4px #22d3ee) drop-shadow(0 0 8px #3b82f6)
              drop-shadow(0 0 16px #8b5cf6);
          }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #22d3ee, #8b5cf6, #d946ef, #22d3ee);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </nav>
  );
}
