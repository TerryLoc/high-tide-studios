import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Package card component for displaying service offerings
 * @param {Object} pkg - Package data object
 * @param {boolean} featured - Whether to highlight this package
 */
export default function PackageCard({ pkg, featured = false }) {
  // Map package id to hover color class
  const hoverColorClass = {
    bronze: 'package-hover-bronze',
    silver: 'package-hover-silver',
    gold: 'package-hover-gold',
  }[pkg.id] || '';

  return (
    <article 
      className={`card h-100 shadow-sm package-card ${hoverColorClass} ${featured ? 'border-dark border-2' : ''}`}
      aria-label={`${pkg.title} package - ${pkg.price}`}
    >
      {pkg.badge && (
        <div className="card-header bg-dark text-white text-center py-2">
          <span className="badge-text fw-semibold small">{pkg.badge}</span>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <header>
          <h3 className="h4 fw-bold mb-1">{pkg.title}</h3>
          <p className="text-muted small mb-3">{pkg.subtitle}</p>
        </header>

        <div className="mb-3" aria-label="Pricing">
          <span className="fs-3 fw-bold text-dark">{pkg.price}</span>
          {pkg.originalPrice && (
            <span className="text-muted text-decoration-line-through ms-2">
              <span className="visually-hidden">Originally </span>
              {pkg.originalPrice}
            </span>
          )}
        </div>

        <p className="small mb-3">{pkg.description}</p>

        <ul className="package-features small flex-grow-1" aria-label="Package features">
          {pkg.features.map((feature, index) => (
            <li key={`${pkg.id}-feature-${index}`}>
              <i className="bi bi-check2 text-success me-2" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        {pkg.note && (
          <p className="small text-muted fst-italic mb-3">
            <i className="bi bi-info-circle me-1" aria-hidden="true" />
            {pkg.note}
          </p>
        )}

        {pkg.whoFor && (
          <div className="small mb-3 pt-2 border-top">
            <p className="fw-semibold mb-1 text-dark">
              <i className="bi bi-person-check me-1" aria-hidden="true" />
              Who this is for
            </p>
            <p className="text-muted mb-0">{pkg.whoFor}</p>
          </div>
        )}

        <Link
          to={`/booking?package=${pkg.id}`}
          className="btn btn-dark w-100"
          aria-label={`Book ${pkg.title} package`}
        >
          <i className="bi bi-calendar-check me-2" aria-hidden="true" />
          Book Now
        </Link>
      </div>
    </article>
  );
}

PackageCard.propTypes = {
  pkg: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    price: PropTypes.string.isRequired,
    originalPrice: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    note: PropTypes.string,
    whoFor: PropTypes.string,
    badge: PropTypes.string,
  }).isRequired,
  featured: PropTypes.bool,
};
