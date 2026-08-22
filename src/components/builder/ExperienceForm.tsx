import React from 'react';
import { CVData, Experience } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { BriefcaseBusiness, Trash2, Plus } from 'lucide-react';

export default function ExperienceForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const addExp = () => {
    const newExp: Experience = { id: Date.now().toString(), company: '', position: '', yearStart: '', yearEnd: '' };
    updateData({ ...data, experience: [...data.experience, newExp] });
  };

  const removeExp = (id: string) => {
    updateData({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const handleChange = (id: string, field: keyof Experience, value: string) => {
    updateData({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <BriefcaseBusiness size={28} strokeWidth={2.5} />
        Pengalaman Kerja
      </h2>
      
      <div className={styles.cardList}>
        {data.experience.map(exp => (
          <div key={exp.id} className={styles.itemCard}>
            <button className={styles.removeBtn} onClick={() => removeExp(exp.id)} title="Hapus">
              <Trash2 size={18} strokeWidth={2} />
            </button>
            <div className={styles.formGroup}>
              <label>Nama Perusahaan</label>
              <input className={styles.input} value={exp.company} onChange={e => handleChange(exp.id, 'company', e.target.value)} placeholder="Contoh: PT Indonesia Epson Industry" />
            </div>
            <div className={styles.formGroup}>
              <label>Bagian / Posisi</label>
              <input className={styles.input} value={exp.position} onChange={e => handleChange(exp.id, 'position', e.target.value)} placeholder="Contoh: Staf Administrasi" />
            </div>
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label>Tahun Masuk</label>
                <input className={styles.input} value={exp.yearStart} onChange={e => handleChange(exp.id, 'yearStart', e.target.value)} placeholder="Contoh: 2019" />
              </div>
              <div className={styles.formGroup}>
                <label>Tahun Keluar</label>
                <input className={styles.input} value={exp.yearEnd} onChange={e => handleChange(exp.id, 'yearEnd', e.target.value)} placeholder="Contoh: 2023" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className={styles.addBtn} onClick={addExp}>
        <Plus size={20} strokeWidth={2.5} />
        Tambah Pengalaman Kerja
      </button>
    </div>
  );
}
