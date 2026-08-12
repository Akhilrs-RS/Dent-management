import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle2, XCircle, Search, 
  ChevronDown, ChevronLeft, ChevronRight, Plus, 
  SlidersHorizontal 
} from 'lucide-react';

export default function AppointmentsPage({ appointments = [], patients = [], followUps = [] }) {
  const [activeTab, setActiveTab] = useState('All');

  const metrics = [
    { title: 'Total Appointments', value: appointments.length.toString(), icon: <Calendar size={24} color="#3b82f6" />, bgColor: '#eff6ff', borderColor: '#dbeafe' },
    { title: 'Completed', value: appointments.filter(a => a.status === 'completed').length.toString(), icon: <CheckCircle2 size={24} color="#10b981" />, bgColor: '#f0fdf4', borderColor: '#dcfce7' },
    { title: 'Pending / Scheduled', value: appointments.filter(a => a.status === 'scheduled' || a.status === 'checked-in').length.toString(), icon: <Clock size={24} color="#f59e0b" />, bgColor: '#fffbeb', borderColor: '#fef3c7' },
    { title: 'Cancelled', value: appointments.filter(a => a.status === 'cancelled').length.toString(), icon: <XCircle size={24} color="#ef4444" />, bgColor: '#fef2f2', borderColor: '#fee2e2' }
  ];

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-app)', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Appointments</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage bookings, schedules, and patients visits.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Date Picker Mock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Calendar size={16} />
            <span>May 20 - May 26, 2024</span>
            <ChevronDown size={14} style={{ marginLeft: '4px' }} />
          </div>
          
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', width: '220px' }}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>

          {/* New Appointment Button */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#3d6c59', color: 'var(--bg-card)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
            <Plus size={16} />
            New Appointment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {metrics.map((metric, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>{metric.title}</p>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>{metric.value}</h3>
              <p style={{ fontSize: '12px', color: metric.trendUp ? '#10b981' : metric.trendUp === false ? '#f59e0b' : '#8b5cf6', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {metric.trend}
              </p>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #f1f5f9' }}>
              {metric.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['All', 'Today', 'Upcoming', 'Completed'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: activeTab === tab ? '#3d6c59' : 'var(--border-color)',
              backgroundColor: activeTab === tab ? '#3d6c59' : 'var(--bg-card)',
              color: activeTab === tab ? 'var(--bg-card)' : 'var(--text-secondary)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Column (List) */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', flex: '1' }}>
              <Search size={16} color="#94a3b8" />
              <input 
                type="text" 
                placeholder="Search by patient name or reason..." 
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
              />
            </div>
            {['Doctor', 'Department', 'Status'].map(filter => (
              <div key={filter} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                {filter} <ChevronDown size={14} />
              </div>
            ))}
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {/* List View */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            {appointmentList.map((apt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: i < appointmentList.length - 1 ? '1px solid #f1f5f9' : 'none', gap: '24px' }}>
                {/* Time */}
                <div style={{ width: '60px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {apt.time}
                </div>
                
                {/* Patient */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1.2' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#3d6c59' }}>
                    {apt.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>{apt.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{apt.id}</p>
                  </div>
                </div>

                {/* Doctor */}
                <div style={{ flex: '1' }}>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>{apt.doctor}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{apt.docId}</p>
                </div>

                {/* Reason */}
                <div style={{ flex: '1' }}>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>{apt.reason}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{apt.id}</p>
                </div>

                {/* Status Badge */}
                <div style={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    backgroundColor: apt.statusColor, 
                    color: apt.statusText, 
                    fontSize: '11px', 
                    fontWeight: '600' 
                  }}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Follow-Ups */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Upcoming Follow - Ups</h3>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
              {followUps.map((fu, i) => {
                const initials = fu.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                return (
                  <div key={i} style={{ minWidth: '280px', padding: '16px', backgroundColor: 'var(--bg-app)', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', minWidth: '45px', backgroundColor: 'var(--bg-card)' }}>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '2px' }}>{fu.date.split(' ')[0]}</p>
                      <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{fu.date.split(' ')[1]}</p>
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#fae8dc', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '12px', flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{fu.name}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Follow - up: {fu.reason}</p>
                      <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{fu.time} . {fu.doc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Calendar & Schedule) */}
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Calendar */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>May 2024</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <ChevronLeft size={16} color="#64748b" cursor="pointer" />
                <ChevronRight size={16} color="#64748b" cursor="pointer" />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>{day}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
              {/* Dummy Calendar Grid for May 2024 */}
              {[28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1].map((date, i) => (
                <div 
                  key={i} 
                  style={{ 
                    padding: '6px', 
                    fontSize: '12px', 
                    color: i < 3 || i > 33 ? '#cbd5e1' : (date === 20 ? 'var(--bg-card)' : 'var(--text-primary)'),
                    backgroundColor: date === 20 && i > 3 && i < 33 ? '#3d6c59' : 'transparent',
                    borderRadius: '50%',
                    fontWeight: date === 20 ? 'bold' : 'normal',
                    cursor: 'pointer'
                  }}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>Today's Schedule</h3>
              <a href="#" style={{ fontSize: '12px', color: '#3d6c59', textDecoration: 'none', fontWeight: '500' }}>View Full Day</a>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>May 20, 2024</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* Vertical Timeline Line */}
              <div style={{ position: 'absolute', left: '74px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}></div>
              
              {timeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
                  <div style={{ width: '56px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500', paddingTop: '2px' }}>
                    {item.time}
                  </div>
                  <div style={{ marginTop: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, border: '2px solid #fff', boxShadow: '0 0 0 1px #e2e8f0' }}></div>
                  <div style={{ flex: '1' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>{item.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.reason}</p>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      backgroundColor: item.statusColor, 
                      color: item.statusText, 
                      fontSize: '10px', 
                      fontWeight: '600' 
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <a href="#" style={{ fontSize: '12px', color: '#3d6c59', textDecoration: 'none', fontWeight: '500' }}>+ 7 more appointments</a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
