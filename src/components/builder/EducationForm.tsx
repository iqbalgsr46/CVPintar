import React from 'react';
import { CVData, Education } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { GraduationCap, Trash2, Plus } from 'lucide-react';

export default function EducationForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const addEdu = () => {
    const newEdu: Education = { id: Date.now().toString(), school: '', major: '', graduationYear: '' };
    updateData({ ...data, education: [...data.education, newEdu] });
  };

  const removeEdu = (id: string) => {
    updateData({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateData({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <GraduationCap size={28} strokeWidth={2.5} />
        Pendidikan Terakhir
      </h2>
      
      <div className={styles.cardList}>
        {data.education.map(edu => (
          <div key={edu.id} className={styles.itemCard}>
            <button className={styles.removeBtn} onClick={() => removeEdu(edu.id)} title="Hapus">
              <Trash2 size={18} strokeWidth={2} />
            </button>
            <div className={styles.formGroup}>
              <label>Nama Sekolah / Universitas</label>
              <input className={styles.input} value={edu.school} onChange={e => handleChange(edu.id, 'school', e.target.value)} placeholder="Contoh: SMK Negeri 1 Cikarang" />
            </div>
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label>Jurusan</label>
                <input className={styles.input} value={edu.major} onChange={e => handleChange(edu.id, 'major', e.target.value)} placeholder="Contoh: Administrasi Perkantoran" />
              </div>
              <div className={styles.formGroup}>
                <label>Tahun Lulus</label>
                <input className={styles.input} value={edu.graduationYear} onChange={e => handleChange(edu.id, 'graduationYear', e.target.value)} placeholder="Contoh: 2018" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className={styles.addBtn} onClick={addEdu}>
        <Plus size={20} strokeWidth={2.5} />
        Tambah Pendidikan
      </button>
    </div>
  );
}
