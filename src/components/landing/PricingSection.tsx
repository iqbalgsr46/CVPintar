import { useContext } from "react";
import missionStyles from "./mission.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScrollContext } from "@/app/page";
import Link from "next/link";

export default function PricingSection() {
  const router = useRouter();
  const scrollRef = useContext(ScrollContext) as any;

  return (
    <section id="cara-kerja" className={missionStyles.container}>
      
      <div className={missionStyles.blobWrapper}>
        <motion.div 
          className={missionStyles.blob}
          initial={{ opacity: 0, scale: 0.8 }}
          viewport={{ root: scrollRef, once: false }} whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className={missionStyles.face}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ root: scrollRef, once: false }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg className={missionStyles.faceSvg} viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M 25 20 Q 30 10 35 20" />
            <path d="M 65 20 Q 70 10 75 20" />
            <path d="M 40 30 Q 50 45 60 30" />
          </svg>
        </motion.div>
      </div>

      <motion.div 
        className={missionStyles.textContent}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ root: scrollRef, once: false, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className={missionStyles.title}>
          Cara Kerja <span className={missionStyles.titleHighlight}>AI</span>
        </h2>
        <p className={missionStyles.subtitle}>
          Hanya butuh 3 menit. Dapatkan CV profesional tanpa pusing memikirkan kalimat dan desain.
        </p>
      </motion.div>

      <motion.div 
        className={missionStyles.stepsContainer}
        initial={{ opacity: 0, y: 30 }}
        viewport={{ root: scrollRef, once: false, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={missionStyles.stepBox}>
          <div className={missionStyles.stepNumber}>1</div>
          <div className={missionStyles.stepText}>
            <h3>Ceritakan Dirimu</h3>
            <p>Isi form singkat atau biarkan AI mewawancaraimu.</p>
          </div>
        </div>

        <div className={missionStyles.stepBox}>
          <div className={missionStyles.stepNumber}>2</div>
          <div className={missionStyles.stepText}>
            <h3>AI Merakit CV</h3>
            <p>Sistem kami akan menyusun kata kunci ATS secara otomatis.</p>
          </div>
        </div>

        <div className={missionStyles.stepBox}>
          <div className={missionStyles.stepNumber}>3</div>
          <div className={missionStyles.stepText}>
            <h3>Preview & Unduh</h3>
            <p>Lihat hasilnya gratis. Bayar hanya jika Anda puas.</p>
          </div>
        </div>
      </motion.div>

      <Link href="/builder" style={{ textDecoration: 'none' }}>
        <motion.button 
          className={missionStyles.ctaBtn} 
          initial={{ opacity: 0, y: 30 }}
          viewport={{ root: scrollRef, once: false, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Buat CV Sekarang
        </motion.button>
      </Link>

      <div className={missionStyles.scrollIndicator}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
