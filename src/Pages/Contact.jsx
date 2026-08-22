import React, { useState } from 'react';
import './CSS/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="contact-page-container">
      {/* Header Section */}
      <div className="contact-header animate-fade-down">
        <h1>GET IN <span>TOUCH</span></h1>
        <p>We would love to hear from you. Send us a message or check our location details below.</p>
      </div>

      <div className="contact-content-wrapper">
        {/* Left Side: Info Cards with Real Icon Images */}
        <div className="contact-info-section animate-slide-left">
          <div className="info-card">
            <div className="info-icon-wrapper">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                alt="Location Pin" 
                className="info-real-img"
              />
            </div>
            <div className="info-text">
              <h3>Our Office</h3>
              <p>Vestro X Headquarters, Main Commercial Avenue, Karachi, Pakistan</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3059/3059502.png" 
                alt="Direct Support Phone" 
                className="info-real-img"
              />
            </div>
            <div className="info-text">
              <h3>Direct Support</h3>
              <p>+92 3282134905</p>
              <p>vestroX@gmail.com</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2838/2838779.png" 
                alt="Working Hours Clock" 
                className="info-real-img"
              />
            </div>
            <div className="info-text">
              <h3>Working Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-section animate-slide-right">
          <h2>Send Us a Message</h2>
          <p className="form-subtext">Drop your query and check admin replies in your registered mail.</p>

          {submitted && (
            <div className="success-badge">
              ✓ Message sent successfully! We will get back to you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-group">
              <label>Your Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Faraz Qureshi" 
                required 
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="e.g. faraz@example.com" 
                required 
              />
            </div>

            <div className="input-group">
              <label>Your Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="5" 
                placeholder="Write your query here..." 
                required 
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;