export const getStoredProducts = () => {
  const saved = localStorage.getItem('admin_products');
  return saved ? JSON.parse(saved) : [];
};

export const saveStoredProducts = (products) => {
  localStorage.setItem('admin_products', JSON.stringify(products));
};

export const getStoredOrders = () => {
  const saved = localStorage.getItem('admin_orders');
  return saved ? JSON.parse(saved) : [];
};

export const saveStoredOrders = (orders) => {
  localStorage.setItem('admin_orders', JSON.stringify(orders));
};