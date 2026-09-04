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
        <title>Luxury Chauffeur Service Australia | Elite Cars Australia</title>
        <meta name="title" content="Luxury Chauffeur Service Australia | Elite Cars Australia" />
        <meta name="description" content="Book Australia's premier luxury chauffeur service. Top-rated corporate cars, professional drivers, nationwide airport transfers, VIP concierge, weddings & private transport across Sydney, Melbourne, Brisbane, Perth & nationwide." />
        <meta name="keywords" content="chauffeur Australia, luxury car service Australia, corporate cars Australia, private driver Australia, airport transfer Sydney, airport transfer Melbourne, airport transfer Brisbane, VIP transport Australia, wedding cars Australia, concierge driver Australia" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://elitecarsaustralia.com.au/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecarsaustralia.com.au/" />
        <meta property="og:title" content="Luxury Chauffeur Service Australia | Elite Cars Australia" />
        <meta property="og:description" content="Book Australia's premier luxury chauffeur service. Top-rated corporate cars, professional drivers, nationwide airport transfers, VIP concierge, weddings & private transport." />
        <meta property="og:image" content="https://elitecarsaustralia.com.au/audiMain.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://elitecarsaustralia.com.au/" />
        <meta property="twitter:title" content="Luxury Chauffeur Service Australia | Elite Cars Australia" />
        <meta property="twitter:description" content="Book Australia's premier luxury chauffeur service. Top-rated corporate cars, professional drivers, nationwide airport transfers, VIP concierge, weddings & private transport." />
        <meta property="twitter:image" content="https://elitecarsaustralia.com.au/audiMain.png" />

        {/* Geo Tags */}
        <meta name="geo.region" content="AU" />
        <meta name="geo.placename" content="Australia" />

        {/* JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              "name": "Elite Cars Australia",
              "image": "https://elitecarsaustralia.com.au/audiMain.png",
              "@id": "https://elitecarsaustralia.com.au/#service",
              "url": "https://elitecarsaustralia.com.au",
              "telephone": "+61451002525",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU"
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
                  "@type": "Country",
                  "name": "Australia"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Sydney"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Melbourne"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Brisbane"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Perth"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Adelaide"
                }
              ],
              "provider": {
                "@type": "LocalBusiness",
                "name": "Elite Cars Australia",
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
