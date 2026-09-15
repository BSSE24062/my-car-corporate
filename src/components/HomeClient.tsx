"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesBanner from '@/components/ServicesBanner';
import ServicesSlider from '@/components/ServicesSlider';
import FleetSection from '@/components/FleetSection';
import CorporateSection from '@/components/CorporateSection';
import SydneySection from '@/components/SydneySection';
import ChooseUsSection from '@/components/ChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

export default function HomeClient() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main style={{ backgroundColor: 'black', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <ServicesBanner />
      <ServicesSlider />
      <FleetSection />
      <CorporateSection />
      <SydneySection />
      <ChooseUsSection />
      <TestimonialsSection />
      <BookingForm />
      <Footer />
      <AIAssistant />
    </main>
  );
}
