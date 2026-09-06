import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan Privasi CVPintar - bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda sesuai UU PDP No. 27 Tahun 2022.',
  alternates: { canonical: 'https://cvpintar.store/kebijakan-privasi' },
};

export default function KebijakanPrivasiPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '4rem 1.5rem', fontFamily: 'Arial, Helvetica, sans-serif', color: '#1f2937' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', padding: '3rem 2.5rem', lineHeight: 1.8 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '2rem' }}>
          ← Kembali ke Beranda
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Kebijakan Privasi</h1>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '2.5rem' }}>Terakhir diperbarui: September 2026</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>1. Pendahuluan</h2>
        <p>Kebijakan Privasi ini menjelaskan bagaimana CVPintar (<a href="https://cvpintar.store" style={{ color: '#8b5cf6' }}>cvpintar.store</a>) mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda. Kami berkomitmen untuk melindungi privasi Anda sesuai dengan <b>Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</b> dan peraturan terkait lainnya di Indonesia.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>2. Data yang Kami Kumpulkan</h2>
        <p>Kami mengumpulkan data berikut yang Anda berikan secara sukarela saat menggunakan layanan CVPintar:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
          <li><b>Data Identitas:</b> Nama lengkap, foto profil, alamat, nomor telepon/WhatsApp, email</li>
          <li><b>Data Profesional:</b> Riwayat pendidikan, pengalaman kerja, kursus/pelatihan, dan keahlian</li>
          <li><b>Data Preferensi:</b> Pengaturan jumlah halaman CV</li>
          <li><b>Data Teknis:</b> Informasi perangkat, browser, dan log akses dasar (jika tersedia)</li>
        </ul>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>3. Cara Kami Menggunakan Data</h2>
        <p>Data pribadi Anda digunakan untuk tujuan berikut:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
          <li>Memproses dan menghasilkan CV profesional secara otomatis</li>
          <li>Memproses pembayaran dan verifikasi transaksi</li>
          <li>Meningkatkan kualitas layanan dan pengalaman pengguna</li>
          <li>Memberikan dukungan pelanggan (customer service)</li>
          <li>Memenuhi kewajiban hukum yang berlaku</li>
        </ul>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>4. Dasar Hukum Pemrosesan</h2>
        <p>Kami memproses data pribadi Anda berdasarkan:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
          <li>Persetujuan (konsent) yang Anda berikan saat menggunakan layanan</li>
          <li>Pelaksanaan perjanjian layanan yang Anda ikuti</li>
          <li>Kewajiban hukum yang berlaku</li>
        </ul>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>5. Penyimpanan Data</h2>
        <p>Data CV Anda disimpan secara lokal di perangkat Anda (localStorage) dan hanya dikirim ke server kami saat Anda memproses pembayaran atau menghasilkan CV. Status pembayaran disimpan menggunakan cookie yang aman (httpOnly). Kami menyimpan data hanya selama diperlukan untuk tujuan layanan atau sesuai dengan ketentuan hukum yang berlaku.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>6. Penggunaan Cookie</h2>
        <p>Kami menggunakan <b>cookie esensial</b> yang diperlukan agar layanan dapat berfungsi dengan baik, khususnya untuk menyimpan status pembayaran Anda. Cookie esensial ini tidak memerlukan persetujuan terpisah. Kami <b>tidak menggunakan cookie pelacakan</b> (tracking cookies) untuk iklan atau analitik pihak ketiga saat ini.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>7. Data dari Layanan AI</h2>
        <p>Untuk menghasilkan CV, data Anda dikirim ke penyedia layanan kecerdasan buatan (AI) pihak ketiga, yaitu Google Gemini API. Data tersebut hanya digunakan untuk memproses permintaan Anda dan tidak digunakan untuk tujuan lain oleh penyedia tersebut sesuai dengan ketentuan layanan mereka.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>8. Pembagian Data ke Pihak Ketiga</h2>
        <p>Kami <b>tidak menjual, menyewakan, atau menukarkan</b> data pribadi Anda kepada pihak ketiga mana pun untuk tujuan komersial. Kami hanya membagikan data Anda kepada pihak yang terlibat langsung dalam penyediaan layanan (misalnya pemroses pembayaran dan penyedia AI) yang terikat kewajiban kerahasiaan.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>9. Hak Anda sebagai Subjek Data</h2>
        <p>Sesuai UU PDP, Anda memiliki hak untuk:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
          <li>Mengakses dan meminta salinan data pribadi Anda</li>
          <li>Memperbaiki atau memperbarui data yang tidak akurat</li>
          <li>Menghapus data pribadi Anda (hak untuk dilupakan)</li>
          <li>Menarik persetujuan pemrosesan data</li>
          <li>Mengajukan keluhan kepada instansi yang berwenang</li>
        </ul>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>10. Keamanan Data</h2>
        <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data Anda, termasuk enkripsi pada transmisi data (HTTPS), penyimpanan cookie yang aman, dan penggunaan layanan infrastruktur yang terpercaya. Namun, tidak ada metode transmisi melalui internet yang 100% aman, sehingga kami tidak dapat menjamin keamanan mutlak.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>11. Privasi Anak</h2>
        <p>Layanan CVPintar ditujukan untuk individu berusia 18 tahun ke atas. Jika Anda di bawah 18 tahun, mohon gunakan layanan ini dengan pendampingan orang tua atau wali.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>12. Perubahan Kebijakan</h2>
        <p>Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui halaman ini atau melalui sarana lain. Dengan terus menggunakan layanan, Anda dianggap menyetujui kebijakan terbaru.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>13. Kontak</h2>
        <p>Untuk pertanyaan, permintaan akses, perbaikan, atau penghapusan data, silakan hubungi kami melalui WhatsApp di <a href="https://wa.me/6287728382093" style={{ color: '#8b5cf6' }}>0877-2838-2093</a> atau melalui Customer Service CVPintar.</p>

        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#8b5cf6', color: '#fff', borderRadius: '12px', fontWeight: 600, textDecoration: 'none' }}>Buat CV Sekarang</Link>
          <Link href="/syarat-ketentuan" style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none' }}>Lihat Syarat & Ketentuan →</Link>
        </div>
      </div>
    </main>
  );
}
