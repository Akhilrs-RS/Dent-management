import React, { useState } from 'react';
import { 
  Plus, Search, ArrowRight, CheckCircle2, 
  PauseCircle, Activity, Stethoscope, ChevronRight 
} from 'lucide-react';

export default function TreatmentsPage({ patients, treatmentCategories = [] }) {
  const [activeTab, setActiveTab] = useState('All Treatments');
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const categories = ['All Categories', ...treatmentCategories.map(c => c.name)];

  const allTreatments = patients.flatMap(p => 
    (p.treatmentPlan || []).map(tp => ({
      patient: p.name,
      plan: tp.name,
      category: treatmentCategories.find(c => c.name.toLowerCase().includes(tp.name.toLowerCase()))?.name || 'General',
      status: tp.status === 'completed' ? 'Completed' : 'In Progress',
      progress: tp.status === 'completed' ? 100 : 60,
      updated: 'Today'
    }))
  );

  const recentPlans = allTreatments.slice(0, 4);

  const metrics = [
    { title: 'Total Treatments', value: allTreatments.length.toString(), subtitle: 'All time', icon: <Stethoscope size={24} color="#10b981" />, bgColor: '#f0fdf4', borderColor: '#dcfce7' },
    { title: 'In Progress', value: allTreatments.filter(t => t.status === 'In Progress').length.toString(), subtitle: 'Active treatments', icon: <Activity size={24} color="#a855f7" />, bgColor: '#faf5ff', borderColor: '#f3e8ff' },
    { title: 'Completed', value: allTreatments.filter(t => t.status === 'Completed').length.toString(), subtitle: 'Successfully completed', icon: <CheckCircle2 size={24} color="#f59e0b" />, bgColor: '#fffbeb', borderColor: '#fef3c7' },
    { title: 'On Hold', value: '0', subtitle: 'Awaiting action', icon: <PauseCircle size={24} color="#3b82f6" />, bgColor: '#eff6ff', borderColor: '#dbeafe' }
  ];



  // Quick tooth icon using SVG path for authenticity
  const ToothIcon = ({ color = "#10b981" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5C12 20.5 14.5 22 17 22C19.5 22 21.5 20 21.5 17C21.5 14 19 11.5 19 8C19 4.5 16.5 2 12 2C7.5 2 5 4.5 5 8C5 11.5 2.5 14 2.5 17C2.5 20 4.5 22 7 22C9.5 22 12 20.5 12 20.5Z"/>
      <path d="M12 20.5V11"/>
    </svg>
  );

  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-app)', minHeight: '100vh', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Treatments</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage all dental treatments, procedures, and treatment plan.</p>
        </div>
        
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#3d6c59', color: 'var(--bg-card)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
          <Plus size={16} />
          New Treatment Plan
        </button>
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
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '32px' }}>
        {['All Treatments', 'Treatment Plans', 'In Progress', 'Completed', 'On Hold'].map(tab => (
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

      {/* Browse All Treatments */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Browse All Treatments</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Manage all dental treatments, procedures, and treatment plan.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', width: '240px' }}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search" 
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          
          {/* Categories Sidebar */}
          <div style={{ width: '220px', flexShrink: 0 }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', paddingLeft: '16px' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {categories.map(cat => (
                <div 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: activeCategory === cat ? '600' : '500',
                    color: activeCategory === cat ? '#3d6c59' : 'var(--text-secondary)',
                    backgroundColor: activeCategory === cat ? 'var(--border-color)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Treatment Cards Grid */}
          <div style={{ flex: '1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {treatmentCategories.map((card, i) => (
              <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ToothIcon />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{card.name}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>{card.count} Treatments</p>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', flex: '1' }}>{card.desc}</p>
                
                <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', textAlign: 'center' }}>
                  <a href="#" style={{ fontSize: '12px', color: '#3d6c59', fontWeight: '600', textDecoration: 'none' }}>View Treatments</a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Recent Treatment Plans */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Recent Treatment Plans</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Latest treatment plans created or updated.</p>
          </div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none' }}>
            View all Plans <ArrowRight size={14} />
          </a>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.5fr 1fr', padding: '16px 24px', borderBottom: '1px solid #f1f5f9', backgroundColor: 'var(--bg-app)' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Patient</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Treatment Plan</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Category</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Progress</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Updated On</div>
          </div>
          
          {/* Table Body */}
          {recentPlans.map((plan, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.5fr 1fr', padding: '16px 24px', borderBottom: i < recentPlans.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{plan.patient}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{plan.plan}</div>
              <div>
                <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: 'var(--border-color)', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '500' }}>
                  {plan.category}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{plan.status}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', width: '32px' }}>{plan.progress}%</span>
                <div style={{ flex: '1', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${plan.progress}%`, height: '100%', backgroundColor: 'var(--text-primary)', borderRadius: '4px' }}></div>
                </div>
              </div>
              
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{plan.updated}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
