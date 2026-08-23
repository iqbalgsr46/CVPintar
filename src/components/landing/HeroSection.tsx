import { useContext } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./splash.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScrollContext } from "@/app/page";

const PHRASES = [
  "Buat CV profesional dalam 2 menit dengan AI...",
  "Bebas pusing mikirin format dan kata-kata...",
  "Tingkatkan peluang dipanggil HRD 10x lipat..."
];

export default function HeroSection() {
  const router = useRouter();
  const scrollRef = useContext(ScrollContext) as any;
  
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVideoLooping, setIsVideoLooping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = PHRASES[phraseIndex];
    
    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentPhrase.substring(0, text.length - 1)), 30);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    } else {
      if (text.length < currentPhrase.length) {
        timeout = setTimeout(() => setText(currentPhrase.substring(0, text.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  const handleStart = () => {
    router.push("/builder");
  };

  return (
    <section id="beranda" className={styles.container}>
      <motion.div 
        className={styles.heroTopImage}
        initial={{ opacity: 0, y: -20 }}
        viewport={{ root: scrollRef, once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src="/foto-home-logo.jpeg" 
          alt="Home CV Logo" 
          width={800} 
          height={600} 
          priority 
        />
      </motion.div>

      <motion.div 
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ root: scrollRef, once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.centerLogo} style={{ background: 'transparent', boxShadow: 'none' }}>
          <video 
            src="/robot-home-cv.mp4#t=1.5" 
            autoPlay 
            loop 
            muted 
            playsInline
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime < 1.5) {
                e.currentTarget.currentTime = 1.5;
              }
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              borderRadius: 'inherit'
            }}
          />
        </div>
        
        <h1 className={styles.title}>Bikin CV Pro<br />Secara Otomatis!</h1>
        <p className={styles.subtitle}>Stop pusing mikirin format! Biar AI kami<br />yang merangkai CV-mu.</p>
        
        <div className={styles.promptBox} onClick={handleStart}>
          <div className={styles.promptText}>
            {text}
            <span className={styles.promptCursor}></span>
          </div>
          <button className={styles.orderBtn}>
            Mulai Buat CV
          </button>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll ke Bawah</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
