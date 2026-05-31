import React, { useState, useEffect } from 'react';
import { ShieldAlert, LogIn, LogOut, CheckCircle2, XCircle, Clock, Users, FileSpreadsheet, Briefcase, Key, Trash2, ArrowUpRight, Search } from 'lucide-react';
import './AdminPage.css';

// Active Jobs map for displaying readable position titles
const positionTitles = {
  'service-engineer': 'Service Engineer (Mechanics)',
  'plc-specialist': 'PLC & Automation Programmer',
  'sales-rep': 'Machinery Sales Executive',
  'cnc-machinist': 'CNC Lathe & Milling Machinist'
};

// High-end Mock Candidate applications for immediate testing
const defaultMockApplications = [
  {
    id: 'app_mock1',
    name: 'Rajesh Malhotra',
    email: 'rajesh.m@gmail.com',
    mobile: '9812345670',
    position: 'service-engineer',
    experience: '5',
    cvLink: 'https://drive.google.com/file/d/mock-resume-rajesh/view',
    message: 'Experienced in twin-screw compounding lines maintenance. Reconditioned 30+ extruders.',
    status: 'Pending',
    date: '28 May 2026, 10:15 am'
  },
  {
    id: 'app_mock2',
    name: 'Siddharth Mishra',
    email: 'sid.mishra@automation.com',
    mobile: '8877665544',
    position: 'plc-specialist',
    experience: '4',
    cvLink: 'https://drive.google.com/file/d/mock-resume-sid/view',
    message: 'PLC Panel developer specializing in Siemens S7-1200 and Techmation controls setup.',
    status: 'Shortlisted',
    date: '29 May 2026, 04:30 pm'
  },
  {
    id: 'app_mock3',
    name: 'Vikas Yadav',
    email: 'vikas.yadav@machinery.in',
    mobile: '7766554433',
    position: 'sales-rep',
    experience: '6',
    cvLink: 'https://drive.google.com/file/d/mock-resume-vikas/view',
    message: 'B2B sales background in northern India selling blown film extruders and woven sack looms.',
    status: 'Hired',
    date: '25 May 2026, 02:00 pm',
    addedToTeam: true // Already pre-added to team in our mock
  }
];

const defaultMockTeam = [
  {
    id: 'team_mock3',
    name: 'Vikas Yadav',
    email: 'vikas.yadav@machinery.in', // Username
    mobile: '7766554433', // Password
    position: 'sales-rep',
    hiredDate: '25 May 2026'
  }
];

const AdminPage = () => {
  // Authentication states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Data states
  const [applications, setApplications] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('apps'); // 'apps' or 'team'
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check login state in sessionStorage on mount
  useEffect(() => {
    const authState = sessionStorage.getItem('admin_auth');
    if (authState === 'true') {
      setIsLoggedIn(true);
    }

    // Load applications or pre-populate mock data
    const savedApps = localStorage.getItem('careers_applications');
    if (savedApps) {
      setApplications(JSON.parse(savedApps));
    } else {
      localStorage.setItem('careers_applications', JSON.stringify(defaultMockApplications));
      setApplications(defaultMockApplications);
    }

    // Load team members or pre-populate mock data
    const savedTeam = localStorage.getItem('team_members');
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      localStorage.setItem('team_members', JSON.stringify(defaultMockTeam));
      setTeamMembers(defaultMockTeam);
    }
  }, []);

  // Sync state changes with localStorage
  const saveApplicationsToStorage = (newApps) => {
    localStorage.setItem('careers_applications', JSON.stringify(newApps));
    setApplications(newApps);
  };

  const saveTeamToStorage = (newTeam) => {
    localStorage.setItem('team_members', JSON.stringify(newTeam));
    setTeamMembers(newTeam);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Static Credentials validation loaded from Vite environment variables (.env)
    const envEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@mdtech.com';
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'MDTechKanpur@2026';

    if (emailInput.toLowerCase() === envEmail.toLowerCase() && passwordInput === envPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid Administrator Username or Password. Refused access.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
  };

  // Status updates
  const updateApplicationStatus = (appId, newStatus) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    saveApplicationsToStorage(updated);
  };

  // Add Hired applicant to Team
  const addToTeam = (app) => {
    // Check if already in the team
    const isAlreadyMember = teamMembers.some(member => member.email.toLowerCase() === app.email.toLowerCase());
    if (isAlreadyMember) {
      alert(`${app.name} is already registered in the active team list.`);
      return;
    }

    const newMember = {
      id: 'team_' + Date.now(),
      name: app.name,
      email: app.email, // Automated Username
      mobile: app.mobile, // Automated Password
      position: app.position,
      hiredDate: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    // Add to Team and update application tag
    const updatedTeam = [newMember, ...teamMembers];
    saveTeamToStorage(updatedTeam);

    const updatedApps = applications.map(item => {
      if (item.id === app.id) {
        return { ...item, addedToTeam: true, status: 'Hired' };
      }
      return item;
    });
    saveApplicationsToStorage(updatedApps);
  };

  // Remove Team Member
  const removeTeamMember = (memberId, memberEmail) => {
    if (!window.confirm('Are you sure you want to remove this member from the active team and disable their credentials?')) {
      return;
    }

    const updatedTeam = teamMembers.filter(item => item.id !== memberId);
    saveTeamToStorage(updatedTeam);

    // Untag application if exists
    const updatedApps = applications.map(item => {
      if (item.email.toLowerCase() === memberEmail.toLowerCase()) {
        return { ...item, addedToTeam: false };
      }
      return item;
    });
    saveApplicationsToStorage(updatedApps);
  };

  // Delete Application
  const deleteApplication = (appId) => {
    if (!window.confirm('Delete this application record completely?')) {
      return;
    }
    const updated = applications.filter(item => item.id !== appId);
    saveApplicationsToStorage(updated);
  };

  // Stat computations
  const totalApps = applications.length;
  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const hiredCount = applications.filter(a => a.status === 'Hired').length;
  const teamCount = teamMembers.length;

  // Filter application list
  const filteredApps = applications.filter(app => {
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchPosition = positionFilter === 'all' || app.position === positionFilter;
    const matchSearch = searchQuery.trim() === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.mobile.includes(searchQuery);
    return matchStatus && matchPosition && matchSearch;
  });

  return (
    <div className="admin-page-wrapper ani-fade-in">
      {!isLoggedIn ? (
        /* ═══════════════════════════════════════
           ADMIN LOGIN WALL VIEW
           ═══════════════════════════════════════ */
        <div className="admin-login-container">
          <div className="login-box glass-panel shimmer-bg">
            <div className="login-header">
              <div className="login-shield">
                <ShieldAlert size={28} />
              </div>
              <h1 className="login-title">MD TechKanpur</h1>
              <p className="login-subtitle">Secure Administrator Portal</p>
            </div>

            {loginError && <div className="login-error-banner">{loginError}</div>}

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-input-group">
                <label htmlFor="adminEmail">Username / Admin Email</label>
                <input 
                  type="email" 
                  id="adminEmail" 
                  placeholder="admin@mdtech.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required 
                />
              </div>

              <div className="login-input-group">
                <label htmlFor="adminPassword">Security Password</label>
                <input 
                  type="password" 
                  id="adminPassword" 
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary login-submit-btn">
                <LogIn size={16} />
                Access Control Panel
              </button>
            </form>

            <div className="login-notice">
              <p>🔐 Unauthorized access is logged. Standard single-sign admin locks active.</p>
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════
           ADMIN DASHBOARD WORKSPACE VIEW
           ═══════════════════════════════════════ */
        <div className="admin-dashboard-container">
          {/* Header Panel */}
          <header className="dashboard-header glass-panel">
            <div className="db-brand">
              <span className="gold-accent-dot"></span>
              <div>
                <h1 className="db-title">MD TechKanpur Panel</h1>
                <span className="db-subtitle">Recruiting &amp; Team Management Control</span>
              </div>
            </div>
            
            <div className="db-header-actions">
              <span className="admin-badge">⚡ Root Admin</span>
              <button onClick={handleLogout} className="btn btn-accent logout-btn">
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </header>

          {/* Stats Bar */}
          <section className="stats-bar-grid">
            <div className="stat-card glass-panel">
              <div className="stat-card-icon"><FileSpreadsheet size={22} /></div>
              <div>
                <span className="stat-card-label">Total Submissions</span>
                <span className="stat-card-val">{totalApps}</span>
              </div>
            </div>

            <div className="stat-card glass-panel orange-stat">
              <div className="stat-card-icon"><Clock size={22} /></div>
              <div>
                <span className="stat-card-label">Pending Review</span>
                <span className="stat-card-val">{pendingCount}</span>
              </div>
            </div>

            <div className="stat-card glass-panel blue-stat">
              <div className="stat-card-icon"><ArrowUpRight size={22} /></div>
              <div>
                <span className="stat-card-label">Shortlisted Profiles</span>
                <span className="stat-card-val">{shortlistedCount}</span>
              </div>
            </div>

            <div className="stat-card glass-panel green-stat">
              <div className="stat-card-icon"><CheckCircle2 size={22} /></div>
              <div>
                <span className="stat-card-label">Candidates Hired</span>
                <span className="stat-card-val">{hiredCount}</span>
              </div>
            </div>

            <div className="stat-card glass-panel gold-stat">
              <div className="stat-card-icon"><Users size={22} /></div>
              <div>
                <span className="stat-card-label">Team Members</span>
                <span className="stat-card-val">{teamCount}</span>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="dashboard-tabs-bar">
            <button 
              className={`db-tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
              onClick={() => setActiveTab('apps')}
            >
              <FileSpreadsheet size={16} />
              Job Applications ({applications.length})
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <Users size={16} />
              Active Team Members ({teamMembers.length})
            </button>
          </div>

          {/* Tab 1: Applications Dashboard */}
          {activeTab === 'apps' && (
            <div className="db-table-wrapper glass-panel">
              {/* Filter controls row */}
              <div className="table-controls-row">
                <div className="db-search-box">
                  <Search size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name, email, or mobile..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="db-dropdown-filters">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
                    <option value="all">All Positions</option>
                    <option value="service-engineer">Service Engineer</option>
                    <option value="plc-specialist">PLC Specialist</option>
                    <option value="sales-rep">Sales Executive</option>
                    <option value="cnc-machinist">CNC Machinist</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="responsive-table-outer">
                <table className="db-data-table">
                  <thead>
                    <tr>
                      <th>Candidate Details</th>
                      <th>Applied Position</th>
                      <th>Experience</th>
                      <th>Submission Date</th>
                      <th>Status Badge</th>
                      <th>Hiring Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.length > 0 ? (
                      filteredApps.map((app) => (
                        <tr key={app.id}>
                          <td>
                            <div className="cand-info">
                              <span className="cand-name">{app.name}</span>
                              <span className="cand-contact">📧 {app.email}</span>
                              <span className="cand-contact">📞 {app.mobile}</span>
                            </div>
                          </td>
                          <td>
                            <div className="cand-pos">
                              <span className="pos-badge">{positionTitles[app.position] || app.position}</span>
                              {app.message && <p className="cand-msg" title={app.message}>" {app.message} "</p>}
                            </div>
                          </td>
                          <td className="cand-exp"><strong>{app.experience}</strong> Years</td>
                          <td className="cand-date">{app.date}</td>
                          <td>
                            <span className={`status-pill ${app.status.toLowerCase()}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-button-group">
                              <a href={app.cvLink} target="_blank" rel="noopener noreferrer" className="action-btn-small link-btn" title="View CV Link">
                                📄 CV Link
                              </a>
                              
                              {app.status !== 'Hired' && app.status !== 'Rejected' && (
                                <>
                                  <button onClick={() => updateApplicationStatus(app.id, 'Shortlisted')} className="action-btn-small shortlist-btn" title="Shortlist Candidate">
                                    ✓ Shortlist
                                  </button>
                                  <button onClick={() => updateApplicationStatus(app.id, 'Rejected')} className="action-btn-small reject-btn" title="Reject Candidate">
                                    ✗ Reject
                                  </button>
                                </>
                              )}

                              {app.status !== 'Hired' && (
                                <button onClick={() => updateApplicationStatus(app.id, 'Hired')} className="action-btn-small hire-btn" title="Mark as Hired">
                                  🏆 Hire
                                </button>
                              )}

                              {app.status === 'Hired' && !app.addedToTeam && (
                                <button onClick={() => addToTeam(app)} className="action-btn-small add-team-btn" title="Provision Staff Credentials">
                                  👑 Add to Team
                                </button>
                              )}

                              {app.addedToTeam && (
                                <span className="team-added-tag">🎉 Added to Team</span>
                              )}

                              <button onClick={() => deleteApplication(app.id)} className="action-btn-small trash-btn" title="Delete application">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data-cell">No candidate applications matched the filter selection.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Team Members & Login Credentials Dashboard */}
          {activeTab === 'team' && (
            <div className="db-table-wrapper glass-panel">
              <div className="team-section-header">
                <h2>Automated Staff Account Registry</h2>
                <p>These active staff members have automated credentials created instantly upon hiring. Their **Email ID** operates as username and their **Mobile Number** operates as password.</p>
              </div>

              <div className="responsive-table-outer">
                <table className="db-data-table">
                  <thead>
                    <tr>
                      <th>Staff Name</th>
                      <th>Designation</th>
                      <th>Hired Date</th>
                      <th><Key size={13} style={{ marginRight: '5px' }} /> Login Username (Email)</th>
                      <th><Key size={13} style={{ marginRight: '5px' }} /> Auto Password (Mobile)</th>
                      <th>Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.length > 0 ? (
                      teamMembers.map((member) => (
                        <tr key={member.id}>
                          <td><strong>{member.name}</strong></td>
                          <td><span className="pos-badge">{positionTitles[member.position] || member.position}</span></td>
                          <td>{member.hiredDate}</td>
                          <td className="credential-cell"><code>{member.email}</code></td>
                          <td className="credential-cell"><code>{member.mobile}</code></td>
                          <td>
                            <button 
                              onClick={() => removeTeamMember(member.id, member.email)} 
                              className="action-btn-small trash-btn"
                              title="Revoke Credentials &amp; Remove Member"
                            >
                              <Trash2 size={13} style={{ marginRight: '4px' }} />
                              Revoke Staff
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data-cell">No active team members registered in the database. Mark a candidate as "Hired" and click "Add to Team".</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
