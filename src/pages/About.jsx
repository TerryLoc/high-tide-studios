import { useState } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers, companyInfo, whoWeAre, stats } from '../data/about';
import { FadeInUp, FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import SEO from '../components/SEO';

export default function About() {
  const [expandedMember, setExpandedMember] = useState(null);

  const toggleMember = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <>
      <SEO page="about" />

      {/* Hero Section */}
      <section className="ht-about-hero text-center">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">Our Story</p>
            <h1 className="ht-about-title">High Tide Studios</h1>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-about-tagline">{companyInfo.tagline}</p>
          </FadeInUp>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="ht-who-we-are py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <FadeInUp>
                <p className="ht-eyebrow">Who We Are</p>
                <h2 className="ht-section-title">{whoWeAre.title}</h2>
                <div className="ht-section-divider" aria-hidden="true" />
              </FadeInUp>
              <FadeIn delay={0.2}>
                {whoWeAre.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`ht-body-text mb-4 ${i === 0 ? 'ht-body-text--lead' : ''} ${p === 'This is not a content factory.' ? 'ht-body-text--emphasis' : ''}`}
                  >
                    {p}
                  </p>
                ))}
              </FadeIn>
            </div>
            <div className="col-12 col-lg-6">
              <FadeIn delay={0.3}>
                <div className="ht-about-image-wrapper">
                  <img
                    src="/images/mic1.webp"
                    alt="Professional microphone at High Tide Studios"
                    className="ht-about-image"
                    loading="lazy"
                  />
                  <div className="ht-about-image-border" aria-hidden="true" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ht-stats py-5">
        <div className="container">
          <StaggerContainer className="row text-center">
            {stats.map((stat, i) => (
              <StaggerItem className="col-4" key={i}>
                <div className="ht-stat-item">
                  <h2 className="ht-stat-value">{stat.value}</h2>
                  <p className="ht-stat-label">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="ht-team py-5">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <p className="ht-eyebrow">The People</p>
              <h2 className="ht-section-title">Meet the Team</h2>
              <div className="ht-section-divider mx-auto" aria-hidden="true" />
            </div>
          </FadeInUp>
          <StaggerContainer className="row g-4">
            {teamMembers.map((member) => (
              <StaggerItem className="col-12 col-md-6" key={member.id}>
                <div className="ht-team-card h-100">
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3 flex-shrink-0">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="ht-team-avatar"
                        />
                      ) : (
                        <div className="ht-team-avatar-placeholder">
                          <i className="bi bi-person" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h5 className="ht-team-name">{member.name}</h5>
                      <p className="ht-team-role">{member.role}</p>
                      <p className="ht-team-bio">{member.shortBio}</p>
                    </div>
                  </div>

                  {member.fullBio && (
                    <>
                      <button
                        className="ht-team-toggle"
                        onClick={() => toggleMember(member.id)}
                        aria-expanded={expandedMember === member.id}
                      >
                        {expandedMember === member.id ? (
                          <>Read less <i className="bi bi-chevron-up ms-1" aria-hidden="true" /></>
                        ) : (
                          <>Read full bio <i className="bi bi-chevron-down ms-1" aria-hidden="true" /></>
                        )}
                      </button>

                      {expandedMember === member.id && (
                        <div className="ht-team-full-bio">
                          {member.fullBio.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="ht-body-text small mb-3">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location Section */}
      <section className="ht-location py-5">
        <div className="container text-center">
          <FadeInUp>
            <p className="ht-eyebrow">Find Us</p>
            <h2 className="ht-section-title">Visit Us</h2>
            <div className="ht-section-divider mx-auto" aria-hidden="true" />
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-6">
                <address className="ht-address mb-4">
                  <strong className="ht-address-name">High Tide Studios</strong><br />
                  Unit 11, Watson Johnson<br />
                  Church Road<br />
                  Greystones<br />
                  County Wicklow<br />
                  Ireland
                </address>
                <p className="mb-4">
                  <a href="mailto:colmhayesradio@gmail.com" className="ht-location-link">
                    <i className="bi bi-envelope me-2" aria-hidden="true" />
                    colmhayesradio@gmail.com
                  </a>
                </p>
                <Link to="/contact" className="ht-btn-primary">
                  <i className="bi bi-calendar-check" aria-hidden="true" />
                  Get in Touch
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}