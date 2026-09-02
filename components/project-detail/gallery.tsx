'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface GalleryProps {
  images: string[];
  altPrefix: string;
}

export default function Gallery({ images, altPrefix }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            aria-label={`View ${altPrefix} screenshot ${i + 1}`}
            className="relative aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-purple-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 transition"
          >
            <Image
              src={img}
              alt={`${altPrefix} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && images[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="relative w-full max-w-5xl aspect-video">
              <Image
                src={images[selected]}
                alt={`${altPrefix} large screenshot`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close screenshot viewer"
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 rounded-full p-2 transition"
            >
              <FiX className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}