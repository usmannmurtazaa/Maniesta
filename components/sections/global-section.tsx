'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Globe from '@/components/global/globe-wrapper';
import { FiGlobe, FiZap, FiUsers } from 'react-icons/fi';

export default function GlobalSection() {
  return (
    <section
      id="global"
      aria-label="Global Reach"
      className="relative py-20 md:py-28 bg-[#0c0c14] overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Aurora blobs */}
        <div
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[70%] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
            animation: 'floatBlob 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            animation: 'floatBlob 10s ease-in-out infinite reverse',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="Global Reach"
          title="Built for a Global Audience."
          description="Maniesta is designed around digital experiences that can serve users across different regions, industries and use cases."
        />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold gradient-text">
              Global by Design
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Digital products can connect people, ideas and services across borders. Maniesta is
              built with a global perspective — from responsive interfaces to accessibility
              standards and performance optimization.
            </p>

            {/* Highlights */}
            <div className="space-y-3">
              {[
                { icon: <FiGlobe className="w-5 h-5" />, text: 'Responsive across every device' },
                { icon: <FiZap className="w-5 h-5" />, text: 'Optimised for performance' },
                { icon: <FiUsers className="w-5 h-5" />, text: 'Accessible to diverse audiences' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="text-blue-400 flex-shrink-0">{item.icon}</span>
                  <span className="text-sm md:text-base">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 pt-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                aria-hidden="true"
              />
              <span>Live globe rendering — interactive 3D visualization</span>
            </div>
          </motion.div>

          {/* Globe column with gradient border */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(139,92,246,0.2), rgba(217,70,239,0.1))',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              <div aria-label="Interactive 3D globe showing global reach" className="relative">
                <Globe className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatBlob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -40px) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
