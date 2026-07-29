import React from "react";
import "../CSS/Dashboard.css";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="stat-info">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;