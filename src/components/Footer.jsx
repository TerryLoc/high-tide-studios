import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

/**
 * Site footer with navigation, contact info, and social links
 * Uses centralized site config for consistency
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/clients', label: 'Clients' },
    { to: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: siteConfig.social.instagram, icon: 'bi-instagram', label: 'Instagram' },
    { href: siteConfig.social.youtube, icon: 'bi-youtube', label: 'YouTube' },
  ];

  return (
    <footer className="bg-dark text-light py-5 mt-auto" role="contentinfo">
      <div className="container">
        <div className="row g-4">
          {/* Brand & Description */}
          <div className="col-12 col-md-4">
            <h2 className="h5 fw-bold mb-3">
              <i className="bi bi-broadcast me-2" aria-hidden="true" />
              {siteConfig.name}
            </h2>
            <p className="text-muted small">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <nav className="col-6 col-md-2" aria-label="Footer navigation">
            <h3 className="h6 fw-semibold mb-3">Quick Links</h3>
            <ul className="list-unstyled small">
              {quickLinks.map(({ to, label }) => (
                <li className="mb-2" key={to}>
                  <Link to={to} className="text-muted text-decoration-none footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <address className="col-6 col-md-3">
            <h3 className="h6 fw-semibold mb-3">Contact</h3>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">
                <i className="bi bi-envelope me-2" aria-hidden="true" />
                <a 
                  href={`mailto:${siteConfig.contact.email}`} 
                  className="text-muted text-decoration-none"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2" aria-hidden="true" />
                <a 
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} 
                  className="text-muted text-decoration-none"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2" aria-hidden="true" />
                {siteConfig.contact.location}
              </li>
            </ul>
          </address>

          {/* Social Links */}
          <div className="col-12 col-md-3">
            <h3 className="h6 fw-semibold mb-3">Follow Us</h3>
            <div className="d-flex gap-3" role="list" aria-label="Social media links">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted fs-5 footer-social-link"
                  aria-label={`Follow us on ${label}`}
                  role="listitem"
                >
                  <i className={`bi ${icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="small text-muted mb-0">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
            <p className="small text-muted mb-0">
              {siteConfig.contact.address}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
