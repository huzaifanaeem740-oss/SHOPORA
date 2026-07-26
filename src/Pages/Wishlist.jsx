import React, { useContext } from 'react';
import './CSS/Wishlist.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { all_product, wishlistItems, addToCart, toggleWishlist } = useContext(ShopContext);

  const wishlistProducts = all_product.filter((product) => 
    wishlistItems && wishlistItems.includes(product.id)
  );

  return (
    <div className='wishlist-container'>
      <h1 className="wishlist-title">MY WISHLIST</h1>
      
      {wishlistProducts.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((item) => (
            <div key={item.id} className="wishlist-card">
              <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                <img src={item.image} alt={item.name} className="wishlist-card-image" />
                <p className="wishlist-card-name">{item.name}</p>
              </Link>

              <div className="wishlist-card-prices">
                <span className="wishlist-price-new">PKR {item.new_price}</span>
                {item.old_price && <span className="wishlist-price-old">PKR {item.old_price}</span>}
              </div>

              <div className="wishlist-card-actions">
                <button 
                  className="wishlist-add-to-cart-btn" 
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
                <button 
                  className="wishlist-remove-btn" 
                  onClick={() => toggleWishlist(item.id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;