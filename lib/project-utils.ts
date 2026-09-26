import { projects, Project } from '@/data/projects';

/**
 * Find a project by its slug.
 * Used by the [slug] route and by anyone linking directly to a project.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get only projects marked as featured.
 * Used by the homepage / projects page for the "featured" grid.
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Get projects filtered by category.
 * Pass "All" to return every project.
 *
 * The match is case-insensitive and uses substring matching, so a filter
 * value of "ai" will match "AI / Productivity", "AI / Career", and
 * "AI / Travel". This is intentional: it lets the URL query param be
 * user-friendly without requiring exact category strings.
 */
export function getProjectsByCategory(category: string): Project[] {
  if (!category || category === 'All') return projects;
  const needle = category.toLowerCase();
  return projects.filter((p) => p.category.toLowerCase().includes(needle));
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
 * Get all project slugs — used by generateStaticParams and sitemap.
 */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
