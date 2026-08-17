import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ServicesBanner.module.css';

const ServicesBanner = () => {
  const { t } = useTranslation();
  const label = t('services.banner', 'Our Luxury Services');
  const text = `${label}  ·  ${label}  ·  ${label}  ·  ${label}  ·  `;
  
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
