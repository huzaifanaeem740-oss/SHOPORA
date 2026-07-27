import React, { useState, useContext } from 'react';
import './CSS/Shop.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

// Banners import
import banner_mens from '../Components/Assets/banner_mens.png';
import banner_womens from '../Components/Assets/banner_womens.png';
import banner_kids from '../Components/Assets/banner_kids.png';

const Shop = () => {
  const { all_product } = useContext(ShopContext);
  
  // Default category 'men'
  const [selectedCategory, setSelectedCategory] = useState('men');

  // Banner selection logic
  const getBanner = () => {
    if (selectedCategory === 'men') return banner_mens;
    if (selectedCategory === 'women') return banner_womens;
    if (selectedCategory === 'kids') return banner_kids;
    return banner_mens;
  };

  // Helper function to render product sections safely and cleanly
  const renderSection = (title, allowedKeywords, isBlackBar = false) => {
    const filteredProducts = all_product.filter(item => {
      // Category check
      if (item.category !== selectedCategory) return false;

      // If it's just a black bar separator with no items
      if (isBlackBar) return false;

      const itemName = (item.name || '').toLowerCase();
      const itemType = (item.type || '').toLowerCase();

      // Ensure shoes/watches don't enter clothing sections
      if (allowedKeywords.includes('shirt') || allowedKeywords.includes('top') || allowedKeywords.includes('jersey')) {
        if (itemName.includes('watch') || itemName.includes('shoe') || itemName.includes('sneaker') || itemName.includes('belt') || itemName.includes('cap') || itemName.includes('perfume')) {
          return false;
        }
      }

      // Check if item matches any of the allowed keywords in name or type
      return allowedKeywords.some(keyword => 
        itemName.includes(keyword) || itemType.includes(keyword)
      );
    });

    if (filteredProducts.length === 0 && !isBlackBar) return null;

    return (
      <div key={title} style={{ width: '85%', maxWidth: '1400px', margin: '30px auto' }}>
        {/* Section Heading or Black Patti */}
        {isBlackBar ? (
          <div style={{ background: '#0f172a', color: '#fff', padding: '14px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 / 0.1)' }}>
            <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '700' }}>{title}</h3>
          </div>
        ) : (
          <div style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '8px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1e293b' }}>{title}</h3>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
            {filteredProducts.map((item, i) => (
              <Item 
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='shop-page' style={{ width: '100%', minHeight: '100vh', background: '#ffffff', paddingBottom: '50px' }}>
      
      <div className="shop-hero" style={{ textAlign: 'center', padding: '20px 0' }}>
        
        {/* Banner */}
        <div className="shop-banner-container" style={{ width: '70%', maxWidth: '750px', margin: '0 auto 20px auto' }}>
          <img 
            src={getBanner()} 
            alt="Category Banner" 
            style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', margin: '0 auto' }} 
          />
        </div>
        
        {/* Category Switch Buttons */}
        <div className="main-category-filter" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => setSelectedCategory('men')} style={btnStyle(selectedCategory === 'men')}>Mens</button>
          <button onClick={() => setSelectedCategory('women')} style={btnStyle(selectedCategory === 'women')}>Womens</button>
          <button onClick={() => setSelectedCategory('kids')} style={btnStyle(selectedCategory === 'kids')}>Kids</button>
        </div>
      </div>

      {/* Dynamic Sections Based on Selected Category */}
      {selectedCategory === 'men' && (
        <>
          {renderSection("Shirts & Jersey's", ['shirt', 't-shirt', 'jersey', 'tee'])}
          {renderSection("Pants & Trousers", ['pant', 'trouser', 'short', 'jean'])}
          {renderSection("Shoes & Slippers", ['shoe', 'slipper', 'footwear', 'sneaker', 'sandal'])}
          
          {/* Accessories Section */}
          {renderSection("ACCESSORIES", [], true)}
          {renderSection("Watches", ['watch'])}
          {renderSection("Perfumes", ['perfume', 'fragrance'])}
          {renderSection("Belts", ['belt'])}
          {renderSection("Caps", ['cap', 'hat'])}
        </>
      )}

      {selectedCategory === 'women' && (
        <>
          {renderSection("T-Shirts & Tops", ['shirt', 'top', 'tee', 'jersey'])}
          {renderSection("Shorts & Pants", ['pant', 'short', 'trouser', 'jean'])}
          {renderSection("Footwear", ['shoe', 'slipper', 'footwear', 'sneaker', 'sandal'])}
          
          {/* Accessories Section */}
          {renderSection("ACCESSORIES", [], true)}
          {renderSection("Watches", ['watch'])}
          {renderSection("Perfumes", ['perfume', 'fragrance'])}
          {renderSection("Caps", ['cap', 'hat'])}
        </>
      )}

      {selectedCategory === 'kids' && (
        <>
          {renderSection("T-Shirts", ['shirt', 't-shirt', 'tee', 'jersey'])}
          {renderSection("Shorts & Pants", ['pant', 'short', 'trouser'])}
          {renderSection("Footwear", ['shoe', 'slipper', 'footwear', 'sneaker'])}
          
          {/* Accessories Section */}
          {renderSection("ACCESSORIES", [], true)}
          {renderSection("Watches", ['watch'])}
          {renderSection("Perfumes", ['perfume', 'fragrance'])}
          {renderSection("Caps", ['cap', 'hat'])}
        </>
      )}

    </div>
  );
};

// Button styling
const btnStyle = (isActive) => ({
  padding: '10px 22px',
  background: isActive ? '#64748b' : '#0f172a',
  color: '#fff',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: '0.3s'
});

export default Shop;