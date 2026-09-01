'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'technology', label: 'Technology' },
  { id: 'global', label: 'Global' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[999] transition-all duration-300',
        scrolled ? 'py-3' : 'py-5',
        'backdrop-blur-xl bg-[#0a0a0f]/70 border-b border-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
          aria-label="MANIESTA home"
        >
          <span
            className="font-display text-xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #22d3ee, #8b5cf6, #d946ef)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MANIESTA
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative text-sm font-medium text-gray-400 hover:text-white bg-transparent border-none cursor-pointer transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('projects')}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer"
          >
            Explore
          </button>
        </div>

        <button
          className="md:hidden text-gray-300 bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-4 py-4 bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-gray-300 hover:text-white bg-transparent border-none cursor-pointer py-3 px-4 text-base font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('projects')}
                className="mt-3 px-5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer"
              >
                Explore Projects
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}