'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCVData } from '@/hooks/useCVData';
import { motion } from 'framer-motion';
import styles from './builder.module.css';

import PersonalForm from '@/components/builder/PersonalForm';
import ExperienceForm from '@/components/builder/ExperienceForm';
import EducationForm from '@/components/builder/EducationForm';
import SkillsForm from '@/components/builder/SkillsForm';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

export default function BuilderPage() {
  const router = useRouter();
  const { data, updateData, isLoaded } = useCVData();

  if (!isLoaded) return <div className={styles.container}></div>;

  return (
    <div className={styles.container}>


      <motion.main 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <h1 className={styles.title}>Isi Data Anda</h1>
          <p className={styles.subtitle}>Cukup lengkapi data di bawah, AI kami yang akan menyusun CV profesional untuk Anda.</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PersonalForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <EducationForm data={data} updateData={updateData} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillsForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ExperienceForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ marginTop: '4rem', textAlign: 'center' }}>
            <button className={styles.previewBtn} onClick={() => router.push('/generating')} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            Buat CV Saya
            </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
