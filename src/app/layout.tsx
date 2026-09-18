import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import {
  BASE_URL,
  siteMetadata,
  getWebsiteSchema,
  getOrganizationSchema,
  getFaqSchema,
} from "@/lib/seo-schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Elite Cars Australia | Luxury Chauffeur & Airport Transfers Sydney & Nationwide",
    template: "%s | Elite Cars Australia",
  },
  description: "Premier luxury chauffeur service across Sydney, Melbourne, Brisbane, Perth, Adelaide & Canberra. Immaculate Mercedes-Benz & BMW fleet, punctual airport transfers, corporate accounts, FBO private aviation & VIP transport.",
  applicationName: siteMetadata.siteName,
  authors: [{ name: "Elite Cars Australia", url: BASE_URL }],
  generator: "Next.js",
  keywords: [
    "Elite Cars",
    "Elite Cars Australia",
    "elite cars",
    "elitecarsaustralia",
    "elite cars au",
    "chauffeur sydney",
    "luxury chauffeur sydney",
    "sydney chauffeur service",
    "airport transfer sydney",
    "sydney airport chauffeur",
    "sydney airport transfers",
    "corporate chauffeur sydney",
    "executive car hire sydney",
    "chauffeur melbourne",
    "airport transfers melbourne",
    "chauffeur brisbane",
    "airport transfers brisbane",
    "chauffeur perth",
    "chauffeur adelaide",
    "chauffeur canberra",
    "chauffeur gold coast",
    "private driver sydney",
    "private driver australia",
    "corporate chauffeur service australia",
    "executive car hire australia",
    "corporate accounts chauffeur",
    "mercedes s class chauffeur sydney",
    "mercedes maybach hire australia",
    "mercedes v class hire with driver",
    "mercedes sprinter chauffeur hire",
    "audi q7 chauffeur",
    "bmw 7 series chauffeur",
    "private aviation fbo transfers sydney",
    "execujet sydney transfers",
    "jet aviation sydney chauffeur",
    "fbo tarmac transfer australia",
    "executive roadshow chauffeur australia",
    "wedding car hire sydney",
    "luxury wedding transport sydney",
    "vip transport australia",
    "as directed chauffeur hire",
    "hourly chauffeur hire sydney",
    "interstate chauffeur transfer sydney canberra",
    "best chauffeur service australia",
    "luxury car service sydney"
  ],
  referrer: "origin-when-cross-origin",
  creator: "Elite Cars Australia",
  publisher: "Elite Cars Australia",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: `${BASE_URL}/`,
    languages: {
      "en-AU": `${BASE_URL}/`,
      "en-US": `${BASE_URL}/`,
      "en-GB": `${BASE_URL}/`,
      "ar": `${BASE_URL}/`,
      "zh-Hans": `${BASE_URL}/`,
      "ja-JP": `${BASE_URL}/`,
      "fr-FR": `${BASE_URL}/`,
      "es-ES": `${BASE_URL}/`,
      "de-DE": `${BASE_URL}/`,
      "th-TH": `${BASE_URL}/`,
      "nl-NL": `${BASE_URL}/`,
      "x-default": `${BASE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    alternateLocale: ["en_US", "en_GB", "ar_AE", "zh_CN", "ja_JP", "fr_FR", "es_ES", "de_DE", "th_TH", "nl_NL"],
    url: `${BASE_URL}/`,
    siteName: siteMetadata.siteName,
    title: "Elite Cars Australia | Luxury Chauffeur & Airport Transfers Sydney & Nationwide",
    description: "Premier luxury chauffeur service across Sydney, Melbourne, Brisbane, Perth, Adelaide & Canberra. Immaculate Mercedes-Benz & BMW fleet, punctual airport transfers, corporate accounts, FBO private aviation & VIP transport.",
    images: [
      {
        url: `${BASE_URL}/Hero/audiMain.png`,
        width: 1200,
        height: 630,
        alt: "Elite Cars Australia Executive Chauffeur Fleet & Luxury Vehicles",
        type: "image/png",
      },
      {
        url: `${BASE_URL}/Sydney/operaHouse.jpg`,
        width: 1200,
        height: 630,
        alt: "Elite Cars Australia Luxury Chauffeur Sydney",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Cars Australia | Luxury Chauffeur & Airport Transfers Sydney & Nationwide",
    description: "Premier luxury chauffeur service across Sydney, Melbourne, Brisbane, Perth, Adelaide & Canberra. Immaculate Mercedes-Benz & BMW fleet, punctual airport transfers, corporate accounts & VIP transport.",
    images: [`${BASE_URL}/Hero/audiMain.png`],
    creator: "@elitecarsau",
    site: "@elitecarsau",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  category: "transportation",
  classification: "Executive Chauffeur Service, Luxury Transportation, Airport Transfers, Corporate Travel",
  other: {
    "geo.region": "AU-NSW",
    "geo.placename": "Sydney, New South Wales, Australia",
    "geo.position": "-33.8688;151.2093",
    "ICBM": "-33.8688, 151.2093",
    "revisit-after": "1 days",
    "rating": "General",
    "distribution": "Global",
    "coverage": "Worldwide & Australia Nationwide (Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast)",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      getWebsiteSchema(),
      getOrganizationSchema(),
      getFaqSchema(),
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect for maximum loading performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Global JSON-LD Schema Graphs (WebSite, LimousineService, FAQPage) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
