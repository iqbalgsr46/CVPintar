'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('cvpintar_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDecision = (decision: 'accepted' | 'declined') => {
    localStorage.setItem('cvpintar_cookie_consent', decision);
    setLeaving(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible || !mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(2px)',
          zIndex: 999,
          opacity: leaving ? 0 : 1,
          transition: 'opacity 0.4s ease',
          animation: 'none',
        }}
        onClick={() => handleDecision('declined')}
      />

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '1.25rem',
          transform: leaving
            ? 'translateX(-50%) translateY(120%)'
            : 'translateX(-50%) translateY(0)',
          width: 'calc(100% - 2rem)',
          maxWidth: '420px',
          background: '#fff',
          borderRadius: '20px',
          padding: '1.5rem',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          opacity: leaving ? 0 : 1,
        }}
      >
        {/* Top accent */}
        <div style={{
          width: '36px',
          height: '4px',
          borderRadius: '2px',
          background: '#e2e8f0',
          margin: '0 auto 1.25rem',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#f5f3ff',
            color: '#8b5cf6',
            flexShrink: 0,
          }}>
            <Cookie size={20} strokeWidth={2} />
          </span>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Pemberitahuan Cookie
          </h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
          Kami menggunakan cookie esensial untuk keamanan & fungsionalitas situs.
          Data CV Anda tersimpan aman di perangkat Anda.{' '}
          <Link href="/kebijakan-privasi" style={{ color: '#8b5cf6', fontWeight: 600 }}>
            Baca Kebijakan Privasi
          </Link>
        </p>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => handleDecision('accepted')}
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              background: '#8b5cf6',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#7c3aed'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#8b5cf6'; }}
          >
            Setuju
          </button>
          <button
            onClick={() => handleDecision('declined')}
            style={{
              padding: '0.6rem 1rem',
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.color = '#64748b'; e.currentTarget.borderColor = '#cbd5e1'; }}
            onMouseOut={(e) => { e.currentTarget.color = '#94a3b8'; e.currentTarget.borderColor = '#e2e8f0'; }}
          >
            Tolak
          </button>
        </div>
      </div>
    </>
  );
}
