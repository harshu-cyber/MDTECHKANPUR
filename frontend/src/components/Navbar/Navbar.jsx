import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Award, Globe } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const location = useLocation();

  // Handle sticky glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile sidebar on route transition
  useEffect(() => {
    setIsOpen(false);
    setShowMegaMenu(false);
  }, [location]);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Upper Utility Bar (Premium B2B Vibe) */}
      <div className="navbar-top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-item">
            <Globe size={13} />
            <span>525 K, Barra Vishwa Bank, Kanpur — Sales &amp; Service</span>
          </div>
          <div className="top-bar-item flex-right">
            <Award size={13} color="var(--accent-primary)" />
            <span>📞 7499645819 &nbsp;|&nbsp; Plastic Machinery Specialist</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="navbar-main">
        <div className="container main-nav-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src="/logo-new.png" alt="MD TechKanpur Logo" className="navbar-logo" />
          </Link>

          {/* Desktop Routes */}
          <nav className="desktop-nav">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Corporate Profile
            </NavLink>
            <NavLink to="/founder" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Our Team
            </NavLink>
            
            {/* Products with Mega Dropdown Hover */}
            <div 
              className="nav-link-dropdown-wrapper"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <NavLink 
                to="/products" 
                className={({ isActive }) => `nav-link nav-link-dropdown ${isActive ? 'active' : ''}`}
              >
                Machinery &amp; Products <ChevronDown size={14} className="dropdown-arrow" />
              </NavLink>

              {showMegaMenu && (
                <div className="mega-dropdown ani-scale-in">
                  <div className="mega-grid">
                    <div className="mega-col intro-col">
                      <span className="mega-col-title">MD Tech Machinery</span>
                      <p className="mega-col-desc">Explore our high-performance extruders, injection moulding systems, robust auxiliary equipment, and genuine spare parts.</p>
                      <Link to="/products" className="btn btn-primary mega-cta-btn" onClick={() => setShowMegaMenu(false)}>View Full Catalog</Link>
                    </div>
                    <div className="mega-col links-col">
                      <span className="mega-col-title">Machinery Categories</span>
                      <div className="mega-links-grid">
                        <Link to="/products?category=extruder" className="mega-link-item" onClick={() => setShowMegaMenu(false)}>
                          <span className="badge-dot color-additive"></span>
                          <div>
                            <span className="mega-link-name">Plastic Extruders</span>
                            <span className="mega-link-sub">Single &amp; twin screw extruders</span>
                          </div>
                        </Link>
                        <Link to="/products?category=moulding" className="mega-link-item" onClick={() => setShowMegaMenu(false)}>
                          <span className="badge-dot color-color"></span>
                          <div>
                            <span className="mega-link-name">Injection Moulding</span>
                            <span className="mega-link-sub">Servo-driven precision machines</span>
                          </div>
                        </Link>
                        <Link to="/products?category=auxiliary" className="mega-link-item" onClick={() => setShowMegaMenu(false)}>
                          <span className="badge-dot color-filler"></span>
                          <div>
                            <span className="mega-link-name">Auxiliary Equipment</span>
                            <span className="mega-link-sub">Dryers, chillers &amp; autoloaders</span>
                          </div>
                        </Link>
                        <Link to="/products?category=spares" className="mega-link-item" onClick={() => setShowMegaMenu(false)}>
                          <span className="badge-dot color-white"></span>
                          <div>
                            <span className="mega-link-name">Genuine Spare Parts</span>
                            <span className="mega-link-sub">Screws, barrels &amp; custom parts</span>
                          </div>
                        </Link>
                        <Link to="/products?category=raw_material" className="mega-link-item" onClick={() => setShowMegaMenu(false)}>
                          <span className="badge-dot color-black"></span>
                          <div>
                            <span className="mega-link-name">Raw Materials</span>
                            <span className="mega-link-sub">Premium PP, PE, ABS granules</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/infrastructure" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Infrastructure
            </NavLink>
            <NavLink to="/careers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Careers
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact &amp; Inquiries
            </NavLink>
          </nav>

          {/* Right Action Controls (Theme, B2B CTA) */}
          <div className="nav-controls">
            <ThemeToggle />
            <Link to="/admin" className="btn btn-primary nav-cta-desktop">
              Login
            </Link>
            {/* Mobile Menu Toggle Button */}
            <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
            <img src="/logo-new.png" alt="MD TechKanpur Logo" className="navbar-logo" />
          </Link>
          <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)} end>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Corporate Profile
          </NavLink>
          <NavLink to="/founder" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Our Team
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Machinery &amp; Products
          </NavLink>
          <NavLink to="/infrastructure" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Infrastructure
          </NavLink>
          <NavLink to="/careers" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Careers
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Contact &amp; Inquiries
          </NavLink>
          
          <div className="mobile-nav-cta">
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setIsOpen(false)}>
              Request Product Catalog
            </Link>
          </div>
        </nav>
      </div>
      {isOpen && <div className="mobile-drawer-backdrop" onClick={() => setIsOpen(false)}></div>}
    </header>
  );
};

export default Navbar;
