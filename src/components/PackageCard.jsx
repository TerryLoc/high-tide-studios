import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Package card component for displaying service offerings
 */
export default function PackageCard({ pkg, featured = false }) {
  const tierClass = {
    bronze: 'ht-pkg-bronze',
    silver: 'ht-pkg-silver',
    gold:   'ht-pkg-gold',
  }[pkg.id] || '';

  return (
    <article
      className={`ht-pkg-card h-100 ${tierClass} ${featured ? 'ht-pkg-card--featured' : ''}`}
      aria-label={`${pkg.title} package — ${pkg.price}`}
    >
      {/* Tier accent bar at top */}
      <div className="ht-pkg-accent-bar" aria-hidden="true" />

      {pkg.badge && (
        <div className="ht-pkg-badge-row">
          <span className="ht-pkg-badge">{pkg.badge}</span>
        </div>
      )}

      <div className="ht-pkg-body">

        {/* Header */}
        <header className="ht-pkg-header">
          <p className="ht-pkg-tier-label">{pkg.title}</p>
          <h3 className="ht-pkg-subtitle">{pkg.subtitle}</h3>
        </header>

        {/* Price */}
        <div className="ht-pkg-price-row" aria-label="Pricing">
          <span className="ht-pkg-price">{pkg.price}</span>
          {pkg.originalPrice && (
            <span className="ht-pkg-original-price" aria-label={`Originally ${pkg.originalPrice}`}>
              {pkg.originalPrice}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="ht-pkg-description">{pkg.description}</p>

        {/* Features */}
        <ul className="ht-pkg-features" aria-label="Package features">
          {pkg.features.map((feature, index) => (
            <li key={`${pkg.id}-feature-${index}`} className="ht-pkg-feature-item">
              <i className="bi bi-check2 ht-pkg-check" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Note */}
        {pkg.note && (
          <p className="ht-pkg-note">
            <i className="bi bi-info-circle me-1" aria-hidden="true" />
            {pkg.note}
          </p>
        )}

        {/* Who it's for */}
        {pkg.whoFor && (
          <div className="ht-pkg-who-for">
            <p className="ht-pkg-who-label">
              <i className="bi bi-person-check me-1" aria-hidden="true" />
              Who this is for
            </p>
            <p className="ht-pkg-who-text">{pkg.whoFor}</p>
          </div>
        )}

        {/* CTA */}
        <Link
          to={`/booking?package=${pkg.id}`}
          className="ht-pkg-cta"
          aria-label={`Book ${pkg.title} package`}
        >
          <i className="bi bi-calendar-check" aria-hidden="true" />
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