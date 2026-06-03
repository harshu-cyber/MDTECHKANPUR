import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, LogIn, LogOut, LayoutDashboard, FileSpreadsheet,
  Users, Briefcase, ClipboardList, CheckCircle2, Clock,
  ArrowUpRight, Trash2, Search, Key, X, ChevronRight,
  Phone, Mail, Building2, Package, Send, AlertCircle, BarChart3
} from 'lucide-react';
import './AdminPage.css';

/* ─── Constants ─── */
const POSITION_TITLES = {
  'service-engineer': 'Service Engineer (Mechanics)',
  'plc-specialist': 'PLC & Automation Programmer',
  'sales-rep': 'Machinery Sales Executive',
  'cnc-machinist': 'CNC Lathe & Milling Machinist'
};

const MOCK_APPLICATIONS = [
  { id: 'app_mock1', name: 'Rajesh Malhotra', email: 'rajesh.m@gmail.com', mobile: '9812345670', position: 'service-engineer', experience: '5', cvLink: 'https://drive.google.com/file/d/mock-resume-rajesh/view', message: 'Experienced in twin-screw compounding lines maintenance. Reconditioned 30+ extruders.', status: 'Pending', date: '28 May 2026, 10:15 am' },
  { id: 'app_mock2', name: 'Siddharth Mishra', email: 'sid.mishra@automation.com', mobile: '8877665544', position: 'plc-specialist', experience: '4', cvLink: 'https://drive.google.com/file/d/mock-resume-sid/view', message: 'PLC Panel developer specializing in Siemens S7-1200 and Techmation controls.', status: 'Shortlisted', date: '29 May 2026, 04:30 pm' },
  { id: 'app_mock3', name: 'Vikas Yadav', email: 'vikas.yadav@machinery.in', mobile: '7766554433', position: 'sales-rep', experience: '6', cvLink: 'https://drive.google.com/file/d/mock-resume-vikas/view', message: 'B2B sales background in northern India selling blown film extruders.', status: 'Hired', date: '25 May 2026, 02:00 pm', addedToTeam: true }
];

const MOCK_TEAM = [
  { id: 'team_mock3', name: 'Vikas Yadav', email: 'vikas.yadav@machinery.in', mobile: '7766554433', position: 'sales-rep', hiredDate: '25 May 2026' }
];

const MOCK_INQUIRIES = [
  { id: 'INQ-001', companyName: 'Sharma Plastics Pvt Ltd', contactName: 'Arvind Sharma', email: 'arvind@sharmaplastics.com', phone: '9988776655', productId: 'single-screw-extruder', message: 'Need a 65mm single screw extruder for PP pipe production. Seeking price quotation and delivery timeline.', timestamp: '2026-05-28T09:30:00Z', status: 'pending' },
  { id: 'INQ-002', companyName: 'Gupta Poly Industries', contactName: 'Manoj Gupta', email: 'manoj@guptapoly.com', phone: '9876543211', productId: 'injection-moulding-machine', message: 'Looking for 150 ton injection moulding machine for container manufacturing. Request demo.', timestamp: '2026-05-29T11:15:00Z', status: 'replied' },
  { id: 'INQ-003', companyName: 'Singh Engineering Works', contactName: 'Deepak Singh', email: 'deepak@singheng.in', phone: '8765432109', productId: 'screw-barrel-spares', message: 'Need urgent replacement screw barrel for our 45mm extruder. Machine is down.', timestamp: '2026-05-30T08:00:00Z', status: 'pending' }
];

/* ─── Sidebar Items Config ─── */
const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inquiries', label: 'Inquiries', icon: Package },
  { id: 'applications', label: 'Job Applications', icon: FileSpreadsheet },
  { id: 'team', label: 'Team Registry', icon: Users },
  { id: 'assign', label: 'Assign Work', icon: ClipboardList },
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const [userName, setUserName] = useState('Root Administrator');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data States
  const [applications, setApplications] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [workAssignments, setWorkAssignments] = useState([]);

  // Filters
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [inqSearch, setInqSearch] = useState('');
  const [inqStatusFilter, setInqStatusFilter] = useState('all');

  // Assign Work Form
  const [assignForm, setAssignForm] = useState({ title: '', description: '', priority: 'Medium', assignTo: 'all', memberId: '', dueDate: '' });
  const [assignSuccess, setAssignSuccess] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsLoggedIn(true);
      setUserRole(sessionStorage.getItem('user_role') || 'admin');
      setUserName(sessionStorage.getItem('user_name') || 'Root Administrator');
    }

    const savedApps = localStorage.getItem('careers_applications');
    setApplications(savedApps ? JSON.parse(savedApps) : MOCK_APPLICATIONS);
    if (!savedApps) localStorage.setItem('careers_applications', JSON.stringify(MOCK_APPLICATIONS));

    const savedTeam = localStorage.getItem('team_members');
    setTeamMembers(savedTeam ? JSON.parse(savedTeam) : MOCK_TEAM);
    if (!savedTeam) localStorage.setItem('team_members', JSON.stringify(MOCK_TEAM));

    const savedInq = localStorage.getItem('md-tech-inquiries');
    const parsed = savedInq ? JSON.parse(savedInq) : [];
    setInquiries(parsed.length > 0 ? parsed : MOCK_INQUIRIES);
    if (parsed.length === 0) localStorage.setItem('md-tech-inquiries', JSON.stringify(MOCK_INQUIRIES));

    const savedWork = localStorage.getItem('work_assignments');
    setWorkAssignments(savedWork ? JSON.parse(savedWork) : []);
  }, []);

  /* ─── Auth Handlers ─── */
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const envEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@mdtech.com';
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'MDTechKanpur@2026';
    
    // Check Root Admin
    if (emailInput.toLowerCase() === envEmail.toLowerCase() && passwordInput === envPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      sessionStorage.setItem('user_role', 'admin');
      sessionStorage.setItem('user_name', 'Root Administrator');
      setUserRole('admin');
      setUserName('Root Administrator');
      setIsLoggedIn(true);
      return;
    }
    
    // Check Team Members (ID is email, Password is mobile)
    const matchingMember = teamMembers.find(m => m.email.toLowerCase() === emailInput.toLowerCase());
    if (matchingMember && matchingMember.mobile === passwordInput) {
      sessionStorage.setItem('admin_auth', 'true');
      sessionStorage.setItem('user_role', 'staff');
      sessionStorage.setItem('user_name', matchingMember.name);
      sessionStorage.setItem('user_email', matchingMember.email);
      sessionStorage.setItem('user_position', matchingMember.position);
      setUserRole('staff');
      setUserName(matchingMember.name);
      setIsLoggedIn(true);
      return;
    }
    
    setLoginError('Invalid credentials. Please verify your username and password.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('user_role');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_position');
    setUserRole('admin');
    setUserName('Root Administrator');
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
  };

  /* ─── Application Handlers ─── */
  const saveApps = (data) => { localStorage.setItem('careers_applications', JSON.stringify(data)); setApplications(data); };
  const updateAppStatus = (id, status) => saveApps(applications.map(a => a.id === id ? { ...a, status } : a));
  const deleteApp = (id) => { if (window.confirm('Delete this application?')) saveApps(applications.filter(a => a.id !== id)); };
  const addToTeam = (app) => {
    if (teamMembers.some(m => m.email.toLowerCase() === app.email.toLowerCase())) { alert(`${app.name} is already in the team.`); return; }
    const newMember = { id: 'team_' + Date.now(), name: app.name, email: app.email, mobile: app.mobile, position: app.position, hiredDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) };
    const updatedTeam = [newMember, ...teamMembers];
    localStorage.setItem('team_members', JSON.stringify(updatedTeam));
    setTeamMembers(updatedTeam);
    saveApps(applications.map(a => a.id === app.id ? { ...a, addedToTeam: true, status: 'Hired' } : a));
  };
  const removeMember = (id, email) => {
    if (!window.confirm('Remove this team member and revoke credentials?')) return;
    const updatedTeam = teamMembers.filter(m => m.id !== id);
    localStorage.setItem('team_members', JSON.stringify(updatedTeam));
    setTeamMembers(updatedTeam);
    saveApps(applications.map(a => a.email.toLowerCase() === email.toLowerCase() ? { ...a, addedToTeam: false } : a));
  };

  /* ─── Inquiry Handlers ─── */
  const saveInquiries = (data) => { localStorage.setItem('md-tech-inquiries', JSON.stringify(data)); setInquiries(data); };
  const updateInqStatus = (id, status) => saveInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
  const deleteInquiry = (id) => { if (window.confirm('Delete this inquiry?')) saveInquiries(inquiries.filter(i => i.id !== id)); };

  /* ─── Assign Work Handler ─── */
  const handleAssignWork = (e) => {
    e.preventDefault();
    if (!assignForm.title.trim()) return;
    const assignment = {
      id: 'work_' + Date.now(),
      ...assignForm,
      assignedDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      completionStatus: 'Pending',
      assignedToName: assignForm.assignTo === 'all'
        ? 'All Team Members'
        : assignForm.assignTo === 'member'
          ? teamMembers.find(m => m.id === assignForm.memberId)?.name || 'Unknown'
          : 'Unknown'
    };
    const updated = [assignment, ...workAssignments];
    localStorage.setItem('work_assignments', JSON.stringify(updated));
    setWorkAssignments(updated);
    setAssignForm({ title: '', description: '', priority: 'Medium', assignTo: 'all', memberId: '', dueDate: '' });
    setAssignSuccess(true);
    setTimeout(() => setAssignSuccess(false), 3500);
  };
  const updateWorkStatus = (id, status) => {
    const updated = workAssignments.map(w => w.id === id ? { ...w, completionStatus: status } : w);
    localStorage.setItem('work_assignments', JSON.stringify(updated));
    setWorkAssignments(updated);
  };
  const deleteWork = (id) => {
    if (!window.confirm('Delete this assignment?')) return;
    const updated = workAssignments.filter(w => w.id !== id);
    localStorage.setItem('work_assignments', JSON.stringify(updated));
    setWorkAssignments(updated);
  };

  /* ─── Computed Stats ─── */
  const stats = {
    totalApps: applications.length,
    pending: applications.filter(a => a.status === 'Pending').length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    hired: applications.filter(a => a.status === 'Hired').length,
    team: teamMembers.length,
    inqTotal: inquiries.length,
    inqPending: inquiries.filter(i => i.status === 'pending').length,
    inqReplied: inquiries.filter(i => i.status === 'replied').length,
    workPending: workAssignments.filter(w => w.completionStatus === 'Pending').length,
  };

  /* ─── Filtered Lists ─── */
  const filteredApps = applications.filter(a => {
    const matchStatus = appStatusFilter === 'all' || a.status === appStatusFilter;
    const matchSearch = !appSearch.trim() || a.name.toLowerCase().includes(appSearch.toLowerCase()) || a.email.toLowerCase().includes(appSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredInq = inquiries.filter(i => {
    const matchStatus = inqStatusFilter === 'all' || i.status === inqStatusFilter;
    const matchSearch = !inqSearch.trim() || (i.companyName || '').toLowerCase().includes(inqSearch.toLowerCase()) || (i.contactName || '').toLowerCase().includes(inqSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const visibleSidebarItems = SIDEBAR_ITEMS.filter(item => {
    if (userRole === 'staff') {
      return item.id === 'dashboard' || item.id === 'assign';
    }
    return true; // admin sees everything
  });

  const filteredAssignments = workAssignments.filter(w => {
    if (userRole === 'staff') {
      const email = sessionStorage.getItem('user_email') || '';
      const member = teamMembers.find(m => m.email.toLowerCase() === email.toLowerCase());
      return w.assignTo === 'all' || (w.assignTo === 'member' && w.memberId === member?.id);
    }
    return true; // admin sees all
  });

  /* ═══════════════════════════════════
     LOGIN WALL
  ═══════════════════════════════════ */
  if (!isLoggedIn) {
    return (
      <div className="adm-login-screen">
        <div className="adm-login-card">
          <div className="adm-login-brand">
            <div className="adm-shield-icon"><ShieldAlert size={26} /></div>
            <h1>MD TechKanpur</h1>
            <span className="adm-login-sub">Secure Administration Portal</span>
          </div>

          {loginError && (
            <div className="adm-login-error">
              <AlertCircle size={15} />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="adm-login-form">
            <div className="adm-field">
              <label htmlFor="adm-email">Email Address</label>
              <input
                id="adm-email"
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="adm-field">
              <label htmlFor="adm-pass">Password</label>
              <input
                id="adm-pass"
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary adm-login-btn">
              <LogIn size={16} />
              Login
            </button>
          </form>

          <p className="adm-login-notice">Authorised personnel only. All access is monitored.</p>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════
     DASHBOARD (after login)
  ═══════════════════════════════════ */
  return (
    <div className="adm-shell">

      {/* ── Sidebar ── */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="adm-sidebar-brand">
          <div className="adm-brand-dot" />
          {sidebarOpen && (
            <div>
              <span className="adm-brand-name">MD TechKanpur</span>
              <span className="adm-brand-role">Admin Panel</span>
            </div>
          )}
        </div>

        <nav className="adm-nav">
          {visibleSidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`adm-nav-item ${activeModule === item.id ? 'active' : ''}`}
                onClick={() => setActiveModule(item.id)}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={18} />
                {sidebarOpen && <span>{item.label}</span>}
                {item.id === 'inquiries' && stats.inqPending > 0 && sidebarOpen && (
                  <span className="adm-nav-badge">{stats.inqPending}</span>
                )}
                {item.id === 'applications' && stats.pending > 0 && sidebarOpen && (
                  <span className="adm-nav-badge">{stats.pending}</span>
                )}
              </button>
            );
          })}
        </nav>

        <button className="adm-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <ChevronRight size={16} className={sidebarOpen ? 'rotated' : ''} />
        </button>

        <button className="adm-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="adm-main">

        {/* Top Bar */}
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">
              {visibleSidebarItems.find(s => s.id === activeModule)?.label}
            </h1>
            <span className="adm-page-date">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <span className="adm-admin-pill">
            {userRole === 'admin' ? 'Root Administrator' : `${userName} (${POSITION_TITLES[sessionStorage.getItem('user_position')] || 'Staff'})`}
          </span>
        </header>

        <div className="adm-content">

          {/* ══════════════════════════════════
              MODULE: DASHBOARD OVERVIEW
          ══════════════════════════════════ */}
          {activeModule === 'dashboard' && (
            <div className="adm-module">
              {userRole === 'admin' ? (
                <>
                  <div className="adm-stats-grid">
                    {[
                      { label: 'Total Applications', val: stats.totalApps, icon: FileSpreadsheet, cls: '' },
                      { label: 'Pending Review', val: stats.pending, icon: Clock, cls: 'orange' },
                      { label: 'Shortlisted', val: stats.shortlisted, icon: ArrowUpRight, cls: 'blue' },
                      { label: 'Hired', val: stats.hired, icon: CheckCircle2, cls: 'green' },
                      { label: 'Team Members', val: stats.team, icon: Users, cls: 'gold' },
                      { label: 'Total Inquiries', val: stats.inqTotal, icon: Package, cls: '' },
                      { label: 'Pending Inquiries', val: stats.inqPending, icon: AlertCircle, cls: 'orange' },
                      { label: 'Replied Inquiries', val: stats.inqReplied, icon: Send, cls: 'green' },
                      { label: 'Pending Work', val: stats.workPending, icon: ClipboardList, cls: 'blue' },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className={`adm-stat-card ${s.cls}`}>
                          <div className="adm-stat-icon"><Icon size={20} /></div>
                          <div>
                            <span className="adm-stat-label">{s.label}</span>
                            <span className="adm-stat-val">{s.val}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Activity Panels */}
                  <div className="adm-dash-quick-grid">
                    <div className="adm-quick-panel glass-panel">
                      <h3 className="adm-panel-title"><Clock size={15} /> Recent Applications</h3>
                      {applications.slice(0, 4).map(a => (
                        <div key={a.id} className="adm-quick-row">
                          <div className="adm-quick-avatar">{a.name.charAt(0)}</div>
                          <div className="adm-quick-info">
                            <span className="adm-quick-name">{a.name}</span>
                            <span className="adm-quick-sub">{POSITION_TITLES[a.position] || a.position}</span>
                          </div>
                          <span className={`adm-status-pill ${a.status.toLowerCase()}`}>{a.status}</span>
                        </div>
                      ))}
                      {applications.length === 0 && <p className="adm-empty-msg">No applications yet.</p>}
                    </div>

                    <div className="adm-quick-panel glass-panel">
                      <h3 className="adm-panel-title"><Package size={15} /> Recent Inquiries</h3>
                      {inquiries.slice(0, 4).map(i => (
                        <div key={i.id} className="adm-quick-row">
                          <div className="adm-quick-avatar">{(i.companyName || i.contactName || 'U').charAt(0)}</div>
                          <div className="adm-quick-info">
                            <span className="adm-quick-name">{i.companyName || i.contactName}</span>
                            <span className="adm-quick-sub">{i.productId}</span>
                          </div>
                          <span className={`adm-status-pill ${i.status}`}>{i.status}</span>
                        </div>
                      ))}
                      {inquiries.length === 0 && <p className="adm-empty-msg">No inquiries yet.</p>}
                    </div>

                    <div className="adm-quick-panel glass-panel">
                      <h3 className="adm-panel-title"><ClipboardList size={15} /> Work Assignments</h3>
                      {workAssignments.slice(0, 4).map(w => (
                        <div key={w.id} className="adm-quick-row">
                          <div className={`adm-priority-dot ${w.priority.toLowerCase()}`} />
                          <div className="adm-quick-info">
                            <span className="adm-quick-name">{w.title}</span>
                            <span className="adm-quick-sub">{w.assignedToName} · Due: {w.dueDate || 'Open'}</span>
                          </div>
                          <span className={`adm-status-pill ${w.completionStatus.toLowerCase()}`}>{w.completionStatus}</span>
                        </div>
                      ))}
                      {workAssignments.length === 0 && <p className="adm-empty-msg">No assignments created yet.</p>}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="adm-staff-welcome glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px' }}>
                    <h2 style={{ marginBottom: '0.5rem', color: '#f0f4f8' }}>Welcome back, {userName}!</h2>
                    <p style={{ color: '#94a3b8', margin: 0 }}>You are logged in as a team member. Here is your dashboard where you can track your assigned work and tasks.</p>
                  </div>

                  {/* Stats for staff */}
                  <div className="adm-stats-grid">
                    {[
                      { label: 'My Total Tasks', val: filteredAssignments.length, icon: ClipboardList, cls: '' },
                      { label: 'Pending Tasks', val: filteredAssignments.filter(w => w.completionStatus !== 'Completed').length, icon: Clock, cls: 'orange' },
                      { label: 'Completed Tasks', val: filteredAssignments.filter(w => w.completionStatus === 'Completed').length, icon: CheckCircle2, cls: 'green' }
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className={`adm-stat-card ${s.cls}`}>
                          <div className="adm-stat-icon"><Icon size={20} /></div>
                          <div>
                            <span className="adm-stat-label">{s.label}</span>
                            <span className="adm-stat-val">{s.val}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick view of staff tasks */}
                  <div className="adm-dash-quick-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="adm-quick-panel glass-panel">
                      <h3 className="adm-panel-title"><ClipboardList size={15} /> Your Recent Tasks</h3>
                      {filteredAssignments.slice(0, 8).map(w => (
                        <div key={w.id} className="adm-quick-row">
                          <div className={`adm-priority-dot ${w.priority.toLowerCase()}`} />
                          <div className="adm-quick-info">
                            <span className="adm-quick-name">{w.title}</span>
                            <span className="adm-quick-sub">Priority: {w.priority} · Due: {w.dueDate || 'Open'}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className={`adm-status-pill ${w.completionStatus.toLowerCase()}`}>{w.completionStatus}</span>
                            {w.completionStatus !== 'Completed' && (
                              <button className="adm-btn green sm" onClick={() => updateWorkStatus(w.id, 'Completed')}>Mark Done</button>
                            )}
                          </div>
                        </div>
                      ))}
                      {filteredAssignments.length === 0 && <p className="adm-empty-msg">No tasks assigned to you.</p>}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══════════════════════════════════
              MODULE: INQUIRIES
          ══════════════════════════════════ */}
          {activeModule === 'inquiries' && (
            <div className="adm-module">
              <div className="adm-table-card">
                <div className="adm-table-controls">
                  <div className="adm-search-wrap">
                    <Search size={15} />
                    <input type="text" placeholder="Search company or contact..." value={inqSearch} onChange={e => setInqSearch(e.target.value)} />
                  </div>
                  <select value={inqStatusFilter} onChange={e => setInqStatusFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="adm-scroll-table">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Company / Contact</th>
                        <th>Product Interest</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInq.length > 0 ? filteredInq.map(inq => (
                        <tr key={inq.id}>
                          <td>
                            <div className="adm-cell-stack">
                              <strong>{inq.companyName || '—'}</strong>
                              <span><Mail size={11} /> {inq.email || '—'}</span>
                              <span><Phone size={11} /> {inq.phone || '—'}</span>
                            </div>
                          </td>
                          <td><span className="adm-pos-chip">{inq.productId || '—'}</span></td>
                          <td>
                            <p className="adm-msg-clip" title={inq.message}>{inq.message}</p>
                          </td>
                          <td className="adm-date-cell">{inq.timestamp ? new Date(inq.timestamp).toLocaleDateString('en-IN') : '—'}</td>
                          <td><span className={`adm-status-pill ${inq.status}`}>{inq.status}</span></td>
                          <td>
                            <div className="adm-action-row">
                              {inq.status !== 'replied' && (
                                <button className="adm-btn green" onClick={() => updateInqStatus(inq.id, 'replied')}>Replied</button>
                              )}
                              {inq.status !== 'closed' && (
                                <button className="adm-btn gray" onClick={() => updateInqStatus(inq.id, 'closed')}>Close</button>
                              )}
                              <button className="adm-btn red-icon" onClick={() => deleteInquiry(inq.id)}><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="6" className="adm-empty-cell">No inquiries match the current filters.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════
              MODULE: JOB APPLICATIONS
          ══════════════════════════════════ */}
          {activeModule === 'applications' && (
            <div className="adm-module">
              <div className="adm-table-card">
                <div className="adm-table-controls">
                  <div className="adm-search-wrap">
                    <Search size={15} />
                    <input type="text" placeholder="Search by name or email..." value={appSearch} onChange={e => setAppSearch(e.target.value)} />
                  </div>
                  <select value={appStatusFilter} onChange={e => setAppStatusFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="adm-scroll-table">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Position Applied</th>
                        <th>Experience</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.length > 0 ? filteredApps.map(app => (
                        <tr key={app.id}>
                          <td>
                            <div className="adm-cell-stack">
                              <strong>{app.name}</strong>
                              <span><Mail size={11} /> {app.email}</span>
                              <span><Phone size={11} /> {app.mobile}</span>
                            </div>
                          </td>
                          <td>
                            <span className="adm-pos-chip">{POSITION_TITLES[app.position] || app.position}</span>
                            {app.message && <p className="adm-msg-clip" title={app.message}>{app.message}</p>}
                          </td>
                          <td><strong>{app.experience}</strong> yrs</td>
                          <td className="adm-date-cell">{app.date}</td>
                          <td><span className={`adm-status-pill ${app.status.toLowerCase()}`}>{app.status}</span></td>
                          <td>
                            <div className="adm-action-row">
                              <a href={app.cvLink} target="_blank" rel="noopener noreferrer" className="adm-btn gray">CV</a>
                              {app.status !== 'Hired' && app.status !== 'Rejected' && (
                                <>
                                  <button className="adm-btn blue" onClick={() => updateAppStatus(app.id, 'Shortlisted')}>Shortlist</button>
                                  <button className="adm-btn red" onClick={() => updateAppStatus(app.id, 'Rejected')}>Reject</button>
                                </>
                              )}
                              {app.status !== 'Hired' && (
                                <button className="adm-btn green" onClick={() => addToTeam(app)}>Hire</button>
                              )}
                              {app.addedToTeam && <span className="adm-team-tag">In Team</span>}
                              <button className="adm-btn red-icon" onClick={() => deleteApp(app.id)}><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="6" className="adm-empty-cell">No applications match the current filters.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════
              MODULE: TEAM REGISTRY
          ══════════════════════════════════ */}
          {activeModule === 'team' && (
            <div className="adm-module">
              <div className="adm-info-banner">
                <Key size={15} />
                Staff credentials are auto-provisioned upon hiring. <strong>Email Address</strong> is used as login username. <strong>Mobile Number</strong> is used as the initial login password.
              </div>
              <div className="adm-table-card">
                <div className="adm-scroll-table">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Staff Name</th>
                        <th>Designation</th>
                        <th>Hired On</th>
                        <th>Login Username (Email)</th>
                        <th>Auto Password (Mobile)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.length > 0 ? teamMembers.map(member => (
                        <tr key={member.id}>
                          <td><strong>{member.name}</strong></td>
                          <td><span className="adm-pos-chip">{POSITION_TITLES[member.position] || member.position}</span></td>
                          <td className="adm-date-cell">{member.hiredDate}</td>
                          <td><code className="adm-cred-code">{member.email}</code></td>
                          <td><code className="adm-cred-code">{member.mobile}</code></td>
                          <td>
                            <button className="adm-btn red-icon" onClick={() => removeMember(member.id, member.email)}>
                              <Trash2 size={13} /> Revoke
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="6" className="adm-empty-cell">No team members registered. Hire a candidate and add them to the team.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════
              MODULE: ASSIGN WORK
          ══════════════════════════════════ */}
          {activeModule === 'assign' && (
            <div className="adm-module">
              <div className="adm-assign-layout" style={userRole === 'staff' ? { gridTemplateColumns: '1fr' } : {}}>

                {/* Left: Assignment Form */}
                {userRole === 'admin' && (
                  <div className="adm-assign-form-card glass-panel">
                    <h2 className="adm-assign-form-title">Create Work Assignment</h2>
                    <p className="adm-assign-form-desc">Assign a task to all team members, a specific employee, or multiple staff at once.</p>

                    {assignSuccess && (
                      <div className="adm-assign-success">
                        <CheckCircle2 size={16} /> Work assignment created and dispatched successfully.
                      </div>
                    )}

                    <form onSubmit={handleAssignWork} className="adm-assign-form">
                      <div className="adm-field">
                        <label>Task Title <span className="req">*</span></label>
                        <input
                          type="text"
                          placeholder="e.g. Weekly machine inspection report"
                          value={assignForm.title}
                          onChange={e => setAssignForm(p => ({ ...p, title: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="adm-field">
                        <label>Task Description</label>
                        <textarea
                          rows="4"
                          placeholder="Describe the work to be completed, deliverables, and any specific instructions..."
                          value={assignForm.description}
                          onChange={e => setAssignForm(p => ({ ...p, description: e.target.value }))}
                        />
                      </div>

                      <div className="adm-field-row">
                        <div className="adm-field">
                          <label>Priority Level</label>
                          <select value={assignForm.priority} onChange={e => setAssignForm(p => ({ ...p, priority: e.target.value }))}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                        <div className="adm-field">
                          <label>Due Date</label>
                          <input type="date" value={assignForm.dueDate} onChange={e => setAssignForm(p => ({ ...p, dueDate: e.target.value }))} />
                        </div>
                      </div>

                      <div className="adm-field">
                        <label>Assign To</label>
                        <div className="adm-assign-radio-group">
                          {[
                            { val: 'all', label: 'All Team Members' },
                            { val: 'member', label: 'Specific Member' },
                          ].map(opt => (
                            <label key={opt.val} className={`adm-radio-option ${assignForm.assignTo === opt.val ? 'selected' : ''}`}>
                              <input type="radio" name="assignTo" value={opt.val} checked={assignForm.assignTo === opt.val} onChange={e => setAssignForm(p => ({ ...p, assignTo: e.target.value }))} />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      {assignForm.assignTo === 'member' && (
                        <div className="adm-field">
                          <label>Select Team Member <span className="req">*</span></label>
                          {teamMembers.length > 0 ? (
                            <select value={assignForm.memberId} onChange={e => setAssignForm(p => ({ ...p, memberId: e.target.value }))} required>
                              <option value="">-- Select Member --</option>
                              {teamMembers.map(m => (
                                <option key={m.id} value={m.id}>{m.name} — {POSITION_TITLES[m.position] || m.position}</option>
                              ))}
                            </select>
                          ) : (
                            <p className="adm-no-team-notice">No team members found. Add team members first via Job Applications.</p>
                          )}
                        </div>
                      )}

                      <button type="submit" className="btn btn-primary adm-assign-submit">
                        <Send size={15} />
                        Assign Task
                      </button>
                    </form>
                  </div>
                )}

                {/* Right: Assignment Log */}
                <div className="adm-assign-log-col">
                  <h2 className="adm-assign-log-title">{userRole === 'admin' ? 'Assignment Log' : 'My Tasks'}</h2>
                  {filteredAssignments.length > 0 ? filteredAssignments.map(w => (
                    <div key={w.id} className={`adm-work-card glass-panel priority-${w.priority.toLowerCase()}`}>
                      <div className="adm-work-card-header">
                        <div>
                          <span className={`adm-priority-badge ${w.priority.toLowerCase()}`}>{w.priority}</span>
                          <h3 className="adm-work-title">{w.title}</h3>
                          <span className="adm-work-assignee">Assigned to: {w.assignedToName}</span>
                        </div>
                        {userRole === 'admin' && (
                          <button className="adm-btn red-icon" onClick={() => deleteWork(w.id)}><Trash2 size={13} /></button>
                        )}
                      </div>
                      {w.description && <p className="adm-work-desc">{w.description}</p>}
                      <div className="adm-work-footer">
                        <div className="adm-work-meta">
                          <span>Created: {w.assignedDate}</span>
                          {w.dueDate && <span>Due: {w.dueDate}</span>}
                        </div>
                        <div className="adm-work-status-row">
                          <span className={`adm-status-pill ${w.completionStatus.toLowerCase()}`}>{w.completionStatus}</span>
                          {w.completionStatus !== 'Completed' && (
                            <button className="adm-btn green sm" onClick={() => updateWorkStatus(w.id, 'Completed')}>Mark Done</button>
                          )}
                          {w.completionStatus === 'Completed' && userRole === 'admin' && (
                            <button className="adm-btn gray sm" onClick={() => updateWorkStatus(w.id, 'Pending')}>Reopen</button>
                          )}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="adm-empty-assign">
                      <ClipboardList size={36} />
                      <p>{userRole === 'admin' ? 'No work assignments created yet. Use the form to assign tasks to your team.' : 'No tasks assigned to you.'}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPage;
