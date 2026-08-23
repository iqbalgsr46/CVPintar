import { useContext } from "react";
import missionStyles from "./mission.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScrollContext } from "@/app/page";

export default function PricingSection() {
  const router = useRouter();
  const scrollRef = useContext(ScrollContext) as any;

  return (
    <section id="cara-kerja" className={missionStyles.container}>
      <motion.section 
        className={missionStyles.textContent}
        initial={{ opacity: 0, y: 30 }}
        viewport={{ root: scrollRef, once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={missionStyles.title}>Cara Kerja AI</h1>
        <p className={missionStyles.subtitle}>
          Hanya butuh 3 menit. Dapatkan CV profesional tanpa pusing memikirkan kalimat dan desain.
        </p>
      </motion.section>

      <motion.section 
        className={missionStyles.cardSection}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ root: scrollRef, once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={missionStyles.stepsContainer}>
          
          <div className={missionStyles.stepBox}>
            <div className={missionStyles.stepNumber}>1</div>
            <div className={missionStyles.stepText}>
              <h4>Ceritakan Dirimu</h4>
              <p>Isi form singkat atau biarkan AI mewawancaraimu.</p>
            </div>
          </div>

          <div className={missionStyles.stepBox}>
            <div className={missionStyles.stepNumber}>2</div>
            <div className={missionStyles.stepText}>
              <h4>AI Merakit CV</h4>
              <p>Sistem kami akan menyusun kata kunci ATS secara otomatis.</p>
            </div>
          </div>

          <div className={missionStyles.stepBox}>
            <div className={missionStyles.stepNumber}>3</div>
            <div className={missionStyles.stepText}>
              <h4>Preview & Unduh</h4>
              <p>Lihat hasilnya gratis. Bayar hanya jika Anda puas.</p>
            </div>
          </div>

        </div>

        <button className={missionStyles.ctaBtn} onClick={() => router.push("/builder")}>
          Buat CV Sekarang
        </button>
      </motion.section>

      <div className={missionStyles.scrollIndicator}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
