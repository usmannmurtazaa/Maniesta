import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://maniesta.netlify.app'),
  title: {
    default: 'MANIESTA | Digital Products & Interactive Experiences',
    template: 'MANIESTA | %s',
  },
  description:
    'Explore Maniesta, a collection of modern digital products, AI applications, productivity tools, education platforms, utilities and interactive web experiences.',
  keywords: ['digital products', 'AI', 'web applications', 'Maniesta', 'developer'],
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MANIESTA',
    title: 'MANIESTA | Digital Products & Interactive Experiences',
    description:
      'A collection of modern applications and digital products built across AI, productivity, education, utilities, weather, entertainment and business solutions.',
    url: 'https://maniesta.netlify.app',
    images: [
      {
        url: '/images/maniesta-og.png',
        width: 1200,
        height: 630,
        alt: 'MANIESTA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANIESTA | Digital Products & Interactive Experiences',
    description:
      'Explore Maniesta, a collection of modern digital products, AI applications, productivity tools, education platforms, utilities and interactive web experiences.',
    images: ['/images/maniesta-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MANIESTA',
  url: 'https://maniesta.netlify.app',
  description:
    'A collection of modern digital products, AI applications, productivity tools, education platforms, utilities and interactive web experiences.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://maniesta.netlify.app/projects?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maniesta',
  url: 'https://maniesta.netlify.app',
  logo: 'https://maniesta.netlify.app/icon.png',
  sameAs: ['https://github.com/usmannmurtazaa', 'https://www.linkedin.com/in/usmannmurtazaa'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#0a0a0f] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Providers>{children}</Providers>
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
