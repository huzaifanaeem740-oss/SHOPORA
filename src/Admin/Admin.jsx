import React from "react";
import "./CSS/Admin.css";

import Sidebar from "./Components/Sidebar/Sidebar";
import AdminNavbar from "./Components/Navbar/AdminNavbar";

import Dashboard from "./Pages/Dashboard";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />

      <div className="admin-main">
        <AdminNavbar />

        <Dashboard />
      </div>
    </div>
  );
};

export default Admin;