"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    quote: "My Corporate Cars has been our exclusive transport provider in Sydney for 3 years. Their punctuality is absolute, and the S-Class is always immaculate. The absolute benchmark for executive chauffeur services.",
    author: "Alexander Mercer",
    title: "Managing Director, Apex Global",
    rating: 5
  },
  {
    id: 2,
    quote: "Incredibly professional. I booking airport transfers frequently and they track flight changes seamlessly. Even when my flight was delayed 2 hours, the driver was waiting with a smile. Highly recommend zakki@zubs.dev for group transfers.",
    author: "Elena Rostova",
    title: "Venture Partner, Horizon Capital",
    rating: 5
  },
  {
    id: 3,
    quote: "We hired their V-Class and Mercedes Sprinter for our international delegates during the Sydney Summit. Vetted drivers, smooth rides, and flawless coordination. Truly premium service.",
    author: "Marcus Vance",
    title: "Chief of Staff, TechCorp Australia",
    rating: 5
  }
];

const TestimonialsSection = () => {
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
          <span className={styles.badge}>Client Reviews</span>
          <h2>Client Testimonials</h2>
          <p>Read what our distinguished clients say about our executive transport services.</p>
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
                  "{testimonials[currentIndex].quote}"
                </p>

                <div className={styles.authorInfo}>
                  <span className={styles.name}>{testimonials[currentIndex].author}</span>
                  <span className={styles.title}>{testimonials[currentIndex].title}</span>
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
