"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Award, Car } from 'lucide-react';
import styles from './ChooseUsSection.module.css';

const ChooseUsSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum 12 degrees rotation for subtle premium feel
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1200px) rotateX(5deg) rotateY(10deg) scale3d(1, 1, 1)`;
  };

  const points = [
    {
      icon: <Clock className={styles.icon} size={28} />,
      title: "Flawless Punctuality",
      description: "We track your flight numbers in real-time and plan routes dynamically to guarantee we are always 15 minutes ahead of schedule."
    },
    {
      icon: <Shield className={styles.icon} size={28} />,
      title: "Absolute Safety & Discretion",
      description: "Travel with complete peace of mind. Our chauffeured transfers prioritize your privacy, confidentiality, and physical security."
    },
    {
      icon: <Award className={styles.icon} size={28} />,
      title: "Elite Certified Chauffeurs",
      description: "Our drivers are rigorously vetted, professionally trained in defensive driving, and committed to providing first-class concierge hospitality."
    },
    {
      icon: <Car className={styles.icon} size={28} />,
      title: "Impeccable Luxury Fleet",
      description: "Select from a pristine fleet of modern luxury sedans, SUVs, and executive vans equipped with complementary premium amenities."
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
              style={{ transform: 'perspective(1200px) rotateX(5deg) rotateY(10deg)' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* 3D Cuboid Sides */}
              <div className={`${styles.side} ${styles.sideTop}`} />
              <div className={`${styles.side} ${styles.sideBottom}`} />
              <div className={`${styles.side} ${styles.sideLeft}`} />
              <div className={`${styles.side} ${styles.sideRight}`} />
              <div className={styles.cardBack} />

              <div className={styles.imageWrapper}>
                <img src="/chooseUS.jpg" alt="Why Choose Us" className={styles.mainImage} />
                <div className={styles.glassOverlay} />
                <div className={styles.reflection} />
              </div>
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
              <span className={styles.subtitle}>Uncompromising Excellence</span>
              <h2>Why Choose Us?</h2>
              <p className={styles.leadText}>
                We redefine corporate transportation through meticulous execution, world-class luxury fleets, and a commitment to setting new standards in executive concierge services.
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
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
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
