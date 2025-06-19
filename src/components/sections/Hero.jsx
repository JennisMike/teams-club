import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const messages = [
  '10% off on all products!',
  'Fast delivery across Cameroon!',
  'Secure payment via MTN Mobile Money!',
  'Delivery to your door!'
]

export default function Hero() {
  const [currentMsg, setCurrentMsg] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    let timeout
    if (typing) {
      if (displayed.length < messages[currentMsg].length) {
        timeout = setTimeout(() => {
          setDisplayed(messages[currentMsg].slice(0, displayed.length + 1))
        }, 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 1200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(messages[currentMsg].slice(0, displayed.length - 1))
        }, 30)
      } else {
        setTyping(true)
        setCurrentMsg((prev) => (prev + 1) % messages.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, currentMsg])

  return (
    <motion.section
      className="hero-section text-white text-center d-flex flex-column align-items-center justify-content-start position-relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ minHeight: '90vh', background: 'none', marginTop: '18vh' }}
    >
      <div className="container">
        <motion.h1
          className="fw-bold mb-2 hero-gradient-text"
          style={{ fontSize: '3.2rem', letterSpacing: '1px', lineHeight: 1.1, fontWeight: 800 }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Upgrade Your Home. Elevate Your Life.
        </motion.h1>
        <motion.p
          className="lead mb-3 px-lg-5 fw-semibold"
          style={{ minHeight: '2.5rem', letterSpacing: '1px', fontSize: '1.5rem' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <span style={{ color: '#FFD600' }}>{displayed}<span className="blinking-cursor">|</span></span>
        </motion.p>
        <motion.p
          className="lead mb-4 px-lg-5"
          style={{ fontSize: '1.1rem', color: '#fff', opacity: 0.9 }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Premium tech products at incredible prices. Limited stock, unlimited savings!
        </motion.p>
        <motion.div
          className="d-flex flex-wrap justify-content-center gap-4 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ minHeight: '8vh', background: 'none', marginTop: '0vh', marginBottom: '0vh' }}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="dot" style={{ backgroundColor: '#3ee97a' }}></span>
            <span style={{ color: '#fff', fontWeight: 500 }}>Fast Delivery in Cameroon</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="dot" style={{ backgroundColor: '#4a7cff' }}></span>
            <span style={{ color: '#fff', fontWeight: 500 }}>MTN Mobile Money</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="dot" style={{ backgroundColor: '#FFD600' }}></span>
            <span style={{ color: '#fff', fontWeight: 500 }}>100% Authentic</span>
          </div>
        </motion.div>
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
          <button className="btn btn-primary btn-lg px-4 fw-bold" style={{ borderRadius: '16px', fontSize: '1.2rem' }}>
            Shop Now - Save Up to 70%
          </button>
          <button className="btn btn-secondary btn-lg px-4 fw-bold" style={{ borderRadius: '16px', fontSize: '1.2rem' }}>
            View All Deals
          </button>
        </div>
      </div>
      <style>{`
        .blinking-cursor { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
        .dot { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }
        .hero-gradient-text {
          background: linear-gradient(270deg, #FFD600, #f45cb4, #4a7cff, #43cea2, #FFD600);
          background-size: 1000% 1000%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: heroGradientMove 7s ease-in-out infinite;
        }
        @keyframes heroGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  )
} 