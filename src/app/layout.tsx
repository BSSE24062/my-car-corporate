"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "../lib/i18n"; // Initialize i18n
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for assets
    const timer = setTimeout(() => {
      setLoading(false);
      window.dispatchEvent(new Event('loading-finished'));
    }, 4500); // 4.5s minimum loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>Elite Cars Australia | #1 Luxury Chauffeur Service Australia & Airport Transfers</title>
        <meta name="title" content="Elite Cars Australia | #1 Luxury Chauffeur Service Australia & Airport Transfers" />
        <meta 
          name="description" 
          content="Elite Cars Australia is Australia's leading luxury chauffeur service. Book premium corporate cars, private drivers, nationwide airport transfers & VIP transport in Sydney, Melbourne, Brisbane, Perth & Adelaide." 
        />
        <meta 
          name="keywords" 
          content="Elite Cars, Elite Cars Australia, elitecarsaustralia, elite cars au, elitecars, elite chauffeur, chauffeurs, chauffeur, chauffeurs australia, chauffeur service australia, luxury chauffeur, executive chauffeur, private chauffeur, luxury car with driver australia, private driver australia, corporate car hire australia, airport transfer sydney, airport transfer melbourne, airport transfer brisbane, airport transfer perth, airport transfer adelaide, airport pickups australia, luxury airport chauffeur, chauffeur sydney, chauffeur melbourne, chauffeur brisbane, chauffeur perth, chauffeur adelaide, chauffeur gold coast, chauffeur canberra, luxury car service sydney, luxury car service melbourne, wedding car hire australia, wedding chauffeur, corporate roadshow transport, luxury van hire with driver, mercedes sprinter chauffeur, mercedes s class hire with driver, audi q7 chauffeur, bmw 7 series chauffeur, vip transport australia, executive travel australia, private chauffeur service, hire car with driver australia, corporate chauffeur service australia, best chauffeur service australia" 
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="author" content="Elite Cars Australia" />
        <meta name="publisher" content="Elite Cars Australia" />
        <meta name="revisit-after" content="2 days" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="coverage" content="Australia Worldwide" />
        
        {/* Canonical & Hreflang */}
        <link rel="canonical" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="en-AU" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="en" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="ar" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="zh" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="ja" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="fr" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="es" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="de" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="th" href="https://www.elitecarsaustralia.com.au/" />
        <link rel="alternate" hrefLang="nl" href="https://www.elitecarsaustralia.com.au/" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Elite Cars Australia" />
        <meta property="og:url" content="https://www.elitecarsaustralia.com.au/" />
        <meta property="og:title" content="Elite Cars Australia | #1 Luxury Chauffeur Service Australia" />
        <meta property="og:description" content="Australia's premier luxury chauffeur service. Book executive corporate cars, private airport transfers, wedding transport & VIP chauffeur services nationwide." />
        <meta property="og:image" content="https://www.elitecarsaustralia.com.au/audiMain.png" />
        <meta property="og:image:secure_url" content="https://www.elitecarsaustralia.com.au/audiMain.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Elite Cars Australia Luxury Chauffeur Fleet" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.elitecarsaustralia.com.au/" />
        <meta property="twitter:title" content="Elite Cars Australia | #1 Luxury Chauffeur Service Australia" />
        <meta property="twitter:description" content="Australia's premier luxury chauffeur service. Book executive corporate cars, private airport transfers, wedding transport & VIP chauffeur services nationwide." />
        <meta property="twitter:image" content="https://www.elitecarsaustralia.com.au/audiMain.png" />
        <meta property="twitter:image:alt" content="Elite Cars Australia Luxury Fleet" />

        {/* Geo Tags */}
        <meta name="geo.region" content="AU" />
        <meta name="geo.placename" content="Australia" />
        <meta name="geo.position" content="-25.2744;133.7751" />
        <meta name="ICBM" content="-25.2744, 133.7751" />

        {/* Structured Data / Rich Snippets (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LimousineService",
                  "@id": "https://www.elitecarsaustralia.com.au/#service",
                  "name": "Elite Cars Australia",
                  "alternateName": ["Elite Cars", "Elite Cars AU", "Elite Chauffeur Australia"],
                  "image": "https://www.elitecarsaustralia.com.au/audiMain.png",
                  "logo": "https://www.elitecarsaustralia.com.au/icon.png",
                  "url": "https://www.elitecarsaustralia.com.au",
                  "telephone": "+61430729993",
                  "email": "info@elitecarsaustralia.com.au",
                  "priceRange": "$$$$",
                  "currenciesAccepted": "AUD, USD, EUR, GBP",
                  "paymentAccepted": "Credit Card, Debit Card, Wire Transfer, Corporate Account",
                  "description": "Elite Cars Australia is Australia's premier luxury chauffeur and executive car service providing private airport transfers, corporate travel, wedding transport, and VIP concierge transport across Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra and nationwide.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "AU",
                    "addressRegion": "Australia Wide"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": -33.8688,
                    "longitude": 151.2093
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday"
                      ],
                      "opens": "00:00",
                      "closes": "23:59"
                    }
                  ],
                  "areaServed": [
                    { "@type": "Country", "name": "Australia" },
                    { "@type": "City", "name": "Sydney" },
                    { "@type": "City", "name": "Melbourne" },
                    { "@type": "City", "name": "Brisbane" },
                    { "@type": "City", "name": "Perth" },
                    { "@type": "City", "name": "Adelaide" },
                    { "@type": "City", "name": "Gold Coast" },
                    { "@type": "City", "name": "Canberra" }
                  ],
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.98",
                    "reviewCount": "148",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Luxury Chauffeur Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Airport Chauffeur & Flight Transfers",
                          "description": "Punctual, stress-free luxury airport transfers with live flight tracking across all Australian airports."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Executive Corporate Chauffeur",
                          "description": "Bespoke executive corporate roadshows, boardroom delegate transport, and VIP corporate accounts."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Luxury Wedding Car Hire with Driver",
                          "description": "Red carpet luxury wedding fleet transport featuring Mercedes S-Class, BMW 7 Series, and Mercedes Maybach."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "One Day Trips & Private Tours",
                          "description": "Personalized private tours and day trips driven by local certified chauffeur experts."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Hourly Chauffeur & VIP As-Directed",
                          "description": "Dedicated luxury chauffeur on-demand by the hour for flexible VIP schedules."
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.elitecarsaustralia.com.au/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "How do I book a luxury chauffeur with Elite Cars Australia?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can book easily online through our booking form on elitecarsaustralia.com.au, call our direct concierge at +61 430 729 993, or email info@elitecarsaustralia.com.au. We offer 24/7 immediate booking dispatch."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Which cities in Australia are covered by Elite Cars Australia?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Elite Cars Australia provides nationwide luxury chauffeur services covering Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, and regional destinations across all Australian states."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What vehicles are in the Elite Cars Australia fleet?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our world-class fleet includes the Mercedes-Benz S-Class, Mercedes Maybach, BMW 7 Series, Audi Q7, BMW X7, Mercedes-Benz GLS, Mercedes-Benz V-Class, and Mercedes Sprinter executive minibuses."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you track flight changes for airport transfers?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, our dispatch team and chauffeurs monitor your flight status in real-time. Even if your flight is early or delayed, your chauffeur will be waiting for you inside the terminal with a personalized name board."
                      }
                    }
                  ]
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.elitecarsaustralia.com.au/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Services",
                      "item": "https://www.elitecarsaustralia.com.au/#services"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Our Fleet",
                      "item": "https://www.elitecarsaustralia.com.au/#fleet"
                    },
                    {
                      "@type": "ListItem",
                      "position": 4,
                      "name": "Book Now",
                      "item": "https://www.elitecarsaustralia.com.au/#booking"
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {loading && <LoadingScreen />}
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
