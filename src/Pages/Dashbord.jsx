import React from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

import StatCard from "../Components/StatCard";
import SalesChart from "../Components/SalesChart";
import RecentOrders from "../Components/RecentOrders";

import "../CSS/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin 👋</p>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Revenue"
          value="Rs. 1,250,000"
          icon={<FaMoneyBillWave />}
          color="#22c55e"
        />

        <StatCard
          title="Orders"
          value="245"
          icon={<FaShoppingCart />}
          color="#3b82f6"
        />

        <StatCard
          title="Customers"
          value="188"
          icon={<FaUsers />}
          color="#f59e0b"
        />

        <StatCard
          title="Products"
          value="96"
          icon={<FaBoxOpen />}
          color="#8b5cf6"
        />

      </div>

      <div className="dashboard-row">

        <div className="chart-box">
          <SalesChart />
        </div>

        <div className="order-box">
          <RecentOrders />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;