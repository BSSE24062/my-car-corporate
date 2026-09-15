"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './ServicesSlider.module.css';

const services = [
  {
    id: 1,
    titleKey: "services.professional_title",
    defaultTitle: "Professional Chauffeurs",
    descKey: "services.professional_desc",
    defaultDesc: "Licensed, background-checked chauffeurs dedicated to discreet, punctual, and comfortable executive transport.",
    bgImage: "/Services/professional.jpg",
    mobileBgImage: "/Services/mobile_services/professional.jpg"
  },
  {
    id: 2,
    titleKey: "services.airport_title",
    defaultTitle: "Airport Transfers",
    descKey: "services.airport_desc",
    defaultDesc: "Punctual, stress-free airport transfers nationwide with real-time flight tracking and terminal meet-and-greet.",
    bgImage: "/Services/AirportPickups.jpg",
    mobileBgImage: "/Services/mobile_services/AirportPickups.jpg"
  },
  {
    id: 3,
    titleKey: "services.one_day_title",
    defaultTitle: "Custom Day Tours",
    descKey: "services.one_day_desc",
    defaultDesc: "Explore Australia's premier regions with tailored itineraries driven by knowledgeable local chauffeurs.",
    bgImage: "/Services/oneDayTour.jpg",
    mobileBgImage: "/Services/mobile_services/oneDayTrip.jpg"
  },
  {
    id: 4,
    titleKey: "services.wedding_title",
    defaultTitle: "Wedding Transport",
    descKey: "services.wedding_desc",
    defaultDesc: "Immaculate sedans and people movers providing smooth, elegant transport for bridal parties and VIP guests.",
    bgImage: "/Services/wedding.jpg",
    mobileBgImage: "/Services/mobile_services/wedding.jpg"
  },
  {
    id: 5,
    titleKey: "services.private_title",
    defaultTitle: "Private Tours",
    descKey: "services.private_desc",
    defaultDesc: "Discover hidden gems and iconic Australian landmarks with personalized private tours driven by local experts.",
    bgImage: "/Services/privateTour.jpg",
    mobileBgImage: "/Services/mobile_services/privateTours.jpg"
  }
];

const ServicesSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Preload all slider images on mount for instant zero-lag rendering
  useEffect(() => {
    services.forEach((s) => {
      const img1 = new Image();
      img1.src = s.bgImage;
      const img2 = new Image();
      img2.src = s.mobileBgImage;
    });
  }, []);

  // Auto slide timer (pauses when hovered or interacted with)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  // Touch Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = (touchStartY.current || 0) - (touchEndY.current || 0);

    // Ensure it's a predominantly horizontal swipe of at least 40px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> Next slide
      } else {
        handlePrev(); // Swiped right -> Prev slide
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const currentService = services[currentIndex];

  return (
    <section 
      id="services" 
      className={styles.sliderSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Arrows */}
      <button 
        className={`${styles.navBtn} ${styles.leftBtn}`}
        onClick={handlePrev}
        aria-label="Previous service"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        className={`${styles.navBtn} ${styles.rightBtn}`}
        onClick={handleNext}
        aria-label="Next service"
      >
        <ChevronRight size={24} />
      </button>

      {/* Seamless Cross-fade without mode="wait" to eliminate blank void */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={styles.slideBackground}
          style={{
            '--bg-desktop': `url(${currentService.bgImage})`,
            '--bg-mobile': `url(${currentService.mobileBgImage})`
          } as React.CSSProperties}
        >
          <div className={styles.overlay}></div>
          
          <div className={styles.content}>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            >
              {t(currentService.titleKey, currentService.defaultTitle)}
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              {t(currentService.descKey, currentService.defaultDesc)}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Still, Persistent CTA Button (Does not re-animate on slide change) */}
      <div className={styles.staticActions}>
        <a href="/services" className={styles.viewAllBtn}>
          <span>{t('services.view_all_btn', 'Explore All Services')}</span>
          <ArrowRight size={18} className={styles.btnArrow} />
        </a>
      </div>

      <div className={styles.dotsContainer}>
        {services.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSlider;
