"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SydneySection.module.css';

const sydneyImages = [
  {
    id: 1,
    title: "Sydney Opera House",
    description: "Arrive at Sydney's most iconic harbor destination in the comfort of a private luxury sedan.",
    desktopImg: "/Sydney/operaHouse.jpg",
    mobileImg: "/Sydney/mobile_sydney/operaHouse.jpg"
  },
  {
    id: 2,
    title: "Kingsford Smith Airport",
    description: "Seamless, stress-free airport pick-ups and transfers with premium concierge service.",
    desktopImg: "/Sydney/airport.jpg",
    mobileImg: "/Sydney/mobile_sydney/airport.jpg"
  },
  {
    id: 3,
    title: "Bondi Beach",
    description: "Cruising along the famous coastal strip in style, ready for the sun and surf.",
    desktopImg: "/Sydney/bondi.jpg",
    mobileImg: "/Sydney/mobile_sydney/bondi.jpg"
  },
  {
    id: 4,
    title: "Sydney Harbour Bridge",
    description: "Experience stunning panoramic views of the Bridge and Harbour under the harbor lights.",
    desktopImg: "/Sydney/harbour.jpg",
    mobileImg: "/Sydney/mobile_sydney/harbour.jpg"
  },
  {
    id: 5,
    title: "Sea Cliff Bridge",
    description: "A breathtaking coastal drive over the ocean along the Grand Pacific Drive.",
    desktopImg: "/Sydney/seacliff.jpg",
    mobileImg: "/Sydney/mobile_sydney/seacliff.jpg"
  },
  {
    id: 6,
    title: "Sydney Royal Botanic Garden",
    description: "Serene landscapes and classical views overlooking the Opera House and Harbour.",
    desktopImg: "/Sydney/nearOpera.jpg",
    mobileImg: "/Sydney/mobile_sydney/nearOpera.jpg"
  },
  {
    id: 7,
    title: "Sydney Town Hall Clock Tower",
    description: "Timeless historical landmarks in the heart of Sydney's central business district.",
    desktopImg: "/Sydney/clockTower.jpg",
    mobileImg: "/Sydney/mobile_sydney/clockTower.jpg"
  },
  {
    id: 8,
    title: "Sydney Airport Terminal",
    description: "Reliable, executive-class business travel directly from the private aviation runway.",
    desktopImg: "/Sydney/sydneyAirport.jpg",
    mobileImg: "/Sydney/mobile_sydney/sydneyAirport.jpg"
  },
  {
    id: 9,
    title: "Darling Harbour Side",
    description: "Vibrant nightlife, premium dining, and entertainment venues at the waterfront.",
    desktopImg: "/Sydney/harbourSide.jpg",
    mobileImg: "/Sydney/mobile_sydney/harbourSide.jpg"
  }
];

const SydneySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sydneyImages.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const getBgImage = (slide: typeof sydneyImages[0]) => {
    return isMobile ? slide.mobileImg : slide.desktopImg;
  };

  return (
    <section id="sydney" className={styles.sydneySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Sydney In Style</h2>
          <p>Experience the finest chauffeured transport across Sydney's landmark destinations.</p>
        </div>

        <div className={styles.slideshowWrapper}>
          <AnimatePresence mode="popLayout">
            <div key={currentIndex} className={styles.slideContainer}>
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  className={styles.slice}
                  initial={{ y: '-100%', opacity: 0 }}
                  animate={{ 
                    y: '0%', 
                    opacity: 1,
                    transition: {
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.055
                    }
                  }}
                  exit={{ 
                    y: '100%',
                    opacity: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.7, 0, 0.84, 0],
                      delay: (7 - index) * 0.03
                    }
                  }}
                  style={{
                    left: `${(index * 100) / 8}%`,
                    width: `calc(${100 / 8}% + 1.5px)`,
                  }}
                >
                  <motion.div
                    className={styles.sliceInner}
                    style={{
                      left: `-${index * 100}%`,
                      width: `${8 * 100}%`,
                      backgroundImage: `url(${getBgImage(sydneyImages[currentIndex])})`,
                    }}
                    animate={{
                      scale: [1.0, 1.05],
                      transition: {
                        duration: 4.5,
                        ease: "easeOut"
                      }
                    }}
                  />
                  <div className={styles.overlay} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Elegant Content Box */}
          <div className={styles.contentBox}>
            <div className={styles.badge}>Sydney Coverage</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={styles.slideInfo}
              >
                <h3>{sydneyImages[currentIndex].title}</h3>
                <p>{sydneyImages[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots navigation */}
            <div className={styles.dotsContainer}>
              {sydneyImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to Sydney slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SydneySection;
