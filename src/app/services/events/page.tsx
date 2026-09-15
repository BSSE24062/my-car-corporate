import type { Metadata } from 'next';
import EventsClient from './EventsClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Conference & Event Chauffeur Transport Australia | Elite Cars Australia',
  description: 'Luxury group chauffeur transport and delegate logistics for corporate conferences, summits, keynote speakers, and galas across ICC Sydney, MCEC Melbourne, BCEC Brisbane, and Australia wide.',
  keywords: [
    'conference transport australia',
    'event chauffeur sydney',
    'icc sydney delegate transfer',
    'corporate event car service',
    'mcec melbourne chauffeur',
    'vip speaker transport',
    'executive van hire conference'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/events`,
  },
  openGraph: {
    title: 'Conference & Event Chauffeur Transport Australia | Elite Cars Australia',
    description: 'Coordinated luxury group chauffeur transport and VIP delegate logistics for conventions, summits, corporate galas, and major events nationwide.',
    url: `${BASE_URL}/services/events`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/conferences-and-events.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Conference and Event Transport',
      },
    ],
  },
};

export default function EventsPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Conferences & Events', url: '/services/events' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Conferences & Events Chauffeur Transport',
    description: 'Comprehensive VIP delegate logistics, keynote speaker transfers, and coordinated luxury group transport for conventions, corporate galas, and major summits across Australia.',
    url: '/services/events',
    image: '/Services/conferences-and-events.jpg',
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
      <EventsClient />
    </>
  );
}
