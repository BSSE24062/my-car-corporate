"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Map, Clock, ShieldCheck, CheckCircle, ArrowRight, FileSpreadsheet, Users, Mail } from 'lucide-react';
import styles from '../services.module.css';

export default function RoadshowsClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'roadshow' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/executive-road-shows.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/executive-road-shows.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_roadshows.badge', 'Executive Delegation Logistics')}</span>
          <h1>{t('service_roadshows.title', 'Corporate Roadshows & Investor Itineraries')}</h1>
          <p>
            {t('service_roadshows.hero_desc', 'Precision transport logistics for high-stakes investor roadshows, capital raisings, board meetings, and multi-city executive presentations across Australia.')}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_roadshows.book_btn', 'Submit Roadshow Itinerary')}
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_roadshows.quote_btn', 'Discuss with Dispatch Manager')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FileSpreadsheet size={24} />
            </div>
            <h3>{t('service_roadshows.f1_title', 'Itinerary Planning & Route Timing')}</h3>
            <p>{t('service_roadshows.f1_desc', 'Our dispatch managers review your meeting timetable and model Sydney, Melbourne, and Brisbane peak-hour traffic buffers to ensure zero delays.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={24} />
            </div>
            <h3>{t('service_roadshows.f2_title', 'Multi-Vehicle Fleet Coordination')}</h3>
            <p>{t('service_roadshows.f2_desc', 'Deploy matching Mercedes-Benz S-Class sedans and V-Class executive vans for travelling deal teams, legal counsel, and banking executives.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Clock size={24} />
            </div>
            <h3>{t('service_roadshows.f3_title', 'Centralized Single Point of Contact')}</h3>
            <p>{t('service_roadshows.f3_desc', 'Your EA or roadshow coordinator gets a dedicated dispatch manager overseeing the live progress of all vehicles simultaneously.')}</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Services/executive-road-shows.jpg" alt="Executive Roadshow Chauffeur Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_roadshows.detail_title', 'Flawless Execution for High-Stakes Days')}</h2>
            <p>
              {t('service_roadshows.detail_desc', 'When presenting to investors or closing acquisitions, every minute counts. Our senior roadshow chauffeurs know private building loading docks, secure basement drop-offs, and swift alternative routes.')}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_roadshows.check1', 'Chauffeurs positioned 15 minutes ahead of scheduled depart time')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_roadshows.check2', 'Seamless coordination between commercial terminals and private FBOs')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_roadshows.check3', 'Mobile device chargers, onboard Wi-Fi, and bottled refreshments')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_roadshows.check4', 'Itemized invoicing broken down by deal code or company project')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_roadshows.faq_title', 'Roadshow FAQs')}</h2>
            <p>{t('service_roadshows.faq_subtitle', 'How we manage multi-stop executive travel itineraries.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_roadshows.q1', 'Can we provide a detailed spreadsheet itinerary?')}</h4>
              <p>{t('service_roadshows.a1', 'Yes. You can email your itinerary directly to info@elitecarsaustralia.com.au. We will verify timings, routes, and confirm assigned vehicles.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_roadshows.q2', 'Can roadshows span multiple Australian cities?')}</h4>
              <p>{t('service_roadshows.a2', 'Yes. We frequently manage multi-day roadshows starting in Sydney, flying to Melbourne, and concluding in Brisbane or Perth with synchronized local chauffeurs.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_roadshows.q3', 'What happens if a meeting runs over time?')}</h4>
              <p>{t('service_roadshows.a3', 'Your chauffeur remains on standby outside the venue and will adapt the remaining route dynamically without causing panic.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_roadshows.q4', 'Do drivers maintain non-disclosure confidentiality?')}</h4>
              <p>{t('service_roadshows.a4', 'All chauffeurs sign strict non-disclosure agreements and uphold complete discretion regarding conversations and deal materials inside the vehicle.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>{t('service_roadshows.cta_title', 'Plan Your Executive Roadshow')}</h2>
          <p>{t('service_roadshows.cta_desc', 'Send us your itinerary for a detailed route timing review and tailored quotation.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_roadshows.cta_btn', 'Submit Roadshow Details')} <ArrowRight size={16} />
            </a>
            <a href="mailto:info@elitecarsaustralia.com.au" className={styles.secondaryBtn}>
              <Mail size={16} /> {t('service_roadshows.email_btn', 'Email Roadshow Team')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
