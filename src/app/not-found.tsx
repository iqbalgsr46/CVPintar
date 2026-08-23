import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Halaman Tidak Ditemukan | CVPintar',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'white', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Halaman Tidak Ditemukan</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '0.375rem', fontWeight: '500' }}>
          Kembali ke Beranda
        </Link>
        <Link href="/builder" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f3f4f6', color: '#333', textDecoration: 'none', borderRadius: '0.375rem', fontWeight: '500', border: '1px solid #e5e7eb' }}>
          Buat CV Sekarang
        </Link>
      </div>
    </div>
  );
}
