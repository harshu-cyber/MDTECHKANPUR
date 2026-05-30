import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Award, FileCheck2 } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you! Our B2B Distribution Relations desk will reach out to you with catalog files.");
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-top-deck">
        <div className="container footer-grid">
          {/* Col 1: Brand Profile */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link">
              <img src="/logo.svg" alt="MD TechKanpur Logo" className="footer-logo" />
            </Link>
            <p className="brand-summary">
              A pioneering manufacturer of high-performance polymer masterbatches and custom additive compounds. Delivering absolute batch consistency and thermal stability for international polymer processors.
            </p>
            <div className="cert-seals">
              <div className="seal-badge" title="ISO 9001:2015 Quality Standard">
                <Award size={14} color="var(--accent-secondary)" />
                <span>ISO 9001</span>
              </div>
              <div className="seal-badge" title="US FDA Food Safe Grade Compliance">
                <FileCheck2 size={14} color="#25d366" />
                <span>FDA Food Grade</span>
              </div>
            </div>
          </div>

          {/* Col 2: Sitemap Quicklinks */}
          <div className="footer-col sitemap-col">
            <span className="footer-col-title">Sitemap</span>
            <ul className="footer-links">
              <li><Link to="/">Corporate Home</Link></li>
              <li><Link to="/about">Corporate Profile</Link></li>
              <li><Link to="/products">Masterbatch Catalog</Link></li>
              <li><Link to="/infrastructure">Machinery &amp; Infrastructure</Link></li>
              <li><Link to="/contact">Inquiries &amp; Quotes</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact Info Cards */}
          <div className="footer-col contact-col">
            <span className="footer-col-title">Sales &amp; Head Office</span>
            <div className="footer-contact-details">
              <div className="contact-item">
                <MapPin className="contact-icon" size={16} />
                <span>Industrial Area, Dadanagar, Kanpur - 208022, Uttar Pradesh, India</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={16} />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={16} />
                <a href="mailto:sales@mdtechkanpur.com">sales@mdtechkanpur.com</a>
              </div>
            </div>
          </div>

          {/* Col 4: Distributor Newsletter */}
          <div className="footer-col newsletter-col">
            <span className="footer-col-title">Distributor Relations</span>
            <p className="newsletter-pitch">
              Subscribe to receive technical property upgrades, new formulation launches, and global freight rate indices.
            </p>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="subscribe-input" 
                  placeholder="Enter corporate email..." 
                  required 
                />
                <button type="submit" className="subscribe-btn" aria-label="Subscribe to updates">
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Deck */}
      <div className="footer-bottom-deck">
        <div className="container bottom-deck-container">
          <p className="copyright-text">
            &copy; {currentYear} MD TechKanpur. All rights reserved. Designed for Premium B2B Global Trade.
          </p>
          <div className="legal-links">
            <span className="compliance-tag" title="REACH Chemicals Safety Standard">REACH Compliant</span>
            <span className="compliance-tag" title="RoHS Non-Hazardous Substance standard">RoHS Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
