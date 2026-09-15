"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Calendar, Calculator, CheckCircle, Clock, MapPin, Users, Briefcase, Car, Plane, ArrowRight } from 'lucide-react';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState<'booking' | 'quote'>('booking');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    serviceType: 'airport',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    pickupTime: '',
    flightNumber: '',
    passengerCount: '1',
    luggageCount: '1-2 Bags',
    vehiclePreference: 'Mercedes-Benz S-Class',
    details: ''
  });

  // Listen for custom dispatch events to pre-fill or switch modes from other sections
  useEffect(() => {
    const handleTypeChange = (e: CustomEvent) => {
      if (e.detail === 'quote' || e.detail === 'booking') {
        setRequestType(e.detail);
      }
    };

    const handleServiceChange = (e: CustomEvent) => {
      if (e.detail) {
        setFormData(prev => ({ ...prev, serviceType: e.detail }));
      }
    };

    const handleVehicleChange = (e: CustomEvent) => {
      if (e.detail) {
        setFormData(prev => ({ ...prev, vehiclePreference: e.detail }));
      }
    };

    window.addEventListener('set-booking-type', handleTypeChange as EventListener);
    window.addEventListener('set-service-type', handleServiceChange as EventListener);
    window.addEventListener('set-vehicle-pref', handleVehicleChange as EventListener);

    return () => {
      window.removeEventListener('set-booking-type', handleTypeChange as EventListener);
      window.removeEventListener('set-service-type', handleServiceChange as EventListener);
      window.removeEventListener('set-vehicle-pref', handleVehicleChange as EventListener);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitWithMode = async (type: 'booking' | 'quote') => {
    setIsLoading(true);
    setStatus("sending");

    const payload = {
      ...formData,
      requestType: type
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(type === 'booking' ? 'success_booking' : 'success_quote');
        setFormData({
          name: '',
          contactNumber: '',
          email: '',
          serviceType: 'airport',
          pickupLocation: '',
          dropoffLocation: '',
          date: '',
          pickupTime: '',
          flightNumber: '',
          passengerCount: '1',
          luggageCount: '1-2 Bags',
          vehiclePreference: 'Mercedes-Benz S-Class',
          details: ''
        });
      } else {
        setStatus(`error: ${data.error || 'Failed to submit request'}`);
      }
    } catch (err) {
      setStatus("error: Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitWithMode(requestType);
  };

  return (
    <section id="booking" className={styles.bookingSection}>
      <div className={styles.container}>
        <div className={styles.splitLayout}>

          {/* Left Column: Contact & Concierge Card */}
          <div className={styles.contactCard}>
            <div className={styles.contactCardHeader}>
              <span className={styles.badge}>{t('contact.badge', 'Direct Concierge')}</span>
              <h2>{t('contact.title', 'Contact Details')}</h2>
              <p>{t('contact.desc', 'For urgent transfers, corporate billing accounts, or direct dispatch support, contact our team via phone, email, or WhatsApp 24/7.')}</p>
            </div>

            <div className={styles.contactInfo}>
              <a href="tel:+61430729993" className={styles.infoRow}>
                <div className={styles.iconCircle}>
                  <Phone size={18} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>{t('contact.call_us', 'Call Us 24/7')}</span>
                  <span className={styles.infoValue}>+61 430 729 993</span>
                </div>
              </a>

              <a href="mailto:info@elitecarsaustralia.com.au" className={styles.infoRow}>
                <div className={styles.iconCircle}>
                  <Mail size={18} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>{t('contact.email_us', 'Email Us')}</span>
                  <span className={styles.infoValue}>info@elitecarsaustralia.com.au</span>
                </div>
              </a>

              <a
                href="https://wa.me/61430729993"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.infoRow} ${styles.whatsAppRow}`}
              >
                <div className={`${styles.iconCircle} ${styles.whatsAppCircle}`}>
                  <svg className={styles.whatsAppIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.385 5.39 0 12.007 0c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.617-5.39 12.003-12.007 12.003-2.001-.001-3.97-.502-5.716-1.464L0 24zm6.002-4.058c1.656.982 3.284 1.498 4.884 1.5l.583-.002c5.386 0 9.77-4.381 9.773-9.764.001-2.607-1.009-5.06-2.845-6.898C16.619 2.943 14.162 1.932 11.55 1.931c-5.385 0-9.768 4.382-9.772 9.765-.001 1.768.487 3.494 1.414 5.014l-.234-.528L1.933 21.07l5.055-1.32c-.31.18-.62.292-.929.192zm11.238-6.16c-.279-.14-1.647-.812-1.902-.903-.255-.094-.442-.14-.627.14-.185.281-.716.903-.878 1.09-.162.186-.324.21-.603.07-.279-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.653-1.553-1.933-.162-.28-.017-.431.122-.571.125-.125.279-.328.42-.492.14-.164.185-.28.278-.468.093-.188.046-.352-.023-.492-.069-.14-.627-1.511-.86-2.072-.227-.546-.456-.472-.627-.48l-.534-.01c-.185 0-.486.07-.74.352-.254.281-.971.95-1.001 2.327-.03 1.377.971 2.705 1.11 2.893.14.188 1.97 3.01 4.773 4.22.667.288 1.188.46 1.594.59.67.213 1.28.183 1.762.11.537-.08 1.647-.672 1.88-1.32.233-.648.233-1.203.162-1.32-.07-.118-.255-.188-.534-.328z" />
                  </svg>
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>{t('contact.whatsapp_us', 'WhatsApp Concierge')}</span>
                  <span className={styles.infoValue}>{t('contact.chat_now', 'Chat Instantly')}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Advanced Booking & Quote Form */}
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2>{requestType === 'quote' ? 'Request a Chauffeur Quote' : t('booking.title', 'Book Your Ride')}</h2>
              <p>{t('booking.subtitle', 'Reserve your chauffeur or receive a detailed quotation within minutes.')}</p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className={styles.modeTabs}>
              <button
                type="button"
                className={`${styles.tabBtn} ${requestType === 'booking' ? styles.activeTab : ''}`}
                onClick={() => setRequestType('booking')}
              >
                <Calendar size={16} />
                <span>{t('form.type_booking', 'Book Now (Reservation)')}</span>
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${requestType === 'quote' ? styles.activeTab : ''}`}
                onClick={() => setRequestType('quote')}
              >
                <Calculator size={16} />
                <span>{t('form.type_quote', 'Get a Quote (Estimate)')}</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>

              {/* Row 1: Full Name & Contact Number */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.name', 'Full Name')} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Zakkiullah Baig"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t('form.contact_label', 'Contact Number')} *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="+61 4xx xxx xxx"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email & Service Type */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.email_label', 'Email Address')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t('form.service_type', 'Service Type')} *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="airport">{t('form.airport', 'Airport Transfer')}</option>
                    <option value="corporate">{t('form.corporate', 'Corporate Account / Executive Travel')}</option>
                    <option value="hourly">{t('form.hourly', 'As-Directed Chauffeur Hire (Hourly)')}</option>
                    <option value="roadshow">{t('form.roadshow', 'Executive Roadshow')}</option>
                    <option value="events">{t('form.events', 'Conferences & Events')}</option>
                    <option value="wedding">{t('form.wedding', 'Wedding Transport')}</option>
                    <option value="private_aviation">{t('form.private_aviation', 'Private Aviation / FBO Transfer')}</option>
                    <option value="interstate">{t('form.interstate', 'Interstate / Regional Transfer')}</option>
                    <option value="one_day">{t('form.one_day', 'Custom Day Tour')}</option>
                    <option value="other">{t('form.other', 'Other Private Transfer')}</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pickup Location & Drop-off Location */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.pickup_location', 'Pickup Location')} *</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder={t('form.pickup_placeholder', 'Address, Airport Terminal, or Hotel')}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t('form.dropoff_location', 'Drop-off Location')} *</label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    placeholder={t('form.dropoff_placeholder', 'Destination Address or Region')}
                    required
                  />
                </div>
              </div>

              {/* Row 4: Date & Pickup Time */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.date', 'Date')} *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t('form.pickup_time', 'Pickup Time')} *</label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Row 5: Flight Number & Vehicle Preference */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.flight_number', 'Flight No. (Optional)')}</label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder={t('form.flight_placeholder', 'e.g. QF402 / VA834')}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t('form.vehicle_pref', 'Vehicle Preference')}</label>
                  <select
                    name="vehiclePreference"
                    value={formData.vehiclePreference}
                    onChange={handleChange}
                  >
                    <option value="Mercedes-Benz S-Class">Mercedes-Benz S-Class (3 Pax · 3 Bags)</option>
                    <option value="Mercedes Maybach">Mercedes Maybach (3 Pax · 2 Bags)</option>
                    <option value="BMW 7 Series">BMW 7 Series (3 Pax · 3 Bags)</option>
                    <option value="Mercedes-Benz GLS">Mercedes-Benz GLS (4–6 Pax · 4 Bags)</option>
                    <option value="BMW X7">BMW X7 (4–6 Pax · 4 Bags)</option>
                    <option value="Audi Q7">Audi Q7 (4 Pax · 4 Bags)</option>
                    <option value="Mercedes-Benz V-Class">Mercedes-Benz V-Class (Up to 7 Pax · 7 Bags)</option>
                    <option value="Mercedes Sprinter">Mercedes Sprinter (Up to 11–14 Pax · 12+ Bags)</option>
                    <option value="Best Available / No Preference">{t('form.vehicle_any', 'Best Available / No Preference')}</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Passenger Count & Luggage Count */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>{t('form.passenger_count', 'Passengers')}</label>
                  <select
                    name="passengerCount"
                    value={formData.passengerCount}
                    onChange={handleChange}
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5-7">5 to 7 Passengers (Van Required)</option>
                    <option value="8-14">8 to 14 Passengers (Minibus Required)</option>
                    <option value="15+">15+ Passengers (Multiple Vehicles)</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>{t('form.luggage_count', 'Luggage (Bags)')}</label>
                  <select
                    name="luggageCount"
                    value={formData.luggageCount}
                    onChange={handleChange}
                  >
                    <option value="Hand Luggage Only">Hand Luggage Only</option>
                    <option value="1-2 Bags">1–2 Large Bags</option>
                    <option value="3-4 Bags">3–4 Large Bags</option>
                    <option value="5-7 Bags">5–7 Large Bags</option>
                    <option value="8+ Bags">8+ Large Bags</option>
                  </select>
                </div>
              </div>

              {/* Row 7: Details / Itinerary Notes */}
              <div className={styles.inputGroup}>
                <label>{t('form.details_label', 'Additional Notes / Itinerary Details')}</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder={t('form.details', 'Special requests, child seats, multiple stops, or billing notes...')}
                  rows={3}
                />
              </div>

              {/* Action Buttons: Dual Book Now & Get a Quote buttons */}
              <div className={styles.actionsRow}>
                <button
                  type="button"
                  className={requestType === 'booking' ? styles.submitBtnPrimary : styles.submitBtnSecondary}
                  disabled={isLoading}
                  onClick={() => submitWithMode('booking')}
                >
                  <Calendar size={17} />
                  <span>{isLoading && requestType === 'booking' ? t('form.sending_status', 'Processing...') : t('form.submit', 'Book Now')}</span>
                </button>

                <button
                  type="button"
                  className={requestType === 'quote' ? styles.submitBtnPrimary : styles.submitBtnSecondary}
                  disabled={isLoading}
                  onClick={() => submitWithMode('quote')}
                >
                  <Calculator size={17} />
                  <span>{isLoading && requestType === 'quote' ? t('form.sending_status', 'Processing...') : t('form.submit_quote', 'Get a Quote')}</span>
                </button>
              </div>

              {status === 'success_booking' && (
                <p className={styles.statusMsg}>
                  ✓ {t('form.success_booking', 'Booking request submitted successfully! Our dispatch team will confirm your reservation shortly.')}
                </p>
              )}
              {status === 'success_quote' && (
                <p className={styles.statusMsg}>
                  ✓ {t('form.success_quote', 'Quote request submitted successfully! We will email you a tailored quote shortly.')}
                </p>
              )}
              {status === 'sending' && (
                <p className={styles.sendingMsg}>{t('form.sending_status', 'Processing...')}</p>
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
