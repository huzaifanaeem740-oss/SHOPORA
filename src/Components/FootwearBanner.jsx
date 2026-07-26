import React, { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    tag: "URBAN STREETWEAR",
    title: "AIR JORDAN 1 RETRO",
    subtitle: "Classic vintage basketball silhouette crafted for modern street style.",
    btnText: "SHOP MEN COLLECTION",
    bg: "#171717",
    textColor: "#FFFFFF",
    accentColor: "#EA580C",
    image: "https://pngimg.com/d/nike_PNG11.png"
  },
  {
    id: 2,
    tag: "VINTAGE RUNNING",
    title: "RETRO HERITAGE DROP",
    subtitle: "Timeless colorways with maximum daily street comfort.",
    btnText: "SHOP WOMEN COLLECTION",
    bg: "#F5EFE6",
    textColor: "#171717",
    accentColor: "#D97706",
    image: "https://pngimg.com/d/running_shoes_PNG5816.png"
  }
];

const FootwearBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = banners[current];

  return (
    <div style={{ width: '100%', maxWidth: '1280px', margin: '20px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      <div style={{
        backgroundColor: slide.bg,
        borderRadius: '24px',
        padding: '40px 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.6s ease',
        minHeight: '260px',
        flexWrap: 'wrap',
        position: 'relative',
        boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
      }}>
        <div style={{ flex: '1', minWidth: '280px' }}>
          <span style={{
            backgroundColor: slide.accentColor,
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '900',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '14px'
          }}>
            {slide.tag}
          </span>

          <h2 style={{
            fontSize: '38px',
            fontWeight: '900',
            color: slide.textColor,
            margin: '0 0 10px 0',
            textTransform: 'uppercase',
            letterSpacing: '-1px'
          }}>
            {slide.title}
          </h2>

          <p style={{
            color: slide.textColor === '#FFFFFF' ? '#A8A29E' : '#57534E',
            fontSize: '14px',
            margin: '0 0 20px 0',
            maxWidth: '420px',
            fontWeight: '500'
          }}>
            {slide.subtitle}
          </p>

          <button style={{
            backgroundColor: slide.accentColor,
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 26px',
            borderRadius: '6px',
            fontWeight: '900',
            fontSize: '12px',
            cursor: 'pointer',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {slide.btnText}
          </button>
        </div>

        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', minWidth: '250px' }}>
          <img 
            src={slide.image} 
            alt="Banner Shoe" 
            style={{
              maxHeight: '240px',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.25))',
              transform: 'rotate(-10deg)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FootwearBanner;