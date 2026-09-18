"use client";

import React from 'react';
import styles from './CustomLoader.module.css';

interface CustomLoaderProps {
  label?: string;
  subtitle?: string;
}

export default function CustomLoader({
  label = "Elite Cars Australia",
  subtitle = "Executive Chauffeur Service"
}: CustomLoaderProps) {
  return (
    <div className={styles.loaderWrapper} role="status" aria-live="polite">
      {/* Background ambient radial glow */}
      <div className={styles.glowAura} />
      
      <div className={styles.spinnerContainer}>
        {/* Outer glowing orbital track with satellite beacon */}
        <div className={styles.orbitRingOuter}>
          <span className={styles.orbitSatellite} />
        </div>

        {/* Middle counter-rotating dashed precision ring */}
        <div className={styles.orbitRingMiddle} />

        {/* Inner shimmering ring */}
        <div className={styles.orbitRingInner} />

        {/* Cardinal micro-gold diamonds */}
        <div className={styles.cardinalMarks}>
          <span className={styles.markNorth} />
          <span className={styles.markSouth} />
          <span className={styles.markEast} />
          <span className={styles.markWest} />
        </div>

        {/* Central Logo with backlight halo */}
        <div className={styles.logoBacklight} />
        <img 
          src="/logo.png" 
          alt="Elite Cars Australia" 
          className={styles.centerLogo}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }} 
        />
      </div>

      {/* Brand Text Section */}
      <div className={styles.brandText}>
        <span className={styles.brandBadge}>✦ LUXURY CHAUFFEUR ✦</span>
        <h2 className={styles.brandTitle}>{label}</h2>
        <span className={styles.brandSubtitle}>{subtitle}</span>
        
        {/* High-tech glassmorphic progress bar */}
        <div className={styles.shimmerBar}>
          <div className={styles.shimmerProgress}>
            <span className={styles.progressGlow} />
          </div>
        </div>
      </div>
    </div>
  );
}

