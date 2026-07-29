import React, { useState, useEffect } from 'react';
import { getStoredOrders, saveStoredOrders, getStoredProducts, saveStoredProducts } from '../ProductStore';
import logo_big from '../Components/Assets/logo_big.png';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Men');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
    const savedMsgs = JSON.parse(localStorage.getItem('admin_messages')) || [];
    setMessages(savedMsgs);
  }, []);

  const handleStatusChange = (id, newStatusVal) => {
    const updatedOrders = orders.map((order) => order.id === id ? { ...order, status: newStatusVal } : order);
    setOrders(updatedOrders);
    saveStoredOrders(updatedOrders);
  };

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    saveStoredOrders(updatedOrders);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    
    const newProd = {
      id: Number(Date.now()),
      name: newTitle,
      category: newCategory.toLowerCase(),
      image: newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      new_price: Number(newPrice),
      old_price: Number(newPrice) + 1000
    };

    const updatedProducts = [...products, newProd];
    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);

    setNewTitle('');
    setNewPrice('');
    setNewImage('');
    alert('Product added successfully & synced with website!');
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);
  };

  const handleSendReply = (id) => {
    const reply = replyText[id];
    if (!reply) return;

    const updatedMsgs = messages.map((msg) => msg.id === id ? { ...msg, reply } : msg);
    setMessages(updatedMsgs);
    localStorage.setItem('admin_messages', JSON.stringify(updatedMsgs));
    alert('Reply sent successfully to user!');
  };

  const totalRevenue = orders.reduce((acc, order) => {
    const cleanNum = Number(order.total?.replace(/[^0-9.-]+/g, '')) || 0;
    return acc + cleanNum;
  }, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header / Navbar */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={logo_big} alt="Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>VESTRO X <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'normal' }}>| Admin Panel</span></h2>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'dashboard' ? '#0f172a' : '#f1f5f9', color: activeTab === 'dashboard' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Dashboard & Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'products' ? '#0f172a' : '#f1f5f9', color: activeTab === 'products' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'messages' ? '#0f172a' : '#f1f5f9', color: activeTab === 'messages' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer', position: 'relative' }}
          >
            Messages {messages.filter(m => !m.reply).length > 0 && <span style={{ background: '#dc2626', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', marginLeft: '5px' }}>New</span>}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '30px 20px', flex: 1 }}>
        
        {activeTab === 'dashboard' ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>Total Orders</p>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{orders.length}</h3>
              </div>
              <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>Total Revenue</p>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>PKR {totalRevenue}</h3>
              </div>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Customer Orders</h2>
            {orders.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '16px' }}>No orders found.</p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#1e293b', fontSize: '14px' }}>
                      <th style={{ padding: '15px' }}>Order ID</th>
                      <th style={{ padding: '15px' }}>Customer</th>
                      <th style={{ padding: '15px' }}>Contact & Address</th>
                      <th style={{ padding: '15px' }}>Payment</th>
                      <th style={{ padding: '15px' }}>Total</th>
                      <th style={{ padding: '15px' }}>Status</th>
                      <th style={{ padding: '15px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#0f172a' }}>{order.id}</td>
                        <td style={{ padding: '15px' }}>
                          <div style={{ fontWeight: '600' }}>{order.customer}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{order.email}</div>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <div>{order.phone}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{order.address}</div>
                        </td>
                        <td style={{ padding: '15px' }}>{order.payment}</td>
                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#16a34a' }}>{order.total}</td>
                        <td style={{ padding: '15px' }}>
                          <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <button onClick={() => handleDeleteOrder(order.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : activeTab === 'products' ? (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Add New Product</h2>
            <form onSubmit={handleAddProduct} style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Product Title</label>
                <input type="text" placeholder="e.g. Black Tee" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Price (PKR)</label>
                <input type="number" placeholder="e.g. 2999" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Category</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', boxSizing: 'border-box' }}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kid">Kid</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Image URL</label>
                <input type="text" placeholder="https://..." value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '11px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Add Product</button>
            </form>

            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Existing Products</h2>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#1e293b', fontSize: '14px' }}>
                    <th style={{ padding: '15px' }}>Image</th>
                    <th style={{ padding: '15px' }}>Title</th>
                    <th style={{ padding: '15px' }}>Price</th>
                    <th style={{ padding: '15px' }}>Category</th>
                    <th style={{ padding: '15px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
                      <td style={{ padding: '12px 15px' }}><img src={p.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /></td>
                      <td style={{ padding: '15px', fontWeight: '600' }}>{p.name}</td>
                      <td style={{ padding: '15px' }}>PKR {p.new_price}</td>
                      <td style={{ padding: '15px' }}>{p.category}</td>
                      <td style={{ padding: '15px' }}>
                        <button onClick={() => handleDeleteProduct(p.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Customer Messages & Inquiries</h2>
            {messages.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '16px' }}>No messages received yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                      <span><b>{msg.name}</b> ({msg.email})</span>
                      <span>{msg.date}</span>
                    </div>
                    <p style={{ fontSize: '16px', color: '#0f172a', margin: '8px 0' }}><b>Message:</b> {msg.message}</p>
                    
                    {msg.reply ? (
                      <div style={{ marginTop: '10px', background: '#dcfce7', padding: '10px 15px', borderRadius: '6px', color: '#166534', fontSize: '14px' }}>
                        <b>Your Reply:</b> {msg.reply}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <input 
                          type="text" 
                          placeholder="Type reply to customer..." 
                          value={replyText[msg.id] || ''} 
                          onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })} 
                          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
                        />
                        <button onClick={() => handleSendReply(msg.id)} style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                          Send Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;