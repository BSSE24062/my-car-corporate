import type { Metadata } from 'next';
import InterstateClient from './InterstateClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Interstate & Long-Distance Private Chauffeur Australia | Elite Cars Australia',
  description: 'Door-to-door long-distance private chauffeur transfers across Australia. Sydney to Canberra, Melbourne to regional Victoria, Brisbane to Gold Coast. No airport security queues or baggage delays.',
  keywords: [
    'interstate chauffeur australia',
    'sydney to canberra chauffeur',
    'long distance private car service',
    'regional chauffeur transfer nsw',
    'melbourne to geelong chauffeur',
    'brisbane to gold coast private driver',
    'interstate executive car hire'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/interstate-transfers`,
  },
  openGraph: {
    title: 'Interstate & Long-Distance Private Chauffeur Australia | Elite Cars Australia',
    description: 'Private long-distance chauffeured journeys connecting capital cities and regional commercial centres across Australia. Safe, comfortable, and productive.',
    url: `${BASE_URL}/services/interstate-transfers`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/oneDayTour.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Interstate and Long-Distance Transfers',
      },
    ],
  },
};

export default function InterstateTransfersPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Interstate & Long-Distance Transfers', url: '/services/interstate-transfers' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Interstate & Regional Chauffeur Transfers',
    description: 'Private, comfortable long-distance chauffeured transport connecting capital cities and regional commercial hubs throughout Australia with onboard Wi-Fi, power outlets, and executive quiet comfort.',
    url: '/services/interstate-transfers',
    image: '/Services/oneDayTour.jpg',
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
      <InterstateClient />
    </>
  );
}
