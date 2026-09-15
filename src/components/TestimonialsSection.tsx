"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight, PlusCircle, X, CheckCircle2 } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

interface ReviewItem {
  id: string | number;
  author: string;
  role: string;
  quote: string;
  rating: number;
  isUserAdded?: boolean;
}

const initialTestimonials: ReviewItem[] = [
  {
    id: 1,
    author: "Sarah Jenkins",
    role: "Executive Assistant, ASX Financial Services (Sydney)",
    quote: "Elite Cars Australia manages our executive airport transfers and board meeting itineraries in Sydney and Melbourne. Drivers are consistently punctual, courteous, and communicate in advance. An indispensable partner for our corporate travel.",
    rating: 5
  },
  {
    id: 2,
    author: "David O'Connor",
    role: "Managing Partner, Commercial Law Group (Melbourne)",
    quote: "Excellent airport transfer service. The chauffeur monitored our delayed flight from Singapore and was waiting inside arrivals with a name board. Clean Mercedes S-Class, smooth drive, and effortless monthly invoicing.",
    rating: 5
  },
  {
    id: 3,
    author: "Michelle Thornton",
    role: "Event Director, National Tech Summit (Brisbane)",
    quote: "We reserved multiple Mercedes V-Class vehicles for keynote speakers across a 3-day conference. Flawless dispatch coordination, polite drivers, and great feedback from all our international delegates.",
    rating: 5
  },
  {
    id: 4,
    author: "Julian Sterling",
    role: "Aviation Charter Coordinator (Sydney & Gold Coast)",
    quote: "Reliable tarmac and FBO transfers for our private charter guests in Sydney and the Gold Coast. Discretion, vehicle condition, and driver professionalism are always top-tier.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    service: 'Airport Transfer',
    rating: 5,
    feedback: ''
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('elite_cars_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...initialTestimonials]);
        }
      }
    } catch (e) {
      console.warn("Could not load local reviews", e);
    }
  }, []);

  useEffect(() => {
    if (isHovered || modalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // 6 seconds auto-scroll

    return () => clearInterval(interval);
  }, [isHovered, modalOpen, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.feedback.trim()) return;

    const newReview: ReviewItem = {
      id: `user-${Date.now()}`,
      author: formData.name.trim(),
      role: formData.role.trim() || `${formData.service} Client`,
      quote: formData.feedback.trim(),
      rating: formData.rating,
      isUserAdded: true
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Save user review to localStorage
    try {
      const userReviews = updatedReviews.filter(r => r.isUserAdded);
      localStorage.setItem('elite_cars_user_reviews', JSON.stringify(userReviews));
    } catch (err) {
      console.warn("Could not persist review to storage", err);
    }

    setFormData({
      name: '',
      role: '',
      service: 'Airport Transfer',
      rating: 5,
      feedback: ''
    });

    setModalOpen(false);
    setCurrentIndex(0);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 5000);
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section id="reviews" className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('testimonials.badge', 'Client Feedback')}</span>
          <h2>{t('testimonials.title', 'Client Reviews')}</h2>
          <p>{t('testimonials.subtitle', 'Feedback from executive assistants, travel managers, and corporate leaders who rely on our services across Australia.')}</p>
          
          <div className={styles.headerActions}>
            <button
              onClick={() => setModalOpen(true)}
              className={styles.addReviewBtn}
              aria-label="Add your review"
            >
              <PlusCircle size={17} />
              <span>{t('testimonials.add_review', 'Add Your Review')}</span>
            </button>
          </div>
        </div>

        {successToast && (
          <div className={styles.toast}>
            ✓ {t('review_modal.success_msg', 'Thank you! Your review has been submitted and added below.')}
          </div>
        )}

        <div 
          className={styles.sliderWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            className={`${styles.navBtn} ${styles.leftBtn}`}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            className={`${styles.navBtn} ${styles.rightBtn}`}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className={styles.quoteIconWrapper}>
            <Quote className={styles.quoteIcon} size={64} />
          </div>

          <div className={styles.testimonialContainer}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={styles.testimonialCard}
              >
                <div className={styles.rating}>
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className={styles.star} size={18} fill="#c9a86a" color="#c9a86a" />
                  ))}
                  <span className={styles.verifiedBadge}>
                    <CheckCircle2 size={12} />
                    {t('testimonials.verified_guest', 'Verified Client')}
                  </span>
                </div>
                
                <p className={styles.quote}>
                  "{currentReview.quote}"
                </p>

                <div className={styles.authorInfo}>
                  <span className={styles.name}>{currentReview.author}</span>
                  <span className={styles.title}>{currentReview.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Review Modal */}
      {modalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{t('review_modal.title', 'Submit Your Review')}</h3>
                <p>{t('review_modal.subtitle', 'Share your experience with our chauffeur team.')}</p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className={styles.closeModalBtn}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label>{t('review_modal.name', 'Your Name')} *</label>
                <input
                  type="text"
                  required
                  placeholder={t('review_modal.name_placeholder', 'e.g., Sarah Jenkins')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>{t('review_modal.role', 'Role / Company or City')}</label>
                <input
                  type="text"
                  placeholder={t('review_modal.role_placeholder', 'e.g., Executive Assistant, Sydney')}
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>{t('review_modal.service', 'Service Used')}</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Corporate Account">Corporate Account</option>
                  <option value="As-Directed Chauffeur">As-Directed Chauffeur Hire</option>
                  <option value="Executive Roadshow">Executive Roadshow</option>
                  <option value="Conference & Event">Conference & Event</option>
                  <option value="Wedding Transport">Wedding Transport</option>
                  <option value="Private Aviation / FBO">Private Aviation / FBO</option>
                  <option value="Interstate Transfer">Interstate Transfer</option>
                  <option value="Day Tour">Custom Day Tour</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>{t('review_modal.rating', 'Rating')}</label>
                <div className={styles.starPicker}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={styles.starBtn}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      <Star
                        size={26}
                        fill={(hoverRating !== null ? hoverRating >= star : formData.rating >= star) ? "#c9a86a" : "none"}
                        color="#c9a86a"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t('review_modal.feedback', 'Your Feedback')} *</label>
                <textarea
                  required
                  rows={4}
                  placeholder={t('review_modal.feedback_placeholder', 'Tell us about your experience, chauffeur punctuality, vehicle condition, etc...')}
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                />
              </div>

              <div className={styles.modalBtnGroup}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  {t('review_modal.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className={styles.submitReviewBtn}
                >
                  {t('review_modal.submit', 'Submit Review')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
