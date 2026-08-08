import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PromoVideo from '../components/PromoVideo';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from '../components/AnimatedSection';

const logoPath = '/images/voices_logo.png';
const nextGuestPath = '/images/next_guest.png';

const promoVideoSources = [
  { src: '/video/vog_promo.webm', type: 'video/webm' },
  { src: '/video/vog_promo.mp4', type: 'video/mp4' },
];
const promoVideoPoster = '/video/vog_promo_poster.jpg';
const voicesYoutubeUrl = 'https://www.youtube.com/@HighTideGreystones';
const voicesSpotifyUrl = 'https://open.spotify.com/show/0343sjacUgFoeDXU4vHtof';
const voicesAmazonMusicUrl =
  'https://music.amazon.com/podcasts/31b6549f-a952-4c08-af88-748efff00d4c/voices-of-greystones';
const voicesAcastUrl = 'https://shows.acast.com/voicesofgreystones';
const googleFormEmbedUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeiBoUx9peKR-MysCeklxtPY7braF6GTjXtk-AcukpgfpcCbg/viewform?embedded=true';

const freeFeatures = [
  'A warm welcome (and coffee!)',
  'Professionally recorded and edited',
  'No experience needed',
  'We guide the conversation',
  'Fully edited episode',
  'Social media clips to share',
];

const storyIdeas = [
  'A turning point in your life',
  'A journey that changed your life',
  'Growing up in Greystones',
  'Starting a local business',
  'A family tradition',
  'A sporting achievement',
  'Overcoming adversity',
  'Funny local memories',
  'Hidden local history',
  'Community heroes',
  'Musicians',
  'Artists',
  'Makers',
  'Volunteers',
  'People making Greystones special',
];

const studioServices = [
  'Podcasts',
  'Video Podcasts',
  'Commercial Video',
  'Corporate Content',
  'Voiceovers',
  'Audio Production',
  'Creative Projects',
];

const faqs = [
  {
    question: 'Do I need podcast experience?',
    answer:
      'No experience is needed at all. We guide the conversation naturally so you can just be yourself.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. Voices of Greystones is a free community storytelling project and there is no charge to take part.',
  },
  {
    question: 'Can I nominate someone else?',
    answer:
      'Absolutely. If someone in your life has a brilliant story, you can nominate them using the same form.',
  },
  {
    question: 'Can I promote my business?',
    answer:
      'If your business story connects to your personal journey or community impact, we are happy to explore it.',
  },
  {
    question: 'How long does recording take?',
    answer:
      'Most sessions run between 45 and 90 minutes, depending on the story and pace of the conversation.',
  },
  {
    question: 'Will I receive clips?',
    answer:
      'Yes, where suitable we can share selected clips for social media once the episode is scheduled.',
  },
  {
    question: 'Can families appear together?',
    answer:
      'Yes. Family and group stories are welcome if they are a good fit for the format and recording setup.',
  },
  {
    question: 'Why are you doing this for free?',
    answer:
      "Because we believe these conversations are worth preserving. Voices of Greystones is our way of giving something back to the community while showing what's possible from High Tide Studios.",
  },
];

const vogFaqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const vogVideoSchema = {
  name: 'Voices of Greystones | Every Stone Has a Story',
  description:
    'A short introduction to Voices of Greystones, a free community storytelling podcast recorded at High Tide Studios in Greystones, County Wicklow.',
  thumbnailUrl: promoVideoPoster,
  uploadDate: '2026-07-23',
  duration: 'PT56S',
  contentUrl: '/video/vog_promo.mp4',
};

function RopeDivider() {
  return (
    <div className="vog-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" role="presentation">
        <path d="M0 30 C60 10, 120 50, 180 30 C240 10, 300 50, 360 30 C420 10, 480 50, 540 30 C600 10, 660 50, 720 30 C780 10, 840 50, 900 30 C960 10, 1020 50, 1080 30 C1140 10, 1200 50, 1260 30" />
      </svg>
    </div>
  );
}

function HarbourDivider() {
  return (
    <div className="vog-divider vog-divider--harbour" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" role="presentation">
        <path d="M0 44 H300 L360 18 H460 L520 44 H900 L980 22 H1080 L1160 44 H1200" />
      </svg>
    </div>
  );
}

export default function Voices() {
  const [openFaq, setOpenFaq] = useState(0);
  const hasFormUrl = !googleFormEmbedUrl.includes('REPLACE_WITH_FORM_ID');

  return (
    <>
      <SEO
        page="voices"
        customTitle="Voices of Greystones | Community Stories | High Tide Studios"
        customDescription="Voices of Greystones is a community storytelling project preserving the voices, memories and conversations of people across Greystones."
        structuredDataType="faq"
        structuredDataPayload={vogFaqSchema}
        videoPayload={vogVideoSchema}
      />

      <main className="vog-page" aria-label="Voices of Greystones">
        <section className="vog-hero py-5">
          <div className="container vog-shell">
            <FadeInUp className="text-center">
              <img
                src={logoPath}
                alt="Voices of Greystones"
                className="vog-logo"
                loading="lazy"
              />
              <h1 className="vog-title mt-4">Every Stone Has a Story.</h1>
              <h2 className="vog-subtitle">What&apos;s Yours?</h2>
              <p className="vog-lead mx-auto mb-3">
                You don&apos;t need to be famous to have a story worth telling.
              </p>
              <p className="vog-body mx-auto mb-4">
                Every family has them. Every street has them.
                <br />
                Every town is built on them.
                <br />
                <br />
                <i>Voices of Greystones</i> exists to preserve the stories of
                Greystones for future generations.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                <a className="vog-btn vog-btn--primary" href="#become-guest">
                  Tell Your Story
                </a>
                <a className="vog-btn vog-btn--ghost" href="#become-guest">
                  Nominate Someone
                </a>
              </div>

              <HarbourDivider />

              <img
                src={nextGuestPath}
                alt="Next guest spotlight"
                className="vog-next-guest"
                loading="lazy"
              />
              <h3 className="vog-next-guest-title mt-3">
                Who&apos;s sitting here next?
              </h3>
              <p className="vog-body mx-auto mb-2">
                Today, this chair is empty. Next week it could be someone
                telling the story of:
              </p>
              <ul className="vog-next-guest-list">
                <li>rowing across the Atlantic</li>
                <li>surviving cancer</li>
                <li>opening a tiny cafe</li>
                <li>growing up in Greystones in the 1950s</li>
                <li>meeting the love of their life</li>
                <li>changing someone&apos;s life</li>
                <li>or simply remembering a town that&apos;s changed</li>
              </ul>
              <p className="vog-body mx-auto mb-0">
                <strong>Maybe it&apos;s your story.</strong>
              </p>

              <PromoVideo
                sources={promoVideoSources}
                poster={promoVideoPoster}
                title="Voices of Greystones — Every Stone Has a Story"
                caption="Watch: a short introduction to Voices of Greystones."
                durationLabel="0:56"
              />

              <div
                className="vog-latest-stories"
                aria-label="Latest episodes links">
                <p className="vog-kicker mb-2">Listen &amp; Watch</p>
                <h3 className="vog-section-title vog-latest-stories-title mb-2">
                  Listen to the stories
                </h3>
                <p className="vog-body mx-auto mb-0">
                  Every conversation becomes part of the growing story of
                  Greystones.
                </p>
                <div className="vog-platform-links" role="list">
                  <a
                    href={voicesYoutubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vog-platform-link"
                    role="listitem"
                    aria-label="Watch Voices of Greystones on YouTube">
                    <span className="vog-platform-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="presentation">
                        <path d="M23.5 7.2c-.3-1.1-1.2-2-2.3-2.3C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.2.5C1.7 5.2.8 6.1.5 7.2 0 9.2 0 12 0 12s0 2.8.5 4.8c.3 1.1 1.2 2 2.3 2.3 2 .5 9.2.5 9.2.5s7.2 0 9.2-.5c1.1-.3 2-1.2 2.3-2.3.5-2 .5-4.8.5-4.8s0-2.8-.5-4.8ZM9.7 16V8l6.2 4-6.2 4Z" />
                      </svg>
                    </span>
                    <span>YouTube</span>
                  </a>

                  <a
                    href={voicesSpotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vog-platform-link"
                    role="listitem"
                    aria-label="Listen to Voices of Greystones on Spotify">
                    <span className="vog-platform-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="presentation">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.7 0 12 0Zm5.2 17.3c-.2.3-.6.4-.9.2-2.6-1.6-6-2-10-1.1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.2-.9 7.8-.5 10.7 1.3.3.2.4.6.2.9Zm1.3-2.9c-.3.4-.8.5-1.1.2-3-1.8-7.5-2.3-11-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 4-1.2 8.9-.6 12.2 1.4.4.2.5.8.3 1.1Zm.1-3c-3.4-2-9.1-2.2-12.2-1.2-.5.1-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.6-1.1 9.9-.9 13.7 1.4.4.2.6.8.3 1.2-.2.4-.8.6-1.2.4Z" />
                      </svg>
                    </span>
                    <span>Spotify</span>
                  </a>

                  <a
                    href={voicesAmazonMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vog-platform-link"
                    role="listitem"
                    aria-label="Listen to Voices of Greystones on Amazon Music">
                    <span className="vog-platform-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="presentation">
                        <path d="M18.9 17.3c-2 1.5-4.9 2.4-7.4 2.4-3.5 0-6.6-1.3-9-3.4-.2-.2 0-.5.2-.4 2.6 1.5 5.8 2.4 9.1 2.4 2.2 0 4.7-.5 6.9-1.4.4-.2.7.2.2.4Zm.8 2.4c-.3.4-1.8.2-2.5.1-.2 0-.2-.2 0-.3.5-.4 1.4-.5 1.8-.6.4 0 .5-.1.7.2.1.2.1.4 0 .6Zm-.7-1.1c-.1-.2-.8-.1-1.3 0-.1 0-.2-.1-.1-.2.8-.6 2.1-.5 2.3-.2.2.3-.1 1.6-.8 2.3-.1.1-.3 0-.3-.1.2-.4.4-1.2.2-1.8Zm-7.9-10.2-3.4 8h1.6l.8-1.9h3.4l.7 1.9H16l-3.4-8h-1.5Zm-.4 4.8 1.1-2.8 1.1 2.8h-2.2Z" />
                      </svg>
                    </span>
                    <span>Amazon Music</span>
                  </a>

                  <a
                    href={voicesAcastUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vog-platform-link"
                    role="listitem"
                    aria-label="Listen to Voices of Greystones on Acast">
                    <span className="vog-platform-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="presentation">
                        <path d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6Zm0 3.1a6.7 6.7 0 1 1 0 13.4 6.7 6.7 0 0 1 0-13.4Zm0 2.4a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Zm0 2.4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Z" />
                      </svg>
                    </span>
                    <span>Acast</span>
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        <RopeDivider />

        <section className="py-5">
          <div className="container vog-shell">
            <div className="row g-4 align-items-stretch">
              <FadeInUp className="col-12 col-lg-7">
                <article className="vog-card h-100">
                  <p className="vog-kicker">Why We&apos;re Doing This</p>
                  <h2 className="vog-section-title">
                    Why are we recording these stories?
                  </h2>
                  <p className="vog-body">Because memories fade.</p>
                  <p className="vog-body">Photographs get lost.</p>
                  <p className="vog-body mb-0">
                    People move away.
                    <br />
                    <br />
                    And one day the voices that built this community won&apos;t
                    be here to tell their stories.
                    <br />
                    <br />
                    Voices of Greystones exists to preserve those conversations
                    one episode at a time.
                  </p>
                </article>
              </FadeInUp>
              <FadeInUp className="col-12 col-lg-5" delay={0.1}>
                <aside
                  className="vog-card vog-card--highlight h-100"
                  aria-label="Free podcast features">
                  <p className="vog-kicker">Completely Free</p>
                  <h3 className="vog-mini-title">Everything included</h3>
                  <ul className="vog-checklist">
                    {freeFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </aside>
              </FadeInUp>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container vog-shell">
            <FadeInUp className="text-center mb-4">
              <p className="vog-kicker">Story Sparks</p>
              <h2 className="vog-section-title">What Makes a Great Story?</h2>
            </FadeInUp>
            <StaggerContainer className="row g-3">
              {storyIdeas.map((item) => (
                <StaggerItem className="col-6 col-md-4 col-lg-3" key={item}>
                  <article className="vog-story-card h-100">
                    <p>{item}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <HarbourDivider />

        <section className="py-5">
          <div className="container vog-shell">
            <FadeInUp>
              <article className="vog-card">
                <p className="vog-kicker">Recording The Stories</p>
                <h2 className="vog-section-title">Why record them now?</h2>
                <p className="vog-body">
                  Every conversation we record today becomes part of
                  tomorrow&apos;s history.
                </p>
                <p className="vog-body mb-0">
                  The people of Greystones are writing the story of this town
                  every single day.
                  <br />
                  We&apos;re simply pressing record.
                </p>
              </article>
            </FadeInUp>
          </div>
        </section>

        <section className="py-5" id="become-guest">
          <div className="container vog-shell">
            <FadeInUp>
              <article className="vog-card">
                <p className="vog-kicker">Become a Guest</p>
                <h2 className="vog-section-title">Start the conversation</h2>
                <div className="vog-form-wrap">
                  <iframe
                    title="Voices of Greystones guest form"
                    src={hasFormUrl ? googleFormEmbedUrl : 'about:blank'}
                    loading="lazy"
                    className="vog-form-frame"
                  />
                  {!hasFormUrl && (
                    <p className="vog-form-placeholder mb-0">
                      Google Form embed URL goes here.
                    </p>
                  )}
                </div>
                <p className="vog-body vog-form-note mx-auto mb-0">
                  Before we think about recording, it begins with a simple
                  coffee and a chat.
                  <br />
                  <br />
                  It&apos;s a chance for us to get to know one another. We
                  explore your story together and decide whether Voices of
                  Greystones feels like the right place to tell it.
                </p>
              </article>
            </FadeInUp>
          </div>
        </section>

        <RopeDivider />

        <section className="py-5">
          <div className="container vog-shell">
            <FadeInUp>
              <article className="vog-card vog-card--studio">
                <p className="vog-kicker">
                  Proudly produced by High Tide Studios
                </p>

                <h2 className="vog-section-title">
                  Professional production. Local stories.
                </h2>

                <p className="vog-body vog-body--wide">
                  We believe every story deserves to be told well — a local
                  story just as much as a corporate one. That's why we're proud
                  to produce Voices of Greystones. It's recorded at High Tide
                  Studios, a podcast, video and audio production studio in the
                  heart of Greystones, County Wicklow.
                  <br />
                  <br />
                  The same care and production standards are available to
                  businesses, organisations, creators and commercial projects
                  across Ireland — from podcasts and corporate video to
                  voiceovers and branded content.
                </p>
                <div className="row g-3 mt-3 justify-content-center">
                  {studioServices.map((service) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={service}>
                      <p className="vog-service-chip">{service}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    to="/#studio-video"
                    className="vog-btn vog-btn--primary">
                    Explore the Studio
                  </Link>
                </div>
              </article>
            </FadeInUp>
          </div>
        </section>

        <section className="py-5">
          <div className="container vog-shell">
            <FadeInUp className="text-center mb-4">
              <p className="vog-kicker">FAQ</p>
              <h2 className="vog-section-title">Common questions</h2>
            </FadeInUp>
            <div className="vog-faq" role="list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const panelId = `vog-faq-panel-${index}`;
                const buttonId = `vog-faq-button-${index}`;

                return (
                  <article
                    className="vog-faq-item"
                    key={faq.question}
                    role="listitem">
                    <h3 className="mb-0">
                      <button
                        id={buttonId}
                        className="vog-faq-button"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                        <span>{faq.question}</span>
                        <span className="vog-faq-icon" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="vog-faq-panel">
                      <p className="mb-0">{faq.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container vog-shell text-center">
            <FadeInUp>
              <article>
                <h2 className="vog-section-title mb-2">
                  Everyone in this town has a story.
                  <br />
                  Some just haven&apos;t been asked yet.
                </h2>

                <a className="vog-btn vog-btn--primary" href="#become-guest">
                  Start the Conversation
                </a>
              </article>
            </FadeInUp>
          </div>
        </section>
        <div className="vog-tagline-footer">
          <div className="container vog-shell text-center">
            <p className="vog-title vog-title--small mb-0">
              Preserving the stories of Greystones.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
