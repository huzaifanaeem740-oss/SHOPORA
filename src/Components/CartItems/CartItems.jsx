import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'FARAZ') {
      setDiscount(0.75);
      setCouponMessage('Coupon applied successfully! 75% OFF');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid Coupon Code');
    }
  };

  const subtotal = getTotalCartAmount();
  const discountedTotal = Math.round(subtotal * (1 - discount));

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    
    let itemsDetails = '';
    all_product.forEach((product) => {
      if (cartItems[product.id] > 0) {
        itemsDetails += `- ${product.name} x ${cartItems[product.id]} = PKR ${product.new_price * cartItems[product.id]}\n`;
      }
    });

    const message = `*New Order Placed via Vestro X!*\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\n*Products:*\n${itemsDetails}\n*Subtotal:* PKR ${subtotal}\n*Discounted Total:* PKR ${discountedTotal} ${discount > 0 ? '(75% OFF)' : ''}\n*Payment Method:* ${paymentMethod}\n*Coupon Used:* ${coupon ? coupon : 'None'}`;

    const whatsappUrl = `https://wa.me/923282134905?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
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
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>PKR {e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>PKR {e.new_price * cartItems[e.id]}</p>
                <img src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" style={{cursor: 'pointer'}} />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>PKR {subtotal}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>PKR {discountedTotal} {discount > 0 && <span style={{fontSize: '12px', color: 'green'}}>(75% OFF)</span>}</h3>
            </div>
          </div>
          <button onClick={() => setShowCheckoutPopup(true)}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input 
              type="text" 
              placeholder="" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)} 
            />
            <button onClick={handleApplyCoupon}>Submit</button>
          </div>
          {couponMessage && <p style={{ fontSize: '13px', color: discount > 0 ? 'green' : 'red', marginTop: '5px' }}>{couponMessage}</p>}
        </div>
      </div>

      {showCheckoutPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '400px', maxWidth: '90%' }}>
            <h2>Checkout Details</h2>
            <form onSubmit={handleWhatsAppCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <input 
                type="text" 
                placeholder="Enter Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <input 
                type="text" 
                placeholder="Enter Phone Number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <textarea 
                placeholder="Enter Delivery Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
              />

              <div>
                <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Select Payment Method:</label>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                  <label><input type="radio" name="popupPayment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} /> COD</label>
                  <label><input type="radio" name="popupPayment" value="JazzCash" checked={paymentMethod === 'JazzCash'} onChange={(e) => setPaymentMethod(e.target.value)} /> JazzCash</label>
                  <label><input type="radio" name="popupPayment" value="EasyPaisa" checked={paymentMethod === 'EasyPaisa'} onChange={(e) => setPaymentMethod(e.target.value)} /> EasyPaisa</label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, background: '#ff4141', color: 'white', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '5px', fontWeight: '600' }}>
                  CONFIRM & ORDER VIA WHATSAPP
                </button>
                <button type="button" onClick={() => setShowCheckoutPopup(false)} style={{ background: '#ccc', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '5px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;