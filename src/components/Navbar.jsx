import React from 'react'
import './Navbar.css'

export default function Navbar({ onTambahKontrak }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img
            src="/images (5).jpg"
            alt="Logo PLN"
            className="logo-img"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="navbar-title">
            <span className="title-main">PLN</span>
            <span className="title-sub">Dashboard Kontrak SKK/SKKO</span>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <span className="navbar-unit">UP3 TPI SAR</span>
      </div>
      <div className="navbar-right">
        <button className="btn-tambah" onClick={onTambahKontrak}>
          + Tambah Kontrak
        </button>
      </div>
    </nav>
  )
}
