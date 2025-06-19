import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { products } from '../../data/products';
import { supabase } from '../../supabaseClient';
import { uploadProductImage, getProductImageUrl } from '../../utils/storage';

export default function ProductPurchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFormValid = formData.name && formData.phone && formData.email && formData.address;

  // Ref to always hold the latest formData for payment success handler
  const latestFormData = useRef(formData);
  useEffect(() => {
    latestFormData.current = formData;
  }, [formData]);

  const isProcessingOrder = useRef(false);

  const handleCreateOrder = async (paymentData, formDataSnapshot) => {
    if (isProcessingOrder.current) {
      console.log('Order already being processed');
      return null;
    }
  
    isProcessingOrder.current = true;
  
    try {
      const orderNumber = `TC-${Date.now().toString().slice(-4)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const totalPrice = product.price * formDataSnapshot.quantity;
  
      console.log('Saving order with form data:', formDataSnapshot);
  
      let productImageUrl = '';
      const productImage = product.images?.[0] || product.image;
  
      if (productImage instanceof File) {
        productImageUrl = await uploadProductImage(productImage, product.id);
      } else if (productImage) {
        productImageUrl = getProductImageUrl(productImage);
      }
  
      const orderData = {
        order_number: orderNumber,
        customer_name: formDataSnapshot.name,
        customer_email: formDataSnapshot.email,
        customer_phone: formDataSnapshot.phone,
        delivery_address: formDataSnapshot.address,
        product_id: product.id,
        product_name: product.name,
        product_image_url: productImageUrl,
        quantity: formDataSnapshot.quantity,
        total_price: totalPrice,
        order_status: 'Preparing',
        admin_note: 'Thank you for your order! We are currently preparing it for shipment. You will receive another update when your order is on its way.',
        payment_reference: paymentData.reference,
        payment_details: paymentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
  
      console.log('Creating order with data:', orderData);
  
      const { data: existingOrder, error: lookupError } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_reference', paymentData.reference)
        .maybeSingle();
  
      if (lookupError) {
        console.error('Error checking for existing order:', lookupError);
      }
  
      if (existingOrder) {
        console.log('Order already exists for this payment reference:', existingOrder);
        isProcessingOrder.current = false;
        navigate('/order-confirmation', { state: { order: existingOrder } });
        return existingOrder;
      }
  
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
  
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
  
      console.log('Order created successfully:', data);
  
      if (data.customer_email) {
        console.log('Queueing confirmation email...');
        const emailPayload = {
          order: data,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          order_number: data.order_number,
          total_price: data.total_price,
          product_name: data.product_name,
          quantity: data.quantity
        };
  
        console.log('Sending email with payload:', emailPayload);
  
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(emailPayload)
        })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
            });
          }
          return response.json();
        })
        .then(result => {
          console.log('Email sent successfully:', result);
        })
        .catch(emailError => {
          console.error('Error sending email:', emailError);
        });
      }
  
      console.log('Navigating to order confirmation page with data:', data);
      navigate('/order-confirmation', {
        state: {
          order: data,
          customerName: data.customer_name,
          orderNumber: data.order_number,
          total: data.total_price
        }
      });
  
      return data;
    } catch (error) {
      console.error('Error in handleCreateOrder:', error);
      alert(`Error processing your order: ${error.message}. Please contact support with payment reference: ${paymentData?.reference || 'N/A'}`);
      throw error;
    } finally {
      isProcessingOrder.current = false;
      setIsSubmitting(false);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault(); // Prevent form submission
    
    console.log('Form data on submit:', formData);
    
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      const missingFields = [];
      if (!formData.name) missingFields.push('name');
      if (!formData.phone) missingFields.push('phone');
      if (!formData.email) missingFields.push('email');
      if (!formData.address) missingFields.push('address');
      
      console.error('Missing required fields:', missingFields);
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!window.campay) {
      alert('Payment service is not ready. Please refresh and try again.');
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    console.log('Initiating payment with form data:', formData);

    try {
      window.campay.options({
        payButtonId: 'campay-hidden-button',
        description: `${product.name} (x${formData.quantity})`,
        amount: (product.price * formData.quantity).toString(),
        currency: 'XAF',
        externalReference: `TC-ORDER-${Date.now()}`,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || 'Customer',
        email: formData.email,
      });

      setTimeout(() => {
        try {
          const button = document.getElementById('campay-hidden-button');
          if (button) {
            button.click();
            console.log('Payment modal opened');
          } else {
            throw new Error('Payment button not found');
          }
        } catch (error) {
          console.error('Error opening payment modal:', error);
          alert('Error opening payment modal. Please try again.');
          setIsSubmitting(false);
        }
      }, 100);
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('Error initializing payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const [sdkInitialized, setSdkInitialized] = useState(false);

  useEffect(() => {
    if (sdkInitialized) return;
    let isMounted = true;
    let campayScript = null;

    const setupCampayListeners = () => {
      if (!isMounted || !window.campay) return;

      console.log('Setting up Campay event listeners');

      window.campay.onSuccess = null;
      window.campay.onFail = null;
      window.campay.onModalClose = null;

      window.campay.onSuccess = async (data) => {
        if (!isMounted) return;

        console.log('Payment successful, creating order...', data);
        try {
          const modal = document.getElementById('myCamPayModal');
          if (modal) {
            modal.style.display = 'none';
          }

          const formDataSnapshot = { ...latestFormData.current };

          await handleCreateOrder(data, formDataSnapshot);
        } catch (error) {
          console.error('Error in payment success handler:', error);
          if (isMounted) {
            setIsSubmitting(false);
          }
        }
      };

      window.campay.onFail = (data) => {
        if (!isMounted) return;
        console.error('Payment failed:', data);
        alert(`Payment Failed. Status: ${data.status || 'Unknown error'}`);
        setIsSubmitting(false);
      };

      window.campay.onModalClose = () => {
        if (!isMounted) return;
        console.log('Payment modal closed');
        setIsSubmitting(false);
      };

      if (isMounted) {
        setSdkInitialized(true);
      }
    };

    if (!window.campay) {
      console.log('Loading Campay SDK...');
      campayScript = document.createElement('script');
      campayScript.src = `https://demo.campay.net/sdk/js?app-id=${import.meta.env.VITE_CAMPAY_APP_ID}`;
      campayScript.async = true;
      campayScript.id = 'campay-sdk';
      campayScript.onload = () => {
        if (isMounted) {
          console.log('Campay SDK loaded successfully');
          setupCampayListeners();
        }
      };
      campayScript.onerror = () => {
        if (isMounted) {
          console.error('Failed to load Campay SDK');
          alert('Failed to load payment service. Please refresh the page and try again.');
          setIsSubmitting(false);
        }
      };
      document.body.appendChild(campayScript);
    } else {
      setupCampayListeners();
    }

    return () => {
      isMounted = false;
      if (campayScript && campayScript.parentNode) {
        document.body.removeChild(campayScript);
      }
      if (window.campay) {
        window.campay.onSuccess = null;
        window.campay.onFail = null;
        window.campay.onModalClose = null;
      }
    };
  }, []);

  if (!product) {
    return (
      <div className="min-vh-100 py-5 d-flex justify-content-center align-items-center text-white">
        <h2>Product not found</h2>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'var(--primary-bg)' }}>
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-link text-light text-decoration-none mb-4">
          <ChevronLeftIcon style={{width: '1rem', height: '1rem', marginRight: '0.5rem'}} />
          Back to Products
        </button>

        <div className="row g-4">
          {/* Image Gallery */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="ratio ratio-4x3 rounded-4 overflow-hidden" style={{ background: '#222' }}>
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="object-fit-cover"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <button
                onClick={prevImage}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 btn btn-dark btn-sm rounded-circle opacity-75"
              >
                <ChevronLeftIcon style={{width: '1.5rem', height: '1.5rem'}} />
              </button>
              <button
                onClick={nextImage}
                className="position-absolute top-50 end-0 translate-middle-y me-3 btn btn-dark btn-sm rounded-circle opacity-75"
              >
                <ChevronRightIcon style={{width: '1.5rem', height: '1.5rem'}} />
              </button>
              <div className="row g-2 mt-3">
                {product.images.map((image, index) => (
                  <div key={index} className="col-3">
                    <button
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-100 ratio ratio-1x1 rounded-3 overflow-hidden ${
                        currentImageIndex === index ? 'border border-primary' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="object-fit-cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info and Form */}
          <div className="col-lg-6">
            <div className="glass-card p-4" style={{ background: 'transparent', borderRadius: '20px', border: 'none', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
              <h1 className="display-5 fw-bold mb-4 text-warning" style={{ fontSize: '2rem' }}>{product.name}</h1>
              <div className="d-flex align-items-center gap-3 mb-4">
                <h2 className="h3 mb-0 text-white">{product.price.toLocaleString()} FCFA</h2>
                <span className="text-white-50 text-decoration-line-through" style={{ fontSize: '1rem' }}>
                  {product.originalPrice.toLocaleString()} FCFA
                </span>
                <span className="badge bg-danger" style={{ fontWeight: 600, fontSize: '1rem' }}>
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3 text-white">Description</h3>
                <div>
                  <p className="text-light mb-3">{product.description}</p>
                  <AnimatePresence>
                    {showFullDescription && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="text-light">
                          {product.longDescription.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">{line.trim()}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)} 
                    className="btn btn-link text-primary p-0"
                  >
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                
                <form onSubmit={handlePayment} className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-white">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label text-white">Delivery Address *</label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="form-label text-white">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-warning py-3 fw-bold"
                      disabled={isSubmitting || !isFormValid}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        `Pay ${(product.price * formData.quantity).toLocaleString()} FCFA with MTN MoMo`
                      )}
                    </button>
                  </div>
                  {/* Hidden button required by Campay SDK */}
                  <button id="campay-hidden-button" style={{ display: 'none' }}>Pay</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
