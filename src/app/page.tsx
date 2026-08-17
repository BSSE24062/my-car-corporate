"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesBanner from '@/components/ServicesBanner';
import ServicesSlider from '@/components/ServicesSlider';
import FleetSection from '@/components/FleetSection';
import SydneySection from '@/components/SydneySection';
import ChooseUsSection from '@/components/ChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'black', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <ServicesBanner />
      <ServicesSlider />
      <FleetSection />
      <SydneySection />
      <ChooseUsSection />
      <TestimonialsSection />
      <BookingForm />
      <Footer />
      <AIAssistant />
    </main>
  );
}
