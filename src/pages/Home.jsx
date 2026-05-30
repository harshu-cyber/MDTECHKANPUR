import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Microscope, FlaskConical, Award, Globe, Scale, Users } from 'lucide-react';
import { products } from '../data/products';
import { industries } from '../data/industries';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/Products/ProductCard';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="home-page-wrapper">
      <!-- 1. Hero Section (Vibrant, artistic & premium) -->
      <section className="hero-section ani-fade-in">
        <div className="hero-bg-gradient"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-pre-title">Leading B2B Industrial Compounding</span>
            <h1 className="hero-main-title">
              Engineering <span className="text-glow-accent">Polymer Excellence</span> for Global Industry
            </h1>
            <p className="hero-description">
              MD TechKanpur is a state-of-the-art manufacturer of Titanium White, Carbon Black, custom organic Color Masterbatches, and advanced functional Additive compounds. Exported internationally.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-large">
                <span>Explore Products</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-accent btn-large">
                Request Technical Quote
              </Link>
            </div>
          </div>
          
          <!-- Animated Technical Polymer Graphic (SVG) -->
          <div className="hero-graphic-container">
            <svg viewBox="0 0 400 400" className="hero-polymer-svg ani-float">
              <defs>
                <linearGradient id="glowG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#3b82f6" />
                  <stop offset="100%" stop-color="#fbbf24" />
                </linearGradient>
              </defs>
              <!-- Outer mesh -->
              <circle cx="200" cy="200" r="160" fill="none" stroke="url(#glowG)" stroke-width="2" opacity="0.15" stroke-dasharray="8 4" className="ani-spin-slow" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="var(--accent-primary)" stroke-width="1" opacity="0.3" />
              
              <!-- Molecular nodes -->
              <g className="ani-spin-slow" style={{ transformOrigin: '200px 200px', animationDuration: '40s' }}>
                <circle cx="200" cy="40" r="14" fill="var(--color-color-mb)" />
                <circle cx="360" cy="200" r="14" fill="var(--color-white-mb)" stroke="#cbd5e1" stroke-width="2" />
                <circle cx="200" cy="360" r="14" fill="var(--color-black-mb)" />
                <circle cx="40" cy="200" r="14" fill="var(--color-additive-mb)" />
                
                <line x1="200" y1="40" x2="200" y2="360" stroke="var(--border-secondary)" stroke-width="1.5" opacity="0.4" />
                <line x1="40" y1="200" x2="360" y2="200" stroke="var(--border-secondary)" stroke-width="1.5" opacity="0.4" />
              </g>
              
              <!-- Central Reactor -->
              <circle cx="200" cy="200" r="45" fill="var(--bg-glass-heavy)" stroke="url(#glowG)" stroke-width="4" />
              <text x="200" y="206" textAnchor="middle" font-family="var(--font-heading)" font-weight="900" font-size="16" fill="var(--text-primary)">MD TECH</text>
            </svg>
          </div>
        </div>
      </section>

      <!-- 2. B2B Corporate Stats Banner -->
      <section className="stats-banner-section">
        <div className="container stats-grid glass-panel shimmer-bg">
          <div className="stat-card">
            <span className="stat-number">55,000 MT</span>
            <span className="stat-label">Annual Combined Capacity</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">30+ Countries</span>
            <span className="stat-label">Worldwide Export Footprint</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">12,000+</span>
            <span className="stat-label">Custom Formulations Database</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">ΔE &lt; 0.8</span>
            <span className="stat-label">Spectrophotometer Precision Target</span>
          </div>
        </div>
      </section>

      <!-- 3. Product Catalog Showcase Section -->
      <section className="section">
        <div className="container">
          <div className="section-header animate-fade-in">
            <span className="section-subtitle">Polymer Masterbatches</span>
            <h2 className="section-title">Our B2B Product Portfolio</h2>
            <p className="section-desc">
              High-dispersion granules engineered to optimize mechanical performance and optical density on your film, injection, and compounding extrusion lines.
            </p>
          </div>

          <!-- Product Filter Tabs -->
          <div className="product-tabs-wrapper flex-center">
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              All Masterbatches
            </button>
            <button className={`tab-btn ${activeTab === 'white' ? 'active' : ''}`} onClick={() => setActiveTab('white')}>
              White (TiO₂)
            </button>
            <button className={`tab-btn ${activeTab === 'black' ? 'active' : ''}`} onClick={() => setActiveTab('black')}>
              Black
            </button>
            <button className={`tab-btn ${activeTab === 'color' ? 'active' : ''}`} onClick={() => setActiveTab('color')}>
              Spectrum Color
            </button>
            <button className={`tab-btn ${activeTab === 'additive' ? 'active' : ''}`} onClick={() => setActiveTab('activeTab' === 'additive' ? 'all' : 'additive')}>
              Functional Additives
            </button>
            <button className={`tab-btn ${activeTab === 'filler' ? 'active' : ''}`} onClick={() => setActiveTab('filler')}>
              Eco-Fillers
            </button>
          </div>

          <!-- Products Grid -->
          <div className="grid-3 product-grid-display">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <!-- 4. R&D Research Center MDTRIC (High-tech interactive segment) -->
      <section className="section section-bg-alt">
        <div className="container grid-2 rd-tech-grid">
          <div className="rd-content animate-fade-in">
            <span className="section-subtitle">Scientific Innovation</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>The MDTRIC R&amp;D Testing Lab Hub</h2>
            <p className="section-desc" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Our dedicated testing facility, **MD Tech Research &amp; Innovation Centre (MDTRIC)**, ensures that every polymer compound stands up to rigorous physical and chemical standards before reaching your silos.
            </p>
            
            <div className="tech-spec-list">
              <div className="tech-spec-bullet">
                <div className="bullet-icon-wrapper"><Microscope size={18} /></div>
                <div>
                  <span className="bullet-title">Spectrophotometer Color Analytics</span>
                  <span className="bullet-text">Precision color matching with Delta E values below 0.8 under D65 daylight, TL84 fluorescent, and CWF store light sources.</span>
                </div>
              </div>
              <div className="tech-spec-bullet">
                <div className="bullet-icon-wrapper"><FlaskConical size={18} /></div>
                <div>
                  <span className="bullet-title">Differential Scanning Calorimetry (DSC)</span>
                  <span className="bullet-text">Thermophysical assessments of melting points, crystallinity ratios, and degradation heat flows.</span>
                </div>
              </div>
              <div className="tech-spec-bullet">
                <div className="bullet-icon-wrapper"><Cpu size={18} /></div>
                <div>
                  <span className="bullet-title">Melt Flow Index (MFI) &amp; Density Testing</span>
                  <span className="bullet-text">Verifying fluid dynamics and dispersion profiles under strict ASTM D1238 standard protocols.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rd-visuals flex-center">
            <div className="lab-card glass-panel ani-float">
              <div className="lab-card-image-holder">
                <!-- Premium SVG representation of clean-room testing gears -->
                <svg viewBox="0 0 300 200" style={{ width: '100%', height: '100%', fill: 'none' }}>
                  <rect width="300" height="200" fill="#0b0f19" rx="16" />
                  <path d="M 30,170 L 270,170" stroke="rgba(255,255,255,0.05)" stroke-width="8" stroke-linecap="round" />
                  <path d="M 50,170 C 80,100 120,40 220,100" stroke="url(#glowG)" stroke-width="4" stroke-linecap="round" />
                  <circle cx="50" cy="170" r="6" fill="var(--accent-secondary)" />
                  <circle cx="220" cy="100" r="8" fill="var(--color-additive-mb)" />
                  
                  <text x="140" y="30" fill="#475569" font-size="11" letter-spacing="4" font-weight="800">POLYMER VISCOSITY CURVE</text>
                  <line x1="80" y1="120" x2="160" y2="120" stroke="#1e293b" stroke-width="2" stroke-dasharray="4 2" />
                </svg>
              </div>
              <div className="lab-card-body">
                <span className="lab-tag">ISO 17025 Facility</span>
                <span className="lab-title">Co-Creating Custom Polymer Formulations</span>
                <p className="lab-text">We collaborate directly with your engineering teams to develop custom carrier resins, specialized masterbatch concentrations, and environmental degradable compounds.</p>
                <Link to="/infrastructure" className="btn btn-secondary lab-btn-link">Explore R&amp;D Infrastructure</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Industries Served Slider/Grid Section -->
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Global Solutions</span>
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-desc">
              Providing customized polymer properties, FDA food-safety clearances, and extreme weather stabilizers for diverse global markets.
            </p>
          </div>

          <div className="grid-3 industries-grid">
            {industries.map(ind => (
              <div key={ind.id} className="industry-block glass-panel">
                <div className="ind-header">
                  <div className="ind-icon-box">
                    <ArrowRight className="ind-arrow" size={16} />
                  </div>
                  <h3 className="ind-title">{ind.name}</h3>
                </div>
                <p className="ind-desc">{ind.desc}</p>
                <div className="ind-details">
                  <span className="ind-demands-label">Industrial Demands:</span>
                  <span className="ind-demands-text">{ind.demands}</span>
                </div>
                <div className="ind-solutions-box">
                  {ind.solutions.map((sol, index) => (
                    <span key={index} className="ind-sol-tag">{sol}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <!-- 6. Trust & Testimonial Carousel -->
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">B2B Customer Success</span>
            <h2 className="section-title">Endorsed by Leading Processors</h2>
            <p className="section-desc">
              From continuous agricultural silage film lines to high-speed fiber spooling, we help industrial buyers secure stable materials.
            </p>
          </div>

          <div className="grid-3 testimonial-grid">
            {testimonials.map(test => (
              <div key={test.id} className="testimonial-card glass-panel">
                <div className="stars-row">
                  {"★".repeat(test.rating)}
                </div>
                <p className="testimonial-quote">"{test.quote}"</p>
                <div className="testimonial-profile">
                  <span className="profile-name">{test.author}</span>
                  <span className="profile-position">{test.position}</span>
                  <span className="profile-company">{test.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
