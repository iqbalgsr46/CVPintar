import React from 'react';
import styles from '@/app/preview/preview.module.css';

export default function CVTemplate({ data = {} as any, isPaid = false }: { data: any, isPaid?: boolean }) {
  const personal = data?.personal || {};
  const education = data?.education || [];
  const courses = data?.courses || [];
  const skills = data?.skills || '';
  const experience = data?.experience || [];
  const generatedSummary = data?.generatedSummary || '';
  const generatedExperience = data?.generatedExperience || [];

  const displayExperience = generatedExperience.length > 0 ? generatedExperience : experience;

  return (
    <div className={styles.a4Paper}>
      {/* Watermark */}
      {!isPaid && (
        <div className={styles.watermarkContainer}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className={styles.watermarkItem}>
              CVPINTAR
            </div>
          ))}
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className={styles.cvHeader}>
        <div className={styles.cvName}>{personal.fullName || 'NAMA LENGKAP'}</div>
        <div className={styles.cvContact}>
          {[
            personal.address,
            personal.phone,
            personal.email,
          ].filter(Boolean).join('  |  ')}
        </div>
      </div>

      <div className={styles.cvDivider}></div>

      {/* ===== RINGKASAN PROFIL ===== */}
      {generatedSummary && (
        <div className={styles.cvSection}>
          <div className={styles.cvSectionTitle}>RINGKASAN PROFIL</div>
          <div className={styles.cvDividerThin}></div>
          <p className={styles.cvText}>{generatedSummary}</p>
        </div>
      )}

      {/* ===== KEAHLIAN (CORE COMPETENCIES) - ATS Standard puts this at the top ===== */}
      {skills && (
        <div className={styles.cvSection}>
          <div className={styles.cvSectionTitle}>KEAHLIAN</div>
          <div className={styles.cvDividerThin}></div>
          <p className={styles.cvText}>{skills}</p>
        </div>
      )}

      {/* ===== PENGALAMAN KERJA ===== */}
      {displayExperience.length > 0 && (
        <div className={styles.cvSection}>
          <div className={styles.cvSectionTitle}>PENGALAMAN KERJA</div>
          <div className={styles.cvDividerThin}></div>
          {displayExperience.map((exp: any, i: number) => (
            <div key={exp.id || i} className={styles.cvEntry}>
              <div className={styles.cvEntryHeader}>
                <span className={styles.cvBold}>{exp.company}</span>
                <span className={styles.cvDate}>{exp.yearStart} - {exp.yearEnd}</span>
              </div>
              <div className={styles.cvRole}>{exp.position}</div>
              
              {/* Legacy fallback for old data */}
              {exp.description && (
                <div className={styles.cvDesc}>{exp.description}</div>
              )}
              
              {/* New Hybrid Format */}
              {exp.summary && (
                <div className={styles.cvDesc} style={{ marginBottom: '0.4rem', marginTop: '0.2rem' }}>{exp.summary}</div>
              )}
              {exp.achievements && Array.isArray(exp.achievements) ? (
                <ul className={styles.cvDesc} style={{ paddingLeft: '1.2rem', marginTop: 0 }}>
                  {exp.achievements.map((ach: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: '0.2rem' }}>{ach}</li>
                  ))}
                </ul>
              ) : exp.achievements ? (
                <div className={styles.cvDesc}>{exp.achievements}</div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* ===== PENDIDIKAN ===== */}
      {education.length > 0 && (
        <div className={styles.cvSection}>
          <div className={styles.cvSectionTitle}>PENDIDIKAN</div>
          <div className={styles.cvDividerThin}></div>
          {education.map((edu: any) => (
            <div key={edu.id} className={styles.cvEntry}>
              <div className={styles.cvEntryHeader}>
                <span className={styles.cvBold}>{edu.school}</span>
                <span className={styles.cvDate}>{edu.graduationYear}</span>
              </div>
              {edu.major && <div className={styles.cvRole}>{edu.major}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ===== PELATIHAN & SERTIFIKASI ===== */}
      {courses && courses.length > 0 && (
        <div className={styles.cvSection}>
          <div className={styles.cvSectionTitle}>PELATIHAN &amp; SERTIFIKASI</div>
          <div className={styles.cvDividerThin}></div>
          {courses.map((course: any) => (
            <div key={course.id} className={styles.cvEntry}>
              <div className={styles.cvEntryHeader}>
                <span className={styles.cvBold}>{course.institution}</span>
                <span className={styles.cvDate}>{course.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
