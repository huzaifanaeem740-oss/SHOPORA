import React from 'react';
import './Offers.css';
import omg_image from '../Assets/omg.png';

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <p className="offers-tag">ONLY ON BEST SELLERS PRODUCTS</p>
        <h1>Exclusive<br />Offers For You</h1>
        <button className="offers-btn">SHOP EXCLUSIVES</button>
      </div>

      <div className="offers-right">
        <img 
          src={omg_image} 
          alt="Exclusive Offer Model" 
        />
      </div>
    </div>
  );
};

export default Offers;