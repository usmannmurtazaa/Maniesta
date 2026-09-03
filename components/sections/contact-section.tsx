'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import SparklesCore from '@/components/ui/sparkles';

function ContactButton({
  href,
  icon,
  label,
  variant = 'outline',
  hoverColor = '#22d3ee', // default cyan
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: 'solid' | 'outline';
  hoverColor?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClasses =
    variant === 'solid'
      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-magenta-500 text-white shadow-lg shadow-purple-500/30'
      : 'bg-white/5 border border-white/10 text-white backdrop-blur-md';

  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${buttonClasses}`}
    >
      <span
        style={{ color: isHovered ? hoverColor : undefined }}
        className="transition-colors duration-300"
      >
        {icon}
      </span>
      <span
        style={{ color: isHovered ? hoverColor : undefined }}
        className="transition-colors duration-300"
      >
        {label}
      </span>
      <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-20 md:py-28 bg-[#0a0a12] overflow-hidden"
    >
      {/* Enhanced multi-layer background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
            animation: 'auroraFloat 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
            animation: 'auroraFloat 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Sparkles in upper area */}
      <div className="absolute inset-x-0 top-0 h-56 pointer-events-none z-0">
        <SparklesCore
          className="w-full h-full"
          particleColor="#8b5cf6"
          particleDensity={20}
          minSize={0.9}
          maxSize={1.9}
          speed={0.9}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold tracking-[0.15em] uppercase text-purple-300 mb-5"
          >
            <FiMessageCircle className="w-4 h-4" />
            Let&apos;s Connect
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 gradient-text"
          >
            Let&apos;s Build Something.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg"
          >
            Have an idea, project or collaboration in mind? I&apos;m interested in building useful
            digital products, exploring modern technologies and working on interesting ideas.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10">
            {/* Gradient border */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(139,92,246,0.25), rgba(217,70,239,0.15))',
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <p className="text-sm text-gray-300 font-medium">Reach out through any channel</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <ContactButton
                  href="mailto:maniesta01@gmail.com"
                  icon={<FiMail className="w-5 h-5" />}
                  label="Email Me"
                  variant="solid"
                  hoverColor="#22d3ee" // cyan
                />
                <ContactButton
                  href="https://github.com/usmannmurtazaa"
                  icon={<FiGithub className="w-5 h-5" />}
                  label="GitHub"
                  variant="outline"
                  hoverColor="#34d399" // emerald
                />
                <ContactButton
                  href="https://www.linkedin.com/in/usmannmurtazaa"
                  icon={<FiLinkedin className="w-5 h-5" />}
                  label="LinkedIn"
                  variant="outline"
                  hoverColor="#60a5fa" // blue
                />
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-2" />

              <p className="text-xs text-gray-500">Typically responds within 1–2 business days</p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes auroraFloat {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -30px) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}