'use client';

import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';
import SparklesCore from '@/components/ui/sparkles';
import AnimatedButton from '@/components/ui/animated-button';

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-20 md:py-28 bg-[#0a0a12] overflow-hidden"
    >
      <DottedGlowBackground className="opacity-25" />
      <SparklesCore
        className="w-full h-40 absolute inset-0"
        particleColor="#8b5cf6"
        particleDensity={15}
        minSize={0.3}
        maxSize={1}
        speed={0.4}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3"
        >
          Let&apos;s Connect
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Let&apos;s Build Something.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-xl mx-auto mb-10"
        >
          Have an idea, project or collaboration in mind? I&apos;m interested in building useful
          digital products, exploring modern technologies and working on interesting ideas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton
            href="mailto:maniesta01@gmail.com"
            className="inline-flex items-center gap-2"
            ariaLabel="Email Me"
          >
            <FiMail className="w-5 h-5" />
            Email Me
          </AnimatedButton>
          <AnimatedButton
            href="https://github.com/usmannmurtazaa"
            className="inline-flex items-center gap-2"
            variant="secondary"
            ariaLabel="GitHub Profile"
          >
            <FiGithub className="w-5 h-5" />
            GitHub
          </AnimatedButton>
          <AnimatedButton
            href="https://www.linkedin.com/in/usmannmurtazaa"
            className="inline-flex items-center gap-2"
            variant="secondary"
            ariaLabel="LinkedIn Profile"
          >
            <FiLinkedin className="w-5 h-5" />
            LinkedIn
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}