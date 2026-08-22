"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 1.5rem',
        zIndex: 50,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
        backdropFilter: isOpen ? 'none' : 'blur(2px)'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff', zIndex: 60 }}>
          CVPintar
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30px',
            height: '30px',
            gap: '6px'
          }}
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }}
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }}
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <a href="#beranda" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', fontWeight: '500' }}>Beranda</a>
            <a href="#fitur" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', fontWeight: '500' }}>Fitur AI</a>
            <a href="#cara-kerja" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', fontWeight: '500' }}>Cara Kerja</a>
            <a href="#bantuan" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', fontWeight: '500' }}>Bantuan</a>
          </div>
            
            <button 
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/builder';
              }}
              style={{
                marginTop: '1rem',
                background: '#8b5cf6',
                color: '#fff',
                border: 'none',
                borderRadius: '100px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Mulai Buat CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
