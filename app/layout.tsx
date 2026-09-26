import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

const SITE_URL = 'https://maniesta.netlify.app';
const CREATOR_URL = 'https://usmanmurtaza.netlify.app';
const SITE_NAME = 'Maniesta';
const CREATOR_NAME = 'Usman Murtaza';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} by ${CREATOR_NAME} | Digital Products & Web Apps`,
    template: `%s | ${SITE_NAME} by ${CREATOR_NAME}`,
  },
  description: `${SITE_NAME} is a digital product ecosystem created by ${CREATOR_NAME} - featuring AI applications, productivity tools, education platforms, utilities, and interactive web experiences built with React, Next.js, and modern web technologies.`,
  keywords: [
    'Maniesta',
    'Maniesta by Usman Murtaza',
    'Usman Murtaza',
    'Usman Murtaza developer',
    'digital products',
    'web applications',
    'React developer',
    'Next.js developer',
    'Full Stack Developer',
    'AI applications',
    'productivity tools',
    'education platforms',
    'web utilities',
    'Pakistan developer',
    'Karachi developer',
  ],
  authors: [{ name: CREATOR_NAME, url: CREATOR_URL }],
  creator: CREATOR_NAME,
  publisher: SITE_NAME,
  category: 'Technology',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
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
  verification: {
    google: '8tNUALDy2r2_UlsW_1cTKj2dwBiSn_0urgZbIVqXFcM',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: `${SITE_NAME} by ${CREATOR_NAME} | Digital Products & Web Apps`,
    description: `A collection of modern applications and digital products created by ${CREATOR_NAME} - spanning AI, productivity, education, utilities, weather, entertainment, and business solutions.`,
    url: SITE_URL,
    images: [
      {
        url: '/images/maniesta-og.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Digital products by ${CREATOR_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} by ${CREATOR_NAME} | Digital Products & Web Apps`,
    description: `A collection of modern digital products and web applications created by ${CREATOR_NAME}.`,
    images: ['/images/maniesta-og.png'],
    creator: '@usman_murtazaa',
    site: '@usman_murtazaa',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

/* ------------------------------------------------------------------ */
/* Structured Data                                                     */
/* ------------------------------------------------------------------ */

const PERSON_ID = `${CREATOR_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    /* WebSite - the site itself */
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: `A collection of modern digital products, AI applications, productivity tools, education platforms, utilities, and interactive web experiences created by ${CREATOR_NAME}.`,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/projects?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    /* Organization - Maniesta, with Usman Murtaza as founder */
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      alternateName: 'Maniesta Ecosystem',
      url: SITE_URL,
      description: `${SITE_NAME} is a digital product ecosystem created by ${CREATOR_NAME}, featuring web applications across education, productivity, AI, utilities, and business tools.`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
      },
      founder: { '@id': PERSON_ID },
      foundingDate: '2025',
      foundingLocation: {
        '@type': 'Place',
        name: 'Karachi, Pakistan',
      },
      sameAs: [
        'https://github.com/Usmannmurtazaa',
        'https://www.linkedin.com/in/Usmannmurtazaa/',
        'https://twitter.com/usman_murtazaa',
        'https://dev.to/usmanmurtaza',
      ],
    },

    /* Person - Usman Murtaza, the creator */
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: CREATOR_NAME,
      givenName: 'Usman',
      familyName: 'Murtaza',
      jobTitle: 'Full Stack Developer',
      url: CREATOR_URL,
      description: `Full Stack Developer and creator of the ${SITE_NAME} ecosystem - building modern, responsive web applications with React, Next.js, JavaScript, Node.js, and TypeScript.`,
      image: `${CREATOR_URL}/og-image.jpg`,
      worksFor: { '@id': ORG_ID },
      mainEntityOfPage: { '@id': WEBSITE_ID },
      sameAs: [
        'https://github.com/Usmannmurtazaa',
        'https://www.linkedin.com/in/Usmannmurtazaa/',
        'https://twitter.com/usman_murtazaa',
        'https://dev.to/usmanmurtaza',
        'https://usmanmurtaza.netlify.app',
      ],
      knowsAbout: [
        'React.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Express.js',
        'Firebase',
        'MongoDB',
        'PostgreSQL',
        'Tailwind CSS',
        'Full Stack Development',
        'Web Development',
        'UI/UX Design',
        'AI Integration',
      ],
    },

    /* ItemList - every Maniesta product, authored by the Person */
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#products`,
      name: `${SITE_NAME} Products - created by ${CREATOR_NAME}`,
      description: `A catalog of the digital products and web applications in the ${SITE_NAME} ecosystem, all created by ${CREATOR_NAME}.`,
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          position: 1,
          name: 'Maniesta Campus',
          description:
            'Role-based campus management system with separate dashboards for admins, faculty, and students.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://maniestacampus.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 2,
          name: 'Maniesta Resume AI',
          description:
            'AI-powered resume builder with ATS optimisation, daily job matching, and a modern admin dashboard.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://maniestaresumeai.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 3,
          name: 'Maniesta Suite',
          description:
            'Full-stack SaaS calculator platform with GPA, CGPA, scientific, and standard calculators.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          url: 'https://maniestasuite.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 4,
          name: 'Maniesta Notes',
          description:
            'Modern full-stack notes and productivity app with auth, real-time sync, tags, favourites, and dark mode.',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web',
          url: 'https://maniestanotes.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 5,
          name: 'Maniesta Weather',
          description:
            'Responsive real-time weather dashboard with location search, forecasts, and air quality data.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          url: 'https://maniestaweather.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 6,
          name: 'Maniesta Play',
          description:
            'Responsive music discovery and listening app with search, playlists, favourites, and a global audio player.',
          applicationCategory: 'EntertainmentApplication',
          operatingSystem: 'Web',
          url: 'https://maniestaplay.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 7,
          name: 'Maniesta AI Travel Planner',
          description:
            'AI-powered travel planner with Gemini AI itinerary generation, weather, and interactive maps.',
          applicationCategory: 'TravelApplication',
          operatingSystem: 'Web',
          url: 'https://maniestatravel.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 8,
          name: 'Maniesta Label',
          description:
            'Premium fashion e-commerce storefront for a Pakistan-based fashion house, with cart, wishlist, filters, and PWA support.',
          applicationCategory: 'ShoppingApplication',
          operatingSystem: 'Web',
          url: 'https://maniesta-label.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 9,
          name: 'Maniesta Veyra',
          description:
            'Premium clothing e-commerce platform with custom print studio, built with Next.js, Prisma, and PostgreSQL.',
          applicationCategory: 'ShoppingApplication',
          operatingSystem: 'Web',
          url: 'https://maniesta-veyra.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 10,
          name: 'Maniesta School ERP',
          description:
            'Modern school ERP dashboard with role-based auth, multi-portal dashboards, and CRUD for students, attendance, events, notices, and fees.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://maniesta-school.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 11,
          name: 'Maniesta One',
          description:
            'Premium responsive product landing page with modern UI, scroll animations, and interactive product showcases.',
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          url: 'https://maniestaone.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
        {
          '@type': 'SoftwareApplication',
          position: 12,
          name: 'Maniesta Digital',
          description:
            'Premium software company website for Maniesta Digital - a founder-led digital solutions firm.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://maniestadigital.netlify.app/',
          author: { '@id': PERSON_ID },
          creator: { '@id': PERSON_ID },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#0a0a0f] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers>{children}</Providers>
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
