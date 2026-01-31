import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FadeInUp } from '../components/AnimatedSection';

/**
 * 404 Not Found page
 * Provides user-friendly error message and navigation options
 */
export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | High Tide Studios"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex
      />
      <section className="container py-5 text-center" aria-labelledby="error-title">
        <div className="py-5">
          <FadeInUp>
            <p className="display-1 fw-bold text-muted" aria-hidden="true">
              404
            </p>
            <h1 id="error-title" className="h2 mb-4">Page Not Found</h1>
            <p className="lead text-muted mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/" className="btn btn-dark btn-lg">
                <i className="bi bi-house me-2" aria-hidden="true" />
                Back to Home
              </Link>
              <Link to="/contact" className="btn btn-outline-dark btn-lg">
                <i className="bi bi-envelope me-2" aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
