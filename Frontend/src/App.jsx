import React, { useState, useEffect } from 'react';
import { INITIAL_PATIENTS, INITIAL_APPOINTMENTS } from './data/mockData';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import PatientEHR from './components/PatientEHR';
import TreatmentPlanner from './components/TreatmentPlanner';
import RegisterPatientModal from './components/RegisterPatientModal';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import AppointmentsPage from './components/AppointmentsPage';
import TreatmentsPage from './components/TreatmentsPage';
import DoctorsStaffPage from './components/DoctorsStaffPage';
import BillingPaymentsPage from './components/BillingPaymentsPage';
import { LayoutDashboard, Calendar, Users, CalendarDays, Stethoscope, Stethoscope as Staff, CreditCard, Settings, Moon, Sun } from 'lucide-react';

const API_BASE = 'http://localhost:5112/api';

export default function App() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [staff, setStaff] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activePatientId, setActivePatientId] = useState('P-101');
  const [currentView, setCurrentView] = useState('dashboard');
  const [themeMode, setThemeMode] = useState('dark');
  const [userRole, setUserRole] = useState('receptionist'); // receptionist vs doctor
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [whatsappNotification, setWhatsappNotification] = useState(null);

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${API_BASE}/patients`);
      if (res.ok) {
        const data = await res.json();
        setPatients(data);
      } else {
        setPatients(INITIAL_PATIENTS);
      }
    } catch (e) {
      console.error("Failed to fetch patients, using mock data fallback:", e);
      setPatients(INITIAL_PATIENTS);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_BASE}/appointments`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        setAppointments(INITIAL_APPOINTMENTS);
      }
    } catch (e) {
      console.error("Failed to fetch appointments, using mock data fallback:", e);
      setAppointments(INITIAL_APPOINTMENTS);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics', err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await fetch(`${API_BASE}/staff`);
      if (res.ok) {
        const data = await res.json();
        setStaff(data);
      }
    } catch (err) {
      console.error('Failed to fetch staff', err);
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API_BASE}/invoices`);
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (err) {
      console.error('Failed to fetch invoices', err);
    }
  };

  const fetchTreatments = async () => {
    try {
      const res = await fetch(`${API_BASE}/treatments/categories`);
      if (res.ok) {
        const data = await res.json();
        setTreatments(data);
      }
    } catch (err) {
      console.error('Failed to fetch treatments', err);
    }
  };

  const fetchFollowUps = async () => {
    try {
      const res = await fetch(`${API_BASE}/followups`);
      if (res.ok) {
        const data = await res.json();
        setFollowUps(data);
      }
    } catch (err) {
      console.error('Failed to fetch followUps', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_BASE}/transactions`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchPatients(), 
      fetchAppointments(), 
      fetchAnalytics(),
      fetchStaff(),
      fetchInvoices(),
      fetchTreatments(),
      fetchFollowUps(),
      fetchTransactions()
    ]);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Sync theme mode with body class
  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [themeMode]);

  // EHR: Update patient dental chart
  const handleUpdateChart = async (patientId, newChart) => {
    try {
      const res = await fetch(`${API_BASE}/patients/${patientId}/chart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChart)
      });
      if (res.ok) {
        fetchPatients();
        fetchAnalytics();
      } else {
        setPatients(prevPatients =>
          prevPatients.map(p => (p.id === patientId ? { ...p, chart: newChart } : p))
        );
      }
    } catch (e) {
      console.error(e);
      setPatients(prevPatients =>
        prevPatients.map(p => (p.id === patientId ? { ...p, chart: newChart } : p))
      );
    }
  };

  // EHR: Append clinical notes
  const handleAddVisitNote = async (patientId, noteText) => {
    try {
      const res = await fetch(`${API_BASE}/patients/${patientId}/visits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText })
      });
      if (res.ok) {
        fetchPatients();
      } else {
        const newNote = {
          date: new Date().toISOString().split('T')[0],
          notes: noteText
        };
        setPatients(prevPatients =>
          prevPatients.map(p =>
            p.id === patientId ? { ...p, visits: [newNote, ...(p.visits || [])] } : p
          )
        );
      }
    } catch (e) {
      console.error(e);
      const newNote = {
        date: new Date().toISOString().split('T')[0],
        notes: noteText
      };
      setPatients(prevPatients =>
        prevPatients.map(p =>
          p.id === patientId ? { ...p, visits: [newNote, ...(p.visits || [])] } : p
        )
      );
    }
  };

  // Planner: Update patient treatment plan
  const handleUpdatePatient = async (patientId, updatedPatient) => {
    try {
      const res = await fetch(`${API_BASE}/patients/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPatient)
      });
      if (res.ok) {
        fetchPatients();
        fetchAnalytics();
      } else {
        setPatients(prevPatients =>
          prevPatients.map(p => (p.id === patientId ? updatedPatient : p))
        );
      }
    } catch (e) {
      console.error(e);
      setPatients(prevPatients =>
        prevPatients.map(p => (p.id === patientId ? updatedPatient : p))
      );
    }
  };

  // Register Patient
  const handleRegisterPatient = async (newPatientData) => {
    try {
      const res = await fetch(`${API_BASE}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatientData)
      });
      if (res.ok) {
        const created = await res.json();
        setActivePatientId(created.id);
        fetchPatients();
        fetchAnalytics();
      } else {
        const nextIdNum = Math.max(...patients.map(p => parseInt(p.id.replace('P-', '')))) + 1;
        const newPatient = {
          id: `P-${nextIdNum}`,
          ...newPatientData,
          chart: {},
          xrays: [],
          visits: []
        };
        setPatients(prev => [...prev, newPatient]);
        setActivePatientId(newPatient.id);
      }
    } catch (e) {
      console.error(e);
      const nextIdNum = Math.max(...patients.map(p => parseInt(p.id.replace('P-', '')))) + 1;
      const newPatient = {
        id: `P-${nextIdNum}`,
        ...newPatientData,
        chart: {},
        xrays: [],
        visits: []
      };
      setPatients(prev => [...prev, newPatient]);
      setActivePatientId(newPatient.id);
    }
  };

  // Check In Patient
  const handleCheckInPatient = async (patientId, room = 'Operatory A', dentist = 'Dr. Sarah Carter', type = 'Walk-In Consultation') => {
    const today = new Date().toISOString().split('T')[0];
    const existingIdx = appointments.findIndex(apt => apt.patientId === patientId && apt.date === today);
    if (existingIdx !== -1) {
      const existingApt = appointments[existingIdx];
      const updated = { ...existingApt, status: 'checked-in' };
      try {
        const res = await fetch(`${API_BASE}/appointments/${existingApt.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
        if (res.ok) {
          fetchAppointments();
          fetchAnalytics();
        } else {
          setAppointments(prev => prev.map((apt, idx) => idx === existingIdx ? updated : apt));
        }
      } catch (e) {
        console.error(e);
        setAppointments(prev => prev.map((apt, idx) => idx === existingIdx ? updated : apt));
      }
    } else {
      const patientObj = patients.find(p => p.id === patientId);
      const newApt = {
        id: 'apt-' + Date.now(),
        patientId,
        patientName: patientObj ? patientObj.name : 'Unknown Patient',
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        duration: 30,
        room,
        dentist,
        type,
        status: 'checked-in',
        date: today
      };
      try {
        const res = await fetch(`${API_BASE}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newApt)
        });
        if (res.ok) {
          fetchAppointments();
          fetchAnalytics();
        } else {
          setAppointments(prev => [...prev, newApt]);
        }
      } catch (e) {
        console.error(e);
        setAppointments(prev => [...prev, newApt]);
      }
    }
  };

  // Scheduler: Add appointment
  const handleAddAppointment = async (newApt) => {
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApt)
      });
      if (res.ok) {
        fetchAppointments();
        fetchAnalytics();
      } else {
        setAppointments(prev => [...prev, newApt]);
      }
    } catch (e) {
      console.error(e);
      setAppointments(prev => [...prev, newApt]);
    }
  };

  // Scheduler: Update appointment status/details
  const handleUpdateAppointment = async (aptId, updatedApt) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${aptId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedApt)
      });
      if (res.ok) {
        fetchAppointments();
        fetchAnalytics();
      } else {
        setAppointments(prev => prev.map(apt => (apt.id === aptId ? updatedApt : apt)));
      }
    } catch (e) {
      console.error(e);
      setAppointments(prev => prev.map(apt => (apt.id === aptId ? updatedApt : apt)));
    }
  };

  // Scheduler: Delete/Cancel appointment
  const handleDeleteAppointment = async (aptId) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${aptId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchAppointments();
        fetchAnalytics();
      } else {
        setAppointments(prev => prev.filter(apt => apt.id !== aptId));
      }
    } catch (e) {
      console.error(e);
      setAppointments(prev => prev.filter(apt => apt.id !== aptId));
    }
  };

  // Sidebar link details matching Figma Mockup
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'scheduler', label: 'Scheduler', icon: <Calendar size={18} /> },
    { id: 'patients', label: 'Patient EHR', icon: <Users size={18} /> },
    { id: 'appointments', label: 'Appointments', icon: <CalendarDays size={18} /> },
    { id: 'treatments', label: 'Treatments', icon: <Stethoscope size={18} /> },
    { id: 'doctors', label: 'Doctors & Staff', icon: <Staff size={18} /> },
    { id: 'billing', label: 'Billing & Payments', icon: <CreditCard size={18} /> }
  ];

  // Dynamic Header Titles
  const getHeaderDetails = () => {
    switch (currentView) {
      case 'dashboard':
        return { title: 'Clinic Analytics Dashboard', desc: 'Real-time overview of chair statistics, revenue flows, and daily logs.' };
      case 'scheduler':
        return { title: 'Operatory Booking grid', desc: 'Operatory-split scheduling and patient appointment status tracking.' };
      case 'patients':
        return { title: 'Electronic Health Records (EHR)', desc: 'Comprehensive patient directory, medical alerts, live charting, and radiology.' };
      case 'planner':
        return { title: 'Treatment Planner & Claims Ledger', desc: 'Manage diagnostic estimates, build invoices, and simulate insurance clearinghouses.' };
      default:
        return { title: 'Dental Management System', desc: 'Enterprise Practice Management Console.' };
    }
  };

  const header = getHeaderDetails();

  return (
    <div className="app-container">
      
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="logo-container-mobile">
          <div className="logo-icon" style={{ backgroundColor: 'var(--primary-teal)', borderColor: 'transparent' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-4 0-5 3-5 5v5c0 4-2 6-4 6 2 2 4 4 9 4s7-2 9-4c-2 0-4-2-4-6V7c0-2-1-5-5-5z"/></svg>
          </div>
          <div className="logo-text" style={{ color: 'var(--text-primary)' }}>AuraDental</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="mobile-header-btn" onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
            {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="mobile-avatar">ES</div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-4 0-5 3-5 5v5c0 4-2 6-4 6 2 2 4 4 9 4s7-2 9-4c-2 0-4-2-4-6V7c0-2-1-5-5-5z"/></svg>
          </div>
          <div className="logo-text">AuraDental</div>
        </div>

        <nav className="nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" style={{ marginBottom: '4px' }}>
            <span className="nav-icon"><Settings size={18} /></span>
            <span>Settings</span>
          </button>
          <button className="nav-item" style={{ marginBottom: '16px' }} onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
            <span className="nav-icon">{themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</span>
            <span>{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-card)', fontWeight: '500', fontSize: '14px' }}>
              ES
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--bg-card)' }}>Emily Stone</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Receptionist</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">

        {/* Tab Routing */}
        <div style={{ flexGrow: 1 }}>
          {currentView === 'dashboard' && (
            <Dashboard 
              userRole={userRole}
              patients={patients}
              appointments={appointments}
              onCheckInPatient={handleCheckInPatient}
              onRegisterPatient={() => setShowRegisterModal(true)}
              onViewScheduler={() => setCurrentView('scheduler')}
              onViewPatient={(patientId) => {
                if (patientId) setActivePatientId(patientId);
                setCurrentView('patients');
              }}
              onUpdateAppointment={handleUpdateAppointment}
              analytics={analytics}
            />
          )}

          {currentView === 'scheduler' && (
            <Scheduler 
              userRole={userRole}
              appointments={appointments}
              patients={patients}
              onAddAppointment={handleAddAppointment}
              onUpdateAppointment={handleUpdateAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}

          {currentView === 'patients' && (
            <PatientEHR 
              userRole={userRole}
              patients={patients}
              activePatientId={activePatientId}
              onSelectPatient={setActivePatientId}
              onChangeChart={handleUpdateChart}
              onAddVisitNote={handleAddVisitNote}
              onCheckInPatient={handleCheckInPatient}
              onUpdatePatient={handleUpdatePatient}
            />
          )}

          {currentView === 'appointments' && (
            <AppointmentsPage 
              appointments={appointments}
              patients={patients}
              followUps={followUps}
            />
          )}

          {currentView === 'treatments' && (
            <TreatmentsPage 
              patients={patients}
              treatmentCategories={treatments}
              analytics={analytics}
            />
          )}

          {currentView === 'doctors' && (
            <DoctorsStaffPage 
              staffList={staff}
            />
          )}

          {currentView === 'billing' && (
            <BillingPaymentsPage 
              invoices={invoices}
              transactions={transactions}
              analytics={analytics}
            />
          )}

          {currentView === 'planner' && (
            <TreatmentPlanner 
              userRole={userRole}
              patients={patients}
              appointments={appointments}
              activePatientId={activePatientId}
              onUpdatePatient={handleUpdatePatient}
              onSelectPatient={setActivePatientId}
              onAddAppointment={handleAddAppointment}
              onSendWhatsApp={(notif) => setWhatsappNotification(notif)}
            />
          )}
        </div>
      </main>

      {/* Global Modals & Simulators */}
      <RegisterPatientModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
        onRegister={handleRegisterPatient}
      />
      
      <WhatsAppSimulator 
        notification={whatsappNotification} 
        onClose={() => setWhatsappNotification(null)}
      />

    </div>
  );
}
