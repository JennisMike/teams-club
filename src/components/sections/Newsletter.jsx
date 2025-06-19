import { useState } from 'react'
import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="py-5">
      <div className="container">
        <MotionDiv
          className="glass-card p-4 p-md-5 rounded-4"
          style={{ background: 'transparent', border: 'none' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-6 fw-bold mb-3">
                <span className="gradient-text">Stay Updated</span>
              </h2>
              <p className="lead text-light mb-0">
                Subscribe to our newsletter for exclusive deals and updates.
              </p>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-4"
                  >
                    Subscribe
                  </button>
                </div>
                {status === 'success' && (
                  <div className="alert alert-success mt-3 mb-0">
                    Thank you for subscribing!
                  </div>
                )}
              </form>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
} 