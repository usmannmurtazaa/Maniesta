'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

interface GlobeWrapperProps {
  className?: string;
}

const ThreeGlobe = dynamic(() => import('./three-globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10 bg-gray-900/50 animate-pulse" />
  ),
});

export default function GlobeWrapper({ className }: GlobeWrapperProps) {
  return <ThreeGlobe className={className} />;
}
