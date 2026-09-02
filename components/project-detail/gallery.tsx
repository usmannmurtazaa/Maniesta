'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps {
  images: string[];
  altPrefix: string;
}

export default function Gallery({ images, altPrefix }: GalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative rounded-lg overflow-hidden border border-white/10 hover:border-purple-500/40 transition"
          >
            <Image
              src={img}
              alt={`${altPrefix} screenshot ${i + 1}`}
              width={400}
              height={225}
              className="w-full h-auto object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(-1)}
          >
            <motion.img
              src={images[selected]}
              alt={`${altPrefix} large screenshot`}
              className="max-w-full max-h-full rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
