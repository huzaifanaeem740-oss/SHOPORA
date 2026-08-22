import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './Item.css';

const Item = (props) => {
  const context = useContext(ShopContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check initial state from Context safely
  const isInContextWishlist = context?.wishlistItems?.[props.id] > 0;
  const activeState = isInContextWishlist || isWishlisted;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = !activeState;
    setIsWishlisted(newState);

    if (newState) {
      if (context?.addToWishlist) context.addToWishlist(props.id);
    } else {
      if (context?.removeFromWishlist) context.removeFromWishlist(props.id);
    }
  };

  return (
    <div className="item-card">
      <div className="item-image-container">
        <Link to={`/product/${props.id}`}>
          <img 
            onClick={() => window.scrollTo(0, 0)} 
            src={props.image} 
            alt={props.name} 
            className="item-image"
          />
        </Link>
        
        {/* Wishlist Heart Button */}
        <button 
          className={`wishlist-btn ${activeState ? 'active' : ''}`} 
          onClick={handleWishlistToggle}
          type="button"
          aria-label="Wishlist"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={activeState ? "#000000" : "none"} 
            stroke={activeState ? "#000000" : "#222222"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="item-details">
        <p className="item-name">{props.name}</p>
        <div className="item-prices">
          <span className="item-price-new">PKR {props.new_price}</span>
          {props.old_price && (
            <span className="item-price-old">PKR {props.old_price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;