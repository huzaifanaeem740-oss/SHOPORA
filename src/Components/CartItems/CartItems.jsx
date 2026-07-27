import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('COD (Cash on Delivery)');
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FARAZ') {
      setDiscount(0.75);
      setPromoMessage('🎉 75% OFF Applied!');
    } else {
      setDiscount(0);
      setPromoMessage('❌ Invalid Code');
    }
  };

  const subtotal = getTotalCartAmount ? getTotalCartAmount() : 0;
  const finalTotal = Math.round(subtotal * (1 - discount));

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    let orderDetailsText = `*New Order Placed - VESTRO X*\n\n`;
    orderDetailsText += `*Customer Name:* ${customerDetails.name}\n`;
    orderDetailsText += `*Phone:* ${customerDetails.phone}\n`;
    orderDetailsText += `*Address:* ${customerDetails.address}\n\n`;
    orderDetailsText += `*Items Ordered:*\n`;

    all_product.forEach((item) => {
      let qty = cartItems[item.id] || cartItems[String(item.id)] || cartItems[Number(item.id)] || 0;
      if (qty > 0) {
        orderDetailsText += `- ${item.name} (x${qty}) : PKR ${item.new_price * qty}\n`;
      }
    });

    orderDetailsText += `\n*Subtotal:* PKR ${subtotal}`;
    if (discount > 0) {
      orderDetailsText += `\n*Discount:* 75% OFF`;
    }
    orderDetailsText += `\n*Total Amount:* PKR ${finalTotal}`;
    orderDetailsText += `\n*Payment Method:* ${selectedPayment}`;

    const encodedMessage = encodeURIComponent(orderDetailsText);
    const whatsappUrl = `https://wa.me/923282134905?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ padding: '10px 8px', background: '#fff', width: '100%', maxWidth: '100%', margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <h2 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '18px', paddingLeft: '4px' }}>Shopping Cart</h2>
      
      {/* Cart Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
        {all_product.map((e) => {
          let qty = cartItems[e.id] || cartItems[String(e.id)] || cartItems[Number(e.id)] || 0;
          if (qty > 0) {
            return (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fdfdfd', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e5e7eb', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                <img src={e.image} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: '600', fontSize: '12px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.name}</p>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>PKR {e.new_price} × {qty}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '12px', margin: 0 }}>PKR {e.new_price * qty}</p>
                  <span 
                    onClick={() => removeFromCart(e.id)} 
                    style={{ cursor: 'pointer', color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                    ❌
                  </span>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Promo Code & Totals Section */}
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Promo Code Box */}
        <div style={{ width: '100%', background: '#f9fafb', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: '13px', margin: '0 0 3px 0', fontWeight: 'bold' }}>Promo Code</h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 8px 0' }}>Use (FARAZ) for 75% off</p>
          <div style={{ display: 'flex', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
            <input 
              type="text" 
              placeholder="Enter Code" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)}
              style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', outline: 'none', boxSizing: 'border-box', minWidth: 0 }}
            />
            <button 
              onClick={handleApplyPromo}
              style={{ padding: '6px 12px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>
              Apply
            </button>
          </div>
          {promoMessage && <p style={{ marginTop: '6px', fontSize: '11px', fontWeight: 'bold', color: discount > 0 ? 'green' : 'red' }}>{promoMessage}</p>}
        </div>

        {/* Cart Totals Box */}
        <div style={{ width: '100%', background: '#f9fafb', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: '13px', margin: '0 0 8px 0', fontWeight: 'bold' }}>Cart Totals</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', fontSize: '12px' }}>
            <p style={{ margin: 0, color: '#4b5563' }}>Subtotal</p>
            <p style={{ margin: 0, fontWeight: '500' }}>PKR {subtotal}</p>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', color: 'green', fontWeight: 'bold', fontSize: '12px' }}>
              <p style={{ margin: 0 }}>Discount (75%)</p>
              <p style={{ margin: 0 }}>- PKR {Math.round(subtotal * discount)}</p>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', fontSize: '12px' }}>
            <p style={{ margin: 0, color: '#4b5563' }}>Shipping Fee</p>
            <p style={{ margin: 0, fontWeight: '500' }}>Free</p>
          </div>
          <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '6px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', fontWeight: 'bold', fontSize: '14px' }}>
            <p style={{ margin: 0 }}>Total</p>
            <p style={{ margin: 0 }}>PKR {finalTotal}</p>
          </div>
          <button 
            onClick={() => setShowCheckoutModal(true)}
            style={{ width: '100%', padding: '9px', background: '#dc2626', color: 'white', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', fontSize: '13px', boxSizing: 'border-box' }}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      {/* Checkout Popup Modal */}
      {showCheckoutModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '10px', boxSizing: 'border-box' }}>
          <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', width: '100%', maxWidth: '360px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', boxSizing: 'border-box', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: 'bold' }}>Checkout Details</h3>
            <form onSubmit={handleConfirmOrder}>
              <div style={{ margin: '6px 0' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', color: '#374151' }}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your name" 
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  style={{ width: '100%', padding: '6px', marginTop: '2px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div style={{ margin: '6px 0' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', color: '#374151' }}>Phone Number</label>
                <input 
                  type="text" 
                  required 
                  placeholder="03XXXXXXXXX" 
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  style={{ width: '100%', padding: '6px', marginTop: '2px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div style={{ margin: '6px 0' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', color: '#374151' }}>Shipping Address</label>
                <textarea 
                  required 
                  placeholder="Enter complete address" 
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  style={{ width: '100%', padding: '6px', marginTop: '2px', border: '1px solid #ccc', borderRadius: '4px', height: '40px', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div style={{ margin: '8px 0' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#374151' }}>Payment Method</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {['JazzCash', 'EasyPaisa', 'Credit Card', 'Debit Card', 'COD (Cash on Delivery)'].map((method) => (
                    <label key={method} style={{ fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method} 
                        checked={selectedPayment === method} 
                        onChange={(e) => setSelectedPayment(e.target.value)}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowCheckoutModal(false)}
                  style={{ flex: 1, padding: '7px', background: '#e5e7eb', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ flex: 1, padding: '7px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItems