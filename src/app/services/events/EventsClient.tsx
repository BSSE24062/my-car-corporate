"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Users, Calendar, Award, CheckCircle, ArrowRight, Bus, ShieldCheck } from 'lucide-react';
import styles from '../services.module.css';

export default function EventsClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'events' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/conferences-and-events.jpg')",
          '--bg-mobile': "url('/Services/conferences-and-events.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_events.badge', 'Conferences & VIP Logistics')}</span>
          <h1>{t('service_events.title', 'Conferences & Event Transport')}</h1>
          <p>
            {t('service_events.hero_desc', 'Comprehensive transport coordination for industry summits, VIP keynote speakers, boardroom retreats, and gala delegate movements across major Australian convention centres and venues.')}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_events.book_btn', 'Request Event Quote')}
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_events.quote_btn', 'Call Chauffeur Dispatch')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={24} />
            </div>
            <h3>{t('service_events.f1_title', 'Scalable Group Capacity')}</h3>
            <p>{t('service_events.f1_desc', 'From individual VIP keynote transfers in Mercedes-Benz S-Class to multi-passenger group shuttles in luxury V-Class vans and executive Sprinter minibuses.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Calendar size={24} />
            </div>
            <h3>{t('service_events.f2_title', 'Onsite Event Coordination')}</h3>
            <p>{t('service_events.f2_desc', 'Dedicated marshals and dispatch coordinators available for major conventions (ICC Sydney, MCEC Melbourne, BCEC Brisbane) to oversee arrivals and departures.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Award size={24} />
            </div>
            <h3>{t('service_events.f3_title', 'VIP Hospitality Standards')}</h3>
            <p>{t('service_events.f3_desc', 'Polite, impeccably dressed chauffeurs providing a first-class welcoming experience reflecting positively on your brand and event sponsors.')}</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Services/conferences-and-events.jpg" alt="Conferences and VIP Event Chauffeurs Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_events.detail_title', 'Streamlined Delegate Logistics')}</h2>
            <p>
              {t('service_events.detail_desc', 'Managing attendee transport across multiple hotels, airport terminals, and evening gala venues requires meticulous coordination. We handle flight manifests, manifest updates, and group staging seamlessly.')}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_events.check1', 'Coordinated airport transfers synchronized with incoming flights')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_events.check2', 'Shuttles between corporate hotels and conference venues')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_events.check3', 'Direct liaison with event planners and conference production staff')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_events.check4', 'Comprehensive passenger manifest reconciliation reporting')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_events.faq_title', 'Event Transport FAQs')}</h2>
            <p>{t('service_events.faq_subtitle', 'Key information for conference coordinators and event producers.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_events.q1', 'How many delegates can your fleet accommodate?')}</h4>
              <p>{t('service_events.a1', 'We manage transport for intimate VIP groups up to conferences requiring 100+ passenger movements across our sedans, luxury vans, and executive minibuses.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_events.q2', 'Can we provide our speaker flight schedule directly?')}</h4>
              <p>{t('service_events.a2', 'Yes. Simply share your speaker manifest. We will assign individual drivers, track flights, and provide live updates as speakers land.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_events.q3', 'Do you service major convention centres?')}</h4>
              <p>{t('service_events.a3', 'Yes, we operate daily at ICC Sydney, Melbourne Convention and Exhibition Centre (MCEC), Brisbane Convention Centre, and major luxury hotels nationwide.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_events.q4', 'Can vehicles display company branding?')}</h4>
              <p>{t('service_events.a4', 'Custom passenger signage, name boards, and subtle event branding can be arranged for major corporate summits.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>{t('service_events.cta_title', 'Planning an Upcoming Conference or Gala?')}</h2>
          <p>{t('service_events.cta_desc', 'Contact our dedicated chauffeur transport coordinators for a comprehensive vehicle allocation plan and transparent quote.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_events.cta_btn', 'Submit Event Requirements')} <ArrowRight size={16} />
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_events.call_direct', 'Call Direct: +61 430 729 993')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
