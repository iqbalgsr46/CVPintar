'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './generating.module.css';

const loadingTexts = [
  "Menganalisis data profil dan pengalaman Anda...",
  "Mengekstraksi kata kunci untuk optimasi ATS...",
  "Menyusun tata bahasa dan diksi profesional...",
  "Menerapkan struktur CV berstandar industri...",
  "Melakukan finalisasi tata letak akhir..."
];

export default function GeneratingPage() {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const calledApi = useRef(false);

  useEffect(() => {
    // Cycle loading texts every 3 seconds
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const processAI = async () => {
      if (calledApi.current) return;
      calledApi.current = true;

      // 1. Read raw data from local storage
      const rawData = localStorage.getItem('cvpintar_data');
      if (!rawData) {
        router.push('/builder');
        return;
      }

      try {
        // 2. Call the AI API
        const response = await fetch('/api/generate-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: rawData
        });

        const polishedData = await response.json();

        // 3. Save polished data back to local storage
        localStorage.setItem('cvpintar_data', JSON.stringify(polishedData));

        // 4. Redirect to preview
        router.replace('/preview');

      } catch (error) {
        console.warn("AI Generation network error:", error);
        // Network error - just go to preview with existing raw data
        router.replace('/preview');
      }
    };

    processAI();
  }, [router]);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.orbWrapper}>
        <motion.div 
          className={styles.glowingOrb}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 60, delay: 0.2 }}
        >
          <div className={styles.eye}></div>
          <div className={styles.eye}></div>
        </motion.div>
        <motion.div 
          className={styles.shadow}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        ></motion.div>
      </div>

      <div className={styles.statusContainer}>
        <div className={styles.greeting}>
          Halo! Saya <span className={styles.aiName}>CVPintar</span> 👋
        </div>
        <div className={styles.textCycler}>
          <AnimatePresence mode="wait">
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{ position: 'absolute', width: '100%' }}
            >
              {loadingTexts[textIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
