import React from 'react';
import { CVData } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { User } from 'lucide-react';

export default function PersonalForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <User size={28} strokeWidth={2.5} />
        Data Diri
      </h2>
      <div className={styles.formGroup}>
        <label>Nama Lengkap&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input name="fullName" className={styles.input} value={data.personal.fullName} onChange={handleChange} placeholder="Contoh: Tubagus Iqbal Husaeni" />
      </div>
      
      <div className={styles.grid2}>
        <div className={styles.formGroup}>
          <label>No. HP / WhatsApp&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <input name="phone" className={styles.input} value={data.personal.phone} onChange={handleChange} placeholder="Contoh: 0812-3456-7890" />
        </div>
        <div className={styles.formGroup}>
          <label>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <input name="email" type="email" className={styles.input} value={data.personal.email} onChange={handleChange} placeholder="Contoh: email@gmail.com" />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Alamat / Domisili&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input name="address" className={styles.input} value={data.personal.address} onChange={handleChange} placeholder="Contoh: Cikarang, Bekasi, Jawa Barat" />
      </div>
    </div>
  );
}
