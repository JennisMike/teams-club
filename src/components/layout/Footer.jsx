import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark py-5 text-white"
    >
      <div className="container">
        <div className="row justify-content-between align-items-center mb-4">
          <div className="col-md-auto mb-3 mb-md-0">
            <h3 className="h4 fw-bold mb-0">Teams Club</h3>
          </div>
          <div className="col-md-auto">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3">
                <a href="#" className="text-white text-decoration-none hover-pink">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white text-decoration-none hover-pink">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white-50 my-4" />

        <div className="text-center text-secondary">
          <p className="mb-1">© {new Date().getFullYear()} Teams Club. All rights reserved.</p>
          <p className="mb-0">Made in Cameroon 🇨🇲</p>
        </div>
      </div>
    </motion.footer>
  )
} 