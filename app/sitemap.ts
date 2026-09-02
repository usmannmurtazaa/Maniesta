import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maniesta.netlify.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
    images:
      project.screenshots.length > 0
        ? project.screenshots.map((screenshot) => ({
            url: `${baseUrl}${screenshot}`, // absolute URL
            title: project.title,
            caption: project.shortDescription || project.description,
          }))
        : undefined,
  }));

  return [...staticRoutes, ...projectRoutes];
}
