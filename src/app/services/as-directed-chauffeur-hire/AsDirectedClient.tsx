"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Clock, Shield, CheckCircle, ArrowRight, MapPin, Sparkles, Car } from 'lucide-react';
import styles from '../services.module.css';

export default function AsDirectedClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'hourly' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/privateTour.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/privateTours.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_hourly.badge', 'Flexible Hourly Hire')}</span>
          <h1>{t('service_hourly.title', 'As-Directed Chauffeur Hire')}</h1>
          <p>
            {t('service_hourly.hero_desc', 'Retain a dedicated luxury vehicle and private chauffeur on standby for as many hours as your schedule requires. Ideal for dynamic executive agendas, multi-stop business meetings, and VIP city itineraries.')}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_hourly.book_btn', 'Book Hourly Chauffeur')}
            </a>
            <a href="/#booking" onClick={handleBookService} className={styles.secondaryBtn}>
              {t('service_hourly.quote_btn', 'Request Hourly Quote')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Clock size={24} />
            </div>
            <h3>{t('service_hourly.f1_title', 'Total Schedule Flexibility')}</h3>
            <p>{t('service_hourly.f1_desc', 'Direct your chauffeur from stop to stop without worrying about pre-set routes or waiting fees. Your vehicle remains on immediate standby.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Shield size={24} />
            </div>
            <h3>{t('service_hourly.f2_title', 'Executive Discretion')}</h3>
            <p>{t('service_hourly.f2_desc', 'Work on confidential files or take private phone calls in complete tranquility inside a whisper-quiet luxury cabin.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <MapPin size={24} />
            </div>
            <h3>{t('service_hourly.f3_title', 'Local Navigation Expertise')}</h3>
            <p>{t('service_hourly.f3_desc', 'Chauffeurs equipped with live traffic routing knowledge to ensure smooth transit between Sydney, Melbourne, Brisbane CBDs and beyond.')}</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Fleet/BMW i7.jpg" alt="As Directed Executive Chauffeur Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_hourly.detail_title', 'Bespoke Chauffeured Mobility On Your Terms')}</h2>
            <p>
              {t('service_hourly.detail_desc', 'When your business day involves multiple meetings, site visits, or unpredictable finish times, as-directed hire guarantees seamless transportation waiting at the kerb whenever you emerge.')}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_hourly.check1', 'Minimum 2-hour booking duration with flexible extensions')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_hourly.check2', 'Available in Mercedes-Benz S-Class, BMW 7, GLS, and V-Class vans')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_hourly.check3', 'Climate control, onboard phone charging, and complimentary spring water')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_hourly.check4', 'All parking, tolls, and waiting periods handled seamlessly')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_hourly.faq_title', 'As-Directed Chauffeur FAQs')}</h2>
            <p>{t('service_hourly.faq_subtitle', 'Common details regarding hourly and daily chauffeur bookings.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_hourly.q1', 'What is the minimum hire period?')}</h4>
              <p>{t('service_hourly.a1', 'Our standard as-directed hourly bookings start at a 2-hour minimum, with full-day and multi-day packages available.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_hourly.q2', 'Can I change destinations spontaneously during the trip?')}</h4>
              <p>{t('service_hourly.a2', 'Yes. Simply inform your chauffeur where you need to go next. The vehicle is solely dedicated to you throughout your booked hours.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_hourly.q3', 'Are tolls and parking included in hourly rates?')}</h4>
              <p>{t('service_hourly.a3', 'Standard CBD travel tolls are included. Any specialized commercial parking fees incurred while waiting at your request are itemized transparently.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_hourly.q4', 'Can I book an as-directed van for a small delegation?')}</h4>
              <p>{t('service_hourly.a4', 'Yes, our Mercedes-Benz V-Class (up to 7 passengers) is ideal for executive teams and delegation travel.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>{t('service_hourly.cta_title', 'Reserve an As-Directed Chauffeur Today')}</h2>
          <p>{t('service_hourly.cta_desc', 'Provide your estimated itinerary or hours, and our team will confirm your dedicated vehicle and driver.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_hourly.cta_btn', 'Reserve Hourly Chauffeur')} <ArrowRight size={16} />
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_hourly.call_direct', 'Call Direct: +61 430 729 993')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
