import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function AnnouncementBanner() {
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
        <Link
          to="/services"
          state={{ showOffer: true }}
          className="ht-banner-link">
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
