"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, Shield, Award, Car } from 'lucide-react';
import styles from './ChooseUsSection.module.css';

const ChooseUsSection = () => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum 12 degrees rotation for subtle premium feel (as in last git push)
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const points = [
    {
      icon: <Clock className={styles.icon} size={28} />,
      titleKey: "why_choose_us.punctuality_title",
      descKey: "why_choose_us.punctuality_desc"
    },
    {
      icon: <Shield className={styles.icon} size={28} />,
      titleKey: "why_choose_us.safety_title",
      descKey: "why_choose_us.safety_desc"
    },
    {
      icon: <Award className={styles.icon} size={28} />,
      titleKey: "why_choose_us.chauffeurs_title",
      descKey: "why_choose_us.chauffeurs_desc"
    },
    {
      icon: <Car className={styles.icon} size={28} />,
      titleKey: "why_choose_us.fleet_title",
      descKey: "why_choose_us.fleet_desc"
    }
  ];

  return (
    <section id="about" className={styles.chooseSection}>
      {/* Foggy / Blurry Background Blobs */}
      <div className={styles.fogBg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Column: 3D Glassmorphism Image */}
          <div className={styles.imageColumn}>
            <div 
              ref={cardRef}
              className={styles.glassCard}
              style={{ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Back Face shadow layer */}
              <div className={styles.cardBack} />

              {/* Image at the front face (z = 24px) with glassy border and glare */}
              <div className={styles.imageWrapper}>
                <img src="/chooseUS.jpg" alt="Why Choose Us" className={styles.mainImage} />
                <div className={styles.glassOverlay} />
                <div className={styles.reflection} />
              </div>

              {/* 3D Cuboid Sides (Rendered after image to ensure edges are fully visible) */}
              <div className={`${styles.side} ${styles.sideTop}`} />
              <div className={`${styles.side} ${styles.sideBottom}`} />
              <div className={`${styles.side} ${styles.sideLeft}`} />
              <div className={`${styles.side} ${styles.sideRight}`} />
            </div>
          </div>

          {/* Right Column: Infographic Marketing Content */}
          <div className={styles.contentColumn}>
            <motion.div 
              className={styles.header}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.subtitle}>{t('why_choose_us.subtitle', 'Uncompromising Excellence')}</span>
              <h2>{t('why_choose_us.title', 'Why Choose Us?')}</h2>
              <p className={styles.leadText}>
                {t('why_choose_us.lead', 'We redefine corporate transportation through meticulous execution, world-class luxury fleets, and a commitment to setting new standards in executive concierge services.')}
              </p>
            </motion.div>

            <div className={styles.pointsList}>
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  className={styles.pointCard}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={styles.iconWrapper}>
                    {point.icon}
                  </div>
                  <div className={styles.pointContent}>
                    <h3>{t(point.titleKey)}</h3>
                    <p>{t(point.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
