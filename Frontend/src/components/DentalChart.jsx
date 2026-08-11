import React, { useState, useEffect } from 'react';
import DentalChartSVG from './DentalChartSVG';

const CONDITIONS_CONFIG = [
  { label: 'healthy', fillColor: '#ffffff', outlineColor: '#64748b' },
  { label: 'caries', fillColor: '#ef4444', outlineColor: '#991b1b' },
  { label: 'filling', fillColor: '#38bdf8', outlineColor: '#0369a1' },
  { label: 'watch', fillColor: '#fde047', outlineColor: '#a16207' }
];

export default function DentalChart({ patient, onChangeChart }) {
  const [selectedTooth, setSelectedTooth] = useState(null);
  
  const chartData = patient?.chart || {};
  // Normalize JSON initial state if patient chart is empty
  // Actually, we'll just let the patient chart state dictate conditions
  // The structure of chartData: { "teeth-16": { label: "caries" }, ... }

  const handleToothClick = (toothId) => {
    // If the same tooth is clicked again, deselect it
    if (selectedTooth === toothId) {
      setSelectedTooth(null);
    } else {
      setSelectedTooth(toothId);
    }
  };

  const handleUpdateCondition = (label) => {
    if (!selectedTooth) return;

    if (label === 'healthy') {
      const newChart = { ...chartData };
      delete newChart[selectedTooth];
      onChangeChart(patient.id, newChart);
    } else {
      onChangeChart(patient.id, {
        ...chartData,
        [selectedTooth]: { label }
      });
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="ehr-header">
        <div>
          <h2 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>2D Clinical Dental Chart</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Interactive 2D SVG map. Click any tooth to update its condition.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', minHeight: '500px' }}>
        
        {/* SVG Canvas Area */}
        <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <DentalChartSVG 
            selectedTooth={selectedTooth}
            toothConditions={chartData}
            conditionsConfig={CONDITIONS_CONFIG}
            onToothClick={handleToothClick}
          />
        </div>

        {/* Editor Sidebar */}
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {!selectedTooth ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b', fontSize: '13px', textAlign: 'center', padding: '24px' }}>
              Select a tooth from the 2D model on the left to document clinical conditions.
            </div>
          ) : (
            <>
              <div style={{ padding: '16px', backgroundColor: '#f0fdfa', borderRadius: '12px', border: '1px solid #14b8a6' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0f766e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Tooth #{selectedTooth.replace('teeth-', '')}
                </h3>
              </div>

              {/* Conditions Selection */}
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>
                  Clinical Condition
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {CONDITIONS_CONFIG.map(cond => {
                    const isActive = (chartData[selectedTooth]?.label || 'healthy') === cond.label;
                    return (
                      <button
                        key={cond.label}
                        onClick={() => handleUpdateCondition(cond.label)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#f8fafc' : '#ffffff',
                          border: '1px solid',
                          borderColor: isActive ? 'var(--primary-teal)' : '#e2e8f0',
                          textAlign: 'left',
                          transition: 'all 0.15s'
                        }}
                      >
                        <span style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '4px', 
                          backgroundColor: cond.fillColor || '#ffffff',
                          border: `1px solid ${cond.outlineColor || '#cbd5e1'}`
                        }}></span>
                        <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--primary-teal)' : 'var(--text-primary)', textTransform: 'capitalize' }}>
                          {cond.label}
                        </span>
                        {isActive && (
                          <span style={{ marginLeft: 'auto', color: 'var(--primary-teal)' }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
