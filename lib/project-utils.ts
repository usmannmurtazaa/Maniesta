import { projects, Project } from '@/data/projects';

/**
 * Find a project by its slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get only projects marked as featured.
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Get projects filtered by category.
 * Pass "All" to return every project.
 * Supports partial matching (e.g., "AI" matches "AI / Productivity").
 */
export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category.includes(category));
}

/**
 * Get all unique categories from the project list.
 * Useful for filter pills.
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  projects.forEach((p) => categories.add(p.category));
  return Array.from(categories);
}

/**
 * Get all project slugs – useful for generateStaticParams or sitemap.
 */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}