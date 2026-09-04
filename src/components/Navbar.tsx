import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Sun, Moon } from 'lucide-react';
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

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLight]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMenuOpen(false);
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.querySelector(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.logo}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        suppressHydrationWarning
      >
        <h1>Elite Cars Australia</h1>
      </button>

      {/* Desktop Menu */}
      <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <a href="#" onClick={(e) => handleNavClick(e, '#')}>{t('nav.home', 'Home')}</a>
        <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>{t('nav.services', 'Services')}</a>
        <a href="#fleet" onClick={(e) => handleNavClick(e, '#fleet')}>{t('nav.fleet', 'Our Fleet')}</a>
        <a href="#sydney" onClick={(e) => handleNavClick(e, '#sydney')}>{t('nav.sydney', 'Australia In Style')}</a>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>{t('nav.about', 'Why Choose Us')}</a>
        <a href="#booking" className={styles.bookBtn} onClick={(e) => handleNavClick(e, '#booking')}>{t('form.submit', 'Book Now')}</a>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={() => setIsLight(!isLight)} 
          className={styles.langBtn} 
          title="Toggle Theme"
        >
          {isLight ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className={styles.langSelector}>
          <button onClick={() => setLangOpen(!langOpen)} className={styles.langBtn}>
            <Globe size={20} />
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

        <button className={styles.mobileMenuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
