import { useContext } from "react";

import styles from "./home.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScrollContext } from "@/app/page";
import Link from "next/link";

export default function FeatureSection() {
  const router = useRouter();
  const scrollRef = useContext(ScrollContext) as any;

  return (
    <section id="fitur" className={styles.mainContainer}>
      
      <motion.div 
        className={styles.textContainer}
        initial={{ opacity: 0, y: 30 }}
        viewport={{ root: scrollRef, once: false, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>Lolos Seleksi<br />Otomatis HRD!</h2>
        <p className={styles.subtitle}>Format CV kami dirancang khusus agar 100% terbaca oleh sistem ATS (Applicant Tracking System).</p>
      </motion.div>

      <motion.div 
        className={styles.graphicContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        viewport={{ root: scrollRef, once: false, margin: "-50px" }} whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={styles.cvMockup}>
          <div style={{ padding: '0.5rem', fontFamily: 'Arial, sans-serif', color: '#111' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Marsya Akina</h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.55rem', color: '#555' }}>Subang, Jawa Barat | 0881-0221-xxxx | marsya@email.com</p>
            </div>
            
            {/* Summary */}
            <div style={{ marginBottom: '0.8rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.65rem', fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: '0.2rem', marginBottom: '0.3rem' }}>RINGKASAN PROFIL</h4>
              <p style={{ margin: 0, fontSize: '0.55rem', lineHeight: 1.5, color: '#333', textAlign: 'justify' }}>
                Profesional administrasi dengan pengalaman lebih dari 4 tahun dalam mengelola operasional kantor dan pengarsipan dokumen. 
                Memiliki ketelitian tinggi dalam rekapitulasi data, pengoperasian Microsoft Office, serta mampu mendukung 
                efisiensi alur kerja perusahaan manufaktur.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h4 style={{ margin: 0, fontSize: '0.65rem', fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: '0.2rem', marginBottom: '0.3rem' }}>PENGALAMAN KERJA</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontWeight: 700 }}>
                <span>PT Indonesia Epson Industry</span>
                <span>2020 — 2024</span>
              </div>
              <div style={{ fontSize: '0.55rem', fontStyle: 'italic', marginBottom: '0.2rem' }}>Staf Administrasi</div>
              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.55rem', color: '#333', lineHeight: 1.5 }}>
                <li>Mengelola dan mengarsipkan lebih dari 100+ dokumen produksi harian dengan akurasi 100%.</li>
                <li>Merekap absensi, lembur karyawan, dan menyusun laporan bulanan menggunakan Microsoft Excel.</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.floatingBadge}>
            <div className={styles.checkIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span>ATS Friendly</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className={styles.actionContainer}
        initial={{ opacity: 0, y: 30 }}
        viewport={{ root: scrollRef, once: false, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/builder" style={{ textDecoration: 'none' }}>
          <button className={styles.primaryBtn}>
            Buktikan Sendiri
          </button>
        </Link>
      </motion.div>

      <div className={styles.scrollIndicator}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
