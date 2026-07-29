import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 text-2xl font-bold text-indigo-600">Shopora Admin</div>
        <nav className="mt-6 space-y-1 px-4">
          <Link to="/admin" className="block px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium">Dashboard & Analytics</Link>
          <Link to="/admin/products" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600">Manage Products</Link>
          <Link to="/admin/orders" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600">Orders</Link>
          <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-red-500 mt-10">Back to Website</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-700">Admin Control Panel</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">Admin User</span>
            <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">A</div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}