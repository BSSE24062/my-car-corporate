"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Building2, FileText, Headphones, Globe, CheckCircle, ArrowRight, UserCheck, ShieldCheck, Mail } from 'lucide-react';
import styles from '../services.module.css';

export default function CorporateAccountsClient() {
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
          <span className={styles.badge}>B2B Corporate Travel</span>
          <h1>Corporate Accounts & EA Booking Support</h1>
          <p>
            Designed specifically for Executive Assistants, travel procurement managers, and corporate leadership. Centralized monthly invoicing, priority dispatch, and nationwide multi-city management across Australia.
          </p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              Open Corporate Account
            </a>
            <a href="tel:+61430729993" className={styles.secondaryBtn}>
              Speak with Corporate Dispatch
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
            <h3>Itemized Monthly Invoicing</h3>
            <p>Consolidated 30-day corporate billing statements with cost-centre coding, passenger breakdown, and GST-compliant tax invoicing.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Headphones size={24} />
            </div>
            <h3>Dedicated EA / PA Support</h3>
            <p>Direct priority contact via WhatsApp, phone, or email with immediate booking confirmations and rapid response times for last-minute changes.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Globe size={24} />
            </div>
            <h3>Nationwide Multi-City Fleet</h3>
            <p>One reliable provider handling boardroom and airport transit across Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra.</p>
          </div>
        </div>

        <div className={styles.detailSplit}>
          <div className={styles.detailImage}>
            <img src="/Fleet/benz s class.jpg" alt="Corporate Executive Chauffeur Australia" />
          </div>
          <div className={styles.detailText}>
            <h2>Why Executive Assistants Choose Elite Cars</h2>
            <p>
              Managing executive travel demands flawless punctuality and complete confidentiality. We provide full visibility to EAs before every pickup, eliminating guesswork.
            </p>
            <ul className={styles.checklist}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Chauffeur name, mobile, & rego sent ahead to booker and passenger</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Tailored account terms with zero hidden booking surcharges</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Strict confidentiality and non-disclosure agreements for all drivers</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> Premium sedans (Mercedes S-Class) and people movers (V-Class, Sprinter)</li>
            </ul>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>Corporate Account FAQs</h2>
            <p>Answers to common questions about setting up a business account.</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>How do I set up a corporate invoicing account?</h4>
              <p>Simply fill out our enquiry form or call our team. We can activate corporate account billing and credit terms within 24 hours.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can multiple assistants or bookers charge to one account?</h4>
              <p>Yes. We can configure authorized bookers with PO numbers or project codes to simplify reconciliation.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What notice is required for bookings?</h4>
              <p>While advance notice is recommended, corporate account clients receive priority dispatch for short-notice transfers.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Are rates fixed across different Australian cities?</h4>
              <p>Yes, corporate accounts benefit from standardized, transparent route pricing across all supported Australian metropolitan areas.</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>Enquire About Corporate Account Rates</h2>
          <p>Get in touch with our executive accounts coordinator today to establish your company account.</p>
          <div className={styles.heroActions}>
            <a href="/#booking" onClick={handleBookService} className={styles.primaryBtn}>
              Enquire Corporate Account <ArrowRight size={16} />
            </a>
            <a href="mailto:info@elitecarsaustralia.com.au" className={styles.secondaryBtn}>
              <Mail size={16} /> Email Corporate Team
            </a>
          </div>
        </div>

      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
