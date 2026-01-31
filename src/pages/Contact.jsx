import { useState, useCallback } from 'react';
import { FadeInUp, FadeIn } from '../components/AnimatedSection';
import { siteConfig } from '../config/site';
import { packages } from '../data/packages';
import SEO from '../components/SEO';

/**
 * Contact page with form and contact information
 * Form includes validation and submission handling
 */
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
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        // TODO: Integrate with email service (e.g., EmailJS, Formspree, or backend API)
        console.log('Form submitted:', formData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ submit: 'Something went wrong. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const { contact } = siteConfig;

  return (
    <>
      <SEO page="contact" />
      <section 
        className="contact-section"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 100%), url(/images/lights.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: 'calc(100vh - 76px)'
        }}
      >
        <div className="container py-5">
          {/* Header */}
          <FadeInUp>
            <div className="text-center mb-5">
              <span className="badge bg-white bg-opacity-10 text-white px-3 py-2 mb-3">
                <i className="bi bi-chat-dots me-2"></i>Let's Talk
              </span>
              <h1 className="display-5 fw-bold text-white mb-3">Get in Touch</h1>
              <p className="lead text-white opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
                Ready to create something amazing? We'd love to hear about your project.
              </p>
            </div>
          </FadeInUp>

          <div className="row g-4 justify-content-center">
            {/* Contact Form Card */}
            <div className="col-12 col-lg-7">
              <FadeIn delay={0.2}>
                <div className="contact-card">
                  <h2 className="h4 fw-bold mb-4">Send us a Message</h2>
              {submitted ? (
                <div
                  className="alert alert-success"
                  role="status"
                  aria-live="polite"
                >
                  <i className="bi bi-check-circle me-2" aria-hidden="true" />
                  Thanks for reaching out! We'll be in touch soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {errors.submit && (
                    <div className="alert alert-danger" role="alert">
                      {errors.submit}
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="contact-name" className="form-label">
                        Name{' '}
                        <span className="text-danger" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <div id="name-error" className="invalid-feedback">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="contact-email" className="form-label">
                        Email{' '}
                        <span className="text-danger" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <div id="email-error" className="invalid-feedback">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="contact-phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="contact-service" className="form-label">
                        Service Interest
                      </label>
                      <select
                        id="contact-service"
                        className="form-select"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a package...</option>
                        {packages.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} — {pkg.subtitle} ({pkg.price})
                          </option>
                        ))}
                        <option value="custom">Custom Project</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="contact-message" className="form-label">
                        Message{' '}
                        <span className="text-danger" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <textarea
                        id="contact-message"
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? 'message-error' : undefined
                        }
                      />
                      {errors.message && (
                        <div id="message-error" className="invalid-feedback">
                          {errors.message}
                        </div>
                      )}
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        disabled={isSubmitting}
                      >
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
                            <i className="bi bi-send me-2" aria-hidden="true" />
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

            {/* Contact Info Cards */}
            <div className="col-12 col-lg-5">
              <FadeInUp delay={0.3}>
                <div className="d-flex flex-column gap-3">
                  {/* Quick Contact Card */}
                  <div className="contact-info-card">
                    <h3 className="h5 fw-bold mb-4 text-white">Contact</h3>
                    
                    <a href={`mailto:${contact.email}`} className="contact-info-item">
                      <div className="contact-info-icon">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <div>
                        <span className="d-block small text-white-50">Email</span>
                        <span className="text-white">{contact.email}</span>
                      </div>
                    </a>

                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-info-item">
                      <div className="contact-info-icon">
                        <i className="bi bi-telephone"></i>
                      </div>
                      <div>
                        <span className="d-block small text-white-50">Phone</span>
                        <span className="text-white">{contact.phone}</span>
                      </div>
                    </a>
                  </div>

                  {/* Location Card */}
                  <div className="contact-info-card">
                    <h3 className="h5 fw-bold mb-4 text-white">Studio</h3>
                    
                    <div className="contact-info-item">
                      <div className="contact-info-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div>
                        <span className="d-block small text-white-50">Location</span>
                        <address className="text-white mb-0">
                          High Tide Studios<br />
                          {contact.address}
                        </address>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-info-icon">
                        <i className="bi bi-clock"></i>
                      </div>
                      <div>
                        <span className="d-block small text-white-50">Hours</span>
                        <span className="text-white">
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
