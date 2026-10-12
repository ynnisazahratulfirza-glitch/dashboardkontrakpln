import React, { useState } from 'react'
import { KETERANGAN_LUNCURAN_OPTIONS } from '../data/kontrakData'
import './TabelKontrak.css'

function getBadgeClass(val) {
  const map = {
    PO: 'badge-PO',
    IPMS: 'badge-IPMS',
    VIP: 'badge-VIP',
    VENDOR: 'badge-VENDOR',
    MUP: 'badge-MUP',
    LOGISTIK: 'badge-LOGISTIK',
    PP: 'badge-PP',
    MAGA: 'badge-MAGA',
  }
  return map[val] || 'badge-default'
}

function formatRp(val) {
  if (!val && val !== 0) return '-'
  return Number(val).toLocaleString('id-ID')
}

export default function TabelKontrak({ data, onRowClick }) {
  const [search, setSearch] = useState('')
  const [filterLuncuran, setFilterLuncuran] = useState('')

  const filtered = data.filter(item => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      item.nomorKontrak?.toLowerCase().includes(q) ||
      item.noPir?.toLowerCase().includes(q) ||
      item.uraianPekerjaan?.toLowerCase().includes(q) ||
      item.pelaksana?.toLowerCase().includes(q) ||
      item.po?.toLowerCase().includes(q)

    const matchFilter = !filterLuncuran || item.keteranganLuncuran === filterLuncuran

    return matchSearch && matchFilter
  })

  return (
    <div className="tabel-wrapper">
      <div className="tabel-toolbar">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            className="search-input"
            type="text"
            placeholder="Cari nomor kontrak, PIR, vendor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterLuncuran}
            onChange={e => setFilterLuncuran(e.target.value)}
          >
            <option value="">Semua Luncuran</option>
            {KETERANGAN_LUNCURAN_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="count-info">
          Menampilkan <strong>{filtered.length}</strong> dari <strong>{data.length}</strong> kontrak
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c0ccd8" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <p>Tidak ada data kontrak</p>
          <small>Coba ubah filter atau tambah kontrak baru</small>
        </div>
      ) : (
        <table className="tabel-kontrak">
          <thead>
            <tr>
              <th>No</th>
              <th>No PIR</th>
              <th>Nomor Kontrak</th>
              <th>Uraian Pekerjaan</th>
              <th>Periode Kontrak</th>
              <th>Pelaksana / Vendor</th>
              <th>SMU Kontrak</th>
              <th>AMD Kontrak</th>
              <th>PO</th>
              <th>Ket. Luncuran</th>
              <th>Posisi Berkas</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={item.id} onClick={() => onRowClick(item)} title="Klik untuk edit">
                <td className="cell-no">{idx + 1}</td>
                <td className="cell-pir">{item.noPir || '-'}</td>
                <td className="cell-kontrak">{item.nomorKontrak}</td>
                <td className="cell-uraian">{item.uraianPekerjaan || '-'}</td>
                <td className="cell-periode">{item.periodeKontrak || '-'}</td>
                <td className="cell-pelaksana">{item.pelaksana || '-'}</td>
                <td className="cell-smu">Rp {formatRp(item.smuKontrak)}</td>
                <td className="cell-amd">Rp {formatRp(item.amdKontrak)}</td>
                <td className="cell-po">{item.po || '-'}</td>
                <td>
                  <span className={`badge-luncuran ${getBadgeClass(item.keteranganLuncuran)}`}>
                    {item.keteranganLuncuran || '-'}
                  </span>
                </td>
                <td>
                  {item.posisiBerkas ? (
                    <span className="badge-posisi">{item.posisiBerkas}</span>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
