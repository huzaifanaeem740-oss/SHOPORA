import React, { useContext } from 'react'
import './CSS/Wishlist.css'
import { ShopContext } from '../Context/ShopContext'

const Wishlist = () => {
  const { all_product, wishlistItems, removeFromWishlist, addToCart } = useContext(ShopContext);

  return (
    <div className='wishlist'>
      <h1>My Wishlist</h1>
      <div className="wishlist-container">
        {all_product.map((e) => {
          if (wishlistItems.includes(e.id)) {
            return (
              <div key={e.id} className="wishlist-item">
                <img src={e.image} alt={e.name} className="wishlist-product-icon" />
                <p className="wishlist-title">{e.name}</p>
                <p className="wishlist-price">PKR-{e.new_price}</p>
                <div className="wishlist-actions">
                  <button className="add-btn" onClick={() => addToCart(e.id)}>ADD TO CART</button>
                  <button className="remove-btn" onClick={() => removeFromWishlist(e.id)}>Remove</button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default Wishlist