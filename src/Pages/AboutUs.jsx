import React from 'react';
import './CSS/AboutUs.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-header animate-fade-down">
        <h1>ABOUT <span>VESTRO X</span></h1>
        <p>Redefining modern fashion with style, premium quality, and effortless comfort tailored exclusively for you.</p>
      </div>

      {/* Core Values Cards */}
      <div className="about-cards-wrapper animate-slide-up">
        <div className="about-card">
          <div className="about-icon-box">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Our Mission" 
              className="about-card-img"
            />
          </div>
          <h3>Our Mission</h3>
          <p>To deliver trendsetting streetwear and premium apparel that empower individuality and high-end confidence.</p>
        </div>

        <div className="about-card">
          <div className="about-icon-box">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2912/2912761.png" 
              alt="Quality Craftsmanship" 
              className="about-card-img"
            />
          </div>
          <h3>Quality Craftsmanship</h3>
          <p>Every piece at Vestro X goes through strict quality checks using durable, breathable, and top-grade fabrics.</p>
        </div>

        <div className="about-card">
          <div className="about-icon-box">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2838/2838694.png" 
              alt="Fast Delivery" 
              className="about-card-img"
            />
          </div>
          <h3>Fast Delivery</h3>
          <p>We ensure seamless online shopping with swift doorstep deliveries and reliable customer support systems.</p>
        </div>
      </div>

      {/* Brand Numbers Counter Banner */}
      <div className="about-stats-banner animate-fade-in">
        <div className="stat-item">
          <h2>10k+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h2>100%</h2>
          <p>Premium Fabrics</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h2>24/7</h2>
          <p>Dedicated Support</p>
        </div>
      </div>
    </div>
  );
};

export default About;