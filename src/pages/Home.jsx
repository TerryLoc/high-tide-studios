import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { brandVision } from "../data/about";
import { testimonials } from "../data/testimonials";
import TestimonialCard from "../components/TestimonialCard";
import SEO from "../components/SEO";
import { FadeInUp, FadeIn, StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { features } from '../data/about';
import '../styles/home.css';

export default function Home() {
  const barsRef = useRef(null);

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.ht-hero-bar');
    if (!bars) return;
    bars.forEach((bar, i) => {
      bar.style.animationDelay = `${i * 0.08}s`;
    });
  }, []);

  return <>
    <SEO page="home" />

    {/* ── Hero: Logo over animated soundwave ── */}
    <section className="ht-hero-image-section" aria-label="High Tide Studios">
      <div className="ht-hero-glow" aria-hidden="true" />
      <div className="ht-hero-wave-bg" ref={barsRef} aria-hidden="true">
        {Array.from({ length: 31 }).map((_, i) => (
          <div key={i} className="ht-hero-bar" />
        ))}
      </div>
      <div className="ht-hero-logo-wrap">
        <img
          src={`${process.env.PUBLIC_URL}/images/main_logo.png`}
          alt="High Tide Studios"
          className="ht-hero-logo"
        />
      </div>
    </section>

    {/* Hero Content */}
    <section className="ht-hero-content text-center py-5">
      <div className="container">
        <FadeInUp>
          <p className="ht-eyebrow">Podcast &amp; Video Production · Greystones</p>
          <h1 className="ht-hero-title">High Tide Studios</h1>
          <div className="ht-title-divider" aria-hidden="true" />
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="ht-hero-lead">A calm, broadcast-ready environment for serious voices.</p>
        </FadeInUp>
        <FadeInUp delay={0.4}>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/services" className="ht-btn-primary">
              <i className="bi bi-calendar-check" aria-hidden="true" />
              Our Services
            </Link>
            <Link to="/clients" className="ht-btn-outline">
              <i className="bi bi-play-circle" aria-hidden="true" />
              View Our Work
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* Brand Vision */}
    <section className="ht-brand-vision py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <FadeInUp>
              <p className="ht-eyebrow text-center">Our Philosophy</p>
              <h2 className="ht-section-title text-center">{brandVision.title}</h2>
              <div className="ht-section-divider mx-auto" aria-hidden="true" />
            </FadeInUp>
            <FadeIn delay={0.2}>
              <div className="ht-brand-vision-content">
                {brandVision.paragraphs.map((p, i) => (
                  <p key={i} className={`ht-body-text ${i === 0 ? 'ht-body-text--lead' : ''} mb-4`}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </div>
          <StaggerItem className="col-12 col-md-8 mt-4">
            <div className="ht-video-wrapper">
              <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/JDKTdv_gKhg?si=_YLahDvVWPcEe3r5"
                title="High Tide Studios Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </StaggerItem>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="ht-features py-5">
      <div className="container">
        <FadeInUp>
          <div className="text-center mb-5">
            <p className="ht-eyebrow">What We Offer</p>
            <h2 className="ht-section-title">Studio Features</h2>
            <div className="ht-section-divider mx-auto" aria-hidden="true" />
            <p className="ht-muted-text mt-3">What makes High Tide Studios the ideal choice for your content creation needs?</p>
          </div>
        </FadeInUp>
        <StaggerContainer className="row g-4">
          <StaggerItem className="col-12 col-md-4">
            <div className="ht-feature-card h-100">
              <div className="ht-feature-image-wrapper mb-3">
                <img src="/images/rodecasterproii.webp" alt="Rodecaster Pro II audio equipment" className="ht-feature-image" loading="lazy" />
              </div>
              <h5 className="ht-feature-title">Professional Audio</h5>
              <p className="ht-muted-text small mb-0">Multi-mic studio recording with broadcast-quality mastering and noise reduction</p>
            </div>
          </StaggerItem>
          <StaggerItem className="col-12 col-md-4">
            <div className="ht-feature-card h-100">
              <div className="ht-feature-image-wrapper mb-3">
                <img src="/images/rodecastervideo.webp" alt="Rodecaster video production equipment" className="ht-feature-image" loading="lazy" />
              </div>
              <h5 className="ht-feature-title">Video Production</h5>
              <p className="ht-muted-text small mb-0">Cinematic lighting and multi-camera setups for stunning visuals</p>
            </div>
          </StaggerItem>
          <StaggerItem className="col-12 col-md-4">
            <div className="ht-feature-card h-100">
              <div className="ht-feature-image-wrapper mb-3">
                <img src="/images/tech_desk.webp" alt="Professional technical desk setup" className="ht-feature-image" loading="lazy" />
              </div>
              <h5 className="ht-feature-title">Expert Mixing</h5>
              <p className="ht-muted-text small mb-0">Professional audio engineering with state-of-the-art equipment</p>
            </div>
          </StaggerItem>
          <StaggerItem className="col-12">
            <div className="ht-feature-card ht-feature-card--equipment">
              <h5 className="ht-feature-title mb-3">Premium Equipment &amp; Facilities</h5>
              <ul className="ht-equipment-list">
                {features.map((feature, i) => (
                  <li key={i} className="ht-equipment-item">
                    <i className="bi bi-check2 ht-check-icon" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* Testimonials */}
    <section className="ht-testimonials py-5">
      <div className="container">
        <FadeInUp>
          <div className="text-center mb-5">
            <p className="ht-eyebrow">Client Stories</p>
            <h2 className="ht-section-title">What Our Clients Say</h2>
            <div className="ht-section-divider mx-auto" aria-hidden="true" />
            <p className="ht-muted-text mt-3">Trusted by podcasters and content creators across Ireland</p>
          </div>
        </FadeInUp>
        <StaggerContainer className="row g-4">
          {testimonials.map((testimonial, i) => (
            <StaggerItem className="col-12 col-md-4" key={testimonial.id || i}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Gallery */}
    <section className="ht-gallery py-5">
      <div className="container">
        <FadeInUp>
          <div className="text-center mb-5">
            <p className="ht-eyebrow">Behind the Glass</p>
            <h2 className="ht-section-title">Our Studio</h2>
            <div className="ht-section-divider mx-auto" aria-hidden="true" />
            <p className="ht-muted-text mt-3">A premium environment designed for exceptional content creation</p>
          </div>
        </FadeInUp>
        <StaggerContainer className="row g-3">
          <StaggerItem className="col-12 col-md-8">
            <div className="ht-gallery-item ht-gallery-item--large">
              <img src="/images/lights.webp" alt="Professional studio lighting setup" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Studio Lighting</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-12 col-md-4">
            <div className="ht-gallery-item">
              <img src="/images/mic2.webp" alt="Professional microphone setup" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Podcast Mic</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-6 col-md-4">
            <div className="ht-gallery-item">
              <img src="/images/camera.webp" alt="Professional video camera" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Camera Equipment</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-6 col-md-4">
            <div className="ht-gallery-item">
              <img src="/images/mac.webp" alt="Mac editing workstation" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Editing Suite</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-12 col-md-4">
            <div className="ht-gallery-item">
              <img src="/images/becs_working.webp" alt="Producer at work" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Production in Action</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-6 col-md-3">
            <div className="ht-gallery-item">
              <img src="/images/studio_s1.webp" alt="Studio environment" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Studio Space</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-6 col-md-3">
            <div className="ht-gallery-item">
              <img src="/images/studio_s2.webp" alt="Recording area" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Recording Area</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-6 col-md-3">
            <div className="ht-gallery-item">
              <img src="/images/studio_s3.webp" alt="Studio booth" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Set Design</span></div>
            </div>
          </StaggerItem>
          <StaggerItem className="col-6 col-md-3">
            <div className="ht-gallery-item">
              <img src="/images/studio_s4.webp" alt="Production environment" className="ht-gallery-image" loading="lazy" />
              <div className="ht-gallery-overlay"><span className="ht-gallery-label">Production Space</span></div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* CTA */}
    <section className="ht-cta py-5">
      <div className="container text-center">
        <FadeInUp>
          <p className="ht-eyebrow">Let's Work Together</p>
          <h2 className="ht-cta-title">Ready to Get Started?</h2>
          <div className="ht-title-divider mx-auto" aria-hidden="true" />
          <p className="ht-cta-lead">Let's create something remarkable together.</p>
          <Link to="/contact" className="ht-btn-primary ht-btn-primary--light">
            <i className="bi bi-envelope" aria-hidden="true" />
            Contact Us
          </Link>
        </FadeInUp>
      </div>
    </section>
  </>;
}