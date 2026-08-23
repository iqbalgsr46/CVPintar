'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
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
        localStorage.setItem('cvpintar_paid', 'true');
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
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div 
        className={styles.checkoutBox}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
      >
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="form"
              className={styles.formContainer}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className={styles.topBar}>
                <div className={styles.brand}>
                  <img src="/images/logo-cvpintar.png" alt="Logo" style={{ height: '28px', width: 'auto' }} />
                  CVPintar
                </div>
                <button className={styles.cancelBtn} onClick={() => router.push('/preview')}>
                  Batal
                </button>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className={styles.qrisSection}>
                  <img src="/CV-PINTAR-QRIS-NEW.jpeg" alt="QRIS" className={styles.qrisImage} />
                  <div style={{ marginTop: '0.5rem', color: '#71717a', fontSize: '0.8rem', textAlign: 'center' }}>
                    *Mohon input nominal <strong>Rp 10.000</strong> secara manual
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.amountSection}>
                  <div className={styles.amountLeft}>
                    <span className={styles.amountLabel}>Total Tagihan</span>
                    <span className={styles.amountValue}>Rp10.000</span>
                  </div>
                  <div className={styles.amountRight}>
                    IDR
                  </div>
                </div>

                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                />

                <button 
                  className={styles.mainActionBtn} 
                  onClick={handleUploadClick}
                >
                  Upload Bukti Transfer
                </button>

                <div className={styles.footerLinks}>
                  <a href="/CV-PINTAR-QRIS-NEW.jpeg" download="QRIS-CVPintar.jpeg" className={styles.footerLink}>
                    Simpan QRIS
                  </a>
                  <span style={{ color: '#d4d4d8' }}>/</span>
                  <button onClick={() => router.push('/builder')} className={styles.footerLink}>
                    Kembali ke Edit
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'verifying' && (
            <motion.div
              key="verifying"
              className={styles.statusState}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ justifyContent: 'center' }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <svg className={styles.flyingPlane} width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Speed lines */}
                  <line className={styles.speedLine} x1="22" y1="62" x2="33" y2="55" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" />
                  <line className={styles.speedLine2} x1="18" y1="75" x2="32" y2="66" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                  <line className={styles.speedLine3} x1="34" y1="84" x2="44" y2="77" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Plane Body */}
                  <polygon points="15,45 90,30 45,52" fill="#059669" />
                  <polygon points="45,52 90,30 75,75" fill="#10b981" />
                  <polygon points="45,52 42,75 60,63" fill="#022c22" />
                </svg>
              </div>
              <h2 className={styles.statusTitle}>Memproses...</h2>
              <p className={styles.statusDesc}>Transfer Anda sedang diproses</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              className={styles.statusState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              style={{ justifyContent: 'center' }}
            >
              <div style={{ marginBottom: '2rem', filter: 'drop-shadow(3px 4px 0px rgba(0,0,0,0.85))' }}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Scalloped Badge */}
                  <path d="M50,4 C57.5,4 61.5,10.5 68.5,12 C76,13.5 81.5,19 83,26.5 C84.5,33.5 91,37.5 91,45 C91,52.5 84.5,56.5 83,63.5 C81.5,71 76,76.5 68.5,78 C61.5,79.5 57.5,86 50,86 C42.5,86 38.5,79.5 31.5,78 C24,76.5 18.5,71 17,63.5 C15.5,56.5 9,52.5 9,45 C9,37.5 15.5,33.5 17,26.5 C18.5,19 24,13.5 31.5,12 C38.5,10.5 42.5,4 50,4 Z" fill="#0ea5e9" style={{ fill: '#16a34a' }} />
                  {/* Inner Checkmark */}
                  <path d="M35 48 L46 60 L68 35" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className={styles.statusTitle} style={{ marginBottom: '0.5rem' }}>Berhasil!</h2>
              <p className={styles.statusDesc} style={{ marginBottom: '2rem' }}>Pembayaran berhasil dikonfirmasi</p>
              <button 
                className={styles.mainActionBtn}
                style={{ width: 'auto', padding: '0.8rem 2.5rem', borderRadius: '30px' }}
                onClick={() => router.push('/preview')}
              >
                Lanjutkan
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              className={styles.statusState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              style={{ justifyContent: 'center' }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#f43f5e" />
                  <path d="M35 35 L65 65 M65 35 L35 65" stroke="white" strokeWidth="10" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className={styles.statusTitle} style={{ marginBottom: '0.5rem' }}>Gagal</h2>
              <p className={styles.statusDesc} style={{ marginBottom: '2rem', maxWidth: '300px' }}>
                {errorMessage || 'Gambar ini sudah pernah digunakan. Silakan lakukan pembayaran baru dan upload bukti transfer yang baru.'}
              </p>
              <button 
                className={styles.mainActionBtn}
                style={{ width: 'auto', padding: '0.8rem 2.5rem', borderRadius: '30px' }}
                onClick={() => setStatus('idle')}
              >
                Coba Lagi
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
