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
  /* Icon set produced by the favicon generator.
     - favicon.ico → legacy browsers
     - favicon-96x96.png → high-res PNG for desktop
     - favicon.svg → modern browsers (Chrome, Firefox, Edge, Safari 14+)
     - apple-touch-icon.png → iOS home screen
     - web-app-manifest-*.png → Android install prompt (also referenced in manifest.json) */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'icon', url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  /* Google Search Console verification. Next.js renders this as:
     <meta name="google-site-verification" content="..." /> in the <head>. */
  verification: {
    google: '8tNUALDy2r2_UlsW_1cTKj2dwBiSn_0urgZbIVqXFcM',
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
  logo: 'https://maniesta.netlify.app/web-app-manifest-512x512.png',
  founder: {
    '@type': 'Person',
    name: 'Usman Murtaza',
    url: 'https://usmanmurtaza.netlify.app',
  },
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