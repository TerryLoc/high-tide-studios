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

export default function Booking() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I book a session at High Tide Studios?', acceptedAnswer: { '@type': 'Answer', text: 'Select your preferred dates, choose a package, and submit your details. We will confirm availability and send deposit instructions.' } },
      { '@type': 'Question', name: 'What is the deposit policy?', acceptedAnswer: { '@type': 'Answer', text: 'A 10% non-refundable deposit is required to secure your booking. The balance is due 48 hours before your session.' } },
      { '@type': 'Question', name: 'Can I reschedule or cancel?', acceptedAnswer: { '@type': 'Answer', text: 'You can reschedule up to 48 hours before your session. Deposits are non-refundable if cancelled.' } },
      { '@type': 'Question', name: 'What equipment is available?', acceptedAnswer: { '@type': 'Answer', text: 'Our studio features 5 x 4K cameras, multiple studio microphones, professional lighting, greenscreen, and live video switching.' } },
      { '@type': 'Question', name: 'How many dates can I select?', acceptedAnswer: { '@type': 'Answer', text: 'You can select up to 3 preferred dates. We will confirm which are available.' } },
    ],
  };

  const [searchParams] = useSearchParams();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const initialPackage = searchParams.get('package') || '';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', package: initialPackage, notes: '', agreeDeposit: false });

  useEffect(() => {
    const pkgParam = searchParams.get('package');
    if (pkgParam && packages.some(p => p.id === pkgParam)) {
      setFormData(prev => ({ ...prev, package: pkgParam }));
    }
  }, [searchParams]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const unavailableDates = useMemo(() => [
    '2026-01-25', '2026-01-26', '2026-01-30',
    '2026-02-02', '2026-02-03', '2026-02-10',
    '2026-02-14', '2026-02-20', '2026-02-21',
  ], []);

  const selectedPackage = useMemo(() => packages.find(pkg => pkg.id === formData.package), [formData.package]);
  const depositAmount = useMemo(() => {
    if (!selectedPackage) return null;
    return Math.round(parseInt(selectedPackage.price.replace(/[€,]/g, '')) * 0.1);
  }, [selectedPackage]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDay: firstDay.getDay(), year, month };
  };

  const formatDateKey = (year, month, day) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const isDateUnavailable = (dateKey) => unavailableDates.includes(dateKey);
  const isDateSelected = (dateKey) => selectedDates.includes(dateKey);
  const isPastDate = (year, month, day) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(year, month, day) < today;
  };
  const isWeekend = (year, month, day) => {
    const d = new Date(year, month, day).getDay();
    return d === 0 || d === 6;
  };

  const handleDateClick = (dateKey, year, month, day) => {
    if (isDateUnavailable(dateKey) || isPastDate(year, month, day)) return;
    setSelectedDates(prev => {
      if (prev.includes(dateKey)) return prev.filter(d => d !== dateKey);
      if (prev.length >= 3) return [...prev.slice(1), dateKey];
      return [...prev, dateKey];
    });
  };

  const prevMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.package) newErrors.package = 'Please select a package';
    if (selectedDates.length === 0) newErrors.dates = 'Please select at least one preferred date';
    if (!formData.agreeDeposit) newErrors.agreeDeposit = 'You must agree to the deposit terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, selectedDates]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const formattedDates = selectedDates.map(date =>
        new Date(date).toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      ).join('\n• ');

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
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
      }, EMAILJS_PUBLIC_KEY);

      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: `Failed to send booking request: ${error.text || error.message || 'Unknown error'}. Please contact us directly at colmhayesradio@gmail.com` });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, selectedDates, depositAmount, selectedPackage, validateForm]);

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentMonth);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const renderCalendar = () => {
    const days = [];
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    dayNames.forEach(day => (
      days.push(<div key={`header-${day}`} className="ht-cal-header">{day}</div>)
    ));

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="ht-cal-day ht-cal-day--empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const unavailable = isDateUnavailable(dateKey);
      const selected = isDateSelected(dateKey);
      const past = isPastDate(year, month, day);
      const weekend = isWeekend(year, month, day);

      let cls = 'ht-cal-day';
      if (unavailable) cls += ' ht-cal-day--unavailable';
      else if (past)   cls += ' ht-cal-day--past';
      else if (selected) cls += ' ht-cal-day--selected';
      else if (weekend) cls += ' ht-cal-day--weekend';
      else cls += ' ht-cal-day--available';

      days.push(
        <div
          key={dateKey}
          className={cls}
          onClick={() => handleDateClick(dateKey, year, month, day)}
          role="button"
          tabIndex={past || unavailable ? -1 : 0}
          aria-label={`${day} ${monthNames[month]} ${year}${unavailable ? ', unavailable' : ''}${selected ? ', selected' : ''}`}
          onKeyDown={(e) => e.key === 'Enter' && handleDateClick(dateKey, year, month, day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <>
        <SEO page="contact" customTitle="Booking Confirmed — High Tide Studios" />
        <section className="ht-booking-section">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 text-center">
                <FadeInUp>
                  <div className="ht-booking-success">
                    <div className="ht-success-icon" aria-hidden="true">
                      <i className="bi bi-check-circle-fill" />
                    </div>
                    <p className="ht-eyebrow mt-4">Booking Request Received</p>
                    <h1 className="ht-section-title">You're on the radar!</h1>
                    <div className="ht-section-divider mx-auto" />
                    <p className="ht-body-text mb-4">
                      We'll review your preferred dates and contact you within 24 hours
                      to confirm availability and arrange your{' '}
                      <strong className="text-gold">€{depositAmount}</strong> non-refundable deposit.
                    </p>
                    <div className="ht-booking-summary mb-4">
                      <p className="ht-summary-row">
                        <span>Package</span>
                        <span>{selectedPackage?.title} — {selectedPackage?.subtitle}</span>
                      </p>
                      <p className="ht-summary-row">
                        <span>Preferred Dates</span>
                        <span>{selectedDates.join(', ')}</span>
                      </p>
                      <p className="ht-summary-row ht-summary-row--total">
                        <span>Deposit (10%)</span>
                        <span>€{depositAmount}</span>
                      </p>
                    </div>
                    <a href="/" className="ht-btn-primary">
                      <i className="bi bi-house" aria-hidden="true" />
                      Return Home
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

  /* ── Main booking form ── */
  return (
    <>
      <SEO
        page="contact"
        customTitle="Book a Session — High Tide Studios"
        customDescription="Book your podcast or video recording session at High Tide Studios Greystones."
        structuredDataType="faq"
        structuredDataPayload={faqSchema}
      />

      {/* Hero */}
      <section className="ht-booking-hero text-center">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">Studio Booking</p>
            <h1 className="ht-booking-title">Book Your Session</h1>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-booking-lead">
              Select your preferred dates, choose your package, and secure your booking with a 10% deposit.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="ht-booking-section">
        <div className="container py-5">
          <div className="row g-4">

            {/* ── Calendar ── */}
            <div className="col-12 col-lg-7">
              <FadeIn delay={0.1}>
                <div className="ht-booking-card">
                  <h2 className="ht-booking-card-title">
                    <i className="bi bi-calendar3" aria-hidden="true" />
                    Select Preferred Dates
                  </h2>
                  <p className="ht-muted-text small mb-4">
                    Choose up to 3 preferred dates. We'll confirm availability within 24 hours.
                  </p>

                  {/* Month navigation */}
                  <div className="ht-cal-nav">
                    <button className="ht-cal-nav-btn" onClick={prevMonth} aria-label="Previous month">
                      <i className="bi bi-chevron-left" />
                    </button>
                    <h3 className="ht-cal-month">{monthNames[month]} {year}</h3>
                    <button className="ht-cal-nav-btn" onClick={nextMonth} aria-label="Next month">
                      <i className="bi bi-chevron-right" />
                    </button>
                  </div>

                  {/* Calendar grid */}
                  <div className="ht-cal-grid">
                    {renderCalendar()}
                  </div>

                  {/* Legend */}
                  <div className="ht-cal-legend">
                    <div className="ht-legend-item"><span className="ht-legend-dot ht-legend-dot--available" />Available</div>
                    <div className="ht-legend-item"><span className="ht-legend-dot ht-legend-dot--selected" />Selected</div>
                    <div className="ht-legend-item"><span className="ht-legend-dot ht-legend-dot--unavailable" />Unavailable</div>
                    <div className="ht-legend-item"><span className="ht-legend-dot ht-legend-dot--weekend" />Weekend (by request)</div>
                  </div>

                  {errors.dates && (
                    <p className="ht-field-error mt-2">
                      <i className="bi bi-exclamation-circle me-1" />
                      {errors.dates}
                    </p>
                  )}

                  {selectedDates.length > 0 && (
                    <div className="ht-selected-dates mt-4">
                      <p className="ht-selected-dates-label">Your Preferred Dates:</p>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedDates.map(date => (
                          <span key={date} className="ht-date-chip">
                            {new Date(date).toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' })}
                            <button
                              className="ht-date-chip-remove"
                              onClick={() => setSelectedDates(prev => prev.filter(d => d !== date))}
                              aria-label="Remove date"
                            >
                              <i className="bi bi-x" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* ── Form ── */}
            <div className="col-12 col-lg-5">
              <FadeIn delay={0.2}>
                <div className="ht-booking-card">
                  <h2 className="ht-booking-card-title">
                    <i className="bi bi-person-lines-fill" aria-hidden="true" />
                    Your Details
                  </h2>

                  <form onSubmit={handleSubmit} noValidate>
                    {errors.submit && (
                      <div className="ht-form-error-banner" role="alert">{errors.submit}</div>
                    )}

                    <div className="ht-field mb-3">
                      <label htmlFor="booking-name" className="ht-label">Full Name <span aria-hidden="true">*</span></label>
                      <input type="text" id="booking-name" name="name" value={formData.name} onChange={handleChange}
                        className={`ht-input ${errors.name ? 'ht-input--error' : ''}`} placeholder="John Smith" autoComplete="name" />
                      {errors.name && <p className="ht-field-error">{errors.name}</p>}
                    </div>

                    <div className="ht-field mb-3">
                      <label htmlFor="booking-email" className="ht-label">Email <span aria-hidden="true">*</span></label>
                      <input type="email" id="booking-email" name="email" value={formData.email} onChange={handleChange}
                        className={`ht-input ${errors.email ? 'ht-input--error' : ''}`} placeholder="john@example.com" autoComplete="email" />
                      {errors.email && <p className="ht-field-error">{errors.email}</p>}
                    </div>

                    <div className="ht-field mb-3">
                      <label htmlFor="booking-phone" className="ht-label">Phone <span aria-hidden="true">*</span></label>
                      <input type="tel" id="booking-phone" name="phone" value={formData.phone} onChange={handleChange}
                        className={`ht-input ${errors.phone ? 'ht-input--error' : ''}`} placeholder="087 123 4567" autoComplete="tel" />
                      {errors.phone && <p className="ht-field-error">{errors.phone}</p>}
                    </div>

                    <div className="ht-field mb-3">
                      <label htmlFor="booking-company" className="ht-label">Company / Podcast Name <span className="ht-optional">(optional)</span></label>
                      <input type="text" id="booking-company" name="company" value={formData.company} onChange={handleChange}
                        className="ht-input" placeholder="Optional" autoComplete="organization" />
                    </div>

                    <div className="ht-field mb-3">
                      <label htmlFor="booking-package" className="ht-label">Select Package <span aria-hidden="true">*</span></label>
                      <select id="booking-package" name="package" value={formData.package} onChange={handleChange}
                        className={`ht-input ht-select ${errors.package ? 'ht-input--error' : ''}`}>
                        <option value="">Choose a package...</option>
                        {packages.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} — {pkg.subtitle} ({pkg.price})
                          </option>
                        ))}
                      </select>
                      {errors.package && <p className="ht-field-error">{errors.package}</p>}
                    </div>

                    <div className="ht-field mb-4">
                      <label htmlFor="booking-notes" className="ht-label">Additional Notes <span className="ht-optional">(optional)</span></label>
                      <textarea id="booking-notes" name="notes" rows="3" value={formData.notes} onChange={handleChange}
                        className="ht-input ht-textarea"
                        placeholder="Tell us about your project, any special requirements, or questions..." />
                    </div>

                    {/* Deposit info */}
                    {selectedPackage && (
                      <div className="ht-deposit-box mb-4">
                        <div className="ht-deposit-row">
                          <span>Package Price</span>
                          <span>{selectedPackage.price}</span>
                        </div>
                        <div className="ht-deposit-row">
                          <span>Deposit (10%)</span>
                          <span className="ht-deposit-amount">€{depositAmount}</span>
                        </div>
                        <div className="ht-deposit-divider" />
                        <div className="ht-deposit-row">
                          <span>Balance Due on Session</span>
                          <span>€{parseInt(selectedPackage.price.replace(/[€,]/g, '')) - depositAmount}</span>
                        </div>
                      </div>
                    )}

                    {/* Deposit agreement */}
                    <div className="ht-field mb-4">
                      <label className="ht-checkbox-label">
                        <input type="checkbox" name="agreeDeposit" checked={formData.agreeDeposit} onChange={handleChange}
                          className={`ht-checkbox ${errors.agreeDeposit ? 'ht-checkbox--error' : ''}`} id="booking-agree" />
                        <span>
                          I understand that a <strong>10% non-refundable deposit</strong> is required to secure my booking.
                          The remaining balance is due 48 hours before the day of the first recording.
                        </span>
                      </label>
                      {errors.agreeDeposit && <p className="ht-field-error">{errors.agreeDeposit}</p>}
                    </div>

                    <button type="submit" className="ht-btn-primary w-100 justify-content-center" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />Processing...</>
                      ) : (
                        <><i className="bi bi-calendar-check" aria-hidden="true" />Request Booking</>
                      )}
                    </button>

                    <p className="ht-form-disclaimer">
                      <i className="bi bi-shield-check me-1" aria-hidden="true" />
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