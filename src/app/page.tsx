"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialSection from "@/components/landing/TestimonialSection";

import Navbar from "@/components/landing/Navbar";

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Navbar />
      <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%',
      height: '100dvh',
      overflowY: 'scroll', 
      overflowX: 'hidden',
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth'
    }}>
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <TestimonialSection />
    </main>
    </>
  );
}
