import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'

const others = products.filter(p => p.category === 'other')

export default function OtherProductsPage() {
  return (
    <section className="py-5" style={{ minHeight: '80vh' }}>
      <div className="container mb-5">
        <div className="rounded-4 p-4 mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between" style={{ background: 'linear-gradient(90deg, #b18fff 0%, #5e3dc4 100%)', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
          <div className="text-white text-md-start text-center mb-3 mb-md-0">
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.3rem', color: '#fff' }}>Other Products</h1>
            <p className="mb-0" style={{ fontSize: '1.1rem', color: '#fff', opacity: 0.95 }}>
              Explore more great deals on home essentials and gadgets.
            </p>
          </div>
          {others.length > 0 && (
            <img 
              src={others[0].image} 
              alt="Product" 
              style={{ 
                width: '120px', 
                height: '120px', 
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
        <div className="row g-4">
          {others.map(item => (
            <div className="col-6 col-lg-3 mb-4" key={item.id}>
              <div className="card h-100" style={{ borderRadius: '20px', background: '#2d3250', border: '1px solid #444a6d', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="card-img-top" 
                  style={{ height: '220px', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                <div className="card-body d-flex flex-column text-start p-3">
                  <h5 className="fw-bold mb-2" style={{ color: '#fff' }}>{item.name}</h5>
                  <div className="mt-auto">
                    <div className="d-flex align-items-center mb-2">
                      <span className="fw-bold me-2" style={{ color: '#b18fff', fontSize: '1.2rem' }}>{item.price.toLocaleString()} FCFA</span>
                      <span className="text-white-50 text-decoration-line-through" style={{ fontSize: '0.9rem' }}>{item.originalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <Link to={`/purchase/${item.id}`} className="btn btn-primary px-4 fw-bold w-100" style={{ borderRadius: '12px' }}>Buy Now</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}