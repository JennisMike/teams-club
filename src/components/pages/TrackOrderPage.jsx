import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { getProductImageUrl } from '../../utils/storage';

// Status configuration with icons and descriptions
const statusConfig = {
  'Preparing': { class: 'text-warning', icon: '🔄', description: 'Preparing your order' },
  'Shipped': { class: 'text-info', icon: '🚚', description: 'On its way to you' },
  'Delivered': { class: 'text-success', icon: '✓', description: 'Successfully delivered' }
};

// Determine which statuses should be active based on current status
const getActiveStatuses = (currentStatus) => {
  const statuses = Object.keys(statusConfig);
  const currentIndex = statuses.indexOf(currentStatus);
  
  return statuses.reduce((acc, status, index) => ({
    ...acc,
    [status]: {
      ...statusConfig[status],
      active: index <= currentIndex,
      current: status === currentStatus
    }
  }), {});
};

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  
  // Set up product data when order is loaded
  useEffect(() => {
    if (order) {
      // Get the full public URL for the product image
      const imageUrl = order.product_image_url 
        ? getProductImageUrl(order.product_image_url)
        : '/placeholder-product.jpg';
      
      // Create a product object from order data
      const productData = {
        id: order.product_id,
        name: order.product_name,
        image: imageUrl,
        images: [imageUrl],
        price: order.total_price / order.quantity // Calculate unit price from total
      };
      setProduct(productData);
    }
  }, [order]);

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number.')
      return
    }
    setIsLoading(true)
    setError('')
    setOrder(null)

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', trackingNumber.trim())
      .single()

    setIsLoading(false)

    if (error || !data) {
      setError('No order found with that tracking number. Please check the number and try again.')
      console.error('Error fetching order:', error)
    } else {
      setOrder(data)
    }
  }

  return (
    <div className="min-vh-100 py-5" style={{ background: 'var(--primary-bg)' }}>
      <div className="container text-white">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="display-5 fw-bold mb-4">Track Your Order</h1>
            <p className="lead mb-5">Enter the tracking number you received in your confirmation email.</p>
            <form onSubmit={handleTrackOrder} className="d-flex justify-content-center gap-2 mb-4">
              <input 
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="form-control form-control-lg w-50"
                placeholder="e.g., TC-1A2B3C"
              />
              <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Track'}
              </button>
            </form>

            {error && <div className="alert alert-danger mt-4">{error}</div>}

            {order && (
              <div className="mt-5 text-start p-4 rounded-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-center mb-4">Order Details</h3>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Status: <span className="badge bg-success fs-5">{order.order_status}</span></h4>
                  <p className="mb-0 text-white-50">
  Order placed on: {new Date(order.created_at).toLocaleString()}
  {order.updated_at !== order.created_at && (
    <span className="d-block mt-1">Last updated: {new Date(order.updated_at).toLocaleString()}</span>
  )}
</p>
                </div>
                <div className="row g-4">
                  {/* Order Status Timeline */}
                  <div className="col-lg-8">
                    <div className="card bg-dark mb-4">
                      <div className="card-body">
                        <h5 className="mb-4">Order Status</h5>
                        <p className="text-white-50 mb-4">
                          Need help with your order? Our customer service team is here to assist you. 
                          Call us at <a href="tel:+237XXXXXXXX" className="text-white">+237 676 131 512</a> or 
                          email <a href="mailto:support@teamsclub.com" className="text-white">support@teamsclub.com</a>.
                        </p>
                        <div className="timeline">
                          {Object.entries(getActiveStatuses(order.order_status)).map(([status, { class: statusClass, icon, description, active, current }]) => (
                            <div key={status} className="timeline-item">
                              <div className={`timeline-marker ${current ? 'active' : ''} ${active ? statusClass : 'text-secondary'}`}>
                                {icon}
                              </div>
                              <div className="timeline-content">
                                <h6 className={`mb-1 ${current ? 'fw-bold' : ''} ${active ? '' : 'text-white-50'}`}>
                                  {status}
                                </h6>
                                <small className={active ? 'text-white-50' : 'text-secondary'}>{description}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="col-lg-4">
                    {product && (
                        <div className="card h-100 bg-dark">
                          <div className="card-img-top d-flex align-items-center justify-content-center" style={{ height: '200px', backgroundColor: '#fff' }}>
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="img-fluid"
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <div className="card-body">
                            <h5>{product.name}</h5>
                            <p className="text-white-50">Quantity: {order.quantity}</p>
                            <p className="h5">{order.total_price.toLocaleString()} FCFA</p>
                          </div>
                        </div>
                    )}
                  </div>

                  {/* Admin Note */}
                  <div className="col-12">
                    <div className="alert alert-info">
                      <h5 className="alert-heading">Order Status Update</h5>
                      <p className="mb-0">
                        {order.admin_note || 'Your order is being processed. Thank you for your patience.'}
                      </p>
                      <hr />
                      <p className="mb-0 small">
                        Need help? Contact us at{' '}
                        <a href="tel:+237XXXXXXXX" className="text-dark">+237 676 131 512</a> or{' '}
                        <a href="mailto:support@teamsclub.com" className="text-dark">support@teamsclub.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .timeline {
          position: relative;
          padding-left: 2rem;
        }
        .timeline-item {
          position: relative;
          padding-bottom: 2rem;
          padding-left: 1.5rem;
          border-left: 2px solid #333;
        }
        .timeline-item:last-child {
          border-left: 2px solid transparent;
        }
        .timeline-marker {
          position: absolute;
          left: -1.25rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #333;
          border: 2px solid #444;
          z-index: 1;
        }
        .timeline-marker.active {
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.3);
        }
        .timeline-content {
          padding-left: 1rem;
        }
      `}</style>
    </div>
  );
};
