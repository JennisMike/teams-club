import React from 'react'
import { useNavigate } from 'react-router-dom'
// TODO: Replace with your actual images
import placeholder1 from '../../assets/products/ice-cream.jpg'
import placeholder2 from '../../assets/products/ice cream machine.jpg'

const iceCreamMachines = [
  {
    id: 101,
    name: 'Soft Serve Ice Cream Machine',
    image: placeholder1,
    description: 'Perfect for cafes and parties. Make delicious soft serve ice cream at home!',
  },
  {
    id: 102,
    name: 'Commercial Ice Cream Maker',
    image: placeholder2,
    description: 'High-capacity, easy to use, and perfect for businesses or large families.',
  },
]

export default function IceCreamMachinesSection() {
  const navigate = useNavigate()
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2" style={{ fontSize: '2.2rem', color: '#fff', letterSpacing: '1px' }}>
            Ice Cream Machines
          </h2>
          <p className="lead text-light mb-0">Chill out the summer with out best energy efficient ice cream🍦🍨 machines!</p>
        </div>
        <div className="icecream-flex-row">
          {iceCreamMachines.map((machine) => (
            <div
              key={machine.id}
              className="icecream-vertical-card position-relative overflow-hidden d-flex flex-column justify-content-end"
              style={{
                borderRadius: '32px',
                minHeight: '480px',
                maxWidth: '420px',
                background: `#1e225a`,
                boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                aspectRatio: '3/5',
                border: '2.5px solid #FFD600',
                flex: 1,
              }}
              onClick={() => navigate(`/product/${machine.id}`)}
              tabIndex={0}
              role="button"
              aria-label={`View ${machine.name}`}
            >
              <img
                src={machine.image}
                alt={machine.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                  transition: 'filter 0.3s',
                }}
                className="icecream-img"
              />
              <div
                className="position-absolute w-100 bottom-0 start-0 d-flex flex-column align-items-center"
                style={{
                  zIndex: 2,
                  background: 'linear-gradient(to top, rgba(30,34,90,0.92) 80%, rgba(30,34,90,0.02) 100%)',
                  padding: '2.2rem 1.2rem 1.2rem 1.2rem',
                  borderRadius: '0 0 32px 32px',
                }}
              >
                <h3 className="fw-bold text-white mb-2" style={{ fontSize: '1.35rem', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>{machine.name}</h3>
                <p className="icecream-desc mb-0 text-white-50" style={{ fontSize: '1.05rem', minHeight: '48px', opacity: 0, maxHeight: 0, transition: 'opacity 0.3s, max-height 0.3s', textAlign: 'center' }}>
                  {machine.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .icecream-flex-row {
          display: flex;
          gap: 52px;
          justify-content: center;
          align-items: stretch;
        }
        @media (max-width: 767px) {
          .icecream-flex-row {
            flex-direction: column;
            gap: 16px;
          }
        }
        .icecream-vertical-card:hover, .icecream-vertical-card:focus {
          transform: translateY(-8px) scale(1.025);
        }
        .icecream-vertical-card:hover .icecream-img,
        .icecream-vertical-card:focus .icecream-img {
          filter: brightness(0.7) blur(1px);
        }
        .icecream-vertical-card:hover .icecream-desc,
        .icecream-vertical-card:focus .icecream-desc {
          opacity: 1;
          max-height: 120px;
        }
        @media (max-width: 767px) {
          .icecream-vertical-card {
            min-height: 340px;
            max-width: 100%;
            border-radius: 20px;
          }
          .icecream-vertical-card .w-100.p-4 {
            padding: 1.2rem !important;
          }
          .icecream-vertical-card h3 {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </section>
  )
} 