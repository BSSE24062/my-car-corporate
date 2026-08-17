"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './SydneySection.module.css';

const sydneyImages = [
  {
    id: 1,
    titleKey: "sydney.opera_title",
    descKey: "sydney.opera_desc",
    desktopImg: "/Sydney/operaHouse.jpg",
    mobileImg: "/Sydney/mobile_sydney/operaHouse.jpg"
  },
  {
    id: 2,
    titleKey: "sydney.airport_title",
    descKey: "sydney.airport_desc",
    desktopImg: "/Sydney/airport.jpg",
    mobileImg: "/Sydney/mobile_sydney/airport.jpg"
  },
  {
    id: 3,
    titleKey: "sydney.bondi_title",
    descKey: "sydney.bondi_desc",
    desktopImg: "/Sydney/bondi.jpg",
    mobileImg: "/Sydney/mobile_sydney/bondi.jpg"
  },
  {
    id: 4,
    titleKey: "sydney.harbour_title",
    descKey: "sydney.harbour_desc",
    desktopImg: "/Sydney/harbour.jpg",
    mobileImg: "/Sydney/mobile_sydney/harbour.jpg"
  },
  {
    id: 5,
    titleKey: "sydney.seacliff_title",
    descKey: "sydney.seacliff_desc",
    desktopImg: "/Sydney/seacliff.jpg",
    mobileImg: "/Sydney/mobile_sydney/seacliff.jpg"
  },
  {
    id: 6,
    titleKey: "sydney.botanic_title",
    descKey: "sydney.botanic_desc",
    desktopImg: "/Sydney/nearOpera.jpg",
    mobileImg: "/Sydney/mobile_sydney/nearOpera.jpg"
  },
  {
    id: 7,
    titleKey: "sydney.clock_title",
    descKey: "sydney.clock_desc",
    desktopImg: "/Sydney/clockTower.jpg",
    mobileImg: "/Sydney/mobile_sydney/clockTower.jpg"
  },
  {
    id: 8,
    titleKey: "sydney.terminal_title",
    descKey: "sydney.terminal_desc",
    desktopImg: "/Sydney/sydneyAirport.jpg",
    mobileImg: "/Sydney/mobile_sydney/sydneyAirport.jpg"
  },
  {
    id: 9,
    titleKey: "sydney.darling_title",
    descKey: "sydney.darling_desc",
    desktopImg: "/Sydney/harbourSide.jpg",
    mobileImg: "/Sydney/mobile_sydney/harbourSide.jpg"
  }
];

const SydneySection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sydneyImages.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sydney" className={styles.sydneySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{t('sydney.title', 'Sydney In Style')}</h2>
          <p>{t('sydney.subtitle', "Experience the finest chauffeured transport across Sydney's landmark destinations.")}</p>
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
                      duration: 1.0,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.075
                    }
                  }}
                  exit={{ 
                    y: '100%',
                    opacity: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.7, 0, 0.84, 0],
                      delay: (7 - index) * 0.04
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
                      '--bg-desktop': `url(${sydneyImages[currentIndex].desktopImg})`,
                      '--bg-mobile': `url(${sydneyImages[currentIndex].mobileImg})`,
                    } as React.CSSProperties}
                    animate={{
                      scale: [1.0, 1.05],
                      transition: {
                        duration: 5.0,
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
            <div className={styles.badge}>{t('sydney.coverage', 'Sydney Coverage')}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={styles.slideInfo}
              >
                <h3>{t(sydneyImages[currentIndex].titleKey)}</h3>
                <p>{t(sydneyImages[currentIndex].descKey)}</p>
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
