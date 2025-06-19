import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

// Mock product data - replace with Supabase data later
const mockProduct = {
  id: 1,
  name: "Smart LED TV 55\"",
  longDescription: `Experience stunning visuals with our 55\" Smart LED TV. Features include:
    • 4K Ultra HD resolution for crystal-clear picture quality
    • Smart TV capabilities with built-in apps
    • HDR technology for enhanced contrast and colors
    • Multiple HDMI ports for all your devices
    • Built-in WiFi for seamless streaming
    • Voice control compatibility
    • Energy-efficient design`,
  images: [
    "/products/tv-1.jpg",
    "/products/tv-2.jpg",
    "/products/tv-3.jpg",
    "/products/tv-4.jpg"
  ],
  features: [
    "4K Ultra HD Resolution",
    "Smart TV Features",
    "HDR Technology",
    "Multiple HDMI Ports",
    "Built-in WiFi",
    "Voice Control"
  ],
  specifications: {
    "Screen Size": "55 inches",
    "Resolution": "3840 x 2160",
    "Refresh Rate": "120Hz",
    "HDMI Ports": "4",
    "USB Ports": "2",
    "Power Consumption": "120W"
  }
}

export default function ProductDescription() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-vh-100 bg-dark text-white py-5">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-link text-light text-decoration-none mb-4"
        >
          <ChevronLeftIcon className="h-5 w-5 me-1" />
          Back to Purchase
        </button>

        <div className="glass-card p-4" style={{ background: 'transparent', border: 'none' }}>
          <h1 className="display-4 fw-bold mb-4">{mockProduct.name} - Full Details</h1>
          
          <div className="mb-5">
            <h2 className="h4 mb-3">Overview</h2>
            <p className="lead text-light">{mockProduct.longDescription}</p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <h2 className="h4 mb-3">Key Features</h2>
              <ul className="list-unstyled">
                {mockProduct.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="d-flex align-items-center mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <span className="badge bg-primary rounded-pill me-2">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h2 className="h4 mb-3">Specifications</h2>
              <ul className="list-unstyled">
                {Object.entries(mockProduct.specifications).map(([key, value], index) => (
                  <motion.li
                    key={key}
                    className="d-flex justify-content-between mb-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <span className="fw-bold">{key}:</span>
                    <span>{value}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">More Images</h2>
            <div className="row g-3">
              {mockProduct.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="col-6 col-md-4 col-lg-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="ratio ratio-1x1 rounded-3 overflow-hidden shadow-sm">
                    <img
                      src={image}
                      alt={`${mockProduct.name} ${index + 1}`}
                      className="object-fit-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => navigate(`/product/${id}`)}
              className="btn btn-primary btn-lg custom-button"
            >
              Proceed to Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 