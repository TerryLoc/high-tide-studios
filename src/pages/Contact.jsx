import { useState, useCallback } from 'react';
import { FadeInUp, FadeIn } from '../components/AnimatedSection';
import { siteConfig } from '../config/site';
import { packages } from '../data/packages';
import SEO from '../components/SEO';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_ns57z9a';
const EMAILJS_TEMPLATE_ID = 'template_4wdkal7';
const EMAILJS_PUBLIC_KEY = 'fA8c0XayRbgHD9Yec';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_name: 'High Tide Studios',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.service || 'General Inquiry',
        message: formData.message,
        reply_to: formData.email,
      }, EMAILJS_PUBLIC_KEY);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again or email us directly at colmhayesradio@gmail.com' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

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
              Ready to create something remarkable? We'd love to hear about your project.
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
    ), url(${process.env.PUBLIC_URL}/images/lights.webp)`
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
                    <div className="ht-contact-success" role="status" aria-live="polite">
                      <div className="ht-success-icon mb-3">
                        <i className="bi bi-check-circle-fill" aria-hidden="true" />
                      </div>
                      <p className="ht-eyebrow">Message Sent</p>
                      <p className="ht-body-text mb-0">
                        Thanks for reaching out! We'll be in touch soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      {errors.submit && (
                        <div className="ht-form-error-banner" role="alert">{errors.submit}</div>
                      )}

                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-name" className="ht-label">
                              Name <span aria-hidden="true">*</span>
                            </label>
                            <input type="text" id="contact-name" name="name"
                              value={formData.name} onChange={handleChange}
                              className={`ht-input ${errors.name ? 'ht-input--error' : ''}`}
                              autoComplete="name" aria-required="true"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? 'name-error' : undefined}
                            />
                            {errors.name && <p id="name-error" className="ht-field-error">{errors.name}</p>}
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-email" className="ht-label">
                              Email <span aria-hidden="true">*</span>
                            </label>
                            <input type="email" id="contact-email" name="email"
                              value={formData.email} onChange={handleChange}
                              className={`ht-input ${errors.email ? 'ht-input--error' : ''}`}
                              autoComplete="email" aria-required="true"
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? 'email-error' : undefined}
                            />
                            {errors.email && <p id="email-error" className="ht-field-error">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-phone" className="ht-label">
                              Phone <span className="ht-optional">(optional)</span>
                            </label>
                            <input type="tel" id="contact-phone" name="phone"
                              value={formData.phone} onChange={handleChange}
                              className="ht-input" autoComplete="tel"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="ht-field">
                            <label htmlFor="contact-service" className="ht-label">
                              Service Interest <span className="ht-optional">(optional)</span>
                            </label>
                            <select id="contact-service" name="service"
                              value={formData.service} onChange={handleChange}
                              className="ht-input ht-select"
                            >
                              <option value="">Select a package...</option>
                              {packages.map(pkg => (
                                <option key={pkg.id} value={pkg.id}>
                                  {pkg.title} — {pkg.subtitle} ({pkg.price})
                                </option>
                              ))}
                              <option value="custom">Custom Project</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="ht-field">
                            <label htmlFor="contact-message" className="ht-label">
                              Message <span aria-hidden="true">*</span>
                            </label>
                            <textarea id="contact-message" name="message" rows="5"
                              value={formData.message} onChange={handleChange}
                              placeholder="Tell us about your project..."
                              className={`ht-input ht-textarea ${errors.message ? 'ht-input--error' : ''}`}
                              aria-required="true" aria-invalid={!!errors.message}
                              aria-describedby={errors.message ? 'message-error' : undefined}
                            />
                            {errors.message && <p id="message-error" className="ht-field-error">{errors.message}</p>}
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="ht-btn-primary w-100 justify-content-center" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />Sending...</>
                            ) : (
                              <><i className="bi bi-send" aria-hidden="true" />Send Message</>
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

                    <a href={`mailto:${contact.email}`} className="ht-contact-info-item">
                      <div className="ht-contact-info-icon">
                        <i className="bi bi-envelope" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="ht-contact-info-label">Email</span>
                        <span className="ht-contact-info-value">{contact.email}</span>
                      </div>
                    </a>

                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="ht-contact-info-item">
                      <div className="ht-contact-info-icon">
                        <i className="bi bi-telephone" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="ht-contact-info-label">Phone</span>
                        <span className="ht-contact-info-value">{contact.phone}</span>
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
                          High Tide Studios<br />{contact.address}
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
                          Mon – Fri: 9am – 6pm<br />
                          Weekend: By appointment
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </FadeInUp>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}