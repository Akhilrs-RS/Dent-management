import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Users, Stethoscope, UserCheck, UserMinus, 
  ChevronDown, Phone, Mail, Edit2, Trash2, CalendarDays
} from 'lucide-react';

export default function DoctorsStaffPage() {
  const [activeTab, setActiveTab] = useState('All Members');

  const metrics = [
    { title: 'Total Members', value: '28', subtitle: 'All active members', icon: <Users size={24} color="#10b981" />, bgColor: '#f0fdf4', borderColor: '#dcfce7' },
    { title: 'Doctors', value: '12', subtitle: 'Clinical doctors', icon: <Stethoscope size={24} color="#10b981" />, bgColor: '#f0fdf4', borderColor: '#dcfce7' },
    { title: 'Staff Members', value: '16', subtitle: 'Non-clinical staff', icon: <UserCheck size={24} color="#3b82f6" />, bgColor: '#eff6ff', borderColor: '#dbeafe' },
    { title: 'On Leave', value: '2', subtitle: 'Currently on leave', icon: <UserMinus size={24} color="#f97316" />, bgColor: '#fff7ed', borderColor: '#ffedd5' }
  ];

  const staffList = [
    { name: 'Dr. Sarah Johnson', id: 'ID: D-101', role: 'General Dentist', roleBg: '#dcfce7', roleColor: '#15803d', dept: 'Preventive Care', phone: '(555) 123-4567', email: 'sarah.j@auradental.com', sched: 'Mon - Fri', time: '09:00 AM - 05:00 PM', initials: 'SJ' },
    { name: 'Dr. Michael Brown', id: 'ID: D-102', role: 'Orthodontist', roleBg: '#e0f2fe', roleColor: '#0369a1', dept: 'Orthodontics', phone: '(555) 234-5678', email: 'michael.b@auradental.com', sched: 'Mon - Sat', time: '10:00 AM - 06:00 PM', initials: 'MB' },
    { name: 'Dr. Emily Davis', id: 'ID: D-103', role: 'Endodontist', roleBg: '#f3e8ff', roleColor: '#7e22ce', dept: 'Endodontics', phone: '(555) 345-6789', email: 'emily.d@auradental.com', sched: 'Mon - Fri', time: '08:30 AM - 04:30 PM', initials: 'ED' },
    { name: 'Dr. James Wilson', id: 'ID: D-104', role: 'Oral Surgeon', roleBg: '#ffedd5', roleColor: '#c2410c', dept: 'Oral Surgery', phone: '(555) 456-7890', email: 'james.w@auradental.com', sched: 'Tue - Sat', time: '10:00 AM - 06:00 PM', initials: 'JW' },
    { name: 'Dr. Lisa Anderson', id: 'ID: D-105', role: 'Pediatric Dentist', roleBg: '#fce7f3', roleColor: '#be185d', dept: 'Pediatric Dentistry', phone: '(555) 567-8901', email: 'lisa.a@auradental.com', sched: 'Mon - Fri', time: '09:00 AM - 05:00 PM', initials: 'LA' },
    { name: 'Anna Smith', id: 'ID: S-201', role: 'Receptionist', roleBg: '#fef3c7', roleColor: '#b45309', dept: 'Front Office', phone: '(555) 111-2222', email: 'anna.s@auradental.com', sched: 'Mon - Fri', time: '08:30 AM - 05:30 PM', initials: 'AS' },
    { name: 'Mark Thompson', id: 'ID: S-202', role: 'Dental Assistant', roleBg: '#e0e7ff', roleColor: '#4338ca', dept: 'Clinical Support', phone: '(555) 222-3333', email: 'mark.t@auradental.com', sched: 'Mon - Sat', time: '09:00 AM - 06:00 PM', initials: 'MT' },
    { name: 'Priya Lee', id: 'ID: S-203', role: 'Hygienist', roleBg: '#fef08a', roleColor: '#a16207', dept: 'Preventive Care', phone: '(555) 333-4444', email: 'priya.l@auradental.com', sched: 'Mon - Fri', time: '09:00 AM - 05:00 PM', initials: 'PL' }
  ];

  const depts = [
    { name: 'Preventive Care', count: 6, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Orthodontics', count: 3, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Endodontics', count: 2, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Oral Surgery', count: 2, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Pediatric Dentistry', count: 2, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Front Office', count: 4, icon: <Users size={14} color="#64748b" /> },
    { name: 'Clinical Support', count: 5, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Laboratory', count: 2, icon: <Stethoscope size={14} color="#3b82f6" /> },
    { name: 'Others', count: 2, icon: <Users size={14} color="#64748b" /> }
  ];

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-app)', minHeight: '100vh', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Doctors & Staff</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage clinic doctors, staff members, roles and permissions.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', width: '240px' }}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search doctors or staff..." 
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Filter Button */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
            <Filter size={16} />
            Filter
          </button>

          {/* Add New Member Button */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#3d6c59', color: 'var(--bg-card)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
            <Plus size={16} />
            Add New Member
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {metrics.map((metric, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: metric.bgColor, border: `1px solid ${metric.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {metric.icon}
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '500' }}>{metric.title}</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', lineHeight: '1' }}>{metric.value}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{metric.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        {['All Members', 'Doctors', 'Clinical Staff', 'Support Staff', 'On Leave'].map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              paddingBottom: '12px',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '500',
              color: activeTab === tab ? '#3d6c59' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid #3d6c59' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-1px'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main Layout Split */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Column: Data Table */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Filters Row */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {['All Roles', 'All Departments'].map(filter => (
              <div key={filter} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer', width: '180px' }}>
                {filter} <ChevronDown size={14} />
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500', cursor: 'pointer', width: '160px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                Active
              </div>
              <ChevronDown size={14} color="#64748b" />
            </div>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 1.5fr 0.8fr 0.8fr', padding: '16px 20px', borderBottom: '1px solid #f1f5f9', backgroundColor: 'var(--bg-app)' }}>
              {['Member', 'Role', 'Department', 'Contact', 'Schedule', 'Status', 'Action'].map(h => (
                <div key={h} style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>{h}</div>
              ))}
            </div>
            
            {/* Rows */}
            {staffList.map((staff, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 1.5fr 0.8fr 0.8fr', padding: '16px 20px', borderBottom: i < staffList.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
                
                {/* Member */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {staff.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>{staff.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{staff.id}</p>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: staff.roleBg, color: staff.roleColor, fontSize: '11px', fontWeight: '600' }}>
                    {staff.role}
                  </span>
                </div>

                {/* Department */}
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500' }}>
                  {staff.dept}
                </div>

                {/* Contact */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Phone size={12} color="#94a3b8" />
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{staff.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={12} color="#94a3b8" />
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{staff.email}</span>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <CalendarDays size={12} color="#94a3b8" />
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{staff.sched}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingLeft: '18px' }}>
                    {staff.time}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: '600' }}>
                    Active
                  </span>
                </div>

                {/* Action */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <Edit2 size={14} />
                  </button>
                  <button style={{ padding: '6px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            ))}

            {/* Pagination Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid #f1f5f9', backgroundColor: 'var(--bg-app)' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Showing 1 to 8 of 28 members
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer' }}>&lt;</button>
                <button style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', backgroundColor: '#3d6c59', color: 'var(--bg-card)', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>1</button>
                <button style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>2</button>
                <button style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>3</button>
                <button style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>4</button>
                <button style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer' }}>&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Department Overview */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Department Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {depts.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {d.icon}
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>{d.count}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>28</span>
            </div>
          </div>

          {/* On Leave Today */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>On Leave Today</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>RT</div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Dr. Robert Taylor</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Periodontist</p>
                  </div>
                </div>
                <span style={{ padding: '4px 8px', borderRadius: '20px', backgroundColor: '#ffedd5', color: '#c2410c', fontSize: '10px', fontWeight: '600' }}>Full Day</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>DC</div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>David Clark</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lab Technician</p>
                  </div>
                </div>
                <span style={{ padding: '4px 8px', borderRadius: '20px', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '10px', fontWeight: '600' }}>Half Day</span>
              </div>
            </div>
            <button style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', color: '#3d6c59', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CalendarDays size={14} /> View Leave Calendar
            </button>
          </div>

          {/* Upcoming Birthdays */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Upcoming Birthdays</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: '#7e22ce' }}>ED</div>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Emily Davis</p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>May 26</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: '#4338ca' }}>MT</div>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Mark Thompson</p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>May 28</span>
              </div>
            </div>
            <button style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', color: '#3d6c59', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              View All Birthdays
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
