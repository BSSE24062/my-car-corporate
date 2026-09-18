"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './SydneySection.module.css';

const destinationImages = [
  {
    id: 1,
    titleKey: "sydney.opera_title",
    descKey: "sydney.opera_desc",
    desktopImg: "/Sydney/operaHouse.jpg",
    mobileImg: "/Sydney/mobile_sydney/operaHouse.jpg"
  },
  {
    id: 2,
    titleKey: "sydney.melbourne_cbd_title",
    descKey: "sydney.melbourne_cbd_desc",
    desktopImg: "/Sydney/Australia/cbd_melbourne.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/cbd_melbourne.jpg"
  },
  {
    id: 3,
    titleKey: "sydney.harbour_title",
    descKey: "sydney.harbour_desc",
    desktopImg: "/Sydney/harbour.jpg",
    mobileImg: "/Sydney/mobile_sydney/harbour.jpg"
  },
  {
    id: 4,
    titleKey: "sydney.brisbane_title",
    descKey: "sydney.brisbane_desc",
    desktopImg: "/Sydney/Australia/brisbane.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/brisbane.jpg"
  },
  {
    id: 5,
    titleKey: "sydney.bondi_title",
    descKey: "sydney.bondi_desc",
    desktopImg: "/Sydney/bondi.jpg",
    mobileImg: "/Sydney/mobile_sydney/bondi.jpg"
  },
  {
    id: 6,
    titleKey: "sydney.goldcoast_day_title",
    descKey: "sydney.goldcoast_day_desc",
    desktopImg: "/Sydney/Australia/gold_coast_day.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/gold_coast_day.jpg"
  },
  {
    id: 7,
    titleKey: "sydney.botanic_title",
    descKey: "sydney.botanic_desc",
    desktopImg: "/Sydney/nearOpera.jpg",
    mobileImg: "/Sydney/mobile_sydney/nearOpera.jpg"
  },
  {
    id: 8,
    titleKey: "sydney.perth_skyline_title",
    descKey: "sydney.perth_skyline_desc",
    desktopImg: "/Sydney/Australia/perth1.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/perth1.jpg"
  },
  {
    id: 9,
    titleKey: "sydney.bluemountains_title",
    descKey: "sydney.bluemountains_desc",
    desktopImg: "/Sydney/Australia/bluemountains.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/bluemountains.jpg"
  },
  {
    id: 10,
    titleKey: "sydney.adelaide_city_title",
    descKey: "sydney.adelaide_city_desc",
    desktopImg: "/Sydney/Australia/adelaid1.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/adelaide1.jpg"
  },
  {
    id: 11,
    titleKey: "sydney.sydney_new_airport_title",
    descKey: "sydney.sydney_new_airport_desc",
    desktopImg: "/Sydney/Australia/western_syd_airport.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/western_syd_airport.jpg"
  },
  {
    id: 12,
    titleKey: "sydney.melbourne_night_title",
    descKey: "sydney.melbourne_night_desc",
    desktopImg: "/Sydney/Australia/melbourne_night.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/melbourne_night.jpg"
  },
  {
    id: 13,
    titleKey: "sydney.darwin_title",
    descKey: "sydney.darwin_desc",
    desktopImg: "/Sydney/Australia/darwin.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/darwin.jpg"
  },
  {
    id: 14,
    titleKey: "sydney.clock_title",
    descKey: "sydney.clock_desc",
    desktopImg: "/Sydney/clockTower.jpg",
    mobileImg: "/Sydney/mobile_sydney/clockTower.jpg"
  },
  {
    id: 15,
    titleKey: "sydney.goldcoast_night_title",
    descKey: "sydney.goldcoast_night_desc",
    desktopImg: "/Sydney/Australia/gold_coast_night.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/gold_coast_night.jpg"
  },
  {
    id: 16,
    titleKey: "sydney.darling_title",
    descKey: "sydney.darling_desc",
    desktopImg: "/Sydney/harbourSide.jpg",
    mobileImg: "/Sydney/mobile_sydney/harbourSide.jpg"
  },
  {
    id: 17,
    titleKey: "sydney.perth_coast_title",
    descKey: "sydney.perth_coast_desc",
    desktopImg: "/Sydney/Australia/perth2.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/perth2.jpg"
  },
  {
    id: 18,
    titleKey: "sydney.tasmania_title",
    descKey: "sydney.tasmania_desc",
    desktopImg: "/Sydney/Australia/tasmania.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/tasmania.jpg"
  },
  {
    id: 19,
    titleKey: "sydney.adelaide_hills_title",
    descKey: "sydney.adelaide_hills_desc",
    desktopImg: "/Sydney/Australia/adelaid2.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/adelaid2.jpg"
  },
  {
    id: 20,
    titleKey: "sydney.airport_title",
    descKey: "sydney.airport_desc",
    desktopImg: "/Sydney/Australia/syd_airport.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/syd_airport.jpg"
  },
  {
    id: 21,
    titleKey: "sydney.tasmania_coast_title",
    descKey: "sydney.tasmania_coast_desc",
    desktopImg: "/Sydney/Australia/tasmania2.jpg",
    mobileImg: "/Sydney/Australia/mobile_australia/tasmania2.jpg"
  }
];

const SydneySection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinationImages.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + destinationImages.length) % destinationImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinationImages.length);
  };

  return (
    <section id="sydney" className={styles.sydneySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{t('sydney.title', 'Australia In Style')}</h2>
          <p>{t('sydney.subtitle', "Experience the finest chauffeured transport across Australia's landmark destinations.")}</p>
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
                      '--bg-desktop': `url("${destinationImages[currentIndex].desktopImg}")`,
                      '--bg-mobile': `url("${destinationImages[currentIndex].mobileImg}")`,
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
            <div className={styles.badge}>{t('sydney.coverage', 'Nationwide Coverage')}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={styles.slideInfo}
              >
                <h3>{t(destinationImages[currentIndex].titleKey)}</h3>
                <p>{t(destinationImages[currentIndex].descKey)}</p>
              </motion.div>
            </AnimatePresence>

            {/* Instagram-Style Carousel Pagination */}
            <div className={styles.paginationWrapper}>
              <button 
                onClick={handlePrev}
                className={styles.navArrowBtn}
                aria-label="Previous destination"
              >
                <ChevronLeft size={16} />
              </button>

              <div className={styles.dotsViewport}>
                <div 
                  className={styles.dotsTrack}
                  style={{
                    transform: `translateX(${50 - (currentIndex * 13 + 11)}px)`
                  }}
                >
                  {destinationImages.map((_, idx) => {
                    const distance = Math.abs(idx - currentIndex);
                    let dotClass = styles.dot;
                    if (distance === 0) dotClass = `${styles.dot} ${styles.activeDot}`;
                    else if (distance === 1) dotClass = `${styles.dot} ${styles.dotNear}`;
                    else if (distance === 2) dotClass = `${styles.dot} ${styles.dotFar}`;
                    else dotClass = `${styles.dot} ${styles.dotHidden}`;

                    return (
                      <button
                        key={idx}
                        className={dotClass}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>

              <button 
                onClick={handleNext}
                className={styles.navArrowBtn}
                aria-label="Next destination"
              >
                <ChevronRight size={16} />
              </button>

              <span className={styles.slideCounter}>
                {String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(destinationImages.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SydneySection;
