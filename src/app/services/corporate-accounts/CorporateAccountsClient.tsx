"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Building2, FileText, Headphones, Globe, CheckCircle, ArrowRight, UserCheck, ShieldCheck, Mail } from 'lucide-react';
import styles from '../services.module.css';

export default function CorporateAccountsClient() {
  const { t } = useTranslation();

  const handleBookService = () => {
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'corporate' }));
    window.dispatchEvent(new CustomEvent('set-booking-type', { detail: 'quote' }));
  };

  return (
    <main className={styles.servicePage}>
      <Navbar />

      <section 
        className={styles.hero} 
        style={{ 
          '--bg-desktop': "url('/Services/professional.jpg')",
          '--bg-mobile': "url('/Services/mobile_services/professional.jpg')"
        } as React.CSSProperties}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('service_corporate.badge', 'B2B Corporate Travel')}</span>
          <h1>{t('service_corporate.title', 'Corporate Accounts & EA Booking Support')}</h1>
          <p>
            {t('service_corporate.hero_desc', 'Designed specifically for Executive Assistants, travel procurement managers, and corporate leadership. Centralized monthly invoicing, priority dispatch, and nationwide multi-city management across Australia.')}
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_corporate.book_btn', 'Open Corporate Account')}
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              {t('service_corporate.quote_btn', 'Speak with Corporate Dispatch')}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FileText size={24} />
            </div>
            <h3>{t('service_corporate.f1_title', 'Itemized Monthly Invoicing')}</h3>
            <p>{t('service_corporate.f1_desc', 'Consolidated 30-day corporate billing statements with cost-centre coding, passenger breakdown, and GST-compliant tax invoicing.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Headphones size={24} />
            </div>
            <h3>{t('service_corporate.f2_title', 'Dedicated EA / PA Support')}</h3>
            <p>{t('service_corporate.f2_desc', 'Direct priority contact via WhatsApp, phone, or email with immediate booking confirmations and rapid response times for last-minute changes.')}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Globe size={24} />
            </div>
            <h3>{t('service_corporate.f3_title', 'Nationwide Multi-City Fleet')}</h3>
            <p>{t('service_corporate.f3_desc', 'One reliable provider handling boardroom and airport transit across Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra.')}</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Fleet/benz s class.jpg" alt="Corporate Executive Chauffeur Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>{t('service_corporate.detail_title', 'Why Executive Assistants Choose Elite Cars')}</h2>
            <p>
              {t('service_corporate.detail_desc', 'Managing executive travel demands flawless punctuality and complete confidentiality. We provide full visibility to EAs before every pickup, eliminating guesswork.')}
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_corporate.check1', 'Chauffeur name, mobile, & rego sent ahead to booker and passenger')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_corporate.check2', 'Tailored account terms with zero hidden booking surcharges')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_corporate.check3', 'Strict confidentiality and non-disclosure agreements for all drivers')}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {t('service_corporate.check4', 'Premium sedans (Mercedes S-Class) and people movers (V-Class, Sprinter)')}</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('service_corporate.faq_title', 'Corporate Account FAQs')}</h2>
            <p>{t('service_corporate.faq_subtitle', 'Answers to common questions about setting up a business account.')}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>{t('service_corporate.q1', 'How do I set up a corporate invoicing account?')}</h4>
              <p>{t('service_corporate.a1', 'Simply fill out our enquiry form or call our team. We can activate corporate account billing and credit terms within 24 hours.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_corporate.q2', 'Can multiple assistants or bookers charge to one account?')}</h4>
              <p>{t('service_corporate.a2', 'Yes. We can configure authorized bookers with PO numbers or project codes to simplify reconciliation.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_corporate.q3', 'What notice is required for bookings?')}</h4>
              <p>{t('service_corporate.a3', 'While advance notice is recommended, corporate account clients receive priority dispatch for short-notice transfers.')}</p>
            </div>
            <div className={styles.faqItem}>
              <h4>{t('service_corporate.q4', 'Are rates fixed across different Australian cities?')}</h4>
              <p>{t('service_corporate.a4', 'Yes, corporate accounts benefit from standardized, transparent route pricing across all supported Australian metropolitan areas.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>{t('service_corporate.cta_title', 'Enquire About Corporate Account Rates')}</h2>
          <p>{t('service_corporate.cta_desc', 'Get in touch with our executive accounts coordinator today to establish your company account.')}</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              {t('service_corporate.cta_btn', 'Enquire Corporate Account')} <ArrowRight size={16} />
            </a>
            <a href="mailto:info@elitecarsaustralia.com.au" className={styles.secondaryBtn}>
              <Mail size={16} /> {t('service_corporate.email_btn', 'Email Corporate Team')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
