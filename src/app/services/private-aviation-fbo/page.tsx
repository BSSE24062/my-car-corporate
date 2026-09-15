import type { Metadata } from 'next';
import PrivateAviationClient from './PrivateAviationClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Private Aviation & FBO Tarmac Transfers Australia | Elite Cars Australia',
  description: 'Discreet, seamless private jet FBO transfers across Sydney (ExecuJet, Jet Aviation), Melbourne (Essendon), Brisbane, and Perth. Tarmac meet-and-greet, tail tracking, and VIP security protocols.',
  keywords: [
    'private aviation transfers australia',
    'fbo chauffeur sydney',
    'execujet sydney transfer',
    'jet aviation chauffeur',
    'essendon airport chauffeur melbourne',
    'private jet ground transport australia',
    'tarmac transfer chauffeur'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/private-aviation-fbo`,
  },
  openGraph: {
    title: 'Private Aviation & FBO Tarmac Transfers Australia | Elite Cars Australia',
    description: 'Discreet tarmac and FBO terminal transfers connecting private jet charters with executive destinations across Australian airports.',
    url: `${BASE_URL}/services/private-aviation-fbo`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Sydney/sydneyAirport.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Private Aviation and FBO Transfers',
      },
    ],
  },
};

export default function PrivateAviationPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Private Aviation & FBO', url: '/services/private-aviation-fbo' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Private Aviation & FBO Tarmac Transfers',
    description: 'Direct tarmac and private jet FBO terminal chauffeured transfers across major Australian airports with private aircraft tail tracking, VIP security protocols, and luxury vehicle readiness.',
    url: '/services/private-aviation-fbo',
    image: '/Sydney/sydneyAirport.jpg',
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
      <PrivateAviationClient />
    </>
  );
}
