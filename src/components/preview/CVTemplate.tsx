'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/preview/preview.module.css';

type Chunk = {
  id: string;
  type: 'header' | 'summary' | 'skills' | 'experience' | 'education' | 'course';
  title?: string;
  element: React.ReactNode;
};

export default function CVTemplate({ data = {} as any, isPaid = false }: { data: any, isPaid?: boolean }) {
  const personal = data?.personal || {};
  const education = data?.education || [];
  const courses = data?.courses || [];
  const skills = data?.skills || '';
  const generatedSummary = data?.generatedSummary || '';
  const generatedExperience = data?.generatedExperience || [];
  const experience = data?.experience || [];

  const displayExperience = generatedExperience.length > 0 ? generatedExperience : experience;

  const [pages, setPages] = useState<Chunk[][]>([]);
  const [measuring, setMeasuring] = useState(true);
  const measureRef = useRef<HTMLDivElement>(null);

  const chunks = React.useMemo(() => {
    const newChunks: Chunk[] = [];
    newChunks.push({
      id: 'header',
      type: 'header',
      title: '',
      element: (
        <>
          <div className={styles.cvHeader} style={{ display: personal.photo ? 'flex' : 'block', alignItems: 'center', justifyContent: 'space-between', textAlign: personal.photo ? 'left' : 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.cvName} style={{ marginBottom: personal.photo ? '0.5cqw' : '' }}>{personal.fullName || 'NAMA LENGKAP'}</div>
              <div className={styles.cvContact}>
                {[personal.address, personal.phone, personal.email].filter(Boolean).join('  |  ')}
              </div>
            </div>
            {personal.photo && (
              <img src={personal.photo} alt="Photo" style={{ width: '12cqw', height: '12cqw', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginLeft: '3cqw' }} />
            )}
          </div>
          <div className={styles.cvDivider}></div>
        </>
      )
    });

    if (generatedSummary) {
      newChunks.push({
        id: 'summary',
        type: 'summary',
        title: 'RINGKASAN PROFIL',
        element: <p className={styles.cvText}>{generatedSummary}</p>
      });
    }

    if (skills) {
      newChunks.push({
        id: 'skills',
        type: 'skills',
        title: 'KEAHLIAN',
        element: <p className={styles.cvText}>{skills}</p>
      });
    }

    displayExperience.forEach((exp: any, i: number) => {
      if (!exp.company && !exp.position && !exp.summary && (!exp.achievements || exp.achievements.length === 0)) return;

      const isArray = exp.achievements && Array.isArray(exp.achievements);
      const hasBullets = isArray && exp.achievements.length > 0;
      
      // Chunk 1: Header, Summary, and FIRST bullet (to prevent orphan headers)
      newChunks.push({
        id: `exp-${exp.id || i}-head`,
        type: 'experience',
        title: 'PENGALAMAN KERJA',
        element: (
          <div className={styles.cvEntry} style={{ marginBottom: hasBullets && exp.achievements.length > 1 ? 0 : '1.5cqw' }}>
            <div className={styles.cvEntryHeader}>
              <span className={styles.cvBold}>{exp.company}</span>
              <span className={styles.cvDate}>{exp.yearStart} - {exp.yearEnd}</span>
            </div>
            <div className={styles.cvRole}>{exp.position}</div>
            {exp.summary && (
              <div className={styles.cvDesc} style={{ marginBottom: '0.4rem', marginTop: '0.2rem' }}>{exp.summary}</div>
            )}
            {hasBullets ? (
              <ul className={styles.cvDesc} style={{ paddingLeft: '6cqw', marginTop: '0.5cqw', marginBottom: 0, listStyleType: 'disc', listStylePosition: 'outside' }}>
                <li style={{ marginBottom: '0.5cqw', paddingLeft: '1cqw' }}>{exp.achievements[0]}</li>
              </ul>
            ) : exp.achievements ? (
              <div className={styles.cvDesc}>{exp.achievements}</div>
            ) : null}
          </div>
        )
      });

      // Chunk 2+: Subsequent bullets
      if (hasBullets && exp.achievements.length > 1) {
        for (let j = 1; j < exp.achievements.length; j++) {
          const isLast = j === exp.achievements.length - 1;
          newChunks.push({
            id: `exp-${exp.id || i}-bullet-${j}`,
            type: 'experience',
            title: 'PENGALAMAN KERJA',
            element: (
              <div className={styles.cvEntry} style={{ marginBottom: isLast ? '1.5cqw' : 0 }}>
                <ul className={styles.cvDesc} style={{ paddingLeft: '6cqw', marginTop: 0, marginBottom: 0, listStyleType: 'disc', listStylePosition: 'outside' }}>
                  <li style={{ marginBottom: '0.5cqw', paddingLeft: '1cqw' }}>{exp.achievements[j]}</li>
                </ul>
              </div>
            )
          });
        }
      }
    });

    education.forEach((edu: any, i: number) => {
      if (!edu.school && !edu.major) return;
      newChunks.push({
        id: `edu-${edu.id || i}`,
        type: 'education',
        title: 'PENDIDIKAN',
        element: (
          <div className={styles.cvEntry} style={{ marginBottom: '1.5cqw' }}>
            <div className={styles.cvEntryHeader}>
              <span className={styles.cvBold}>{edu.school}</span>
              <span className={styles.cvDate}>{edu.graduationYear}</span>
            </div>
            {edu.major && <div className={styles.cvRole}>{edu.major}</div>}
          </div>
        )
      });
    });

    courses.forEach((course: any, i: number) => {
      if (!course.courseName && !course.institution) return;
      newChunks.push({
        id: `course-${course.id || i}`,
        type: 'course',
        title: 'PELATIHAN & SERTIFIKASI',
        element: (
          <div className={styles.cvEntry} style={{ marginBottom: '1.5cqw' }}>
            <div className={styles.cvEntryHeader}>
              <span className={styles.cvBold}>{course.courseName || course.institution}</span>
              <span className={styles.cvDate}>{course.yearStart} - {course.yearEnd}</span>
            </div>
            {course.courseName && course.institution && (
              <div className={styles.cvRole}>{course.institution}</div>
            )}
          </div>
        )
      });
    });

    return newChunks;
  }, [personal, generatedSummary, skills, displayExperience, education, courses]);

  // 2. Measure and paginate
  useEffect(() => {
    if (!measureRef.current) return;
    
    // We wait a tiny bit to ensure fonts are rendered
    const timer = setTimeout(() => {
      const container = measureRef.current;
      if (!container || !container.parentElement) return;
      
      const children = Array.from(container.children) as HTMLElement[];
      
      // Calculate max content height accurately using exact pixel values of the A4 paper
      const paperElement = container.parentElement;
      const paperStyle = window.getComputedStyle(paperElement);
      const paddingTop = parseFloat(paperStyle.paddingTop);
      const paddingBottom = parseFloat(paperStyle.paddingBottom);
      
      const totalA4Height = paperElement.offsetHeight;
      const MAX_CONTENT_HEIGHT = totalA4Height - paddingTop - paddingBottom - 10; // 10px safety buffer

      let currentPages: Chunk[][] = [[]];
      let currentHeight = 0;

      children.forEach((child, index) => {
        // Include margin in height calculation
        const style = window.getComputedStyle(child);
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        const h = child.offsetHeight + marginTop + marginBottom;
        
        // Always put header on page 1
        if (index === 0) {
          currentPages[0].push(chunks[index]);
          currentHeight += h;
          return;
        }

        if (currentHeight + h > MAX_CONTENT_HEIGHT && currentPages[currentPages.length - 1].length > 0) {
          // Break to new page
          currentPages.push([]);
          currentHeight = h;
          currentPages[currentPages.length - 1].push(chunks[index]);
        } else {
          // Add to current page
          currentPages[currentPages.length - 1].push(chunks[index]);
          currentHeight += h;
        }
      });

      setPages(currentPages);
      setMeasuring(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [chunks]);

  const Watermarks = () => (
    !isPaid ? (
      <div className={styles.watermarkContainer}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={styles.watermarkItem}>CVPINTAR</div>
        ))}
      </div>
    ) : null
  );

  if (measuring) {
    // Render hidden container to measure
    const measuredTitles = new Set<string>();
    return (
      <div className={styles.a4Paper} style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0, minHeight: '141.4cqw' }}>
        <div ref={measureRef} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {chunks.map((chunk, i) => {
            const showTitle = chunk.title && !measuredTitles.has(chunk.type);
            if (showTitle) measuredTitles.add(chunk.type);
            
            return (
              <div key={chunk.id} className={chunk.type !== 'header' ? styles.cvSection : ''} style={chunk.type !== 'header' ? { marginBottom: '1cqw' } : {}}>
                {showTitle && (
                  <>
                    <div className={styles.cvSectionTitle}>{chunk.title}</div>
                    <div className={styles.cvDividerThin}></div>
                  </>
                )}
                {chunk.element}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="cv-pages-wrapper" style={{ display: 'block', width: '100%' }}>
      {pages.map((page, pageIndex) => {
        // We need to keep track of section titles we've already rendered on this page
        // so we don't repeat "PENGALAMAN KERJA" for every single job entry.
        const renderedTitles = new Set<string>();

        return (
          <div key={pageIndex} className={styles.a4Paper} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
            <Watermarks />
            
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {page.map((chunk) => {
                const showTitle = chunk.title && !renderedTitles.has(chunk.type);
                if (showTitle) renderedTitles.add(chunk.type);

                return (
                  <div key={chunk.id} className={chunk.type !== 'header' ? styles.cvSection : ''} style={chunk.type !== 'header' ? { marginBottom: '1cqw' } : {}}>
                    {showTitle && (
                      <>
                        <div className={styles.cvSectionTitle}>
                          {chunk.title} {pageIndex > 0 && chunk.type === 'experience' ? '(Lanjutan)' : ''}
                        </div>
                        <div className={styles.cvDividerThin}></div>
                      </>
                    )}
                    {chunk.element}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
