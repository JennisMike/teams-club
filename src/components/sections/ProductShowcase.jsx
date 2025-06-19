import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import fridgeImg from '../../assets/products/fridge.jpg'
import cookerImg from '../../assets/products/cooker.jpg'
import washingMachineImg from '../../assets/products/washing-machine.jpg'
import blenderImg from '../../assets/products/blender.jpg'

const products = [
  {
    id: 1,
    name: 'Fridge',
    image: fridgeImg,
    price: 350000,
    originalPrice: 389000,
    type: 'Fridges',
  },
  {
    id: 2,
    name: 'Electric Gas Cooker',
    image: cookerImg,
    price: 220000,
    originalPrice: 245000,
    type: 'Cookers',
  },
  {
    id: 3,
    name: 'Washing Machine',
    image: washingMachineImg,
    price: 180000,
    originalPrice: 200000,
    type: 'Washing Machines',
  },
  {
    id: 4,
    name: 'Blender',
    image: blenderImg,
    price: 35000,
    originalPrice: 39000,
    type: 'Blenders',
  },
]

export default function ProductShowcase() {
  const navigate = useNavigate()

  return (
    <section className="py-5" style={{ background: 'none' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#fff', letterSpacing: '1px' }}>
            TEAMS CLUB
          </h2>
          <p className="fw-bold mb-4" style={{ fontSize: '2.2rem', color: '#fff' }}>
            Shop the Hottest Products!
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="col-12 col-sm-6 col-lg-3 d-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div
                className="w-100 position-relative d-flex flex-column justify-content-end align-items-center"
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  minHeight: '320px',
                  height: '100%',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
                  background: `#222`,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
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
                {/* Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(30,30,60,0.75) 60%, rgba(30,30,60,0.15) 100%)',
                    zIndex: 2,
                  }}
                />
                {/* Content */}
                <div
                  className="w-100 d-flex flex-column align-items-center justify-content-end text-center px-3 pb-4"
                  style={{ position: 'relative', zIndex: 3 }}
                >
                  <h5 className="fw-bold mb-2 text-white" style={{ fontSize: '1.3rem', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>{product.name}</h5>
                  <div className="mb-2">
                    <span className="fw-bold text-white me-2" style={{ fontSize: '1.1rem' }}>{product.price.toLocaleString()} FCFA</span>
                    <span className="text-white-50 text-decoration-line-through me-2" style={{ fontSize: '0.85rem', verticalAlign: 'middle' }}>{product.originalPrice.toLocaleString()} FCFA</span>
                    <span className="badge bg-warning text-dark" style={{ fontWeight: 600, fontSize: '0.95rem' }}>-10%</span>
                  </div>
                  <div className="d-flex gap-2 mt-2 w-100 justify-content-center">
                    <button
                      className="btn btn-transparent px-4 fw-bold product-btn"
                      style={{ borderRadius: '12px', fontSize: '1rem', background: 'transparent', color: '#fff', border: 'none', transition: 'background 0.3s, color 0.3s' }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-transparent px-3 fw-semibold product-btn"
                      style={{ borderRadius: '12px', fontSize: '1rem', background: 'transparent', color: '#fff', border: 'none', transition: 'background 0.3s, color 0.3s' }}
                      onClick={() => navigate(`/products/${product.type.toLowerCase().replace(/ /g, '-')}`)}
                    >
                      View All
                      {/* {product.type} */}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .product-btn:hover, .product-btn:focus {
          background: #f45cb4 !important;
          color: #fff !important;
          border-color: #f45cb4 !important;
        }
      `}</style>
    </section>
  )
} 