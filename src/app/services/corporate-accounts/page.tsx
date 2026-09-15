import type { Metadata } from 'next';
import CorporateAccountsClient from './CorporateAccountsClient';
import { BASE_URL, siteMetadata, getBreadcrumbsSchema, getServiceSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Corporate Chauffeur Accounts & Executive Travel Australia | Elite Cars Australia',
  description: 'Open a centralized corporate chauffeur account with Elite Cars Australia. 30-day business invoicing, dedicated EA booking support, priority dispatch, and executive sedans nationwide.',
  keywords: [
    'corporate chauffeur australia',
    'corporate car service sydney',
    'executive chauffeur account',
    'ea travel booking chauffeur',
    'corporate chauffeur melbourne',
    'executive business transfers',
    'corporate billing car service',
    'company chauffeur account australia'
  ],
  alternates: {
    canonical: `${BASE_URL}/services/corporate-accounts`,
  },
  openGraph: {
    title: 'Corporate Chauffeur Accounts & Executive Travel Australia | Elite Cars Australia',
    description: 'Centralized corporate chauffeur accounts with 30-day business invoicing, dedicated EA dispatch support, and executive sedans nationwide.',
    url: `${BASE_URL}/services/corporate-accounts`,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: `${BASE_URL}/Services/professional.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elite Cars Australia Corporate Chauffeur Accounts',
      },
    ],
  },
};

export default function CorporateAccountsPage() {
  const breadcrumbsSchema = getBreadcrumbsSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Corporate Accounts', url: '/services/corporate-accounts' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Corporate Accounts & Executive Travel',
    description: 'Bespoke corporate chauffeur accounts with itemized monthly billing, dedicated EA priority dispatch, and nationwide executive transport management.',
    url: '/services/corporate-accounts',
    image: '/Services/professional.jpg',
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
      <CorporateAccountsClient />
    </>
  );
}
