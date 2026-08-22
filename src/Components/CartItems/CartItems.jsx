import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CartItems.css';

const CartItems = () => {
  const { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount ? getTotalCartAmount() : 0;
  const hasItems = Object.keys(cartItems || {}).some((key) => cartItems[key] > 0);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('userToken') ||
      localStorage.getItem('accessToken') ||
      ''
    );
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert('Please fill in all the required details!');
      return;
    }

    try {
      setPlacingOrder(true);
      const token = getToken();

      if (!token) {
        alert('You must be logged in to place an order.');
        setPlacingOrder(false);
        return;
      }

      const orderItems = all_product
        .filter((p) => cartItems[p.id] > 0)
        .map((p) => ({
          product_id: p.id,
          quantity: cartItems[p.id],
          price: p.new_price,
        }));

      if (orderItems.length === 0) {
        alert('Your cart is empty.');
        setPlacingOrder(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shipping_address: address,
          payment_method: paymentMethod,
          total_amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to place order');
        setPlacingOrder(false);
        return;
      }

      orderItems.forEach((item) => {
        const qty = cartItems[item.product_id];
        for (let i = 0; i < qty; i++) {
          removeFromCart(item.product_id);
        }
      });

      setOrderPlaced(true);
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Something went wrong while placing the order');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="cartitems-container">
      {!hasItems ? (
        <div className="empty-cart-state">
          <div className="empty-cart-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
        </div>
      ) : (
        <div className="cartitems-wrapper">
          <div className="cartitems-list">
            <div className="cartitems-header">
              <p className="col-img">Product</p>
              <p className="col-title">Title</p>
              <p className="col-price">Price</p>
              <p className="col-qty">Quantity</p>
              <p className="col-total">Total</p>
              <p className="col-remove">Remove</p>
            </div>

            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <div key={e.id} className="cartitem-row">
                    <div className="col-img">
                      <img src={e.image} alt={e.name} className="cart-product-thumb" />
                    </div>
                    <p className="col-title cart-product-title">{e.name}</p>
                    <p className="col-price">PKR {e.new_price}</p>
                    
                    <div className="col-qty">
                      <div className="cartitems-quantity-btn">
                        <button onClick={() => removeFromCart(e.id)}>-</button>
                        <span>{cartItems[e.id]}</span>
                        <button onClick={() => addToCart(e.id)}>+</button>
                      </div>
                    </div>

                    <p className="col-total cart-product-total">PKR {e.new_price * cartItems[e.id]}</p>
                    <div className="col-remove">
                      <button 
                        className="cartitems-remove-icon" 
                        onClick={() => {
                          for (let i = 0; i < cartItems[e.id]; i++) removeFromCart(e.id);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="cartitems-summary-slide-in">
            <div className="cartitems-total">
              <h3>Cart Totals</h3>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>PKR {totalAmount}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p className="free-shipping">Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item grand-total">
                <h3>Total</h3>
                <h3>PKR {totalAmount}</h3>
              </div>
              <button
                className="checkout-btn"
                onClick={() => { setShowModal(true); setOrderPlaced(false); }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-card animate-pop">
            <button className="modal-close-icon" onClick={() => setShowModal(false)}>&times;</button>

            {orderPlaced ? (
              <div className="order-success-view">
                <div className="modal-icon-container">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2>Order Placed Successfully!</h2>
                <p className="modal-subtext">Thank you for shopping with <strong>VESTRO X</strong>. Your order has been placed.</p>
                <button className="modal-btn-primary" onClick={() => setShowModal(false)}>Continue Shopping</button>
              </div>
            ) : (
              <div>
                <h3 className="modal-header-title">Checkout Details</h3>
                <form onSubmit={handleOrderSubmit} className="checkout-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Faraz Qureshi" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="e.g. faraz@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder="e.g. 03001234567" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <textarea placeholder="Enter complete address..." value={address} onChange={(e) => setAddress(e.target.value)} required rows="2" />
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option value="COD">Cash on Delivery (COD)</option>
                      <option value="JazzCash">JazzCash</option>
                      <option value="EasyPaisa">EasyPaisa</option>
                    </select>
                  </div>
                  <button type="submit" className="modal-submit-btn" disabled={placingOrder}>
                    {placingOrder ? 'Placing Order...' : 'Confirm Order'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;