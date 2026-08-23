"use client";

import React, { useRef, useEffect, useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialSection from "@/components/landing/TestimonialSection";

import Navbar from "@/components/landing/Navbar";

export const ScrollContext = React.createContext<React.RefObject<HTMLElement | null> | null>(null);

export default function LandingPage() {
  const mainRef = useRef<HTMLElement | null>(null);
  
  return (
    <ScrollContext.Provider value={mainRef}>
      <Navbar />
      <main ref={mainRef} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%',
        height: '100dvh',
        overflowY: 'scroll', 
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}>
        <HeroSection />
        <FeatureSection />
        <PricingSection />
        <TestimonialSection />
      </main>
    </ScrollContext.Provider>
  );
}
