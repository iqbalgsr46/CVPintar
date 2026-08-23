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
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 15 } }
};

import { Lock, FileText, RefreshCcw, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

export default function BuilderPage() {
  const router = useRouter();
  const { data, updateData, isLoaded } = useCVData();
  const [isPaid, setIsPaid] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/check-payment')
      .then(res => res.json())
      .then(data => { if (data.paid) setIsPaid(true); })
      .catch(() => {});
  }, []);

  if (!isLoaded) return <div className={styles.container}></div>;

  if (isPaid) {
    return (
      <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className={styles.itemCard}
          style={{ maxWidth: '400px', textAlign: 'center', padding: '3rem 2rem' }}
        >
          <div style={{ display: 'inline-flex', padding: '1rem', background: '#f3e8ff', borderRadius: '50%', marginBottom: '1.5rem', color: '#8b5cf6' }}>
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Akses Terkunci</h2>
          <p style={{ color: '#52525b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            CV Anda saat ini telah berstatus <b>Lunas</b> dan siap diunduh.<br/><br/>
            Untuk mencegah penyalahgunaan, formulir pengeditan data dikunci sementara.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              onClick={() => router.push('/preview')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <FileText size={20} /> Lihat & Unduh CV Saya
            </button>
            <button 
              onClick={() => {
                Swal.fire({
                  title: 'Hapus & Buat Baru?',
                  html: "Tindakan ini akan <b>menghapus permanen</b> data Anda dan <b>menghanguskan</b> status Lunas pada CV ini.<br/><br/>Anda yakin ingin mereset semuanya?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#ef4444',
                  cancelButtonColor: '#3f3f46',
                  confirmButtonText: 'Ya, Hapus & Reset',
                  cancelButtonText: 'Batal'
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem('cvpintar_data');
                    window.location.reload();
                  }
                });
              }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: 'transparent', color: '#ef4444', border: '1px solid #7f1d1d', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#450a0a'; e.currentTarget.style.borderColor = '#ef4444'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#7f1d1d'; }}
            >
              <RefreshCcw size={18} /> Hapus & Buat CV Baru
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.main 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', marginBottom: '1rem' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1.25rem', background: '#f4f4f5', color: '#52525b', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#e4e4e7'; e.currentTarget.style.color = '#18181b'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#f4f4f5'; e.currentTarget.style.color = '#52525b'; }}
          >
            Kembali
          </button>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 0, marginTop: '1rem' }}>
          <img 
            src="/images/animasi-halaman-form.png" 
            alt="AI Assistant Form" 
            style={{ 
              width: '100%', 
              maxWidth: '300px', 
              height: 'auto', 
              objectFit: 'contain'
            }} 
          />
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants} style={{ marginTop: '-4rem', position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '3rem', paddingBottom: '2rem' }}>
          <h1 className={styles.title} style={{ marginBottom: '0.5rem' }}>Yuk, Lengkapi Datamu!</h1>
          <p className={styles.subtitle} style={{ margin: '0 auto' }}>Tinggal isi aja formulir di bawah ini, dan biarkan AI kami yang merangkainya jadi CV profesional buat kamu.</p>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as any, stiffness: 300, damping: 24 } } }}>
          <PersonalForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as any, stiffness: 300, damping: 24 } } }}>
          <ExperienceForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as any, stiffness: 300, damping: 24 } } }}>
          <EducationForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as any, stiffness: 300, damping: 24 } } }}>
          <SkillsForm data={data} updateData={updateData} />
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ marginTop: '4rem', textAlign: 'center' }}>
            <button 
              className={styles.previewBtn} 
              onClick={() => {
                const missing: string[] = [];
                
                if (!data.personal?.fullName?.trim()) missing.push("Data Diri: Nama Lengkap");
                if (!data.personal?.phone?.trim()) missing.push("Data Diri: Nomor WhatsApp");
                if (!data.personal?.email?.trim()) missing.push("Data Diri: Email");
                if (!data.personal?.address?.trim()) missing.push("Data Diri: Alamat / Domisili");

                const hasValidExperience = data.experience && data.experience.some(exp => exp.company?.trim() !== '' || exp.position?.trim() !== '');
                if (!hasValidExperience) {
                  missing.push("Pengalaman: Minimal 1 Pengalaman (Kerja/Magang/Organisasi)");
                } else {
                  data.experience.forEach((exp, i) => {
                    if (exp.company?.trim() !== '' || exp.position?.trim() !== '') {
                      if (!exp.company?.trim()) missing.push(`Pengalaman ${i+1}: Nama Perusahaan/Instansi`);
                      if (!exp.position?.trim()) missing.push(`Pengalaman ${i+1}: Posisi/Jabatan`);
                      if (!exp.yearStart?.trim()) missing.push(`Pengalaman ${i+1}: Periode Masuk`);
                      if (!exp.yearEnd?.trim()) missing.push(`Pengalaman ${i+1}: Periode Keluar`);
                    }
                  });
                }

                const hasValidEducation = data.education && data.education.some(edu => edu.school?.trim() !== '');
                if (!hasValidEducation) {
                  missing.push("Pendidikan: Minimal 1 Riwayat Pendidikan");
                } else {
                  data.education.forEach((edu, i) => {
                    if (edu.school?.trim() !== '') {
                      if (!edu.major?.trim()) missing.push(`Pendidikan ${i+1}: Jurusan (Tulis "-" jika tidak ada)`);
                      if (!edu.graduationYear?.trim()) missing.push(`Pendidikan ${i+1}: Tahun Lulus`);
                    }
                  });
                }

                if (!data.skills?.trim()) missing.push("Keahlian Utama");

                if (missing.length > 0) {
                  import('sweetalert2').then((Swal) => {
                    if (missing.length === 1 && missing[0].startsWith("Pengalaman: Minimal 1")) {
                      Swal.default.fire({
                        title: 'Kolom Pengalaman Kosong!',
                        html: `
                          <div style="text-align: left; font-size: 0.95rem;">
                            Agar lembar CV Anda terisi penuh dan dilirik HRD, bagian ini <b>tidak boleh dikosongkan</b>.<br/><br/>
                            Belum pernah bekerja formal? Jangan khawatir! Anda bisa memasukkan pengalaman berikut:
                            <div style="display:flex; flex-direction:column; gap:0.5rem; margin:1rem 0;">
                              <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <b>PKL / Magang</b>
                              </div>
                              <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <b>Pengalaman Organisasi</b>
                              </div>
                              <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <b>Kepanitiaan Acara</b>
                              </div>
                              <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <b>Proyek Akhir / Skripsi</b>
                              </div>
                            </div>
                            Masukkan 1-2 pengalaman terbaik Anda, dan biarkan AI kami yang merangkai kata-katanya agar terlihat sangat profesional!
                          </div>
                        `,
                        icon: 'warning',
                        confirmButtonColor: '#8b5cf6',
                        confirmButtonText: 'Oke, Saya Mengerti'
                      });
                    } else {
                      Swal.default.fire({
                        title: 'Data Belum Lengkap!',
                        html: `
                          <div style="text-align: left; font-size: 0.95rem;">
                            Terdapat <b>${missing.length}</b> kolom wajib yang belum Anda isi:<br/>
                            <ul style="margin-top: 1rem; padding-left: 1.5rem; color: #ef4444; font-weight: 500;">
                              ${missing.map(m => `<li style="margin-bottom: 0.25rem;">${m}</li>`).join('')}
                            </ul>
                            <br/>Mohon lengkapi terlebih dahulu agar CV Anda sempurna.
                          </div>
                        `,
                        icon: 'error',
                        confirmButtonColor: '#8b5cf6',
                        confirmButtonText: 'Kembali Mengisi'
                      });
                    }
                  });
                  return;
                }
                router.push('/generating');
              }}
              style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
            >
            Buat CV Saya
            </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
