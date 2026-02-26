import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { FadeInUp } from '../components/AnimatedSection';
import '../styles/not-found.css'; // Import specific styles for the 404 page

/**
 * 404 Not Found page
 * Styled to match High Tide Studios brand — cinematic dark theme with audio motif
 */
export default function NotFound() {
  const barsRef = useRef(null);

  // Animate soundwave bars on mount
  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.ht-bar');
    if (!bars) return;
    bars.forEach((bar, i) => {
      bar.style.animationDelay = `${i * 0.08}s`;
    });
  }, []);

  return (
    <>
      <SEO
        title="Page Not Found | High Tide Studios"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex
      />

      <section className="ht-404-section" aria-labelledby="error-title">

        {/* Ghost watermark number */}
        <div className="ht-ghost-number" aria-hidden="true">404</div>

        <div className="ht-404-card">
          <FadeInUp>

            {/* Animated soundwave */}
            <div className="ht-soundwave" ref={barsRef} aria-hidden="true">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="ht-bar" />
              ))}
            </div>

            <p className="ht-eyebrow">Error 404</p>

            <h1 id="error-title" className="ht-headline">
              This frequency<br />is off the air
            </h1>

            <div className="ht-divider" />

            <p className="ht-subtext">
              The page you're looking for has gone silent — it may have been
              moved, renamed, or never existed. Let's get you back on air.
            </p>

            <div className="ht-btn-group">
              <Link to="/" className="ht-btn-primary">
                <i className="bi bi-house" aria-hidden="true" />
                Back to Home
              </Link>
              <Link to="/contact" className="ht-btn-outline">
                <i className="bi bi-envelope" aria-hidden="true" />
                Contact Us
              </Link>
            </div>

            <p className="ht-studio-tag">
              High Tide Studios &nbsp;<span>·</span>&nbsp; Podcast &amp; Video Production
            </p>

          </FadeInUp>
        </div>
      </section>
    </>
  );
}