import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: 'Smartphones',
      image: '/categories/phones.jpg',
      count: 24
    },
    {
      id: 2,
      name: 'Laptops',
      image: '/categories/laptops.jpg',
      count: 18
    },
    {
      id: 3,
      name: 'Accessories',
      image: '/categories/accessories.jpg',
      count: 32
    },
    {
      id: 4,
      name: 'Gaming',
      image: '/categories/gaming.jpg',
      count: 15
    }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">
            <span className="gradient-text">Shop by Category</span>
          </h2>
          <p className="lead text-light">Browse our wide range of products</p>
        </div>

        <div className="row g-4">
          {categories.map((category, index) => (
            <MotionDiv
              key={category.id}
              className="col-md-6 col-lg-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card h-100 glass-card overflow-hidden" style={{ background: 'transparent', border: 'none' }}>
                <div className="position-relative">
                  <div className="ratio ratio-4x3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="card-img object-fit-cover"
                    />
                  </div>
                  <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-75">
                    <h3 className="h5 mb-1">{category.name}</h3>
                    <p className="mb-0 text-light">
                      {category.count} Products
                    </p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
} 