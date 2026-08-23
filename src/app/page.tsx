"use client";

import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HelloSplashScreen from "@/components/landing/HelloSplashScreen";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialSection from "@/components/landing/TestimonialSection";

import Navbar from "@/components/landing/Navbar";

export const ScrollContext = React.createContext<React.RefObject<HTMLElement | null> | null>(null);

export default function LandingPage() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  
  return (
    <ScrollContext.Provider value={mainRef}>
      <AnimatePresence>
        {showSplash && <HelloSplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <Navbar />
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#fcfcff',
        backgroundImage: 'radial-gradient(at 15% 0%, rgba(224, 231, 255, 0.8) 0px, transparent 50%), radial-gradient(at 85% 10%, rgba(233, 213, 255, 0.6) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(254, 240, 138, 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 228, 230, 0.5) 0px, transparent 50%)',
      }}>
        {/* Global Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.6,
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }} />
      </div>

      <main ref={mainRef} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%',
        height: '100dvh',
        overflowY: 'scroll', 
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}>
        <HeroSection />
        <FeatureSection />
        <PricingSection />
        <TestimonialSection />
      </main>
    </ScrollContext.Provider>
  );
}
