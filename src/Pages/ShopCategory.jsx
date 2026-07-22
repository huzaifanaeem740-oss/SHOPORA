import React, { useContext, useRef } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='shop-category'>
      <div className='shopcategory-banner'>
        <div className="banner-left">
          <h3>Easy return policy for 7 days</h3>
          <h1>FLAT 50% OFF , Low delievery charges</h1>
          <button className="get-it-btn" onClick={scrollToProducts}>Get it</button>
        </div>
        <div className="banner-right">
          <img src={props.banner} alt="category banner" />
        </div>
      </div>
      
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products" ref={productsRef}>
        {all_product.map((item, i) => {
          if (props.category === item.category) {
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
          }
          return null;
        })}
      </div>

      <div className="shopcategory-loadmore" onClick={scrollToProducts}>
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;