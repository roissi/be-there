// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

const base = 'https://bethere.cyrildegraeve.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/en`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/fr`, changeFrequency: 'weekly', priority: 0.9 },

    { url: `${base}/movie2024`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/movie2025`, changeFrequency: 'weekly', priority: 0.6 },
  ];
}
