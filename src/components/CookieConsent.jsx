import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'hts_cookie_consent';

/**
 * GDPR-compliant cookie consent banner
 * Shows on first visit, remembers user preference
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX - let page load first
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
    >
      <div className="container">
        <div className="cookie-consent-content">
          <div className="cookie-consent-text">
            <p id="cookie-consent-description" className="mb-2 mb-md-0">
              We use cookies to enhance your experience. By continuing to visit this site, 
              you agree to our use of cookies.{' '}
              <Link to="/privacy" className="cookie-consent-link">
                Learn more
              </Link>
            </p>
          </div>
          <div className="cookie-consent-buttons">
            <button
              onClick={handleDecline}
              className="btn btn-outline-light btn-sm me-2"
              aria-label="Decline cookies"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="btn btn-light btn-sm"
              aria-label="Accept cookies"
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cookie-consent {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(30, 30, 30, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 1rem 0;
          z-index: 9999;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .cookie-consent-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .cookie-consent-text {
          flex: 1;
          min-width: 280px;
          color: #fff;
          font-size: 0.9rem;
        }

        .cookie-consent-link {
          color: var(--primary, #7c3aed);
          text-decoration: underline;
        }

        .cookie-consent-link:hover {
          color: var(--primary-light, #a78bfa);
        }

        .cookie-consent-buttons {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .cookie-consent .btn-outline-light {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .cookie-consent .btn-outline-light:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 576px) {
          .cookie-consent-content {
            flex-direction: column;
            text-align: center;
          }

          .cookie-consent-buttons {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Utility function to check if user has accepted cookies
 * Can be used by other components to conditionally load tracking
 */
export function hasAcceptedCookies() {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
}
