'use client';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="py-12 bg-[#08080d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3
              className="font-display text-xl font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #8b5cf6, #d946ef)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MANIESTA
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Digital Products and Interactive Experiences.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              {['Projects', 'Technology', 'Global', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-gray-500 hover:text-gray-300 text-sm bg-transparent border-none cursor-pointer transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Featured Projects</h4>
            <div className="flex flex-col gap-2">
              {['Resume AI', 'Maniesta Suite', 'Maniesta School', 'Zain Real Estate'].map((proj) => (
                <span key={proj} className="text-gray-500 text-sm">
                  {proj}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-600">© 2026 Maniesta. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              GitHub
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              LinkedIn
            </a>
            <a
              href="mailto:contact@maniesta.dev"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}