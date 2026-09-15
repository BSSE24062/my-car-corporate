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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide",
    template: "%s | Elite Cars Australia",
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.siteName,
  authors: [{ name: "Elite Cars Australia", url: BASE_URL }],
  generator: "Next.js",
  keywords: [
    "Elite Cars",
    "Elite Cars Australia",
    "elite cars",
    "elitecarsaustralia",
    "elite cars au",
    "elite chauffeur",
    "chauffeur australia",
    "luxury chauffeur australia",
    "executive chauffeur sydney",
    "airport transfer sydney",
    "airport transfers melbourne",
    "chauffeur brisbane",
    "chauffeur perth",
    "chauffeur adelaide",
    "chauffeur canberra",
    "chauffeur gold coast",
    "private driver australia",
    "corporate chauffeur service",
    "executive car hire australia",
    "corporate accounts chauffeur",
    "mercedes s class chauffeur",
    "mercedes v class hire with driver",
    "mercedes sprinter chauffeur hire",
    "audi q7 chauffeur",
    "bmw 7 series chauffeur",
    "private aviation fbo transfers",
    "fbo tarmac transfer australia",
    "executive roadshow chauffeur",
    "wedding car hire australia",
    "luxury wedding transport sydney",
    "vip transport australia",
    "as directed chauffeur hire",
    "hourly chauffeur hire australia",
    "interstate chauffeur transfer",
    "luxury car service australia",
    "best chauffeur service australia"
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
    canonical: BASE_URL,
    languages: {
      "en-AU": `${BASE_URL}/`,
      "en-US": `${BASE_URL}/`,
      "en-GB": `${BASE_URL}/`,
      "ar": `${BASE_URL}/`,
      "zh": `${BASE_URL}/`,
      "ja": `${BASE_URL}/`,
      "fr": `${BASE_URL}/`,
      "es": `${BASE_URL}/`,
      "de": `${BASE_URL}/`,
      "th": `${BASE_URL}/`,
      "nl": `${BASE_URL}/`,
      "x-default": `${BASE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    alternateLocale: ["en_US", "en_GB", "ar", "zh_CN", "ja_JP", "fr_FR", "es_ES", "de_DE", "th_TH", "nl_NL"],
    url: BASE_URL,
    siteName: siteMetadata.siteName,
    title: "Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide",
    description: siteMetadata.description,
    images: [
      {
        url: `${BASE_URL}/Hero/audiMain.png`,
        width: 1200,
        height: 630,
        alt: "Elite Cars Australia Executive Chauffeur Fleet & Luxury Vehicles",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Cars Australia | Luxury Chauffeur & Airport Transfers Nationwide",
    description: siteMetadata.description,
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
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
  },
  manifest: "/site.webmanifest",
  category: "transportation",
  classification: "Executive Chauffeur Service, Luxury Transportation, Airport Transfers",
  other: {
    "geo.region": "AU",
    "geo.placename": "Australia",
    "geo.position": "-25.2744;133.7751",
    "ICBM": "-25.2744, 133.7751",
    "revisit-after": "1 days",
    "rating": "General",
    "distribution": "Global",
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
        {/* Preconnect for performance */}
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
