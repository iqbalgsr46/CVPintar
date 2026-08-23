import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cvpintar.store"),
  title: {
    default: "CVPintar - Buat CV ATS Friendly dengan AI",
    template: "%s | CVPintar"
  },
  description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI. CVPintar membantu Anda membuat CV yang lolos seleksi HRD dalam hitungan menit.",
  alternates: {
    canonical: "https://cvpintar.store",
  },
  keywords: [
    "buat cv ats",
    "cv ats friendly",
    "cv generator ai",
    "buat cv online",
    "cv maker indonesia",
    "cv profesional",
    "cv otomatis ai",
    "format cv ats 2024",
    "contoh cv ats friendly",
  ],
  authors: [{ name: "CVPintar" }],
  creator: "CVPintar",
  publisher: "CVPintar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-cvpintar.png",
    apple: "/images/logo-cvpintar.png",
  },
  openGraph: {
    title: "CVPintar - Buat CV ATS Friendly dengan AI",
    description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI. CVPintar membantu Anda membuat CV yang lolos seleksi HRD dalam hitungan menit.",
    url: "https://cvpintar.store",
    siteName: "CVPintar",
    images: [
      {
        url: "/images/cv-logo-link-new.jpeg",
        width: 512,
        height: 512,
        alt: "CVPintar Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CVPintar - Buat CV ATS Friendly dengan AI",
    description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI. CVPintar membantu Anda membuat CV yang lolos seleksi HRD dalam hitungan menit.",
    images: ["/images/cv-logo-link-new.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cvpintar.store/#organization",
      "name": "CVPintar",
      "url": "https://cvpintar.store",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cvpintar.store/images/logo-cvpintar.png"
      },
      "description": "CVPintar adalah platform AI untuk membuat CV profesional dan ATS-friendly secara otomatis."
    },
    {
      "@type": "WebSite",
      "@id": "https://cvpintar.store/#website",
      "name": "CVPintar",
      "url": "https://cvpintar.store",
      "publisher": { "@id": "https://cvpintar.store/#organization" },
      "description": "Platform AI untuk membuat CV profesional dan ATS-friendly"
    },
    {
      "@type": "WebApplication",
      "@id": "https://cvpintar.store/#app",
      "name": "CVPintar",
      "url": "https://cvpintar.store",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "10000",
        "priceCurrency": "IDR"
      },
      "description": "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI",
      "provider": { "@id": "https://cvpintar.store/#organization" }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
