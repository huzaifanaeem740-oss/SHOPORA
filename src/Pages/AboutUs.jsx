import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#fafaf9', color: '#0f172a', minHeight: '80vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .about-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
        `}
      </style>

      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        <div className="animate-fade" style={{ marginBottom: '50px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '1px', marginBottom: '15px' }}>
            ABOUT <span style={{ color: '#2563eb' }}>VESTRO X</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Redefining modern fashion with style, premium quality, and effortless comfort tailored exclusively for you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          
          <div className="animate-fade about-card" style={{ background: '#ffffff', padding: '35px 25px', borderRadius: '12px', border: '1px solid #e2e8f0', animationDelay: '0.2s' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>✨</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Our Mission</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>
              To deliver trendsetting streetwear and premium apparel that empower individuality and high-end confidence.
            </p>
          </div>

          <div className="animate-fade about-card" style={{ background: '#ffffff', padding: '35px 25px', borderRadius: '12px', border: '1px solid #e2e8f0', animationDelay: '0.4s' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🛡️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Quality Craftsmanship</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>
              Every piece at Vestro X goes through strict quality checks using durable, breathable, and top-grade fabrics.
            </p>
          </div>

          <div className="animate-fade about-card" style={{ background: '#ffffff', padding: '35px 25px', borderRadius: '12px', border: '1px solid #e2e8f0', animationDelay: '0.6s' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🚀</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Fast Delivery</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>
              We ensure seamless online shopping with swift doorstep deliveries and reliable customer support systems.
            </p>
          </div>

        </div>

        <div className="animate-fade" style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'left', animationDelay: '0.8s' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#0f172a' }}>The Vestro X Story</h2>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
            Founded with a passion for excellence, Vestro X brings together contemporary fashion aesthetics and daily wear comfort. Whether you are looking for classic everyday tees, statement hoodies, or signature styles, we strive to make every wardrobe exceptional.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;