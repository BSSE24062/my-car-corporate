export const BASE_URL = 'https://www.elitecarsaustralia.com.au';

export const siteMetadata = {
  siteName: 'Elite Cars Australia',
  defaultTitle: 'Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide',
  titleTemplate: '%s | Elite Cars Australia',
  description: 'Elite Cars Australia is the nation\'s premier executive chauffeur service. We deliver immaculate chauffeur cars, punctual airport transfers, corporate accounts, luxury wedding cars, and VIP transport across Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, and Canberra.',
  telephone: '+61430729993',
  email: 'info@elitecarsaustralia.com.au',
  address: {
    streetAddress: 'Executive Transport Hub',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  geo: {
    latitude: -33.8688,
    longitude: 151.2093,
  },
  currenciesAccepted: 'AUD, USD, EUR, GBP',
  paymentAccepted: 'Credit Card, Debit Card, Amex, Wire Transfer, Corporate Invoicing',
  priceRange: '$$$$',
  ratingValue: '4.98',
  reviewCount: '184',
};

export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: siteMetadata.siteName,
  description: siteMetadata.description,
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
  inLanguage: ['en-AU', 'en-US', 'en-GB', 'ar', 'zh', 'ja', 'fr', 'es', 'de', 'th', 'nl'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/services?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LimousineService',
  '@id': `${BASE_URL}/#organization`,
  name: siteMetadata.siteName,
  alternateName: [
    'Elite Cars',
    'Elite Cars AU',
    'Elite Chauffeur Australia',
    'Elite Luxury Chauffeurs',
    'My Car Corporate'
  ],
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  image: `${BASE_URL}/Hero/audiMain.png`,
  telephone: siteMetadata.telephone,
  email: siteMetadata.email,
  priceRange: siteMetadata.priceRange,
  currenciesAccepted: siteMetadata.currenciesAccepted,
  paymentAccepted: siteMetadata.paymentAccepted,
  description: siteMetadata.description,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
    addressRegion: 'Australia Wide',
    addressLocality: 'Sydney',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteMetadata.geo.latitude,
    longitude: siteMetadata.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'City', name: 'Sydney' },
    { '@type': 'City', name: 'Melbourne' },
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Perth' },
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'City', name: 'Gold Coast' },
    { '@type': 'City', name: 'Canberra' },
    { '@type': 'City', name: 'Hobart' },
    { '@type': 'City', name: 'Darwin' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: siteMetadata.ratingValue,
    reviewCount: siteMetadata.reviewCount,
    bestRating: '5',
    worstRating: '1',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteMetadata.telephone,
    contactType: 'customer service',
    areaServed: 'AU',
    availableLanguage: ['English', 'Arabic', 'Chinese', 'Japanese', 'French', 'Spanish', 'German', 'Thai', 'Dutch'],
    contactOption: 'TollFree',
  },
});

export const getFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I book or request a quote with Elite Cars Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book directly or request a quotation online at https://www.elitecarsaustralia.com.au/#booking, call our 24/7 concierge at +61 430 729 993, or message us directly via WhatsApp. We provide instant reservation confirmation and transparent pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cities across Australia does Elite Cars Australia service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide nationwide executive chauffeur services covering Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, Hobart, Darwin, and regional interstate routes throughout Australia.',
      },
    },
    {
      '@type': 'Question',
      name: 'What luxury vehicles are available in the Elite Cars Australia fleet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our immaculate fleet includes the Mercedes-Benz S-Class, Mercedes Maybach, BMW 7 Series, Audi Q7, BMW X7, Mercedes-Benz GLS, Mercedes-Benz V-Class (up to 7 passengers), and Mercedes Sprinter executive minibuses (up to 14 passengers).',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you track flights for airport pickup transfers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our dispatch team monitors real-time commercial and private aviation flight radar. Even if your flight is delayed or lands early, your chauffeur will be positioned inside arrivals with an executive name tablet and assist with luggage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide corporate billing accounts and itemized invoices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide streamlined corporate accounts with 30-day billing, consolidated itemized tax invoices, EA priority dispatch bookings, and multi-city management for executive teams.',
      },
    },
  ],
});

export const getBreadcrumbsSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
  })),
});

export const getServiceSchema = ({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}${url}#service`,
  name,
  description,
  url: `${BASE_URL}${url}`,
  image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Luxury Chauffeured Transport',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          description,
        },
      },
    ],
  },
});
