'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './generating.module.css';

const loadingTexts = [
  "Menganalisis profil Anda...",
  "Merangkai kalimat profesional...",
  "Menyesuaikan format standar HRD...",
  "Menata tata letak CV Anda...",
  "Membuat sentuhan akhir..."
];

export default function GeneratingPage() {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const calledApi = useRef(false);

  useEffect(() => {
    // Cycle loading texts every 2.5 seconds for a smoother read
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);

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
    <div className={styles.container}>
      <motion.div 
        className={styles.glowingOrb}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
      >
        <div className={styles.core}></div>
      </motion.div>

      <div className={styles.statusText}>
        <AnimatePresence mode="sync">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '100%' }}
          >
            {loadingTexts[textIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.p 
        className={styles.subText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Mohon tunggu, keajaiban sedang diproses...
      </motion.p>
    </div>
  );
}
