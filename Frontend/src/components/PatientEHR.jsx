import React, { useState, useEffect } from 'react';
import DentalChart from './DentalChart';
import teethProfileImg from '../assets/teeth_profile.png';

export default function PatientEHR({ 
  userRole, 
  patients, 
  activePatientId, 
  onSelectPatient, 
  onChangeChart, 
  onAddVisitNote, 
  onCheckInPatient, 
  onUpdatePatient 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedXray, setSelectedXray] = useState(null);
  const [newNote, setNewNote] = useState('');

  // Radiograph Workspace states
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [invert, setInvert] = useState(false);

  // Demographics Edit States
  const [isEditingDemographics, setIsEditingDemographics] = useState(false);
  const [editAge, setEditAge] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editInsProvider, setEditInsProvider] = useState('');
  const [editInsPolicy, setEditInsPolicy] = useState('');
  const [editInsCoverage, setEditInsCoverage] = useState('80');
  const [editInsDeductible, setEditInsDeductible] = useState(false);
  const [editAlerts, setEditAlerts] = useState('');

  // Filter patients
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];

  useEffect(() => {
    if (activePatient) {
      setEditAge(activePatient.age || '');
      setEditPhone(activePatient.phone || '');
      setEditEmail(activePatient.email || '');
      setEditAddress(activePatient.address || '');
      setEditInsProvider(activePatient.insurance?.provider || '');
      setEditInsPolicy(activePatient.insurance?.policyNumber || '');
      setEditInsCoverage(activePatient.insurance?.coveragePercent || '80');
      setEditInsDeductible(activePatient.insurance?.deductibleMet || false);
      setEditAlerts(activePatient.medicalAlerts?.join(', ') || '');
      setIsEditingDemographics(false);
    }
  }, [activePatientId]);

  const handleSaveDemographics = (e) => {
    e.preventDefault();
    if (!onUpdatePatient) return;
    const updatedPatient = {
      ...activePatient,
      age: parseInt(editAge) || activePatient.age,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      insurance: {
        provider: editInsProvider,
        policyNumber: editInsPolicy,
        coveragePercent: parseInt(editInsCoverage) || 0,
        deductibleMet: editInsDeductible
      },
      medicalAlerts: editAlerts
        ? editAlerts.split(',').map(a => a.trim()).filter(Boolean)
        : []
    };
    onUpdatePatient(activePatient.id, updatedPatient);
    setIsEditingDemographics(false);
  };

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddVisitNote(activePatient.id, newNote);
    setNewNote('');
  };

  const handleSelectXray = (xr) => {
    setSelectedXray(xr);
    // Reset filters for new image
    setBrightness(100);
    setContrast(100);
    setInvert(false);
  };

  // Custom SVG drawings to simulate realistic X-rays
  const renderSimulatedXraySVG = (type) => {
    // We construct a dental radiograph representation in vector format
    return (
      <svg 
        viewBox="0 0 400 300" 
        width="100%" 
        height="100%" 
        style={{
          background: '#090c15',
          filter: `brightness(${brightness}%) contrast(${contrast}%) ${invert ? 'invert(1)' : ''}`,
          transition: 'filter 0.05s ease'
        }}
      >
        {/* Soft bone structures background */}
        <path d="M 0,220 Q 100,190 200,210 T 400,180 L 400,300 L 0,300 Z" fill="#2d3748" opacity="0.3" />
        
        {/* Tooth 1 */}
        <g transform="translate(60, 40)">
          {/* Enamel/Crown */}
          <path d="M 20,80 C 20,40 30,30 50,32 C 65,34 75,30 80,45 C 85,70 80,85 50,85 C 20,85 20,70 20,80 Z" fill="#e2e8f0" opacity="0.85" stroke="#cbd5e1" strokeWidth="2" />
          {/* Dentin */}
          <path d="M 28,75 C 28,48 35,42 50,43 C 60,44 68,42 72,52 C 76,70 70,80 50,80 C 30,80 28,68 28,75 Z" fill="#718096" opacity="0.6" />
          {/* Roots */}
          <path d="M 28,82 C 32,95 24,130 35,160 C 42,160 48,110 55,90" fill="#cbd5e1" opacity="0.8" />
          <path d="M 72,82 C 68,95 76,130 65,160 C 58,160 52,110 45,90" fill="#cbd5e1" opacity="0.8" />
          {/* Pulp lines (dark inside) */}
          <path d="M 50,55 L 50,82 M 38,82 L 35,130 M 62,82 L 65,130" stroke="#1a202c" strokeWidth="3" strokeLinecap="round" opacity="0.9" fill="none" />
          {type === 'bitewing' && (
            // Add a simulated cavity lesion (dark spot)
            <circle cx="24" cy="55" r="7" fill="#111" opacity="0.8" />
          )}
        </g>

        {/* Tooth 2 */}
        <g transform="translate(150, 42)">
          {/* Enamel/Crown */}
          <path d="M 20,80 C 20,40 30,30 50,32 C 65,34 75,30 80,45 C 85,70 80,85 50,85 C 20,85 20,70 20,80 Z" fill="#e2e8f0" opacity="0.85" stroke="#cbd5e1" strokeWidth="2" />
          {/* Dentin */}
          <path d="M 28,75 C 28,48 35,42 50,43 C 60,44 68,42 72,52 C 76,70 70,80 50,80 C 30,80 28,68 28,75 Z" fill="#718096" opacity="0.6" />
          {/* Roots */}
          <path d="M 28,82 C 32,95 24,135 35,165 C 42,165 48,110 55,90" fill="#cbd5e1" opacity="0.8" />
          <path d="M 72,82 C 68,95 76,135 65,165 C 58,165 52,110 45,90" fill="#cbd5e1" opacity="0.8" />
          {/* Pulp - Filled with bright gutta percha (RCT) */}
          <path d="M 50,55 L 50,82 M 38,82 L 35,135 M 62,82 L 65,135" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>

        {/* Tooth 3 */}
        <g transform="translate(240, 40)">
          {/* Enamel/Crown - porcelain crown shape (extra white/opaque) */}
          <path d="M 20,80 C 20,40 30,30 50,32 C 65,34 75,30 80,45 C 85,70 80,85 50,85 C 20,85 20,70 20,80 Z" fill="#ffffff" opacity="0.95" stroke="#ffffff" strokeWidth="3" />
          {/* Roots */}
          <path d="M 28,82 C 32,95 24,130 35,160 C 42,160 48,110 55,90" fill="#cbd5e1" opacity="0.8" />
          <path d="M 72,82 C 68,95 76,130 65,160 C 58,160 52,110 45,90" fill="#cbd5e1" opacity="0.8" />
          {/* Pulp */}
          <path d="M 50,55 L 50,82 M 38,82 L 35,130 M 62,82 L 65,130" stroke="#1a202c" strokeWidth="3" strokeLinecap="round" opacity="0.9" fill="none" />
        </g>
        
        {/* Metal implant screw in bone if panoramic */}
        {type === 'panoramic' && (
          <g transform="translate(30, 160)">
            <rect x="15" y="10" width="12" height="35" rx="3" fill="#ffffff" />
            <line x1="12" y1="18" x2="30" y2="18" stroke="#cbd5e1" strokeWidth="3" />
            <line x1="12" y1="26" x2="30" y2="26" stroke="#cbd5e1" strokeWidth="3" />
            <line x1="12" y1="34" x2="30" y2="34" stroke="#cbd5e1" strokeWidth="3" />
            {/* Crown on top */}
            <path d="M 5,10 C 5,-15 12,-20 21,-20 C 30,-20 37,-15 37,10 Z" fill="#ffffff" opacity="0.95" />
          </g>
        )}

        {/* X-Ray scale label overlay */}
        <text x="15" y="280" fill="#cbd5e1" fontSize="10" fontFamily="monospace">60kVp 10mA FSD:30cm</text>
        <text x="330" y="280" fill="#cbd5e1" fontSize="10" fontFamily="monospace">Galletrix Imaging</text>
      </svg>
    );
  };

  return (
    <div className="ehr-layout">
      
      {/* Patient Directory Sidebar */}
      <div className="patient-list-sidebar">
        <h2>Patient Directory</h2>
        <input 
          type="text" 
          className="form-control patient-search-input"
          placeholder="Search patient name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="patient-list-items">
          {filteredPatients.length > 0 ? (
            filteredPatients.map(p => (
              <div 
                key={p.id}
                className={`patient-list-card ${activePatient.id === p.id ? 'active' : ''}`}
                onClick={() => {
                  onSelectPatient(p.id);
                  setSelectedXray(null);
                }}
              >
                <div className="patient-list-teeth-avatar-container">
                  <img src={teethProfileImg} alt="Teeth Scan" className="patient-list-teeth-avatar" />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div className="patient-list-name">{p.name}</div>
                  <div className="patient-list-meta">
                    <span>ID: {p.id}</span> • <span>{p.gender}, {p.age} yrs</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No patients found.</p>
          )}
        </div>
      </div>

      {/* Main EHR Workspace */}
      {activePatient && (
        <div className="ehr-main-view">
          
          {/* Patient Demographic Card */}
          <div className="card">
            <div className="ehr-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="patient-teeth-avatar-container">
                  <img src={teethProfileImg} alt="Patient Teeth Scan" className="patient-teeth-avatar" />
                </div>
                <div>
                  <h2 style={{ fontSize: '24px' }}>{activePatient.name}</h2>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
                    Patient Identifier: <strong style={{ color: 'var(--primary-teal)' }}>{activePatient.id}</strong>
                  </div>
                </div>
              </div>

              {/* Medical Alerts Badges */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activePatient.medicalAlerts && activePatient.medicalAlerts.length > 0 ? (
                  activePatient.medicalAlerts.map((alert, idx) => (
                    <span key={idx} className="badge badge-danger">
                      ⚠️ ALERT: {alert}
                    </span>
                  ))
                ) : (
                  <span className="badge badge-success">✓ Medical History Cleared</span>
                )}
              </div>
            </div>

            {isEditingDemographics ? (
              <form onSubmit={handleSaveDemographics} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Age</label>
                    <input type="number" className="form-control" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Contact Phone</label>
                    <input type="text" className="form-control" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email</label>
                    <input type="email" className="form-control" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Insurance Provider</label>
                    <input type="text" className="form-control" value={editInsProvider} onChange={(e) => setEditInsProvider(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Policy ID</label>
                    <input type="text" className="form-control" value={editInsPolicy} onChange={(e) => setEditInsPolicy(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Coverage %</label>
                    <input type="number" className="form-control" value={editInsCoverage} onChange={(e) => setEditInsCoverage(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', alignItems: 'center' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Medical Alerts (Comma-separated)</label>
                    <input type="text" className="form-control" value={editAlerts} onChange={(e) => setEditAlerts(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%', paddingTop: '16px' }}>
                    <input type="checkbox" id="editInsDeductible" checked={editInsDeductible} onChange={(e) => setEditInsDeductible(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                    <label htmlFor="editInsDeductible" style={{ fontSize: '13px', cursor: 'pointer', userSelect: 'none' }}>Deductible Met</label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditingDemographics(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Patient Details</button>
                </div>
              </form>
            ) : (
              <>
                {/* Meta Grid */}
                <div className="patient-meta-grid">
                  <div className="meta-field">
                    <label>Age / Gender</label>
                    <p>{activePatient.age} years / {activePatient.gender}</p>
                  </div>
                  <div className="meta-field">
                    <label>Contact Phone</label>
                    <p>{activePatient.phone}</p>
                  </div>
                  <div className="meta-field">
                    <label>Insurance Provider</label>
                    <p>{activePatient.insurance.provider} ({activePatient.insurance.coveragePercent}%)</p>
                  </div>
                  <div className="meta-field">
                    <label>Billing Status</label>
                    <p>{activePatient.insurance.deductibleMet ? 'Deductible Met' : 'Deductible Pending'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {userRole === 'receptionist' && (
                    <>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => setIsEditingDemographics(true)}
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                      >
                        ✏️ Edit Demographics & Insurance
                      </button>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => onCheckInPatient(activePatient.id)}
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                      >
                        ⚡ Check In for Visit
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* EHR Tabs Bar */}
          <div className="ehr-tabs">
            <button 
              className={`ehr-tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
              onClick={() => setActiveTab('chart')}
            >
              Dental Chart & Mapping
            </button>
            <button 
              className={`ehr-tab-btn ${activeTab === 'xrays' ? 'active' : ''}`}
              onClick={() => setActiveTab('xrays')}
            >
              Radiology (X-Rays)
            </button>
            <button 
              className={`ehr-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              Clinical Visit Logs
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="ehr-tab-content">
            
            {/* Charting Tab */}
            {activeTab === 'chart' && (
              <DentalChart 
                patient={activePatient} 
                onChangeChart={onChangeChart}
                userRole={userRole}
              />
            )}

            {/* Radiology Tab */}
            {activeTab === 'xrays' && (
              <div className="xray-viewer-container">
                {!selectedXray ? (
                  <>
                    <h3>Patient Radiographs</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      Select a panoramic, bitewing, or periapical view below to open the Advanced Diagnostic Editor.
                    </p>
                    <div className="xray-grid">
                      {activePatient.xrays && activePatient.xrays.map(xr => (
                        <div key={xr.id} className="xray-card" onClick={() => handleSelectXray(xr)}>
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Render mini static SVG preview */}
                            <svg viewBox="0 0 400 300" width="100%" height="100%" style={{ background: '#0b0f19' }}>
                              <path d="M 0,220 Q 200,180 400,220 L 400,300 L 0,300 Z" fill="#2d3748" opacity="0.4" />
                              <rect x="180" y="80" width="40" height="100" rx="10" fill="#e2e8f0" opacity="0.6" />
                              <rect x="130" y="90" width="40" height="90" rx="10" fill="#cbd5e1" opacity="0.4" />
                              <rect x="230" y="90" width="40" height="90" rx="10" fill="#cbd5e1" opacity="0.4" />
                            </svg>
                          </div>
                          <div className="xray-label">
                            <strong>{xr.label}</strong> ({xr.date})
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  // Advanced Workspace View
                  <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--primary-teal)' }}>
                    <div className="flex-between" style={{ padding: '16px 24px', backgroundColor: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}>
                      <div>
                        <strong style={{ fontSize: '16px' }}>Diagnostic Radiology Studio</strong>
                        <p style={{ fontSize: '11px', color: '#94a3b8' }}>Image ID: {selectedXray.id} | {selectedXray.label}</p>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#fff', border: '1px solid #475569' }} onClick={() => setSelectedXray(null)}>
                        ← Back to Gallery
                      </button>
                    </div>

                    <div className="xray-editor">
                      
                      {/* Radiograph Screen */}
                      <div className="xray-workspace">
                        {renderSimulatedXraySVG(selectedXray.type)}
                      </div>

                      {/* Diagnostic Filters Panel */}
                      <div className="xray-controls">
                        <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px' }}>
                          Diagnostic Filters
                        </h4>
                        
                        <div className="slider-group">
                          <label>
                            <span>Brightness</span>
                            <span>{brightness}%</span>
                          </label>
                          <input 
                            type="range" 
                            className="xray-slider"
                            min="50" 
                            max="180" 
                            value={brightness}
                            onChange={(e) => setBrightness(e.target.value)}
                          />
                        </div>

                        <div className="slider-group">
                          <label>
                            <span>Contrast Enhancer</span>
                            <span>{contrast}%</span>
                          </label>
                          <input 
                            type="range" 
                            className="xray-slider"
                            min="50" 
                            max="200" 
                            value={contrast}
                            onChange={(e) => setContrast(e.target.value)}
                          />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '16px' }}>
                          <div>
                            <strong style={{ fontSize: '13px', display: 'block' }}>Invert Radiograph</strong>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>Positonal diagnostic view</span>
                          </div>
                          <button 
                            className={`btn ${invert ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '8px 16px', fontSize: '12px', color: invert ? '#fff' : '#cbd5e1', border: '1px solid #475569' }}
                            onClick={() => setInvert(!invert)}
                          >
                            {invert ? 'Negative View' : 'Positive View'}
                          </button>
                        </div>

                        <div 
                          style={{ 
                            marginTop: 'auto', 
                            fontSize: '11px', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            backgroundColor: 'rgba(255,255,255,0.03)', 
                            color: '#94a3b8',
                            lineHeight: '1.4' 
                          }}
                        >
                          💡 <strong>Clinical Tip:</strong> Increase the <em>Contrast Enhancer</em> slider to reveal structural fissures in root crowns. Toggle the <em>Negative View</em> to inspect root tip bone lesions.
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="card">
                <h3>Clinical Logs & Visit History</h3>
                
                {/* Add new Visit Note */}
                {userRole === 'doctor' ? (
                  <form onSubmit={handleAddNoteSubmit} className="mt-md" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label>Log New Visit Clinical Note</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="Input clinical findings, treatment completed, prescriptions, or post-op instructions..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Append Clinical Log
                    </button>
                  </form>
                ) : (
                  <div style={{ backgroundColor: 'var(--primary-teal-light)', padding: '16px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px', border: '1px dashed var(--border-color)' }}>
                    🔒 <strong>Clinical Logging Restricted:</strong> Only the Doctor role is authorized to document clinical visit notes.
                  </div>
                )}

                {/* Listing historical notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activePatient.visits && activePatient.visits.length > 0 ? (
                    activePatient.visits.map((visit, idx) => (
                      <div key={idx} style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: '10px', borderLeft: '3px solid var(--primary-teal)' }}>
                        <div className="flex-between">
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                            CLINICAL ENTRY: VISIT #{activePatient.visits.length - idx}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{visit.date}</span>
                        </div>
                        <p style={{ marginTop: '8px', fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                          {visit.notes}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No previous logs documented for this patient.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}