import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Chauffeur Services Australia | Airport, Corporate & Luxury Transfers',
  description: 'Explore executive chauffeur services across Australia. Premium airport pickups, corporate travel accounts, as-directed hourly hire, roadshows, wedding car hire, and FBO transfers in Sydney, Melbourne, Brisbane, and Perth.',
  keywords: [
    'chauffeur services australia',
    'luxury chauffeur services',
    'executive car hire australia',
    'airport transfers australia',
    'corporate chauffeur australia',
    'wedding car hire australia',
    'hourly chauffeur hire',
    'fbo transfers australia',
    'interstate transfers australia'
  ],
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    title: 'Chauffeur Services Australia | Airport, Corporate & Luxury Transfers',
    description: 'Explore executive chauffeur services across Australia. Premium airport pickups, corporate travel accounts, as-directed hourly hire, roadshows, wedding car hire, and FBO transfers.',
    url: `${BASE_URL}/services`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/professional.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Chauffeur Services Directory',
      },
    ],
  },
};

export default function ServicesPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <ServicesClient />
    </>
  );
}
