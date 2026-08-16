"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone } from 'lucide-react';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("sending");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const payload = {
      name: formData.get('name'),
      contactNumber: formData.get('contactNumber'),
      email: formData.get('email'),
      serviceType: formData.get('serviceType'),
      date: formData.get('date'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus(`error: ${data.error || 'Failed to send booking request'}`);
      }
    } catch (err) {
      setStatus("error: Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className={styles.bookingSection}>
      <div className={styles.container}>
        <div className={styles.splitLayout}>
          {/* Left Column: Contact Card */}
          <div className={styles.contactCard}>
            <div className={styles.contactCardHeader}>
              <span className={styles.badge}>Get In Touch</span>
              <h2>Contact Details</h2>
              <p>For urgent transfer bookings, corporate accounts, or direct support, contact our dispatch team via phone, email, or WhatsApp.</p>
            </div>

            <div className={styles.contactInfo}>
              <a href="tel:+61451002525" className={styles.infoRow}>
                <div className={styles.iconCircle}>
                  <Phone size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Call Us</span>
                  <span className={styles.infoValue}>+61 451 002 525</span>
                </div>
              </a>

              <a href="mailto:zakki@zubs.dev" className={styles.infoRow}>
                <div className={styles.iconCircle}>
                  <Mail size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className={styles.infoLabel}>Email Us</span>
                  <span className={styles.infoValue}>zakki@zubs.dev</span>
                </div>
              </a>

              <a 
                href="https://wa.me/61451002525" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.infoRow} ${styles.whatsAppRow}`}
              >
                <div className={`${styles.iconCircle} ${styles.whatsAppCircle}`}>
                  <svg className={styles.whatsAppIcon} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.385 5.39 0 12.007 0c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.617-5.39 12.003-12.007 12.003-2.001-.001-3.97-.502-5.716-1.464L0 24zm6.002-4.058c1.656.982 3.284 1.498 4.884 1.5l.583-.002c5.386 0 9.77-4.381 9.773-9.764.001-2.607-1.009-5.06-2.845-6.898C16.619 2.943 14.162 1.932 11.55 1.931c-5.385 0-9.768 4.382-9.772 9.765-.001 1.768.487 3.494 1.414 5.014l-.234-.528L1.933 21.07l5.055-1.32c-.31.18-.62.292-.929.192zm11.238-6.16c-.279-.14-1.647-.812-1.902-.903-.255-.094-.442-.14-.627.14-.185.281-.716.903-.878 1.09-.162.186-.324.21-.603.07-.279-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.653-1.553-1.933-.162-.28-.017-.431.122-.571.125-.125.279-.328.42-.492.14-.164.185-.28.278-.468.093-.188.046-.352-.023-.492-.069-.14-.627-1.511-.86-2.072-.227-.546-.456-.472-.627-.48l-.534-.01c-.185 0-.486.07-.74.352-.254.281-.971.95-1.001 2.327-.03 1.377.971 2.705 1.11 2.893.14.188 1.97 3.01 4.773 4.22.667.288 1.188.46 1.594.59.67.213 1.28.183 1.762.11.537-.08 1.647-.672 1.88-1.32.233-.648.233-1.203.162-1.32-.07-.118-.255-.188-.534-.328z"/>
                  </svg>
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>WhatsApp Us</span>
                  <span className={styles.infoValue}>Chat Live</span>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <h2>Book Your Ride</h2>
            <p>Reserve your premium chauffeur experience today.</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>{t('form.name', 'Name')}</label>
                <input type="text" name="name" placeholder="Name" required />
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Contact Number</label>
                  <input type="tel" name="contactNumber" placeholder="+61 xxx xxx xxx" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input type="email" name="email" placeholder="email@example.com" required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.service_type', 'Service Type')}</label>
                  <select name="serviceType" required defaultValue="">
                    <option value="" disabled>Select Service</option>
                    <option value="airport">Airport</option>
                    <option value="one_day">One Day Trip</option>
                    <option value="wedding">Wedding Transport</option>
                    <option value="hourly">Hourly Bookings</option>
                    <option value="tour">Personal Tour</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>{t('form.date', 'Date')}</label>
                  <input type="date" name="date" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Further Details</label>
                <textarea 
                  name="details"
                  placeholder="Further details e.g Travell, Time, Location etc..." 
                  rows={4}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? 'Sending...' : t('form.submit', 'Book Now')}
              </button>
              
              {status === 'success' && (
                <p className={styles.statusMsg}>Booking request sent successfully! We will contact you shortly.</p>
              )}
              {status === 'sending' && (
                <p className={styles.sendingMsg}>Sending booking request...</p>
              )}
              {status && status.startsWith('error:') && (
                <p className={styles.errorMsg}>{status.replace('error: ', '')}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
