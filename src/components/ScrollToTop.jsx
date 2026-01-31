import { useEffect, useState, useCallback } from 'react';

/**
 * Scroll to top button that appears after scrolling down
 * Includes smooth scroll and accessibility features
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    // Throttle scroll event for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus management for accessibility
    const mainContent = document.querySelector('main') || document.body;
    mainContent.focus();
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="btn btn-dark btn-scroll-top"
      aria-label="Scroll to top of page"
      type="button"
    >
      <i className="bi bi-arrow-up" aria-hidden="true" />
    </button>
  );
}
