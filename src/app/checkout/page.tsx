'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const [method, setMethod] = useState('qris');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePay = () => {
    setStatus('processing');
    
    // Simulate payment processing delay (2 seconds)
    setTimeout(() => {
      setStatus('success');
      localStorage.setItem('cvpintar_paid', 'true');
      
      // Auto redirect back to preview after showing success for 2 seconds
      setTimeout(() => {
        router.push('/preview');
      }, 2000);
    }, 2000);
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
                <h1>CVPintar Pay</h1>
                <p>Selesaikan pembayaran untuk mengunduh CV Anda.</p>
              </div>

              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span style={{ color: '#a1a1aa' }}>Item</span>
                  <span>Hapus Watermark CV</span>
                </div>
                <div className={styles.summaryRow}>
                  <span style={{ color: '#a1a1aa' }}>Biaya Admin</span>
                  <span>Rp 1.000</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Total Tagihan</span>
                  <span>Rp 50.000</span>
                </div>
              </div>

              <div className={styles.paymentMethods}>
                <div 
                  className={`${styles.methodCard} ${method === 'qris' ? styles.active : ''}`}
                  onClick={() => setMethod('qris')}
                >
                  <div style={{ fontSize: '1.5rem' }}>📱</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>QRIS (OVO, GoPay, Dana)</div>
                    <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Scan kode QR instan</div>
                  </div>
                </div>
                
                <div 
                  className={`${styles.methodCard} ${method === 'transfer' ? styles.active : ''}`}
                  onClick={() => setMethod('transfer')}
                >
                  <div style={{ fontSize: '1.5rem' }}>🏦</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Transfer Bank (Virtual Account)</div>
                    <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>BCA, Mandiri, BNI, BRI</div>
                  </div>
                </div>
              </div>

              <button 
                className={styles.payBtn} 
                onClick={handlePay}
                disabled={status === 'processing'}
              >
                {status === 'processing' ? 'Memproses...' : 'Bayar Rp 50.000'}
              </button>
              
              <button 
                onClick={() => router.back()}
                style={{ background: 'transparent', color: '#a1a1aa', border: 'none', width: '100%', marginTop: '1rem', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Batal
              </button>
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
              <h2 style={{ marginBottom: '0.5rem' }}>Pembayaran Berhasil!</h2>
              <p style={{ color: '#a1a1aa' }}>Mengarahkan kembali ke CV Anda...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
