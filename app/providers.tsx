'use client';

import { ReactNode, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
