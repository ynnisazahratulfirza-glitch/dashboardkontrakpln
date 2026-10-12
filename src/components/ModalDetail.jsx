import React, { useState, useEffect } from 'react'
import { KETERANGAN_LUNCURAN_OPTIONS, POSISI_BERKAS_OPTIONS } from '../data/kontrakData'
import './ModalDetail.css'

export default function ModalDetail({ kontrak, onClose, onSave, onDelete, isNew, saving }) {
  const [form, setForm] = useState({
    noPir: '',
    nomorKontrak: '',
    uraianPekerjaan: '',
    periodeKontrak: '',
    pelaksana: '',
    smuKontrak: '',
    amdKontrak: '',
    po: '',
    keteranganLuncuran: 'PO',
    posisiBerkas: '',
  })

  useEffect(() => {
    if (kontrak) {
      setForm({ ...kontrak })
    }
  }, [kontrak])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!form.nomorKontrak.trim()) {
      alert('Nomor Kontrak tidak boleh kosong!')
      return
    }
    onSave(form)
  }

  const formatRupiah = (val) => {
    if (!val) return ''
    return Number(val).toLocaleString('id-ID')
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && !saving && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h2>{isNew ? 'Tambah Kontrak Baru' : 'Detail & Edit Kontrak'}</h2>
            {!isNew && (
              <p>Nomor Kontrak: {kontrak?.nomorKontrak}</p>
            )}
          </div>
          <button className="modal-close" onClick={onClose} disabled={saving}>X</button>
        </div>

        <div className="modal-body">
          <div className="modal-grid-2">
            <div className="field-group">
              <label>Nomor PRK</label>
              <input
                type="text"
                value={form.noPir}
                onChange={e => handleChange('noPir', e.target.value)}
                placeholder="Contoh: 2026.DRKR.1.002"
              />
            </div>
            <div className="field-group">
              <label>Nomor Kontrak *</label>
              <input
                type="text"
                value={form.nomorKontrak}
                onChange={e => handleChange('nomorKontrak', e.target.value)}
                placeholder="Contoh: 4600-SPB/JNM.02.01F/..."
              />
            </div>
          </div>

          <div className="field-group">
            <label>Uraian Pekerjaan</label>
            <textarea
              value={form.uraianPekerjaan}
              onChange={e => handleChange('uraianPekerjaan', e.target.value)}
              placeholder="Deskripsi pekerjaan..."
            />
          </div>

          <div className="modal-grid-2">
            <div className="field-group">
              <label>Periode Kontrak</label>
              <input
                type="text"
                value={form.periodeKontrak}
                onChange={e => handleChange('periodeKontrak', e.target.value)}
                placeholder="Contoh: 1 Maret 2026 - 30 Agustus 2026"
              />
            </div>
            <div className="field-group">
              <label>Pelaksana / Vendor</label>
              <input
                type="text"
                value={form.pelaksana}
                onChange={e => handleChange('pelaksana', e.target.value)}
                placeholder="Nama perusahaan..."
              />
            </div>
          </div>

          <div className="modal-grid-2">
            <div className="field-group">
              <label>Kontrak Tagih (Rp)</label>
              <input
                type="number"
                value={form.smuKontrak}
                onChange={e => handleChange('smuKontrak', e.target.value)}
                placeholder="0"
              />
              {form.smuKontrak ? (
                <small style={{ color: '#0066cc', marginTop: '4px', display: 'block' }}>
                  Rp {formatRupiah(form.smuKontrak)}
                </small>
              ) : null}
            </div>
            <div className="field-group">
              <label>AMD Kontrak (Rp)</label>
              <input
                type="number"
                value={form.amdKontrak}
                onChange={e => handleChange('amdKontrak', e.target.value)}
                placeholder="0"
              />
              {form.amdKontrak ? (
                <small style={{ color: '#0066cc', marginTop: '4px', display: 'block' }}>
                  Rp {formatRupiah(form.amdKontrak)}
                </small>
              ) : null}
            </div>
          </div>

          <div className="modal-grid-2">
            <div className="field-group">
              <label>Nomor PO</label>
              <input
                type="text"
                value={form.po}
                onChange={e => handleChange('po', e.target.value)}
                placeholder="Contoh: 3500498464"
              />
            </div>
            <div className="field-group">
              <label>Keterangan Luncuran</label>
              <select
                value={form.keteranganLuncuran}
                onChange={e => handleChange('keteranganLuncuran', e.target.value)}
              >
                <option value="">-- Pilih --</option>
                {KETERANGAN_LUNCURAN_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-grid-2">
            <div className="field-group">
              <label>Posisi Berkas</label>
              <select
                value={form.posisiBerkas}
                onChange={e => handleChange('posisiBerkas', e.target.value)}
              >
                <option value="">-- Pilih --</option>
                {POSISI_BERKAS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {!isNew && (
            <button className="btn-delete" disabled={saving} onClick={() => {
              if (window.confirm('Yakin hapus kontrak ini?')) onDelete(form.id)
            }}>
              Hapus
            </button>
          )}
          <button className="btn-cancel" disabled={saving} onClick={onClose}>Batal</button>
          <button className="btn-save" disabled={saving} onClick={handleSave}>
            {saving ? 'Menyimpan...' : isNew ? 'Simpan Kontrak' : 'Update Kontrak'}
          </button>
        </div>
      </div>
    </div>
  )
}
