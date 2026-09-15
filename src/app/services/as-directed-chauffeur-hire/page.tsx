import type { Metadata } from 'next';
import AsDirectedClient from './AsDirectedClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'As-Directed Hourly Chauffeur Hire Australia | Mercedes & BMW | Elite Cars Australia',
  description: 'Book as-directed hourly chauffeur hire in Sydney, Melbourne, Brisbane, and Perth. Standby executive car and driver for multi-stop meetings, dynamic VIP schedules, and corporate itineraries.',
  keywords: [
    'as directed chauffeur hire',
    'hourly chauffeur sydney',
    'hourly chauffeur hire melbourne',
    'private driver by the hour',
    'executive car standby australia',
    'luxury car hire with driver hourly',
    'standby chauffeur hire brisbane'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/as-directed-chauffeur-hire`,
  },
  openGraph: {
    title: 'As-Directed Hourly Chauffeur Hire Australia | Elite Cars Australia',
    description: 'Flexible hourly chauffeur hire across Australia. Dedicated luxury vehicle and driver on standby for multi-stop executive meetings.',
    url: `${BASE_URL}/services/as-directed-chauffeur-hire`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/privateTour.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia As-Directed Hourly Chauffeur Hire',
      },
    ],
  },
};

export default function AsDirectedPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'As-Directed Chauffeur Hire', url: '/services/as-directed-chauffeur-hire' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'As-Directed Chauffeur Hire',
    description: 'Flexible hourly luxury chauffeur hire with vehicle and professional driver on standby for multi-stop business meetings and dynamic executive schedules.',
    url: '/services/as-directed-chauffeur-hire',
    image: '/Services/privateTour.jpg',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <AsDirectedClient />
    </>
  );
}
