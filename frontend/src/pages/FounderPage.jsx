import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Briefcase, 
  GraduationCap, 
  HeartHandshake, 
  ChevronRight,
  MessageSquare,
  Globe
} from 'lucide-react';
import './FounderPage.css';

const FounderPage = () => {
  return (
    <div className="founder-page-wrapper ani-fade-in">
      {/* 1. Executive Hero Header */}
      <section className="founder-hero-section">
        <div className="container">
          <span className="section-subtitle">Leadership & Vision</span>
          <h1 className="founder-hero-title">Our Founder's Vision</h1>
          <p className="founder-hero-desc">
            Driving mechanical innovation, operational sincerity, and dedicated B2B machinery partnership across Kanpur and Northern India.
          </p>
        </div>
      </section>

      {/* 2. Main Biography & Profile Showcase */}
      <section className="section">
        <div className="container founder-profile-grid">
          
          {/* Left Column: Premium Interactive Headshot Card */}
          <div className="founder-image-card">
            <div className="founder-img-frame">
              <img 
                src="/founder.png" 
                alt="Ajay Kumar Srivastava — Founder & CEO" 
                className="founder-profile-pic"
              />
              <div className="founder-img-badge">
                <span className="badge-name">Ajay Kumar Srivastava</span>
                <span className="badge-title">Founder &amp; CEO</span>
              </div>
            </div>

            {/* Quick Contact Direct Lines */}
            <div className="founder-meta-info">
              <div className="meta-detail-row">
                <Briefcase size={16} />
                <span>Plastic Machinery Specialist</span>
              </div>
              <div className="meta-detail-row">
                <Phone size={16} />
                <a href="tel:7499645819" className="hover-gold">7499645819</a>
              </div>
              <div className="meta-detail-row">
                <Mail size={16} />
                <a href="mailto:kumarajay03582@gmail.com" className="hover-gold">kumarajay03582@gmail.com</a>
              </div>
              <div className="meta-detail-row">
                <MapPin size={16} />
                <span>Barra Vishwa Bank, Kanpur</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Executive Message & Milestones */}
          <div className="founder-bio">
            <div className="founder-message-box">
              <span className="founder-message-tag">Founder &amp; CEO Message</span>
              <h2 className="founder-message-heading">Sincerity, Quality &amp; Unmatched Reliability</h2>
              
              <div className="executive-quote">
                "Our industrial partners do not just buy machinery; they invest in uptime, production reliability, and operational trust. At MD TechKanpur, we calibrate every single screw, barrel, and servo-hydraulic system to ensure peak performance with minimum energy consumption."
              </div>

              <div className="founder-narrative">
                <p>
                  Established and led by <strong>Ajay Kumar Srivastava</strong>, MD TechKanpur represents a commitment to technical precision and transparent B2B partnership. With over 17 years of extensive business development, sales leadership, and customer relationship experience in the industrial hub of Kanpur, Ajay has built MD TechKanpur on the foundation of practical mechanical excellence and genuine, fast service.
                </p>
                <p>
                  Having graduated from the prestigious <strong>CSJM University, Kanpur</strong>, Ajay has dedicated his professional career to bridging the gap between top-tier machinery manufacturers and regional plastic converters. He has spent his entire career in regional sales management and distribution operations, mastering lead qualification, logistics, and proven customer service standards.
                </p>
                <p>
                  Under his leadership, MD TechKanpur has evolved from a specialized machinery servicing team into a prominent dealer of high-performance plastic extruders, servo-driven injection moulding systems, raw material masterbatches, and precision auxiliary spares. Ajay maintains a hands-on approach, ensuring that our emergency technical response teams remain Kanpur's fastest and most reliable.
                </p>
              </div>
            </div>

            {/* Timeline Milestones Section */}
            <div className="founder-timeline-section">
              <h3 className="timeline-section-title">
                <Award size={22} /> Professional Milestones
              </h3>
              
              <div className="founder-timeline">
                
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <span className="timeline-year">2022 – Present</span>
                  <h4 className="timeline-title">Founding MD TechKanpur</h4>
                  <p className="timeline-desc">
                    Established MD TechKanpur as the premier single-point hub for Plastic Extruders, Injection Moulding Machinery, genuine replacement parts, and high-performance servicing across Northern India. Created Kanpur's leading rapid technical response crew.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <span className="timeline-year">2009 – 2022</span>
                  <h4 className="timeline-title">B2B Sales Management &amp; Client Relations (13 Years)</h4>
                  <p className="timeline-desc">
                    Managed large-scale sales networks and B2B corporate distributions, serving as a regional specialist. Excelled in lead generation, contract management, and proven customer loyalty systems, establishing a strong reputation for business integrity.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <span className="timeline-year">2003</span>
                  <h4 className="timeline-title">Academic Graduation</h4>
                  <p className="timeline-desc">
                    Completed Bachelor of Arts (B.A.) from Chhatrapati Shahu Ji Maharaj (CSJM) University, Kanpur, laying the foundation for strategic business operations, communication, and regional commerce leadership.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <span className="timeline-year">1998 – 2000</span>
                  <h4 className="timeline-title">Early Foundations</h4>
                  <p className="timeline-desc">
                    Completed secondary and intermediate certifications from the UP Board, Allahabad, fostering a hard-working, disciplined, and sincere approach to lifelong learning and technical adaptation.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core B2B Leadership Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Operational Creed</span>
            <h2 className="section-title">Founder's Core Values</h2>
            <p className="section-desc">
              The fundamental principles that guide every deal, service dispatch, and long-term client contract under Ajay's leadership.
            </p>
          </div>

          <div className="values-grid">
            
            {/* Value 1: Sincerity & Honesty */}
            <div className="value-card glass-panel">
              <div className="value-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="value-title">Sincerity &amp; Honesty</h3>
              <p className="value-desc">
                Believing that trust is the ultimate B2B currency. We guarantee absolute transparency in pricing, machinery condition reports, and AMC contract terms.
              </p>
            </div>

            {/* Value 2: Continuous Learning */}
            <div className="value-card glass-panel">
              <div className="value-icon-box">
                <Cpu size={24} />
              </div>
              <h3 className="value-title">Affinity to Improve</h3>
              <p className="value-desc">
                Actively learning and adapting to the latest technical trends, including energy-efficient servo retrofits, bio-polymer screw flight tunings, and PLC modernizations.
              </p>
            </div>

            {/* Value 3: Customer-First Response */}
            <div className="value-card glass-panel">
              <div className="value-icon-box">
                <Users size={24} />
              </div>
              <h3 className="value-title">Customer Service</h3>
              <p className="value-desc">
                Treating every breakdown as our own priority. We maintain a local emergency service response standard of 2 to 4 hours in Dadanagar and wider Kanpur.
              </p>
            </div>

            {/* Value 4: Hard Work & Execution */}
            <div className="value-card glass-panel">
              <div className="value-icon-box">
                <HeartHandshake size={24} />
              </div>
              <h3 className="value-title">B2B Commitment</h3>
              <p className="value-desc">
                Going the extra mile to source rare screw designs, optimize thermal control layouts, and secure maximum production uptime for your manufacturing plant.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Interactive Call to Action */}
      <section className="founder-cta-section">
        <div className="container">
          <div className="founder-cta-box">
            <div className="cta-box-icon">
              <MessageSquare size={28} />
            </div>
            <h2 className="cta-box-title">Direct Consultation with the Founder</h2>
            <p className="cta-box-desc">
              Have questions regarding plastic extruders, custom screw and barrel designs, breakdown diagnostics, or long-term AMC setups? Discuss your B2B requirements directly with Ajay Kumar Srivastava.
            </p>
            
            <div className="cta-btn-group">
              <a 
                href="https://wa.me/917499645819?text=Hello%20Ajay%20ji%2C%20I%20want%20to%20discuss%20a%20plastic%20machinery%20requirement%20for%20my%20factory."
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Discuss on WhatsApp
              </a>
              <a href="tel:7499645819" className="btn btn-secondary">
                Direct Call: 7499645819
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderPage;
