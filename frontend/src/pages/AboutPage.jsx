import React from 'react';
import { ShieldCheck, Recycle, Factory, Landmark, Award, Zap, Cpu } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-wrapper ani-fade-in">
      {/* 1. Page Header Hero */}
      <section className="about-hero-section">
        <div className="container">
          <span className="section-subtitle">Corporate Profile</span>
          <h1 className="about-hero-title">MD TechKanpur Machinery</h1>
          <p className="about-hero-desc">
            For over 20 years, we have been providing technical precision, factory-grade servicing, and premium sales support for plastic converting machinery across Kanpur and northern India.
          </p>
        </div>
      </section>

      {/* 2. Profile Summary & Executive Message */}
      <section className="section">
        <div className="container grid-2 profile-grid">
          <div className="profile-content">
            <h2 className="about-section-title">The Foundation of MD TechKanpur</h2>
            <p className="about-paragraph">
              MD TechKanpur was established with a singular mission: to elevate the operational efficiency and quality standards of plastic processing units by supplying state-of-the-art machinery, certified technical overhauls, and premium replacement components.
            </p>
            <p className="about-paragraph">
              Operating from our dedicated technical service points and parts hubs in Dadanagar, Kanpur, we have grown from a specialized servicing team into a trusted B2B machinery dealer. Our commitment is rooted in practical mechanical science, robust electric and hydraulic standards, and rapid service response times.
            </p>
            
            {/* Executive Quote */}
            <div className="quote-box glass-panel">
              <p className="quote-text">
                "Our B2B partners don't just buy plastic machinery; they purchase production reliability and technical uptime. We ensure that every refurbished extruder, servo hydraulic press, or spare screw &amp; barrel is calibrated to run at peak capacity with minimum energy consumption."
              </p>
              <span className="quote-author">- Technical Operations Directorate, MD TechKanpur</span>
            </div>
          </div>

          <div className="profile-visuals flex-center">
            <div className="profile-stats-card glass-panel shimmer-bg">
              <span className="stats-header-title">Technical Competence &amp; Standards</span>
              
              <div className="compliance-row">
                <Cpu size={20} color="#c9a227" />
                <div>
                  <span className="compliance-name">Servo Hydraulic Tuning</span>
                  <span className="compliance-desc">Retrofitting and optimization for up to 50% power savings.</span>
                </div>
              </div>

              <div className="compliance-row">
                <Award size={20} color="#e6b933" />
                <div>
                  <span className="compliance-name">15-Point Diagnostic QC</span>
                  <span className="compliance-desc">Rigorous checks covering barrel straightness, pressure limits, and PLC response.</span>
                </div>
              </div>

              <div className="compliance-row">
                <ShieldCheck size={20} color="#25d366" />
                <div>
                  <span className="compliance-name">OEM-Quality Replacement Spares</span>
                  <span className="compliance-desc">Supplying precision screws, barrels, and heaters directly from top-tier makers.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Four Core Corporate Pillars */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Operational Creed</span>
            <h2 className="section-title">Our Corporate Pillars</h2>
            <p className="section-desc">
              How we drive continuous value, engineering research, and long-term customer partnerships.
            </p>
          </div>

          <div className="grid-4 pillars-grid">
            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Factory size={24} /></div>
              <h3 className="pillar-title">Technical Integrity</h3>
              <p className="pillar-desc">Factory-grade servicing and rebuild programs configured to extend machine lifespan and ensure precise output controls.</p>
            </div>

            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Zap size={24} /></div>
              <h3 className="pillar-title">Rapid Breakdown Support</h3>
              <p className="pillar-desc">Emergency technical dispatch teams handling breakdown calls within 2 to 4 hours across Kanpur and neighboring industrial zones.</p>
            </div>

            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Recycle size={24} /></div>
              <h3 className="pillar-title">Eco-Efficiency Support</h3>
              <p className="pillar-desc">Modifying screws and tuning thermal profiles to help processors extrude eco-friendly biodegradable PLA compounds seamlessly.</p>
            </div>

            <div className="pillar-card glass-panel">
              <div className="pillar-icon"><Landmark size={24} /></div>
              <h3 className="pillar-title">Dealer Transparency</h3>
              <p className="pillar-desc">Honoring prompt shipping timelines on replacement spares, fair AMC terms, and offering certified warranty on all machinery deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Green Initiative (Bio & Circular Economy focus) */}
      <section className="section green-initiative-section">
        <div className="green-overlay"></div>
        <div className="container green-container">
          <div className="green-content glass-panel">
            <div className="green-badge">
              <Recycle size={14} />
              <span>Bio-Polymer Machinery Tuning</span>
            </div>
            <h2 className="green-title">Engineering for Circular Economics</h2>
            <p className="green-desc">
              MD TechKanpur is actively modifying machine designs and screw profiles to process starch-based and PLA-based biodegradable polymer compounds. We assist bag-converters, straw-makers, and thermoformers to conform to plastic pollution bans and ecological mandates.
            </p>
            <ul className="green-bullets">
              <li>Custom screw flight geometry adjustments to process biodegradable resins conforming to ASTM D6400 / EN 13432.</li>
              <li>Low-shear barrel designs that prevent material overheating, avoiding early thermal degradation of organic polymer chains.</li>
              <li>Integration of high-precision volumetric and gravimetric dosing units to control recycled blends accurately.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
