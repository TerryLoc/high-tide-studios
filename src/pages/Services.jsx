import { useState } from 'react';
import SEO from '../components/SEO';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from '../components/AnimatedSection';
import {
  businessPackages,
  onLocationPackages,
  packages,
} from '../data/packages';
import PackageCard from '../components/PackageCard';

const TABS = [
  { id: 'individual', label: 'For Individuals & Creators', data: packages },
  { id: 'business', label: 'For Business', data: businessPackages },
  { id: 'on-location', label: 'On Location', data: onLocationPackages },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('individual');
  const visiblePackages =
    TABS.find((tab) => tab.id === activeTab)?.data || packages;

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
            <p className="ht-services-price-teaser">Packages from €299</p>
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
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`ht-services-tab ${activeTab === tab.id ? 'ht-services-tab--active' : ''}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="services-packages-panel"
                id={`services-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div
            id="services-packages-panel"
            role="tabpanel"
            aria-labelledby={`services-tab-${activeTab}`}>
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
