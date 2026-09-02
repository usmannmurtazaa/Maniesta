import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block any internal API routes if you have them
      disallow: ['/api/'],
    },
    sitemap: 'https://maniesta.netlify.app/sitemap.xml',
    host: 'https://maniesta.netlify.app',
  };
}
