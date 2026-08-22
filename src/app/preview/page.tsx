'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCVData } from '@/hooks/useCVData';
import styles from './preview.module.css';
import CVTemplate from '@/components/preview/CVTemplate';

export default function PreviewPage() {
  const router = useRouter();
  const { data, isLoaded } = useCVData();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cvpintar_paid') === 'true') {
      setIsPaid(true);
    }
  }, []);

  if (!isLoaded) return <div className={styles.container}></div>;

  const handleDownload = () => {
    if (isPaid) {
      alert("Memproses pengunduhan PDF...");
      window.print();
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className={styles.container}>
      {/* Canvas */}
      <main className={styles.canvasWrapper}>
        <CVTemplate data={data} isPaid={isPaid} />
      </main>

      {/* Floating Action Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <button className={styles.backBtn} onClick={() => router.push('/builder')}>
            Edit
          </button>
          
          {isPaid ? (
            <button className={styles.payBtn} onClick={handleDownload} style={{ background: '#8b5cf6', color: '#fff' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Unduh PDF
            </button>
          ) : (
            <button className={styles.payBtn} onClick={handleDownload}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              Unduh Tanpa Watermark
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
