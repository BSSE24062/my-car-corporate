import React from 'react';
import styles from './FleetSection.module.css';

const fleet = [
  { name: 'Mercedes-Benz S-Class', class: 'Luxury Sedan', img: '/Fleet/benz s class.jpg' },
  { name: 'Mercedes Maybach', class: 'Ultra Luxury', img: '/Fleet/benz.jpg' },
  { name: 'BMW 7 Series', class: 'Premium Sedan', img: '/Fleet/BMW i7.jpg' },
  { name: 'Mercedes-Benz GLS', class: 'Luxury SUV', img: '/Fleet/gls.jpg' },
  { name: 'BMW X7', class: 'Premium SUV', img: '/Fleet/bmwX7.jpg' },
  { name: 'Audi Q7', class: 'Executive SUV', img: '/Fleet/audiQ7.avif' },
  { name: 'Mercedes-Benz V-Class', class: 'Luxury Van', img: '/Fleet/benz v class.jpg' },
  { name: 'Mercedes Sprinter', class: 'Executive Minibus', img: '/Fleet/sprinter.jpg' }
];

const FleetSection = () => {
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
            Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
          <span className={styles.marqueeText} aria-hidden="true">
            Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;Our Premium Fleet&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>

        {/* Static sub-heading centered */}
        <p className={styles.roadSubtitle}>
          Experience the epitome of luxury and comfort with our meticulously maintained vehicles.
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
                <p>{car.class}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
