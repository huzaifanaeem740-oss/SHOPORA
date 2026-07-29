import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  // LocalStorage se purane messages load karna taake admin ka reply bhi dikhe
  useEffect(() => {
    const savedMsgs = JSON.parse(localStorage.getItem('admin_messages')) || [];
    setUserMessages(savedMsgs);
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMsg = {
      id: Date.now(),
      name,
      email,
      message,
      reply: '',
      date: new Date().toLocaleDateString()
    };

    const existingMsgs = JSON.parse(localStorage.getItem('admin_messages')) || [];
    const updatedMsgs = [newMsg, ...existingMsgs];
    
    localStorage.setItem('admin_messages', JSON.stringify(updatedMsgs));
    setUserMessages(updatedMsgs);

    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ backgroundColor: '#fafaf9', color: '#0f172a', minHeight: '85vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade { animation: fadeInUp 0.8s ease-out forwards; }
          .contact-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); transition: all 0.3s ease; }
        `}
      </style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div className="animate-fade" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '1px', marginBottom: '15px' }}>
            GET IN <span style={{ color: '#2563eb' }}>TOUCH</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            We would love to hear from you. Send us a message or check your query status below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* Left Side: Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="animate-fade contact-card" style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>📍</span>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Our Office</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '15px', margin: 0, paddingLeft: '39px' }}>
                Vestro X Headquarters, Main Commercial Avenue, Karachi, Pakistan
              </p>
            </div>

            <div className="animate-fade contact-card" style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>📞</span>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Direct Support</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '15px', margin: 0, paddingLeft: '39px' }}>
                Phone: +92 300 1234567<br />Email: support@vestrox.com
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="animate-fade" style={{ background: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Send Us a Message</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>
              Drop your query and check admin replies below.
            </p>

            {submitted && (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>Your Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Faraz Qureshi" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. faraz@gmail.com" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>Your Message</label>
                <textarea rows="3" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your query here..." required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* User Query Status & Admin Replies Section */}
        <div style={{ marginTop: '50px', background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#0f172a' }}>Your Sent Messages & Admin Replies</h2>
          {userMessages.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '14px' }}>No messages sent yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {userMessages.map((msg) => (
                <div key={msg.id} style={{ background: '#f8fafc', padding: '15px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '5px' }}>
                    <span><b>{msg.name}</b> ({msg.email})</span>
                    <span>{msg.date}</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#334155', margin: '5px 0' }}><b>Query:</b> {msg.message}</p>
                  
                  {msg.reply ? (
                    <div style={{ marginTop: '10px', background: '#dcfce7', padding: '10px 15px', borderRadius: '6px', color: '#166534', fontSize: '14px' }}>
                      <b>Admin Reply:</b> {msg.reply}
                    </div>
                  ) : (
                    <div style={{ marginTop: '8px', color: '#d97706', fontSize: '13px', fontStyle: 'italic' }}>
                      Status: Waiting for admin reply...
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;