"use client";

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const car1Ref = useRef<HTMLDivElement>(null);
  const frontWheel1Ref = useRef<HTMLImageElement>(null);
  const backWheel1Ref = useRef<HTMLImageElement>(null);
  const car2Ref = useRef<HTMLDivElement>(null);
  const frontWheel2Ref = useRef<HTMLImageElement>(null);
  const backWheel2Ref = useRef<HTMLImageElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !carWrapperRef.current || !car1Ref.current || !frontWheel1Ref.current || !backWheel1Ref.current || !car2Ref.current || !frontWheel2Ref.current || !backWheel2Ref.current || !text1Ref.current || !text2Ref.current) return;

    let ctx: gsap.Context | null = null;
    let hasStarted = false;

    const startEntranceAnimations = () => {
      if (hasStarted) return;
      hasStarted = true;

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const xPercentVal = isMobile ? -50 : 0;

      // 1. Car 1 emerges cleanly from offscreen right
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

      // 2. Car 1 wheels spin counter-clockwise as the car drives forward onto the screen
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
            end: "+=100%", // 100% of viewport height (optimized non-extra-scrolly length)
            pin: true,
            scrub: 1,
          }
        });

        // --- FIRST TRANSITION (0 to 0.4): Car 1 drives off left, Text 1 fades out ---
        tl.to(car1Ref.current, {
          x: '-120vw',
          xPercent: xPercentVal,
          ease: "none",
          duration: 0.4
        }, 0);

        tl.to([frontWheel1Ref.current, backWheel1Ref.current], {
          rotation: -720,
          ease: "none",
          duration: 0.4
        }, 0);

        tl.to(text1Ref.current, {
          opacity: 0,
          y: -50,
          duration: 0.3,
        }, 0);

        // --- SECOND TRANSITION (0.4 to 0.8): Car 2 enters from right, Text 2 fades in ---
        tl.fromTo(car2Ref.current, 
          { x: '120vw', xPercent: xPercentVal, opacity: 1, scale: 1, rotation: 0 },
          {
            x: '0vw',
            xPercent: xPercentVal,
            ease: "none",
            duration: 0.4
          }, 
          0.4
        );

        tl.fromTo([frontWheel2Ref.current, backWheel2Ref.current], 
          { rotation: 720 },
          {
            rotation: 0,
            ease: "none",
            duration: 0.4
          }, 
          0.4
        );

        tl.fromTo(text2Ref.current, {
          opacity: 0,
          y: 50,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, 0.5);

        // --- THIRD TRANSITION (0.8 to 1.0): Car 2 drives off left, Text 2 fades out ---
        tl.to(car2Ref.current, {
          x: '-120vw',
          xPercent: xPercentVal,
          ease: "none",
          duration: 0.2
        }, 0.8);

        tl.to([frontWheel2Ref.current, backWheel2Ref.current], {
          rotation: -360,
          ease: "none",
          duration: 0.2
        }, 0.8);

        tl.to(text2Ref.current, {
          opacity: 0,
          y: -50,
          duration: 0.2
        }, 0.8);

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

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      <div className={styles.background}></div>

      <div className={styles.contentWrapper}>
        
        {/* Left Side: Text Content */}
        <div className={styles.textContent}>
          <div ref={text1Ref} className={`${styles.textBlock} ${styles.relativeMobile}`} style={{ opacity: 0 }}>
            <h1>{t('hero.title')}</h1>
            <p className={styles.subtitle}>{t('hero.subtitle')}</p>
            <p className={styles.description}>{t('hero.description')}</p>
            <a href="#booking" className={styles.bookNowBtn}>
              {t('form.submit')}
            </a>
          </div>
          <div ref={text2Ref} className={`${styles.textBlock} ${styles.absoluteCenter}`}>
            <h1>{t('hero.luxury_title')}</h1>
            <p className={styles.subtitle}>{t('hero.luxury_subtitle')}</p>
            <p className={styles.description}>{t('hero.luxury_description')}</p>
            <a href="#booking" className={styles.bookNowBtn}>
              {t('form.submit')}
            </a>
          </div>
        </div>

        {/* Right Side: Car wrapper, body and wheels */}
        <div ref={carWrapperRef} className={styles.carContainer}>

          {/* Car 1 (Page 1) */}
          <div 
            ref={car1Ref} 
            className={styles.animatedCar} 
            style={{ opacity: 0 }}
          >
            <img src="/audiBody_no_shadow.png" alt="Audi Q7 Body" className={styles.carBody} />
            <img 
              ref={frontWheel1Ref} 
              src="/front_wheel.png" 
              alt="Front Wheel" 
              className={`${styles.wheel} ${styles.frontWheel}`} 
            />
            <img 
              ref={backWheel1Ref} 
              src="/back_wheel.png" 
              alt="Back Wheel" 
              className={`${styles.wheel} ${styles.backWheel}`} 
            />
          </div>

          {/* Car 2 (Page 2) */}
          <div 
            ref={car2Ref} 
            className={styles.animatedCar} 
            style={{ opacity: 1, transform: 'translate3d(120vw, 0px, 0px)' }}
          >
            <img src="/audiBody_no_shadow.png" alt="Audi Q7 Body" className={styles.carBody} />
            <img 
              ref={frontWheel2Ref} 
              src="/front_wheel.png" 
              alt="Front Wheel" 
              className={`${styles.wheel} ${styles.frontWheel}`} 
            />
            <img 
              ref={backWheel2Ref} 
              src="/back_wheel.png" 
              alt="Back Wheel" 
              className={`${styles.wheel} ${styles.backWheel}`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
