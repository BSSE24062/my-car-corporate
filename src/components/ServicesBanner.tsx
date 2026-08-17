import React from 'react';
import styles from './ServicesBanner.module.css';

const ServicesBanner = () => {
  const text = "Our Luxury Services  ·  Our Luxury Services  ·  Our Luxury Services  ·  Our Luxury Services  ·  ";
  
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.marqueeTrack}>
        <span className={styles.marqueeText}>
          {text}{text}
        </span>
        <span className={styles.marqueeText} aria-hidden="true">
          {text}{text}
        </span>
      </div>
    </div>
  );
};

export default ServicesBanner;
