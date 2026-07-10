import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'hts_cookie_consent';
const COOKIE_CONSENT_VERSION = '2026-07-02';

const createConsent = (media) => ({
  version: COOKIE_CONSENT_VERSION,
  essential: true,
  media,
  updatedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
});

const readConsent = () => {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    if (stored === 'accepted') return createConsent(true);
    if (stored === 'declined') return createConsent(false);

    const parsed = JSON.parse(stored);
    if (
      parsed?.version === COOKIE_CONSENT_VERSION &&
      typeof parsed.media === 'boolean' &&
      parsed.expiresAt &&
      new Date(parsed.expiresAt) > new Date()
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

const saveConsent = (media) => {
  const consent = createConsent(media);
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent('hts:cookie-consent-updated', { detail: consent }),
  );
  return consent;
};

/**
 * GDPR-compliant cookie consent banner
 * Shows on first visit, remembers user preference
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const openPreferences = () => setShowBanner(true);
    window.addEventListener('hts:open-cookie-preferences', openPreferences);
    return () =>
      window.removeEventListener(
        'hts:open-cookie-preferences',
        openPreferences,
      );
  }, []);

  const handleAcceptMedia = useCallback(() => {
    saveConsent(true);
    setShowBanner(false);
  }, []);

  const handleEssentialOnly = useCallback(() => {
    saveConsent(false);
    setShowBanner(false);
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
      aria-modal="false">
      <div className="container">
        <div className="cookie-consent-content">
          <div className="cookie-consent-text">
            <p id="cookie-consent-description" className="mb-2">
              We use essential storage to remember your choice. Optional
              embedded media from YouTube or Google Maps may set cookies only
              when you allow or load it.{' '}
              <Link to="/privacy" className="cookie-consent-link">
                Learn more
              </Link>
            </p>
            <p className="cookie-consent-note mb-0">
              No advertising or analytics cookies are currently used on this
              site.
            </p>
          </div>
          <div className="cookie-consent-buttons">
            <button
              onClick={handleEssentialOnly}
              className="btn btn-outline-light btn-sm me-2"
              aria-label="Use essential cookies only">
              Essential only
            </button>
            <button
              onClick={handleAcceptMedia}
              className="btn btn-light btn-sm"
              aria-label="Allow optional embedded media cookies">
              Allow media
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

        .cookie-consent-note {
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.8rem;
        }

        .cookie-consent-link {
          color: var(--hts-accent-light, #d4bc7a);
          text-decoration: underline;
        }

        .cookie-consent-link:hover {
          color: #fff;
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
 * Utility function to check if user has allowed optional embedded media cookies
 * Can be used by other components to conditionally load tracking
 */
export function hasAcceptedCookies() {
  return readConsent()?.media === true;
}

export function hasAllowedMediaCookies() {
  return readConsent()?.media === true;
}
