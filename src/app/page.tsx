"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSlider from '@/components/ServicesSlider';
import ChooseUsSection from '@/components/ChooseUsSection';
import SydneySection from '@/components/SydneySection';
import FleetSection from '@/components/FleetSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'black', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <ServicesSlider />
      <ChooseUsSection />
      <SydneySection />
      <FleetSection />
      <PricingSection />
      <TestimonialsSection />
      <BookingForm />
      <Footer />
      <AIAssistant />
    </main>
  );
}
