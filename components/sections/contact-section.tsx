'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { sendEmail } from '@/lib/emailjs';
import DottedGlowBackground from '@/components/ui/dotted-glow-background';
import SparklesCore from '@/components/ui/sparkles';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const result = await sendEmail(formData);
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#0a0a12] overflow-hidden">
      <DottedGlowBackground className="opacity-25" />
      <SparklesCore
        className="w-full h-40 absolute inset-0"
        particleColor="#8b5cf6"
        particleDensity={15}
        minSize={0.3}
        maxSize={1}
        speed={0.4}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Let&apos;s Build Something.</h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Have an idea, project or collaboration in mind? I&apos;m interested in building useful
            digital products and exploring modern technologies.
          </p>
        </motion.div>

        {/* Social / Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="mailto:maniesta01@gmail.com"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiMail className="w-5 h-5" />
            Email Me
          </a>
          <a
            href="https://github.com/usmannmurtazaa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiGithub className="w-5 h-5" />
            GitHub
          </a>
          {/* LinkedIn (uncomment when URL is available) */}
          {/* <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiLinkedin className="w-5 h-5" />
            LinkedIn
          </a> */}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 md:p-8 max-w-lg mx-auto"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : status === 'success' ? (
                <FiCheckCircle className="w-5 h-5" />
              ) : (
                <FiSend className="w-5 h-5" />
              )}
              {status === 'sending'
                ? 'Sending...'
                : status === 'success'
                  ? 'Sent!'
                  : 'Send Message'}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-3">Something went wrong. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
