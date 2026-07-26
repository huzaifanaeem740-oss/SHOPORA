import React, { useContext } from 'react';
import './CSS/Wishlist.css';
import { ShopContext } from '../Context/ShopContext';

const Wishlist = () => {
  const { all_product, wishlistItems, removeFromWishlist } = useContext(ShopContext);

  return (
    <div className='wishlist-container'>
      <h1>My Wishlist</h1>
      
      <div className="wishlist-grid">
        {all_product.map((e) => {
          if (wishlistItems[e.id] > 0) {
            return (
              <div className="wishlist-item-card" key={e.id}>
                <div className="wishlist-img-box">
                  <img src={e.image} alt="Product" />
                </div>
                
                <div className="wishlist-item-details">
                  <h3>{e.name}</h3>
                  <div className="wishlist-prices">
                    <span className="wishlist-new-price">PKR {e.new_price}</span>
                    <span className="wishlist-old-price">PKR {e.old_price}</span>
                  </div>
                </div>

                <button 
                  className="wishlist-remove-btn" 
                  onClick={() => removeFromWishlist(e.id)}
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
  );
};

export default Wishlist;