'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cvpintar_cookie_consent');
    if (!consent) {
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
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        padding: '0.8rem 1.5rem',
        zIndex: 1000,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'translateY(100%)' : 'translateY(0)',
      }}
    >
      <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px' }}>
          <span style={{ fontSize: '0.85rem' }}>🍪</span>
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Kami menggunakan cookie esensial untuk keamanan & fungsionalitas.{' '}
            <Link href="/kebijakan-privasi" style={{ color: '#8b5cf6', fontWeight: 600 }}>
              Pelajari lebih lanjut
            </Link>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={() => handleDecision('accepted')}
            style={{
              padding: '0.45rem 1.2rem',
              background: '#8b5cf6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Setuju
          </button>
          <button
            onClick={() => handleDecision('declined')}
            style={{
              padding: '0.45rem 1rem',
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
}
