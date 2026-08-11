import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle2, XCircle, Search, 
  ChevronDown, ChevronLeft, ChevronRight, Plus, 
  SlidersHorizontal 
} from 'lucide-react';

export default function AppointmentsPage({ appointments, patients }) {
  const [activeTab, setActiveTab] = useState('All');

  // Hardcoded mockup data to exactly match screenshot metrics & lists where app data might fall short
  const metrics = [
    { title: "Today's Appointments", value: '12', trend: '↑ 2 vs yesterday', trendUp: true, icon: <Calendar size={20} color="#10b981" /> },
    { title: "Confirmed", value: '28', trend: '↑ 8 vs last 7 days', trendUp: true, icon: <CheckCircle2 size={20} color="#10b981" /> },
    { title: "Pending", value: '6', trend: '↓ 1 vs last 7 days', trendUp: false, icon: <Clock size={20} color="#f59e0b" /> },
    { title: "Canceled", value: '3', trend: '↓ 2 vs last 7 days', trendUp: false, icon: <XCircle size={20} color="#8b5cf6" /> }
  ];

  const appointmentList = [
    { time: '09:00 AM', initials: 'EV', name: 'Eleanor Vance', id: 'ID - P - 2011', doctor: 'Dr. Marcus Sterling', docId: 'ID - D - 2011', reason: 'Dental Cleaning', status: 'Confirmed', statusColor: '#dcfce7', statusText: '#15803d' },
    { time: '09:45 AM', initials: 'JW', name: 'James Wilson', id: 'ID - P - 2011', doctor: 'Dr. Marcus Sterling', docId: 'ID - D - 2011', reason: 'Cavity Filling', status: 'In-Progress', statusColor: '#f3e8ff', statusText: '#7e22ce' },
    { time: '10:30 AM', initials: 'MS', name: 'Mia Smith', id: 'ID - P - 2011', doctor: 'Dr. Aisha Patel', docId: 'ID - D - 2011', reason: 'Braces Adjustment', status: 'Confirmed', statusColor: '#dcfce7', statusText: '#15803d' },
    { time: '11:15 AM', initials: 'EV', name: 'Eleanor Vance', id: 'ID - P - 2011', doctor: 'Dr. Marcus Sterling', docId: 'ID - D - 2011', reason: 'Dental Cleaning', status: 'Pending', statusColor: '#ffedd5', statusText: '#c2410c' },
    { time: '01:00 PM', initials: 'EV', name: 'Eleanor Vance', id: 'ID - P - 2011', doctor: 'Dr. Marcus Sterling', docId: 'ID - D - 2011', reason: 'Dental Cleaning', status: 'Confirmed', statusColor: '#dcfce7', statusText: '#15803d' },
    { time: '02:00 PM', initials: 'EV', name: 'Eleanor Vance', id: 'ID - P - 2011', doctor: 'Dr. Marcus Sterling', docId: 'ID - D - 2011', reason: 'Dental Cleaning', status: 'Completed', statusColor: '#e0f2fe', statusText: '#0369a1' },
    { time: '03:00 PM', initials: 'EV', name: 'Eleanor Vance', id: 'ID - P - 2011', doctor: 'Dr. Marcus Sterling', docId: 'ID - D - 2011', reason: 'Dental Cleaning', status: 'Confirmed', statusColor: '#dcfce7', statusText: '#15803d' }
  ];

  const followUps = [
    { date: 'May 23', name: 'Thomas Parker', reason: 'Consultation', doc: 'Dr. Aisha Patel' },
    { date: 'May 23', name: 'Ava Nguyen', reason: 'Crown Prep', doc: 'Dr. Marcus Sterling' },
    { date: 'May 24', name: 'Jack Brown', reason: 'Deep Cleaning', doc: 'Dr. Sarah Carter' }
  ];

  const timeline = [
    { time: '09:00 AM', name: 'Eleanor Vance', reason: 'Dental Cleaning', status: 'Confirmed', color: '#10b981', statusColor: '#dcfce7', statusText: '#15803d' },
    { time: '09:45 AM', name: 'James Wilson', reason: 'Cavity Filling', status: 'In-Progress', color: '#8b5cf6', statusColor: '#f3e8ff', statusText: '#7e22ce' },
    { time: '10:30 AM', name: 'Mia Smith', reason: 'Braces Adjustment', status: 'Confirmed', color: '#10b981', statusColor: '#dcfce7', statusText: '#15803d' },
    { time: '11:15 AM', name: 'David Lee', reason: 'Tooth Extraction', status: 'Pending', color: '#f59e0b', statusColor: '#ffedd5', statusText: '#c2410c' },
    { time: '01:00 PM', name: 'Sophie Clark', reason: 'Consultation', status: 'Confirmed', color: '#10b981', statusColor: '#dcfce7', statusText: '#15803d' },
  ];

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-app)', minHeight: '100vh', width: '100%' }}>
      
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
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Upcoming Follow - Ups</h3>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
              {followUps.map((fu, i) => (
                <div key={i} style={{ minWidth: '220px', padding: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', paddingRight: '16px', borderRight: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '2px' }}>May</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{fu.date.split(' ')[1]}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{fu.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{fu.reason}<br/>{fu.doc}</p>
                  </div>
                </div>
              ))}
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
