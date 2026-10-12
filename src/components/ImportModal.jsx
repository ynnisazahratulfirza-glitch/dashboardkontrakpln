import React, { useState } from 'react'
import { seedKontrak } from '../data/seedData'
import { addKontrak } from '../services/kontrakService'

export default function ImportModal({ onClose, onDone }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle') // idle | running | done | error
  const [log, setLog] = useState([])

  const handleImport = async () => {
    setStatus('running')
    setLog([])
    let done = 0

    for (const item of seedKontrak) {
      try {
        await addKontrak(item)
        done++
        setProgress(Math.round((done / seedKontrak.length) * 100))
        setLog(prev => [...prev, { ok: true, text: `OK: ${item.nomorKontrak}` }])
      } catch (e) {
        setLog(prev => [...prev, { ok: false, text: `GAGAL: ${item.nomorKontrak} — ${e.message}` }])
      }
    }

    setStatus('done')
    setTimeout(() => {
      onDone()
      onClose()
    }, 1500)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '540px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg,#003d82,#0055b3)', color: '#fff',
          padding: '20px 24px', borderRadius: '16px 16px 0 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#ffcc00' }}>Import Data Kontrak</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
              {seedKontrak.length} data dari file Excel
            </div>
          </div>
          <button onClick={onClose} disabled={status === 'running'} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px'
          }}>X</button>
        </div>

        <div style={{ padding: '24px' }}>
          {status === 'idle' && (
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
              Data dari Excel akan dimasukkan ke Firebase Firestore.<br />
              Pastikan Rules Firestore sudah diset ke <strong>allow read, write: if true</strong>.
            </p>
          )}

          {status !== 'idle' && (
            <>
              <div style={{
                background: '#f0f4f8', borderRadius: '8px', height: '10px',
                overflow: 'hidden', marginBottom: '12px'
              }}>
                <div style={{
                  height: '100%', background: '#003d82',
                  width: `${progress}%`, transition: 'width 0.3s'
                }} />
              </div>
              <div style={{ fontSize: '13px', color: '#003d82', fontWeight: '600', marginBottom: '12px' }}>
                {progress}% — {status === 'done' ? 'Selesai!' : 'Sedang mengimpor...'}
              </div>
              <div style={{
                background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
                padding: '10px', maxHeight: '180px', overflowY: 'auto', fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                {log.map((l, i) => (
                  <div key={i} style={{ color: l.ok ? '#28a745' : '#dc3545', marginBottom: '3px' }}>
                    {l.text}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{
          padding: '16px 24px', borderTop: '1px solid #e2e8f0',
          display: 'flex', justifyContent: 'flex-end', gap: '12px'
        }}>
          <button onClick={onClose} disabled={status === 'running'} style={{
            background: '#f1f5f9', border: '1.5px solid #e2e8f0',
            padding: '10px 20px', borderRadius: '8px', fontSize: '14px',
            fontWeight: '600', color: '#6c757d', cursor: 'pointer'
          }}>
            Batal
          </button>
          {status === 'idle' && (
            <button onClick={handleImport} style={{
              background: '#003d82', border: 'none', padding: '10px 24px',
              borderRadius: '8px', fontSize: '14px', fontWeight: '700',
              color: '#fff', cursor: 'pointer'
            }}>
              Mulai Import
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
