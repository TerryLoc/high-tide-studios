import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/promo-video.css';

/**
 * Lazy, click-to-play self-hosted video with a poster preview.
 * Defers the (large) video download until the user actually wants
 * to watch it, keeping initial page weight and LCP low.
 */
export default function PromoVideo({
  sources,
  poster,
  title,
  caption,
  durationLabel,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <figure className="promo-video-wrapper mx-auto">
      <div className="promo-video-frame">
        {!isPlaying ? (
          <button
            type="button"
            onClick={handlePlay}
            className="promo-video-poster-btn"
            aria-label={`Play video: ${title}`}>
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              className="promo-video-poster-img"
              loading="lazy"
              width="1280"
              height="720"
            />
            <span className="promo-video-play-icon" aria-hidden="true">
              <svg viewBox="0 0 68 48" width="100%" height="100%">
                <path
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="rgba(246, 245, 241, 0.94)"
                />
                <path d="M 45,24 27,14 27,34" fill="#1b2831" />
              </svg>
            </span>
            {durationLabel && (
              <span className="promo-video-duration">{durationLabel}</span>
            )}
          </button>
        ) : (
          <video
            className="promo-video-player"
            controls
            autoPlay
            playsInline
            preload="none"
            poster={poster}
            title={title}>
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
            Your browser does not support embedded video.
          </video>
        )}
      </div>
      {caption && (
        <figcaption className="promo-video-caption">{caption}</figcaption>
      )}
    </figure>
  );
}

PromoVideo.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  durationLabel: PropTypes.string,
};
