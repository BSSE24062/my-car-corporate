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
              <h2>My Corporate Cars</h2>
              <span className={styles.brandTagline}>Sydney's Premier Chauffeurs</span>
            </button>
            
            <p className={styles.brandDesc}>
              Bespoke executive transportation across Sydney and New South Wales — defined by discretion, precision, and an unwavering commitment to the extraordinary.
            </p>

            <div className={styles.socialRow}>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                {/* Instagram SVG */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                {/* Facebook SVG */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#services"><ChevronRight size={14} /> Our Services</a>
              </li>
              <li>
                <a href="#fleet"><ChevronRight size={14} /> Luxury Fleet</a>
              </li>
              <li>
                <a href="#sydney"><ChevronRight size={14} /> Sydney In Style</a>
              </li>
              <li>
                <a href="#about"><ChevronRight size={14} /> Why Choose Us</a>
              </li>
              <li>
                <a href="#booking"><ChevronRight size={14} /> Reserve Now</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Fleet */}
          <div>
            <h4 className={styles.colTitle}>Our Fleet</h4>
            <ul className={styles.linksList}>
              <li><a href="#fleet"><ChevronRight size={14} /> Mercedes-Benz S-Class</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> Mercedes Maybach</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> BMW 7 Series</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> Mercedes-Benz GLS</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> BMW X7</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> Audi Q7</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> Mercedes V-Class</a></li>
              <li><a href="#fleet"><ChevronRight size={14} /> Mercedes Sprinter</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Direct Concierge</h4>
            
            <a href="tel:+61451002525" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Phone size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>Reserve a Ride</span>
                <span className={styles.contactValue}>+61 451 002 525</span>
              </div>
            </a>

            <a href="mailto:zakki@zubs.dev" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Mail size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>Executive Enquiries</span>
                <span className={styles.contactValue}>zakki@zubs.dev</span>
              </div>
            </a>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <MapPin size={18} />
              </div>
              <div>
                <span className={styles.contactLabel}>Service Territory</span>
                <span className={styles.contactValue}>Sydney CBD & NSW, Australia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            &copy; {new Date().getFullYear()} My Corporate Cars. All rights reserved.
          </div>
          <div className={styles.bottomRight}>
            <span>Private Transport</span>
            <span className={styles.dot}>·</span>
            <span>Corporate Transfers</span>
            <span className={styles.dot}>·</span>
            <span>Airport VIP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
