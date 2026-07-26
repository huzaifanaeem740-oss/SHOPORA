import React from 'react';
import './CSS/Shop.css';
import Hero from '../Components/Hero/Hero';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import vest_banner from '../Components/Assets/Vest.png';

const Shop = () => {
  return (
    <div>
      <Hero />
      
      {/* Vest.png Banner */}
      <div style={{ width: '85%', margin: '40px auto' }}>
        <img 
          src={vest_banner} 
          alt="Vest Banner" 
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '10px' }} 
        />
      </div>

      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;