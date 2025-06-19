import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import IceCreamMachinesSection from './IceCreamMachinesSection'
import tv from '../../assets/products/tv1.jpg'
import tv2 from '../../assets/products/tv2.jpg'
import tv3 from '../../assets/products/tv3.jpg'

// Overlay section with product image background
function OverlayProductHero() {
  const navigate = useNavigate()
  return (
    <section
      className="d-flex align-items-center justify-content-center position-relative"
      style={{
        minHeight: '340px',
        background: 'url(/assets/products/fridge.jpg) center/cover no-repeat',
        borderRadius: '36px',
        margin: '2rem 0',
        boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
        overflow: 'hidden',
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: 'rgba(30, 30, 60, 0.45)', zIndex: 1 }}
      />
      <div className="container position-relative z-2 text-center py-5">
        <h2 className="fw-bold mb-3 text-white" style={{ fontSize: '2.2rem', textShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
          Discover Our Best-Selling Fridges currently on a 10% discount
        </h2>
        <p className="mb-4 text-white-50" style={{ fontSize: '1.1rem' }}>
          Keep your food fresh and your drinks cool with our top-rated fridges
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
          <button className="btn btn-primary btn-lg px-4 fw-bold" style={{ borderRadius: '16px', fontSize: '1.1rem' }} onClick={() => navigate('/products/fridges')}>
            View All Fridges
          </button>
          {/* <button className="btn btn-secondary btn-lg px-4 fw-bold" style={{ borderRadius: '16px', fontSize: '1.1rem' }} onClick={() => navigate('/product/1')}>
            Buy Now
          </button> */}
        </div>
      </div>
    </section>
  )
}

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description: "High-fidelity audio, noise cancellation",
    price: 120000,
    image: tv,
    alignment: 'left',
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Fitness tracking, heart rate monitor, notifications",
    price: 85000,
    image: "/products/smartwatch.jpg",
    alignment: 'right',
  },
  {
    id: 3,
    name: "Instant Camera",
    description: "Capture memories instantly, vintage look",
    price: 60000,
    image: tv3,
    alignment: 'left',
  },
]

export default function CurvedProductDisplay() {
  const navigate = useNavigate()

  return (
    <>
      <OverlayProductHero />
      <section className="py-5 curved-product-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">
              <span className="gradient-text">Unique Finds</span>
            </h2>
            <p className="lead text-light">Explore our hand-picked collection with unique designs</p>
          </div>

          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`row g-0 align-items-center mb-5 product-card-curved${
                product.alignment === 'right' ? ' product-card-curved-right' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`col-md-6 p-0${
                product.alignment === 'left' ? ' order-md-1' : ' order-md-2'
              }`}>
                <div className="product-image-curved ratio ratio-16x9">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-fit-cover"
                  />
                </div>
              </div>
              <div className={`col-md-6 p-md-5 p-4${
                product.alignment === 'left' ? ' order-md-2' : ' order-md-1'
              }`}>
                <h3 className="h4 mb-2">{product.name}</h3>
                <p className="text-light mb-3">{product.description}</p>
                <h4 className="h5 mb-4">{product.price.toLocaleString()} FCFA</h4>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="btn btn-primary custom-button"
                  style={{ borderRadius: '16px', fontSize: '1.1rem' }}
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <IceCreamMachinesSection />
      <style>{`
        .product-card-curved {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        /* This will target the text column and vertically center its content */
        .product-card-curved .col-md-6:not(:has(.product-image-curved)) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        .glass-card {
          background: none !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      `}</style>
    </>
  )
} 