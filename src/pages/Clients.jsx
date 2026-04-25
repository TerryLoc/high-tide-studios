import { clients, reelsClips, studioPromo } from "../data/clients";
import YouTubeEmbed from "../components/YouTubeEmbed";
import ClientShow from "../components/ClientShow";
import SEO from "../components/SEO";
import { FadeInUp } from "../components/AnimatedSection";

export default function Clients() {
  const hasStudioPromo =
    studioPromo.youtubeId &&
    !studioPromo.youtubeId.includes('YOUR_') &&
    !studioPromo.youtubeId.includes('YOUTUBE_ID');

  const hasClients = clients.some(client =>
    client.episodes.some(ep => ep.youtubeId && !ep.youtubeId.includes('YOUTUBE_ID'))
  );

  const featuredClips = reelsClips.filter(clip =>
    clip.youtubeId &&
    !clip.youtubeId.includes('YOUR_') &&
    !clip.youtubeId.includes('YOUTUBE_ID')
  );

  return (
    <>
      <SEO page="clients" />

      {/* Reels and Clips */}
      <section className="ht-clients-reels py-5">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">Reels &amp; Clips</p>
            <h2 className="ht-section-title mb-2">Show Highlights</h2>
            <div className="ht-section-divider mb-3" aria-hidden="true" />
            <p className="ht-muted-text mb-4">
              Quick highlight cuts from different shows recorded at High Tide Studios.
            </p>
          </FadeInUp>

          {featuredClips.length > 0 ? (
            <div className="row g-4">
              {featuredClips.map((clip, i) => (
                <div key={`${clip.showName}-${clip.youtubeId}-${i}`} className="col-12 col-md-6 col-xl-4">
                  <article className="ht-reel-card h-100">
                    <p className="ht-reel-show mb-2">{clip.showName}</p>
                    <h3 className="ht-reel-title">{clip.clipTitle}</h3>
                    <YouTubeEmbed
                      videoId={clip.youtubeId}
                      title={clip.clipTitle}
                      fallbackThumbnail={clip.fallbackThumbnail}
                      preferFallbackThumbnail={clip.preferFallbackThumbnail}
                    />
                  </article>
                </div>
              ))}
            </div>
          ) : (
            <div className="ht-clients-empty text-center py-4">
              <p className="ht-muted-text mb-0">Add clip entries in `src/data/clients.js` to publish your reels here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Hero Section */}
      <section className="ht-clients-hero text-center">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">Portfolio</p>
            <h1 className="ht-clients-title">Our Work</h1>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-clients-lead">
              A selection of shows and creators recorded at High Tide Studios.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Main content */}
      <section className="ht-clients-body py-5">
        <div className="container">

          {/* Studio Promo */}
          {hasStudioPromo && (
            <div className="ht-clients-promo mb-5">
              <p className="ht-eyebrow">The Studio</p>
              <h2 className="ht-section-title mb-4">Inside High Tide Studios</h2>
              <div className="ht-section-divider mb-4" aria-hidden="true" />
              <YouTubeEmbed videoId={studioPromo.youtubeId} />
            </div>
          )}

          {/* Client Shows */}
          {hasClients ? (
            <div className="ht-clients-list">
              <p className="ht-eyebrow">Client Episodes</p>
              <h2 className="ht-section-title mb-2">Featured Shows</h2>
              <div className="ht-section-divider mb-5" aria-hidden="true" />
              {clients.map((client, i) => (
                <ClientShow key={i} client={client} />
              ))}
            </div>
          ) : (
            <div className="ht-clients-empty text-center py-5">
              <i className="bi bi-camera-video ht-empty-icon" aria-hidden="true" />
              <h3 className="ht-section-title mt-4 mb-3">Coming Soon</h3>
              <p className="ht-muted-text">
                We're currently working with amazing creators. Check back soon to see their work!
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}