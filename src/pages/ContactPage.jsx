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
          <span className="section-subtitle">B2B Inquiry Portal</span>
          <h1 className="contact-hero-title">Connect With Our Technical Sales Desk</h1>
          <p className="contact-hero-desc">
            For commercial samples, bulk order pricing, technical datasheets, or custom formulation discussions — our polymer compounding specialists respond within 4 business hours.
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
                <span className="info-card-label">Head Office & Factory</span>
                <p className="info-card-value">Plot No. 12, Sector D, Industrial Area,<br />Dadanagar, Kanpur — 208022<br />Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><Phone size={20} /></div>
              <div>
                <span className="info-card-label">Sales Desk (Mon–Sat, 9AM–6PM IST)</span>
                <a href="tel:+919876543210" className="info-card-value info-link">+91 98765 43210</a>
                <a href="tel:+911234567890" className="info-card-value info-link">+91 12345 67890 (WhatsApp)</a>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><Mail size={20} /></div>
              <div>
                <span className="info-card-label">Email Inquiries</span>
                <a href="mailto:sales@mdtechkanpur.com" className="info-card-value info-link">sales@mdtechkanpur.com</a>
                <a href="mailto:technical@mdtechkanpur.com" className="info-card-value info-link">technical@mdtechkanpur.com</a>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div className="info-icon-wrapper"><Clock size={20} /></div>
              <div>
                <span className="info-card-label">Response Commitment</span>
                <p className="info-card-value">Commercial quotes: within 4 business hours<br />Technical TDS requests: Same day<br />Custom formulation discussions: 24–48 hours</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-strip glass-panel">
              <span className="trust-badge">ISO 9001:2015 Certified</span>
              <span className="trust-badge">FDA Compliant</span>
              <span className="trust-badge">REACH Compliant</span>
              <span className="trust-badge">RoHS Certified</span>
            </div>
          </div>

          {/* RIGHT: B2B Inquiry Form */}
          <div className="inquiry-form-wrapper glass-panel">
            <h2 className="form-title">Product Inquiry & Quote Request</h2>
            <p className="form-subtitle">Fill in your commercial details below. All fields marked * are required.</p>

            {status === 'success' && (
              <div className="status-banner success-banner ani-slide-up">
                <CheckCircle2 size={20} />
                <div>
                  <strong>Inquiry Submitted Successfully!</strong>
                  <p>Our technical sales representative will contact you within 4 business hours.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="status-banner error-banner ani-slide-up">
                <AlertCircle size={20} />
                <div>
                  <strong>Submission Failed</strong>
                  <p>Please try again or contact us directly at sales@mdtechkanpur.com</p>
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
                  <input id="country" name="country" type="text" placeholder="e.g. India, Germany, UAE" value={form.country} onChange={handleChange} />
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
                  <label htmlFor="productId">Product of Interest *</label>
                  <select id="productId" name="productId" value={form.productId} onChange={handleChange}>
                    <option value="">— Select Masterbatch —</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                    <option value="custom">Custom / Private Label Formulation</option>
                  </select>
                  {errors.productId && <span className="error-msg">{errors.productId}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="annualVolume">Estimated Annual Volume</label>
                  <select id="annualVolume" name="annualVolume" value={form.annualVolume} onChange={handleChange}>
                    <option value="">— Select Volume —</option>
                    <option value="trial">Trial / Sample (10–50 kg)</option>
                    <option value="small">Small (&lt; 5 MT/month)</option>
                    <option value="medium">Medium (5–50 MT/month)</option>
                    <option value="large">Large (50–500 MT/month)</option>
                    <option value="xlarge">Very Large (&gt; 500 MT/month)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="processingMethod">Processing Method / Machinery Type</label>
                <input id="processingMethod" name="processingMethod" type="text" placeholder="e.g. Blown film, Injection moulding, Pipe extrusion..." value={form.processingMethod} onChange={handleChange} />
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Inquiry Details / Technical Requirements *</label>
                <textarea id="message" name="message" rows="5" placeholder="Describe your application, required properties (opacity, MFI, temperature range), and any special certification needs (FDA, food-grade, REACH, etc.)..." value={form.message} onChange={handleChange}></textarea>
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
                  <><Loader size={16} className="spin-icon" /> Submitting Inquiry...</>
                ) : (
                  <><Send size={16} /> Submit B2B Inquiry</>
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
