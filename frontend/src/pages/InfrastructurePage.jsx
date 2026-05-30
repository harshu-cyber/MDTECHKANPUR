import React from 'react';
import { Cpu, Thermometer, FlaskConical, PackageSearch, BarChart2, ShieldCheck } from 'lucide-react';
import './InfrastructurePage.css';

const machines = [
  {
    id: 'twin-screw',
    name: 'Co-Rotating Twin-Screw Extruders',
    specs: ['L/D Ratio: 40:1 (High throughput)', 'Screw Diameter: 35mm to 75mm', 'Output: 200 Kg/hr to 1.5 MT/hr per line', 'Temperature Range: 80°C – 320°C', 'Torque Class: 11.3 Nm/cm³ (High-torque)'],
    desc: 'The backbone of our compounding facility — ZSK-style co-rotating twin-screw extruders capable of dispersive and distributive mixing at full co-rotating RPM ranges.',
    icon: Cpu
  },
  {
    id: 'continuous-mixer',
    name: 'FCM Continuous Mixers (Farrel)',
    specs: ['Rotor Design: High-intensity dispersive mix', 'Capacity: 500 to 1800 Kg/hr', 'Cooling: Water-cooled barrel with jacket rings', 'Drive Power: 220 to 600 kW', 'Application: High-filler masterbatch (CaCO3 up to 83%)'],
    desc: 'For high-filler loadings and carbon black compounds, our Farrel FCM continuous mixers deliver superior wetting-out and agglomerate breakdown without requiring pellet densification.',
    icon: BarChart2
  },
  {
    id: 'underwater-pelletizer',
    name: 'Underwater Pelletizing Systems (UWP)',
    specs: ['Die Plate: 48 to 256 holes', 'Pellet Diameter: 2.0mm to 3.5mm (custom)', 'Throughput: Up to 2,000 Kg/hr', 'Cooling Medium: Chilled water bath (8°C)',  'Moisture Content Output: < 0.1%'],
    desc: 'Our automated underwater pelletizing systems produce uniformly sized, smooth, spherical pellets free from tails and agglomerations. This directly reduces screen-pack filters in downstream converters.',
    icon: PackageSearch
  },
  {
    id: 'spectrophotometer',
    name: 'Datacolor Spectrophotometer System',
    specs: ['Model: Datacolor 600 series', 'Light Sources: D65, TL84, CWF, UV-Fluorescent', 'Color Match Tolerance: ΔE* < 0.5 internal target', 'Storage: 18,000+ Formula Database', 'Certification: ISO 11664 conformance'],
    desc: 'International-standard Datacolor 600 Spectrophotometers are used for primary color matches, pass/fail quality checking, and multi-illuminant metameric testing of every color batch.',
    icon: FlaskConical
  },
  {
    id: 'mfi-tester',
    name: 'Melt Flow Index (MFI) Testing Station',
    specs: ['Standard: ASTM D1238 / ISO 1133', 'Temperature Range: 50°C to 400°C', 'Weight Sets: 0.325 kg to 21.6 kg', 'Software: Digital auto-cut PC integration', 'Measurement Frequency: Every production batch'],
    desc: 'All masterbatch batches undergo a 100% MFI test before release to confirm processability in customer pellet-fed extrusion lines — zero variation tolerance.',
    icon: Thermometer
  },
  {
    id: 'dispersion-test',
    name: 'Optical Dispersion Microscope Station',
    specs: ['Magnification: 100x to 2,000x', 'Filter Test: ΔP (Filter Pressure Value) Method', 'Standard: DVS/TM 2153 German Plastic Standard', 'Output: FPV grading (1-5) stamped per lot', 'Camera: Full HD digital capture'],
    desc: 'Visual and quantitative dispersion grading performed per German DVS standard TM 2153. Each masterbatch lot receives an FPV stamp, assuring customers of gel-free, streak-free output.',
    icon: ShieldCheck
  }
];

const InfrastructurePage = () => {
  return (
    <div className="infrastructure-page-wrapper ani-fade-in">

      {/* Hero */}
      <section className="infra-hero">
        <div className="container">
          <span className="section-subtitle">Factory & Technical Equipment</span>
          <h1 className="infra-hero-title">World-Class Manufacturing Infrastructure</h1>
          <p className="infra-hero-desc">
            Our Dadanagar, Kanpur manufacturing campus features over 40,000 sq. ft. of climate-controlled production halls equipped with state-of-the-art polymer compounding machinery from global OEMs.
          </p>
        </div>
      </section>

      {/* Facility Overview Strip */}
      <section className="infra-overview-section">
        <div className="container overview-grid glass-panel">
          <div className="overview-stat">
            <span className="ov-number">40,000+</span>
            <span className="ov-label">Sq. Ft. Production Campus</span>
          </div>
          <div className="overview-stat">
            <span className="ov-number">12</span>
            <span className="ov-label">Twin-Screw Compounding Lines</span>
          </div>
          <div className="overview-stat">
            <span className="ov-number">55,000 MT</span>
            <span className="ov-label">Annual Rated Output</span>
          </div>
          <div className="overview-stat">
            <span className="ov-number">100%</span>
            <span className="ov-label">Batch QC Before Dispatch</span>
          </div>
        </div>
      </section>

      {/* Machinery Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Technical Machinery</span>
            <h2 className="section-title">Compounding Equipment Overview</h2>
            <p className="section-desc">
              Premium compounding hardware sourced from leading German and Swiss OEM machinery manufacturers, configured for precision polymer blending.
            </p>
          </div>

          <div className="machines-grid">
            {machines.map((machine, idx) => {
              const Icon = machine.icon;
              return (
                <div key={machine.id} className={`machine-card glass-panel ${idx % 2 === 0 ? '' : 'card-reversed'}`}>
                  <div className="machine-meta">
                    <div className="machine-icon-wrapper">
                      <Icon size={26} />
                    </div>
                    <div className="machine-header">
                      <h3 className="machine-name">{machine.name}</h3>
                      <p className="machine-desc">{machine.desc}</p>
                    </div>
                  </div>
                  <div className="machine-specs-list">
                    {machine.specs.map((spec, i) => (
                      <div key={i} className="machine-spec-row">
                        <span className="spec-dot"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Control Lab Strip */}
      <section className="section section-bg-alt qc-strip">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Quality Assurance</span>
            <h2 className="section-title">Zero-Defect B2B Quality Gates</h2>
            <p className="section-desc">
              Every production lot passes through a mandatory 5-stage quality inspection protocol before truck dispatch — protecting our clients from line stoppages.
            </p>
          </div>
          <div className="qc-stages-timeline">
            {[
              { step: '01', title: 'Raw Material Incoming QC', desc: 'All incoming TiO₂, pigments, and carriers undergo moisture checks, assay purity tests, and sieve analysis.' },
              { step: '02', title: 'In-Process Melt Temperature Logs', desc: 'Barrel zone temperatures logged every 15 minutes against SOP control charts.' },
              { step: '03', title: 'MFI & Density Testing (100%)', desc: 'Every single production batch is tested for Melt Flow Index and bulk density before packaging.' },
              { step: '04', title: 'Optical Dispersion Grading (FPV)', desc: 'Representative pellet samples are filter-tested for agglomerate-free dispersion quality.' },
              { step: '05', title: 'Color Release Certificate & COA', desc: 'Final spectrophotometric pass confirmed; Certificate of Analysis (COA) printed and attached before pallet dispatch.' },
            ].map((stage) => (
              <div key={stage.step} className="qc-stage-item glass-panel">
                <span className="qc-step-badge">{stage.step}</span>
                <h3 className="qc-stage-title">{stage.title}</h3>
                <p className="qc-stage-desc">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfrastructurePage;
