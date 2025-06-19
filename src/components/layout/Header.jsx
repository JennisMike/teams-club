import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'

const productLinks = [
  { name: 'Fridges', path: '/products/fridges' },
  { name: 'TVs', path: '/products/tvs' },
  { name: 'Cookers', path: '/products/cookers' },
  { name: 'Kitchen Appliances', path: '/products/kitchen-appliances' },
  { name: 'Other Products', path: '/products/others' },
]

export default function Header() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-100" style={{ background: 'transparent', border: 'none' }}>
      <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img 
            src="/logo.png" 
            alt="Teams Club" 
            style={{ height: '48px', width: '48px', borderRadius: '16px', objectFit: 'cover', background: 'linear-gradient(135deg, #f45cb4 0%, #FFD600 100%)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          />
          <div className="ms-3 d-flex flex-column">
            <div
              className="fw-bold header-title"
              style={{ fontSize: '2rem', color: '#fff', lineHeight: 1 }}
            >
              Teams Club
            </div>
            <div
              className="fw-normal header-subtitle"
              style={{ fontSize: '1rem', color: '#fff', opacity: 0.85 }}
            >
              Premium Tech at Unbeatable Prices
            </div>
          </div>
        </Link>
        <div className="d-flex align-items-center gap-2 gap-md-3 position-relative">
          <button
            className="btn btn-outline-light px-3 px-md-4 py-2 fw-semibold me-1 me-md-2 header-btn"
            style={{ borderRadius: '2rem', background: 'rgba(255,255,255,0.10)', border: '1px solid #fff', color: '#fff', fontSize: '1rem', letterSpacing: '0.5px' }}
            onClick={() => navigate('/track-order')}
          >
            Track Order
          </button>
          <button
            className="btn btn-light px-2 px-md-3 fw-bold header-btn"
            style={{ borderRadius: '2rem', color: '#232c6b', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.5px' }}
            onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
          >
            {lang === 'EN' ? 'FR' : 'EN'}
          </button>
          {/* Hamburger menu */}
          <button
            className="btn btn-outline-light d-flex align-items-center justify-content-center ms-1 header-btn"
            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, background: 'rgba(255,255,255,0.10)', border: '1px solid #fff' }}
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Bars3Icon style={{ width: '1.5em', height: '1.5em', color: '#fff' }} />
          </button>
          {/* Dropdown menu */}
          {menuOpen && (
            <div
              className="position-absolute end-0 mt-2 p-3 rounded-4 shadow-lg"
              style={{ top: '100%', minWidth: '200px', background: 'rgba(30,30,60,0.98)', zIndex: 1000 }}
            >
              {productLinks.map(link => (
                <div key={link.path} className="mb-2">
                  <a
                    href={link.path}
                    className="text-white text-decoration-none fw-semibold d-block py-1 px-2 rounded-2"
                    style={{ transition: 'background 0.2s' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .header-title { font-size: 1.2rem !important; }
          .header-subtitle { font-size: 0.8rem !important; }
          .header-btn { font-size: 0.85rem !important; padding: 0.3rem 0.7rem !important; }
        }
      `}</style>
    </header>
  )
} 