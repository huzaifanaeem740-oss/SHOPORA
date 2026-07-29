import React from 'react';

export default function AdminOrders() {
  const orders = [
    { id: '#ORD-101', customer: 'Ali Khan', total: '$185', status: 'Pending' },
    { id: '#ORD-102', customer: 'Sara Ahmed', total: '$65', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Customer Orders</h2>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Total Amount</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-indigo-600">{o.id}</td>
                <td className="p-4">{o.customer}</td>
                <td className="p-4">{o.total}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${o.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}