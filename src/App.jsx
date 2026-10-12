import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import TabelKontrak from './components/TabelKontrak'
import ModalDetail from './components/ModalDetail'
import ImportModal from './components/ImportModal'
import StatsCard from './components/StatsCard'
import { getAllKontrak, addKontrak, updateKontrak, deleteKontrak } from './services/kontrakService'
import './App.css'

export default function App() {
  const [kontrakList, setKontrakList]   = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [selectedKontrak, setSelected]  = useState(null)
  const [showModal, setShowModal]       = useState(false)
  const [showImport, setShowImport]     = useState(false)
  const [isNew, setIsNew]               = useState(false)
  const [saving, setSaving]             = useState(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllKontrak()
      setKontrakList(data)
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data. Periksa koneksi atau konfigurasi Firebase.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const handleRowClick = (k) => { setSelected(k); setIsNew(false); setShowModal(true) }
  const handleTambah   = ()  => { setSelected(null); setIsNew(true); setShowModal(true) }

  const handleSave = async (formData) => {
    try {
      setSaving(true)
      if (isNew) {
        const { id, ...data } = formData
        await addKontrak(data)
      } else {
        await updateKontrak(formData.id, formData)
      }
      await loadData()
      setShowModal(false)
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setSaving(true)
      await deleteKontrak(id)
      await loadData()
      setShowModal(false)
    } catch (err) {
      alert('Gagal menghapus: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const totalSMU = kontrakList.reduce((s, k) => s + (Number(k.smuKontrak) || 0), 0)
  const totalAMD = kontrakList.reduce((s, k) => s + (Number(k.amdKontrak) || 0), 0)
  const countPO  = kontrakList.filter(k => k.keteranganLuncuran === 'PO').length
  const countVIP = kontrakList.filter(k => k.keteranganLuncuran === 'VIP').length

  const fmt = (val) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)} M`
    if (val >= 1_000_000)     return `${(val / 1_000_000).toFixed(0)} Jt`
    return val.toLocaleString('id-ID')
  }

  return (
    <div className="app">
      <Navbar onTambahKontrak={handleTambah} />

      <div className="app-content">
        <div className="stats-row">
          <StatsCard label="Total Kontrak"        value={kontrakList.length}         icon="K"   color="#003d82" />
          <StatsCard label="Total Kontrak Tagih"  value={`Rp ${fmt(totalSMU)}`}      icon="SMU" color="#28a745" />
          <StatsCard label="Total AMD Kontrak"    value={`Rp ${fmt(totalAMD)}`}      icon="AMD" color="#e67e00" />
          <StatsCard label="Status PO"            value={countPO}                    icon="PO"  color="#0066cc" />
          <StatsCard label="Status VIP"           value={countVIP}                   icon="VIP" color="#9c27b0" />
        </div>

        <div className="section-header">
          <div>
            <h2 className="section-title">Daftar Kontrak SKK / SKKO</h2>
            <p className="section-sub">Klik baris untuk edit detail dan keterangan luncuran</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {kontrakList.length === 0 && !loading && (
              <button className="btn-import" onClick={() => setShowImport(true)}>
                Import Data Excel
              </button>
            )}
            <button className="btn-refresh" onClick={loadData}>Refresh</button>
          </div>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Memuat data dari Firebase...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <span>{error}</span>
            <button onClick={loadData}>Coba lagi</button>
          </div>
        )}

        {!loading && !error && (
          <TabelKontrak data={kontrakList} onRowClick={handleRowClick} />
        )}
      </div>

      {showModal && (
        <ModalDetail
          kontrak={selectedKontrak}
          isNew={isNew}
          saving={saving}
          onClose={() => !saving && setShowModal(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onDone={loadData}
        />
      )}
    </div>
  )
}
