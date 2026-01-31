import { clients, studioPromo } from "../data/clients";
import YouTubeEmbed from "../components/YouTubeEmbed";
import ClientShow from "../components/ClientShow";
import SEO from "../components/SEO";
import { FadeInUp } from "../components/AnimatedSection";

export default function Clients() {
  // Check if there are valid videos to show
  const hasStudioPromo = studioPromo.youtubeId && !studioPromo.youtubeId.includes('YOUR_') && !studioPromo.youtubeId.includes('YOUTUBE_ID');
  const hasClients = clients.some(client => 
    client.episodes.some(ep => ep.youtubeId && !ep.youtubeId.includes('YOUTUBE_ID'))
  );

  return (
    <>
      <SEO page="clients" />
      
      {/* Hero Section */}
      <section className="hero-main text-center">
        <div className="container">
          <FadeInUp>
            <p className="text-uppercase small opacity-75 mb-2">Portfolio</p>
            <h1 className="display-5 fw-bold mb-3">Our Work</h1>
            <p className="lead">
              A selection of shows and creators recorded at High Tide Studios.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="container py-5">
        {/* Studio Promo */}
        {hasStudioPromo && (
          <div className="mb-5">
            <h3 className="mb-3">The Studio</h3>
            <YouTubeEmbed videoId={studioPromo.youtubeId} />
          </div>
        )}

        {/* Client Shows */}
        {hasClients ? (
          <div>
            <h3 className="mb-4">Client Episodes</h3>
            {clients.map((client, i) => (
              <ClientShow key={i} client={client} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-camera-video fs-1 text-muted"></i>
            </div>
            <h3 className="fw-bold mb-3">Coming Soon</h3>
            <p className="text-muted">
              We're currently working with amazing creators. Check back soon to see their work!
            </p>
          </div>
        )}
      </section>
    </>
  );
}
