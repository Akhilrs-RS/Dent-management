import React from 'react';
import { 
  Calendar, Plus, DollarSign, FileText, 
  Download, ArrowDownLeft, ArrowUpRight, ChevronDown, CheckCircle2 
} from 'lucide-react';

export default function BillingPaymentsPage({ invoices = [], transactions = [], analytics = null }) {
  const metrics = [
    { title: 'Total Revenue', value: `$ ${(analytics?.monthlyRevenue || 64200).toLocaleString()}`, trend: '↑ 12.4% vs Apr 1 - Apr 30', trendUp: true, icon: <DollarSign size={20} color="#10b981" />, bgColor: '#f0fdf4', iconBg: '#dcfce7' },
    { title: 'Total Invoices', value: invoices.length.toString(), trend: '↑ 6.5% vs Apr 1 - Apr 30', trendUp: true, icon: <FileText size={20} color="#0ea5e9" />, bgColor: '#f0f9ff', iconBg: '#e0f2fe' },
    { title: 'Payments Received', value: '$ 45,750', trend: '↑ 15.3% vs Apr 1 - Apr 30', trendUp: true, icon: <ArrowDownLeft size={20} color="#8b5cf6" />, bgColor: '#faf5ff', iconBg: '#f3e8ff' },
    { title: 'Outstanding Balance', value: '$ 18,450', trend: '↓ 6.2% vs Apr 1 - Apr 30', trendUp: false, icon: <FileText size={20} color="#f97316" />, bgColor: '#fff7ed', iconBg: '#ffedd5' },
    { title: 'Overdue Invoices', value: invoices.filter(i => i.status === 'Unpaid').length.toString(), trend: '↓ 2 vs Apr 1 - Apr 30', trendUp: false, icon: <FileText size={20} color="#ef4444" />, bgColor: '#fef2f2', iconBg: '#fee2e2' },
    { title: "Today's Collections", value: '$ 3,250', trend: '↑ 10.5% vs Yesterday', trendUp: true, icon: <DollarSign size={20} color="#10b981" />, bgColor: '#f0fdf4', iconBg: '#dcfce7' }
  ];



  return (
    <div style={{ padding: '32px', backgroundColor: 'var(--bg-app)', minHeight: '100vh', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Billing & Payments</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage invoices, payments and collections.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Date Picker Mock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'var(--bg-card)', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Calendar size={16} />
            <span>May 1 - May 24, 2024</span>
            <ChevronDown size={14} style={{ marginLeft: '4px' }} />
          </div>

          {/* New Invoice Button */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', backgroundColor: '#3d6c59', color: 'var(--bg-card)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
            <Plus size={16} />
            New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {metrics.map((metric, i) => (
          <div key={i} style={{ padding: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: metric.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {metric.icon}
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>{metric.title}</p>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>{metric.value}</h3>
            <p style={{ fontSize: '10px', color: metric.trendUp ? '#10b981' : '#ef4444', fontWeight: '600' }}>
              {metric.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Main Layout Split */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Column */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Recent Invoices Table */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Recent Invoices</h3>
              <a href="#" style={{ fontSize: '13px', color: '#10b981', fontWeight: '600', textDecoration: 'none' }}>View All Invoices</a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 0.5fr', padding: '12px 0', borderBottom: '1px solid #f1f5f9', minWidth: '100%' }}>
                {['Invoice No.', 'Patient', 'Treatment', 'Invoice Date', 'Due Date', 'Total', 'Status', 'Balance', 'Action'].map(h => (
                  <div key={h} style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>{h}</div>
                ))}
              </div>
              
              {/* Rows */}
              {invoices.map((inv, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 0.5fr', padding: '16px 0', borderBottom: i < invoices.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center', minWidth: '100%' }}>
                  <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>{inv.id}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{inv.patient}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{inv.treatment}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{inv.date}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{inv.due}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{inv.total}</div>
                  <div>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: inv.statusColor, color: inv.statusText, fontSize: '10px', fontWeight: '700' }}>
                      {inv.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{inv.balance}</div>
                  <div>
                    <Download size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9', marginTop: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Showing 1 to 5 of 152 invoices
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)', cursor: 'pointer' }}>&lt;</button>
                <button style={{ padding: '4px 10px', border: 'none', borderRadius: '6px', backgroundColor: '#3d6c59', color: 'var(--bg-card)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>1</button>
                <button style={{ padding: '4px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer' }}>2</button>
                <button style={{ padding: '4px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer' }}>3</button>
                <span style={{ padding: '4px', color: 'var(--text-muted)' }}>...</span>
                <button style={{ padding: '4px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer' }}>31</button>
                <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)', cursor: 'pointer' }}>&gt;</button>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div style={{ display: 'flex', gap: '24px' }}>
            
            {/* Revenue Trend */}
            <div style={{ flex: '1.2', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>Revenue Trend</h3>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '6px' }}>
                  This Month <ChevronDown size={12} />
                </div>
              </div>
              
              {/* CSS Area Chart Mockup */}
              <div style={{ height: '160px', position: 'relative', borderLeft: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', paddingLeft: '8px', paddingBottom: '20px' }}>
                <div style={{ position: 'absolute', top: '0', left: '-30px', fontSize: '10px', color: 'var(--text-muted)' }}>$60k</div>
                <div style={{ position: 'absolute', top: '50px', left: '-30px', fontSize: '10px', color: 'var(--text-muted)' }}>$40k</div>
                <div style={{ position: 'absolute', top: '100px', left: '-30px', fontSize: '10px', color: 'var(--text-muted)' }}>$20k</div>
                <div style={{ position: 'absolute', top: '150px', left: '-25px', fontSize: '10px', color: 'var(--text-muted)' }}>$0k</div>
                
                {/* Horizontal Grid lines */}
                <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '1px', backgroundColor: '#f8fafc' }}></div>
                <div style={{ position: 'absolute', top: '50px', left: '0', right: '0', height: '1px', backgroundColor: '#f8fafc' }}></div>
                <div style={{ position: 'absolute', top: '100px', left: '0', right: '0', height: '1px', backgroundColor: '#f8fafc' }}></div>
                
                {/* X Axis Labels */}
                <div style={{ position: 'absolute', bottom: '0', left: '10%', fontSize: '9px', color: 'var(--text-muted)' }}>May 1</div>
                <div style={{ position: 'absolute', bottom: '0', left: '30%', fontSize: '9px', color: 'var(--text-muted)' }}>May 8</div>
                <div style={{ position: 'absolute', bottom: '0', left: '50%', fontSize: '9px', color: 'var(--text-muted)' }}>May 15</div>
                <div style={{ position: 'absolute', bottom: '0', left: '70%', fontSize: '9px', color: 'var(--text-muted)' }}>May 21</div>
                <div style={{ position: 'absolute', bottom: '0', left: '90%', fontSize: '9px', color: 'var(--text-muted)' }}>May 24</div>

                {/* SVG Line / Area */}
                <svg width="100%" height="150" viewBox="0 0 100 150" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '20px', left: '0' }}>
                  <defs>
                    <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 0 120 C 10 90, 20 110, 30 70 S 50 100, 60 50 S 80 80, 95 30 L 95 150 L 0 150 Z" fill="url(#trendGradient)"/>
                  <path d="M 0 120 C 10 90, 20 110, 30 70 S 50 100, 60 50 S 80 80, 95 30" fill="none" stroke="#10b981" strokeWidth="2"/>
                  {/* Data Points */}
                  <circle cx="30" cy="70" r="3" fill="#fff" stroke="#10b981" strokeWidth="2" />
                  <circle cx="60" cy="50" r="3" fill="#fff" stroke="#10b981" strokeWidth="2" />
                  <circle cx="95" cy="30" r="3" fill="#fff" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Payment Method Distribution */}
            <div style={{ flex: '1', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px', textAlign: 'center' }}>Payment Method Distribution</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flex: '1' }}>
                <div style={{ 
                  width: '100px', height: '100px', borderRadius: '50%', 
                  background: 'conic-gradient(#10b981 0% 42%, #3b82f6 42% 75%, #a855f7 75% 92%, #f59e0b 92% 99%, #cbd5e1 99% 100%)',
                  position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--bg-card)', borderRadius: '50%' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Cash', color: '#10b981', pct: '42%' },
                    { label: 'Card', color: '#3b82f6', pct: '33%' },
                    { label: 'UPI', color: '#a855f7', pct: '17%' },
                    { label: 'Insurance', color: '#f59e0b', pct: '7%' },
                    { label: 'Others', color: '#cbd5e1', pct: '1%' }
                  ].map(lg => (
                    <div key={lg.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: lg.color }}></div>
                      <span style={{ width: '60px' }}>{lg.label}</span>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{lg.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue by Treatment */}
            <div style={{ flex: '1', backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px', textAlign: 'center' }}>Revenue by Treatment</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flex: '1' }}>
                <div style={{ 
                  width: '100px', height: '100px', borderRadius: '50%', 
                  background: 'conic-gradient(#8b5cf6 0% 35%, #ec4899 35% 56%, #0ea5e9 56% 75%, #14b8a6 75% 88%, #64748b 88% 100%)',
                  position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--bg-card)', borderRadius: '50%' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Restorative', color: '#8b5cf6', pct: '35%' },
                    { label: 'Cosmetic', color: '#ec4899', pct: '21%' },
                    { label: 'Orthodontics', color: '#0ea5e9', pct: '19%' },
                    { label: 'Oral Surgery', color: '#14b8a6', pct: '13%' },
                    { label: 'Others', color: 'var(--text-secondary)', pct: '12%' }
                  ].map(lg => (
                    <div key={lg.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: lg.color }}></div>
                      <span style={{ width: '70px' }}>{lg.label}</span>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{lg.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Widgets */}
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Quick Summary */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Quick Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '50%' }}>
                    <DollarSign size={16} color="#10b981" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Pending Payments</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>35 Invoices</p>
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>$ 12,350</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ padding: '8px', backgroundColor: '#fef2f2', borderRadius: '50%' }}>
                    <DollarSign size={16} color="#ef4444" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Overdue Payments</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>18 Invoices</p>
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>$ 6,100</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '50%' }}>
                    <Calendar size={16} color="#3b82f6" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Upcoming Due</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>9 Invoices</p>
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>$ 4,750</span>
              </div>

            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Payment Methods (Today)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💵</div>
                  Cash
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>$1,250</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💳</div>
                  Card
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>$1,200</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📱</div>
                  UPI
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>$600</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏥</div>
                  Insurance
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>$200</span>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed #cbd5e1' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold' }}>Total Collections</span>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>$3,250</span>
            </div>
          </div>

          {/* Recent Transactions */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>Recent Transactions</h3>
              <a href="#" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {transactions.map((tx, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: `${tx.color}15` }}>
                      {tx.amount.startsWith('+') ? <ArrowDownLeft size={14} color={tx.color} /> : tx.amount.startsWith('-') ? <ArrowUpRight size={14} color={tx.color} /> : <FileText size={14} color={tx.color} />}
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{tx.type}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.desc}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', color: tx.color }}>{tx.amount}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
