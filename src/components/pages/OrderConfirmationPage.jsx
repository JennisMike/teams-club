import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircleIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'

export default function OrderConfirmationPage() {
  const location = useLocation()
  const { order } = location.state || {}

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order.order_number)
    alert('Tracking number copied to clipboard!')
  }

  if (!order) {
    return (
      <div className="min-vh-100 py-5 d-flex flex-column justify-content-center align-items-center text-white">
        <h2 className="mb-4">No order details found.</h2>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-vh-100 py-5" style={{ background: 'var(--primary-bg)' }}>
      <div className="container text-center text-white">
        <CheckCircleIcon className="text-success mx-auto mb-4" style={{ width: '80px' }} />
        <h1 className="display-4 fw-bold mb-3">Order Placed Successfully!</h1>
        <p className="lead mb-5">Thank you for your purchase. An email confirmation with your order details has been sent to <strong>{order.customer_email}</strong>.</p>

        <div className="col-lg-8 mx-auto p-4 rounded-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <h3 className="mb-4">Your Tracking Number</h3>
          <div 
            className="d-flex align-items-center justify-content-center bg-dark p-3 rounded-3 mb-4" 
            style={{ border: '2px dashed #FFD600' }}
          >
            <span className="fs-4 fw-bold text-warning me-3">{order.order_number}</span>
            <button onClick={copyToClipboard} className="btn btn-outline-warning btn-sm">
              <ClipboardDocumentIcon style={{ width: '20px' }} />
            </button>
          </div>
          <p className="text-white-50">Please save this tracking number. You can use it to check the status of your order.</p>
        </div>

        <div className="col-lg-10 mx-auto mt-5">
          <h4 className="mb-4 text-white">Order Details</h4>
          <div className="card border-0 shadow-lg" style={{ backgroundColor: '#2a3042' }}>
            <div className="card-body p-4 text-light">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="text-warning mb-3" style={{ color: '#ffd700' }}>Order Information</h5>
                  <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Order Number:</strong> <span className="ms-2">{order.order_number}</span></p>
                  <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Order Date:</strong> <span className="ms-2">{new Date(order.created_at).toLocaleDateString()}</span></p>
                  <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Status:</strong> <span className="ms-2 badge bg-warning text-dark">{order.order_status}</span></p>
                </div>
                <div className="col-md-6">
                  <h5 className="mb-3" style={{ color: '#ffd700' }}>Customer Information</h5>
                  <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Name:</strong> <span className="ms-2">{order.customer_name}</span></p>
                  <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Email:</strong> <span className="ms-2">{order.customer_email}</span></p>
                  <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Phone:</strong> <span className="ms-2">{order.customer_phone}</span></p>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: '#ffd700' }}>Shipping Information</h5>
                <p className="mb-2"><strong style={{ color: '#a7b2d9' }}>Delivery Address:</strong></p>
                <p className="mb-0 ps-3">{order.delivery_address}</p>
              </div>
              
              <hr className="my-4" />
              
              <div>
                <h5 className="mb-3" style={{ color: '#ffd700' }}>Order Summary</h5>
                <div className="table-responsive">
                  <table className="table table-hover mb-0" style={{ color: '#e0e6ff' }}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="text-end">Quantity</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order.product_name}</td>
                        <td className="text-end">{order.quantity}</td>
                        <td className="text-end">{(order.total_price / order.quantity).toLocaleString()} FCFA</td>
                        <td className="text-end fw-bold" style={{ color: '#ffd700' }}>{order.total_price.toLocaleString()} FCFA</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="table-active">
                        <td colSpan="3" className="text-end fw-bold" style={{ color: '#a7b2d9' }}>Total Amount:</td>
                        <td className="text-end fw-bold" style={{ color: '#ffd700' }}>{order.total_price.toLocaleString()} FCFA</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              {order.admin_note && (
                <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                  <h6 className="mb-2" style={{ color: '#ffd700' }}>Note from Team:</h6>
                  <p className="mb-0" style={{ color: '#e0e6ff' }}>{order.admin_note}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Link to="/" className="btn btn-lg btn-primary me-3">Continue Shopping</Link>
          <Link to="/track-order" className="btn btn-lg btn-outline-light">Track Your Order</Link>
        </div>
      </div>
    </div>
  )
}
