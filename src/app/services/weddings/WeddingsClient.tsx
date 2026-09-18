"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Heart, Sparkles, Clock, CheckCircle, ArrowRight, Camera, Users } from 'lucide-react';
import styles from '../services.module.css';

export default function WeddingsClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'wedding' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/wedding.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/wedding.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_weddings.badge', 'Bridal & Wedding Transport')}</span>
          <h1>{t('service_weddings.title', 'Luxury Wedding Car Hire & Bridal Chauffeurs')}</h1>
          <p>
            {t('service_weddings.hero_desc', "Make your wedding day timeless with Australia's premier luxury wedding fleet. Featuring pristine Mercedes-Benz S-Class, Mercedes Maybach, BMW 7 Series, and executive people movers for your bridal party and family.")}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_weddings.book_btn', 'Check Wedding Availability')}
            </a>
            <a href="/#booking" onClick={handleBookService} className={styles.secondaryBtn}>
              {t('service_weddings.quote_btn', 'Get a Wedding Quote')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Sparkles size={24} />
            </div>
            <h3>{t('service_weddings.f1_title', 'Pristine Vehicle Presentation')}</h3>
            <p>{t('service_weddings.f1_desc', 'Every bridal vehicle undergoes comprehensive detailing inside and out, arriving spotless with optional classic white wedding ribbons.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Heart size={24} />
            </div>
            <h3>{t('service_weddings.f2_title', 'Professional Suited Chauffeurs')}</h3>
            <p>{t('service_weddings.f2_desc', 'Our experienced wedding chauffeurs are immaculately dressed in formal business suits, offering courteous assistance, door opening, and dress care.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Camera size={24} />
            </div>
            <h3>{t('service_weddings.f3_title', 'Photography & Location Transit')}</h3>
            <p>{t('service_weddings.f3_desc', 'Seamless timing and patient coordination between ceremony venues, picturesque photo locations, and evening reception entrances.')}</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/chooseUS.jpg" alt="Luxury Wedding Car Hire Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_weddings.detail_title', 'Grace, Elegance & Absolute Peace of Mind')}</h2>
            <p>
              {t('service_weddings.detail_desc', "Your wedding day is one of life's most memorable occasions. We eliminate transport stress with early arrival, calm guidance, and luxurious comfort for the bride, groom, and entire wedding party.")}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_weddings.check1', 'Early chauffeur arrival buffer for calm, unhurried departures')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_weddings.check2', 'White wedding ribbons, bottled water, and umbrella assistance included')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_weddings.check3', 'Mercedes V-Class and Sprinters for bridal party and VIP guests')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_weddings.check4', 'End-of-night getaway transfers directly to wedding night hotels or airports')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_weddings.faq_title', 'Wedding Transport FAQs')}</h2>
            <p>{t('service_weddings.faq_subtitle', 'Frequently asked questions about reserving bridal and guest vehicles.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_weddings.q1', 'How far in advance should we reserve wedding cars?')}</h4>
              <p>{t('service_weddings.a1', 'We recommend booking 2 to 6 months in advance, especially during peak Australian wedding seasons (spring and autumn).')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_weddings.q2', 'Are wedding ribbons included with the vehicles?')}</h4>
              <p>{t('service_weddings.a2', 'Yes. Complimentary white satin wedding bonnet ribbons are provided upon request for all bridal cars.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_weddings.q3', 'Can we book multiple matching vehicles?')}</h4>
              <p>{t('service_weddings.a3', 'Yes, we can provide coordinated packages featuring a lead Mercedes S-Class/Maybach accompanied by matching luxury Mercedes V-Class vans.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_weddings.q4', 'Do you provide late-night reception getaway transfers?')}</h4>
              <p>{t('service_weddings.a4', 'Yes, we offer late-night chauffeur pick-ups from reception venues to transport the newlyweds in comfort to their hotel or departing flight.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>{t('service_weddings.cta_title', 'Enquire About Your Wedding Date')}</h2>
          <p>{t('service_weddings.cta_desc', 'Tell us about your ceremony and reception schedule for a tailored wedding vehicle package.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_weddings.cta_btn', 'Request Wedding Package Quote')} <ArrowRight size={16} />
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_weddings.call_wedding', 'Call Wedding Concierge')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
