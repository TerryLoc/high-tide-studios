import SEO from '../components/SEO';
import { FadeInUp, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { packages } from "../data/packages";
import PackageCard from "../components/PackageCard";

export default function Services() {
  return (
    <>
      <SEO page="services" />

      {/* Hero Section */}
      <section className="ht-services-hero text-center">
        <div className="container">
          <FadeInUp>
            <p className="ht-eyebrow">Services</p>
            <h1 className="ht-services-title">Pick Your Perfect Package</h1>
            <div className="ht-title-divider mx-auto" aria-hidden="true" />
            <p className="ht-services-lead">
              Professional recording packages tailored to your needs.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Packages Section */}
      <section className="ht-packages-section py-5" id="packages">
        <div className="container">
          <FadeInUp>
            <div className="text-center mb-5">
              <p className="ht-eyebrow">What We Offer</p>
              <h2 className="ht-section-title">Our Packages</h2>
              <div className="ht-section-divider mx-auto" aria-hidden="true" />
              <p className="ht-muted-text mt-3">
                Professional podcast production tailored to your needs
              </p>
            </div>
          </FadeInUp>
          <StaggerContainer className="row g-4 align-items-stretch">
            {packages.map((pkg, i) => (
              <StaggerItem className="col-12 col-md-6 col-lg-4" key={pkg.id || i}>
                <PackageCard pkg={pkg} featured={pkg.badge === 'Best Value'} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}