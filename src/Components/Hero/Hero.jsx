import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';
import jordan_shoe from '../Assets/download.png';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>JUST IN • NIKE AIR JORDAN</h2>
        <div className="hero-heading">
          <p>ELEGANCE &</p>
          <p className="hero-highlight">PURE STYLE.</p>
        </div>
        <div className="hero-latest-btn">
          <div>SHOP COLLECTION</div>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>

      <div className="hero-right">
        <img 
          src={jordan_shoe} 
          alt="Air Jordan 1 Retro High OG Praline" 
          className="hero-new-logo"
        />
      </div>
    </div>
  );
};

export default Hero;