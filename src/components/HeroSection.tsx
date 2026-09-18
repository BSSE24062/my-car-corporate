"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const heroBgs = [
  { id: 1, desktop: '/Hero/hero-bg-1.jpg', mobile: '/Hero/mobile_hero/hero-bg-1.jpg' },
  { id: 2, desktop: '/Sydney/Australia/cbd_melbourne.jpg', mobile: '/Sydney/Australia/mobile_australia/cbd_melbourne.jpg' },
  { id: 3, desktop: '/Sydney/Australia/adelaid1.jpg', mobile: '/Sydney/Australia/mobile_australia/adelaid1.jpg' },
  { id: 4, desktop: '/Hero/hero-bg-2.jpg', mobile: '/Hero/mobile_hero/hero-bg-2.jpg' },
  { id: 5, desktop: '/Sydney/Australia/gold_coast_night.jpg', mobile: '/Sydney/Australia/mobile_australia/gold_coast_night.jpg' },
  { id: 6, desktop: '/Sydney/Australia/syd_airport.jpg', mobile: '/Sydney/Australia/mobile_australia/syd_airport.jpg' },
  { id: 7, desktop: '/Sydney/Australia/melbourne_night.jpg', mobile: '/Sydney/Australia/mobile_australia/melbourne_night.jpg' },
  { id: 8, desktop: '/Sydney/Australia/adelaid2.jpg', mobile: '/Sydney/Australia/mobile_australia/adelaid2.jpg' },
  { id: 9, desktop: '/Hero/hero-bg-3.jpg', mobile: '/Hero/mobile_hero/hero-bg-3.jpg' },
  { id: 10, desktop: '/Sydney/Australia/perth2.jpg', mobile: '/Sydney/Australia/mobile_australia/perth2.jpg' },
  { id: 11, desktop: '/Sydney/Australia/darwin.jpg', mobile: '/Sydney/Australia/mobile_australia/darwin.jpg' },
  { id: 12, desktop: '/Hero/hero-bg-4.jpg', mobile: '/Hero/mobile_hero/hero-bg-4.jpg' },
  { id: 13, desktop: '/Sydney/Australia/tasmania2.jpg', mobile: '/Sydney/Australia/mobile_australia/tasmania2.jpg' },
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

  // Preload all hero images on mount for instantaneous rendering
  useEffect(() => {
    heroBgs.forEach((bg) => {
      const img1 = new Image();
      img1.src = bg.desktop;
      const img2 = new Image();
      img2.src = bg.mobile;
    });
  }, []);

  // Background slideshow cycle every 5.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 5500);
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

      // 1. Car emerges smoothly from offscreen right
      gsap.fromTo(car1Ref.current,
        { x: "100vw", xPercent: xPercentVal, opacity: 1, scale: 0.75, rotation: -10 },
        { 
          x: "0vw", 
          xPercent: xPercentVal,
          opacity: 1,
          scale: 1, 
          rotation: 0, 
          duration: 1.8, 
          ease: "power4.out",
          onComplete: initScrollTrigger
        }
      );

      // 2. Wheels spin counter-clockwise as car drives forward onto screen
      gsap.fromTo([frontWheel1Ref.current, backWheel1Ref.current],
        { rotation: 360 },
        { rotation: 0, duration: 1.8, ease: "power4.out" }
      );

      // 3. Intro text fades/slides in from left with blur
      gsap.fromTo(text1Ref.current,
        { x: "-60px", opacity: 0, filter: "blur(6px)" },
        { x: "0px", opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }
      );
    };

    const initScrollTrigger = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const xPercentVal = isMobile ? -50 : 0;

      ctx = gsap.context(() => {
        // Natural scroll scrub with slightly increased movement speed & tyre spin
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "70% top",
            scrub: 0.3,
          }
        });

        // 1. Car drives faster across the screen to the left as user scrolls down
        tl.to(car1Ref.current, {
          x: isMobile ? '-135vw' : '-130vw',
          xPercent: xPercentVal,
          ease: "power1.in",
          duration: 1.0
        }, 0);

        // 2. Wheels spin faster in sync with increased car speed
        tl.to([frontWheel1Ref.current, backWheel1Ref.current], {
          rotation: -1080,
          ease: "none",
          duration: 1.0
        }, 0);

        // 3. Text fades and slides up smoothly
        tl.to(text1Ref.current, {
          opacity: 0,
          y: -45,
          duration: 0.45,
          ease: "power1.out"
        }, 0);

      }, containerRef);
    };

    const isAlreadyLoaded = typeof window !== 'undefined' && (
      sessionStorage.getItem('elite_video_intro_seen') === 'true' ||
      (window as unknown as { __ELITE_LOADING_FINISHED__?: boolean }).__ELITE_LOADING_FINISHED__ === true
    );

    if (isAlreadyLoaded) {
      // Immediate entrance animation without delay when returning to home from services or other pages
      const timer = setTimeout(startEntranceAnimations, 30);
      return () => {
        clearTimeout(timer);
        if (ctx) ctx.revert();
      };
    }

    window.addEventListener('loading-finished', startEntranceAnimations);

    const fallbackTimer = setTimeout(() => {
      startEntranceAnimations();
    }, 4600);

    return () => {
      window.removeEventListener('loading-finished', startEntranceAnimations);
      clearTimeout(fallbackTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  const scrollToBooking = (mode: 'booking' | 'quote') => {
    window.dispatchEvent(new CustomEvent('set-booking-type', { detail: mode }));
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      const yOffset = -20;
      const y = bookingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.href = '/#booking';
    }
  };

  const handleBookNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToBooking('booking');
  };

  const handleGetQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToBooking('quote');
  };

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      {/* Layered Cross-Fading Background Slideshow — No Black Gaps or Unmounting */}
      <div className={styles.backgroundSlideshow}>
        {heroBgs.map((bg, idx) => (
          <div
            key={bg.id}
            className={`${styles.slideImage} ${idx === bgIndex ? styles.slideActive : ''}`}
            style={{
              '--bg-desktop': `url('${bg.desktop}')`,
              '--bg-mobile': `url('${bg.mobile}')`
            } as React.CSSProperties}
          />
        ))}
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.contentWrapper}>
        
        {/* Left Side: Text Content */}
        <div className={styles.textContent}>
          <div ref={text1Ref} className={`${styles.textBlock} ${styles.relativeMobile}`} style={{ opacity: 0 }}>
            <h1>{t('hero.title', 'Elite Cars Australia')}</h1>
            <p className={styles.subtitle}>{t('hero.subtitle', 'Executive Chauffeur & Airport Transfers Across Australia')}</p>
            <p className={styles.description}>{t('hero.description', 'Professional chauffeured transport tailored for corporate executives, VIP delegations, and seamless airport transfers across Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra. Featuring meticulously maintained vehicles, flight tracking, and courteous drivers.')}</p>
            
            <div className={styles.heroBtnGroup}>
              <a 
                href="#booking" 
                className={styles.bookNowBtn}
                onClick={handleBookNowClick}
              >
                {t('hero.book_now', 'Book Now')}
              </a>
              <a 
                href="#booking" 
                className={styles.quoteBtn}
                onClick={handleGetQuoteClick}
              >
                {t('hero.get_quote', 'Get a Quote')}
              </a>
            </div>
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
