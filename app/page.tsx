import React from 'react';
import HeroSequence from '../components/sections/HeroSequence';
import EditorialBooking from '../components/sections/EditorialBooking';
import FleetGallery from '../components/sections/FleetGallery';
import SydneyExperience from '../components/sections/SydneyExperience';

export default function Page(){
  return (
    <>
      <HeroSequence />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="display-syne hero-title text-[clamp(1.5rem,4vw,2.5rem)]">Concierge Booking</h2>
        <p className="muted mt-3">A tailored chauffeur experience — Sydney and beyond.</p>
        <EditorialBooking />
      </section>

      <FleetGallery />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="display-syne hero-title text-[clamp(1.5rem,4vw,2.5rem)]">Sydney Experiences</h2>
        <SydneyExperience />
      </section>
    </>
  );
}
