"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "../lib/i18n"; // Initialize i18n
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

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
        <title>Luxury Chauffeur Service Sydney | My Corporate Cars</title>
        <meta name="title" content="Luxury Chauffeur Service Sydney | My Corporate Cars" />
        <meta name="description" content="Book Sydney's premier luxury chauffeur service. Top-rated corporate cars, professional drivers, airport transfers, VIP concierge, weddings & private transport." />
        <meta name="keywords" content="chauffeur Sydney, chauffeurs Sydney, private driver Sydney, luxury car service, corporate cars, VIP transport Sydney, airport transfer Sydney, wedding cars Sydney, luxury transport, concierge driver Sydney, hire car Sydney, corporate travel" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://mycorporatecars.com.au/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mycorporatecars.com.au/" />
        <meta property="og:title" content="Luxury Chauffeur Service Sydney | My Corporate Cars" />
        <meta property="og:description" content="Book Sydney's premier luxury chauffeur service. Top-rated corporate cars, professional drivers, airport transfers, VIP concierge, weddings & private transport." />
        <meta property="og:image" content="https://mycorporatecars.com.au/audiMain.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mycorporatecars.com.au/" />
        <meta property="twitter:title" content="Luxury Chauffeur Service Sydney | My Corporate Cars" />
        <meta property="twitter:description" content="Book Sydney's premier luxury chauffeur service. Top-rated corporate cars, professional drivers, airport transfers, VIP concierge, weddings & private transport." />
        <meta property="twitter:image" content="https://mycorporatecars.com.au/audiMain.png" />

        {/* Geo Tags */}
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="Sydney" />
        <meta name="geo.position" content="-33.8688;151.2093" />
        <meta name="ICBM" content="-33.8688, 151.2093" />

        {/* JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              "name": "My Corporate Cars",
              "image": "https://mycorporatecars.com.au/audiMain.png", 
              "@id": "https://mycorporatecars.com.au/#service",
              "url": "https://mycorporatecars.com.au",
              "telephone": "+61451002525",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sydney CBD",
                "addressLocality": "Sydney",
                "addressRegion": "NSW",
                "postalCode": "2000",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -33.8688,
                "longitude": 151.2093
              },
              "openingHoursSpecification": {
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
              },
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Sydney"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "New South Wales"
                }
              ],
              "provider": {
                "@type": "LocalBusiness",
                "name": "My Corporate Cars",
                "telephone": "+61451002525"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {loading && <LoadingScreen />}
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
