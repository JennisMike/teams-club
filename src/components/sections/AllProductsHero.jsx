import React from 'react'
import allProductsImg from '../../assets/products/allproducts.png'

export default function AllProductsHero() {
  return (
    <section className="py-5">
      <div className="container">
        <div
          className="mx-auto d-flex flex-column align-items-center justify-content-center position-relative"
          style={{
            borderRadius: '36px',
            background: 'rgba(110, 70, 200, 0.85)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
            border: '1.5px solid #b18fff',
            padding: '3rem 1rem',
            maxWidth: '1000px',
            minHeight: '340px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <img
            src={allProductsImg}
            alt="All Products"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          />
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
            <h3 className="fw-bold mb-2 text-white" style={{ fontSize: '2rem', letterSpacing: '1px' }}>
              All Our Bestsellers in One Place
            </h3>
            <p className="mb-0 text-white" style={{ fontSize: '1.1rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              Explore our full range of appliances and home tech
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 