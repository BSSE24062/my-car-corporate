"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { ArrowRight, Plane, Building2, Clock, Map, Users, Heart, Shield, Navigation } from 'lucide-react';
import styles from './services.module.css';

const desktopSlides = [
  '/Services/professional.jpg',
  '/Services/executive-road-shows.jpg',
  '/Services/AirportPickups.jpg',
  '/Services/conferences-and-events.jpg',
  '/Services/wedding.jpg',
  '/Services/privateTour.jpg'
];

const mobileSlides = [
  '/Services/mobile_services/professional.jpg',
  '/Services/mobile_services/executive-road-shows.jpg',
  '/Services/mobile_services/AirportPickups.jpg',
  '/Services/mobile_services/wedding.jpg',
  '/Services/mobile_services/privateTours.jpg',
  '/Services/mobile_services/oneDayTrip.jpg'
];

const servicesList = [
  {
    slug: 'airport-transfers',
    title: 'Airport Transfers',
    description: 'Punctual, stress-free airport transfers nationwide with real-time flight tracking, 15-minute early arrival buffer, and inside-terminal meet-and-greet.',
    icon: <Plane size={24} />,
    image: '/Services/AirportPickups.jpg'
  },
  {
    slug: 'corporate-accounts',
    title: 'Corporate Accounts',
    description: 'Dedicated travel management for Executive Assistants and corporate leaders featuring monthly invoicing, priority dispatch, and nationwide coverage.',
    icon: <Building2 size={24} />,
    image: '/Services/professional.jpg'
  },
  {
    slug: 'as-directed-chauffeur-hire',
    title: 'As-Directed Chauffeur Hire',
    description: 'Flexible hourly chauffeuring on standby. Keep your private chauffeur and vehicle for as long as needed for seamless executive transit.',
    icon: <Clock size={24} />,
    image: '/Services/privateTour.jpg'
  },
  {
    slug: 'roadshows',
    title: 'Executive Roadshows',
    description: 'Precision multi-stop travel coordination for investor presentations, IPO tours, and high-stakes corporate board itineraries.',
    icon: <Map size={24} />,
    image: '/Services/executive-road-shows.jpg'
  },
  {
    slug: 'events',
    title: 'Conferences & Events',
    description: 'Comprehensive transport logistics for corporate summits, keynote speaker transfers, and VIP gala delegate movements.',
    icon: <Users size={24} />,
    image: '/Services/conferences-and-events.jpg'
  },
  {
    slug: 'weddings',
    title: 'Luxury Wedding Transport',
    description: 'Immaculate Mercedes-Benz, Maybach, and BMW bridal cars and passenger vans with professional suited chauffeurs and red-carpet care.',
    icon: <Heart size={24} />,
    image: '/Services/wedding.jpg'
  },
  {
    slug: 'private-aviation-fbo',
    title: 'Private Aviation / FBO Transfers',
    description: 'Discreet, direct tarmac and FBO terminal transfers across Australian airports with private jet coordination and security compliance.',
    icon: <Shield size={24} />,
    image: '/Sydney/sydneyAirport.jpg'
  },
  {
    slug: 'interstate-transfers',
    title: 'Interstate & Long-Distance Transfers',
    description: 'Comfortable, private long-distance chauffeured journeys between capital cities and regional business hubs without airport queues.',
    icon: <Navigation size={24} />,
    image: '/Services/oneDayTour.jpg'
  }
];

export default function ServicesClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const slides = isMobile ? mobileSlides : desktopSlides;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [isMobile]);

  const activeSlides = isMobile ? mobileSlides : desktopSlides;

  return (
    <main className={styles.servicePage}>
      <Navbar />

      {/* Hero Header with Cross-Fading Background Slideshow */}
      <section className={styles.hero}>
        <div className={styles.heroSlideshow}>
          {activeSlides.map((img, idx) => (
            <div
              key={img}
              className={`${styles.heroSlideItem} ${idx === currentSlide ? styles.heroSlideItemActive : ''}`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Executive Transportation</span>
          <h1>Our Chauffeur Services Across Australia</h1>
          <p>
            Tailored chauffeur solutions delivering flight monitoring, pristine executive vehicles, and dedicated 24/7 dispatch across Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra.
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" className={styles.primaryBtn}>
              Book / Get a Quote
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              Call Direct: +61 430 729 993
            </a>
          </div>
        </div>

        {/* Slideshow Indicator Dots */}
        <div className={styles.slideIndicators}>
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              className={`${styles.indicatorDot} ${idx === currentSlide ? styles.indicatorDotActive : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Specialized Chauffeur Capabilities</h2>
          <p>Explore our specialized corporate, airport, and event transport services designed for seamless business execution.</p>
        </div>

        <div className={styles.servicesGrid}>
          {servicesList.map((service, index) => (
            <a key={index} href={`/services/${service.slug}`} className={styles.serviceHubCard}>
              <div className={styles.serviceHubImage}>
                <img src={service.image} alt={service.title} />
              </div>
              <div className={styles.serviceHubBody}>
                <div className={styles.featureIcon} style={{ width: 42, height: 42, marginBottom: 12 }}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className={styles.learnMoreLink}>
                  Explore Details <ArrowRight size={15} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaBox}>
          <h2>Need Custom Transport Arrangements?</h2>
          <p>Our dispatch coordinators are available 24/7 to formulate bespoke itineraries, corporate billing accounts, or multi-city delegate bookings.</p>
          <div className={styles.heroActions}>
            <a href="/#booking" className={styles.primaryBtn}>Request a Quote</a>
            <a href="https://wa.me/61430729993" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>Chat on WhatsApp</a>
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
