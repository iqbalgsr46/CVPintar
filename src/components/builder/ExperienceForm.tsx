import React from 'react';
import { CVData, Experience } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { BriefcaseBusiness, Trash2, Plus, Lightbulb } from 'lucide-react';

export default function ExperienceForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const addExp = () => {
    const newExp: Experience = { id: Date.now().toString(), company: '', position: '', yearStart: '', yearEnd: '', description: '' };
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
        Pengalaman (Kerja / Magang / Organisasi)
      </h2>

      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <Lightbulb color="#0284c7" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#0369a1', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.35rem' }}>Tips Fresh Graduate</h4>
          <div style={{ color: '#0c4a6e', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Belum punya pengalaman kerja? Jangan dikosongkan! Kamu bisa memasukkan:
            <ul style={{ margin: '0.35rem 0', paddingLeft: '1.25rem', color: '#0369a1', fontWeight: 500 }}>
              <li>Magang / PKL</li>
              <li>Organisasi Sekolah / Kampus</li>
              <li>Tugas Akhir / Skripsi</li>
            </ul>
            Biar AI kami yang menyulapnya jadi pengalaman profesional yang memukau HRD!
          </div>
        </div>
      </div>
      
      <div className={styles.cardList}>
        {data.experience.map(exp => (
          <div key={exp.id} className={styles.itemCard}>
            <button className={styles.removeBtn} onClick={() => removeExp(exp.id)} title="Hapus">
              <Trash2 size={18} strokeWidth={2} />
            </button>
            <div className={styles.formGroup}>
              <label>Nama Perusahaan / Instansi / Kampus&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input className={styles.input} value={exp.company} onChange={e => handleChange(exp.id, 'company', e.target.value)} placeholder="Contoh: PT Sungwon atau BEM Universitas" />
            </div>
            <div className={styles.formGroup}>
              <label>Posisi / Jabatan&nbsp;<span style={{ color: 'red' }}>*</span></label>
              <input className={styles.input} value={exp.position} onChange={e => handleChange(exp.id, 'position', e.target.value)} placeholder="Contoh: Admin Gudang atau Ketua Panitia" />
            </div>
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label>Periode Masuk&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input className={styles.input} value={exp.yearStart} onChange={e => handleChange(exp.id, 'yearStart', e.target.value)} placeholder="Contoh: Jan 2019" />
              </div>
              <div className={styles.formGroup}>
                <label>Periode Keluar&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input className={styles.input} value={exp.yearEnd} onChange={e => handleChange(exp.id, 'yearEnd', e.target.value)} placeholder="Contoh: Des 2023 / Sekarang" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>
                Ceritakan singkat tugasmu 
                <span style={{ color: '#8b5cf6', marginLeft: '4px' }}>(Opsional, tapi sangat membantu AI)</span>
              </label>
              <textarea 
                className={styles.input} 
                value={exp.description || ''} 
                onChange={e => handleChange(exp.id, 'description', e.target.value)} 
                placeholder="Contoh: Saya mengurus surat masuk keluar, input data ke Excel, dan bantu atasan bikin laporan bulanan. Kadang juga handle telepon dari customer."
                rows={5}
                style={{ resize: 'vertical', minHeight: '120px' }}
              />
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
