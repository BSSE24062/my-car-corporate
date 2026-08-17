"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

  // Auto slide (optional, can be removed if user should only click)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="services" className={styles.sliderSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={styles.slideBackground}
          style={{
            '--bg-desktop': `url(${services[currentIndex].bgImage})`,
            '--bg-mobile': `url(${services[currentIndex].mobileBgImage})`
          } as React.CSSProperties}
        >
          <div className={styles.overlay}></div>
          
          <div className={styles.content}>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {t(services[currentIndex].titleKey)}
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
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
