import type { Metadata } from 'next';
import AirportTransfersClient from './AirportTransfersClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Airport Chauffeur Sydney, Melbourne, Brisbane & Perth | Elite Cars Australia',
  description: 'Book luxury airport chauffeur transfers nationwide. Punctual meet & greet, live flight tracking, and pristine Mercedes & BMW sedans and vans across Sydney, Melbourne, Brisbane, and Perth airports.',
  keywords: [
    'airport transfer sydney',
    'airport transfers melbourne',
    'airport chauffeur brisbane',
    'perth airport chauffeur',
    'adelaide airport transfers',
    'luxury airport pickup',
    'private airport transfer australia',
    'sydney airport meet and greet',
    'melbourne airport chauffeur car',
    'executive airport transport'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/airport-transfers`,
  },
  openGraph: {
    title: 'Airport Chauffeur Sydney, Melbourne, Brisbane & Perth | Elite Cars Australia',
    description: 'Book luxury airport chauffeur transfers nationwide. Punctual meet & greet, live flight tracking, and pristine Mercedes & BMW sedans across all Australian airports.',
    url: `${BASE_URL}/services/airport-transfers`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/AirportPickups.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Airport Chauffeur Transfers',
      },
    ],
  },
};

export default function AirportTransfersPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Airport Transfers', url: '/services/airport-transfers' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Airport Chauffeur & Flight Transfers',
    description: 'Punctual, luxury airport chauffeur transfers across all major Australian airports featuring live flight tracking, terminal meet & greet, and executive luggage assistance.',
    url: '/services/airport-transfers',
    image: '/Services/AirportPickups.jpg',
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
      <AirportTransfersClient />
    </>
  );
}
