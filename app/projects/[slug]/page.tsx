import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/project-utils';
import ProjectDetailClient from '@/components/project-detail/project-detail-client';
import { projects } from '@/data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = 'https://maniesta.netlify.app';
const PORTFOLIO_URL = 'https://usmanmurtaza.netlify.app';
const CREATOR_ID = `${PORTFOLIO_URL}/#person`;
const CREATOR_NAME = 'Usman Murtaza';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project does not exist.',
      robots: { index: false, follow: true },
    };
  }

  const thumbnailUrl = project.thumbnail.startsWith('http')
    ? project.thumbnail
    : `${SITE_URL}${project.thumbnail}`;

  const description = `${project.description} Created by ${CREATOR_NAME}.`;

  return {
    title: `${project.title} — by ${CREATOR_NAME}`,
    description,
    keywords: [
      project.title,
      'Maniesta',
      CREATOR_NAME,
      project.category,
      'web application',
      'React project',
      ...project.technologies,
    ],
    authors: [{ name: CREATOR_NAME, url: PORTFOLIO_URL }],
    creator: CREATOR_NAME,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | MANIESTA`,
      description,
      url: `${SITE_URL}/projects/${project.slug}`,
      type: 'website',
      siteName: 'MANIESTA',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} interface — created by ${CREATOR_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | MANIESTA`,
      description,
      images: [thumbnailUrl],
      creator: '@usman_murtazaa',
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const screenshotUrl =
    project.screenshots.length > 0
      ? project.screenshots[0].startsWith('http')
        ? project.screenshots[0]
        : `${SITE_URL}${project.screenshots[0]}`
      : `${SITE_URL}${project.thumbnail}`;

  const thumbnailUrl = project.thumbnail.startsWith('http')
    ? project.thumbnail
    : `${SITE_URL}${project.thumbnail}`;

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;

  /* Single @graph combining:
     - WebPage      → identity of this specific detail page
     - BreadcrumbList → Home → Projects → [Project]
     - SoftwareApplication → the actual product with author/creator
       pointing to the Person @id declared in layout.tsx. */
  const projectPageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${project.title} — by ${CREATOR_NAME}`,
        description: project.description,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${pageUrl}/#software` },
        breadcrumb: { '@id': `${pageUrl}/#breadcrumb` },
        primaryImageOfPage: { '@type': 'ImageObject', url: screenshotUrl },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${SITE_URL}/projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}/#software`,
        name: project.title,
        description: project.description,
        url: project.url,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        softwareVersion: '1.0',
        inLanguage: 'en',
        keywords: [project.title, project.category, ...project.technologies].join(', '),
        featureList: project.features,
        image: [screenshotUrl, thumbnailUrl],
        screenshot: screenshotUrl,
        author: { '@id': CREATOR_ID },
        creator: { '@id': CREATOR_ID },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectPageSchema) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
