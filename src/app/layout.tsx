import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cvpintar.store"),
  title: {
    default: "CVPintar - Buat CV ATS Friendly dengan AI Gratis & Cepat",
    template: "%s | CVPintar"
  },
  description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI hanya dalam 2 menit. CVPintar membantu Anda membuat CV yang lolos seleksi HRD, dilengkapi template gratis, format profesional, dan tips interview. Cocok untuk fresh graduate, mahasiswa, dan profesional Indonesia.",
  alternates: {
    canonical: "https://cvpintar.store",
  },
  keywords: [
    // Primary keywords
    "buat cv ats",
    "cv ats friendly",
    "cv generator ai",
    "buat cv online",
    "cv maker indonesia",
    "cv profesional",
    "cv otomatis ai",
    "contoh cv ats friendly",
    "format cv ats",
    // Long-tail keywords
    "cara membuat cv yang lolos ats",
    "cara buat cv profesional untuk fresh graduate",
    "template cv gratis untuk melamar kerja",
    "aplikasi pembuat cv online gratis",
    "cara membuat cv menarik bagi hr",
    "cv yang bagus untuk melamar kerja",
    "tips membuat cv agar dipanggil interview",
    "cara menulis pengalaman kerja di cv",
    "contoh cv untuk lulusan smk",
    "contoh cv untuk lulusan sma",
    "contoh cv mahasiswa magang",
    "cv fresh graduate kosong",
    "cara membuat cv lulusan s1",
    "cv kreatif vs cv ats",
    "format cv terbaik untuk applicant tracking system",
    // Industry-specific
    "cv administrasi perkantoran",
    "cv operator produksi",
    "cv customer service",
    "cv staff gudang",
    "cv kasir",
    "cv marketing",
    "cv engineering",
    "cv kesehatan",
    // Problem-solution keywords
    "cv ditolak hrd",
    "kenapa cv tidak lolos screening",
    "cara agar cv dibaca sistem ats",
    "cv ATS friendly gratis",
    "bikin cv online cepat dan mudah",
    "buat cv profesional cuma 2 menit",
    "cv ai indonesia",
    "pembuat cv pakai artificial intelligence",
    // Brand
    "cvpintar",
    "cv pintar",
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
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CVPintar - Buat CV ATS Friendly dengan AI Gratis & Cepat",
    description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI hanya dalam 2 menit. Cocok untuk fresh graduate dan profesional Indonesia.",
    url: "https://cvpintar.store",
    siteName: "CVPintar",
    images: [
      {
        url: "/images/cv-logo-link-new.jpeg",
        width: 512,
        height: 512,
        alt: "CVPintar - Buat CV ATS Friendly dengan AI",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVPintar - Buat CV ATS Friendly dengan AI Gratis & Cepat",
    description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI hanya dalam 2 menit.",
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
      "description": "CVPintar adalah platform AI untuk membuat CV profesional dan ATS-friendly secara otomatis.",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-877-2838-2093",
        "contactType": "customer service",
        "availableLanguage": "Indonesian"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://cvpintar.store/#website",
      "name": "CVPintar - Buat CV ATS Friendly dengan AI Gratis",
      "url": "https://cvpintar.store",
      "publisher": { "@id": "https://cvpintar.store/#organization" },
      "description": "Platform AI gratis untuk membuat CV profesional dan ATS-friendly di Indonesia",
      "inLanguage": "id"
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
        "priceCurrency": "IDR",
        "priceValidUntil": "2027-12-31"
      },
      "description": "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI hanya dalam 2 menit",
      "provider": { "@id": "https://cvpintar.store/#organization" },
      "screenshot": "https://cvpintar.store/images/cv-logo-link-new.jpeg",
      "featureList": [
        "Pembuatan CV otomatis dengan AI",
        "Template CV ATS-friendly",
        "Format CV profesional",
        "Tips dan panduan interview kerja",
        "Download CV dalam format PDF"
      ],
      "softwareVersion": "1.0",
      "applicationSubCategory": "CV Builder"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Apa itu CVPintar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CVPintar adalah platform berbasis AI (Artificial Intelligence) yang membantu Anda membuat CV profesional dan ATS-friendly secara otomatis hanya dalam 2 menit. Cukup isi data diri Anda, dan AI kami akan merangkai CV yang siap kirim ke perusahaan impian."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah CVPintar gratis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Anda bisa membuat dan preview CV secara gratis. Untuk mengunduh CV tanpa watermark, dikenakan biaya sebesar Rp 10.000 sekali bayar."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana cara membuat CV yang lolos ATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ATS (Applicant Tracking System) adalah sistem otomatis yang digunakan HRD untuk memfilter CV. CVPintar secara otomatis menggunakan format, kata kunci, dan struktur yang mudah dibaca oleh sistem ATS, sehingga CV Anda lebih berpeluang lolos tahap awal seleksi."
          }
        },
        {
          "@type": "Question",
          "name": "Cocok untuk siapa CV yang dibuat CVPintar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CVPintar cocok untuk semua kalangan, mulai dari fresh graduate, mahasiswa yang mencari magang, lulusan SMK/SMA, hingga profesional berpengalaman yang ingin memperbarui CV mereka."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama waktu yang dibutuhkan untuk membuat CV?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hanya butuh waktu sekitar 2 menit. Cukup isi form singkat dengan data diri, pengalaman, pendidikan, dan keahlian Anda, lalu biarkan AI kami yang merangkai CV profesional untuk Anda."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah data saya aman di CVPintar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, CVPintar menggunakan enkripsi dan tidak membagikan data Anda ke pihak ketiga manapun. Data Anda hanya digunakan untuk proses pembuatan CV."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana cara agar CV dipanggil interview oleh HRD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Beberapa tips agar CV Anda menarik perhatian HRD: 1) Gunakan format ATS-friendly seperti yang dihasilkan CVPintar. 2) Sesuaikan kata kunci CV dengan deskripsi pekerjaan. 3) Tulis pencapaian yang terukur dan spesifik. 4) Pastikan tidak ada kesalahan ketik. 5) Gunakan foto profesional."
          }
        }
      ]
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
        <CookieConsent />
      </body>
    </html>
  );
}
