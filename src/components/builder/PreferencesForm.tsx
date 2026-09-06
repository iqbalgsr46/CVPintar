import React from 'react';
import { CVData } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { Settings, FileText, Layers } from 'lucide-react';

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
      
      <div className={styles.formGroup} style={{ marginTop: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: '#64748b', fontSize: '0.85rem' }}>
          Panjang Halaman CV yang Diharapkan
        </label>
        <div className={styles.preferencesGrid}>
          {/* Option 1: 1 Page */}
          <button
            type="button"
            onClick={() => handlePageChange('1')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              padding: '1.5rem 1rem',
              border: pages === '1' ? '2px solid #8b5cf6' : '2px solid #e2e8f0',
              borderRadius: '16px',
              background: pages === '1' ? '#f5f3ff' : '#fff',
              transition: 'all 0.2s ease',
              boxShadow: pages === '1' ? '0 0 0 4px rgba(139, 92, 246, 0.1)' : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: pages === '1' ? '#8b5cf6' : '#f1f5f9',
              color: pages === '1' ? '#fff' : '#94a3b8',
              transition: 'all 0.2s ease',
            }}>
              <FileText size={24} strokeWidth={2} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontWeight: 700, 
                color: pages === '1' ? '#5b21b6' : '#18181b', 
                fontSize: '1.1rem',
                transition: 'color 0.2s ease',
              }}>
                1 Lembar
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#71717a', 
                marginTop: '0.35rem', 
                lineHeight: 1.4 
              }}>
                Padat & singkat
              </div>
            </div>
          </button>

          {/* Option 2: 2 Pages */}
          <button
            type="button"
            onClick={() => handlePageChange('2')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              padding: '1.5rem 1rem',
              border: pages === '2' ? '2px solid #8b5cf6' : '2px solid #e2e8f0',
              borderRadius: '16px',
              background: pages === '2' ? '#f5f3ff' : '#fff',
              transition: 'all 0.2s ease',
              boxShadow: pages === '2' ? '0 0 0 4px rgba(139, 92, 246, 0.1)' : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: pages === '2' ? '#8b5cf6' : '#f1f5f9',
              color: pages === '2' ? '#fff' : '#94a3b8',
              transition: 'all 0.2s ease',
            }}>
              <Layers size={24} strokeWidth={2} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontWeight: 700, 
                color: pages === '2' ? '#5b21b6' : '#18181b', 
                fontSize: '1.1rem',
                transition: 'color 0.2s ease',
              }}>
                2 Lembar
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#71717a', 
                marginTop: '0.35rem', 
                lineHeight: 1.4 
              }}>
                Detail & lengkap
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
