import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { products } from '../data/products';
import { submitInquiry } from '../services/api';
import './ContactPage.css';

const INITIAL_FORM = {
  companyName: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  country: '',
  productCategory: '',
  productId: '',
  annualVolume: '',
  processingMethod: '',
  message: '',
  privacyAgreed: false,
};

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      const found = products.find(p => p.id === productParam);
      if (found) {
        setForm(prev => ({ ...prev, productId: productParam, productCategory: found.category }));
      }
    }
  }, [searchParams]);

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    if (!form.contactName.trim()) errs.contactName = 'Contact name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.phone.trim()) errs.phone = 'Phone / WhatsApp number is required';
    if (!form.country.trim()) errs.country = 'Country is required';
    if (!form.productId) errs.productId = 'Please select a product of interest';
    if (!form.message.trim()) errs.message = 'Please describe your requirement';
    if (!form.privacyAgreed) errs.privacyAgreed = 'You must agree to the terms';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    try {
      await submitInquiry(form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page-wrapper ani-fade-in">

      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <span className="section-subtitle">Get In Touch</span>
          <h1 className="contact-hero-title">Contact MD TechKanpur</h1>
          <p className="contact-hero-desc">
            Looking to buy, service, or get spare parts for plastic machinery? Our team is here to help.
            Call us directly at <strong style={{color:'#c9a227'}}>7499645819</strong> or fill in the form below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout-grid">

          {/* LEFT: Contact Info Cards */}
          <div className="contact-info-panel">
            <h2 className="info-panel-title">Get In Touch</h2>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><MapPin size={20} /></div>
              <div>
                <span className="info-card-label">Office Address</span>
                <p className="info-card-value">526 K, Barra Vishwa Bank,<br />Kanpur, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><Phone size={20} /></div>
              <div>
                <span className="info-card-label">Call / WhatsApp (Mon–Sat, 9AM–7PM)</span>
                <a href="tel:7499645819" className="info-card-value info-link">7499645819</a>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><Mail size={20} /></div>
              <div>
                <span className="info-card-label">Email</span>
                <a href="mailto:mdtechkanpur@gmail.com" className="info-card-value info-link">mdtechkanpur@gmail.com</a>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><Clock size={20} /></div>
              <div>
                <span className="info-card-label">Our Commitment</span>
                <p className="info-card-value">On-site service calls: within 2–4 hours<br />Machine quotes: same day<br />Spare parts availability: immediate</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-strip glass-panel">
              <span className="trust-badge">Sales &amp; Service</span>
              <span className="trust-badge">AMC Available</span>
              <span className="trust-badge">Genuine Parts</span>
              <span className="trust-badge">Fast Response</span>
            </div>
          </div>

          {/* RIGHT: B2B Inquiry Form */}
          <div className="inquiry-form-wrapper glass-panel">
            <h2 className="form-title">Service &amp; Product Inquiry</h2>
            <p className="form-subtitle">Tell us what you need — we'll get back to you fast. All fields marked * are required.</p>

            {status === 'success' && (
              <div className="status-banner success-banner ani-slide-up">
                <CheckCircle2 size={20} />
                <div>
                  <strong>Inquiry Submitted Successfully!</strong>
                  <p>Our representative will contact you shortly.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="status-banner error-banner ani-slide-up">
                <AlertCircle size={20} />
                <div>
                  <strong>Submission Failed</strong>
                  <p>Please try again or contact us directly at mdtechkanpur@gmail.com</p>
                </div>
              </div>
            )}

            <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${errors.companyName ? 'has-error' : ''}`}>
                  <label htmlFor="companyName">Company / Organisation Name *</label>
                  <input id="companyName" name="companyName" type="text" placeholder="e.g. Plastco Industries Pvt. Ltd." value={form.companyName} onChange={handleChange} />
                  {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
                </div>
                <div className={`form-group ${errors.contactName ? 'has-error' : ''}`}>
                  <label htmlFor="contactName">Full Name *</label>
                  <input id="contactName" name="contactName" type="text" placeholder="e.g. Rajesh Kumar" value={form.contactName} onChange={handleChange} />
                  {errors.contactName && <span className="error-msg">{errors.contactName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="designation">Designation / Role</label>
                  <input id="designation" name="designation" type="text" placeholder="e.g. Purchase Manager" value={form.designation} onChange={handleChange} />
                </div>
                <div className={`form-group ${errors.country ? 'has-error' : ''}`}>
                  <label htmlFor="country">Country *</label>
                  <input id="country" name="country" type="text" placeholder="e.g. India" value={form.country} onChange={handleChange} />
                  {errors.country && <span className="error-msg">{errors.country}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Business Email *</label>
                  <input id="email" name="email" type="email" placeholder="name@company.com" value={form.email} onChange={handleChange} />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone">Phone / WhatsApp *</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.productId ? 'has-error' : ''}`}>
                  <label htmlFor="productId">Service / Product Required *</label>
                  <select id="productId" name="productId" value={form.productId} onChange={handleChange}>
                    <option value="">— Select Requirement —</option>
                    <option value="extruder-new">Plastic Extruder (New)</option>
                    <option value="extruder-used">Plastic Extruder (Refurbished)</option>
                    <option value="injection-new">Injection Moulding Machine (New)</option>
                    <option value="injection-used">Injection Moulding Machine (Used)</option>
                    <option value="auxiliary">Auxiliary Equipment</option>
                    <option value="spare-parts">Spare Parts</option>
                    <option value="service">On-Site Servicing / Repair</option>
                    <option value="amc">Annual Maintenance Contract (AMC)</option>
                    <option value="raw-material">Raw Material / Granules</option>
                    <option value="other">Other / Custom Requirement</option>
                  </select>
                  {errors.productId && <span className="error-msg">{errors.productId}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="annualVolume">Budget Range</label>
                  <select id="annualVolume" name="annualVolume" value={form.annualVolume} onChange={handleChange}>
                    <option value="">— Select Budget —</option>
                    <option value="small">Under ₹1 Lakh</option>
                    <option value="medium">₹1 – 5 Lakh</option>
                    <option value="large">₹5 – 20 Lakh</option>
                    <option value="xlarge">Above ₹20 Lakh</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="processingMethod">Machine Type / Current Equipment</label>
                <input id="processingMethod" name="processingMethod" type="text" placeholder="e.g. 80-ton injection moulding, 45mm extruder, pipe line..." value={form.processingMethod} onChange={handleChange} />
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Describe Your Requirement *</label>
                <textarea id="message" name="message" rows="5" placeholder="e.g. Need servicing for a 100-ton injection moulding machine, facing heating issues. Or: Looking to buy a new single-screw extruder for pipe making..." value={form.message} onChange={handleChange}></textarea>
                {errors.message && <span className="error-msg">{errors.message}</span>}
              </div>

              <div className={`form-group privacy-group ${errors.privacyAgreed ? 'has-error' : ''}`}>
                <label className="checkbox-label">
                  <input type="checkbox" name="privacyAgreed" checked={form.privacyAgreed} onChange={handleChange} id="privacyAgreed" />
                  <span>I agree that MD TechKanpur may contact me regarding this B2B inquiry and use the provided information for commercial correspondence *</span>
                </label>
                {errors.privacyAgreed && <span className="error-msg">{errors.privacyAgreed}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-inquiry-btn"
                disabled={status === 'loading'}
                id="submit-inquiry-btn"
              >
                {status === 'loading' ? (
                  <><Loader size={16} className="spin-icon" /> Submitting...</>
                ) : (
                  <><Send size={16} /> Send Inquiry &amp; Get Quote</>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
