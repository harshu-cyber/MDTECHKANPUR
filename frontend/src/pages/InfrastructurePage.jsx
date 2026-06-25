import React from 'react';
import { Cpu, ShieldCheck, Wrench, Shield, Zap, Settings } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import './InfrastructurePage.css';

const machines = [
  {
    id: 'refurbishing-workshop',
    name: 'Machinery Refurbishing & Diagnostics Workshop',
    specs: [
      'Overhaul Capacity: Up to 10 heavy machines simultaneously',
      'Lifting Support: Dual 10-Ton overhead gantry cranes',
      'Diagnostic Gear: Hydraulic load cells & flow sensors',
      'Temperature Monitors: Multi-channel infrared thermal trackers',
      'Machine Covered: Single & twin screw extruders, heavy hydraulic presses'
    ],
    desc: 'The heart of our mechanical engineering facility — a heavy-duty workshop equipped with specialized tools, cranes, and diagnostic equipment to overhaul and test pre-owned plastic machinery.',,
    icon: Wrench
  },
  {
    id: 'spare-warehouse',
    name: 'Precision Spare Parts Warehouse',
    specs: [
      'Storage Area: 8,000 sq. ft. high-rack inventory system',
      'Key Spares: Screws, barrels, heaters, thermocouples, gearboxes',
      'Material Grades: Nitrided 38CrMoAlA & premium bimetallic alloys',
      'Custom Processing: Quick cut & keyway milling on-site',
      'Turnaround: Ready-stock shipping within 24 hours across UP'
    ],
    desc: 'We house a massive inventory of replacement components for injection moulding and extrusion systems. This enables us to dispatch essential parts instantly, minimizing expensive down-time for our B2B clients.',
    icon: Settings
  },
  {
    id: 'plc-lab',
    name: 'Electrical & PLC Automation Lab',
    specs: [
      'Automation Systems: Techmation, Siemens S7, Delta, Gefran',
      'Calibration: PID temperature auto-tuning controllers',
      'Retrofitting: Upgrading manual contactor systems to solid-state & PLC',
      'Servo Systems: Commissioning Phase and KEB energy-saving servo drives',
      'Software Testing: Custom ladder logic programming and debugging simulator'
    ],
    desc: 'Our specialized electrical engineering lab handles PLC panel building, micro-controller programming, parameter backup, and servo-pump speed profiling to maximize production efficiency.',
    icon: Cpu
  },
  {
    id: 'laser-calibration',
    name: 'Laser Alignment & Calibration Bay',
    specs: [
      'Equipment Type: Double-axis high-accuracy laser aligner',
      'Tolerance Limit: Parallelism deviation within 0.02 mm/meter',
      'Barrel Mapping: Checking internal wear, ovality, and bending deviations',
      'Vibration Tracking: Multi-channel FFT acceleration sensors',
      'Testing Frequency: Performed on every screw overhaul and frame setup'
    ],
    desc: 'Misaligned barrels lead to rapid screw wear and higher motor torque load. We utilize precision laser calibration trackers to ensure perfect coaxial alignment of gearbox, screw, and barrel.',
    icon: Zap
  },
  {
    id: 'qc-testing',
    name: 'Quality Control & Operational Load Bay',
    specs: [
      'Load Testing: 48-hour continuous cycle no-load simulator',
      'Thermal Mapping: Heater band load audit and temperature PID checks',
      'Hydraulic Audit: Verification of cycle pressure consistency (up to 200 Bar)',
      'Verification Standard: Conformance to Indian & ISO machinery safety codes',
      'Audit Release: Comprehensive 15-Point QC certificate generated per machine'
    ],
    desc: 'Every machine undergoes intense pressure and load trials before delivery. This ensures that when the machine arrives at your factory floor, it starts up smoothly with zero commissioning delays.',,
    icon: ShieldCheck
  }
];

const InfrastructurePage = () => {
  return (
    <div className="infrastructure-page-wrapper ani-fade-in">
      <SEO 
        title="Infrastructure & Workshop | MD TechKanpur"
        description="Explore our 20,000 sq. ft. technical campus in Dadanagar, Kanpur featuring heavy machinery overhauling bays, PLC automation labs, and spare parts warehousing."
      />

      {/* Hero */}
      <section className="infra-hero">
        <div className="container">
          <span className="section-subtitle">Workshop & Technical Facilities</span>
          <h1 className="infra-hero-title">Technical Support &amp; Workshop Infrastructure</h1>
          <p className="infra-hero-desc">
            Our Dadanagar, Kanpur technical campus features over 20,000 sq. ft. of heavy-duty testing bays, diagnostic workshops, electrical programming labs, and massive spare parts warehousing spaces.
          </p>
        </div>
      </section>

      {/* Facility Overview Strip */}
      <section className="infra-overview-section">
        <div className="container overview-grid glass-panel">
          <div className="overview-stat">
            <span className="ov-number">20,000+</span>
            <span className="ov-label">Sq. Ft. Technical Campus</span>
          </div>
          <div className="overview-stat">
            <span className="ov-number">5</span>
            <span className="ov-label">Specialized Overhauling Bays</span>
          </div>
          <div className="overview-stat">
            <span className="ov-number">1,500+</span>
            <span className="ov-label">Machines Sold &amp; Delivered</span>
          </div>
          <div className="overview-stat">
            <span className="ov-number">100%</span>
            <span className="ov-label">15-Point QC Validation Done</span>
          </div>
        </div>
      </section>

      {/* Machinery Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Technical Workshop</span>
            <h2 className="section-title">Technical Support Facilities</h2>
            <p className="section-desc">
              State-of-the-art diagnostic tools, calibration lasers, heavy machinery overhauling bays, and deep inventory storage to cover all plastic processing units.
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
            <h2 className="section-title">Zero-Defect 5-Stage Machinery Validation</h2>
            <p className="section-desc">
              Every sold machine passes through a strict 5-stage diagnostic and run-test protocol before shipping to the client — ensuring maximum commissioning speed.
            </p>
          </div>
          <div className="qc-stages-timeline">
            {[
              { step: '01', title: 'Electrical & PLC Safety Audit', desc: 'Verify insulation values, safety interlocks, contactor functions, and load profiles on heating zones.' },
              { step: '02', title: 'Hydraulic & Pressure Stability', desc: 'Test hydraulic pump displacement curves, monitor proportional valves, and audit system pressure up to 200 Bar.' },
              { step: '03', title: 'Barrel & Screw Laser Alignment', desc: 'Perform double-axis laser measurement mapping to confirm coaxial alignment of motor, gearbox, screw, and barrel.' },
              { step: '04', title: 'No-Load Simulation (48 Hrs)', desc: 'Run the machine continuously under simulated automatic cycles to check temperature stability, lubrication, and vibration levels.' },
              { step: '05', title: 'Trial Extrusion Run & Release', desc: 'Execute a test production trial with raw polymer granules. Release detailed 15-Point QC Certificate before packing and dispatch.' },
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
