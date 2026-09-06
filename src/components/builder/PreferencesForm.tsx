import React from 'react';
import { CVData } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { Settings } from 'lucide-react';

export default function PreferencesForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const handlePageChange = (pages: '1' | '2') => {
    updateData({ ...data, preferences: { ...data.preferences, pages } });
  };

  const pages = data.preferences?.pages || '1';

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Settings size={28} strokeWidth={2.5} />
        Pengaturan CV
      </h2>
      <div className={styles.formGroup} style={{ marginTop: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, color: '#3f3f46' }}>
          Panjang Halaman CV yang Diharapkan
        </label>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <label 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              padding: '1.25rem',
              border: pages === '1' ? '2px solid #8b5cf6' : '2px solid #e4e4e7',
              borderRadius: '12px',
              background: pages === '1' ? '#f5f3ff' : '#fff',
              flex: 1,
              minWidth: '200px',
              transition: 'all 0.2s'
            }}
          >
            <input 
              type="radio" 
              name="pages" 
              value="1" 
              checked={pages === '1'} 
              onChange={() => handlePageChange('1')} 
              style={{ width: '1.25rem', height: '1.25rem', accentColor: '#8b5cf6', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: 600, color: '#18181b', fontSize: '1.05rem' }}>1 Lembar</div>
              <div style={{ fontSize: '0.85rem', color: '#71717a', marginTop: '0.2rem', lineHeight: 1.4 }}>Padat & singkat, cocok untuk fresh graduate</div>
            </div>
          </label>
          <label 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              padding: '1.25rem',
              border: pages === '2' ? '2px solid #8b5cf6' : '2px solid #e4e4e7',
              borderRadius: '12px',
              background: pages === '2' ? '#f5f3ff' : '#fff',
              flex: 1,
              minWidth: '200px',
              transition: 'all 0.2s'
            }}
          >
            <input 
              type="radio" 
              name="pages" 
              value="2" 
              checked={pages === '2'} 
              onChange={() => handlePageChange('2')} 
              style={{ width: '1.25rem', height: '1.25rem', accentColor: '#8b5cf6', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: 600, color: '#18181b', fontSize: '1.05rem' }}>2 Lembar</div>
              <div style={{ fontSize: '0.85rem', color: '#71717a', marginTop: '0.2rem', lineHeight: 1.4 }}>Lebih detail, cocok jika punya banyak pengalaman</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
