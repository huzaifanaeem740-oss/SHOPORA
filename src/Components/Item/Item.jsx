import React, { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(ShopContext);

  const isWishlisted = wishlistItems && wishlistItems.includes(props.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(props.id);
    } else {
      addToWishlist(props.id);
    }
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <div className="item-img-box">
          <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} />
          
          <button className="item-wishlist-icon" onClick={handleWishlistClick}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className={`wishlist-svg ${isWishlisted ? 'active' : ''}`}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </Link>
      
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          PKR {props.new_price}
        </div>
        {props.old_price && (
          <div className="item-price-old">
            PKR {props.old_price}
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;