import { Link } from 'react-router-dom';
import { packages } from "../data/packages";
import { brandVision } from "../data/about";
import { testimonials } from "../data/testimonials";
import PackageCard from "../components/PackageCard";
import TestimonialCard from "../components/TestimonialCard";
import SEO from "../components/SEO";
import { FadeInUp, FadeIn, StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { siteConfig } from '../config/site';

export default function Home() {
  return (
    <>
      <SEO page="home" />
      
      {/* Hero Image Section */}
      <section className="hero-image-section">
        <img 
          src={`${process.env.PUBLIC_URL}/images/hero.webp`}
          alt="High Tide Studios recording environment"
          className="hero-image-full"
        />
      </section>

      {/* Hero Content Section */}
      <section className="hero-content bg-dark text-white text-center py-5">
        <div className="container">
          <FadeInUp>
            <h1 className="display-4 fw-bold mb-3">
              High Tide Studios
              <span className="d-block fs-4 fw-normal opacity-75 mt-2">Greystones</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="lead mb-4 opacity-85">
              A calm, broadcast-ready environment for serious voices.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn btn-light btn-lg px-4">
                <i className="bi bi-calendar-check me-2"></i>
                Book a Session
              </Link>
              <Link to="/clients" className="btn btn-outline-light btn-lg px-4">
                <i className="bi bi-play-circle me-2"></i>
                View Our Work
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Packages Section */}
      <section className="container py-5" id="packages">
        <FadeInUp>
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">Our Packages</h2>
            <p className="text-muted">Professional podcast production tailored to your needs</p>
          </div>
        </FadeInUp>
        <StaggerContainer className="row g-4">
          {packages.map((pkg, i) => (
            <StaggerItem className="col-12 col-md-6 col-lg-4" key={pkg.id || i}>
              <PackageCard pkg={pkg} featured={pkg.badge === 'Best Value'} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Brand Vision Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <FadeInUp>
                <h2 className="display-6 fw-bold mb-4 text-center">{brandVision.title}</h2>
              </FadeInUp>
              <FadeIn delay={0.2}>
                <div className="brand-vision-content">
                  {brandVision.paragraphs.map((p, i) => (
                    <p key={i} className={`${i === 0 ? 'lead' : ''} mb-4`}>
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <StaggerContainer className="row g-4">
            <StaggerItem className="col-12 col-md-4">
              <div className="feature-card h-100">
                <div className="feature-image-wrapper mb-3">
                  <img 
                    src="/images/rodecasterproii.webp" 
                    alt="Rodecaster Pro II audio equipment" 
                    className="feature-image"
                    loading="lazy"
                  />
                </div>
                <h5 className="fw-bold">Professional Audio</h5>
                <p className="text-muted small mb-0">Multi-mic studio recording with broadcast-quality mastering and noise reduction</p>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="feature-card h-100">
                <div className="feature-image-wrapper mb-3">
                  <img 
                    src="/images/rodecastervideo.webp" 
                    alt="Rodecaster video production equipment" 
                    className="feature-image"
                    loading="lazy"
                  />
                </div>
                <h5 className="fw-bold">Video Production</h5>
                <p className="text-muted small mb-0">Cinematic lighting and multi-camera setups for stunning visuals</p>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="feature-card h-100">
                <div className="feature-image-wrapper mb-3">
                  <img 
                    src="/images/tech_desk.webp" 
                    alt="Professional technical desk setup" 
                    className="feature-image"
                    loading="lazy"
                  />
                </div>
                <h5 className="fw-bold">Expert Mixing</h5>
                <p className="text-muted small mb-0">Professional audio engineering with state-of-the-art equipment</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold">What Our Clients Say</h2>
              <p className="text-muted">Trusted by podcasters and content creators across Ireland</p>
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

      {/* Social Section */}
      <section className="py-4">
        <div className="container text-center">
          <FadeIn>
            <h5 className="fw-semibold mb-3">Follow us on social</h5>
            <div className="d-flex gap-4 justify-content-center">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-dark fs-4 social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-dark fs-4 social-link">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Studio Gallery Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold">Our Studio</h2>
              <p className="text-muted">A premium environment designed for exceptional content creation</p>
            </div>
          </FadeInUp>
          <StaggerContainer className="row g-3">
            {/* Row 1: Large feature + vertical stack */}
            <StaggerItem className="col-12 col-md-8">
              <div className="studio-gallery-item studio-gallery-large" style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/JDKTdv_gKhg?si=_YLahDvVWPcEe3r5"
                  title="High Tide Studios Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 'inherit' }}
                />
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="studio-gallery-item">
                <img 
                  src="/images/mic2.webp" 
                  alt="Professional microphone setup" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Podcast Mic</span>
                </div>
              </div>
            </StaggerItem>
            
            {/* Row 2: Three equal columns */}
            <StaggerItem className="col-6 col-md-4">
              <div className="studio-gallery-item">
                <img 
                  src="/images/camera.webp" 
                  alt="Professional video camera" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Camera Equipment</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-4">
              <div className="studio-gallery-item">
                <img 
                  src="/images/mac.webp" 
                  alt="Mac editing workstation" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Editing Suite</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-12 col-md-4">
              <div className="studio-gallery-item">
                <img 
                  src="/images/becs_working.webp" 
                  alt="Producer at work" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Production in Action</span>
                </div>
              </div>
            </StaggerItem>
            
            {/* Row 3: Studio environment shots */}
            <StaggerItem className="col-6 col-md-3">
              <div className="studio-gallery-item">
                <img 
                  src="/images/studio_s1.webp" 
                  alt="Studio environment" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Studio Space</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="studio-gallery-item">
                <img 
                  src="/images/studio_s2.webp" 
                  alt="Recording area" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Recording Area</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="studio-gallery-item">
                <img 
                  src="/images/studio_s3.webp" 
                  alt="Studio booth" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Studio Booth</span>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="col-6 col-md-3">
              <div className="studio-gallery-item">
                <img 
                  src="/images/studio_s4.webp" 
                  alt="Production environment" 
                  className="studio-gallery-image"
                  loading="lazy"
                />
                <div className="studio-gallery-overlay">
                  <span className="studio-gallery-label">Production Space</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <FadeInUp>
            <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
            <p className="mb-4 opacity-75">Let's create something remarkable together.</p>
            <Link to="/contact" className="btn btn-light btn-lg px-4">
              <i className="bi bi-envelope me-2"></i>
              Contact Us
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
