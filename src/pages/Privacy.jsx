import { FadeInUp, FadeIn } from '../components/AnimatedSection';
import { siteConfig } from '../config/site';
import SEO from '../components/SEO';

/**
 * Privacy Policy page - GDPR compliant
 */
export default function Privacy() {
  const { name, contact, url } = siteConfig;

  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`Privacy Policy for ${name}. Learn how we collect, use, and protect your personal information.`}
      />

      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container py-4">
          <FadeInUp>
            <h1 className="display-4 fw-bold mb-3">Privacy Policy</h1>
            <p className="lead text-white-50">
              Last updated: February 2026
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <FadeIn>
                <div className="privacy-content">
                  
                  <h2>1. Introduction</h2>
                  <p>
                    {name} ("we", "us", or "our") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, and safeguard your 
                    information when you visit our website at {url}.
                  </p>

                  <h2>2. Information We Collect</h2>
                  <h3>Information You Provide</h3>
                  <p>When you use our contact or booking forms, we collect:</p>
                  <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Company/Organisation name (optional)</li>
                    <li>Message content</li>
                    <li>Preferred booking dates</li>
                  </ul>

                  <h3>Information Collected Automatically</h3>
                  <p>When you visit our website, we may automatically collect:</p>
                  <ul>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                  </ul>

                  <h2>3. Cookies</h2>
                  <p>
                    Cookies are small text files stored on your device. We use cookies to:
                  </p>
                  <ul>
                    <li><strong>Essential cookies:</strong> Remember your cookie consent preference</li>
                    <li><strong>Third-party cookies:</strong> YouTube embeds may set cookies when you view video content</li>
                  </ul>
                  <p>
                    You can control cookies through your browser settings. Note that disabling 
                    cookies may affect the functionality of some features.
                  </p>

                  <h3>Cookie Preferences</h3>
                  <p>
                    When you first visit our site, you'll see a cookie banner asking for your consent. 
                    Your choice is stored locally and remembered for future visits. You can change 
                    your preference at any time by clearing your browser's local storage.
                  </p>

                  <h2>4. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Respond to your enquiries and booking requests</li>
                    <li>Provide and maintain our services</li>
                    <li>Send booking confirmations and relevant communications</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>

                  <h2>5. Third-Party Services</h2>
                  <p>We use the following third-party services:</p>
                  <ul>
                    <li>
                      <strong>EmailJS:</strong> To process contact and booking form submissions. 
                      View their <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">privacy policy</a>.
                    </li>
                    <li>
                      <strong>YouTube:</strong> For embedded video content. 
                      View their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
                    </li>
                  </ul>

                  <h2>6. Data Retention</h2>
                  <p>
                    We retain your personal information only for as long as necessary to fulfil 
                    the purposes outlined in this policy, unless a longer retention period is 
                    required by law.
                  </p>

                  <h2>7. Your Rights (GDPR)</h2>
                  <p>Under GDPR, you have the right to:</p>
                  <ul>
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                    <li><strong>Portability:</strong> Request transfer of your data</li>
                    <li><strong>Object:</strong> Object to processing of your data</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the details below.
                  </p>

                  <h2>8. Data Security</h2>
                  <p>
                    We implement appropriate technical and organisational measures to protect 
                    your personal information. However, no method of transmission over the 
                    Internet is 100% secure.
                  </p>

                  <h2>9. Children's Privacy</h2>
                  <p>
                    Our website is not intended for children under 16. We do not knowingly 
                    collect personal information from children.
                  </p>

                  <h2>10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you 
                    of any changes by posting the new policy on this page and updating the 
                    "Last updated" date.
                  </p>

                  <h2>11. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or wish to exercise 
                    your data protection rights, please contact us:
                  </p>
                  <ul className="list-unstyled">
                    <li><strong>Email:</strong> {contact.email}</li>
                    <li><strong>Phone:</strong> {contact.phone}</li>
                    <li><strong>Address:</strong> {contact.address}</li>
                  </ul>

                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .privacy-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .privacy-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.2rem;
          font-weight: 500;
        }

        .privacy-content p,
        .privacy-content li {
          color: #555;
          line-height: 1.7;
        }

        .privacy-content ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .privacy-content li {
          margin-bottom: 0.5rem;
        }

        .privacy-content a {
          color: var(--primary, #7c3aed);
        }

        .privacy-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
