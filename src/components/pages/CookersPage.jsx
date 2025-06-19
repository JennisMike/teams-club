import React from 'react'

const cookers = [
  { id: 1, name: 'Nasco 4-Burner Gas Cooker', image: '/assets/products/cooker.jpg', price: 220000 },
  { id: 2, name: 'Roch Electric Cooker', image: '/assets/products/cooker.jpg', price: 185000 },
  { id: 3, name: 'Binatone Table Top Cooker', image: '/assets/products/cooker.jpg', price: 95000 },
]

export default function CookersPage() {
  return (
    <section className="py-5" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h1 className="fw-bold mb-3" style={{ color: '#f45cb4', fontSize: '2.5rem' }}>Cookers</h1>
        <p className="mb-4 text-white-50" style={{ fontSize: '1.1rem' }}>
          Find the perfect cooker for your kitchen—gas, electric, and more.
        </p>
        <div className="row g-4">
          {cookers.map(cooker => (
            <div className="col-12 col-md-6 col-lg-4" key={cooker.id}>
              <div className="card h-100 text-center p-3" style={{ borderRadius: '20px', background: 'transparent', border: 'none' }}>
                <img src={cooker.image} alt={cooker.name} className="mb-3" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '14px' }} />
                <h5 className="fw-bold text-white mb-2">{cooker.name}</h5>
                <div className="mb-2" style={{ color: '#f45cb4', fontWeight: 700, fontSize: '1.2rem' }}>{cooker.price.toLocaleString()} FCFA</div>
                <button className="btn btn-primary px-4 fw-bold" style={{ borderRadius: '12px' }}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 