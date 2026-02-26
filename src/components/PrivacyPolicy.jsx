import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Privacy Policy | Akino Studio — Video Production Agency'
    return () => {
      document.title = 'Akino Studio — Video Production Agency | Brand Films, Social Shorts & Campaign Videos'
    }
  }, [])

  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="privacy-header-inner">
          <Link to="/" className="privacy-back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <Link to="/" className="privacy-logo">
            <img src="/logo.svg" alt="Akino Studio" className="privacy-logo-img" />
          </Link>
        </div>
      </header>

      <main className="privacy-content">
        <div className="privacy-content-inner">
          <div className="privacy-hero">
            <span className="section-tag">&lt; Privacy Policy &gt;</span>
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-effective">Effective Date: February 26, 2026</p>
          </div>

          <div className="privacy-body">
            <section className="privacy-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Akino Studio ("Company," "we," "us," or "our"). We are a professional
                video production agency specializing in brand films, social shorts, campaign videos,
                and creative content production. We are committed to protecting your personal
                information and your right to privacy.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website, engage our video production services, or
                otherwise interact with us. Please read this policy carefully. If you do not agree
                with the terms of this Privacy Policy, please do not access our website or use our
                services.
              </p>
            </section>

            <section className="privacy-section">
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information You Provide</h3>
              <p>We may collect personal information that you voluntarily provide when you:</p>
              <ul>
                <li>Fill out our contact form or request a project consultation</li>
                <li>Subscribe to our newsletter</li>
                <li>Communicate with us via email, phone, or social media</li>
                <li>Enter into a contract for video production services</li>
                <li>Participate in testimonials or case studies</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name and job title</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company or organization name</li>
                <li>Project details and creative briefs</li>
                <li>Billing and payment information</li>
              </ul>

              <h3>2.2 Information Collected Automatically</h3>
              <p>
                When you visit our website, we may automatically collect certain information about
                your device and browsing activity, including:
              </p>
              <ul>
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited, time spent on pages, and navigation paths</li>
                <li>Referring website or source</li>
                <li>Device type (desktop, tablet, mobile)</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li>
                  <strong>Service Delivery:</strong> To provide video production services, manage
                  projects, communicate about deliverables, and fulfill contractual obligations.
                </li>
                <li>
                  <strong>Communication:</strong> To respond to inquiries, send project updates,
                  and provide customer support.
                </li>
                <li>
                  <strong>Marketing:</strong> To send newsletters, share our latest work and
                  showreels, and inform you about new services — only with your consent.
                </li>
                <li>
                  <strong>Website Improvement:</strong> To analyze usage patterns, improve website
                  performance, and enhance user experience.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> To comply with applicable laws, regulations,
                  and legal processes.
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>4. Video Content & Intellectual Property</h2>
              <p>
                As a video production agency, we handle creative content on behalf of our clients.
                Please note:
              </p>
              <ul>
                <li>
                  All raw footage, final deliverables, and project files are handled according to
                  the terms specified in your individual production agreement.
                </li>
                <li>
                  We may feature completed projects in our portfolio, showreel, or case studies
                  unless otherwise agreed upon in writing.
                </li>
                <li>
                  Any individuals appearing in video productions will be asked to provide
                  appropriate release forms and consent.
                </li>
                <li>
                  Client-provided assets (logos, brand guidelines, music licenses) are used solely
                  for the contracted project and are not shared with third parties.
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>5. Sharing Your Information</h2>
              <p>
                We do not sell, rent, or trade your personal information. We may share your
                information only in the following circumstances:
              </p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> With trusted third-party vendors who assist
                  in our operations (e.g., cloud storage for project files, email marketing
                  platforms, payment processors).
                </li>
                <li>
                  <strong>Production Partners:</strong> With freelance crew members, editors, or
                  production partners involved in your project, limited to what is necessary for
                  project delivery.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, regulation, or legal
                  process, or to protect our rights and safety.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                  sale of assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>6. Data Storage & Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect
                your personal information, including:
              </p>
              <ul>
                <li>Encrypted file transfer for project deliverables and sensitive documents</li>
                <li>Secure cloud storage with access controls for project assets</li>
                <li>Regular review of data collection, storage, and processing practices</li>
                <li>Restricted access to personal information on a need-to-know basis</li>
              </ul>
              <p>
                While we strive to protect your information, no method of electronic transmission
                or storage is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </section>

            <section className="privacy-section">
              <h2>7. Cookies & Tracking Technologies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your
                browsing experience. These may include:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors interact with
                  our website so we can improve performance and content.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and
                  track campaign effectiveness.
                </li>
              </ul>
              <p>
                You can control cookie preferences through your browser settings. Disabling certain
                cookies may affect website functionality.
              </p>
            </section>

            <section className="privacy-section">
              <h2>8. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for marketing communications at any time</li>
                <li>Object to or restrict certain processing of your data</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the details provided
                below. We will respond to your request within 30 days.
              </p>
            </section>

            <section className="privacy-section">
              <h2>9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites and platforms, including our
                social media profiles on TikTok, Instagram, LinkedIn, and YouTube. We are not
                responsible for the privacy practices or content of these external sites. We
                encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="privacy-section">
              <h2>10. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this Privacy Policy, unless a longer retention period is
                required or permitted by law. Specifically:
              </p>
              <ul>
                <li>
                  <strong>Project Data:</strong> Production files and project-related information
                  are retained for up to 2 years after project completion, unless otherwise agreed.
                </li>
                <li>
                  <strong>Contact Information:</strong> Retained for the duration of our business
                  relationship and up to 3 years after last contact.
                </li>
                <li>
                  <strong>Newsletter Subscribers:</strong> Until you unsubscribe or request removal.
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>11. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 16. We do not
                knowingly collect personal information from children. If we learn that we have
                collected personal data from a child under 16, we will take steps to delete that
                information promptly.
              </p>
            </section>

            <section className="privacy-section">
              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, technology, or legal requirements. The updated version will be indicated
                by the "Effective Date" at the top of this page. We encourage you to review this
                policy periodically. Continued use of our website or services after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="privacy-section">
              <h2>13. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please contact us:
              </p>
              <div className="privacy-contact-block">
                <p><strong>Akino Studio</strong></p>
                <p>Email: privacy@akinostudio.com</p>
                <p>Website: akinostudio.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="privacy-footer">
        <div className="privacy-footer-inner">
          <span>&copy; 2026 Akino Studio. All rights reserved.</span>
          <Link to="/" className="privacy-home-link">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}

export default PrivacyPolicy
