import SEO from '../components/SEO';
import { FadeInUp, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { packages } from "../data/packages";
import PackageCard from "../components/PackageCard";




export default function Services() {
  // ...your component code...
  return (
    <>
      <SEO page="services" />

      {/* Hero Section */}
      <section className="hero-main text-center">
        <div className="container">
          <FadeInUp>
            <p className="text-uppercase small opacity-75 mb-2">Services</p>
            <h1 className="display-5 fw-bold mb-3">Pick Your Perfect Package</h1>
            <p className="lead">
              Professional recording packages can be tailored to your needs.
            </p>
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
    </>
  )
}