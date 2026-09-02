import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/project-utils';
import ProjectDetailClient from '@/components/project-detail/project-detail-client';
import { projects } from '@/data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

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

  const baseUrl = 'https://maniesta.netlify.app';
  const thumbnailUrl = project.thumbnail.startsWith('http')
    ? project.thumbnail
    : `${baseUrl}${project.thumbnail}`;

  return {
    title: project.title,
    description: project.description,
    keywords: [project.category, ...project.technologies],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `MANIESTA | ${project.title}`,
      description: project.description,
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: thumbnailUrl, alt: `${project.title} interface` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `MANIESTA | ${project.title}`,
      description: project.description,
      images: [thumbnailUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const baseUrl = 'https://maniesta.netlify.app';
  const screenshotUrl =
    project.screenshots.length > 0
      ? project.screenshots[0].startsWith('http')
        ? project.screenshots[0]
        : `${baseUrl}${project.screenshots[0]}`
      : `${baseUrl}${project.thumbnail}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${baseUrl}/projects/${project.slug}`,
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: project.url,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    screenshot: screenshotUrl,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}