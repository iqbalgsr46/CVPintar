import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cvpintar.store"),
  title: "CVPintar - Buat CV ATS Friendly dengan AI",
  description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI dari CVPintar.",
  icons: {
    icon: "/images/logo-cvpintar.png",
    apple: "/images/logo-cvpintar.png",
  },
  openGraph: {
    title: "CVPintar - Buat CV ATS Friendly dengan AI",
    description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI dari CVPintar.",
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
    description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI dari CVPintar.",
    images: ["/images/cv-logo-link-new.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
