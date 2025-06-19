import { motion } from 'framer-motion'
import { ShieldCheckIcon, TruckIcon, CreditCardIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

const MotionDiv = motion.div

export default function TrustSection() {
  const features = [
    {
      icon: <ShieldCheckIcon className="w-5 h-5 trust-icon" />,
      title: 'Authentic Products',
      description: '100% genuine products with warranty'
    },
    {
      icon: <TruckIcon className="w-5 h-5 trust-icon" />,
      title: 'Fast Delivery',
      description: 'Free shipping across Cameroon and home delivery in Yaounde'
    },
    {
      icon: <CreditCardIcon className="w-5 h-5 trust-icon" />,
      title: 'Secure Payment',
      description: 'Multiple payment options available'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5 trust-icon" />,
      title: '24/7 Support',
      description: 'Dedicated customer service'
    }
  ]

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          {features.map((feature, index) => (
            <MotionDiv
              key={index}
              className="col-md-6 col-lg-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card h-100 glass-card text-center p-4" style={{ background: 'transparent', borderRadius: '20px', border: 'none' }}>
                <div className="card-body">
                  <div className="mb-3 text-primary">
                    {feature.icon}
                  </div>
                  <h5 className="card-title mb-2" style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>{feature.title}</h5>
                  <p className="card-text mb-0" style={{ color: '#e0e6f7', fontWeight: 500, fontSize: '1.05rem', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
} 