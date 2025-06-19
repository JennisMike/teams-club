import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'

const tvs = products.filter(p => p.category === 'tvs')

export default function TVsPage() {
  const [current, setCurrent] = useState(0)
  const visible = 3
  const start = Math.max(0, Math.min(current, tvs.length - visible))
  const end = start + visible
  return (
    <section className="py-5" style={{ minHeight: '80vh' }}>
      <div className="container mb-5">
        <div className="rounded-4 p-4 mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between" style={{ background: 'linear-gradient(90deg, #4a7cff 60%, #232c6b 100%)', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
          <div className="text-white text-md-start text-center mb-3 mb-md-0">
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.3rem', color: '#fff' }}>Televisions</h1>
            <p className="mb-0" style={{ fontSize: '1.1rem', color: '#fff', opacity: 0.95 }}>
              Experience stunning visuals and smart features with our range of TVs.
            </p>
          </div>
          {tvs.length > 0 && (
            <img 
              src={tvs[0].image} 
              alt="TV" 
              style={{ 
                width: '140px', 
                height: '90px', 
                objectFit: 'contain', 
                borderRadius: '18px', 
                background: '#fff', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)' 
              }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-product.jpg';
              }}
            />
          )}
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <button className="btn btn-outline-info px-3 py-1" style={{ borderRadius: '50%' }} onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>&lt;</button>
          <div className="flex-grow-1 px-2">
            <div className="row flex-nowrap overflow-auto" style={{ scrollbarWidth: 'none' }}>
              {tvs.slice(start, end).map(tv => (
                <div className="col-6 col-md-4" key={tv.id}>
                  <div className="card h-100" style={{ borderRadius: '20px', background: '#2d3250', border: '1px solid #444a6d', overflow: 'hidden' }}>
                    <img 
                      src={tv.image} 
                      alt={tv.name} 
                      className="card-img-top" 
                      style={{ height: '220px', objectFit: 'cover' }} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                    <div className="card-body d-flex flex-column text-start p-3">
                      <h5 className="fw-bold mb-2" style={{ color: '#fff' }}>{tv.name}</h5>
                      <div className="mt-auto">
                        <div className="d-flex align-items-center mb-2">
                          <span className="fw-bold me-2" style={{ color: '#4a7cff', fontSize: '1.2rem' }}>{tv.price.toLocaleString()} FCFA</span>
                          <span className="text-white-50 text-decoration-line-through" style={{ fontSize: '0.9rem' }}>{tv.originalPrice.toLocaleString()} FCFA</span>
                        </div>
                        <Link to={`/purchase/${tv.id}`} className="btn btn-primary px-4 fw-bold w-100" style={{ borderRadius: '12px' }}>Buy Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-outline-info px-3 py-1" style={{ borderRadius: '50%' }} onClick={() => setCurrent(Math.min(tvs.length - visible, current + 1))} disabled={current >= tvs.length - visible}>&gt;</button>
        </div>
      </div>
    </section>
  )
} 