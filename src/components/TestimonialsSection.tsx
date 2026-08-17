"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    quoteKey: "testimonials.quote1",
    author: "Alexander Mercer",
    titleKey: "testimonials.title1",
    rating: 5
  },
  {
    id: 2,
    quoteKey: "testimonials.quote2",
    author: "Elena Rostova",
    titleKey: "testimonials.title2",
    rating: 5
  },
  {
    id: 3,
    quoteKey: "testimonials.quote3",
    author: "Marcus Vance",
    titleKey: "testimonials.title3",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 seconds auto-scroll

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('testimonials.badge', 'Client Reviews')}</span>
          <h2>{t('testimonials.title', 'Client Testimonials')}</h2>
          <p>{t('testimonials.subtitle', 'Read what our distinguished clients say about our executive transport services.')}</p>
        </div>

        <div 
          className={styles.sliderWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            className={`${styles.navBtn} ${styles.leftBtn}`}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            className={`${styles.navBtn} ${styles.rightBtn}`}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className={styles.quoteIconWrapper}>
            <Quote className={styles.quoteIcon} size={64} />
          </div>

          <div className={styles.testimonialContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={styles.testimonialCard}
              >
                <div className={styles.rating}>
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className={styles.star} size={18} fill="#ff3b30" color="#ff3b30" />
                  ))}
                </div>
                
                <p className={styles.quote}>
                  "{t(testimonials[currentIndex].quoteKey)}"
                </p>

                <div className={styles.authorInfo}>
                  <span className={styles.name}>{testimonials[currentIndex].author}</span>
                  <span className={styles.title}>{t(testimonials[currentIndex].titleKey)}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
