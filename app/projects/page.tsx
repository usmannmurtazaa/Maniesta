import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/project-card';

const SITE_URL = 'https://maniesta.netlify.app';
const PORTFOLIO_URL = 'https://usmanmurtaza.netlify.app';
const CREATOR_ID = `${PORTFOLIO_URL}/#person`;

export const metadata: Metadata = {
  title: 'Projects — All Maniesta Products',
  description:
    'Explore the complete Maniesta catalog — digital products and web applications across AI, productivity, education, e-commerce, utilities, and more. All created by Usman Murtaza.',
  keywords: [
    'Maniesta projects',
    'Maniesta products',
    'digital products',
    'web applications',
    'React projects',
    'AI apps',
    'productivity tools',
    'education platforms',
    'Usman Murtaza projects',
  ],
  authors: [{ name: 'Usman Murtaza', url: PORTFOLIO_URL }],
  creator: 'Usman Murtaza',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    title: 'Projects — All Maniesta Products',
    description:
      'Explore the complete Maniesta catalog of digital products and web applications. Created by Usman Murtaza.',
    url: `${SITE_URL}/projects`,
    images: [
      {
        url: '/images/maniesta-og.png',
        width: 1200,
        height: 630,
        alt: 'MANIESTA — Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — All Maniesta Products',
    description: 'Explore the complete Maniesta catalog. Created by Usman Murtaza.',
    images: ['/images/maniesta-og.png'],
  },
};

/* Structured data: a CollectionPage wrapping a full ItemList of every
   project, plus a BreadcrumbList showing the Home → Projects hierarchy.
   Each SoftwareApplication lists Usman Murtaza as both author and
   creator via the Person @id declared in layout.tsx. */
const projectsPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/projects/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${SITE_URL}/projects`,
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/projects/#collection`,
      url: `${SITE_URL}/projects`,
      name: 'Projects — All Maniesta Products',
      description:
        'The complete catalog of digital products and web applications in the Maniesta ecosystem, all created by Usman Murtaza.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/projects/#breadcrumb` },
      inLanguage: 'en',
      mainEntity: {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/projects/#itemlist`,
        numberOfItems: projects.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: project.title,
            description: project.description,
            url: project.url,
            image: `${SITE_URL}${project.thumbnail}`,
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            author: { '@id': CREATOR_ID },
            creator: { '@id': CREATOR_ID },
          },
        })),
      },
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsPageSchema) }}
      />

      <div className="pt-24 pb-20 min-h-screen relative">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(59,130,246,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Breadcrumb — also mirrored in the JSON-LD above */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gray-300">
                Projects
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Projects — Created by{' '}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer author"
              className="gradient-text underline-offset-4 hover:underline"
            >
              Usman Murtaza
            </a>
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Discover the full collection of {projects.length} digital products, tools, and
            experiments built by Maniesta — across AI, productivity, education, e-commerce,
            utilities, and more. Part of the{' '}
            <Link
              href="/"
              className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline"
            >
              Maniesta ecosystem
            </Link>
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Bottom portfolio credit — the second crawlable link to the creator */}
          <p className="mt-16 text-center text-sm text-gray-500">
            All products are designed and developed by{' '}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer author"
              className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline"
            >
              Usman Murtaza
            </a>
            . See the full portfolio at{' '}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline"
            >
              usmanmurtaza.netlify.app
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
