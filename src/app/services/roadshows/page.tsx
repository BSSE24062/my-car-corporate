import type { Metadata } from 'next';
import RoadshowsClient from './RoadshowsClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Executive Roadshow Chauffeurs & Investor Delegations | Elite Cars Australia',
  description: 'Precision executive roadshow transport across Sydney, Melbourne, Brisbane, and Perth. Synchronized multi-stop itineraries, multi-vehicle fleet coordination, and confidential senior chauffeurs.',
  keywords: [
    'executive roadshow chauffeur',
    'investor roadshow transport australia',
    'board meeting chauffeur sydney',
    'corporate delegation transport',
    'ipo roadshow car service',
    'multi stop executive chauffeur'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/roadshows`,
  },
  openGraph: {
    title: 'Executive Roadshow Chauffeurs & Investor Delegations | Elite Cars Australia',
    description: 'Precision transport logistics for high-stakes investor roadshows, capital raisings, board meetings, and multi-city executive presentations across Australia.',
    url: `${BASE_URL}/services/roadshows`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/executive-road-shows.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Executive Roadshows Chauffeur Service',
      },
    ],
  },
};

export default function RoadshowsPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Executive Roadshows', url: '/services/roadshows' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Executive Roadshows & Investor Itineraries',
    description: 'Precision multi-stop travel coordination and luxury fleet deployment for corporate investor presentations, deal teams, and board itineraries across Australia.',
    url: '/services/roadshows',
    image: '/Services/executive-road-shows.jpg',
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
      <RoadshowsClient />
    </>
  );
}
