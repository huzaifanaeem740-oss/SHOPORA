import React, { useState } from 'react';

export default function ManageProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Running Shoes', price: '$120', category: 'Footwear' },
    { id: 2, name: 'Casual Hoodie', price: '$65', category: 'Apparel' },
  ]);

  const [form, setForm] = useState({ name: '', price: '', category: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setProducts([...products, { id: Date.now(), ...form }]);
    setForm({ name: '', price: '', category: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Store Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <input 
          type="text" placeholder="Product Name" 
          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
        />
        <input 
          type="text" placeholder="Price (e.g. $99)" 
          value={form.price} onChange={e => setForm({...form, price: e.target.value})}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
        />
        <input 
          type="text" placeholder="Category" 
          value={form.category} onChange={e => setForm({...form, category: e.target.value})}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-indigo-700 transition">
          Add Product
        </button>
      </form>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.price}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="bg-red-50 text-red-600 px-3 py-1 rounded-md font-medium hover:bg-red-100">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}