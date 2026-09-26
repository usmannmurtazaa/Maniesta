import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-2">Page not found</p>
      <p className="text-sm text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Explore the Maniesta
        catalog or head back to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-500 via-purple-500 to-magenta-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
        >
          Return Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-purple-300 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10 transition-all"
        >
          Explore Projects
        </Link>
      </div>
    </div>
  );
}
