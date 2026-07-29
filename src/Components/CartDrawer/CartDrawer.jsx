import React from 'react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, cartItems, allProducts = [], updateQuantity, removeFromCart, getTotalCartAmount, navigate }) => {
  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-drawer-header">
          <h2>Your cart</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-items">
          {cartItems && Object.keys(cartItems).some(id => cartItems[id] > 0) ? (
            Object.entries(cartItems).map(([itemId, quantity]) => {
              if (quantity > 0) {
                // Agar aapke paas product list hai toh yahan product detail match kar sakte hain
                const product = allProducts.find(p => p.id === Number(itemId) || p.id === itemId);
                
                return (
                  <div className="cart-drawer-item" key={itemId}>
                    {product && <img src={product.image} alt={product.name} />}
                    <div className="item-details">
                      <p className="item-title">{product ? product.name : `Product ID: ${itemId}`}</p>
                      <p className="item-price">PKR {product ? product.price : ''}</p>
                      <p className="item-qty">Quantity: {quantity}</p>
                    </div>
                    {removeFromCart && (
                      <button className="item-remove" onClick={() => removeFromCart(itemId)}>&times;</button>
                    )}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="empty-cart-text">Your cart is empty</p>
          )}
        </div>

        {/* Footer (Subtotal & Buttons) */}
        <div className="cart-drawer-footer">
          <div className="subtotal-row">
            <span>Subtotal</span>
            <span>PKR {getTotalCartAmount ? getTotalCartAmount() : 0}</span>
          </div>
          <p className="tax-note">Taxes included and shipping calculated at checkout</p>
          
          <button className="view-cart-btn" onClick={() => { onClose(); navigate('/cart'); }}>
            VIEW CART
          </button>
          
          <button className="checkout-btn" onClick={() => { onClose(); navigate('/checkout'); }}>
            CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartDrawer;