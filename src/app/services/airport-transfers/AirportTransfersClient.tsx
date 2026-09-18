"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Plane, Clock, ShieldCheck, CheckCircle, ArrowRight, UserCheck, Luggage, BellRing } from 'lucide-react';
import styles from '../services.module.css';

export default function AirportTransfersClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'airport' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      {/* Hero */}
      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/AirportPickups.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/AirportPickups.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_airport.badge', 'Airport Concierge')}</span>
          <h1>{t('service_airport.title', 'Airport Transfers Nationwide')}</h1>
          <p>
            {t('service_airport.hero_desc', 'Punctual, stress-free luxury airport chauffeur transfers across Sydney (SYD), Melbourne (MEL), Brisbane (BNE), Perth (PER), and Adelaide (ADL). Real-time commercial flight monitoring and inside-terminal meet-and-greet included.')}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_airport.book_btn', 'Book Airport Transfer')}
            </a>
            <a href="/#booking" onClick={handleBookService} className={styles.secondaryBtn}>
              {t('service_airport.quote_btn', 'Get a Fast Quote')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        {/* Core Value Props */}
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Clock size={24} />
            </div>
            <h3>{t('service_airport.f1_title', 'Real-Time Flight Tracking')}</h3>
            <p>{t('service_airport.f1_desc', 'We monitor your flight status automatically. Early arrivals or flight delays are accounted for with adjusted chauffeur arrival times at zero extra hassle.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <UserCheck size={24} />
            </div>
            <h3>{t('service_airport.f2_title', 'Inside-Terminal Meet & Greet')}</h3>
            <p>{t('service_airport.f2_desc', 'Your chauffeur greets you inside the arrivals hall holding a personalized digital name board, ready to escort you and manage your luggage.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <BellRing size={24} />
            </div>
            <h3>{t('service_airport.f3_title', 'Driver Details in Advance')}</h3>
            <p>{t('service_airport.f3_desc', "Receive your chauffeur's name, direct phone number, and vehicle registration well prior to touchdown for total peace of mind.")}</p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Sydney/airport.jpg" alt="Airport Terminal Chauffeur Pickups Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_airport.detail_title', 'Stress-Free Airport Transit')}</h2>
            <p>
              {t('service_airport.detail_desc', "Navigating busy Australian airport terminals after a long flight shouldn't involve rideshare delays or queuing in the taxi rank. Our executive airport transfers provide door-to-door comfort, luggage assistance, and climate-controlled travel.")}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_airport.check1', 'Complimentary bottled spring water & onboard Wi-Fi')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_airport.check2', '60 minutes complimentary waiting time on international arrivals')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_airport.check3', '30 minutes complimentary waiting time on domestic arrivals')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_airport.check4', 'Executive sedans (S-Class, BMW 7) and 7-passenger vans (V-Class)')}</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_airport.faq_title', 'Airport Transfer FAQs')}</h2>
            <p>{t('service_airport.faq_subtitle', 'Common questions regarding our airport pickup and drop-off protocols.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_airport.q1', 'What happens if my flight is delayed?')}</h4>
              <p>{t('service_airport.a1', 'Our dispatch team monitors live airline telemetry. Your pickup time adjusts dynamically with your revised landing time, ensuring your driver is there when you land.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_airport.q2', 'Where will my chauffeur meet me?')}</h4>
              <p>{t('service_airport.a2', 'Your chauffeur will wait inside the terminal near the luggage carousel exit holding an executive digital name sign.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_airport.q3', 'Can you provide child or booster seats?')}</h4>
              <p>{t('service_airport.a3', 'Yes. Certified forward-facing, rear-facing, and booster child seats can be pre-installed upon request in your booking notes.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_airport.q4', 'Do you service regional and international airports?')}</h4>
              <p>{t('service_airport.a4', 'We provide full transfer coverage across all major Australian international and domestic terminals, as well as private jet FBO hangars.')}</p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className={styles.ctaBox}>
          <h2>{t('service_airport.cta_title', 'Ready to Book Your Airport Transfer?')}</h2>
          <p>{t('service_airport.cta_desc', 'Reserve in under 2 minutes or request a transparent corporate quote.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_airport.cta_btn', 'Reserve Airport Chauffeur')} <ArrowRight size={16} />
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_airport.call_direct', 'Call Direct: +61 430 729 993')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
