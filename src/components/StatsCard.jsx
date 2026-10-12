import React from 'react'

export default function StatsCard({ label, value, icon, color }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: 1,
      minWidth: '180px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: `${color}18`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: '800',
        color: color,
        letterSpacing: '-0.5px',
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '24px', fontWeight: '700', color }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>{label}</div>
      </div>
    </div>
  )
}
