import { useState, useCallback } from 'react';
import '../styles/yt-embed.css';
import PropTypes from 'prop-types';

/**
 * Lazy-loaded YouTube embed with thumbnail preview
 * Improves page load performance by deferring iframe until user interaction
 */
export default function YouTubeEmbed({ videoId, title = 'Video' }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  // Show thumbnail with play button until clicked
  return (
    <div className="yt-embed-wrapper mb-3">
      {!isLoaded ? (
        <button
          onClick={handleLoad}
          className="youtube-thumbnail-btn"
          aria-label={`Play video: ${title}`}
          style={{
            background: `url(${thumbnailUrl}) center/cover no-repeat`,
            border: 'none',
            cursor: 'pointer',
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'var(--hts-radius-lg)',
          }}
        >
          <span className="youtube-play-icon" aria-hidden="true">
            <svg height="100%" viewBox="0 0 68 48" width="100%">
              <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              />
              <path d="M 45,24 27,14 27,34" fill="#fff" />
            </svg>
          </span>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 'var(--hts-radius-lg)',
          }}
        />
      )}
    </div>
  );
}

YouTubeEmbed.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string,
};
