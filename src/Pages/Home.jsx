import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import './CSS/Home.css'; // CSS file import

// Assets import
import hero_image from '../Components/Assets/download.png';
import vest_banner from '../Components/Assets/Vest.png';
import omg_image from '../Components/Assets/omg.png';

const Home = () => {
  const { all_product } = useContext(ShopContext);
  const newCollectionProducts = all_product ? all_product.slice(0, 8) : [];

  return (
    <div className="home-container">
      
      {/* Inline Animations for Shoes & Text */}
      <style>
        {`
          @keyframes floatShoes {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .hero-animated-img {
            animation: floatShoes 4s ease-in-out infinite;
          }

          .hero-animated-text {
            animation: slideInLeft 0.8s ease-out forwards;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-left hero-animated-text">
          <p className="hero-tag">JUST IN • NIKE AIR JORDAN</p>
          <div>
            <h1 className="hero-title">ELEGANCE &</h1>
            <h1 className="hero-title">PURE STYLE.</h1>
          </div>
          <div className="hero-btn">
            <span>SHOP COLLECTION</span>
            <span>→</span>
          </div>
        </div>
        
     <div className="hero-right hero-animated-img">
  <img src={hero_image} alt="hero" style={{ marginTop: '30px' }} />
</div>
      </div>

      {/* Vest.png Banner Section */}
      <div className="vest-banner-container">
        <img src={vest_banner} alt="Vest Banner" />
      </div>

      {/* Exclusive Offers Banner */}
      <div className="exclusive-banner">
        <div className="exclusive-left">
          <p style={{ color: '#4b5563', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
            ONLY ON BEST SELLERS PRODUCTS
          </p>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: '800', color: '#111827', lineHeight: '1.1', margin: 0 }}>
            Exclusive Offers For You
          </h1>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
            width: '170px', height: '46px', background: '#ff4141', color: '#fff', 
            borderRadius: '25px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            marginTop: '8px', boxShadow: '0px 4px 12px rgba(255, 65, 65, 0.3)'
          }}>
            SHOP EXCLUSIVES
          </div>
        </div>

        <div className="exclusive-right">
          <img src={omg_image} alt="Exclusive Offer" />
        </div>
      </div>

      {/* New Collection Section */}
      <div className="new-collection-section">
        <h1 className="collection-title">NEW COLLECTION</h1>
        <div className="collection-underline"></div>
        <div className="collection-grid">
          {newCollectionProducts.map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;