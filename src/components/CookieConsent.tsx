'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('cvpintar_cookie_consent');
    if (!consent) {
      // Wait for the splash screen to finish, then slide up smoothly
      const handleSplashComplete = () => {
        // Small delay so the splash fade-out starts first, then cookie sheet slides up
        setTimeout(() => setShow(true), 600);
      };
      window.addEventListener('cvpintar-splash-complete', handleSplashComplete);
      return () => window.removeEventListener('cvpintar-splash-complete', handleSplashComplete);
    }
  }, []);

  // Trigger entrance animation after the sheet is rendered
  useEffect(() => {
    if (show) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [show]);

  const handleDecision = (decision: 'accepted' | 'declined') => {
    localStorage.setItem('cvpintar_cookie_consent', decision);
    setLeaving(true);
    setTimeout(() => setShow(false), 500);
  };

  if (!show || !mounted) return null;

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
          opacity: leaving ? 0 : entered ? 1 : 0,
          transition: 'opacity 0.5s ease',
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
            : entered
              ? 'translateX(-50%) translateY(0)'
              : 'translateX(-50%) translateY(120%)',
          width: 'calc(100% - 2rem)',
          maxWidth: '420px',
          background: '#fff',
          borderRadius: '20px',
          padding: '1.5rem',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
          transition: 'transform 0.55s cubic-bezier(0.32, 1.25, 0.4, 1), opacity 0.35s ease',
          opacity: leaving ? 0 : 1,
          willChange: 'transform, opacity',
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
            onMouseOver={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = '#64748b'; el.style.borderColor = '#cbd5e1'; }}
            onMouseOut={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = '#94a3b8'; el.style.borderColor = '#e2e8f0'; }}
          >
            Tolak
          </button>
        </div>
      </div>
    </>
  );
}
