export const products = [
  {
    id: 'single-screw-extruder',
    name: 'Single Screw Extruder Machine',
    subtitle: 'High-speed extrusion line for pipes, sheets, and profiles',
    shortDesc: 'Premium heavy-duty single screw extruders configured for stable output, uniform melt homogeneity, and maximum energy efficiency across various thermoplastic profiles.',
    desc: 'Our Single Screw Extruders are engineered to meet the demanding requirements of B2B production lines. Equipped with optimized screw geometries for polyolefins, high-torque gearboxes, and multi-zone PID heating, these extruders deliver excellent plasticization and stable pressure profiles under continuous industrial schedules.',
    badge: 'Plastic Extruders',
    category: 'extruder',
    colorCode: '#c9a227',
    technicalSpecs: {
      'Screw Diameter': '45mm to 150mm',
      'L/D Ratio': '25:1 to 33:1',
      'Main Motor Power': '15 kW to 110 kW (AC Servo option)',
      'Heating Zones': '3 to 7 high-efficiency ceramic zones',
      'Output Capacity': '50 kg/h to 500 kg/h',
      'Control System': 'PID Digital / Siemens PLC Touch-Screen'
    },
    applications: [
      'Rigid & flexible PVC conduit/plumbing pipe extrusion',
      'PE/PP film and profile extrusion plants',
      'Auxiliary sheet making and secondary lamination',
      'Medical tubing and precision filament extrusion'
    ],
    keyBenefits: [
      'Bimetallic nitrided screw & barrel for extreme longevity',
      'Energy consumption optimized with high-performance helical gearboxes',
      'Excellent output consistency with zero pulsation or surge defects',
      'Flexible configurations tailored to custom polymer recipes'
    ]
  },
  {
    id: 'twin-screw-extruder',
    name: 'Co-Rotating Twin-Screw Compounding Extruder',
    subtitle: 'High-torque compounding, filling, and masterbatch granulating plant',
    shortDesc: 'Advanced co-rotating twin-screw extruder systems providing high-intensity dispersive and distributive mixing for high-filler compounds, color masterbatches, and engineering plastics.',
    desc: 'MD TechKanpur Twin-Screw Extruders represent the pinnacle of compound engineering. With segmented modular barrels and flexible screw configurations, these units offer superb self-cleaning properties, highly efficient vacuum degassing, and unmatched additive dispersion.',
    badge: 'Plastic Extruders',
    category: 'extruder',
    colorCode: '#c9a227',
    technicalSpecs: {
      'Screw Diameter': '51mm to 75mm (Segmented)',
      'Screw Speed': 'Up to 600 RPM',
      'Torque Density': 'High-torque grade (up to 11.3 Nm/cm³)',
      'Output Capacity': '100 kg/h to 800 kg/h',
      'Drive Power': '45 kW to 160 kW',
      'Degassing System': 'Multi-stage high-vacuum chamber'
    },
    applications: [
      'Polymer alloying and high-filler reinforcement (CaCO₃, Talc up to 80%)',
      'Color, black, white, and functional additive masterbatch production',
      'Biodegradable starch/PLA compound blending',
      'Industrial post-consumer plastic scrap pelletizing & recycling'
    ],
    keyBenefits: [
      'Modular barrel design allows easy modification for varying processes',
      'Outstanding self-cleaning mechanism prevents material degradation or dead zones',
      'Integrated loss-in-weight or volumetric multi-feeder connectivity',
      'Wear-resistant special alloy screw elements prolong core lifetime'
    ]
  },
  {
    id: 'injection-moulding-machine',
    name: 'Servo Hydraulic Injection Moulding Machine',
    subtitle: 'High-precision toggle-clamp plastic moulding system',
    shortDesc: 'Efficient, fast-cycle injection moulding machines equipped with high-response servo motor pumps, stable toggle clamp units, and intelligent microprocessor controls.',
    desc: 'Designed for high volume output of plastic parts, our Injection Moulding Machines combine rigid mechanical structural design with modern energy-saving hydraulics. The high-sensitivity servo system delivers precise pressure and speed control, achieving up to 50% electricity savings compared to standard constant-displacement pump systems.',
    badge: 'Injection Moulding',
    category: 'moulding',
    colorCode: '#e6b933',
    technicalSpecs: {
      'Clamping Force': '50 Ton to 650 Ton',
      'Shot Weight': '80g to 2200g (PS reference)',
      'Tie Bar Spacing': '310 x 310mm to 820 x 820mm',
      'System Pressure': '16 MPa / 160 Bar',
      'Servo Pump System': 'Phase / KEB Servo Drive & Pump',
      'Controller': 'Techmation high-response graphic micro-controller'
    },
    applications: [
      'Thin-walled B2B food containers, closures, and caps',
      'Automotive interior moldings, housing, and structural brackets',
      'Consumer home appliances, storage crates, and rigid furniture',
      'Precision electrical boxes, switches, and pipe fittings'
    ],
    keyBenefits: [
      'Exceptional energy savings with rapid response servo pump cycles',
      'Highly rigid double-toggle clamping mechanism ensures precise mold alignment',
      'Low noise operation, reducing workshop fatigue and heat load',
      'Advanced mold protection software preventing core damage during clamp-up'
    ]
  },
  {
    id: 'hopper-dryer-loader',
    name: 'Integrated Hopper Dryer & Vacuum Loader',
    subtitle: 'Drying and automatic pneumatic material conveying systems',
    shortDesc: 'High-performance auxiliary drying hoppers paired with powerful vacuum autoloaders to assure moisture-free polymer feed and dust-free automated conveying.',
    desc: 'Eliminating moisture is critical to preventing surface defects (like silver streaks or bubbles) and mechanical failures in moulded or extruded plastics. Our Hopper Dryers utilize curved heating ducts to distribute heat uniformly, while the integrated Vacuum Autoloaders ensure reliable, hands-free feeding from bags or silos directly into the hopper.',
    badge: 'Auxiliary Equipment',
    category: 'auxiliary',
    colorCode: '#a07c10',
    technicalSpecs: {
      'Hopper Capacity': '25 kg to 400 kg',
      'Heating Power': '2.2 kW to 18 kW',
      'Blower Power': '120 W to 550 W',
      'Conveying Capacity': '200 kg/h to 600 kg/h',
      'Conveying Distance': 'Up to 4 meters lift elevation',
      'Temp Range': '30°C to 160°C (PID digital setting)'
    },
    applications: [
      'Drying hygroscopic materials (PET, Nylon, ABS, PC) before processing',
      'Pneumatic transport of granules to avoid manual labor and dust exposure',
      'Continuous hot air drying during long-run high-speed extrusion lines'
    ],
    keyBenefits: [
      'Stainless steel internal lining prevents polymer pellet contamination',
      'Equipped with overheat protection circuits and mechanical alarms',
      'Easy-access split structure allows fast color changes and cleaning sessions',
      'Auto-conveying reduces manual contamination and maintains neat shop floors'
    ]
  },
  {
    id: 'industrial-water-chiller',
    name: 'Industrial Air-Cooled Water Chiller',
    subtitle: 'High-efficiency cooling systems for molds and extrusion tanks',
    shortDesc: 'Durable, scroll-compressor water chillers designed to supply stable chilled water, speed up cooling cycles, and maximize moulding plant productivity.',
    desc: 'Maintaining the correct temperature of molds and calibration tanks is critical to achieving precise plastic dimensions and high surface gloss. Our Air-Cooled Chillers are built with world-renowned scroll compressors, stainless steel water tanks, and advanced electronic controllers, offering continuous thermal management under extreme workshop ambients.',
    badge: 'Auxiliary Equipment',
    category: 'auxiliary',
    colorCode: '#a07c10',
    technicalSpecs: {
      'Cooling Capacity': '3 HP to 30 HP (7.5 kW to 75 kW)',
      'Compressor Type': 'Hermetic Scroll (Copeland / Danfoss)',
      'Refrigerant': 'R407C / R410A Environmentally Safe',
      'Chilled Water Flow': '1.5 m³/h to 15 m³/h',
      'Temperature Range': '5°C to 35°C',
      'Safety Controls': 'High/Low pressure cutouts, anti-freeze, motor overload'
    },
    applications: [
      'Cooling injection moulding molds to reduce cycle times and boost productivity',
      'Cooling extrusion vacuum calibration tanks for precise pipe sizing',
      'Maintaining hydraulic oil temperature in heavy-duty presses and machinery'
    ],
    keyBenefits: [
      'Microcomputer central controller with automatic fault diagnosis display',
      'Requires no cooling tower, saving workspace area and installation cost',
      'Anti-corrosive stainless steel water pump and internal piping loops',
      'Extremely high COP (Coefficient of Performance) reduces power bills'
    ]
  },
  {
    id: 'screw-barrel-spares',
    name: 'Bimetallic Screw & Barrel Assemblies',
    subtitle: 'Replacement screws, barrels, and custom wear parts',
    shortDesc: 'Custom engineered replacement screws and barrels built from premium alloy steels, finished with high-depth nitriding and bimetallic coatings to handle abrasive materials.',
    desc: 'Avoid extrusion failures and screw slippage. We source, supply, and custom-manufacture screws and barrels for all major injection moulding machines and extruders. Utilizing advanced nitriding, gas-carburing, and tungsten-carbide bimetallic spraying, our wear parts are built to withstand heavy glass-fiber fillings and corrosive additive recipes.',
    badge: 'Spare Parts',
    category: 'spares',
    colorCode: '#d4c9b0',
    technicalSpecs: {
      'Diameter Range': 'Φ18 mm to Φ200 mm',
      'Max Length': 'Up to 6000 mm single piece',
      'Base Material': '38CrMoAlA (SACM645) / 42CrMo Steel',
      'Nitriding Depth': '0.5 mm to 0.8 mm',
      'Bimetallic Thickness': '1.5 mm to 3.0 mm (Alloy coating)',
      'Surface Hardness': 'Nitrided >= 950 HV | Bimetallic >= HRC 60-65'
    },
    applications: [
      'Replacement screws and barrels for injection moulding machines',
      'Single & twin-screw extruder barrel and screw overhauls',
      'High-filler compounding lines (highly abrasive Talc/CaCO₃ compounding)'
    ],
    keyBenefits: [
      'Ultra-high wear and corrosion resistance under abrasive compounds',
      'Precision on-site measurements and technical CAD drawings completed by our experts',
      'Optimized flight geometries improve melt homogeneity and extruder torque',
      'Direct compatibility with standard Indian, Chinese, and European machinery brands'
    ]
  },
  {
    id: 'polymer-granules-raw',
    name: 'Premium Plastic Granules & Raw Material',
    subtitle: 'Virgin and recycled PP, LDPE, HDPE, and ABS polymers',
    shortDesc: 'Top-quality polymer granules sourced directly from major petrochemical manufacturers, suited for reliable moulding, extrusion, and blowing operations.',
    desc: 'MD TechKanpur provides B2B clients with dependable raw material channels. We stock and distribute standard grades of Polypropylene (PP), Polyethylene (LDPE/LLDPE/HDPE), and ABS. Each batch is verified for consistent Melt Flow Index (MFI) and density parameters, ensuring your production parameters require zero adjustment between shipments.',
    badge: 'Raw Materials',
    category: 'raw_material',
    colorCode: '#7a7062',
    technicalSpecs: {
      'Polymer Base': 'PP (Homo & Co) / LDPE / LLDPE / HDPE / ABS / PET',
      'MFI Range': '1.5 to 25 g/10min',
      'Density': '0.90 to 1.08 g/cm³',
      'Form': 'Uniform cylindrical/spherical clean pellets',
      'Packaging': '25 kg multi-layer laminated sacks / 1 Ton jumbo bags',
      'Compliance': 'RoHS, REACH, and Food-contact compliant grades available'
    },
    applications: [
      'General purpose and high-clarity injection moulding products',
      'High-speed blown film bags and packaging liners',
      'Corrugated sheets, cable insulation, and plastic profile extrusion'
    ],
    keyBenefits: [
      'Direct partnerships with top-tier domestic and global refineries ensure best prices',
      'Free from contamination, ensuring clean filter screen packs and zero bubble bursts',
      'Consistent physical properties prevent mold shrinkage variations',
      'Cost-saving high-grade recycled granules engineered to match virgin strength'
    ]
  }
];
