import React, { useState } from 'react';

export default function Admin({ products, setProducts, orders }) {
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !form.image) return;
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image
    };
    setProducts([...products, newProduct]);
    setForm({ name: '', price: '', category: '', image: '' });
    alert('Product Added Successfully!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Admin Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderLeft: '5px solid #2563eb' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Products</p>
          <h3 style={{ margin: '5px 0 0 0', fontSize: '28px' }}>{products.length}</h3>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderLeft: '5px solid #16a34a' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Orders</p>
          <h3 style={{ margin: '5px 0 0 0', fontSize: '28px' }}>{orders.length}</h3>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderLeft: '5px solid #9333ea' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Revenue</p>
          <h3 style={{ margin: '5px 0 0 0', fontSize: '28px' }}>${totalRevenue}</h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '15px' }}>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Product Name</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />

            <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Price ($)</label>
            <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />

            <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Category</label>
            <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />

            <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Image URL</label>
            <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />

            <button type="submit" style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Product</button>
          </form>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px' }}>Manage Products</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Image</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}><img src={p.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{p.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>${p.price}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{p.category}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <button onClick={() => handleDeleteProduct(p.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ margin: '30px 0 15px 0' }}>Customer Orders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {orders.length === 0 ? <p style={{ color: '#666' }}>No orders placed yet.</p> : orders.map(order => (
              <div key={order.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '5px' }}>
                  <span>Order ID: {order.id}</span>
                  <span style={{ color: '#16a34a' }}>Total: ${order.total}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>{order.date}</p>
                <p style={{ fontSize: '14px', margin: 0 }}>Items: {order.items.map(i => i.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}