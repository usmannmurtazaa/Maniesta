import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MANIESTA | Digital Products & Interactive Experiences',
  description:
    'Explore Maniesta, a collection of modern digital products, AI applications, productivity tools, education platforms, utilities and interactive web experiences.',
  openGraph: {
    title: 'MANIESTA | Digital Products & Interactive Experiences',
    description:
      'A collection of modern applications and digital products built across AI, productivity, education, utilities, weather, entertainment and business solutions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MANIESTA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANIESTA | Digital Products & Interactive Experiences',
    description:
      'Explore Maniesta, a collection of modern digital products, AI applications, productivity tools, education platforms, utilities and interactive web experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#0a0a0f] text-white antialiased">
        <Providers>{children}</Providers>
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}