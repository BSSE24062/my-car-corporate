import type { Metadata } from 'next';
import WeddingsClient from './WeddingsClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Luxury Wedding Car Hire & Bridal Chauffeurs Australia | Elite Cars Australia',
  description: 'Immaculate wedding car hire with professional suited chauffeurs across Sydney, Melbourne, Brisbane, and Perth. Mercedes-Benz S-Class, Maybach, BMW 7, and luxury bridal party vans.',
  keywords: [
    'wedding car hire australia',
    'luxury wedding cars sydney',
    'bridal car chauffeur melbourne',
    'wedding transport brisbane',
    'mercedes wedding car hire',
    'wedding getaway car with driver',
    'bridal party van hire with driver'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/weddings`,
  },
  openGraph: {
    title: 'Luxury Wedding Car Hire & Bridal Chauffeurs Australia | Elite Cars Australia',
    description: 'Pristine Mercedes-Benz, Maybach, and BMW wedding cars with suited professional chauffeurs. Red-carpet bridal care across Australia.',
    url: `${BASE_URL}/services/weddings`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/wedding.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Luxury Wedding Car Hire',
      },
    ],
  },
};

export default function WeddingsPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Wedding Transport', url: '/services/weddings' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Luxury Wedding Car Hire & Bridal Chauffeurs',
    description: 'Pristine luxury bridal car hire and guest passenger transport featuring immaculate sedans, Maybachs, and Mercedes V-Class vans with professionally suited chauffeurs.',
    url: '/services/weddings',
    image: '/Services/wedding.jpg',
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
      <WeddingsClient />
    </>
  );
}
