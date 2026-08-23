'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [status, setStatus] = useState<'idle' | 'uploading' | 'verifying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('verifying');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.isValid) {
        setStatus('success');
        // Cookie ter-enkripsi sudah di-set otomatis oleh server
        setTimeout(() => {
          router.push('/preview');
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(data.reason || 'Gambar tidak valid.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Terjadi kesalahan jaringan atau server saat memverifikasi.');
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.checkoutBox}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className={styles.header}>
                <h1>Pembayaran Premium</h1>
                <p>Hapus watermark & unduh CV tanpa batas.</p>
              </div>

              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span style={{ color: '#a1a1aa' }}>Layanan</span>
                  <span style={{ fontWeight: 500 }}>Hapus Watermark</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryRow}>
                  <span style={{ color: '#a1a1aa' }}>Total Tagihan</span>
                  <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#c084fc' }}>Rp 10.000</span>
                </div>
              </div>

              <div className={styles.stepsContainer}>
                <div className={styles.stepBox}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>1</span>
                    <span className={styles.stepTitle}>Scan & Bayar</span>
                  </div>
                  
                  <div className={styles.qrisWrapper}>
                    <img src="/QRIS-CV-AI.jpeg" alt="QRIS DevTech AI Store" style={{ width: '160px', borderRadius: '8px', display: 'block', marginBottom: '0.75rem' }} />
                    <a 
                      href="/QRIS-CV-AI.jpeg" 
                      download="QRIS-CVPintar.jpeg"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem', background: '#f3e8ff', color: '#8b5cf6', borderRadius: '8px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, width: '100%', justifyContent: 'center', transition: 'all 0.2s' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      Simpan QRIS
                    </a>
                  </div>
                  
                  <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
                    Otomatis terisi <strong style={{color:'#fff'}}>Rp 10.000</strong>
                  </div>
                </div>

                <div className={styles.stepBox}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>2</span>
                    <span className={styles.stepTitle}>Verifikasi Otomatis</span>
                  </div>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                  />
                  
                  {status === 'error' && (
                    <div className={styles.errorBox}>
                      <strong>Verifikasi Gagal:</strong><br/>{errorMessage}
                    </div>
                  )}

                  <div 
                    className={styles.uploadArea} 
                    onClick={handleUploadClick}
                    style={{ pointerEvents: status === 'verifying' ? 'none' : 'auto', opacity: status === 'verifying' ? 0.7 : 1 }}
                  >
                    {status === 'verifying' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', padding: '0.5rem 0' }}>
                        <div className={styles.spinner}></div>
                        <span style={{ color: '#c084fc', fontSize: '0.9rem', fontWeight: 500 }}>Mengecek Struk...</span>
                      </div>
                    ) : (
                      <>
                        <div style={{ color: '#c084fc', marginBottom: '0.25rem' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        </div>
                        <div style={{ fontWeight: 500, color: '#fff', fontSize: '0.95rem' }}>Upload Bukti Transfer</div>
                        <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Format JPG/PNG</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={() => router.back()}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1.25rem', background: 'rgba(255, 255, 255, 0.05)', color: '#d4d4d8', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = '#d4d4d8'; }}
                >
                  Kembali
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className={styles.successState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className={styles.checkIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 style={{ marginBottom: '0.5rem' }}>Verifikasi Berhasil!</h2>
              <p style={{ color: '#a1a1aa' }}>Terima kasih. Membuka kunci CV Premium Anda...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
