import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroModel from "../Assets/hero_model.png"; // Right side model image

const Hero = () => {
  return (
    <div className="hero-section-container">
      <div className="hero-split-card">
        
        {/* LEFT SIDE: Dark Charcoal Section */}
        <div className="hero-left-content">
          <span className="hero-tag">NEW COLLECTION 2026</span>
          <h1 className="hero-title">VESTRO X</h1>
          <p className="hero-subtitle">URBAN APPAREL & STREETWEAR</p>
          <p className="hero-desc">
            Wear confidence. Live excellence. Premium quality crafted just for you.
          </p>
          
          <Link to="/shop" className="hero-cta-btn">
            SHOP NOW &rarr;
          </Link>

          {/* Minimalist Feature Badges */}
          <div className="hero-features">
            <div className="feature-item">
              <span>✓</span> 100% Original
            </div>
            <div className="feature-item">
              <span>⚡</span> Fast Shipping
            </div>
            <div className="feature-item">
              <span>↺</span> Easy Returns
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Smooth Image Container */}
        <div className="hero-right-image">
          <img src={heroModel} alt="Vestro X Streetwear Model" />
        </div>

      </div>
    </div>
  );
};

export default Hero;