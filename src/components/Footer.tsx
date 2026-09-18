"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation();

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
            <button onClick={scrollToTop} className={styles.brandLogo} aria-label="Elite Cars Australia - Back to top">
              <img 
                src="/logo.png" 
                alt="Elite Cars Australia" 
                className={styles.footerLogoImg}
              />
            </button>
            
            <span className={styles.brandTagline}>{t('footer.tagline', 'Executive Chauffeur & Airport Transfers')}</span>
            
            <p className={styles.brandDesc}>
              {t('footer.brand_desc', 'Executive chauffeur transportation across Australia — defined by discretion, flight monitoring, punctual drivers, and pristine fleet presentation.')}
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
            <h4 className={styles.colTitle}>{t('footer.services_title', 'Our Services')}</h4>
            <ul className={styles.linksList}>
              <li><a href="/services/airport-transfers"><ChevronRight size={14} /> {t('services.airport_title', 'Airport Transfers')}</a></li>
              <li><a href="/services/corporate-accounts"><ChevronRight size={14} /> {t('services.corporate_title', 'Corporate Accounts')}</a></li>
              <li><a href="/services/as-directed-chauffeur-hire"><ChevronRight size={14} /> {t('services.hourly_title', 'As-Directed Hire')}</a></li>
              <li><a href="/services/roadshows"><ChevronRight size={14} /> {t('services.roadshows_title', 'Executive Roadshows')}</a></li>
              <li><a href="/services/events"><ChevronRight size={14} /> {t('services.events_title', 'Conferences & Events')}</a></li>
              <li><a href="/services/weddings"><ChevronRight size={14} /> {t('services.wedding_title', 'Wedding Transport')}</a></li>
              <li><a href="/services/private-aviation-fbo"><ChevronRight size={14} /> {t('services.private_aviation_title', 'Private Aviation / FBO')}</a></li>
              <li><a href="/services/interstate-transfers"><ChevronRight size={14} /> {t('services.interstate_title', 'Interstate Transfers')}</a></li>
            </ul>
          </div>

          {/* Column 3: Fleet & Capacities */}
          <div>
            <h4 className={styles.colTitle}>{t('footer.fleet_title', 'Fleet & Capacities')}</h4>
            <ul className={styles.linksList}>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes-Benz S-Class (3 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes Maybach (3 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> BMW 7 Series (3 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes-Benz GLS (4–6 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> BMW X7 (4–6 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Audi Q7 (4 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes-Benz V-Class (7 Pax)</a></li>
              <li><a href="/#fleet"><ChevronRight size={14} /> Mercedes Sprinter (14 Pax)</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Concierge */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>{t('footer.concierge_title', 'Direct Concierge')}</h4>
            
            <a href="tel:+61430729993" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Phone size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>{t('footer.reserve_label', 'Reserve a Ride / Quotes')}</span>
                <span className={styles.contactValue}>+61 430 729 993</span>
              </div>
            </a>

            <a href="mailto:info@elitecarsaustralia.com.au" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Mail size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>{t('footer.corporate_label', 'Corporate Accounts')}</span>
                <span className={styles.contactValue}>info@elitecarsaustralia.com.au</span>
              </div>
            </a>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <MapPin size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>{t('footer.service_territory_label', 'Service Territory')}</span>
                <span className={styles.contactValue}>{t('footer.service_territory_val', 'Nationwide — Sydney, Melbourne, Brisbane, Perth, Adelaide, & Canberra')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            &copy; {new Date().getFullYear()} Elite Cars Australia. {t('footer.rights_reserved', 'All rights reserved.')}
          </div>
          <div className={styles.bottomRight}>
            <span>{t('footer.tag_corporate', 'Corporate Travel')}</span>
            <span className={styles.dot}>·</span>
            <span>{t('footer.tag_airport', 'Airport Transfers')}</span>
            <span className={styles.dot}>·</span>
            <span>{t('footer.tag_fbo', 'Private Aviation FBO')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
