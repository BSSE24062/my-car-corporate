"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const heroBgs = [
  { id: 1, desktop: '/Hero/hero-bg-1.jpg', mobile: '/Hero/mobile_hero/hero-bg-1.jpg' },
  { id: 2, desktop: '/Hero/hero-bg-2.jpg', mobile: '/Hero/mobile_hero/hero-bg-2.jpg' },
  { id: 3, desktop: '/Hero/hero-bg-3.jpg', mobile: '/Hero/mobile_hero/hero-bg-3.jpg' },
  { id: 4, desktop: '/Hero/hero-bg-4.jpg', mobile: '/Hero/mobile_hero/hero-bg-4.jpg' },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const [bgIndex, setBgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const car1Ref = useRef<HTMLDivElement>(null);
  const frontWheel1Ref = useRef<HTMLImageElement>(null);
  const backWheel1Ref = useRef<HTMLImageElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 5500); // Change background every 5.5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !carWrapperRef.current || !car1Ref.current || !frontWheel1Ref.current || !backWheel1Ref.current || !text1Ref.current) return;

    let ctx: gsap.Context | null = null;
    let hasStarted = false;

    const startEntranceAnimations = () => {
      if (hasStarted) return;
      hasStarted = true;

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const xPercentVal = isMobile ? -50 : 0;

      // 1. Car emerges cleanly from offscreen right
      gsap.fromTo(car1Ref.current,
        { x: "100vw", xPercent: xPercentVal, opacity: 1, scale: 0.75, rotation: -10 },
        { 
          x: "0vw", 
          xPercent: xPercentVal,
          opacity: 1,
          scale: 1, 
          rotation: 0, 
          duration: 2.6, 
          ease: "power4.out",
          onComplete: initScrollTrigger
        }
      );

      // 2. Wheels spin counter-clockwise as the car drives forward onto the screen
      gsap.fromTo([frontWheel1Ref.current, backWheel1Ref.current],
        { rotation: 360 },
        { rotation: 0, duration: 2.6, ease: "power4.out" }
      );

      // 3. Intro text fades/slides in from left with blur
      gsap.fromTo(text1Ref.current,
        { x: "-100px", opacity: 0, filter: "blur(8px)" },
        { x: "0px", opacity: 1, filter: "blur(0px)", duration: 2.0, ease: "power3.out" }
      );
    };

    const initScrollTrigger = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const xPercentVal = isMobile ? -50 : 0;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%", // Viewport height scroll length
            pin: true,
            scrub: 1,
          }
        });

        // Single transition: Car drives off left, wheels spin forward, Text fades out
        tl.to(car1Ref.current, {
          x: '-120vw',
          xPercent: xPercentVal,
          ease: "none",
          duration: 1.0
        }, 0);

        tl.to([frontWheel1Ref.current, backWheel1Ref.current], {
          rotation: -720,
          ease: "none",
          duration: 1.0
        }, 0);

        tl.to(text1Ref.current, {
          opacity: 0,
          y: -50,
          duration: 0.8,
        }, 0);

      }, containerRef);
    };

    window.addEventListener('loading-finished', startEntranceAnimations);

    const fallbackTimer = setTimeout(() => {
      startEntranceAnimations();
    }, 6500);

    return () => {
      window.removeEventListener('loading-finished', startEntranceAnimations);
      clearTimeout(fallbackTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  const handleBookNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#booking';
    }
  };

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      <div className={styles.backgroundSlideshow}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            className={styles.slideImage}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ 
              opacity: 1, 
              scale: 1.04,
              transition: {
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 5.5, ease: "linear" }
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
            style={{
              '--bg-desktop': `url(${heroBgs[bgIndex].desktop})`,
              '--bg-mobile': `url(${heroBgs[bgIndex].mobile})`
            } as React.CSSProperties}
          />
        </AnimatePresence>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.contentWrapper}>
        
        {/* Left Side: Single Text Content */}
        <div className={styles.textContent}>
          <div ref={text1Ref} className={`${styles.textBlock} ${styles.relativeMobile}`} style={{ opacity: 0 }}>
            <h1>{t('hero.title', 'Elite Cars Australia')}</h1>
            <p className={styles.subtitle}>{t('hero.subtitle', 'Premium Chauffeur Service Across Australia')}</p>
            <p className={styles.description}>{t('hero.description', 'Experience first-class travel tailored for corporate executives, VIP events, and seamless airport transfers across Australia. Our professional chauffeurs guarantee absolute reliability, ultimate comfort, and a grand arrival in our premier luxury fleet.')}</p>
            <a 
              href="#booking" 
              className={styles.bookNowBtn}
              onClick={handleBookNowClick}
            >
              {t('form.submit', 'Book Now')}
            </a>
          </div>
        </div>

        {/* Right Side: Car wrapper, body and wheels */}
        <div ref={carWrapperRef} className={styles.carContainer}>
          <div 
            ref={car1Ref} 
            className={styles.animatedCar} 
            style={{ opacity: 0 }}
          >
            <img src="/Hero/audiBody_no_shadow.png" alt="Elite Cars Australia Luxury Chauffeur Vehicle Fleet" className={styles.carBody} />
            <img 
              ref={frontWheel1Ref} 
              src="/Hero/front_wheel.png" 
              alt="Elite Cars Australia Front Wheel" 
              className={`${styles.wheel} ${styles.frontWheel}`} 
            />
            <img 
              ref={backWheel1Ref} 
              src="/Hero/back_wheel.png" 
              alt="Elite Cars Australia Back Wheel" 
              className={`${styles.wheel} ${styles.backWheel}`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
