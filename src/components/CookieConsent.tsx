'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Show banner if user hasn't decided yet
    const consent = localStorage.getItem('cvpintar_cookie_consent');
    if (!consent) {
      // Small delay so it doesn't flash before splash screen finishes
      const timer = setTimeout(() => setVisible(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDecision = (decision: 'accepted' | 'declined') => {
    localStorage.setItem('cvpintar_cookie_consent', decision);
    setLeaving(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: leaving ? 'translateX(-50%) translateY(20px)' : 'translateX(-50%) translateY(0)',
        width: 'calc(100% - 2rem)',
        maxWidth: '520px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        zIndex: 1000,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: leaving ? 0 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>🍪</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.5rem' }}>
            Kami menggunakan cookie esensial agar website ini berfungsi dengan baik.
          </p>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1rem' }}>
            Data CV Anda tersimpan aman di perangkat Anda. Baca{' '}
            <Link href="/kebijakan-privasi" style={{ color: '#a78bfa', textDecoration: 'underline' }}>
              Kebijakan Privasi
            </Link>{' '}
            kami untuk informasi lebih lanjut.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleDecision('accepted')}
              style={{
                flex: 1,
                minWidth: '120px',
                padding: '0.7rem 1rem',
                background: '#8b5cf6',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#7c3aed'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#8b5cf6'; }}
            >
              Setuju
            </button>
            <button
              onClick={() => handleDecision('declined')}
              style={{
                padding: '0.7rem 1rem',
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.borderColor = '#475569'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#334155'; }}
            >
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
