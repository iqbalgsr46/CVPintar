import React from 'react';
import { CVData, Course } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { Award, Star, Trash2, Plus } from 'lucide-react';

export default function SkillsForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const addCourse = () => {
    const newCourse: Course = { id: Date.now().toString(), institution: '', courseName: '', yearStart: '', yearEnd: '' };
    updateData({ ...data, courses: [...(data.courses || []), newCourse] });
  };

  const removeCourse = (id: string) => {
    updateData({ ...data, courses: (data.courses || []).filter(c => c.id !== id) });
  };

  const handleCourseChange = (id: string, field: keyof Course, value: string) => {
    updateData({
      ...data,
      courses: (data.courses || []).map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  return (
    <>
      {/* Kursus / Pelatihan */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Award size={28} strokeWidth={2.5} />
          Kursus / Pelatihan
          <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 400, marginLeft: '0.5rem' }}>(opsional)</span>
        </h2>
        
        <div className={styles.cardList}>
          {(data.courses || []).map(course => (
            <div key={course.id} className={styles.itemCard}>
              <button className={styles.removeBtn} onClick={() => removeCourse(course.id)} title="Hapus">
                <Trash2 size={18} strokeWidth={2} />
              </button>
              <div className={styles.formGroup}>
                <label>Nama Kursus / Pelatihan</label>
                <input className={styles.input} value={course.courseName || ''} onChange={e => handleCourseChange(course.id, 'courseName', e.target.value)} placeholder="Contoh: Pelatihan Komputer" />
              </div>
              <div className={styles.formGroup}>
                <label>Nama Lembaga</label>
                <input className={styles.input} value={course.institution} onChange={e => handleCourseChange(course.id, 'institution', e.target.value)} placeholder="Contoh: LKP WIKARA" />
              </div>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Periode Mulai</label>
                  <input className={styles.input} value={course.yearStart || ''} onChange={e => handleCourseChange(course.id, 'yearStart', e.target.value)} placeholder="Contoh: Jan 2021" />
                </div>
                <div className={styles.formGroup}>
                  <label>Periode Selesai</label>
                  <input className={styles.input} value={course.yearEnd || ''} onChange={e => handleCourseChange(course.id, 'yearEnd', e.target.value)} placeholder="Contoh: Agt 2021" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className={styles.addBtn} onClick={addCourse}>
          <Plus size={20} strokeWidth={2.5} />
          Tambah Kursus
        </button>
      </div>

      {/* Keahlian */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Star size={28} strokeWidth={2.5} />
          Keahlian
        </h2>
        <div className={styles.formGroup} style={{ marginTop: '2rem' }}>
          <label>Keahlian yang Anda miliki&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <textarea 
            className={styles.input} 
            value={data.skills} 
            onChange={(e) => updateData({ ...data, skills: e.target.value })} 
            placeholder="Contoh: Microsoft Excel, Administrasi, Data Entry" 
            rows={4}
          />
        </div>
      </div>
    </>
  );
}
