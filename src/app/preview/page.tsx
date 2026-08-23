'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCVData } from '@/hooks/useCVData';
import styles from './preview.module.css';
import CVTemplate from '@/components/preview/CVTemplate';
import Swal from 'sweetalert2';

export default function PreviewPage() {
  const router = useRouter();
  const { data, isLoaded } = useCVData();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    fetch('/api/check-payment')
      .then(res => res.json())
      .then(data => { if (data.paid) setIsPaid(true); })
      .catch(() => {});
  }, []);

  if (!isLoaded) return <div className={styles.container}></div>;

  const handleDownloadPDF = () => {
    if (!isPaid) return router.push('/checkout');
    
    Swal.fire({
      title: 'Menyiapkan PDF',
      html: "Untuk menjaga format CV <b>Lolos ATS</b>, kami menggunakan mesin cetak bawaan.<br/><br/><b>PENTING:</b> Pada layar selanjutnya, pastikan Anda memilih tujuan <b>'Save as PDF / Simpan sebagai PDF'</b>.",
      icon: 'info',
      confirmButtonText: 'Oke, Saya Mengerti',
      confirmButtonColor: '#8b5cf6',
      background: '#18181b',
      color: '#fff',
      customClass: {
        popup: 'rounded-2xl border border-zinc-800'
      }
    }).then(() => {
      // Tunggu Swal selesai menutup dan merestore body overflow sebelum print
      setTimeout(() => {
        window.print();
      }, 500);
    });
  };


  return (
    <div className={styles.container}>
      {/* Canvas */}
      <main className={styles.canvasWrapper} id="cv-export-wrapper">
        <CVTemplate data={data} isPaid={isPaid} />
      </main>

      {/* Floating Action Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <button className={styles.backBtn} onClick={() => router.push('/builder')}>
            Edit
          </button>
          
          {isPaid ? (
            <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
              <button className={`${styles.payBtn} ${styles.btnPdf}`} onClick={handleDownloadPDF}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M14 2v6h6l-6-6z" fill="currentColor" fillOpacity="0.4"/>
                  <text x="12" y="16.5" fill="currentColor" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">PDF</text>
                </svg>
                PDF (.pdf)
              </button>
            </div>
          ) : (
            <button className={styles.payBtn} onClick={() => router.push('/checkout')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              Unduh Tanpa Watermark
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
