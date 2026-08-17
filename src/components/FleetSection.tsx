import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FleetSection.module.css';

const fleet = [
  { name: 'Mercedes-Benz S-Class', classKey: 'fleet.luxury_sedan', img: '/Fleet/benz s class.jpg' },
  { name: 'Mercedes Maybach', classKey: 'fleet.ultra_luxury', img: '/Fleet/benz.jpg' },
  { name: 'BMW 7 Series', classKey: 'fleet.premium_sedan', img: '/Fleet/BMW i7.jpg' },
  { name: 'Mercedes-Benz GLS', classKey: 'fleet.luxury_suv', img: '/Fleet/gls.jpg' },
  { name: 'BMW X7', classKey: 'fleet.premium_suv', img: '/Fleet/bmwX7.jpg' },
  { name: 'Audi Q7', classKey: 'fleet.executive_suv', img: '/Fleet/audiQ7.avif' },
  { name: 'Mercedes-Benz V-Class', classKey: 'fleet.luxury_van', img: '/Fleet/benz v class.jpg' },
  { name: 'Mercedes Sprinter', classKey: 'fleet.executive_minibus', img: '/Fleet/sprinter.jpg' }
];

const FleetSection = () => {
  const { t } = useTranslation();
  const titleText = t('fleet.title', 'Our Premium Fleet');
  const marqueeText = `${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0`;

  return (
    <section id="fleet" className={styles.fleetSection}>

      {/* Road Banner Header — road scrolls + text marquees on top */}
      <div className={styles.roadBanner}>
        {/* Road scrolling background */}
        <div className={styles.roadBg} />

        {/* Dark overlay so text is readable */}
        <div className={styles.roadOverlay} />

        {/* Marquee text pasted on the road, scrolling at same speed */}
        <div className={styles.marqueeTrack}>
          <span className={styles.marqueeText}>
            {marqueeText}
          </span>
          <span className={styles.marqueeText} aria-hidden="true">
            {marqueeText}
          </span>
        </div>

        {/* Static sub-heading centered */}
        <p className={styles.roadSubtitle}>
          {t('fleet.subtitle', 'Experience the epitome of luxury and comfort with our meticulously maintained vehicles.')}
        </p>
      </div>

      {/* Fleet Grid */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {fleet.map((car, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={car.img} alt={car.name} />
              </div>
              <div className={styles.info}>
                <h3>{car.name}</h3>
                <p>{t(car.classKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
