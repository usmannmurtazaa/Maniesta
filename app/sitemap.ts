import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const BASE_URL = 'https://maniesta.netlify.app';

/**
 * A single build-date used across all entries. Google treats a "recently
 * modified" flag on every route as low-confidence signal, so we use one
 * consistent date instead of `new Date()` repeated per entry. Update the
 * constant manually when the site content changes materially.
 */
const LAST_MODIFIED = new Date('2026-09-27');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
    // Defensive: screenshots may be missing on some entries.
    const screenshots = Array.isArray(project.screenshots) ? project.screenshots : [];
    const images =
      screenshots.length > 0
        ? screenshots.map((screenshot) =>
            screenshot.startsWith('http') ? screenshot : `${BASE_URL}${screenshot}`
          )
        : project.thumbnail
          ? [
              project.thumbnail.startsWith('http')
                ? project.thumbnail
                : `${BASE_URL}${project.thumbnail}`,
            ]
          : undefined;

    return {
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.6,
      images,
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
