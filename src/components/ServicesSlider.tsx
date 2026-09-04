"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ServicesSlider.module.css';

const services = [
  {
    id: 1,
    titleKey: "services.professional_title",
    descKey: "services.professional_desc",
    bgImage: "/Services/professional.jpg",
    mobileBgImage: "/Services/mobile_services/professional.jpg"
  },
  {
    id: 2,
    titleKey: "services.airport_title",
    descKey: "services.airport_desc",
    bgImage: "/Services/AirportPickups.jpg",
    mobileBgImage: "/Services/mobile_services/AirportPickups.jpg"
  },
  {
    id: 3,
    titleKey: "services.one_day_title",
    descKey: "services.one_day_desc",
    bgImage: "/Services/oneDayTour.jpg",
    mobileBgImage: "/Services/mobile_services/oneDayTrip.jpg"
  },
  {
    id: 4,
    titleKey: "services.wedding_title",
    descKey: "services.wedding_desc",
    bgImage: "/Services/wedding.jpg",
    mobileBgImage: "/Services/mobile_services/wedding.jpg"
  },
  {
    id: 5,
    titleKey: "services.private_title",
    descKey: "services.private_desc",
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
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={styles.slideBackground}
          style={{
            '--bg-desktop': `url(${services[currentIndex].bgImage})`,
            '--bg-mobile': `url(${services[currentIndex].mobileBgImage})`
          } as React.CSSProperties}
        >
          <div className={styles.overlay}></div>
          
          <div className={styles.content}>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              {t(services[currentIndex].titleKey)}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              {t(services[currentIndex].descKey)}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

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
