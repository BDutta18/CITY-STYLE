// Contributor: Use this component to migrate the 'legacy_source/pages/Terms&conditons.html' page.
import React, { useEffect, useState } from 'react';
import '../styles/index.css'; // Ensure global styles are available
import '../styles/TermsConditions.css';
import Breadcrumb from '../components/Breadcrumb';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'user-agreements', title: 'User Agreements' },
    { id: 'purchases-payments', title: 'Purchases & Payments' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'changes-terms', title: 'Changes to Terms' },
    { id: 'contact-us', title: 'Contact Us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for fixed header

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="terms-container">
        <aside className="terms-sidebar">
          <h3>Table of Contents</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={(e) => scrollToSection(e, section.id)}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="terms-content">
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last Updated: October 24, 2023</p>

          <section id="introduction" className="terms-section">
            <h2>Introduction</h2>
            <p>
              Welcome to City Style. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
            </p>
            <p>
              Our platform provides an online marketplace for fashion and lifestyle products. We reserve the right to update, change, or replace any part of these Terms and Conditions by posting updates and/or changes to our website.
            </p>
          </section>

          <section id="user-agreements" className="terms-section">
            <h2>User Agreements</h2>
            <p>
              By using our services, you represent and warrant that you are at least the age of majority in your state or province of residence, or that you are the age of majority and you have given us your consent to allow any of your minor dependents to use this site.
            </p>
            <ul>
              <li>You must not use our products for any illegal or unauthorized purpose.</li>
              <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
              <li>A breach or violation of any of the Terms will result in an immediate termination of your Services.</li>
            </ul>
          </section>

          <section id="purchases-payments" className="terms-section">
            <h2>Purchases & Payments</h2>
            <p>
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
            </p>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
            </p>
          </section>

          <section id="intellectual-property" className="terms-section">
            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of City Style and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of City Style.
            </p>
          </section>

          <section id="limitation-liability" className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>
              In no case shall City Style, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages.
            </p>
            <p>
              Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
            </p>
          </section>

          <section id="changes-terms" className="terms-section">
            <h2>Changes to Terms</h2>
            <p>
              You can review the most current version of the Terms and Conditions at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms and Conditions by posting updates and changes to our website.
            </p>
            <p>
              It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms and Conditions constitutes acceptance of those changes.
            </p>
          </section>

          <section id="contact-us" className="terms-section">
            <h2>Contact Us</h2>
            <p>
              Questions about the Terms and Conditions should be sent to us at support@citystyle.com.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
