"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Plane, ShieldCheck, Clock, CheckCircle, ArrowRight, Lock, UserCheck } from 'lucide-react';
import styles from '../services.module.css';

export default function PrivateAviationClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'private_aviation' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Sydney/sydneyAirport.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/AirportPickups.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_fbo.badge', 'Private Jet & FBO Concierge')}</span>
          <h1>{t('service_fbo.title', 'Private Aviation & FBO Transfers')}</h1>
          <p>
            {t('service_fbo.hero_desc', 'Discreet, seamless tarmac and FBO terminal chauffeured transfers connecting private aircraft charters, corporate jets, and VIP aviation facilities across Sydney (ExecuJet, Jet Aviation), Melbourne (Essendon, Tullamarine FBO), Brisbane, and nationwide.')}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_fbo.book_btn', 'Book FBO Transfer')}
            </a>
            <a href="/#booking" onClick={handleBookService} className={styles.secondaryBtn}>
              {t('service_fbo.quote_btn', 'Request FBO Quote')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Plane size={24} />
            </div>
            <h3>{t('service_fbo.f1_title', 'Direct FBO & Tail Tracking')}</h3>
            <p>{t('service_fbo.f1_desc', 'We monitor private aircraft tail numbers and liaise directly with FBO handling agents and charter brokers to coordinate curbside or tarmac readiness.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Lock size={24} />
            </div>
            <h3>{t('service_fbo.f2_title', 'Maximum Privacy & Discretion')}</h3>
            <p>{t('service_fbo.f2_desc', 'High-security protocols and confidential transport for Ultra-High-Net-Worth individuals, executive delegations, dignitaries, and celebrities.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ShieldCheck size={24} />
            </div>
            <h3>{t('service_fbo.f3_title', 'Airside & ASIC Accreditation')}</h3>
            <p>{t('service_fbo.f3_desc', 'Accredited drivers familiar with VIP private jet protocols, luggage handling standards, and security procedures at Australian aviation facilities.')}</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Sydney/clockTower.jpg" alt="Private Jet FBO Chauffeur Transfers Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_fbo.detail_title', 'Plane-to-Boardroom Precision')}</h2>
            <p>
              {t('service_fbo.detail_desc', 'Private jet travel requires uncompromising timing and frictionless handoffs. Our chauffeurs are stationed at the FBO lounge before your wheels touch the runway, guaranteeing immediate departure as soon as you clear the steps.')}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_fbo.check1', 'Direct handling coordination with ExecuJet, Jet Aviation, and local FBO operators')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_fbo.check2', 'Tailored for charter brokers, flight departments, and VIP family offices')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_fbo.check3', 'Mercedes Maybach, Mercedes S-Class, BMW 7, and luxury V-Class support vans')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_fbo.check4', 'Discreet tarmac luggage handling and executive assistance')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_fbo.faq_title', 'Private Aviation Transfer FAQs')}</h2>
            <p>{t('service_fbo.faq_subtitle', 'Information for flight coordinators, pilots, and charter brokers.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_fbo.q1', 'Which FBO terminals do you service in Australia?')}</h4>
              <p>{t('service_fbo.a1', 'We service all major Australian FBOs including Sydney Airport (Jet Aviation, ExecuJet), Melbourne (Essendon Fields & Tullamarine FBO), Brisbane Airport FBO, Perth, Adelaide, and Gold Coast.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_fbo.q2', 'Can you track private aircraft tail numbers?')}</h4>
              <p>{t('service_fbo.a2', 'Yes. Simply provide your tail registration or flight identifier in the booking form. We track movement via FlightAware and radar telemetry.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_fbo.q3', 'Can luggage support vans travel alongside passenger sedans?')}</h4>
              <p>{t('service_fbo.a3', 'Yes. For flights with extensive luggage, golf clubs, or equipment, we frequently pair an S-Class or Maybach with a dedicated Mercedes V-Class or Sprinter.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_fbo.q4', 'What billing options are available for charter brokers?')}</h4>
              <p>{t('service_fbo.a4', 'We provide instant corporate invoicing, wire transfers, and credit card processing with transparent, all-inclusive pricing.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>{t('service_fbo.cta_title', 'Arrange Private Jet Chauffeur Transfers')}</h2>
          <p>{t('service_fbo.cta_desc', 'Book with our private aviation dispatch team for guaranteed on-tarmac readiness.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_fbo.cta_btn', 'Book FBO Chauffeur')} <ArrowRight size={16} />
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_fbo.call_direct', 'Direct Dispatch: +61 430 729 993')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
