"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'th', name: 'ไทย' },
  { code: 'nl', name: 'Nederlands' }
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMenuOpen(false);
    if (targetId === '#') {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If we are not on the homepage, navigate to homepage anchor
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = `/${targetId}`;
      return;
    }

    const elem = document.querySelector(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavClick(e, '#booking');
  };

  return (
    <nav className={styles.navbar}>
      <a
        href="/"
        className={styles.logo}
        aria-label="Elite Cars Australia"
      >
        <img 
          src="/logo.png" 
          alt="Elite Cars Australia" 
          className={styles.logoImg}
        />
        <span className={styles.mobileBrandText}>Elite Cars Australia</span>
      </a>

      {/* Desktop & Mobile Menu */}
      <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <a href="/" onClick={(e) => handleNavClick(e, '#')}>{t('nav.home', 'Home')}</a>
        <a href="/services" onClick={(e) => { setMenuOpen(false); }}>{t('nav.services', 'Services')}</a>
        <a href="/#corporate" onClick={(e) => handleNavClick(e, '#corporate')}>{t('nav.corporate', 'Corporate')}</a>
        <a href="/#fleet" onClick={(e) => handleNavClick(e, '#fleet')}>{t('nav.fleet', 'Fleet')}</a>
        <a href="/#sydney" onClick={(e) => handleNavClick(e, '#sydney')}>{t('nav.sydney', 'Destinations')}</a>
        <a href="/#about" onClick={(e) => handleNavClick(e, '#about')}>{t('nav.about', 'Why Us')}</a>
        <a href="/#reviews" onClick={(e) => handleNavClick(e, '#reviews')}>{t('nav.testimonials', 'Reviews')}</a>
        <a href="/#booking" className={styles.bookBtn} onClick={handleBookClick}>{t('nav.quote', 'Quote / Book')}</a>
      </div>

      <div className={styles.actions}>
        <div className={styles.langSelector}>
          <button onClick={() => setLangOpen(!langOpen)} className={styles.langBtn} aria-label="Select Language">
            <Globe size={18} />
            <span className={styles.currentLang}>{i18n.language.toUpperCase()}</span>
          </button>
          
          {langOpen && (
            <div className={styles.langDropdown}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={i18n.language === lang.code ? styles.activeLang : ''}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className={styles.mobileMenuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Mobile Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
