import React, { useState, useEffect } from 'react'
import './CSS/Admin.css'

const Admin = () => {
    const [activeTab, setActiveTab] = useState('add_product')

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('admin_products')
        return saved ? JSON.parse(saved) : []
    })

    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: ''
    })

  const [orders, setOrders] = useState([
    { id: 101, date: '2026-07-22', items: 'Floral Print Top (x2)', total: 170, status: 'Pending', method: 'Easypaisa' },
    { id: 102, date: '2026-07-22', items: 'Winter High Neck (x1)', total: 85, status: 'Delivered', method: 'JazzCash' }
]);

    useEffect(() => {
        localStorage.setItem('admin_products', JSON.stringify(products))
    }, [products])

    useEffect(() => {
        localStorage.setItem('admin_orders', JSON.stringify(orders))
    }, [orders])

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const handleAddProduct = (e) => {
        e.preventDefault()
        if (!productDetails.name || !productDetails.new_price || !productDetails.image) {
            alert('Please fill all required fields')
            return
        }

        const newProduct = {
            id: Date.now(),
            ...productDetails,
            new_price: Number(productDetails.new_price),
            old_price: Number(productDetails.old_price) || 0
        }

        setProducts([...products, newProduct])
        setProductDetails({ name: '', image: '', category: 'women', new_price: '', old_price: '' })
        alert('Product Added Successfully!')
    }

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(item => item.id !== id))
    }

    const todayDate = new Date().toISOString().slice(0, 10)
    const todayOrders = orders.filter(o => o.date === todayDate)
    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0)

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-gray-800">
            <div className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold mb-2 text-gray-900 border-b pb-3">Admin Panel</h2>
                
                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                    <button 
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap text-left transition-colors ${
                            activeTab === 'add_product' 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => setActiveTab('add_product')}
                    >
                        ➕ Add Product
                    </button>
                    
                    <button 
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap text-left transition-colors ${
                            activeTab === 'list_product' 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => setActiveTab('list_product')}
                    >
                        📦 Product List ({products.length})
                    </button>
                    
                    <button 
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap text-left transition-colors ${
                            activeTab === 'orders' 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => setActiveTab('orders')}
                    >
                        🛒 Today's Orders ({todayOrders.length})
                    </button>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-8">
                {activeTab === 'add_product' && (
                    <div className="max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
                        
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={productDetails.name} 
                                    onChange={changeHandler} 
                                    placeholder="Type product name" 
                                    required 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input 
                                        type="number" 
                                        name="new_price" 
                                        value={productDetails.new_price} 
                                        onChange={changeHandler} 
                                        placeholder="Type price" 
                                        required 
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Price ($)</label>
                                    <input 
                                        type="number" 
                                        name="old_price" 
                                        value={productDetails.old_price} 
                                        onChange={changeHandler} 
                                        placeholder="Type old price" 
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select 
                                    name="category" 
                                    value={productDetails.category} 
                                    onChange={changeHandler}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
                                >
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="kids">Kids</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input 
                                    type="text" 
                                    name="image" 
                                    value={productDetails.image} 
                                    onChange={changeHandler} 
                                    placeholder="Paste image address/URL" 
                                    required 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors mt-2"
                            >
                                ADD PRODUCT
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'list_product' && (
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products List</h1>
                        
                        <div className="overflow-x-auto">
                            <div className="min-w-[600px]">
                                <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-gray-600 pb-3 border-b px-2">
                                    <p>Products</p>
                                    <p className="col-span-2">Title</p>
                                    <p>Old Price</p>
                                    <p>New Price</p>
                                    <p>Category</p>
                                    <p className="text-center">Remove</p>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {products.map((item) => (
                                        <div key={item.id} className="grid grid-cols-6 gap-4 items-center py-3 px-2 hover:bg-gray-50 text-sm">
                                            <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-md border" />
                                            <p className="col-span-2 font-medium text-gray-800 truncate">{item.name}</p>
                                            <p className="text-gray-400 line-through">${item.old_price}</p>
                                            <p className="font-semibold text-gray-900">${item.new_price}</p>
                                            <p className="capitalize text-gray-600">{item.category}</p>
                                            <button 
                                                onClick={() => handleDeleteProduct(item.id)} 
                                                className="text-center text-red-500 hover:text-red-700 text-base"
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900">Today's Dashboard</h1>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Today Orders</h3>
                                <p className="text-2xl font-bold text-indigo-600 mt-2">{todayOrders.length}</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                                <p className="text-2xl font-bold text-emerald-600 mt-2">${todaySales}</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{products.length}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders List</h2>
                            
                            <div className="overflow-x-auto">
                                <div className="min-w-[650px]">
                                    <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-gray-600 pb-3 border-b px-2">
                                        <p>Order ID</p>
                                        <p>Date</p>
                                        <p className="col-span-2">Items</p>
                                        <p>Payment</p>
                                        <p>Total</p>
                                        <p>Status</p>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <div key={order.id} className="grid grid-cols-6 gap-4 items-center py-3 px-2 text-sm hover:bg-gray-50">
                                                <p className="font-semibold text-gray-800">#{order.id}</p>
                                                <p className="text-gray-500">{order.date}</p>
                                                <p className="col-span-2 font-medium text-gray-700 truncate">{order.items}</p>
                                                <p className="text-gray-600">{order.method}</p>
                                                <p className="font-semibold text-gray-900">${order.total}</p>
                                                <p className={`font-semibold text-xs px-2.5 py-1 rounded-full w-max ${
                                                    order.status === 'Delivered' 
                                                        ? 'bg-emerald-100 text-emerald-700' 
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {order.status}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin