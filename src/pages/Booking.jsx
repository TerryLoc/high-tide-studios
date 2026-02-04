import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FadeInUp, FadeIn } from '../components/AnimatedSection';
import { packages } from '../data/packages';
import SEO from '../components/SEO';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_ns57z9a';
const EMAILJS_TEMPLATE_ID = 'template_jvbux9k';
const EMAILJS_PUBLIC_KEY = 'fA8c0XayRbgHD9Yec';

/**
 * Booking page with calendar and client details
 * Sends booking requests via EmailJS
 */
export default function Booking() {
  const [searchParams] = useSearchParams();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  
  // Get package from URL params
  const initialPackage = searchParams.get('package') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    package: initialPackage,
    notes: '',
    agreeDeposit: false,
  });

  // Update package if URL param changes
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    if (pkgParam && packages.some(p => p.id === pkgParam)) {
      setFormData(prev => ({ ...prev, package: pkgParam }));
    }
  }, [searchParams]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Example unavailable dates (would come from backend in production)
  const unavailableDates = useMemo(() => [
    '2026-01-25', '2026-01-26', '2026-01-30',
    '2026-02-02', '2026-02-03', '2026-02-10',
    '2026-02-14', '2026-02-20', '2026-02-21',
  ], []);

  // Calculate deposit based on selected package
  const selectedPackage = useMemo(() => {
    return packages.find(pkg => pkg.id === formData.package);
  }, [formData.package]);

  const depositAmount = useMemo(() => {
    if (!selectedPackage) return null;
    const price = parseInt(selectedPackage.price.replace(/[€,]/g, ''));
    return Math.round(price * 0.1);
  }, [selectedPackage]);

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay, year, month };
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateUnavailable = (dateKey) => unavailableDates.includes(dateKey);
  const isDateSelected = (dateKey) => selectedDates.includes(dateKey);
  const isPastDate = (year, month, day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const isWeekend = (year, month, day) => {
    const date = new Date(year, month, day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const handleDateClick = (dateKey, year, month, day) => {
    if (isDateUnavailable(dateKey) || isPastDate(year, month, day)) return;
    
    setSelectedDates(prev => {
      if (prev.includes(dateKey)) {
        return prev.filter(d => d !== dateKey);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), dateKey];
      }
      return [...prev, dateKey];
    });
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.package) newErrors.package = 'Please select a package';
    if (selectedDates.length === 0) newErrors.dates = 'Please select at least one preferred date';
    if (!formData.agreeDeposit) newErrors.agreeDeposit = 'You must agree to the deposit terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, selectedDates]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Format dates for email
      const formattedDates = selectedDates.map(date => 
        new Date(date).toLocaleDateString('en-IE', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long',
          year: 'numeric'
        })
      ).join('\n• ');

      // Prepare email template parameters (must match EmailJS template variables)
      const emailParams = {
        to_name: 'High Tide Studios',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not provided',
        package: `${selectedPackage.title} - ${selectedPackage.subtitle}`,
        package_price: selectedPackage.price,
        deposit_amount: `€${depositAmount}`,
        balance_due: `€${parseInt(selectedPackage.price.replace(/[€,]/g, '')) - depositAmount}`,
        preferred_dates: formattedDates,
        notes: formData.notes || 'None provided',
        reply_to: formData.email,
      };

      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error details:', error.text || error.message || error);
      setErrors({ submit: `Failed to send booking request: ${error.text || error.message || 'Unknown error'}. Please contact us directly at colmhayesradio@gmail.com` });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, selectedDates, depositAmount, selectedPackage, validateForm]);

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    dayNames.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="calendar-day-header">
          {day}
        </div>
      );
    });

    // Empty cells before first day
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const unavailable = isDateUnavailable(dateKey);
      const selected = isDateSelected(dateKey);
      const past = isPastDate(year, month, day);
      const weekend = isWeekend(year, month, day);

      let className = 'calendar-day';
      if (unavailable) className += ' unavailable';
      if (selected) className += ' selected';
      if (past) className += ' past';
      if (weekend && !unavailable && !past) className += ' weekend';

      days.push(
        <div
          key={dateKey}
          className={className}
          onClick={() => handleDateClick(dateKey, year, month, day)}
          role="button"
          tabIndex={past || unavailable ? -1 : 0}
          aria-label={`${day} ${monthNames[month]} ${year}${unavailable ? ', unavailable' : ''}${selected ? ', selected' : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  if (submitted) {
    return (
      <>
        <SEO 
          page="contact"
          customTitle="Booking Confirmed - High Tide Studios"
        />
        <section className="booking-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 text-center">
                <FadeInUp>
                  <div className="booking-success-card">
                    <div className="success-icon mb-4">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h1 className="h2 fw-bold mb-3">Booking Request Received!</h1>
                    <p className="text-muted mb-4">
                      Thank you for your booking request. We'll review your preferred dates and 
                      contact you within 24 hours to confirm availability and arrange your 
                      <strong> €{depositAmount}</strong> non-refundable deposit.
                    </p>
                    <div className="booking-summary p-4 bg-light rounded mb-4">
                      <h3 className="h6 fw-bold mb-3">Booking Summary</h3>
                      <p className="mb-2"><strong>Package:</strong> {selectedPackage?.title} - {selectedPackage?.subtitle}</p>
                      <p className="mb-2"><strong>Preferred Dates:</strong> {selectedDates.join(', ')}</p>
                      <p className="mb-0"><strong>Deposit (10%):</strong> €{depositAmount}</p>
                    </div>
                    <a href="/" className="btn btn-dark btn-lg">
                      <i className="bi bi-house me-2"></i>Return Home
                    </a>
                  </div>
                </FadeInUp>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO 
        page="contact"
        customTitle="Book a Session - High Tide Studios"
        customDescription="Book your podcast or video recording session at High Tide Studios Greystones. Select your preferred dates and secure your slot with a 10% deposit."
      />
      
      <section className="booking-section py-5">
        <div className="container">
          {/* Header */}
          <FadeInUp>
            <div className="text-center mb-5">
              <span className="badge bg-dark px-3 py-2 mb-3">
                <i className="bi bi-calendar-check me-2"></i>Studio Booking
              </span>
              <h1 className="display-5 fw-bold mb-3">Book Your Session</h1>
              <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Select your preferred dates, choose your package, and secure your booking with a 10% deposit.
              </p>
            </div>
          </FadeInUp>

          <div className="row g-4">
            {/* Calendar Section */}
            <div className="col-12 col-lg-7">
              <FadeIn delay={0.1}>
                <div className="booking-card">
                  <h2 className="h4 fw-bold mb-4">
                    <i className="bi bi-calendar3 me-2 text-muted"></i>
                    Select Preferred Dates
                  </h2>
                  <p className="text-muted small mb-4">
                    Choose up to 3 preferred dates. We'll confirm availability within 24 hours.
                  </p>

                  {/* Calendar Navigation */}
                  <div className="calendar-header">
                    <button 
                      className="btn btn-outline-dark btn-sm" 
                      onClick={prevMonth}
                      aria-label="Previous month"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <h3 className="h5 fw-bold mb-0">
                      {monthNames[month]} {year}
                    </h3>
                    <button 
                      className="btn btn-outline-dark btn-sm" 
                      onClick={nextMonth}
                      aria-label="Next month"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="calendar-grid">
                    {renderCalendar()}
                  </div>

                  {/* Calendar Legend */}
                  <div className="calendar-legend">
                    <div className="legend-item">
                      <span className="legend-dot available"></span>
                      <span>Available</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot selected"></span>
                      <span>Selected</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot unavailable"></span>
                      <span>Unavailable</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot weekend"></span>
                      <span>Weekend (by request)</span>
                    </div>
                  </div>

                  {errors.dates && (
                    <div className="text-danger small mt-2">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.dates}
                    </div>
                  )}

                  {selectedDates.length > 0 && (
                    <div className="selected-dates mt-4">
                      <h4 className="h6 fw-bold mb-2">Your Preferred Dates:</h4>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedDates.map(date => (
                          <span key={date} className="badge bg-dark py-2 px-3">
                            {new Date(date).toLocaleDateString('en-IE', { 
                              weekday: 'short', 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                            <button 
                              className="btn-close btn-close-white ms-2" 
                              style={{ fontSize: '0.6rem' }}
                              onClick={() => setSelectedDates(prev => prev.filter(d => d !== date))}
                              aria-label="Remove date"
                            ></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Booking Form */}
            <div className="col-12 col-lg-5">
              <FadeIn delay={0.2}>
                <div className="booking-card">
                  <h2 className="h4 fw-bold mb-4">
                    <i className="bi bi-person-lines-fill me-2 text-muted"></i>
                    Your Details
                  </h2>

                  <form onSubmit={handleSubmit} noValidate>
                    {errors.submit && (
                      <div className="alert alert-danger" role="alert">
                        {errors.submit}
                      </div>
                    )}

                    {/* Name */}
                    <div className="mb-3">
                      <label htmlFor="booking-name" className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="booking-name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        autoComplete="name"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="booking-email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="booking-email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        autoComplete="email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                      <label htmlFor="booking-phone" className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="booking-phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="087 123 4567"
                        autoComplete="tel"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    {/* Company (optional) */}
                    <div className="mb-3">
                      <label htmlFor="booking-company" className="form-label">
                        Company / Podcast Name
                      </label>
                      <input
                        type="text"
                        id="booking-company"
                        className="form-control"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Optional"
                        autoComplete="organization"
                      />
                    </div>

                    {/* Package Selection */}
                    <div className="mb-3">
                      <label htmlFor="booking-package" className="form-label">
                        Select Package <span className="text-danger">*</span>
                      </label>
                      <select
                        id="booking-package"
                        className={`form-select ${errors.package ? 'is-invalid' : ''}`}
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                      >
                        <option value="">Choose a package...</option>
                        {packages.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} — {pkg.subtitle} ({pkg.price})
                          </option>
                        ))}
                      </select>
                      {errors.package && <div className="invalid-feedback">{errors.package}</div>}
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <label htmlFor="booking-notes" className="form-label">
                        Additional Notes
                      </label>
                      <textarea
                        id="booking-notes"
                        className="form-control"
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Tell us about your project, any special requirements, or questions..."
                      />
                    </div>

                    {/* Deposit Info Box */}
                    {selectedPackage && (
                      <div className="deposit-info-box mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-semibold">Package Price:</span>
                          <span>{selectedPackage.price}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-semibold">Deposit (10%):</span>
                          <span className="h5 fw-bold text-success mb-0">€{depositAmount}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-semibold">Balance Due on Session:</span>
                          <span>€{parseInt(selectedPackage.price.replace(/[€,]/g, '')) - depositAmount}</span>
                        </div>
                      </div>
                    )}

                    {/* Deposit Agreement */}
                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="booking-agree"
                          className={`form-check-input ${errors.agreeDeposit ? 'is-invalid' : ''}`}
                          name="agreeDeposit"
                          checked={formData.agreeDeposit}
                          onChange={handleChange}
                        />
                        <label htmlFor="booking-agree" className="form-check-label small">
                          I understand that a <strong>10% non-refundable deposit</strong> is required to 
                          secure my booking. The remaining balance is due 48 hours before the day of the first recording.
                        </label>
                        {errors.agreeDeposit && (
                          <div className="invalid-feedback d-block">{errors.agreeDeposit}</div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-calendar-check me-2"></i>
                          Request Booking
                        </>
                      )}
                    </button>

                    <p className="text-muted small text-center mt-3 mb-0">
                      <i className="bi bi-shield-check me-1"></i>
                      Your information is secure and will only be used for booking purposes.
                    </p>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
