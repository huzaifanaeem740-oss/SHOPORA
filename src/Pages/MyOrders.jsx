import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

const getToken = () => {
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('userToken') ||
    localStorage.getItem('accessToken') ||
    ''
  );
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

const getStatusStyle = (status) => {
  const value = String(status || 'pending').toLowerCase();

  if (value === 'delivered') {
    return { background: '#e8f4ec', color: '#3f6850', border: '#c9dfd0' };
  }
  if (value === 'processing') {
    return { background: '#eef1f5', color: '#526170', border: '#d5dce3' };
  }
  if (value === 'shipped') {
    return { background: '#eaf1f7', color: '#49667d', border: '#cbdbe8' };
  }
  if (value === 'cancelled') {
    return { background: '#f7eaea', color: '#814848', border: '#e4caca' };
  }
  return { background: '#f5f1e6', color: '#806d3e', border: '#e4d9b9' };
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const token = getToken();

      const response = await fetch(`${API_BASE}/orders`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load orders');
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) return;

    try {
      const token = getToken();

      const response = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to cancel order');
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
    } catch (err) {
      alert('Something went wrong while cancelling the order');
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '80vh', backgroundColor: '#fafaf9', padding: '40px 20px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '5px' }}>My Orders</h2>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '25px' }}>
          Track and manage your orders.
        </p>

        {error && (
          <div style={{ background: '#f5e8e8', color: '#814848', border: '1px solid #e2caca', padding: '12px 14px', borderRadius: '8px', marginBottom: '18px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: '#94a3b8' }}>
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: '#94a3b8' }}>
            You haven't placed any orders yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              const canCancel = String(order.status).toLowerCase() === 'pending';

              return (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '18px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px',
                    background: '#fafaf9',
                  }}
                >
                  <div>
                    <strong style={{ color: '#1e293b', fontSize: '15px' }}>
                      Order #{order.id}
                    </strong>
                    <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '12px' }}>
                      Placed on {formatDate(order.created_at)}
                    </p>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>
                      Payment: {order.payment_method || 'COD'}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', color: '#1e293b', fontSize: '16px', marginBottom: '8px' }}>
                      ${Number(order.total_amount || 0).toLocaleString()}
                    </strong>

                    <span
                      style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: `1px solid ${statusStyle.border}`,
                        background: statusStyle.background,
                        color: statusStyle.color,
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'capitalize',
                      }}
                    >
                      {order.status || 'pending'}
                    </span>

                    {canCancel && (
                      <div style={{ marginTop: '10px' }}>
                        <button
                          onClick={() => handleCancel(order.id)}
                          style={{
                            border: '1px solid #e3cccc',
                            background: '#f8eeee',
                            color: '#824d4d',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;