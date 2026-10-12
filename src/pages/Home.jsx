import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { brandVision } from '../data/about';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';
import SEO from '../components/SEO';
import YouTubeEmbed from '../components/YouTubeEmbed';
import {
  FadeInUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '../components/AnimatedSection';
import { features } from '../data/about';
import '../styles/home.css';

const BANNER_KEY = 'ht_banner_dismissed';
const BANNER_DEADLINE = new Date('2027-01-01T00:00:00Z').getTime(); // midnight end of 31 Dec 2026, Irish time (GMT)

const getTimeLeft = () => {
  const diff = BANNER_DEADLINE - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
};

function AnnouncementBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return !!sessionStorage.getItem(BANNER_KEY);
    } catch {
      return false;
    }
  });
  const bannerRef = useRef(null);
  const visible = !dismissed && timeLeft !== null;

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Publish the banner height so the fixed navbar and page content sit below it.
  useEffect(() => {
    const el = bannerRef.current;
    if (!visible || !el) return undefined;
    const root = document.documentElement;
    const update = () =>
      root.style.setProperty('--ht-banner-h', `${el.offsetHeight}px`);
    update();
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
      root.style.removeProperty('--ht-banner-h');
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(BANNER_KEY, '1');
    } catch {
      // storage unavailable; banner hides for this page view only
    }
    setDismissed(true);
  };

  return (
    <>
      <style>{`
        .navbar.fixed-top { top: var(--ht-banner-h, 0px) !important; }
        main { padding-top: calc(76px + var(--ht-banner-h, 0px)) !important; }
        .ht-banner-link { color: #C49648; font-weight: 700; text-decoration: none; white-space: nowrap; }
        .ht-banner-link:hover, .ht-banner-link:focus-visible { color: #C49648; text-decoration: underline; }
        .ht-banner-label { font-variant: small-caps; letter-spacing: 0.15em; color: #C49648; font-weight: 700; }
        .ht-banner-sep { color: #C49648; margin: 0 0.35em; }
        .ht-banner-pill { display: inline-block; background: #0A0A0A; color: #C49648; border-radius: 4px; padding: 2px 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 1.05em; margin: 0 1px; }
      `}</style>
      <div
        ref={bannerRef}
        className="ht-banner"
        role="region"
        aria-label="Studio special"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1040,
          background:
            'linear-gradient(to right, #1A1200 0%, #5A4420 50%, #1A1200 100%)',
          color: '#FFFFFF',
          fontWeight: 600,
          textAlign: 'center',
          fontSize: '0.9rem',
          padding: '0.5rem 3.25rem 0.5rem 1rem',
        }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(196, 150, 72, 0.2)',
          }}
        />
        <span className="ht-banner-label">✦ Studio Special</span>
        <span className="ht-banner-sep">·</span>
        Podcast packages from €650 + VAT
        <span className="ht-banner-sep">·</span>
        {[
          [timeLeft.d, 'd'],
          [timeLeft.h, 'h'],
          [timeLeft.m, 'm'],
          [timeLeft.s, 's'],
        ].map(([value, unit]) => (
          <span key={unit} className="ht-banner-pill">
            {String(value).padStart(2, '0')}
            {unit}
          </span>
        ))}{' '}
        remaining
        <span className="ht-banner-sep">·</span>
        <Link to="/services#packages" className="ht-banner-link">
          Book Now →
        </Link>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={dismiss}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '3rem',
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '1.6rem',
            lineHeight: 1,
            cursor: 'pointer',
          }}>
          ×
        </button>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(196, 150, 72, 0.2)',
          }}
        />
      </div>
    </>
  );
}

export default function Home() {
  const barsRef = useRef(null);

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.ht-hero-bar');
    if (!bars) return;
    bars.forEach((bar, i) => {
      bar.style.animationDelay = `${i * 0.08}s`;
    });
  }, []);

  return (
    <>
      <SEO page="home" />
      <AnnouncementBanner />

      {/* ── Hero: Logo over animated soundwave ── */}
      <section className="ht-hero-image-section" aria-label="High Tide Studios">
        <div className="ht-hero-glow" aria-hidden="true" />
        <div className="ht-hero-wave-bg" ref={barsRef} aria-hidden="true">
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className="ht-hero-bar" />
          ))}
        </div>
        <div className="ht-hero-logo-wrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/main_logo.png`}
            alt="High Tide Studios"
            className="ht-hero-logo"
          />
        </div>
      </section>

      {/* Hero Content */}
      <section className="ht-hero-content text-center py-5">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">
              Podcast, Video &amp; Storytelling · Greystones
            </p>
            <h1 className="ht-hero-title">High Tide Studios</h1>
            <div className="ht-title-divider" aria-hidden="true" />
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="ht-hero-lead">
              Your story deserves to be heard clearly. This is where that
              happens.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/services" className="ht-btn-primary">
                <i className="bi bi-calendar-check" aria-hidden="true" />
                Our Services
              </Link>
              <Link to="/clients" className="ht-btn-outline">
                <i className="bi bi-play-circle" aria-hidden="true" />
                View Our Work
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Brand Vision */}
      <section id="studio-video" className="ht-brand-vision py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <FadeInUp>
                <p className="ht-eyebrow text-center">Our Philosophy</p>
                <h2 className="ht-section-title text-center">
                  {brandVision.title}
                </h2>
                <div
                  className="ht-section-divider mx-auto"
                  aria-hidden="true"
                />
              </FadeInUp>
              <FadeIn delay={0.2}>
                <div className="ht-brand-vision-content">
                  {brandVision.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={`ht-body-text ${i === 0 ? 'ht-body-text--lead' : ''} mb-4`}>
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
            <StaggerItem className="col-12 col-md-8 mt-4">
              <YouTubeEmbed
                videoId="JDKTdv_gKhg"
                title="High Tide Studios Tour"
              />
            </StaggerItem>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ht-features py-5">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <p className="ht-eyebrow">What We Offer</p>
              <h2 className="ht-section-title">Studio Features</h2>
              <div className="ht-section-divider mx-auto" aria-hidden="true" />
              <p className="ht-muted-text mt-3">
                Everything here is built to help you focus on the conversation
                not the equipment.
              </p>
            </div>
          </FadeInUp>
          <StaggerContainer className="row g-4">
            <StaggerItem className="col-12 col-md-4">
              <div className="ht-feature-card h-100">
                <div className="ht-feature-image-wrapper mb-3">
                  <img
                    src="/images/rodecasterproii.webp"
                    alt="Rodecaster Pro II audio equipment"
                    className="ht-feature-image"
                    loading="lazy"
                  />
                </div>
                <h5 className="ht-feature-title">Professional Audio</h5>
                <p className="ht-muted-text small mb-0">
                  Multi-mic studio recording with broadcast-quality mastering
                  and noise reduction
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="ht-feature-card h-100">
                <div className="ht-feature-image-wrapper mb-3">
                  <img
                    src="/images/rodecastervideo.webp"
                    alt="Rodecaster video production equipment"
                    className="ht-feature-image"
                    loading="lazy"
                  />
                </div>
                <h5 className="ht-feature-title">Video Production</h5>
                <p className="ht-muted-text small mb-0">
                  Cinematic lighting and multi-camera setups that keep the focus
                  on you
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="ht-feature-card h-100">
                <div className="ht-feature-image-wrapper mb-3">
                  <img
                    src="/images/tech_desk.webp"
                    alt="Professional technical desk setup"
                    className="ht-feature-image"
                    loading="lazy"
                  />
                </div>
                <h5 className="ht-feature-title">Expert Mixing</h5>
                <p className="ht-muted-text small mb-0">
                  Professional audio engineering, so every recording sounds as
                  clear as the conversation felt
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12">
              <div className="ht-feature-card ht-feature-card--equipment">
                <h5 className="ht-feature-title mb-3">
                  Studio Equipment &amp; Facilities
                </h5>
                <ul className="ht-equipment-list">
                  {features.map((feature, i) => (
                    <li key={i} className="ht-equipment-item">
                      <i
                        className="bi bi-check2 ht-check-icon"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ht-testimonials py-5">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <p className="ht-eyebrow">Client Stories</p>
              <h2 className="ht-section-title">What Our Clients Say</h2>
              <div className="ht-section-divider mx-auto" aria-hidden="true" />
              <p className="ht-muted-text mt-3">
                Trusted by podcasters and content creators across Ireland
              </p>
            </div>
          </FadeInUp>
          <StaggerContainer className="row g-4">
            {testimonials.map((testimonial, i) => (
              <StaggerItem
                className="col-12 col-md-4"
                key={testimonial.id || i}>
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery */}
      <section className="ht-gallery py-5">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <p className="ht-eyebrow">Behind the Glass</p>
              <h2 className="ht-section-title">Our Studio</h2>
              <div className="ht-section-divider mx-auto" aria-hidden="true" />
              <p className="ht-muted-text mt-3">
                A calm space, built for people who take their work seriously
              </p>
            </div>
          </FadeInUp>
          <StaggerContainer className="row g-3">
            <StaggerItem className="col-12 col-md-8">
              <div className="ht-gallery-item ht-gallery-item--large">
                <img
                  src="/images/lights.webp"
                  alt="Professional studio lighting setup"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Studio Lighting</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="ht-gallery-item">
                <img
                  src="/images/mic2.webp"
                  alt="Professional microphone setup"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Podcast Mic</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-4">
              <div className="ht-gallery-item">
                <img
                  src="/images/camera.webp"
                  alt="Professional video camera"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Camera Equipment</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-4">
              <div className="ht-gallery-item">
                <img
                  src="/images/mac.webp"
                  alt="Mac editing workstation"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Editing Suite</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="ht-gallery-item">
                <img
                  src="/images/becs_working.webp"
                  alt="Producer at work"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Production in Action</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="ht-gallery-item">
                <img
                  src="/images/studio_s1.webp"
                  alt="Studio environment"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Studio Space</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="ht-gallery-item">
                <img
                  src="/images/studio_s2.webp"
                  alt="Recording area"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Recording Area</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="ht-gallery-item">
                <img
                  src="/images/studio_s3.webp"
                  alt="Studio booth"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Set Design</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="ht-gallery-item">
                <img
                  src="/images/studio_s4.webp"
                  alt="Production environment"
                  className="ht-gallery-image"
                  loading="lazy"
                />
                <div className="ht-gallery-overlay">
                  <span className="ht-gallery-label">Production Space</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="ht-cta py-5">
        <div className="container text-center">
          <FadeInUp>
            <p className="ht-eyebrow">Start Here</p>
            <h2 className="ht-cta-title">Let's Start With a Conversation</h2>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-cta-lead">
              No pitch, no pressure — just a conversation about your story and
              where it could go.
            </p>
            <Link
              to="/contact"
              className="ht-btn-primary ht-btn-primary--light">
              <i className="bi bi-envelope" aria-hidden="true" />
              Tell Us Your Story
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
