import PropTypes from 'prop-types';
import YouTubeEmbed from './YouTubeEmbed';

/**
 * Client show section with description, episode videos, and Spotify link
 */
export default function ClientShow({ client }) {
  const { name, description, episodes, spotifyShowUrl } = client;
  const clientId = `client-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <article className="ht-client-show mb-5" aria-labelledby={clientId}>
      <header className="ht-client-header">
        <div className="ht-client-header-top">
          <h3 id={clientId} className="ht-client-name">
            {name}
          </h3>
          {spotifyShowUrl && (
            <a
              href={spotifyShowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ht-spotify-btn"
              aria-label={`Listen to ${name} on Spotify`}
            >
              {/* Spotify icon SVG — no external dependency needed */}
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="ht-spotify-icon"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </a>
          )}
        </div>
        <p className="ht-client-description">{description}</p>
      </header>

      <div className="row g-4">
        {episodes.map((episode, index) => (
          <div className="col-12 col-md-6" key={episode.youtubeId || index}>
            <YouTubeEmbed
              videoId={episode.youtubeId}
              title={episode.title}
            />
            <p className="ht-episode-title">{episode.title}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

ClientShow.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    spotifyShowUrl: PropTypes.string,
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        youtubeId: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};