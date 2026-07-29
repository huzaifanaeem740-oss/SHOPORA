import React from "react";
import "./Sidebar.css";

import {
  MdDashboard,
  MdAddBox,
  MdInventory,
  MdShoppingCart
} from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2>Vestro Admin</h2>

      <ul>
        <li>
          <MdDashboard />
          Dashboard
        </li>

        <li>
          <MdAddBox />
          Add Product
        </li>

        <li>
          <MdInventory />
          Products
        </li>

        <li>
          <MdShoppingCart />
          Orders
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;