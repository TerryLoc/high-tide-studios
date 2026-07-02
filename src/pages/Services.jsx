import { useState } from 'react';
import SEO from '../components/SEO';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from '../components/AnimatedSection';
import { businessPackages, packages } from '../data/packages';
import PackageCard from '../components/PackageCard';

export default function Services() {
  const [activeTab, setActiveTab] = useState('individual');
  const visiblePackages =
    activeTab === 'business' ? businessPackages : packages;

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
          <div
            className="ht-services-tabs"
            role="tablist"
            aria-label="Service package type">
            <button
              type="button"
              className={`ht-services-tab ${activeTab === 'individual' ? 'ht-services-tab--active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'individual'}
              aria-controls="services-packages-panel"
              id="services-tab-individual"
              onClick={() => setActiveTab('individual')}>
              For Individuals &amp; Creators
            </button>
            <button
              type="button"
              className={`ht-services-tab ${activeTab === 'business' ? 'ht-services-tab--active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'business'}
              aria-controls="services-packages-panel"
              id="services-tab-business"
              onClick={() => setActiveTab('business')}>
              For Business
            </button>
          </div>
          <div
            id="services-packages-panel"
            role="tabpanel"
            aria-labelledby={
              activeTab === 'business'
                ? 'services-tab-business'
                : 'services-tab-individual'
            }>
            <StaggerContainer
              key={activeTab}
              className="row g-4 align-items-stretch">
              {visiblePackages.map((pkg, i) => (
                <StaggerItem
                  className="col-12 col-md-6 col-lg-4"
                  key={pkg.id || i}>
                  <PackageCard
                    pkg={pkg}
                    featured={pkg.badge === 'Best Value'}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
