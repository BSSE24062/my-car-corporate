import React from 'react';
import styles from './FleetSection.module.css';

const fleet = [
  { name: 'Audi Q7', class: 'Premium SUV', img: '/audiQ7.avif' },
  { name: 'Mercedes-Benz S-Class', class: 'Luxury Sedan', img: '/benz s class.jpg' },
  { name: 'Mercedes-Benz V-Class', class: 'Luxury Van', img: '/benz v class.jpg' },
  { name: 'Mercedes Sprinter', class: 'Executive Minibus', img: '/sprinter.jpg' },
  { name: 'Mercedes Maybach', class: 'Ultra Luxury', img: '/benz.jpg' }
];

const FleetSection = () => {
  return (
    <section id="fleet" className={styles.fleetSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Premium Fleet</h2>
          <p>Experience the epitome of luxury and comfort with our meticulously maintained vehicles.</p>
        </div>

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
