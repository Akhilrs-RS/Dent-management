import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, ChevronRight, UserPlus, Coffee, MonitorPlay } from 'lucide-react';

const TIME_SLOTS = [
  { value: '08:00', label: '08:00 AM' },
  { value: '09:00', label: '09:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM (Lunch)' },
  { value: '13:00', label: '01:00 PM' },
  { value: '14:00', label: '02:00 PM' },
  { value: '15:00', label: '03:00 PM' },
  { value: '16:00', label: '04:00 PM' }
];

const OPERATORIES = [
  { name: 'Operatory A', dentist: 'Dr. Sarah Carter' },
  { name: 'Operatory B', dentist: 'Dr. James Aris' },
  { name: 'Hygiene Room', dentist: 'Hygienist Amy Miller' }
];

export default function Scheduler({ appointments, patients, onAddAppointment, onUpdateAppointment, onDeleteAppointment }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null); // { time, room }
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Form states for new appointment
  const [patientId, setPatientId] = useState('');
  const [time, setTime] = useState('08:00');
  const [room, setRoom] = useState('Operatory A');
  const [type, setType] = useState('Periodic Cleaning');
  const [duration, setDuration] = useState(60);

  const openAddModal = (timeVal, roomVal) => {
    setTime(timeVal);
    setRoom(roomVal);
    if (patients.length > 0) {
      setPatientId(patients[0].id);
    }
    setType('Routine Checkup');
    setDuration(60);
    setShowAddModal(true);
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === patientId);
    if (!patientObj) return;

    const newApt = {
      id: 'apt-' + Date.now(),
      patientId,
      patientName: patientObj.name,
      time,
      duration,
      room,
      dentist: OPERATORIES.find(op => op.name === room)?.dentist || 'Dr. Carter',
      type,
      status: 'scheduled',
      date: '2026-06-19'
    };

    onAddAppointment(newApt);
    setShowAddModal(false);
  };

  const handleUpdateStatus = (statusVal) => {
    if (!selectedAppointment) return;
    onUpdateAppointment(selectedAppointment.id, { ...selectedAppointment, status: statusVal });
    setShowEditModal(false);
  };

  const handleCancelAppointment = () => {
    if (!selectedAppointment) return;
    onDeleteAppointment(selectedAppointment.id);
    setShowEditModal(false);
  };

  // Calculate dynamic stats
  const totalAppointments = appointments.length;
  const checkedInCount = appointments.filter(a => a.status === 'checked-in' || a.status === 'in-chair').length;
  const pendingCount = appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Dynamic Top Header */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Good morning, Emily!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Here's what's happening at AuraDental today.
        </p>
      </div>

      <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Operatory Scheduling Calendar</h2>
      </div>

      {/* 4 Stat Cards */}
      <div className="dashboard-grid">
        <div className="card stat-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-healthy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Today's Appointments</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{totalAppointments}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-healthy)', marginTop: '4px', fontWeight: 500 }}>Today scheduled</div>
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Checked In</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{checkedInCount}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-healthy)', marginTop: '4px', fontWeight: 500 }}>Currently in clinic</div>
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-decay)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Pending</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{pendingCount}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-healthy)', marginTop: '4px', fontWeight: 500 }}>Awaiting check-in</div>
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-crown)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Completed</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{completedCount}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-healthy)', marginTop: '4px', fontWeight: 500 }}>Appointments done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Schedule */}
      <div className="scheduler-grid-wrapper mt-md">
        <div className="scheduler-grid">
          
          {/* Row Header */}
          <div className="scheduler-time-col-header"></div>
          {OPERATORIES.map((op, idx) => (
            <div key={idx} className="scheduler-header-cell" style={{ backgroundColor: 'var(--bg-app)', padding: '20px 14px' }}>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>{op.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 400, marginTop: '4px' }}>
                {op.dentist}
              </div>
            </div>
          ))}

          {/* Hour Slots */}
          {TIME_SLOTS.map((slot, sIdx) => (
            <div key={sIdx} className="scheduler-row">
              
              {/* Time label */}
              <div className="scheduler-time-cell">
                {slot.label}
              </div>

              {/* Operatorries columns */}
              {OPERATORIES.map((op, oIdx) => {
                // Find matching appointment that falls in this hour slot
                const cellApt = appointments.find(
                  apt => apt.room === op.name && apt.time.startsWith(slot.value)
                );

                return (
                  <div 
                    key={oIdx} 
                    className="scheduler-appointment-cell"
                  >
                    {cellApt ? (
                      <div 
                        className={`appointment-card status-${cellApt.status}`}
                        onClick={() => {
                          setSelectedAppointment(cellApt);
                          setShowEditModal(true);
                        }}
                        style={{
                          backgroundColor: '#F8F9FA',
                          boxShadow: 'none',
                          border: 'none',
                          borderLeft: `3px solid var(--color-${
                            cellApt.status === 'confirmed' ? 'healthy' : 
                            cellApt.status === 'completed' ? 'crown' : 
                            cellApt.status === 'checked-in' ? 'decay' : 
                            'secondary-blue'
                          })`,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          padding: '12px',
                          height: '100%',
                          borderRadius: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{cellApt.patientName}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{cellApt.type}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            {cellApt.time} ({cellApt.duration} mins)
                          </div>
                        </div>
                        
                        <div style={{ 
                          fontSize: '11px', 
                          fontWeight: 500,
                          padding: '4px 10px', 
                          borderRadius: '12px',
                          backgroundColor: 
                            cellApt.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 
                            cellApt.status === 'completed' ? 'rgba(139, 92, 246, 0.1)' : 
                            cellApt.status === 'checked-in' ? 'rgba(245, 158, 11, 0.1)' : 
                            'rgba(59, 130, 246, 0.1)',
                          color: 
                            cellApt.status === 'confirmed' ? 'var(--color-healthy)' : 
                            cellApt.status === 'completed' ? 'var(--color-crown)' : 
                            cellApt.status === 'checked-in' ? 'var(--color-decay)' : 
                            'var(--secondary-blue)'
                        }}>
                          {cellApt.status === 'checked-in' ? 'Checked In' : cellApt.status.charAt(0).toUpperCase() + cellApt.status.slice(1)}
                        </div>
                      </div>
                    ) : (
                      // Clickable empty cell
                      <button 
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'transparent'
                        }}
                        className="empty-slot-btn"
                        onClick={() => openAddModal(slot.value, op.name)}
                        title="Click to book this slot"
                      >
                        <span style={{ fontSize: '18px', color: 'var(--border-color)' }}>+</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Layout (Upcoming & Quick Actions) */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px', marginTop: '8px' }}>
        
        {/* Upcoming Patients Card */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Upcoming Patients</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Marcus Sterling', room: 'Operatory B', time: '10:00 AM', status: 'Scheduled' },
              { name: 'Olivia Bennett', room: 'Operatory A', time: '11:00 AM', status: 'Pending' },
              { name: 'Daniel Lee', room: 'Hygiene Room', time: '01:00 PM', status: 'Pending' },
              { name: 'New Patient Consult', room: 'Hygiene Room', time: '01:00 PM', status: 'Pending', isNew: true },
              { name: 'Sophia Martinez', room: 'Operatory A', time: '02:00 PM', status: 'Pending', isNew: true }
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: '50%', 
                    backgroundColor: 'rgba(13, 148, 136, 0.1)', 
                    color: p.isNew ? 'var(--color-crown)' : 'var(--primary-teal)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontWeight: 600, fontSize: '14px' 
                  }}>
                    {p.isNew ? 'NP' : p.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.time} • {p.room}</div>
                  </div>
                </div>
                <div style={{ 
                  fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '12px',
                  backgroundColor: p.status === 'Scheduled' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: p.status === 'Scheduled' ? 'var(--secondary-blue)' : 'var(--color-decay)'
                }}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              
              <button 
                onClick={() => openAddModal('08:00', 'Operatory A')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', transition: 'var(--transition-fast)' }}
                className="hover-bg-light"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', fontSize: '13px' }}>
                  <Calendar size={18} style={{ color: 'var(--color-crown)' }} /> Book Appointment
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </button>

              <button style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', transition: 'var(--transition-fast)' }} className="hover-bg-light">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', fontSize: '13px' }}>
                  <UserPlus size={18} style={{ color: 'var(--color-crown)' }} /> Walk-in patient
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </button>

              <button style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', transition: 'var(--transition-fast)' }} className="hover-bg-light">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', fontSize: '13px' }}>
                  <Clock size={18} style={{ color: 'var(--color-crown)' }} /> Block Time
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </button>

              <button style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', cursor: 'pointer', transition: 'var(--transition-fast)' }} className="hover-bg-light">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', fontSize: '13px' }}>
                  <Coffee size={18} style={{ color: 'var(--color-crown)' }} /> Manage Breaks
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
            
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Schedule Legend</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-healthy)' }}></div> Confirmed
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--secondary-blue)' }}></div> Scheduled
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-decay)' }}></div> Pending
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-crown)' }}></div> Completed
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3B82F6' }}></div> Follow-up
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ADD APPOINTMENT MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>×</button>
            <h3 style={{ marginBottom: '16px' }}>Schedule Appointment</h3>
            <form onSubmit={handleCreateAppointment}>
              
              <div className="form-group">
                <label>Select Patient</label>
                <select 
                  className="form-control"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Select Patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label>Room / Operatory</label>
                  <select 
                    className="form-control"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    {OPERATORIES.map(op => (
                      <option key={op.name} value={op.name}>{op.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Time Slot</label>
                  <select 
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {TIME_SLOTS.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label>Procedure Type</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="e.g. Cleaning, Molar RCT"
                    required
                  />
                </div>
                <div>
                  <label>Duration (mins)</label>
                  <select 
                    className="form-control"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                  >
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                    <option value={90}>90 mins</option>
                    <option value={120}>120 mins</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-md" style={{ width: '100%' }}>
                Book Appointment Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / STATUS UPDATE MODAL */}
      {showEditModal && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
            <h3 style={{ marginBottom: '8px' }}>Appointment Details</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Patient: <strong>{selectedAppointment.patientName}</strong> ({selectedAppointment.patientId})
            </p>

            <div style={{ backgroundColor: 'var(--primary-teal-light)', padding: '12px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px' }}>
              <div><strong>Procedure:</strong> {selectedAppointment.type}</div>
              <div><strong>Operatory:</strong> {selectedAppointment.room}</div>
              <div><strong>Time:</strong> {selectedAppointment.time} ({selectedAppointment.duration} mins)</div>
              <div><strong>Provider:</strong> {selectedAppointment.dentist}</div>
            </div>

            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Update Clinic Status</label>
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '8px', 
                marginTop: '8px', 
                marginBottom: '20px' 
              }}
            >
              <button 
                className={`btn ${selectedAppointment.status === 'scheduled' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('scheduled')}
              >
                Scheduled
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'checked-in' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('checked-in')}
              >
                Checked-In
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'in-chair' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('in-chair')}
              >
                In-Chair
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('completed')}
              >
                Completed
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1, color: 'var(--color-fracture)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                onClick={handleCancelAppointment}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
