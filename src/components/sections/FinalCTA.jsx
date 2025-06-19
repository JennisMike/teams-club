import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function FinalCTA() {
  return (
    <section className="py-5">
      <div className="container">
        <MotionDiv
          className="glass-card p-4 p-md-5 rounded-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'transparent', border: 'none' }}
        >
          <div className="mb-4">
            <span className="fs-1 fw-bold me-4" style={{ color: '#FFD600' }}>24</span>
            <span className="fs-1 fw-bold me-4" style={{ color: '#FF6B81' }}>6</span>
            <span className="fs-1 fw-bold" style={{ color: '#4ecdc4' }}>50%+</span>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-4 fs-5 text-light">
            <span>Hours Left</span>
            <span>Products Available</span>
            <span>Average Savings</span>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
} 