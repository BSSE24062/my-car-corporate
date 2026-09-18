export const BASE_URL = 'https://www.elitecarsaustralia.com.au';

export const siteMetadata = {
  siteName: 'Elite Cars Australia',
  defaultTitle: 'Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide',
  titleTemplate: '%s | Elite Cars Australia',
  description: 'Elite Cars Australia is the nation\'s premier executive chauffeur service. We deliver immaculate chauffeur cars, punctual airport transfers, corporate accounts, luxury wedding cars, and VIP transport across Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, and Canberra.',
  telephone: '+61430729993',
  email: 'info@elitecarsaustralia.com.au',
  address: {
    streetAddress: 'Executive Chauffeur Hub, Sydney CBD',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  geo: {
    latitude: -33.8688,
    longitude: 151.2093,
  },
  currenciesAccepted: 'AUD, USD, EUR, GBP, SGD, NZD, JPY, CNY',
  paymentAccepted: 'Credit Card, Debit Card, American Express, Corporate Invoicing, Bank Wire, EFT',
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
  alternateName: [
    'Elite Cars',
    'Elite Cars AU',
    'Elite Chauffeur Australia',
    'Elite Cars Sydney',
    'My Car Corporate',
    'Elite Motors',
    'Elite Motors Australia',
    'Elite Chauffeurs',
    'Elite Chauffeur Service',
    'Premium Cars Australia',
    'Australian Elite Cars',
    'Australian Premium Cars',
    "Australia's Premium Drivers",
    'Elite Luxury Chauffeurs',
  ],
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
  '@type': ['LimousineService', 'AutoRental', 'LocalBusiness'],
  '@id': `${BASE_URL}/#organization`,
  name: siteMetadata.siteName,
  alternateName: [
    'Elite Cars',
    'Elite Cars AU',
    'Elite Chauffeur Australia',
    'Elite Luxury Chauffeurs Sydney',
    'Elite Chauffeur Service Melbourne',
    'My Car Corporate',
    'Elite Motors',
    'Elite Motors Australia',
    'Elite Chauffeurs',
    'Elite Chauffeur Service',
    'Premium Cars Australia',
    'Australian Elite Cars',
    'Australian Premium Cars',
    "Australia's Premium Drivers",
    'Elite Luxury Chauffeurs',
  ],
  slogan: "Australia's Premier Executive Chauffeur Service",
  knowsLanguage: ['en', 'ar', 'zh', 'ja', 'fr', 'es', 'de', 'th', 'nl'],
  sameAs: [
    // Update these with your actual social media and directory profile URLs
    'https://www.instagram.com/elitecarsaustralia/',
    'https://www.facebook.com/elitecarsaustralia/',
    // 'https://www.linkedin.com/company/elite-cars-australia/',
    // 'https://www.youtube.com/@elitecarsaustralia',
    // 'https://g.page/elite-cars-australia',  // Google Business Profile
    // 'https://www.yelp.com.au/biz/elite-cars-australia-sydney',
    // 'https://www.tripadvisor.com.au/...',
  ],
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: [
    `${BASE_URL}/Hero/audiMain.png`,
    `${BASE_URL}/Fleet/benz s class.jpg`,
    `${BASE_URL}/Sydney/operaHouse.jpg`,
    `${BASE_URL}/Services/AirportPickups.jpg`
  ],
  telephone: siteMetadata.telephone,
  email: siteMetadata.email,
  priceRange: siteMetadata.priceRange,
  currenciesAccepted: siteMetadata.currenciesAccepted,
  paymentAccepted: siteMetadata.paymentAccepted,
  description: siteMetadata.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteMetadata.address.streetAddress,
    addressLocality: siteMetadata.address.addressLocality,
    addressRegion: siteMetadata.address.addressRegion,
    postalCode: siteMetadata.address.postalCode,
    addressCountry: siteMetadata.address.addressCountry,
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
    { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' }, geo: { '@type': 'GeoCoordinates', latitude: -33.8688, longitude: 151.2093 } },
    { '@type': 'City', name: 'Melbourne', containedInPlace: { '@type': 'State', name: 'Victoria' }, geo: { '@type': 'GeoCoordinates', latitude: -37.8136, longitude: 144.9631 } },
    { '@type': 'City', name: 'Brisbane', containedInPlace: { '@type': 'State', name: 'Queensland' }, geo: { '@type': 'GeoCoordinates', latitude: -27.4698, longitude: 153.0251 } },
    { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' }, geo: { '@type': 'GeoCoordinates', latitude: -31.9505, longitude: 115.8605 } },
    { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'South Australia' }, geo: { '@type': 'GeoCoordinates', latitude: -34.9285, longitude: 138.6007 } },
    { '@type': 'City', name: 'Gold Coast', containedInPlace: { '@type': 'State', name: 'Queensland' }, geo: { '@type': 'GeoCoordinates', latitude: -28.0167, longitude: 153.4000 } },
    { '@type': 'City', name: 'Canberra', containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' }, geo: { '@type': 'GeoCoordinates', latitude: -35.2809, longitude: 149.1300 } },
    { '@type': 'City', name: 'Hobart', containedInPlace: { '@type': 'State', name: 'Tasmania' } },
    { '@type': 'City', name: 'Darwin', containedInPlace: { '@type': 'State', name: 'Northern Territory' } },
    { '@type': 'City', name: 'Newcastle', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
    { '@type': 'City', name: 'Wollongong', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
    { '@type': 'City', name: 'Geelong', containedInPlace: { '@type': 'State', name: 'Victoria' } },
    { '@type': 'City', name: 'Sunshine Coast', containedInPlace: { '@type': 'State', name: 'Queensland' } }
  ],
  knowsAbout: [
    // ── Service expertise ──
    'Executive Chauffeur Service Sydney',
    'Executive Chauffeur Service Australia',
    'Luxury Chauffeur Service Australia',
    'Premium Chauffeur Service Australia',
    'Elite Chauffeur Service',
    'VIP Car Service Australia',
    'Chauffeur Service Australia',
    'Private Driver Australia',
    'Hire a Chauffeur Australia',

    // ── Airport expertise ──
    'Airport Transfers Sydney Airport SYD',
    'Airport Transfers Western Sydney International WSI',
    'Melbourne Airport Transfers Tullamarine MEL',
    'Melbourne Airport Essendon Fields',
    'Brisbane Airport Chauffeur BNE',
    'Perth Airport Chauffeur PER',
    'Adelaide Airport Transfers ADL',
    'Gold Coast Airport Transfers OOL',
    'Canberra Airport Chauffeur CBR',
    'Airport Pickup Sydney',
    'Airport Pickup Melbourne',
    'Airport Meet and Greet Australia',

    // ── Corporate expertise ──
    'Corporate Chauffeur Accounts Australia',
    'Corporate Travel Service Australia',
    'Executive Assistant Priority Dispatch',
    'Corporate 30-Day Invoicing Chauffeur',
    'Corporate Investor Roadshow Transport Australia',

    // ── Aviation expertise ──
    'Private Aviation FBO Tarmac Transfers',
    'ExecuJet Sydney Chauffeur',
    'Jet Aviation Sydney Transfers',
    'Private Jet Chauffeur Australia',
    'ASIC Accredited Airside Driver',

    // ── Fleet expertise ──
    'Mercedes-Benz S-Class Chauffeur Hire',
    'Mercedes Maybach Chauffeur Hire',
    'Mercedes-Benz V-Class 7 Passenger Van Hire',
    'Mercedes Sprinter Executive Minibus Hire',
    'BMW 7 Series Chauffeur Hire',
    'Audi Q7 Chauffeur Hire',
    'BMW X7 Chauffeur Hire',
    'Mercedes-Benz GLS Chauffeur Hire',
    'Mercedes Chauffeur Australia',
    'Luxury Sedan Hire with Driver',

    // ── Specialty services ──
    'Luxury Wedding Car Hire Sydney',
    'Wedding Chauffeur Australia',
    'As-Directed Hourly Chauffeur Hire',
    'Hourly Chauffeur Hire Australia',
    'Interstate Long Distance Chauffeur Australia',
    'Conference and Event Transport Australia',
    'VIP Transport Australia',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: siteMetadata.ratingValue,
    reviewCount: siteMetadata.reviewCount,
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sarah Jenkins' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Elite Cars Australia manages our executive airport transfers and board meeting itineraries in Sydney and Melbourne. Drivers are consistently punctual, courteous, and communicate in advance. An indispensable partner for our corporate travel.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: "David O'Connor" },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Excellent airport transfer service. The chauffeur monitored our delayed flight from Singapore and was waiting inside arrivals with a name board. Clean Mercedes S-Class, smooth drive, and effortless monthly invoicing.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Michelle Thornton' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'We reserved multiple Mercedes V-Class vehicles for keynote speakers across a 3-day conference. Flawless dispatch coordination, polite drivers, and great feedback from all our international delegates.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Julian Sterling' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Reliable tarmac and FBO transfers for our private charter guests in Sydney and the Gold Coast. Discretion, vehicle condition, and driver professionalism are always top-tier.',
    }
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteMetadata.telephone,
      contactType: 'customer service',
      areaServed: ['AU', 'US', 'GB', 'SG', 'NZ', 'AE'],
      availableLanguage: ['English', 'Arabic', 'Chinese', 'Japanese', 'French', 'Spanish', 'German', 'Thai', 'Dutch'],
      contactOption: 'TollFree',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    {
      '@type': 'ContactPoint',
      telephone: siteMetadata.telephone,
      contactType: 'reservations',
      areaServed: 'AU',
      availableLanguage: ['English', 'Arabic', 'Chinese', 'Japanese', 'French', 'Spanish', 'German', 'Thai', 'Dutch'],
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Executive Chauffeured Transportation Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Airport Chauffeur Transfers',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Airport Chauffeur Transfers Sydney, Melbourne, Brisbane & Perth',
              description: 'Door-to-door luxury airport transfers with live commercial flight tracking and terminal meet-and-greet.',
              url: `${BASE_URL}/services/airport-transfers`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Corporate Accounts',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Corporate Chauffeur Accounts & EA Support',
              description: 'Centralized 30-day corporate billing, priority dispatch, and nationwide executive travel management.',
              url: `${BASE_URL}/services/corporate-accounts`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'As-Directed Hourly Chauffeur Hire',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Hourly As-Directed Chauffeur Hire',
              description: 'Flexible luxury vehicle and private chauffeur on standby for multi-stop meetings and VIP schedules.',
              url: `${BASE_URL}/services/as-directed-chauffeur-hire`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Executive Roadshows',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Corporate Investor Roadshows',
              description: 'Precision multi-stop travel coordination and luxury fleet deployment for investor roadshows and board meetings.',
              url: `${BASE_URL}/services/roadshows`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Conference & Event Logistics',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Conferences & VIP Event Transport',
              description: 'Coordinated luxury group transport and VIP delegate logistics for conventions, summits, and private galas.',
              url: `${BASE_URL}/services/events`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Luxury Wedding Car Hire',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wedding Car Hire & Bridal Chauffeurs',
              description: 'Immaculate Mercedes-Benz, Maybach, and BMW bridal cars and passenger vans with suited professional chauffeurs.',
              url: `${BASE_URL}/services/weddings`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Private Aviation & FBO Tarmac Transfers',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Private Aviation & FBO Tarmac Transfers',
              description: 'Direct tarmac and private jet FBO terminal chauffeured transfers with aircraft tail tracking and VIP security.',
              url: `${BASE_URL}/services/private-aviation-fbo`,
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Interstate Long-Distance Chauffeur',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interstate & Regional Chauffeur Transfers',
              description: 'Comfortable, private long-distance chauffeured journeys between capital cities and regional commercial hubs.',
              url: `${BASE_URL}/services/interstate-transfers`,
            },
          },
        ],
      },
    ],
  },
});

export const getFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I book a luxury chauffeur or request a quote in Sydney or nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book directly or request a quotation online at https://www.elitecarsaustralia.com.au/#booking, call our 24/7 concierge at +61 430 729 993, or message us directly via WhatsApp. We provide instant reservation confirmation and transparent pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Australian cities and airport terminals does Elite Cars Australia service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide nationwide executive chauffeur services covering Sydney (Kingsford Smith Airport SYD & Western Sydney International), Melbourne (Tullamarine MEL & Essendon), Brisbane (BNE), Perth (PER), Adelaide (ADL), Gold Coast (OOL), Canberra (CBR), Hobart (HBA), Darwin (DRW), and regional interstate routes throughout Australia.',
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
      name: 'Do you track commercial flights and private jets for airport transfers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our dispatch team monitors real-time commercial and private aviation flight radar. Even if your flight is delayed or lands early, your chauffeur will be positioned inside arrivals with an executive name tablet and assist with luggage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide corporate billing accounts and itemized monthly invoices for Executive Assistants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide streamlined corporate accounts with 30-day billing, consolidated itemized tax invoices with cost-center coding, EA priority dispatch bookings, and multi-city management for executive teams.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does inside-terminal meet-and-greet work at Sydney, Melbourne, and Brisbane airports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your professional chauffeur waits inside the terminal at the arrival baggage carousel exit holding an executive digital name sign. You will also receive the chauffeur’s name, phone number, and vehicle registration ahead of landing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Elite Cars Australia provide child seats or booster seats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Certified Australian Standard rear-facing, forward-facing child seats and booster seats can be installed prior to arrival upon request in your booking notes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you service private jet FBO facilities like ExecuJet and Jet Aviation in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We service all private jet FBO hangars across Australia, including Jet Aviation and ExecuJet at Sydney Airport, Essendon Fields and Tullamarine FBO in Melbourne, and Brisbane Airport FBO, with ASIC-accredited drivers ready directly tarmac-side.',
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
    name: 'Executive Chauffeured Transport Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          description,
        },
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
      },
    ],
  },
});
