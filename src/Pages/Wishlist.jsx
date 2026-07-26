import React, { useContext } from 'react';
import './CSS/Wishlist.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const Wishlist = () => {
  const { all_product, wishlistItems, toggleWishlist, } = useContext(ShopContext);

  return (
    <div className='wishlist'>
      <h1>My Wishlist</h1>
      <div className="wishlist-container" style={{ width: '80%', margin: '0 auto', minHeight: '400px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginTop: '30px' }}>
          {all_product.map((e) => {
            // Agar product wishlist mein true hai toh display hoga
            if (wishlistItems[e.id]) {
              return (
                <div key={e.id} style={{ position: 'relative' }}>
                  <Item 
                    id={e.id} 
                    name={e.name} 
                    image={e.image} 
                    new_price={e.new_price} 
                    old_price={e.old_price} 
                  />
                  <button 
                    onClick={() => toggleWishlist(e.id)}
                    style={{
                      marginTop: '10px',
                      width: '100%',
                      padding: '8px',
                      background: '#ff4141',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;