import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CLINIC_ANALYTICS } from '../data/mockData';
import { IndianRupee, Calendar, Search, ChevronRight, User, Stethoscope, CheckCircle, Bell, FileText, UserPlus, FileImage, ShieldAlert } from 'lucide-react';

export default function Dashboard({ 
  userRole, 
  patients = [], 
  appointments = [], 
  onCheckInPatient, 
  onRegisterPatient, 
  onViewScheduler, 
  onViewPatient,
  onUpdateAppointment,
  analytics
}) {
  const currentAnalytics = analytics || CLINIC_ANALYTICS;
  const { dailyRevenue, monthlyRevenue, occupancyRate, activePatients, procedureBreakdown, revenueHistory } = currentAnalytics;
  const [searchTerm, setSearchTerm] = useState('');

  // Render SVG Area Chart for Revenue History
  const renderRevenueChart = () => {
    const width = 500;
    const height = 180;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxVal = Math.max(...revenueHistory.map(d => d.amount)) * 1.1;
    const minVal = 0;

    // Calculate coordinates
    const points = revenueHistory.map((d, i) => {
      const x = padding + (i * chartWidth) / (revenueHistory.length - 1);
      const y = padding + chartHeight - ((d.amount - minVal) * chartHeight) / (maxVal - minVal);
      return { x, y, month: d.month, amount: d.amount };
    });

    const pathData = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    const areaData = points.length > 0 
      ? `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
      : '';

    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-teal)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary-teal)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = padding + chartHeight * ratio;
          const val = Math.round(maxVal - (ratio * (maxVal - minVal)));
          return (
            <g key={idx}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4,4" />
              <text x={padding - 5} y={y + 4} fill="var(--text-muted)" fontSize="9" textAnchor="end">₹{(val / 1000).toFixed(0)}k</text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={areaData} fill="url(#chartGrad)" />

        {/* Main Line */}
        <path d={pathData} fill="none" stroke="var(--primary-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i} className="chart-dot-group">
            <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-card)" stroke="var(--primary-teal)" strokeWidth="2" />
            <text x={p.x} y={p.y - 10} fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle">₹{(p.amount / 1000).toFixed(1)}k</text>
            <text x={p.x} y={height - padding + 16} fill="var(--text-secondary)" fontSize="11" fontWeight="500" textAnchor="middle">{p.month}</text>
          </g>
        ))}
      </svg>
    );
  };

  // Render SVG Donut Chart for Procedure Breakdown
  const renderDonutChart = () => {
    const size = 180;
    const center = size / 2;
    const radius = 50;
    const strokeWidth = 18;
    const circumference = 2 * Math.PI * radius;
    
    let currentAngle = 0;
    const items = procedureBreakdown.map(item => {
      const percentage = item.value;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;
      const angle = currentAngle;
      currentAngle += (percentage / 100) * 360;
      return { ...item, strokeDashoffset, angle };
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {items.map((item, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={item.strokeDashoffset}
              transform={`rotate(${item.angle - 90} ${center} ${center})`}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          ))}
          <circle cx={center} cy={center} r={radius - strokeWidth/2 - 2} fill="var(--bg-card)" />
          <text x={center} y={center - 2} textAnchor="middle" fill="var(--text-primary)" fontSize="18" fontWeight="bold">ADA</text>
          <text x={center} y={center + 14} textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Procedures</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
          {items.map((item, idx) => (
            <div key={idx} className="flex-row-center">
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color }} />
              <span style={{ color: 'var(--text-secondary)' }}>{item.name}:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{item.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Dynamic Top Header */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Good morning, {userRole === 'doctor' ? 'Dr. Carter' : 'Emily'}!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Here's what's happening at AuraDental today.
        </p>
      </div>

      {/* Stat Cards Row */}
      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-header">
            <h3>Today's Production</h3>
          </div>
          <div className="stat-body">
            <div className="stat-icon">
              <IndianRupee size={22} />
            </div>
            <div className="stat-value">₹{dailyRevenue.toLocaleString()}</div>
          </div>
          <div className="stat-change positive">
            <span>↑ 12% vs last Friday</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-header">
            <h3>Monthly Billings</h3>
          </div>
          <div className="stat-body">
            <div className="stat-icon">
              <Calendar size={22} />
            </div>
            <div className="stat-value">₹{monthlyRevenue.toLocaleString()}</div>
          </div>
          <div className="stat-change positive">
            <span>↑ 8.4% last month</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-header">
            <h3>Operatory Occupancy</h3>
          </div>
          <div className="stat-body">
            <div className="stat-icon">
              <span style={{ fontSize: '20px' }}>🦷</span>
            </div>
            <div className="stat-value">{occupancyRate}%</div>
          </div>
          <div className="stat-change negative">
            <span>↓ 2% vs target 87%</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-header">
            <h3>Active Patients</h3>
          </div>
          <div className="stat-body">
            <div className="stat-icon">
              <User size={22} />
            </div>
            <div className="stat-value">{activePatients.toLocaleString()}</div>
          </div>
          <div className="stat-change positive">
            <span>↑ 24 new this month</span>
          </div>
        </div>
      </div>

      {/* Role-Based Intake & Waiting Room Queue Panels */}
      {userRole === 'receptionist' ? (
        <div className="card" style={{ padding: '24px' }}>
          <div className="flex-between mb-sm" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Patient Intake & Reception Lounge</h2>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: '16px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              className="form-control"
              placeholder="Search patients by name, phone or ID to check in..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '40px', paddingRight: '40px', borderRadius: '12px', border: '1px solid var(--border-color)', height: '44px' }}
            />
            {searchTerm && (
              <button className="btn btn-secondary" onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '4px 10px', fontSize: '11px', border: 'none' }}>
                Clear
              </button>
            )}
          </div>

          {/* Intake Patient List */}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {patients
              .filter(p => 
                !searchTerm || 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.phone.includes(searchTerm)
              )
              .slice(0, searchTerm ? 5 : 3)
              .map(p => {
                const today = new Date().toISOString().split('T')[0];
                const todayApt = appointments.find(apt => apt.patientId === p.id && apt.date === today);
                
                return (
                  <div key={p.id} className="flex-between" style={{ padding: '12px 16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--primary-teal-light)', color: 'var(--primary-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px' }}>
                        {p.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{p.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>#{p.id}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Age/Gender: {p.age} yrs, {p.gender} | Contact: {p.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex-row-center" style={{ gap: '10px' }}>
                      {todayApt ? (
                        <>
                          {todayApt.status === 'checked-in' && (
                            <span style={{ fontSize: '12px', color: 'var(--color-decay)', fontWeight: 500 }}>Waiting Lounge</span>
                          )}
                          {todayApt.status === 'in-chair' && (
                            <span style={{ fontSize: '12px', color: 'var(--color-fracture)', fontWeight: 500 }}>In Chair</span>
                          )}
                          {todayApt.status === 'completed' && (
                            <span style={{ fontSize: '12px', color: 'var(--color-healthy)', fontWeight: 500 }}>Completed Visit</span>
                          )}
                          {(todayApt.status === 'scheduled' || todayApt.status === 'confirmed') && (
                            <button 
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '500', color: 'var(--primary-teal)', backgroundColor: 'var(--primary-teal-light)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                              onClick={() => onCheckInPatient(p.id, todayApt.room, todayApt.dentist, todayApt.type)}
                            >
                              Check In <ChevronRight size={14} />
                            </button>
                          )}
                        </>
                      ) : (
                        <button 
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '500', color: 'var(--primary-teal)', backgroundColor: 'var(--primary-teal-light)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                          onClick={() => onCheckInPatient(p.id)}
                        >
                          Check In <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        /* Doctor view: Waiting Lounge / Queue */
        <div className="card" style={{ borderLeft: '4px solid var(--primary-teal)' }}>
          <h2>Live Patients Waiting Lounge (Admissions Queue)</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            The following patients have been checked in by reception and are waiting in the clinic lounge.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {appointments.filter(apt => apt.status === 'checked-in').length > 0 ? (
              appointments
                .filter(apt => apt.status === 'checked-in')
                .map(apt => {
                  const pt = patients.find(p => p.id === apt.patientId) || {};
                  return (
                    <div key={apt.id} className="flex-between animate-fade-in" style={{ padding: '12px 16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px dashed var(--primary-teal)', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-decay)', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                          <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{apt.patientName}</strong>
                          <span className="badge badge-warning" style={{ fontSize: '9px', padding: '2px 6px' }}>Checked-In</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Age: {pt.age || 'N/A'} yrs | Phone: {pt.phone || 'N/A'} | Scheduled Room: <strong>{apt.room}</strong>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Visit Objective: <strong style={{ color: 'var(--text-primary)' }}>{apt.type}</strong>
                        </div>
                      </div>

                      <button 
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 600 }}
                        onClick={() => {
                          onUpdateAppointment(apt.id, { ...apt, status: 'in-chair' });
                          onViewPatient(apt.patientId);
                        }}
                      >
                        Admit to Chair & Start EHR
                      </button>
                    </div>
                  );
                })
            ) : (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', backgroundColor: 'rgba(13, 148, 136, 0.03)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                🍃 All clear. No patients currently waiting in the lounge.
              </div>
            )}
          </div>
          <style>{`
            @keyframes pulse {
              0% { opacity: 0.3; transform: scale(0.9); }
              50% { opacity: 1; transform: scale(1.1); }
              100% { opacity: 0.3; transform: scale(0.9); }
            }
          `}</style>
        </div>
      )}

      {/* Main Charts Area */}
      <div className="dashboard-main-layout">
        
        {/* Practice Revenue Area Chart */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Revenue Generation & Forecasting</h2>
          {renderRevenueChart()}
        </div>

        {/* Procedures Donut Chart */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Procedure Metrics</h2>
          {renderDonutChart()}
        </div>
      </div>

      {/* Operatorries & Recent Alerts Row */}
      <div className="dashboard-main-layout">
        
        {/* Operatory Chairs Monitor -> Today's Schedule */}
        <div className="card">
          <div className="flex-between mb-sm" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Today's Schedule</h2>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px' }} onClick={onViewScheduler}>
              View Calendar
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div className="flex-between" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Operatory A <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>| General Dentistry</span></strong>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Marcus Sterling
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-fracture)', fontWeight: 500, display: 'inline-block', marginBottom: '4px' }}>In Progress</span>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>09:00 AM</div>
              </div>
            </div>

            <div className="flex-between" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Operatory B <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>| Surg / Implantology</span></strong>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Samuel Henderson
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-decay)', fontWeight: 500, display: 'inline-block', marginBottom: '4px' }}>Upcoming</span>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>11:15 AM</div>
              </div>
            </div>

            <div className="flex-between" style={{ paddingBottom: '16px' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Hygiene Bay 1</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Chloe Park
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-healthy)', fontWeight: 500, display: 'inline-block', marginBottom: '4px' }}>Completed</span>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>08:30 AM</div>
              </div>
            </div>

          </div>
          <button style={{ width: '100%', textAlign: 'center', background: 'none', border: 'none', color: 'var(--primary-teal)', fontSize: '13px', fontWeight: 500, marginTop: '8px', cursor: 'pointer' }} onClick={onViewScheduler}>
            View Full Schedule &rarr;
          </button>
        </div>

        {/* Live Alerts Feed */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Clinic Notifications</h2>
            <Bell size={18} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '250px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-healthy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle size={16} />
              </div>
              <div>
                <div className="flex-between">
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Checked-In</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>09:12 AM</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Patient <strong style={{ color: 'var(--text-primary)' }}>Eleanor Vance</strong> has checked in at reception.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileImage size={16} />
              </div>
              <div>
                <div className="flex-between">
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Image Uploaded</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>09:05 AM</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  2 Intraoral Bitewing Radiographs uploaded for Eleanor Vance.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-decay)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldAlert size={16} />
              </div>
              <div>
                <div className="flex-between">
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Lab Case Alert</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Yesterday</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Elite Dental Lab: Crown case #82103 for Marcus Sterling is <strong style={{ color: 'var(--text-primary)' }}>Shipped</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
