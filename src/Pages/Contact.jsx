import React, { useState } from 'react';
import './CSS/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields!");
      return;
    }

    // Show Success Popup
    setShowPopup(true);

    // Clear form fields
    setFormData({ name: '', email: '', message: '' });

    // Hide popup automatically after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div style={{ width: '100%', minHeight: '80vh', padding: '50px 20px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '800px', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgb(0 0 / 0.1)', position: 'relative' }}>
        
        {/* Success Popup Notification */}
        {showPopup && (
          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#22c55e', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, transition: '0.3s' }}>
            🎉 Message Sent Successfully! We will get back to you soon.
          </div>
        )}

        <h2 style={{ textAlign: 'center', color: '#0f172a', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Get In Touch</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '35px', fontSize: '15px' }}>
          Have any questions or queries? Reach out to us via form or direct WhatsApp!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Side: Direct Contact Info */}
          <div style={{ background: '#f1f5f9', padding: '30px', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '20px', fontSize: '20px' }}>Contact Information</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>WhatsApp Support</p>
              <a 
                href="https://wa.me/923282134905" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#25d366', fontSize: '18px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                💬 +92 328 2134905
              </a>
            </div>

            <div>
              <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Email Address</p>
              <p style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: '600' }}>Vestro@gmail.com</p>
            </div>
          </div>

          {/* Right Side: Message Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Your Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your name" 
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Your Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Your Message</label>
              <textarea 
                name="message" 
                rows="4" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Type your message here..." 
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', resize: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ background: '#0f172a', color: '#fff', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '700', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}
            >
              Send Message
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;