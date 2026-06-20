import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Settings, Wrench, Package } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you! We will be in touch shortly with our latest offers and updates.");
  };

  return (
    <footer className="footer-wrapper">
      {/* Gold top accent line */}
      <div className="footer-gold-bar" />

      <div className="footer-top-deck">
        <div className="container footer-grid">

          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link">
              <img src="/logo-new.png" alt="MD TechKanpur Logo" className="footer-logo" />
            </Link>
            <p className="brand-summary">
              MD TechKanpur is Kanpur's trusted partner for Plastic Machinery Sales, Service,
              Spare Parts & Raw Material Supply. <em>Innovate · Produce · Empower.</em>
            </p>
            <div className="footer-social-row">
              <a
                href="https://wa.me/917499645819?text=Hello%20MD%20TechKanpur%2C%20I%20want%20to%20inquire%20about%20plastic%20machinery."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn wa-btn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Us
              </a>
              <a href="tel:7499645819" className="footer-social-btn call-btn">
                <Phone size={14} />
                Call Now
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <span className="footer-col-title">Quick Links</span>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/founder">Our Team</Link></li>
              <li><Link to="/products">Products & Machinery</Link></li>
              <li><Link to="/infrastructure">Infrastructure</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact & Inquiries</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col">
            <span className="footer-col-title">Our Services</span>
            <ul className="footer-links">
              <li>
                <span className="footer-link-icon"><Settings size={12} /></span>
                Plastic Extruders
              </li>
              <li>
                <span className="footer-link-icon"><Settings size={12} /></span>
                Injection Moulding Machines
              </li>
              <li>
                <span className="footer-link-icon"><Package size={12} /></span>
                Auxiliary Equipment
              </li>
              <li>
                <span className="footer-link-icon"><Wrench size={12} /></span>
                Servicing & Maintenance
              </li>
              <li>
                <span className="footer-link-icon"><Wrench size={12} /></span>
                AMC Contracts
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col contact-col">
            <span className="footer-col-title">Contact Us</span>
            <div className="footer-contact-details">
              <div className="contact-item">
                <MapPin className="contact-icon" size={16} />
                <span>526 K, Barra Vishwa Bank,<br />Kanpur, Uttar Pradesh, India</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={16} />
                <a href="tel:7499645819">7499645819</a>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={16} />
                <a href="mailto:m.d.techkanpur@gmail.com">m.d.techkanpur@gmail.com</a>
              </div>
            </div>

            {/* Quick message */}
            <div className="footer-quick-msg">
              <span className="footer-col-title" style={{ marginTop: '1.5rem' }}>Quick Message</span>
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <div className="input-group">
                  <input
                    type="text"
                    className="subscribe-input"
                    placeholder="Your name or message..."
                    required
                  />
                  <button type="submit" className="subscribe-btn" aria-label="Send message">
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Deck */}
      <div className="footer-bottom-deck">
        <div className="container">
          {/* Row 1: copyright + compliance tags */}
          <div className="bottom-deck-top">
            <p className="copyright-text">
              © {currentYear} <strong>MD TechKanpur</strong>. All rights reserved.
              &nbsp;·&nbsp; Kanpur's Trusted Plastic Machinery Partner
            </p>
            <div className="bottom-tags">
              <span className="compliance-tag">Sales &amp; Service</span>
              <span className="compliance-tag">AMC Available</span>
              <span className="compliance-tag">Genuine Spare Parts</span>
            </div>
          </div>

          {/* Row 2: Made with credit — pinned to the left */}
          <div className="footer-credit-row">
            <span className="footer-maker">
              Made with <span role="img" aria-label="heart">❤️</span> by Brajwasi's Coders
            </span>
            {/* Inline SVG circular BC logo */}
            <span className="footer-bc-logo" title="Brajwasi's Coders">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="22" height="22">
                <circle cx="18" cy="18" r="18" fill="#0d0d1a" />
                <circle cx="18" cy="18" r="17" fill="none" stroke="#c9a227" strokeWidth="0.8" />
                {/* B letter */}
                <text x="6" y="23" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" fill="#4a8fff">B</text>
                {/* code symbol */}
                <text x="14.5" y="21" fontFamily="monospace" fontSize="7" fill="#c9a227">&lt;/&gt;</text>
                {/* C letter */}
                <text x="24" y="23" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" fill="#c9a227">C</text>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
