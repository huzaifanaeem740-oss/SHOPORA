import React, { useContext } from 'react';
import './CSS/Wishlist.css';
import { ShopContext } from '../Context/ShopContext';

const Wishlist = () => {
  const { wishlistItems, all_product, removeFromWishlist, addToCart } = useContext(ShopContext);

  const wishlistProducts = all_product.filter((product) => 
    wishlistItems.includes(product.id) || wishlistItems.includes(String(product.id))
  );

  return (
    <div className="wishlist-container">
      
      {/* Marquee Patti */}
     

      <div className="wishlist-header">
        <h1>Favorites ({wishlistProducts.length})</h1>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => {
            return (
              <div key={product.id} className="wishlist-item-card">
                <div className="wishlist-img-container">
                  <img src={product.image} alt={product.name} />
                  <button 
                    className="remove-wishlist-btn" 
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from favorites"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="wishlist-item-info">
                  <h3>{product.name}</h3>
                  <p className="wishlist-category">{product.category || 'Shoes / Clothing'}</p>
                  <p className="wishlist-price">
                    PKR {product.new_price || product.price}
                  </p>
                  
                  <button 
                    className="wishlist-add-to-cart-btn"
                    onClick={() => {
                      addToCart(product.id);
                      removeFromWishlist(product.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-wishlist-page">
          <p>There are no saved items in your favorites.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;