import React from 'react';
import { ShieldCheck, Recycle, Factory, Landmark, Award, ChevronRight } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-wrapper ani-fade-in">
      <!-- 1. Page Header Hero -->
      <section className="about-hero-section">
        <div className="container">
          <span className="section-subtitle">Corporate Profile</span>
          <h1 className="about-hero-title">MD TechKanpur Integrity</h1>
          <p className="about-hero-desc">
            For decades, we have been providing technical precision in chemical compounding to serve downstream plastic converting lines globally.
          </p>
        </div>
      </section>

      <!-- 2. Profile Summary & Executive Message -->
      <section className="section">
        <div className="container grid-2 profile-grid">
          <div className="profile-content">
            <h2 className="about-section-title">The Foundation of MD Tech</h2>
            <p className="about-paragraph">
              MD TechKanpur was established with a singular mission: to elevate the quality standards of plastic processing by supplying polymer masterbatches of uncompromised dispersion and compounding accuracy.
            </p>
            <p className="about-paragraph">
              From our state-of-the-art facilities in Dadanagar, Kanpur, we have grown from a regional compounding plant into an international B2B exporter. Our commitment is rooted in active material sciences, strict quality checkpoints, and environmental sustainability.
            </p>
            
            <!-- Bullet Highlight -->
            <div className="quote-box glass-panel">
              <p className="quote-text">
                "Our B2B clients don't just buy masterbatches; they purchase structural guarantee, surface sheen, and production efficiency. We co-create formulations that keep extrusion lines running continuously."
              </p>
              <span className="quote-author">- Technical Compounding Directorate, MD Tech</span>
            </div>
          </div>

          <div className="profile-visuals flex-center">
            <div className="profile-stats-card glass-panel shimmer-bg">
              <span className="stats-header-title">Global Compliance & Standards</span>
              
              <div className="compliance-row">
                <ShieldCheck size={20} color="#25d366" />
                <div>
                  <span className="compliance-name">FDA Food Contact Standard</span>
                  <span className="compliance-desc">Safe for direct food and beverage packaging lines.</span>
                </div>
              </div>

              <div className="compliance-row">
                <Award size={20} color="var(--accent-secondary)" />
                <div>
                  <span className="compliance-name">ISO 9001:2015 Certification</span>
                  <span className="compliance-desc">Strict quality systems checking every raw material silo.</span>
                </div>
              </div>

              <div className="compliance-row">
                <Recycle size={20} color="#06b6d4" />
                <div>
                  <span className="compliance-name">REACH & RoHS Declarations</span>
                  <span className="compliance-desc">Zero heavy metals or restricted hazardous chemicals.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Our Four Core Corporate Pillars -->
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Operational Creed</span>
            <h2 className="section-title">Our Corporate Pillars</h2>
            <p className="section-desc">
              How we drive continuous value, scientific research, and long-term customer partnerships.
            </p>
          </div>

          <div className="grid-4 pillars-grid">
            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Factory size={24} /></div>
              <h3 className="pillar-title">Technical Integrity</h3>
              <p className="pillar-desc">Continuous twin-screw compounding lines configured to ensure perfect dispersion indexes with zero filter-pressure warnings.</p>
            </div>

            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><ShieldCheck size={24} /></div>
              <h3 className="pillar-title">Uncompromising Quality</h3>
              <p className="pillar-desc">Checking physical properties including density, Melt Flow Index (MFI), thermal decomposition, and moisture retention limits.</p>
            </div>

            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Recycle size={24} /></div>
              <h3 className="pillar-title">Eco Sustainability</h3>
              <p className="pillar-desc">Engineering bio-degradable polymer compounds and carrier-free liquid options to assist processors in reducing carbon footprints.</p>
            </div>

            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Landmark size={24} /></div>
              <h3 className="pillar-title">Distributor Trust</h3>
              <p className="pillar-desc">Honoring prompt logistics timelines, transparent custom-formulations parameters, and direct support desk availability.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Green Initiative (Bio & Circular Economy focus) -->
      <section className="section green-initiative-section">
        <div className="green-overlay"></div>
        <div className="container green-container">
          <div className="green-content glass-panel">
            <div className="green-badge">
              <Recycle size={14} />
              <span>Bio-polymer Compounds</span>
            </div>
            <h2 className="green-title">Commitment to Circular Economics</h2>
            <p className="green-desc">
              MD TechKanpur is actively pioneering starch-based and PLA-based biodegradable masterbatches. Our advanced formulations allow environmental bag-converters and thermoformers to exceed local regulatory norms and satisfy ecological mandates.
            </p>
            <ul className="green-bullets">
              <li>Formulated with organic compostable matrices conforming to ASTM D6400 / EN 13432.</li>
              <li>Slightly lower processing temperatures, reducing energy expenditure during final extrusion.</li>
              <li>Custom additive blends containing heavy-duty UV blocks to prevent premature biodegradation outdoors.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
