import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { getStoredOrders, saveStoredOrders } from '../../ProductStore';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert('Please fill in all the required details!');
      return;
    }

    const newOrder = {
      id: '#ORD-' + Math.floor(1000 + Math.random() * 9000),
      customer: name,
      email: email,
      phone: phone,
      address: address,
      payment: paymentMethod,
      total: '$' + getTotalCartAmount(),
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };

    const existingOrders = getStoredOrders();
    saveStoredOrders([...existingOrders, newOrder]);

    setOrderPlaced(true);
  };

  return (
    <div className='cartitems' style={{ width: '100%', minHeight: '80vh', backgroundColor: '#fafaf9', padding: '40px 20px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        
        <div className="cartitems-format-main" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: '20px', padding: '20px 0', color: '#1e293b', fontSize: '18px', fontWeight: 'bold', borderBottom: '2px solid #e2e8f0' }}>
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format cartitems-format-main" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: '20px', padding: '15px 0', color: '#334155', fontSize: '16px', fontWeight: '500', borderBottom: '1px solid #f1f5f9' }}>
                  <img src={e.image} alt="" style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button style={{ width: '50px', height: '40px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 'bold' }}>{cartItems[e.id]}</button>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img onClick={() => removeFromCart(e.id)} src="https://static.vecteezy.com/system/resources/thumbnails/018/887/462/small/signs-close-icon-png.png" alt="remove" style={{ width: '20px', cursor: 'pointer' }} />
                </div>
              </div>
            );
          }
          return null;
        })}

        {/* Cart Totals Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
          <div style={{ width: '100%', maxWidth: '400px', background: '#f8fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Cart Totals</h2>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <p>Subtotal</p>
                <p style={{ fontWeight: '600', color: '#1e293b' }}>${getTotalCartAmount()}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <p>Shipping Fee</p>
                <p style={{ fontWeight: '600', color: '#16a34a' }}>Free</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
                <p>Total</p>
                <p>${getTotalCartAmount()}</p>
              </div>
            </div>

            {getTotalCartAmount() > 0 && (
              <button 
                onClick={() => { setShowModal(true); setOrderPlaced(false); }} 
                style={{ width: '100%', height: '50px', outline: 'none', border: 'none', background: '#0f172a', color: '#fff', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', marginTop: '20px' }}
              >
                PROCEED TO CHECKOUT
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Checkout Popup Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '480px', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b', fontWeight: 'bold' }}
            >
              &times;
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b', textAlign: 'center' }}>Checkout Details</h3>
            
            {orderPlaced ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <h4 style={{ color: '#16a34a', fontSize: '22px', marginBottom: '10px' }}>🎉 Order Placed Successfully!</h4>
                <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '14px' }}></p>
                <button 
                  onClick={() => setShowModal(false)}
                  style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#475569' }}>Full Name</label>
                  <input 
                    type="text" placeholder="e.g. Faraz Qureshi" value={name} onChange={(e) => setName(e.target.value)} required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#475569' }}>Email Address</label>
                  <input 
                    type="email" placeholder="e.g. faraz@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#475569' }}>Phone Number</label>
                  <input 
                    type="text" placeholder="e.g. 03001234567" value={phone} onChange={(e) => setPhone(e.target.value)} required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#475569' }}>Delivery Address</label>
                  <textarea 
                    placeholder="Enter your complete delivery address..." value={address} onChange={(e) => setAddress(e.target.value)} required rows="2"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontFamily: 'sans-serif' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#475569' }}>Payment Method</label>
                  <select 
                    value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                  </select>
                </div>
                <button type="submit" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>
                  Confirm Order
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;