import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import ProductShowcase from './components/sections/ProductShowcase'
import FeaturedProducts from './components/sections/FeaturedProducts'
import AllProductsHero from './components/sections/AllProductsHero'
import TrustSection from './components/sections/TrustSection'
import CurvedProductDisplay from './components/sections/CurvedProductDisplay'
import ProductPurchase from './components/pages/ProductPurchase'
import ProductDescription from './components/pages/ProductDescription'
import FridgesPage from './components/pages/FridgesPage'
import TVsPage from './components/pages/TVsPage'
import CookersPage from './components/pages/CookersPage'
import KitchenAppliancesPage from './components/pages/KitchenAppliancesPage'
import OtherProductsPage from './components/pages/OtherProductsPage'
import OrderConfirmationPage from './components/pages/OrderConfirmationPage'
import TrackOrderPage from './components/pages/TrackOrderPage'
import Footer from './components/layout/Footer'
import { FaWhatsapp } from 'react-icons/fa'

function Home() {
  const handleExploreClick = () => {
    // Scroll to the next section or navigate
    // For now, let's just log a message
    console.log("Explore button clicked!")
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* <Header /> */}
      
      <main className="flex-grow-1">
        <Hero
          title="10% discount on all products"
          description="Shop the hottest products at Teams Club!"
          buttonText="Explore Now"
          onButtonClick={handleExploreClick}
        />
        <ProductShowcase />
        <CurvedProductDisplay />
        <AllProductsHero />
        <TrustSection />
      </main>
      {/* Minimal Footer */}
      {/* <footer style={{background: 'var(--primary-bg)', color: '#d1d5db', border: 'none'}} className="pt-4 pb-2 mt-auto">
        <div className="text-center mb-2" style={{ letterSpacing: '0.5px', fontSize: '1rem', fontWeight: 500 }}>
          🇨🇲 Made in Cameroon &bull; Fast Delivery &bull; MTN Mobile Money Accepted
        </div>
        <div className="text-center mb-2">
          <a href="#" className="text-light fw-semibold mx-3 text-decoration-none" style={{ color: '#d1d5db', fontWeight: 500, fontSize: '1rem' }}>WhatsApp Support</a>
          <a href="#" className="text-light fw-semibold mx-3 text-decoration-none" style={{ color: '#d1d5db', fontWeight: 500, fontSize: '1rem' }}>Track Order</a>
          <a href="#" className="text-light fw-semibold mx-3 text-decoration-none" style={{ color: '#d1d5db', fontWeight: 500, fontSize: '1rem' }}>Contact</a>
        </div>
      </footer> */}
    </div>
  )
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase/:id" element={<ProductPurchase />} />
        <Route path="/product/:id/details" element={<ProductDescription />} />
        <Route path="/products/fridges" element={<FridgesPage />} />
        <Route path="/products/tvs" element={<TVsPage />} />
        <Route path="/products/cookers" element={<CookersPage />} />
        <Route path="/products/kitchen-appliances" element={<KitchenAppliancesPage />} />
        <Route path="/products/others" element={<OtherProductsPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
      </Routes>
      {/* Minimal Footer */}
      <footer style={{background: 'var(--primary-bg)', color: '#d1d5db', border: 'none'}} className="pt-4 pb-2 mt-auto">
        <hr />
        <div className="text-center mb-2" style={{ letterSpacing: '0.5px', fontSize: '1rem', fontWeight: 500 }}>
          🇨🇲 Registered in Yaounde &bull; Fast Delivery &bull; Mobile Money Accepted
        </div>
        <div className="text-center mb-2">
          <a href="#" className="text-light fw-semibold mx-3 text-decoration-none" style={{ color: '#d1d5db', fontWeight: 500, fontSize: '1rem' }}>WhatsApp Support</a>
          <a href="#" className="text-light fw-semibold mx-3 text-decoration-none" style={{ color: '#d1d5db', fontWeight: 500, fontSize: '1rem' }}>Track Order</a>
          <a href="#" className="text-light fw-semibold mx-3 text-decoration-none" style={{ color: '#d1d5db', fontWeight: 500, fontSize: '1rem' }}>Location</a>
        </div>
      </footer>
      {/* <Footer/> */}
      {/* Floating WhatsApp Button (now global) */}
      <a
        href="https://wa.me/237XXXXXXXXX" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          right: '2.2rem',
          bottom: '2.2rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <div
          className="whatsapp-bounce"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            borderRadius: '50%',
            width: '62px',
            height: '62px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(40, 60, 90, 0.18)',
            marginBottom: '0.4rem',
          }}
        >
          <FaWhatsapp size={34} color="#fff" />
        </div>
        <span style={{ color: '#fff', background: 'rgba(30,34,90,0.92)', borderRadius: '12px', padding: '2px 12px', fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
          Chat with us!
        </span>
        <style>{`
          @keyframes whatsappHover {
            0% { transform: translateY(0); }
            50% { transform: translateY(-18px); }
            100% { transform: translateY(0); }
          }
          .whatsapp-bounce {
            animation: whatsappHover 2.2s infinite ease-in-out;
          }
        `}</style>
      </a>
    </>
  )
}

export default App
