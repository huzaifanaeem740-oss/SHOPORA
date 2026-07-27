import React from 'react';
import './CSS/AboutUs.css';
import about_main_img from '../Components/Assets/hero_image.png';

const AboutUs = () => {
  return (
    <div className='about-us-container'>
      
      {/* Header Section */}
      <div className="about-header">
        <h1>About Vestro X</h1>
        <p>Discover the story, vision, and passion behind Pakistan's fastest-growing fashion brand.</p>
      </div>

      {/* Main Story Section */}
      <div className="about-story">
        <div className="about-story-left">
          <h2>Our Journey: Style Meets Substance</h2>
          <p>
            Welcome to **Vestro X**, where we believe fashion is more than just clothing—it's a statement of confidence, a reflection of individuality, and a commitment to excellence. Founded with a simple yet ambitious idea: to bridge the gap between premium quality and accessible style in Pakistan.
          </p>
          <p>
            From our very first collection of premium basics to our curated range of modern streetwear and accessories, every piece is designed with you in mind. We combine modern aesthetics with everyday comfort.
          </p>
        </div>
        <div className="about-story-right">
          <img src={about_main_img} alt="Vestro X" />
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="about-vision-mission">
        <div className="vision-card">
          <h3>Our Mission</h3>
          <p>
            To empower every individual to express their unique style through thoughtfully designed, high-quality apparel. We are dedicated to providing a seamless shopping experience.
          </p>
        </div>
        <div className="vision-card">
          <h3>Our Vision</h3>
          <p>
            To become the leading fashion destination for the modern youth, known for our innovation, quality craftsmanship, and commitment to setting new industry benchmarks.
          </p>
        </div>
      </div>

      {/* Values & Promises Section */}
      <div className="about-values">
        <h2>The Vestro X Promise</h2>
        <div className="values-grid">
          <div className="value-item">
            <span className="value-badge">01</span>
            <h4>Uncompromising Quality</h4>
            <p>
              We source the finest fabrics and materials, ensuring every Vestro X product meets rigorous standards before reaching you.
            </p>
          </div>
          <div className="value-item">
            <span className="value-badge">02</span>
            <h4>Fast & Reliable Delivery</h4>
            <p>
              Your time is valuable. We partner with top courier services to ensure your orders are delivered safely and promptly.
            </p>
          </div>
          <div className="value-item">
            <span className="value-badge">03</span>
            <h4>Customer First Service</h4>
            <p>
              Our dedicated support team is always here to assist you, making your shopping experience smooth and enjoyable.
            </p>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="about-join-us">
        <h2>Be Part of the Vestro X Story</h2>
        <p>
          We are constantly evolving, innovating, and growing—and we want you to be a part of it. Explore our collections and join a community that celebrates style.
        </p>
        <div className="about-socials">
          <span>Follow us:</span>
          <a href="#instagram">Instagram</a> |
          <a href="#facebook">Facebook</a> |
          <a href="#tiktok">TikTok</a>
        </div>
        <button className="shop-now-btn">Shop Our Latest Collection</button>
      </div>

    </div>
  );
};

export default AboutUs;