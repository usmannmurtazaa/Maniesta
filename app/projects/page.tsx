import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/project-card';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore all digital products built by Maniesta across AI, productivity, education, utilities, entertainment, and more.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'MANIESTA | Projects',
    description: 'Explore all digital products built by Maniesta.',
    url: 'https://maniesta.netlify.app/projects',
    images: [{ url: '/images/maniesta-og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANIESTA | Projects',
    description: 'Explore all digital products built by Maniesta.',
    images: ['/images/maniesta-og.png'],
  },
};

const projectsListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: project.title,
      description: project.description,
      url: `https://maniesta.netlify.app/projects/${project.slug}`,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
    },
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListSchema) }}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Discover the full collection of digital products, tools, and experiments built by
            Maniesta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}