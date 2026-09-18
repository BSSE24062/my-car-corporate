import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo-schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/`,
          'en-US': `${BASE_URL}/`,
          'en-GB': `${BASE_URL}/`,
          'x-default': `${BASE_URL}/`,
        },
      },
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services`,
          'x-default': `${BASE_URL}/services`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/airport-transfers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/airport-transfers`,
          'x-default': `${BASE_URL}/services/airport-transfers`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/corporate-accounts`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/corporate-accounts`,
          'x-default': `${BASE_URL}/services/corporate-accounts`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/as-directed-chauffeur-hire`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/as-directed-chauffeur-hire`,
          'x-default': `${BASE_URL}/services/as-directed-chauffeur-hire`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/roadshows`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/roadshows`,
          'x-default': `${BASE_URL}/services/roadshows`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/events`,
          'x-default': `${BASE_URL}/services/events`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/weddings`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/weddings`,
          'x-default': `${BASE_URL}/services/weddings`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/private-aviation-fbo`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/private-aviation-fbo`,
          'x-default': `${BASE_URL}/services/private-aviation-fbo`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/interstate-transfers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-AU': `${BASE_URL}/services/interstate-transfers`,
          'x-default': `${BASE_URL}/services/interstate-transfers`,
        },
      },
    },
  ];
}
