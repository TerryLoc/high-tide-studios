import PropTypes from 'prop-types';
import YouTubeEmbed from './YouTubeEmbed';

/**
 * Client show section with description and episode videos
 */
export default function ClientShow({ client }) {
  const { name, description, episodes } = client;

  return (
    <article className="mb-5" aria-labelledby={`client-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      <header>
        <h3 
          id={`client-${name.replace(/\s+/g, '-').toLowerCase()}`} 
          className="h4 fw-bold"
        >
          {name}
        </h3>
        <p className="text-muted">{description}</p>
      </header>

      <div className="row g-4">
        {episodes.map((episode, index) => (
          <div className="col-12 col-md-6" key={episode.youtubeId || index}>
            <YouTubeEmbed 
              videoId={episode.youtubeId} 
              title={episode.title}
            />
            <p className="small text-muted">{episode.title}</p>
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
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        youtubeId: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
