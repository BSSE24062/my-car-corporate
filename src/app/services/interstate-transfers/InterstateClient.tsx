"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Navigation, ShieldCheck, Clock, CheckCircle, ArrowRight, MapPin, Coffee, Car } from 'lucide-react';
import styles from '../services.module.css';

export default function InterstateClient() {
  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'interstate' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/oneDayTour.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/oneDayTrip.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Long-Distance & Regional Transit</span>
          <h1>Interstate & Regional Chauffeur Transfers</h1>
          <p>
            Private, comfortable long-distance chauffeured journeys connecting capital cities and regional commercial centres across Australia (Sydney to Canberra, Melbourne to regional Victoria, Brisbane to Gold Coast / Sunshine Coast). Avoid airport queues and travel on your schedule.
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              Book Interstate Transfer
            </a>
            <a href="/#booking" onClick={handleBookService} className={styles.secondaryBtn}>
              Request Route Quote
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Car size={24} />
            </div>
            <h3>Door-to-Door Private Transit</h3>
            <p>Travel directly from your home or office to regional sites and interstate destinations without flight delays, security lines, or baggage restrictions.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Coffee size={24} />
            </div>
            <h3>Productive Mobile Office</h3>
            <p>Work uninterrupted with onboard Wi-Fi, 240V/USB laptop charging ports, leather recliners, and peaceful acoustic insulation.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ShieldCheck size={24} />
            </div>
            <h3>Long-Distance Driver Safety</h3>
            <p>Experienced long-distance highway chauffeurs adhering to fatigue management protocols, ensuring safe transit in all weather conditions.</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Sydney/harbourSide.jpg" alt="Interstate Chauffeur Travel Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>The Smarter Alternative to Short Flights</h2>
            <p>
              For trips like Sydney to Canberra (under 3 hours door-to-door), driving in an executive Mercedes-Benz S-Class or BMW 7 is faster and vastly more productive than commuting to an airport 90 minutes early and waiting through boarding lines.
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Popular routes: Sydney ⇄ Canberra, Sydney ⇄ Newcastle / Hunter Valley, Melbourne ⇄ Geelong</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Customized rest stops and scenic route options at your request</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> High-capacity Mercedes-Benz V-Class and Sprinter vans for team travel</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Fixed, all-inclusive route pricing covering fuel, tolls, and return travel</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>Interstate Transfer FAQs</h2>
            <p>Details about booking long-distance and regional chauffeur trips.</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>Which interstate routes do you service most frequently?</h4>
              <p>Our most requested routes include Sydney ⇄ Canberra, Sydney ⇄ Wollongong/Southern Highlands, Brisbane ⇄ Gold Coast / Byron Bay, and Melbourne ⇄ Mornington Peninsula.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can the chauffeur wait for me for a same-day return?</h4>
              <p>Yes. Same-day return packages are very popular for corporate executives attending regional site inspections or Canberra parliamentary meetings.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can we bring pets or oversized luggage?</h4>
              <p>Yes. With prior notice, our executive SUVs (GLS, X7) and V-Class vans can easily accommodate extra luggage, project equipment, or crates.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>How is interstate pricing calculated?</h4>
              <p>We provide a single, transparent fixed quote for your specific route including all highway tolls and driver allowances.</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>Get an Interstate Transfer Quote</h2>
          <p>Tell us your departure address and destination for an upfront, fixed-price travel quote.</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              Request Route Quote <ArrowRight size={16} />
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              Call Direct: +61 430 729 993
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
