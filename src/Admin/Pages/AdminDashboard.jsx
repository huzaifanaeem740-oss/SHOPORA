import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics Overview</h2>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">$24,500</h3>
          <span className="text-green-500 text-sm font-semibold">+12% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Orders</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">1,240</h3>
          <span className="text-green-500 text-sm font-semibold">+5% from last week</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Products</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">85</h3>
          <span className="text-indigo-500 text-sm font-semibold">Active in store</span>
        </div>
      </div>

      {/* Analytics Graph Simulation */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Performance</h3>
        <div className="h-64 flex items-end justify-between gap-2 pt-6">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((mon, i) => (
            <div key={mon} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-indigo-500 rounded-t-lg transition-all duration-300 hover:bg-indigo-600"
                style={{ height: `${(i + 3) * 12}%` }}
              ></div>
              <span className="text-xs text-gray-500 font-medium">{mon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}