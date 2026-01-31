import PropTypes from 'prop-types';

/**
 * Testimonial card with rating, quote, and author attribution
 */
export default function TestimonialCard({ testimonial }) {
  const { rating, quote, author, role } = testimonial;

  return (
    <article className="testimonial-card" aria-label={`Testimonial from ${author}`}>
      {/* Rating Stars */}
      <div 
        className="testimonial-rating mb-3" 
        role="img" 
        aria-label={`${rating} out of 5 stars`}
      >
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} me-1`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-4">
        <p className="testimonial-quote mb-0">"{quote}"</p>
      </blockquote>

      {/* Author */}
      <footer className="d-flex align-items-center">
        <div className="testimonial-avatar me-3" aria-hidden="true">
          <span>{author.charAt(0)}</span>
        </div>
        <div>
          <cite className="fw-semibold mb-0 small d-block not-italic">
            {author}
          </cite>
          <p className="text-muted mb-0 small">{role}</p>
        </div>
      </footer>
    </article>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number,
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    role: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};
