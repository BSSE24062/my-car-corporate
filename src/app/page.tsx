import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import { cldOgUrl } from '@/lib/cloudinary';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide',
  description: siteMetadata.description,
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: 'Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide',
    description: siteMetadata.description,
    url: `${BASE_URL}/`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: cldOgUrl('/Hero/audiMain.png', BASE_URL),
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Premium Chauffeurs Nationwide',
      },
    ],
  },
};

export default function HomePage() {
  const breadcrumbSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeClient />
    </>
  );
}
