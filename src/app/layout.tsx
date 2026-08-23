import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVPintar - Buat CV ATS Friendly dengan AI",
  description: "Buat CV profesional dan ATS-friendly secara otomatis dengan teknologi AI dari CVPintar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
