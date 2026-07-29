import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import "../CSS/Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">

      <div className="topbar-left">
        <h2>Dashboard</h2>
      </div>

      <div className="topbar-right">

        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="notification">
          <FaBell />
          <span>3</span>
        </div>

        <div className="profile">
          <FaUserCircle />
          <p>Admin</p>
        </div>

      </div>

    </div>
  );
};

export default Topbar;