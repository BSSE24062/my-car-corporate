"use client";

import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.glowBackground} />
      
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          
          {/* Column 1: Brand Info */}
          <div className={styles.brandCol}>
            <button onClick={scrollToTop} className={styles.brandLogo} aria-label="Back to top">
              <h2>Elite Cars Australia</h2>
              <span className={styles.brandTagline}>Executive Chauffeur & Airport Transfers</span>
            </button>
            
            <p className={styles.brandDesc}>
              Executive chauffeur transportation across Australia — defined by discretion, flight monitoring, punctual drivers, and pristine fleet presentation.
            </p>

            <div className={styles.socialRow}>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Dedicated Services */}
          <div>
            <h4 className={styles.colTitle}>Our Services</h4>
            <ul className={styles.linksList}>
              <li><a href="/services/airport-transfers"><ChevronRight size={14} /> Airport Transfers</a></li>
              <li><a href="/services/corporate-accounts"><ChevronRight size={14} /> Corporate Accounts</a></li>
              <li><a href="/services/as-directed-chauffeur-hire"><ChevronRight size={14} /> As-Directed Hire</a></li>
              <li><a href="/services/roadshows"><ChevronRight size={14} /> Executive Roadshows</a></li>
              <li><a href="/services/events"><ChevronRight size={14} /> Conferences & Events</a></li>
              <li><a href="/services/weddings"><ChevronRight size={14} /> Wedding Transport</a></li>
              <li><a href="/services/private-aviation-fbo"><ChevronRight size={14} /> Private Aviation / FBO</a></li>
              <li><a href="/services/interstate-transfers"><ChevronRight size={14} /> Interstate Transfers</a></li>
            </ul>
          </div>

          {/* Column 3: Fleet & Capacities */}
          <div>
            <h4 className={styles.colTitle}>Fleet & Capacities</h4>
            <ul className={styles.linksList}>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes S-Class (3 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes Maybach (3 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> BMW 7 Series (3 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes GLS (4–6 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> BMW X7 (4–6 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Audi Q7 (4 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes V-Class (7 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes Sprinter (14 Pax)</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Concierge */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Direct Concierge</h4>
            
            <a href="tel:+61430729993" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Phone size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>Reserve a Ride / Quotes</span>
                <span className={styles.contactValue}>+61 430 729 993</span>
              </div>
            </a>

            <a href="mailto:info@elitecarsaustralia.com.au" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Mail size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>Corporate Accounts</span>
                <span className={styles.contactValue}>info@elitecarsaustralia.com.au</span>
              </div>
            </a>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <MapPin size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>Service Territory</span>
                <span className={styles.contactValue}>Nationwide — Sydney, Melbourne, Brisbane, Perth, Adelaide, & Canberra</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            &copy; {new Date().getFullYear()} Elite Cars Australia. All rights reserved.
          </div>
          <div className={styles.bottomRight}>
            <span>Corporate Travel</span>
            <span className={styles.dot}>·</span>
            <span>Airport Transfers</span>
            <span className={styles.dot}>·</span>
            <span>Private Aviation FBO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
