import { useState, useCallback, useMemo } from 'react';
import { FadeInUp, FadeIn } from '../components/AnimatedSection';
import { siteConfig } from '../config/site';
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_CLIENT_TEMPLATE_ID,
  EMAILJS_INTERNAL_TEMPLATE_ID,
} from '../config/email';
import {
  buildContactClientContent,
  buildContactInternalContent,
} from '../config/emailContent';
import SEO from '../components/SEO';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  // Previously the raw service id (e.g. "bronze") was sent as the subject —
  // readable in the form's own state, but meaningless in an email ("Service
  // Interest: bronze"). Resolve it to the actual package label instead, same
  // approach Booking.jsx already uses for its selectedPackage.
  const serviceLabel = useMemo(() => {
    if (!formData.service) return 'General Inquiry';
    if (formData.service === 'individual') return 'Individuals & Creators';
    if (formData.service === 'business') return 'Business';
    return 'General Inquiry';
  }, [formData.service]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);

      try {
        // Internal notification is business-critical; client confirmation is a
        // nice-to-have courtesy copy. Send both concurrently and only fail the
        // submission if the internal one fails — mirrors the same pattern used
        // in Booking.jsx for consistency across both forms.
        const internalSend = emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_INTERNAL_TEMPLATE_ID,
          {
            to_email: 'terry@hightidestudios.ie',
            reply_to: formData.email,
            eyebrow_text: 'New Contact Message',
            content_html: buildContactInternalContent({
              fromName: formData.name,
              fromEmail: formData.email,
              phone: formData.phone,
              serviceLabel,
              message: formData.message,
            }),
          },
          EMAILJS_PUBLIC_KEY,
        );

        const clientSend = emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CLIENT_TEMPLATE_ID,
          {
            from_email: formData.email,
            eyebrow_text: 'Message Received',
            content_html: buildContactClientContent({
              fromName: formData.name,
              message: formData.message,
            }),
          },
          EMAILJS_PUBLIC_KEY,
        );

        const [internalResult, clientResult] = await Promise.allSettled([
          internalSend,
          clientSend,
        ]);

        if (internalResult.status === 'rejected') {
          throw internalResult.reason;
        }
        if (clientResult.status === 'rejected') {
          console.warn(
            'Contact client confirmation email failed to send:',
            clientResult.reason,
          );
        }

        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({
          submit: `Failed to send message. Please try again or email us directly at ${siteConfig.contact.email}`,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, serviceLabel, validateForm],
  );

  const { contact } = siteConfig;

  return (
    <>
      <SEO page="contact" />

      {/* Hero */}
      <section className="ht-contact-hero text-center">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">Get in Touch</p>
            <h1 className="ht-contact-title">Let's Talk</h1>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-contact-lead">
              Whatever stage you're at, we'd love to hear about your project.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Contact body — background image with dark overlay */}
      <section className="ht-contact-section">
        <div
          className="ht-contact-bg"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.92) 0%,
      rgba(10, 10, 10, 0.82) 40%,
      rgba(10, 10, 10, 0.93) 100%
    ), url(${process.env.PUBLIC_URL}/images/lights.webp)`,
          }}
        />
        <div className="container py-5 ht-contact-content">
          <div className="row g-4 justify-content-center">
            {/* ── Form ── */}
            <div className="col-12 col-lg-7">
              <FadeIn delay={0.1}>
                <div className="ht-contact-card">
                  <h2 className="ht-contact-card-title">Send us a Message</h2>

                  {submitted ? (
                    <div
                      className="ht-contact-success"
                      role="status"
                      aria-live="polite">
                      <div className="ht-success-icon mb-3">
                        <i
                          className="bi bi-check-circle-fill"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ht-eyebrow">Message Sent</p>
                      <p className="ht-body-text mb-0">
                        Thanks for reaching out! We'll be in touch soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      {errors.submit && (
                        <div className="ht-form-error-banner" role="alert">
                          {errors.submit}
                        </div>
                      )}

                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-name" className="ht-label">
                              Name <span aria-hidden="true">*</span>
                            </label>
                            <input
                              type="text"
                              id="contact-name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`ht-input ${errors.name ? 'ht-input--error' : ''}`}
                              autoComplete="name"
                              aria-required="true"
                              aria-invalid={!!errors.name}
                              aria-describedby={
                                errors.name ? 'name-error' : undefined
                              }
                            />
                            {errors.name && (
                              <p id="name-error" className="ht-field-error">
                                {errors.name}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-email" className="ht-label">
                              Email <span aria-hidden="true">*</span>
                            </label>
                            <input
                              type="email"
                              id="contact-email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`ht-input ${errors.email ? 'ht-input--error' : ''}`}
                              autoComplete="email"
                              aria-required="true"
                              aria-invalid={!!errors.email}
                              aria-describedby={
                                errors.email ? 'email-error' : undefined
                              }
                            />
                            {errors.email && (
                              <p id="email-error" className="ht-field-error">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-phone" className="ht-label">
                              Phone{' '}
                              <span className="ht-optional">(optional)</span>
                            </label>
                            <input
                              type="tel"
                              id="contact-phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="ht-input"
                              autoComplete="tel"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label
                              htmlFor="contact-service"
                              className="ht-label">
                              Service Interest{' '}
                              <span className="ht-optional">(optional)</span>
                            </label>
                            <select
                              id="contact-service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="ht-input ht-select">
                              <option value="">Select an option...</option>
                              <option value="individual">
                                Individuals &amp; Creators
                              </option>
                              <option value="business">Business</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="ht-field">
                            <label
                              htmlFor="contact-message"
                              className="ht-label">
                              Message <span aria-hidden="true">*</span>
                            </label>
                            <textarea
                              id="contact-message"
                              name="message"
                              rows="5"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell us about your project..."
                              className={`ht-input ht-textarea ${errors.message ? 'ht-input--error' : ''}`}
                              aria-required="true"
                              aria-invalid={!!errors.message}
                              aria-describedby={
                                errors.message ? 'message-error' : undefined
                              }
                            />
                            {errors.message && (
                              <p id="message-error" className="ht-field-error">
                                {errors.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="ht-btn-primary w-100 justify-content-center"
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-send" aria-hidden="true" />
                                Send Message
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* ── Info cards ── */}
            <div className="col-12 col-lg-5">
              <FadeInUp delay={0.2}>
                <div className="d-flex flex-column gap-3">
                  {/* Contact details */}
                  <div className="ht-contact-info-card">
                    <h3 className="ht-contact-info-title">Contact</h3>

                    <a
                      href={`mailto:${contact.email}`}
                      className="ht-contact-info-item">
                      <div className="ht-contact-info-icon">
                        <i className="bi bi-envelope" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="ht-contact-info-label">
                          Studio Email
                        </span>
                        <span className="ht-contact-info-value">
                          {contact.email}
                        </span>
                      </div>
                    </a>

                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="ht-contact-info-item">
                      <div className="ht-contact-info-icon">
                        <i className="bi bi-telephone" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="ht-contact-info-label">
                          Studio Phone
                        </span>
                        <span className="ht-contact-info-value">
                          {contact.phone}
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Location */}
                  <div className="ht-contact-info-card">
                    <h3 className="ht-contact-info-title">Studio</h3>

                    <div className="ht-contact-info-item">
                      <div className="ht-contact-info-icon">
                        <i className="bi bi-geo-alt" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="ht-contact-info-label">Location</span>
                        <address className="ht-contact-info-value mb-0">
                          High Tide Studios
                          <br />
                          {contact.address}
                        </address>
                      </div>
                    </div>

                    <div className="ht-contact-info-item">
                      <div className="ht-contact-info-icon">
                        <i className="bi bi-clock" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="ht-contact-info-label">Hours</span>
                        <span className="ht-contact-info-value">
                          Mon – Fri: 9am – 6pm
                          <br />
                          Weekend: By appointment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>

          {/* ── Map Section ── */}
          <FadeInUp delay={0.3}>
            <div className="row mt-5">
              <div className="col-12">
                <div
                  className="ht-contact-card p-2"
                  style={{
                    borderRadius: 'var(--hts-radius-lg)',
                    overflow: 'hidden',
                  }}>
                  {mapLoaded ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4040.058133410199!2d-6.061866505499834!3d53.142989185692784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867afdf1835a79d%3A0xc3080488ca621dce!2sHigh%20Tide%20Studios.!5e1!3m2!1sen!2sie!4v1779206109763!5m2!1sen!2sie"
                      width="100%"
                      height="500"
                      title="High Tide Studios location map"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <div className="ht-map-consent">
                      <i
                        className="bi bi-geo-alt ht-map-consent-icon"
                        aria-hidden="true"
                      />
                      <h2 className="ht-contact-card-title">
                        High Tide Studios, Greystones
                      </h2>
                      <p className="ht-muted-text">
                        Load the interactive Google Map to view the studio
                        location. Google may use cookies or similar technologies
                        when the map loads.
                      </p>
                      <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <button
                          type="button"
                          className="ht-btn-primary"
                          onClick={() => setMapLoaded(true)}>
                          <i className="bi bi-map" aria-hidden="true" />
                          Load Map
                        </button>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=High%20Tide%20Studios%20Greystones"
                          className="ht-btn-outline"
                          target="_blank"
                          rel="noopener noreferrer">
                          <i
                            className="bi bi-box-arrow-up-right"
                            aria-hidden="true"
                          />
                          Open Maps
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
