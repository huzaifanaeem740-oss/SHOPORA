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
  
  const [selectedCategory, setSelectedCategory] = useState('men');
  const [activeSubFilter, setActiveSubFilter] = useState('all');

  const getBanner = () => {
    if (selectedCategory === 'men') return banner_mens;
    if (selectedCategory === 'women') return banner_womens;
    if (selectedCategory === 'kids') return banner_kids;
    return banner_mens;
  };

  const handleMainCategory = (category) => {
    setSelectedCategory(category);
    setActiveSubFilter('all');
  };

  const renderSection = (title, allowedKeywords, sectionKey, isBlackBar = false) => {
    if (activeSubFilter !== 'all' && activeSubFilter !== sectionKey) {
      return null;
    }

    const filteredProducts = all_product.filter(item => {
      if (item.category !== selectedCategory) return false;
      if (isBlackBar) return false;

      const itemName = (item.name || '').toLowerCase();
      const itemType = (item.type || '').toLowerCase();

      if (allowedKeywords.includes('shirt') || allowedKeywords.includes('top') || allowedKeywords.includes('jersey') || allowedKeywords.includes('t-shirt')) {
        if (itemName.includes('watch') || itemName.includes('shoe') || itemName.includes('sneaker') || itemName.includes('belt') || itemName.includes('cap') || itemName.includes('perfume')) {
          return false;
        }
      }

      return allowedKeywords.some(keyword => 
        itemName.includes(keyword) || itemType.includes(keyword)
      );
    });

    if (filteredProducts.length === 0 && !isBlackBar) return null;

    return (
      <div key={title} id={sectionKey} className="shop-section-container" style={{ width: '85%', maxWidth: '1400px', margin: '30px auto' }}>
        {isBlackBar ? (
          <div style={{ background: '#0f172a', color: '#fff', padding: '14px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 / 0.1)' }}>
            <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '700' }}>{title}</h3>
          </div>
        ) : (
          <div style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '8px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1e293b' }}>{title}</h3>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="shop-products-grid">
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
    <div className='shop-page' style={{ width: '100%', minHeight: '100vh', background: '#ffffff', paddingBottom: '50px', overflowX: 'hidden' }}>
      
      <div className="shop-hero" style={{ textAlign: 'center', padding: '20px 0' }}>
        
        {/* Banner */}
        <div className="shop-banner-container" style={{ width: '70%', maxWidth: '750px', margin: '0 auto 20px auto' }}>
          <img 
            src={getBanner()} 
            alt="Category Banner" 
            style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', margin: '0 auto' }} 
          />
        </div>
        
        {/* Main Category Switch Buttons */}
        <div className="main-category-filter" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => handleMainCategory('men')} style={btnStyle(selectedCategory === 'men')}>Mens</button>
          <button onClick={() => handleMainCategory('women')} style={btnStyle(selectedCategory === 'women')}>Womens</button>
          <button onClick={() => handleMainCategory('kids')} style={btnStyle(selectedCategory === 'kids')}>Kids</button>
        </div>

        {/* Desktop Buttons Filter (Hidden on Mobile via CSS) */}
        <div className="sub-category-filter desktop-sub-filter" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveSubFilter('all')} style={subBtnStyle(activeSubFilter === 'all')}>All</button>
          
          {selectedCategory !== 'kids' ? (
            <>
              <button onClick={() => setActiveSubFilter('shirts')} style={subBtnStyle(activeSubFilter === 'shirts')}>Shirts & Jerseys</button>
              <button onClick={() => setActiveSubFilter('pants')} style={subBtnStyle(activeSubFilter === 'pants')}>Pants & Trousers</button>
              <button onClick={() => setActiveSubFilter('shoes')} style={subBtnStyle(activeSubFilter === 'shoes')}>Footwear</button>
              <button onClick={() => setActiveSubFilter('watches')} style={subBtnStyle(activeSubFilter === 'watches')}>Watches</button>
              <button onClick={() => setActiveSubFilter('perfumes')} style={subBtnStyle(activeSubFilter === 'perfumes')}>Perfumes</button>
              <button onClick={() => setActiveSubFilter('belts')} style={subBtnStyle(activeSubFilter === 'belts')}>Belts</button>
              <button onClick={() => setActiveSubFilter('caps')} style={subBtnStyle(activeSubFilter === 'caps')}>Caps</button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveSubFilter('shirts')} style={subBtnStyle(activeSubFilter === 'shirts')}>T-Shirts</button>
              <button onClick={() => setActiveSubFilter('pants')} style={subBtnStyle(activeSubFilter === 'pants')}>Shorts & Pants</button>
              <button onClick={() => setActiveSubFilter('shoes')} style={subBtnStyle(activeSubFilter === 'shoes')}>Footwear</button>
              <button onClick={() => setActiveSubFilter('watches')} style={subBtnStyle(activeSubFilter === 'watches')}>Watches</button>
              <button onClick={() => setActiveSubFilter('perfumes')} style={subBtnStyle(activeSubFilter === 'perfumes')}>Perfumes</button>
              <button onClick={() => setActiveSubFilter('caps')} style={subBtnStyle(activeSubFilter === 'caps')}>Caps</button>
            </>
          )}
        </div>

        {/* Mobile Dropdown Filter (Visible only on Mobile via CSS) */}
        <div className="mobile-dropdown-filter">
          <select 
            value={activeSubFilter} 
            onChange={(e) => setActiveSubFilter(e.target.value)}
            style={{
              width: '85%',
              maxWidth: '300px',
              padding: '10px 15px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1e293b',
              outline: 'none',
              marginTop: '12px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            <option value="all">All Categories</option>
            {selectedCategory !== 'kids' ? (
              <>
                <option value="shirts">Shirts & Jerseys</option>
                <option value="pants">Pants & Trousers</option>
                <option value="shoes">Footwear</option>
                <option value="watches">Watches</option>
                <option value="perfumes">Perfumes</option>
                <option value="belts">Belts</option>
                <option value="caps">Caps</option>
              </>
            ) : (
              <>
                <option value="shirts">T-Shirts</option>
                <option value="pants">Shorts & Pants</option>
                <option value="shoes">Footwear</option>
                <option value="watches">Watches</option>
                <option value="perfumes">Perfumes</option>
                <option value="caps">Caps</option>
              </>
            )}
          </select>
        </div>

      </div>

      {/* Render Sections */}
      {selectedCategory === 'men' && (
        <>
          {renderSection("Shirts & Jersey's", ['shirt', 't-shirt', 'jersey', 'tee'], 'shirts')}
          {renderSection("Pants & Trousers", ['pant', 'trouser', 'short', 'jean'], 'pants')}
          {renderSection("Shoes & Slippers", ['shoe', 'slipper', 'footwear', 'sneaker', 'sandal'], 'shoes')}
          {renderSection("ACCESSORIES", [], 'acc', true)}
          {renderSection("Watches", ['watch'], 'watches')}
          {renderSection("Perfumes", ['perfume', 'fragrance'], 'perfumes')}
          {renderSection("Belts", ['belt'], 'belts')}
          {renderSection("Caps", ['cap', 'hat'], 'caps')}
        </>
      )}

      {selectedCategory === 'women' && (
        <>
          {renderSection("Shirts & Jersey's", ['shirt', 'top', 'jersey', 'tee', 't-shirt'], 'shirts')}
          {renderSection("Pants & Trousers", ['pant', 'short', 'trouser', 'jean'], 'pants')}
          {renderSection("Shoes & Slippers", ['shoe', 'slipper', 'footwear', 'sneaker', 'sandal'], 'shoes')}
          {renderSection("ACCESSORIES", [], 'acc', true)}
          {renderSection("Watches", ['watch'], 'watches')}
          {renderSection("Perfumes", ['perfume', 'fragrance'], 'perfumes')}
          {renderSection("Belts", ['belt'], 'belts')}
          {renderSection("Caps", ['cap', 'hat'], 'caps')}
        </>
      )}

      {selectedCategory === 'kids' && (
        <>
          {renderSection("T-Shirts", ['shirt', 't-shirt', 'tee', 'jersey'], 'shirts')}
          {renderSection("Shorts & Pants", ['pant', 'short', 'trouser'], 'pants')}
          {renderSection("Footwear", ['shoe', 'slipper', 'footwear', 'sneaker'], 'shoes')}
          {renderSection("ACCESSORIES", [], 'acc', true)}
          {renderSection("Watches", ['watch'], 'watches')}
          {renderSection("Perfumes", ['perfume', 'fragrance'], 'perfumes')}
          {renderSection("Caps", ['cap', 'hat'], 'caps')}
        </>
      )}

    </div>
  );
};

const btnStyle = (isActive) => ({
  padding: '10px 22px',
  background: isActive ? '#0ea5e9' : '#0f172a',
  color: '#fff',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: '0.3s'
});

const subBtnStyle = (isActive) => ({
  padding: '6px 16px',
  background: isActive ? '#334155' : '#e2e8f0',
  color: isActive ? '#fff' : '#1e293b',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '500',
  transition: '0.3s'
});

export default Shop;