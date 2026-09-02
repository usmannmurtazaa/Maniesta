'use client';

import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="py-12 bg-[#08080d] border-t border-white/5" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              MANIESTA
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Digital products, applications and experiments built with modern technology.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              {['About', 'Projects', 'Technology', 'Global', 'Contact'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-gray-500 hover:text-gray-300 text-sm bg-transparent border-none cursor-pointer transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:maniesta01@gmail.com"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors inline-flex items-center gap-2"
              >
                <FiMail className="w-4 h-4" />
                maniesta01@gmail.com
              </a>
            </div>
            <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-2">Social</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/usmannmurtazaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/usmannmurtazaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">© 2026 Maniesta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}