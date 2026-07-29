import React from "react";

const orders = [
  {
    id: "#1001",
    customer: "Ali Khan",
    product: "Nike Air Max",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Ahmed",
    product: "Vestro Hoodie",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Huzaifa",
    product: "Jordan 4",
    status: "Shipped",
  },
  {
    id: "#1004",
    customer: "Farhan",
    product: "Cargo Pants",
    status: "Delivered",
  },
];

const RecentOrders = () => {
  return (
    <div>

      <h3 style={{ marginBottom: "20px" }}>
        Recent Orders
      </h3>

      {orders.map((order) => (

        <div
          key={order.id}
          style={{
            padding: "15px",
            borderBottom: "1px solid #eee",
          }}
        >
          <strong>{order.customer}</strong>

          <p
            style={{
              margin: "5px 0",
              color: "#6b7280",
            }}
          >
            {order.product}
          </p>

          <span
            style={{
              background:
                order.status === "Delivered"
                  ? "#22c55e"
                  : order.status === "Pending"
                  ? "#f59e0b"
                  : "#3b82f6",

              color: "#fff",

              padding: "4px 10px",

              borderRadius: "20px",

              fontSize: "12px",
            }}
          >
            {order.status}
          </span>

        </div>

      ))}
    </div>
  );
};

export default RecentOrders;