'use client';

import dynamic from 'next/dynamic';
import { Component, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlobeWrapperProps {
  className?: string;
}

// Simple error boundary to gracefully handle WebGL failures
class GlobeErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[400px] rounded-3xl border border-white/10 bg-gray-900/50 flex flex-col items-center justify-center text-gray-400">
          <svg
            className="w-10 h-10 mb-3 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zM12 8v4m0 4h.01"
            />
          </svg>
          Interactive globe unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

const ThreeGlobe = dynamic(() => import('./three-globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10 bg-gray-900/50 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function GlobeWrapper({ className }: GlobeWrapperProps) {
  return (
    <div className={cn('relative', className)}>
      <GlobeErrorBoundary>
        <ThreeGlobe className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10" />
      </GlobeErrorBoundary>
    </div>
  );
}
