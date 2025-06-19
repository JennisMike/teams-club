import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
// import { useCart } from '../../context/CartContext'
import airFryerImg from '../../assets/products/airfryer.jpg'
import waterDispenserImg from '../../assets/products/water-dispenser.jpg'
import microwaveImg from '../../assets/products/oven.jpg'
// import kettleImg from '../../assets/products/electric-kettle.jpg'
// import toasterImg from '../../assets/products/toaster.jpg'
// import fanImg from '../../assets/products/fan.jpg'
// import ironImg from '../../assets/products/iron.jpg'
// import riceCookerImg from '../../assets/products/rice-cooker.jpg'

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description: "High-fidelity audio, noise cancellation",
    price: 120000,
    originalPrice: 150000,
    image: "/products/earbuds.jpg",
    rating: 4.2,
    reviews: 75,
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Fitness tracking, heart rate monitor, notifications",
    price: 85000,
    originalPrice: 100000,
    image: "/products/smartwatch.jpg",
    rating: 4.7,
    reviews: 120,
  },
  {
    id: 3,
    name: "Instant Camera",
    description: "Capture memories instantly, vintage look",
    price: 60000,
    originalPrice: 75000,
    image: "/products/camera.jpg",
    rating: 4.0,
    reviews: 50,
  },
  {
    id: 4,
    name: "Gaming Headset",
    description: "Immersive sound, comfortable design, built-in mic",
    price: 95000,
    originalPrice: 110000,
    image: "/products/headset.jpg",
    rating: 4.4,
    reviews: 90,
  },
  {
    id: 5,
    name: 'Air Fryer',
    image: airFryerImg,
    price: 45000,
    originalPrice: 50000,
    type: 'Air Fryers',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  },
  {
    id: 6,
    name: 'Water Dispenser',
    image: waterDispenserImg,
    price: 60000,
    originalPrice: 67000,
    type: 'Water Dispensers',
    gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
  },
  {
    id: 7,
    name: 'Microwave',
    image: microwaveImg,
    price: 70000,
    originalPrice: 78000,
    type: 'Microwaves',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  // {
  //   id: 8,
  //   name: 'Electric Kettle',
  //   image: kettleImg,
  //   price: 15000,
  //   originalPrice: 17000,
  //   type: 'Electric Kettles',
  //   gradient: 'linear-gradient(135deg, #ff5858 0%, #ffb347 100%)',
  // },
  // {
  //   id: 9,
  //   name: 'Toaster',
  //   image: toasterImg,
  //   price: 12000,
  //   originalPrice: 13500,
  //   type: 'Toasters',
  //   gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  // },
  // {
  //   id: 10,
  //   name: 'Fan',
  //   image: fanImg,
  //   price: 18000,
  //   originalPrice: 20000,
  //   type: 'Fans',
  //   gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
  // },
  // {
  //   id: 11,
  //   name: 'Iron',
  //   image: ironImg,
  //   price: 10000,
  //   originalPrice: 11500,
  //   type: 'Irons',
  //   gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  // },
  // {
  //   id: 12,
  //   name: 'Rice Cooker',
  //   image: riceCookerImg,
  //   price: 25000,
  //   originalPrice: 28000,
  //   type: 'Rice Cookers',
  //   gradient: 'linear-gradient(135deg, #ff5858 0%, #ffb347 100%)',
  // },
]

export default function FeaturedProducts() {
  const navigate = useNavigate()
  // const { addToCart } = useCart()

  return (
    <section className="py-5" style={{ background: 'none' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">
            <span className="gradient-text">Featured Products</span>
          </h2>
          <p className="lead text-light">Discover our most popular items</p>
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="col-md-6 col-lg-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="card h-100 glass-card" style={{ background: 'transparent', border: 'none' }}>
                <div className="position-relative">
                  <div className="ratio ratio-1x1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top object-fit-cover"
                    />
                  </div>
                  {Math.round((1 - product.price / product.originalPrice) * 100) > 0 && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-danger">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">{product.name}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.description}
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'text-warning' : 'text-gray-400'
                        }`}
                      />
                    ))}
                    <span className="ms-2 text-sm text-light">({product.reviews} reviews)</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0">{product.price.toLocaleString()} FCFA</span>
                    {product.originalPrice && (
                      <span className="text-muted text-decoration-line-through small">
                        {product.originalPrice.toLocaleString()} FCFA
                      </span>
                    )}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Buy Now
                  </button>
                  {/* <button
                    className="btn btn-outline-primary w-100 mt-2"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-5">
          <h2 className="fw-bold mb-2" style={{ fontSize: '2.2rem', color: '#fff', letterSpacing: '1px' }}>
            More Home Essentials
          </h2>
          <p className="fw-bold mb-4" style={{ fontSize: '1.3rem', color: '#fff' }}>
            Discover more appliances for your home
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
                  <h5 className="fw-bold mb-2 text-white" style={{ fontSize: '1.1rem', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>{product.name}</h5>
                  <div className="mb-2">
                    <span className="fw-bold text-white me-2" style={{ fontSize: '1rem' }}>{product.price.toLocaleString()} FCFA</span>
                    <span className="text-white-50 text-decoration-line-through me-2" style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>{product.originalPrice.toLocaleString()} FCFA</span>
                    <span className="badge bg-warning text-dark" style={{ fontWeight: 600, fontSize: '0.9rem' }}>-10%</span>
                  </div>
                  <div className="d-flex gap-2 mt-2 w-100 justify-content-center">
                    <button
                      className="btn btn-transparent px-4 fw-bold product-btn"
                      style={{ borderRadius: '12px', fontSize: '0.95rem', background: 'transparent', color: '#fff', border: '2px solid #fff', transition: 'background 0.3s, color 0.3s' }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-transparent px-3 fw-semibold product-btn"
                      style={{ borderRadius: '12px', fontSize: '0.95rem', background: 'transparent', color: '#fff', border: '2px solid #fff', transition: 'background 0.3s, color 0.3s' }}
                      onClick={() => navigate(`/products/${product.type.toLowerCase().replace(/ /g, '-')}`)}
                    >
                      View All {product.type}
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