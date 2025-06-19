import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Tech Enthusiast',
      image: '/testimonials/john.jpg',
      content: 'Amazing service and fast delivery. The products are authentic and the prices are unbeatable!'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Business Owner',
      image: '/testimonials/jane.jpg',
      content: 'I\'ve been shopping here for years. The customer service is exceptional and the product quality is always top-notch.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Student',
      image: '/testimonials/mike.jpg',
      content: 'Great deals on tech products. The website is easy to navigate and the checkout process is smooth.'
    }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">
            <span className="gradient-text">What Our Customers Say</span>
          </h2>
          <p className="lead text-light">Trusted by thousands of satisfied customers</p>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={testimonial.id}
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card h-100 glass-card" style={{ background: 'transparent', border: 'none' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="ratio ratio-1x1 rounded-circle overflow-hidden" style={{ width: '60px' }}>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-fit-cover"
                        />
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-1">{testimonial.name}</h5>
                      <p className="text-muted mb-0 small">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="card-text mb-0">{testimonial.content}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
} 