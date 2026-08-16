"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ServicesSlider.module.css';

const services = [
  {
    id: 1,
    title: "Professional Chauffeurs",
    description: "Experience the pinnacle of luxury with our highly trained and discreet chauffeurs, dedicated to providing a seamless journey.",
    bgImage: "/professional.jpg"
  },
  {
    id: 2,
    title: "Airport Pickups",
    description: "Punctual and stress-free airport transfers. We monitor your flight to ensure we are there when you land.",
    bgImage: "/AirportPickup.jpg"
  },
  {
    id: 3,
    title: "One Day Trip",
    description: "Explore the city or countryside in unparalleled comfort. Custom itineraries tailored to your desires.",
    bgImage: "/oneDayTrip.jpg"
  },
  {
    id: 4,
    title: "Wedding Transport",
    description: "Make your special day even more memorable with our elegant fleet and red-carpet service.",
    bgImage: "/wedding.png"
  },
  {
    id: 5,
    title: "Private Tours",
    description: "Discover hidden gems and iconic landmarks with personalized private tours driven by local experts.",
    bgImage: "/privateTours.jpg"
  }
];

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide (optional, can be removed if user should only click)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={styles.slideBackground}
          style={{ backgroundImage: `url(${services[currentIndex].bgImage})` }}
        >
          <div className={styles.overlay}></div>
          
          <div className={styles.content}>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {services[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {services[currentIndex].description}
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
