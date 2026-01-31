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
      <section className="hero-main text-center">
        <div className="container">
          <FadeInUp>
            <p className="text-uppercase small opacity-75 mb-2">About</p>
            <h1 className="display-5 fw-bold mb-3">High Tide Studios</h1>
            <p className="lead">{companyInfo.tagline}</p>
          </FadeInUp>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <FadeInUp>
              <h2 className="fw-bold mb-4">{whoWeAre.title}</h2>
            </FadeInUp>
            <FadeIn delay={0.2}>
              {whoWeAre.paragraphs.map((p, i) => (
                <p key={i} className={`${i === 0 ? 'fs-5' : ''} ${p === 'This is not a content factory.' ? 'fw-semibold' : ''} mb-4`}>
                  {p}
                </p>
              ))}
            </FadeIn>
          </div>
          <div className="col-12 col-lg-6">
            <FadeIn delay={0.3}>
              <div className="about-image-wrapper">
                <img 
                  src="/images/mic1.webp" 
                  alt="Professional microphone at High Tide Studios" 
                  className="about-image"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <StaggerContainer className="row text-center">
            {stats.map((stat, i) => (
              <StaggerItem className="col-4" key={i}>
                <h2 className="display-5 fw-bold mb-1">{stat.value}</h2>
                <p className="opacity-75 mb-0 small">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-5">
        <FadeInUp>
          <h2 className="text-center fw-bold mb-5">Meet the Team</h2>
        </FadeInUp>
        <StaggerContainer className="row g-4">
          {teamMembers.map((member) => (
            <StaggerItem className="col-12 col-md-6" key={member.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="rounded-circle"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{ width: '80px', height: '80px' }}
                        >
                          <i className="bi bi-person fs-2 text-muted"></i>
                        </div>
                      )}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{member.name}</h5>
                      <p className="text-muted small mb-2">{member.role}</p>
                      <p className="small mb-0">{member.shortBio}</p>
                    </div>
                  </div>
                  
                  {member.fullBio && (
                    <>
                      <button 
                        className="btn btn-link p-0 text-decoration-none small"
                        onClick={() => toggleMember(member.id)}
                      >
                        {expandedMember === member.id ? (
                          <>Read less <i className="bi bi-chevron-up ms-1"></i></>
                        ) : (
                          <>Read full bio <i className="bi bi-chevron-down ms-1"></i></>
                        )}
                      </button>
                      
                      {expandedMember === member.id && (
                        <div className="mt-3 pt-3 border-top">
                          {member.fullBio.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="small text-muted mb-3">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Location Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <FadeInUp>
            <h2 className="fw-bold mb-4">Visit Us</h2>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <address className="mb-4">
                  <strong>High Tide Studios</strong><br />
                  Unit 11, Watson Johnson<br />
                  Church Road<br />
                  Greystones<br />
                  County Wicklow<br />
                  Ireland
                </address>
                <p className="mb-4">
                  <a href="mailto:colmhayesradio@gmail.com" className="text-decoration-none">
                    <i className="bi bi-envelope me-2"></i>
                    colmhayesradio@gmail.com
                  </a>
                </p>
                <Link to="/contact" className="btn btn-dark">
                  <i className="bi bi-calendar-check me-2"></i>
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
