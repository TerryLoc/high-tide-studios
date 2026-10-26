import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from '../components/AnimatedSection';
import {
  businessPackages,
  onLocationPackages,
  packages,
} from '../data/packages';
import PackageCard from '../components/PackageCard';

const TABS = [
  { id: 'individual', label: 'For Individuals & Creators', data: packages },
  { id: 'business', label: 'For Business', data: businessPackages },
  { id: 'on-location', label: 'On Location', data: onLocationPackages },
];

const INTRO_OFFER_KEY = 'ht_intro_offer_seen';
const INTRO_OFFER_DEADLINE = new Date('2027-01-01T00:00:00Z'); // midnight end of 31 Dec 2026, Irish time (GMT)

const modalStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 10000,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    overflowY: 'auto',
  },
  box: {
    position: 'relative',
    width: '100%',
    maxWidth: '560px',
    maxHeight: '92vh',
    overflow: 'hidden auto',
    background: 'radial-gradient(circle at center, #1A1200 0%, #0A0A0A 100%)',
    color: '#FFFFFF',
    border: '1px solid #C49648',
    borderRadius: '12px',
    padding: '2.25rem 1.75rem 1.75rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
  },
  close: {
    position: 'absolute',
    top: '0.6rem',
    right: '0.9rem',
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '1.9rem',
    lineHeight: 1,
    cursor: 'pointer',
  },
  heading: {
    color: '#C49648',
    fontSize: '1.6rem',
    marginBottom: '1rem',
    paddingRight: '1.5rem',
  },
  ribbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: '#C49648',
  },
  body: { color: '#FFFFFF', marginBottom: '0.75rem', lineHeight: 1.55 },
  price: { color: '#C49648', fontWeight: 700 },
  checklist: { listStyle: 'none', padding: 0, margin: '0 0 0.75rem' },
  check: { color: '#C49648', fontWeight: 700, marginRight: '0.5rem' },
  tagline: { color: '#999999', fontStyle: 'italic', marginBottom: '1.25rem' },
  divider: {
    height: '1px',
    background: 'rgba(196, 150, 72, 0.3)',
    margin: '1.25rem 0 1rem',
  },
  terms: {
    color: '#666666',
    fontSize: '0.7rem',
    lineHeight: 1.5,
    margin: '0 0 1.25rem',
  },
  validity: {
    color: '#999999',
    fontSize: '0.8rem',
    textAlign: 'center',
    marginBottom: '0.6rem',
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    background: 'linear-gradient(to right, #B8860B, #C49648, #B8860B)',
    color: '#0A0A0A',
    fontWeight: 700,
    letterSpacing: '0.1em',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  secondary: {
    display: 'block',
    margin: '0.9rem auto 0',
    background: 'none',
    border: 'none',
    color: '#C49648',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

function IntroOfferModal() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const requested = location.state?.showOffer === true;

  useEffect(() => {
    if (new Date() >= INTRO_OFFER_DEADLINE) return;
    // The banner link asks for the offer explicitly, even if already seen.
    if (requested) {
      setOpen(true);
      navigate(location.pathname, { replace: true, state: null });
      return;
    }
    try {
      if (!sessionStorage.getItem(INTRO_OFFER_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [requested]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => {
    try {
      sessionStorage.setItem(INTRO_OFFER_KEY, '1');
    } catch {
      // storage unavailable; modal simply may reappear next visit
    }
    setOpen(false);
  };

  const viewPackages = () => {
    close();
    setTimeout(
      () =>
        document
          .getElementById('packages')
          ?.scrollIntoView({ behavior: 'smooth' }),
      50,
    );
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="ht-modal-overlay"
      style={modalStyles.overlay}
      onClick={close}>
      <div
        className="ht-modal-box"
        style={modalStyles.box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ht-modal-title"
        onClick={(e) => e.stopPropagation()}>
        <style>{`.ht-modal-secondary:hover, .ht-modal-secondary:focus-visible { text-decoration: underline !important; }`}</style>
        <div style={modalStyles.ribbon} aria-hidden="true" />
        <button
          type="button"
          className="ht-modal-close"
          style={modalStyles.close}
          aria-label="Close offer"
          onClick={close}>
          ×
        </button>
        <h2 id="ht-modal-title" style={modalStyles.heading}>
          Studio Special — Podcast Production
        </h2>
        <p style={modalStyles.body}>
          Six fully edited episodes{' '}
          <span style={modalStyles.price}>from €950 + VAT</span>
          <br />
          Four episodes <span style={modalStyles.price}>from €650 + VAT</span>
        </p>
        <ul style={modalStyles.checklist}>
          {['Three cameras', 'Broadcast audio', 'Social reels included'].map(
            (item) => (
              <li key={item}>
                <span style={modalStyles.check} aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ),
          )}
        </ul>
        <p style={modalStyles.tagline}>
          Step off the DART in Greystones. One session, everything handled.
        </p>
        <div style={modalStyles.divider} aria-hidden="true" />
        <p style={modalStyles.terms}>
          Terms &amp; Conditions: This introductory offer is available to new
          clients and to existing High Tide Studios clients booking their first
          podcast production session. It applies to the first podcast session
          only. The four-episode package (€650 + VAT) may be upgraded to six
          episodes at a later date — the client pays the difference to reach
          the six-episode rate of €950 + VAT, not the full six-episode price
          again. Clients who book the six-episode package first at €950 + VAT
          are not eligible for the introductory rate on that booking. This
          offer cannot be combined with any other discount or promotion. High
          Tide Studios reserves the right to withdraw this offer at any time
          prior to the deadline. Booking by 31st December 2026 confirms
          acceptance of these terms.
        </p>
        <p style={modalStyles.validity}>
          Available until 31st December 2026 · New &amp; returning clients
        </p>
        <Link
          to="/contact?enquiry=podcast-intro"
          style={modalStyles.cta}
          onClick={close}>
          Book Your Session
        </Link>
        <button
          type="button"
          className="ht-modal-secondary"
          style={modalStyles.secondary}
          onClick={viewPackages}>
          View all packages ↓
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('individual');
  const visiblePackages =
    TABS.find((tab) => tab.id === activeTab)?.data || packages;

  return (
    <>
      <SEO page="services" />
      <IntroOfferModal />

      {/* Hero Section */}
      <section className="ht-services-hero text-center">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">What We Do</p>
            <h1 className="ht-services-title">
              Podcast &amp; Video Production in Greystones, Wicklow
            </h1>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-services-lead">
              Podcasts, video and audio production — shaped around the story
              you're telling, not just the equipment we use.
            </p>
            <p className="ht-services-price-teaser">Packages from €230</p>
          </FadeInUp>
        </div>
      </section>

      {/* Packages Section */}
      <section className="ht-packages-section py-5" id="packages">
        <div className="container">
          <div
            className="ht-services-tabs"
            role="tablist"
            aria-label="Service package type">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`ht-services-tab ${activeTab === tab.id ? 'ht-services-tab--active' : ''}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="services-packages-panel"
                id={`services-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div
            id="services-packages-panel"
            role="tabpanel"
            aria-labelledby={`services-tab-${activeTab}`}>
            <StaggerContainer
              key={activeTab}
              className="row g-4 align-items-stretch">
              {visiblePackages.map((pkg, i) => (
                <StaggerItem
                  className="col-12 col-md-6 col-lg-4"
                  key={pkg.id || i}>
                  <PackageCard
                    pkg={pkg}
                    featured={pkg.badge === 'Best Value'}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
