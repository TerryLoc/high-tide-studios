import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from '../components/AnimatedSection';

const logoPath = '/images/voices_logo.png';
const nextGuestPath = '/images/next_guest.png';
const googleFormEmbedUrl =
  'https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/viewform?embedded=true';

const freeFeatures = [
  'A warm welcome (and coffee!)',
  'Professional recording in our studio',
  'No experience needed',
  'We guide the conversation',
  'Fully edited episode',
  'Social media clips to share',
];

const storyIdeas = [
  'A turning point in your life',
  'An incredible journey',
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
  'Professional Podcast Recording',
  'Corporate Podcasts',
  'Video Podcasts',
  'Voiceovers',
  'Commercial Audio',
  'Music Production',
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
];

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
        customTitle="Voices of Greystones | Community Podcast | High Tide Studios"
        customDescription="Voices of Greystones is a community podcast celebrating the remarkable stories of ordinary people across Greystones. Recorded professionally at High Tide Studios."
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
              <p className="vog-lead mx-auto">
                You don&apos;t need to be famous to have a story worth telling.
              </p>
              <p className="vog-body mx-auto mb-2">
                Every family has them. Every street has them. Every town is
                built on them.
              </p>
              <p className="vog-body mx-auto mb-2">
                <em>Voices of Greystones</em> is a weekly podcast celebrating
                the people, memories and moments that have shaped this coastal
                town and its community.
              </p>
              <p className="vog-listing mx-auto mb-2">
                From lifelong locals to new arrivals, business owners to
                volunteers, musicians to adventurers - every voice deserves to
                be heard.
              </p>
              <p className="vog-body mx-auto mb-4">
                Recorded with care at High Tide Studios in the heart of
                Greystones.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                <a className="vog-btn vog-btn--primary" href="#become-guest">
                  Tell Your Story
                </a>
                <a className="vog-btn vog-btn--ghost" href="#become-guest">
                  Nominate Someone
                </a>
              </div>

              <RopeDivider />

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
                Today it&apos;s empty. Next week it could be someone telling the
                story of:
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
                    Every community is built on stories.
                  </h2>
                  <p className="vog-body">
                    Greystones is full of people with lived experience,
                    hard-earned wisdom and stories worth preserving. This
                    project creates space for those voices to be heard,
                    remembered and shared with future generations.
                  </p>
                  <p className="vog-body mb-0">
                    We want every guest to feel comfortable, respected and proud
                    of the episode they create with us.
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

        <HarbourDivider />

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

        <RopeDivider />

        <section className="py-5">
          <div className="container vog-shell">
            <FadeInUp>
              <article className="vog-card">
                <p className="vog-kicker">About the Podcast</p>
                <h2 className="vog-section-title">
                  A living archive of Greystones
                </h2>
                <p className="vog-body">
                  <strong>
                    Voices of Greystones is creating a living archive of our
                    town.
                  </strong>
                </p>
                <p className="vog-body mb-0">
                  Every episode captures a piece of local history - stories that
                  might otherwise only ever be told around a dinner table or
                  over a pint. Years from now, they&apos;ll still be here for
                  future generations to discover.
                </p>
              </article>
            </FadeInUp>
          </div>
        </section>

        <section className="py-5">
          <div className="container vog-shell">
            <FadeInUp>
              <article className="vog-card vog-card--studio">
                <p className="vog-kicker">
                  Brought to you by High Tide Studios
                </p>
                <h2 className="vog-section-title">
                  Premium production in Wicklow
                </h2>
                <div className="row g-3 mt-2">
                  {studioServices.map((service) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={service}>
                      <p className="vog-service-chip">{service}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to="/booking" className="vog-btn vog-btn--primary">
                    Book the Studio
                  </Link>
                </div>
              </article>
            </FadeInUp>
          </div>
        </section>

        <HarbourDivider />

        <section className="py-5" id="become-guest">
          <div className="container vog-shell">
            <FadeInUp>
              <article className="vog-card">
                <p className="vog-kicker">Become a Guest</p>
                <h2 className="vog-section-title">Tell us your story</h2>
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
                <p className="vog-body mt-4 mb-2">
                  We&apos;ll read every submission.
                </p>
                <p className="vog-body mb-0">
                  If we think your story is a good fit we&apos;ll invite you in
                  for a relaxed coffee chat before arranging a recording date.
                </p>
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
                  Every Voice Leaves Its Mark
                </h2>

                <a className="vog-btn vog-btn--primary" href="#become-guest">
                  Tell the story only you can tell
                </a>
              </article>
            </FadeInUp>
          </div>
        </section>
      </main>
    </>
  );
}
