'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiMail, FiLinkedin, FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = ['About', 'Projects', 'Technology', 'Global', 'Contact'];

  return (
    <footer className="relative py-12 bg-[#08080d] border-t border-white/5 overflow-hidden" aria-label="Footer">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="icon-glow w-10 h-10">
                <Image
                  src="/icon.png"
                  alt="Maniesta logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span
                className="text-2xl font-bold tracking-tight shimmer-text"
                style={{ fontFamily: 'Outfit, Inter, sans-serif' }}
              >
                MANIESTA
              </span>
            </motion.div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Digital products, applications and experiments built with modern technology.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-gray-500 hover:text-white text-sm bg-transparent border-none cursor-pointer transition-colors group flex items-center gap-1"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                  <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:maniesta01@gmail.com"
                className="text-gray-500 hover:text-teal-300 text-sm transition-colors inline-flex items-center gap-2 group"
              >
                <FiMail className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                maniesta01@gmail.com
              </a>
              {/* Portfolio link */}
              <a
                href="https://usmanmurtaza.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan text-sm transition-colors inline-flex items-center gap-2 group"
              >
                <FiExternalLink className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                Founder
              </a>
            </div>

            <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-2">Social</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/usmannmurtazaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-green-400 transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/usmannmurtazaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-sky-500 transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar with credit */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            © 2026 Maniesta. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Founder Of Maniesta:{' '}
            <a
              href="https://usmanmurtaza.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors underline underline-offset-2"
            >
              Usman Murtaza
            </a>
          </p>
          <button
            onClick={() => scrollTo('hero')}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1"
          >
            Back to top <span aria-hidden>↑</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .icon-glow {
          animation: iconPulse 4s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%, 100% {
            filter: drop-shadow(0 0 2px #22d3ee) drop-shadow(0 0 4px #3b82f6) drop-shadow(0 0 8px #8b5cf6);
          }
          50% {
            filter: drop-shadow(0 0 4px #22d3ee) drop-shadow(0 0 8px #3b82f6) drop-shadow(0 0 16px #8b5cf6);
          }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #22d3ee, #8b5cf6, #d946ef, #22d3ee);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: shimmer 5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </footer>
  );
}