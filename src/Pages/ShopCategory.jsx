import React, { useState, useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  
  // Selected sub-type state ('all' by default)
  const [selectedType, setSelectedType] = useState('all');

  return (
    <div className='shop-category-page' style={{ width: '100%', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* Category / Type Filter Bar */}
      <div className="category-filter-bar" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', margin: '30px auto', width: '90%', maxWidth: '1400px' }}>
        <button onClick={() => setSelectedType('all')} style={btnStyle(selectedType === 'all')}>All</button>
        <button onClick={() => setSelectedType('shirt')} style={btnStyle(selectedType === 'shirt')}>Shirts / Tops</button>
        <button onClick={() => setSelectedType('pant')} style={btnStyle(selectedType === 'pant')}>Pants / Shorts</button>
        
        {/* Dynamic / Multi-type Support for Footwear & Slippers */}
        <button onClick={() => setSelectedType('footwear')} style={btnStyle(selectedType === 'footwear' || selectedType === 'shoe')}>Footwear / Shoes</button>
        <button onClick={() => setSelectedType('slippers')} style={btnStyle(selectedType === 'slippers' || selectedType === 'slipper')}>Slippers / Sandals</button>
        
        <button onClick={() => setSelectedType('watch')} style={btnStyle(selectedType === 'watch')}>Watches</button>
        
        {/* Handles both 'perfumes' and 'perfume' */}
        <button onClick={() => setSelectedType('perfume')} style={btnStyle(selectedType === 'perfume' || selectedType === 'perfumes')}>Perfumes</button>
        
        {/* Handles both 'belts' and 'belt' */}
        <button onClick={() => setSelectedType('belts')} style={btnStyle(selectedType === 'belts' || selectedType === 'belt')}>Belts</button>
        
        <button onClick={() => setSelectedType('cap')} style={btnStyle(selectedType === 'cap')}>Caps / Hats</button>
      </div>

      {/* Products Grid */}
      <div className='shop-category' style={{ width: '85%', margin: '20px auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', maxWidth: '1400px' }}>
        {all_product.map((item, i) => {
          const matchesCategory = props.category === item.category;
          
          // Flexible type matching across different spellings used in data
          const matchesType = 
            selectedType === 'all' || 
            item.type === selectedType ||
            (selectedType === 'footwear' && (item.type === 'footwear' || item.type === 'shoe')) ||
            (selectedType === 'slippers' && (item.type === 'slippers' || item.type === 'slipper')) ||
            (selectedType === 'perfume' && (item.type === 'perfume' || item.type === 'perfumes')) ||
            (selectedType === 'belts' && (item.type === 'belts' || item.type === 'belt'));

          if (matchesCategory && matchesType) {
            return (
              <Item 
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} 
              />
            );
          } else {
            return null;
          }
        })}
      </div>

    </div>
  );
};

// Helper style for filter buttons
const btnStyle = (isActive) => ({
  padding: '10px 18px',
  background: isActive ? '#ea580c' : '#0f172a',
  color: '#fff',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '600',
  transition: '0.3s'
});

export default ShopCategory;