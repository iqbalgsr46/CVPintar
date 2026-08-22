import missionStyles from "./mission.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ClientTweetCard } from "@/components/ui/client-tweet-card";

export default function TestimonialSection() {
  const router = useRouter();

  return (
    <section id="bantuan" className={missionStyles.container}>
      <motion.section 
        className={missionStyles.textContent}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={missionStyles.title} style={{ fontSize: '1.8rem' }}>Butuh Bantuan?</h1>
        <p className={missionStyles.subtitle}>
          Tim Customer Service kami siap mendampingi Anda jika ada kesulitan.
        </p>
      </motion.section>

      <motion.section 
        className={missionStyles.cardSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ padding: '0 1.5rem', marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{
            background: '#000',
            border: '1px solid #333',
            borderRadius: '16px',
            padding: '1.2rem',
            maxWidth: '400px',
            width: '100%',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <img 
                src="/images/cs-profile.jpg" 
                alt="Hairunisa CS" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Hairunisa CS</span>
                  {/* Verified Badge SVG */}
                  <svg viewBox="0 0 24 24" aria-label="Verified account" role="img" style={{ width: '1.2rem', height: '1.2rem' }}>
                    <g>
                      <path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.065.27-.1.55-.1.83 0 2.21 1.71 3.998 3.918 3.998.47 0 .92-.084 1.336-.25C8.818 21.585 10.126 22.5 11.642 22.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.792 3.918-4 0-.28-.035-.56-.1-.83 1.106-.704 1.846-1.99 1.846-3.45z"></path>
                      <path fill="#ffffff" d="M12.475 17.5l-3.5-3.5 1.414-1.414 2.086 2.086 5.586-5.586 1.414 1.414-7 7z"></path>
                    </g>
                  </svg>
                </div>
                <span style={{ color: '#71767b', fontSize: '0.9rem', marginTop: '-2px' }}>@cvpintar</span>
              </div>
            </div>
            
            {/* Body */}
            <p style={{ fontSize: '1rem', lineHeight: 1.5, margin: 0, color: '#e7e9ea' }}>
              Halo! Punya pertanyaan atau kendala? Jangan ragu hubungi kami. Kami siap membantu Anda sampai tuntas. 💬✨
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button className={missionStyles.ctaBtn} onClick={() => window.open("https://wa.me/6287728382093", "_blank")}>
            Hubungi CS Sekarang
            </button>
        </div>
      </motion.section>

      {/* Minimalist Footer */}
      <footer style={{
        marginTop: 'auto',
        width: '100%',
        padding: '2rem 1.5rem 1.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#6b7280',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.2rem' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}>Syarat & Ketentuan</a>
          <span>•</span>
          <a href="#" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}>Kebijakan Privasi</a>
        </div>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} CVPintar. Hak Cipta Dilindungi.</p>
      </footer>
    </section>
  );
}
