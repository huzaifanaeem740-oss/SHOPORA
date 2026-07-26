import React, { useContext } from 'react';
import './CSS/Cart.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/cart_cross_icon.png';

const Cart = () => {
  const { all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);

  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = all_product.find((product) => product.id === Number(item));
      if (itemInfo) {
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
  }

  return (
    <div className='cart'>
      <h1 className="cart-page-title">YOUR SHOPPING CART</h1>
      
      <div className="cart-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cart-format cart-format-main">
                <img src={e.image} alt="" className='cart-icon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cart-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cart-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cart-down">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-item">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-total-item">
              <h3>Total</h3>
              <h3>${totalAmount}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;