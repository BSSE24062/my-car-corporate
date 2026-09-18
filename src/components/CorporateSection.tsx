"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Headphones, UserCheck, Plane, Sparkles, Globe2, ArrowRight } from 'lucide-react';
import styles from './CorporateSection.module.css';

const CorporateSection = () => {
  const { t } = useTranslation();

  const handleOpenAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('set-service-type', { detail: 'corporate' }));
    window.dispatchEvent(new CustomEvent('set-booking-type', { detail: 'quote' }));
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      const yOffset = -20;
      const y = bookingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.href = '/#booking';
    }
  };

  const features = [
    {
      icon: <FileText size={26} />,
      titleKey: "corporate_section.feature1_title",
      defaultTitle: "Itemized Monthly Invoicing",
      descKey: "corporate_section.feature1_desc",
      defaultDesc: "Centralized corporate billing with flexible 30-day payment terms, clear receipting, and detailed monthly statement reports."
    },
    {
      icon: <Headphones size={26} />,
      titleKey: "corporate_section.feature2_title",
      defaultTitle: "Dedicated EA / PA Priority Support",
      descKey: "corporate_section.feature2_desc",
      defaultDesc: "Priority dispatch contact and rapid itinerary confirmations to handle last-minute schedule adjustments seamlessly."
    },
    {
      icon: <UserCheck size={26} />,
      titleKey: "corporate_section.feature3_title",
      defaultTitle: "Driver Details in Advance",
      descKey: "corporate_section.feature3_desc",
      defaultDesc: "Chauffeur name, contact number, vehicle model, and registration sent ahead of time for smooth coordination."
    },
    {
      icon: <Plane size={26} />,
      titleKey: "corporate_section.feature4_title",
      defaultTitle: "Real-Time Flight Monitoring",
      descKey: "corporate_section.feature4_desc",
      defaultDesc: "Commercial flights and private tail numbers are monitored live. We adjust pickup times for delays automatically."
    },
    {
      icon: <Sparkles size={26} />,
      titleKey: "corporate_section.feature5_title",
      defaultTitle: "Terminal & FBO Meet-and-Greet",
      descKey: "corporate_section.feature5_desc",
      defaultDesc: "Professional chauffeurs waiting inside arrivals with a digital name board, ready to assist with luggage."
    },
    {
      icon: <Globe2 size={26} />,
      titleKey: "corporate_section.feature6_title",
      defaultTitle: "Nationwide Multi-City Coordination",
      descKey: "corporate_section.feature6_desc",
      defaultDesc: "A single reliable partner for your executive transport across Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra."
    }
  ];

  return (
    <section id="corporate" className={styles.corporateSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('corporate_section.badge', 'Corporate & VIP Accounts')}</span>
          <h2>{t('corporate_section.title', 'Tailored for Executive Assistants & Corporate Leaders')}</h2>
          <p>{t('corporate_section.subtitle', 'Streamlined travel management designed to eliminate stress for travel coordinators, executive assistants, and business delegates.')}</p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconBox}>
                {feature.icon}
              </div>
              <h3>{t(feature.titleKey, feature.defaultTitle)}</h3>
              <p>{t(feature.descKey, feature.defaultDesc)}</p>
            </div>
          ))}
        </div>

        {/* Corporate CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h3>{t('corporate_section.banner_title', "Ready to streamline your company's executive travel?")}</h3>
            <p>{t('corporate_section.banner_desc', 'Set up an account today with priority dispatch, monthly invoicing, and dedicated EA assistance.')}</p>
          </div>
          <div className={styles.ctaActions}>
            <a
              href="#booking"
              onClick={handleOpenAccountClick}
              className={styles.openAccountBtn}
            >
              {t('corporate_section.cta_button', 'Enquire Corporate Rates')}
            </a>
            <a href="tel:+61430729993" className={styles.contactBtn}>
              {t('corporate_section.call_concierge', 'Call Direct Concierge')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;
