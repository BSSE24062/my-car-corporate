import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove X-Powered-By header — unnecessary and reveals tech stack
  poweredByHeader: false,

  // Enable gzip compression for better Core Web Vitals
  compress: true,

  // Image CDN & modern AVIF/WebP optimization settings (Next.js 16)
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    minimumCacheTTL: 2678400, // 31 days cache TTL
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/staticmap/**',
      },
    ],
  },

  // SEO, caching & security headers applied to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Long-lived browser & CDN caching for static assets if fallback is used
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Ensure LLM discoverability files have correct content type
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
