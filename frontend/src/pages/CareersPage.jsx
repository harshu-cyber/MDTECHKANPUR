import React, { useState } from 'react';
import { Briefcase, Send, CheckCircle2, User, Mail, Phone, Calendar, Link as LinkIcon, FileText } from 'lucide-react';
import { submitApplication } from '../services/api';
import './CareersPage.css';

const activeJobs = [
  {
    id: 'service-engineer',
    title: 'Plastic Machinery Service Engineer',
    department: 'Technical Operations',
    location: 'Kanpur / UP (On-Site & Field)',
    type: 'Full-Time',
    experience: '3 - 8 Years',
    description: 'We are seeking an experienced field service technician for troubleshooting, installing, and performing AMC maintenance on single/twin-screw extruders and hydraulic moulding machines.'
  },
  {
    id: 'plc-specialist',
    title: 'PLC & Automation Programmer',
    department: 'Electrical & Panels',
    location: 'Kanpur Workshop',
    type: 'Full-Time',
    experience: '2 - 6 Years',
    description: 'Responsible for programming and retrofitting PLC microcomputers (Techmation, Siemens) and optimizing energy-saving servo pump controls on refurbished machinery.'
  },
  {
    id: 'sales-rep',
    title: 'Machinery Sales Executive',
    department: 'Sales & Marketing',
    location: 'Kanpur / B2B Regional Travel',
    type: 'Full-Time',
    experience: '2 - 5 Years',
    description: 'Focus on selling plastic extruders, auxiliary loaders/chillers, and spare parts. Developing direct relations with polymer processing and woven sack plants.'
  },
  {
    id: 'cnc-machinist',
    title: 'CNC Lathe & Milling Machinist',
    department: 'Spare Parts Fabrication',
    location: 'Dadanagar Workshop',
    type: 'Full-Time',
    experience: '3+ Years',
    description: 'Precision machining of replacement bimetallic screw elements, customized keyways, and gearbox shafts to support customer spare parts requests.'
  }
];

const CareersPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    position: 'service-engineer',
    experience: '',
    cvLink: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.experience || !formData.cvLink.trim()) {
      setErrorMsg('Please fill in all required fields and provide a valid Resume URL.');
      return;
    }

    try {
      await submitApplication({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        position: formData.position,
        experience: formData.experience.toString(),
        cvLink: formData.cvLink,
        message: formData.message,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="careers-page-wrapper ani-fade-in">
      {/* Hero Header */}
      <section className="careers-hero">
        <div className="container">
          <span className="section-subtitle">Work With Us</span>
          <h1 className="careers-hero-title">Build Your Career in Engineering</h1>
          <p className="careers-hero-desc">
            Join Kanpur's leading team in plastic machinery sales and technical service. We provide continuous growth, hands-on training, and a highly professional environment.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="container grid-2 careers-grid">
          {/* Active Job Postings */}
          <div className="jobs-list-col">
            <h2 className="careers-sec-title">Current Openings</h2>
            <p className="careers-sec-subtitle">Click on a position below to select it in the application form.</p>
            
            <div className="jobs-stack">
              {activeJobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`job-card glass-panel ${formData.position === job.id ? 'selected-job' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, position: job.id }))}
                >
                  <div className="job-card-header">
                    <div className="job-icon-box">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <span className="job-dept">{job.department} &bull; {job.type}</span>
                    </div>
                  </div>
                  <p className="job-desc">{job.description}</p>
                  <div className="job-meta-row">
                    <span className="job-meta-pill">📍 {job.location}</span>
                    <span className="job-meta-pill">⏱ {job.experience} Required</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Application Column */}
          <div className="form-col">
            <div className="application-box glass-panel shimmer-bg">
              {!isSubmitted ? (
                <>
                  <h2 className="form-box-title">Apply Now</h2>
                  <p className="form-box-desc">Fill out your professional details below to submit your profile directly to our hiring team.</p>
                  
                  {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

                  <form className="careers-form" onSubmit={handleSubmit}>
                    
                    {/* Name */}
                    <div className="form-group-custom">
                      <label htmlFor="name"><User size={14} /> Full Name <span className="req">*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="e.g. Amit Kumar"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="form-row-2">
                      <div className="form-group-custom">
                        <label htmlFor="email"><Mail size={14} /> Email Address <span className="req">*</span></label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          placeholder="amit@gmail.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group-custom">
                        <label htmlFor="mobile"><Phone size={14} /> Mobile Number <span className="req">*</span></label>
                        <input 
                          type="tel" 
                          id="mobile" 
                          name="mobile" 
                          placeholder="e.g. 9876543210"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Position applied for */}
                    <div className="form-group-custom">
                      <label htmlFor="position"><Briefcase size={14} /> Applying For Position <span className="req">*</span></label>
                      <select 
                        id="position" 
                        name="position" 
                        value={formData.position}
                        onChange={handleChange}
                        required
                      >
                        {activeJobs.map(job => (
                          <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Experience & CV Link */}
                    <div className="form-row-2">
                      <div className="form-group-custom">
                        <label htmlFor="experience"><Calendar size={14} /> Total Experience (Years) <span className="req">*</span></label>
                        <input 
                          type="number" 
                          id="experience" 
                          name="experience" 
                          placeholder="e.g. 3"
                          min="0"
                          max="40"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group-custom">
                        <label htmlFor="cvLink"><LinkIcon size={14} /> Resume Link (Google Drive / PDF) <span className="req">*</span></label>
                        <input 
                          type="url" 
                          id="cvLink" 
                          name="cvLink" 
                          placeholder="https://drive.google.com/..."
                          value={formData.cvLink}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Cover Message */}
                    <div className="form-group-custom">
                      <label htmlFor="message"><FileText size={14} /> Key Skills &amp; Message (Optional)</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4" 
                        placeholder="Describe your previous machinery, electrical, or sales experience..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary form-submit-btn">
                      <Send size={15} />
                      Submit Application
                    </button>

                  </form>
                </>
              ) : (
                <div className="success-view ani-scale-in">
                  <div className="success-icon-box">
                    <CheckCircle2 size={48} color="var(--accent-primary)" />
                  </div>
                  <h2 className="success-title">Application Submitted!</h2>
                  <p className="success-message">
                    Thank you, <strong>{formData.name}</strong>. Your profile for <strong>{activeJobs.find(j => j.id === formData.position)?.title}</strong> has been successfully registered.
                  </p>
                  <p className="success-sub">
                    Our technical recruitment manager will audit your experience details. Shortlisted profiles will receive interview invites on registered credentials soon.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        mobile: '',
                        position: 'service-engineer',
                        experience: '',
                        cvLink: '',
                        message: ''
                      });
                    }}
                    className="btn btn-secondary success-btn-again"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
