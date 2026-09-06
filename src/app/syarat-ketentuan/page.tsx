import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan Ketentuan penggunaan layanan CVPintar - platform pembuatan CV ATS friendly dengan AI di Indonesia.',
  alternates: { canonical: 'https://cvpintar.store/syarat-ketentuan' },
};

export default function SyaratKetentuanPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '4rem 1.5rem', fontFamily: 'Arial, Helvetica, sans-serif', color: '#1f2937' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', padding: '3rem 2.5rem', lineHeight: 1.8 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '2rem' }}>
          ← Kembali ke Beranda
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Syarat & Ketentuan</h1>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '2.5rem' }}>Terakhir diperbarui: September 2026</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>1. Penerimaan Ketentuan</h2>
        <p>Dengan mengakses atau menggunakan situs CVPintar (<a href="https://cvpintar.store" style={{ color: '#8b5cf6' }}>cvpintar.store</a>), Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan yang berlaku. Jika Anda tidak setuju dengan sebagian atau seluruh ketentuan ini, mohon untuk tidak menggunakan layanan kami.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>2. Deskripsi Layanan</h2>
        <p>CVPintar adalah platform berbasis kecerdasan buatan (AI) yang membantu pengguna membuat CV profesional dan ATS-friendly secara otomatis. Layanan utama meliputi:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
          <li>Pembuatan CV otomatis menggunakan teknologi AI</li>
          <li>Template CV dengan format ATS-friendly</li>
          <li>Preview CV secara gratis</li>
          <li>Unduh CV dalam format PDF (berbayar)</li>
        </ul>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>3. Harga dan Pembayaran</h2>
        <p>Pengguna dapat membuat dan melihat preview CV secara gratis. Untuk mengunduh CV dalam format PDF, dikenakan biaya <b>Rp 10.000 (sepuluh ribu rupiah)</b> untuk satu CV. Pembayaran dilakukan melalui QRIS yang disediakan. Pembayaran yang sudah dilakukan bersifat final dan tidak dapat dikembalikan (non-refundable), kecuali ditentukan lain oleh peraturan perundang-undangan yang berlaku.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>4. Akun dan Data Pengguna</h2>
        <p>Anda bertanggung jawab penuh atas keakuratan data pribadi yang Anda masukkan ke dalam platform CVPintar, termasuk namun tidak terbatas pada nama, nomor telepon, email, alamat, riwayat pendidikan, dan pengalaman kerja. Anda menjamin bahwa data yang Anda sampaikan adalah milik Anda sendiri atau Anda memiliki hak untuk menggunakannya.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>5. Larangan Penggunaan</h2>
        <p>Anda dilarang menggunakan layanan CVPintar untuk:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
          <li>Memasukkan data palsu, menyesatkan, atau melanggar hukum</li>
          <li>Menggunakan data orang lain tanpa izin</li>
          <li>Merusak, mengganggu, atau membebani sistem secara berlebihan</li>
          <li>Merekayasa, memanipulasi, atau menyalahgunakan sistem pembayaran</li>
          <li>Menggunakan konten CVPintar untuk tujuan komersial tanpa izin tertulis</li>
        </ul>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>6. Kekayaan Intelektual</h2>
        <p>Seluruh konten, desain, logo, teks, grafik, dan perangkat lunak di platform CVPintar dilindungi oleh hak kekayaan intelektual yang berlaku di Indonesia. Pengguna tidak diperbolehkan menyalin, memodifikasi, mendistribusikan, atau memanfaatkan konten tersebut tanpa izin tertulis dari CVPintar.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>7. Batasan Tanggung Jawab</h2>
        <p>CVPintar berusaha memberikan layanan terbaik namun tidak menjamin bahwa hasil CV yang dihasilkan akan diterima oleh setiap perusahaan atau sistem rekrutmen. Hasil akhir penerimaan lamaran sepenuhnya merupakan kebijakan perusahaan yang bersangkutan. CVPintar tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan layanan ini.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>8. Perubahan Ketentuan</h2>
        <p>CVPintar dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui halaman ini. Dengan terus menggunakan layanan setelah perubahan, Anda dianggap menyetujui ketentuan terbaru.</p>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '2rem 0 0.75rem' }}>9. Kontak</h2>
        <p>Jika Anda memiliki pertanyaan terkait Syarat & Ketentuan ini, silakan hubungi kami melalui WhatsApp di <a href="https://wa.me/6287728382093" style={{ color: '#8b5cf6' }}>0877-2838-2093</a>.</p>

        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#8b5cf6', color: '#fff', borderRadius: '12px', fontWeight: 600, textDecoration: 'none' }}>Buat CV Sekarang</Link>
          <Link href="/kebijakan-privasi" style={{ fontSize: '0.9rem', color: '#6b7280', textDecoration: 'none' }}>Lihat Kebijakan Privasi →</Link>
        </div>
      </div>
    </main>
  );
}
