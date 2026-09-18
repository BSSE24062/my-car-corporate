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
      <div className={styles.spinnerContainer}>
        <div className={styles.ring}></div>
        <div className={styles.innerRing}></div>
        <img 
          src="/logo.png" 
          alt="Elite Cars Australia" 
          className={styles.centerLogo}
          onError={(e) => {
            // fallback if logo.png isn't accessible
            (e.target as HTMLElement).style.display = 'none';
          }} 
        />
      </div>

      <div className={styles.brandText}>
        <span className={styles.brandTitle}>{label}</span>
        <span className={styles.brandSubtitle}>{subtitle}</span>
        <div className={styles.shimmerBar}>
          <div className={styles.shimmerProgress}></div>
        </div>
      </div>
    </div>
  );
}
