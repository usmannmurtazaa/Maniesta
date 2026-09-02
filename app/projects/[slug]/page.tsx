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
    };
  }
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `MANIESTA | ${project.title}`,
      description: project.description,
      url: `https://maniesta.netlify.app/projects/${project.slug}`,
      images: [{ url: project.thumbnail, alt: `${project.title} interface` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `MANIESTA | ${project.title}`,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maniesta.netlify.app' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: 'https://maniesta.netlify.app/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://maniesta.netlify.app/projects/${project.slug}`,
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
    screenshot: project.screenshots[0] || project.thumbnail,
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
