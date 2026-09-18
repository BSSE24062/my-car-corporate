import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo-schema';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Primary search engine crawlers ──
      {
        userAgent: '*',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Applebot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Yandex',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },

      // ── AI / LLM crawlers — explicitly allowed for maximum discoverability ──
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'cohere-ai',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Bytespider',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'meta-externalagent',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
