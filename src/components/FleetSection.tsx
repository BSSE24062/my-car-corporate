"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Briefcase } from 'lucide-react';
import styles from './FleetSection.module.css';

interface FleetCar {
  name: string;
  classKey: string;
  category: string;
  passengers: string;
  luggage: string;
  img: string;
}

const fleet: FleetCar[] = [
  {
    name: 'Mercedes-Benz S-Class',
    classKey: 'fleet.luxury_sedan',
    category: 'Executive Sedan',
    passengers: '3 Passengers',
    luggage: '2–3 Large Bags',
    img: '/Fleet/benz s class.jpg'
  },
  {
    name: 'Mercedes Maybach',
    classKey: 'fleet.ultra_luxury',
    category: 'First-Class Sedan',
    passengers: '3 Passengers',
    luggage: '2 Large Bags',
    img: '/Fleet/benz.jpg'
  },
  {
    name: 'BMW 7 Series',
    classKey: 'fleet.premium_sedan',
    category: 'Premium Sedan',
    passengers: '3 Passengers',
    luggage: '2–3 Large Bags',
    img: '/Fleet/BMW i7.jpg'
  },
  {
    name: 'Mercedes-Benz GLS',
    classKey: 'fleet.luxury_suv',
    category: 'Executive SUV',
    passengers: '4–6 Passengers',
    luggage: '4 Large Bags',
    img: '/Fleet/gls.jpg'
  },
  {
    name: 'BMW X7',
    classKey: 'fleet.premium_suv',
    category: 'Luxury SUV',
    passengers: '4–6 Passengers',
    luggage: '4 Large Bags',
    img: '/Fleet/bmwX7.jpg'
  },
  {
    name: 'Audi Q7',
    classKey: 'fleet.executive_suv',
    category: 'Premium SUV',
    passengers: '4 Passengers',
    luggage: '4 Large Bags',
    img: '/Fleet/audiQ7.avif'
  },
  {
    name: 'Mercedes-Benz V-Class',
    classKey: 'fleet.luxury_van',
    category: 'Executive People Mover',
    passengers: 'Up to 7 Passengers',
    luggage: '7 Large Bags',
    img: '/Fleet/benz v class.jpg'
  },
  {
    name: 'Mercedes Sprinter',
    classKey: 'fleet.executive_minibus',
    category: 'Executive Minibus',
    passengers: 'Up to 11–14 Passengers',
    luggage: '12+ Large Bags',
    img: '/Fleet/sprinter.jpg'
  }
];

const FleetSection = () => {
  const { t } = useTranslation();
  const titleText = t('fleet.title', 'Our Fleet & Capacities');
  const marqueeText = `${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0${titleText}\u00A0\u00A0·\u00A0\u00A0`;

  const handleSelectVehicle = (carName: string) => {
    window.dispatchEvent(new CustomEvent('set-vehicle-pref', { detail: carName }));
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      const yOffset = -20;
      const y = bookingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.href = '/#booking';
    }
  };

  return (
    <section id="fleet" className={styles.fleetSection}>

      {/* Road Banner Header — road scrolls + text marquees on top */}
      <div className={styles.roadBanner}>
        {/* Road scrolling background */}
        <div className={styles.roadBg} />

        {/* Dark overlay so text is readable */}
        <div className={styles.roadOverlay} />

        {/* Marquee text pasted on the road */}
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
          {t('fleet.subtitle', 'Meticulously maintained executive sedans, premium SUVs, and luxury people movers.')}
        </p>
      </div>

      {/* Fleet Grid */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {fleet.map((car, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <span className={styles.categoryTag}>{car.category}</span>
                <img src={car.img} alt={`${car.name} - Executive Chauffeur Fleet Australia | Elite Cars Australia`} loading="lazy" />
              </div>
              <div className={styles.info}>
                <div className={styles.carHeader}>
                  <h3>{car.name}</h3>
                  <p className={styles.classLabel}>{t(car.classKey, car.category)}</p>
                </div>

                {/* Passenger + Luggage Capacity Badges */}
                <div className={styles.capacityRow}>
                  <div className={styles.capBadge} title="Passenger Capacity">
                    <Users size={16} className={styles.capIcon} />
                    <span>{car.passengers}</span>
                  </div>
                  <span className={styles.dividerDot}>•</span>
                  <div className={styles.capBadge} title="Luggage Capacity">
                    <Briefcase size={16} className={styles.capIcon} />
                    <span>{car.luggage}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectVehicle(car.name)}
                  className={styles.selectVehicleBtn}
                >
                  Quote / Book This Vehicle →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
