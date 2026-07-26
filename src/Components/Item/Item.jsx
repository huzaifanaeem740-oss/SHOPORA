import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      
      <div className="item-img-container">
        {/* Wishlist / Heart Icon (Make sure apka icon path yahan sahi ho) */}
        <span className="item-heart-icon">♡</span> 
        
        {/* Product Image */}
        <Link to={`/product/${props.id}`}>
          <img onClick={() => window.scrollTo(0,0)} src={props.image} alt="" />
        </Link>
      </div>

      <p>{props.name}</p>
      
      <div className="item-prices">
        <div className="item-price-new">
          PKR {props.new_price}
        </div>
        <div className="item-price-old">
          PKR {props.old_price}
        </div>
      </div>

    </div>
  );
};

export default Item;