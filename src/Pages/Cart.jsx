import React, { useContext } from 'react';
import './CSS/Cart.css';
// import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/cart_cross_icon.png';
import product_img from '../Components/Assets/cart_icon.png'; // Apne kisi bhi local product image ka path dein

const Cart = () => {
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Item with local image */}
      <div className="cartitems-format cartitems-format-main">
        <img src={product_img} alt="" className='carticon-product-icon' />
        <p>Women Vintage Graphic Top</p>
        <p>PKR 2899</p>
        <button className='cartitems-quantity'>1</button>
        <p>PKR 2899</p>
        <img className='cartitems-remove-icon' src={remove_icon} alt="Remove" />
      </div>
      <hr />

      {/* Bottom Section: Totals & Checkout */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>PKR 2899</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item total">
              <h3>Total</h3>
              <h3>PKR 2899</h3>
            </div>
          </div>
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;