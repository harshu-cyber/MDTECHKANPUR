import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Wrench, ShoppingCart, Shield, Zap, Star, ChevronRight, Settings, Cpu, Factory, Layers, Package, CheckCircle2, X } from 'lucide-react';
import { getReviews, submitReview } from '../services/api';
import './Home.css';

/* ─── Animated Counter Hook ─── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Product categories ─── */
const services = [
  {
    id: 1,
    icon: <Settings size={32} />,
    title: 'Plastic Extruders',
    desc: 'High-performance single & twin-screw extruders for granules, pipes, profiles, sheets and more.',
    tag: 'SALES & SERVICE',
    color: '#c9a227',
  },
  {
    id: 2,
    icon: <Cpu size={32} />,
    title: 'Injection Moulding Machines',
    desc: 'Full range of hydraulic & all-electric injection moulding machines — new and refurbished units.',
    tag: 'SALES & SERVICE',
    color: '#e6b933',
  },
  {
    id: 3,
    icon: <Wrench size={32} />,
    title: 'Auxiliary Equipment',
    desc: 'Loaders, dryers, chillers, conveyors & material handling systems to complete your production line.',
    tag: 'INSTALLATION',
    color: '#a07c10',
  },
  {
    id: 4,
    icon: <Shield size={32} />,
    title: 'Servicing & Maintenance',
    desc: 'On-site breakdown support, AMC contracts, spare parts supply and machine reconditioning.',
    tag: 'AMC AVAILABLE',
    color: '#c9a227',
  },
];

const products = [
  {
    id: 1,
    img: '/img-pellets.jpg',
    title: 'Plastic Granules & Raw Material',
    desc: 'High-quality PP, PE, PET, ABS granules and raw polymer material for your extrusion and moulding needs.',
  },
  {
    id: 2,
    img: '/img-bags.jpg',
    title: 'Plastic Film & Bags',
    desc: 'HD/LD carry bags, courier bags, garbage bags, shopping bags — all film grades and colours available.',
  },
  {
    id: 3,
    img: '/img-gears.jpg',
    title: 'Moulded Plastic Components',
    desc: 'Custom plastic gears, housings, fittings and engineering components — we source and supply.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Ramesh Agarwal',
    company: 'Agarwal Plastics, Kanpur',
    rating: 5,
    quote: 'MD TechKanpur sorted our injection moulding machine breakdown within hours. Excellent service team and fair pricing. Highly recommended!',
  },
  {
    id: 2,
    name: 'Sunil Verma',
    company: 'Verma Poly Industries',
    rating: 5,
    quote: 'We purchased a plastic extruder through them. The installation was smooth, and they trained our staff. Great after-sales support.',
  },
  {
    id: 3,
    name: 'Priya Textiles',
    company: 'Priya Poly Films, UP',
    rating: 5,
    quote: 'Best place to buy plastic machinery in Kanpur. MD TechKanpur gave us the best deal with AMC — machines running perfectly for 2 years.',
  },
];

/* ─── MAIN COMPONENT ─── */
const Home = () => {
  const [statsRef, statsInView] = useInView(0.3);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [allReviews, setAllReviews] = useState(testimonials);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', company: '', rating: 5, quote: '' });
  const [reviewStatus, setReviewStatus] = useState('idle'); // idle | loading | success | error
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const dbReviews = await getReviews();
        // Merge fetched reviews first, then default static testimonials
        setAllReviews([...dbReviews, ...testimonials]);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value, 10) : value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.company.trim() || !reviewForm.quote.trim()) {
      setReviewError('Please fill in all fields.');
      return;
    }
    setReviewStatus('loading');
    setReviewError('');
    try {
      const savedReview = await submitReview(reviewForm);
      setAllReviews(prev => [savedReview, ...prev]);
      setReviewStatus('success');
      setReviewForm({ name: '', company: '', rating: 5, quote: '' });
      setTimeout(() => {
        setShowReviewModal(false);
        setReviewStatus('idle');
      }, 2000);
    } catch (err) {
      setReviewStatus('error');
      setReviewError(err.message || 'Failed to submit review. Please try again.');
    }
  };

  const yearsCount   = useCounter(20, 1500, statsInView);
  const clientsCount = useCounter(500, 1800, statsInView);
  const machinesCount = useCounter(1200, 2000, statsInView);
  const citiesCount  = useCounter(30, 1400, statsInView);

  return (
    <div className="home-page-wrapper">

      {/* ═══════════════════════════════════════
          HERO SECTION — Full banner image
          ═══════════════════════════════════════ */}
      <section className="hero-section">
        {/* Background */}
        <div className="hero-bg-image" />
        <div className="hero-overlay" />

        <div className={`container hero-container ${heroLoaded ? 'hero-loaded' : ''}`}>
          <div className="hero-content">
            {/* Badge */}
            <div className="hero-badge">
              <span className="badge-dot-pulse" />
              <span>Kanpur's #1 Plastic Machinery Contractor</span>
            </div>

            <h1 className="hero-main-title">
              <span className="hero-title-line1">M.D. TECHKANPUR</span>
              <span className="hero-title-accent">Innovate · Produce · Empower</span>
            </h1>

            <p className="hero-description">
              Your trusted partner for <strong>Plastic Color Masterbatch, Plastic Compounds, Engineering Compounds, Engineering Color Masterbatch, Multilayer, and all Plastic Additives</strong> in Kanpur.
              Extruders · Injection Moulding · Auxiliary Equipment — all under one roof.
            </p>

            <div className="hero-actions">
              <a href="tel:7499645819" className="btn btn-primary btn-large hero-cta-primary">
                <Phone size={18} />
                Call: 7499645819
              </a>
              <Link to="/products" className="btn btn-accent btn-large hero-cta-secondary">
                View Products
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Quick trust pills */}
            <div className="hero-trust-pills">
              <span className="trust-pill"><Zap size={13} /> Fast On-Site Service</span>
              <span className="trust-pill"><Shield size={13} /> AMC Contracts</span>
              <span className="trust-pill"><Star size={13} /> 500+ Happy Clients</span>
            </div>
          </div>

          {/* Right info card */}
          <div className="hero-info-card glass-panel-dark">
            <div className="info-card-header">
              <img src="/logo-new.png" alt="MD TechKanpur" className="info-card-logo" />
            </div>
            <div className="info-card-body">
              <h3 className="info-card-title">Working as Technician &amp; Sales</h3>
              <p className="info-card-sub">for Plastic Machinery's</p>
              <div className="info-services-list">
                {['Plastic Extruders', 'Injection Moulding', 'Auxiliary Equipment', 'Servicing & Maintenance'].map((s, i) => (
                  <div key={i} className="info-service-row">
                    <ChevronRight size={14} className="info-chevron" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="info-card-footer">
                <div className="info-contact-row">
                  <Phone size={14} />
                  <span>7499645819</span>
                </div>
                <div className="info-contact-row">
                  <MapPin size={14} />
                  <span>526 K, Barra Vishwa Bank, Kanpur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue">
          <div className="scroll-dot-bar" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ANIMATED STATS BANNER
          ═══════════════════════════════════════ */}
      <section className="stats-section" ref={statsRef}>
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-num">{yearsCount}+</span>
            <span className="stat-lbl">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{clientsCount}+</span>
            <span className="stat-lbl">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{machinesCount}+</span>
            <span className="stat-lbl">Machines Serviced</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{citiesCount}+</span>
            <span className="stat-lbl">Cities Covered</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES SECTION
          ═══════════════════════════════════════ */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-divider" />
            <span className="section-subtitle">What We Do</span>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-desc">
              From machine procurement to breakdown maintenance — MD TechKanpur is your end-to-end
              plastic machinery partner in Kanpur &amp; beyond.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className="service-card"
                style={{ '--card-accent': svc.color, animationDelay: `${i * 0.1}s` }}
              >
                <div className="svc-icon-wrap">{svc.icon}</div>
                <div className="svc-tag">{svc.tag}</div>
                <h3 className="svc-title">{svc.title}</h3>
                <p className="svc-desc">{svc.desc}</p>
                <div className="svc-learn-more">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BANNER STRIP (using img-banner)
          ═══════════════════════════════════════ */}
      <section className="banner-strip-section">
        <div className="banner-strip-img" />
        <div className="banner-strip-overlay">
          <div className="container banner-strip-content">
            <div className="bstrip-text">
              <h2 className="bstrip-title">Quality Machines · Better Performance</h2>
              <p className="bstrip-sub">Sales &nbsp;|&nbsp; Service &nbsp;|&nbsp; Support</p>
            </div>
            <div className="bstrip-actions">
              <a href="tel:7499645819" className="btn btn-primary btn-large">
                <Phone size={18} />
                7499645819
              </a>
              <Link to="/contact" className="btn btn-outline-gold btn-large">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCTS SHOWCASE
          ═══════════════════════════════════════ */}
      <section className="section products-showcase-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-divider" />
            <span className="section-subtitle">Product Range</span>
            <h2 className="section-title">What We Supply</h2>
            <p className="section-desc">
              We deal in new and refurbished plastic machinery, raw materials, and finished plastic products
              — ensuring quality at every step.
            </p>
          </div>

          <div className="products-showcase-grid">
            {products.map((prod, i) => (
              <div key={prod.id} className="product-showcase-card">
                <div className="psc-image-wrap">
                  <img src={prod.img} alt={prod.title} className="psc-image" loading="lazy" />
                  <div className="psc-image-overlay" />
                </div>
                <div className="psc-body">
                  <h3 className="psc-title">{prod.title}</h3>
                  <p className="psc-desc">{prod.desc}</p>
                  <Link to="/products" className="psc-link">
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE US
          ═══════════════════════════════════════ */}
      <section className="section why-section section-bg-alt">
        <div className="container why-grid">
          <div className="why-left">
            <div className="gold-divider" style={{ margin: '0 0 1rem 0' }} />
            <span className="section-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '0.75rem' }}>Why MD TechKanpur</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Kanpur's Most Trusted<br />Machinery Experts
            </h2>
            <p className="section-desc" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
              With over 20 years in the plastic machinery industry, we bring unmatched technical expertise,
              genuine spare parts, and round-the-clock support to keep your production lines running.
            </p>
            <div className="why-features">
              {[
                { icon: <Zap size={20} />, title: '24/7 Breakdown Support', desc: 'Emergency service calls handled within 2–4 hours across Kanpur & UP.' },
                { icon: <ShoppingCart size={20} />, title: 'Best Price Guarantee', desc: 'Transparent pricing with no hidden costs. Best market rates on all machinery.' },
                { icon: <Wrench size={20} />, title: 'Certified Technicians', desc: 'Factory-trained engineers for all major plastic machinery brands.' },
                { icon: <Shield size={20} />, title: 'Genuine Spare Parts', desc: 'OEM-quality spare parts sourced directly from top manufacturers.' },
              ].map((feat, i) => (
                <div key={i} className="why-feat-row">
                  <div className="why-feat-icon">{feat.icon}</div>
                  <div>
                    <span className="why-feat-title">{feat.title}</span>
                    <span className="why-feat-desc">{feat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-right">
            <div className="why-image-stack">
              <div className="why-img-main">
                <img src="/img-banner.jpg" alt="MD TechKanpur plastic machinery" />
              </div>
              <div className="why-floating-badge">
                <span className="wfb-num">20+</span>
                <span className="wfb-lbl">Years of<br />Excellence</span>
              </div>
              <div className="why-floating-cert glass-panel-dark">
                <Star size={16} fill="#c9a227" color="#c9a227" />
                <span>500+ Satisfied Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header testimonials-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="gold-divider" />
            <span className="section-subtitle">Client Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <button 
              className="btn btn-outline-gold write-review-btn" 
              style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
              onClick={() => setShowReviewModal(true)}
            >
              Write a Review
            </button>
          </div>

          <div className="testimonials-grid">
            {allReviews.map((t, index) => (
              <div key={t._id || t.id || index} className="testimonial-card glass-panel">
                <div className="tcard-stars">
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p className="tcard-quote">"{t.quote}"</p>
                <div className="tcard-profile">
                  <div className="tcard-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className="tcard-name">{t.name}</span>
                    <span className="tcard-company">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT CTA STRIP
          ═══════════════════════════════════════ */}
      <section className="cta-strip-section">
        <div className="container cta-strip-inner">
          <div className="cta-strip-text">
            <h2 className="cta-strip-title">Ready to upgrade your production line?</h2>
            <p className="cta-strip-sub">Call us today or visit our office at 526 K, Barra Vishwa Bank, Kanpur.</p>
          </div>
          <div className="cta-strip-actions">
            <a href="tel:7499645819" className="btn btn-primary btn-large">
              <Phone size={18} />
              Call: 7499645819
            </a>
            <Link to="/contact" className="btn btn-outline-gold btn-large">
              <MapPin size={18} />
              Get Directions
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WRITE A REVIEW MODAL
          ═══════════════════════════════════════ */}
      {showReviewModal && (
        <div className="review-modal-backdrop" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ animation: 'ani-scale-in 0.3s ease' }}>
            <div className="review-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-primary)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Share Your Experience</h3>
              <button onClick={() => setShowReviewModal(false)} style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {reviewStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Thank You!</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Your review has been published in real-time.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {reviewError && (
                  <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    {reviewError}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="rev-name" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Your Name *</label>
                  <input 
                    id="rev-name" 
                    name="name" 
                    type="text" 
                    required 
                    placeholder="e.g. Rajesh Kumar" 
                    value={reviewForm.name} 
                    onChange={handleReviewChange} 
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="rev-company" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Company / Location *</label>
                  <input 
                    id="rev-company" 
                    name="company" 
                    type="text" 
                    required 
                    placeholder="e.g. Agarwal Plastics, Kanpur" 
                    value={reviewForm.company} 
                    onChange={handleReviewChange} 
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="rev-rating" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Rating *</label>
                  <select 
                    id="rev-rating" 
                    name="rating" 
                    value={reviewForm.rating} 
                    onChange={handleReviewChange}
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="rev-quote" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Your Review *</label>
                  <textarea 
                    id="rev-quote" 
                    name="quote" 
                    rows="4" 
                    required 
                    placeholder="Describe your experience with our plastic machinery sales, service or support..." 
                    value={reviewForm.quote} 
                    onChange={handleReviewChange}
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={reviewStatus === 'loading'} 
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  {reviewStatus === 'loading' ? 'Submitting...' : 'Publish Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
