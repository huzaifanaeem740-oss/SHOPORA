import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo_big.png";
import cart_icon from "../Assets/cart_icon.png";
import wishlist_icon from "../Assets/wishlist_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  const { getTotalCartItems, getTotalWishlistItems } =
    useContext(ShopContext);

  const menuRef = useRef();
  const dropdownRef = useRef();

  const dropdown_toggle = () => {
    menuRef.current.classList.toggle("nav-menu-visible");
    dropdownRef.current.classList.toggle("open");
  };

  const closeMenu = () => {
    menuRef.current.classList.remove("nav-menu-visible");
    dropdownRef.current.classList.remove("open");
  };

  return (
    <div className="navbar">

      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPORA</p>
      </div>

      <div className="nav-login-cart">

        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link className="nav-icon-container" to="/wishlist">
          <img src={wishlist_icon} alt="" />
          <div className="nav-cart-count">
            {getTotalWishlistItems()}
          </div>
        </Link>

        <Link className="nav-icon-container" to="/cart">
          <img src={cart_icon} alt="" />
          <div className="nav-cart-count">
            {getTotalCartItems()}
          </div>
        </Link>

      </div>

      <img
        ref={dropdownRef}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
        onClick={dropdown_toggle}
      />

      <ul ref={menuRef} className="nav-menu">

        <li
          onClick={() => {
            setMenu("shop");
            closeMenu();
          }}
        >
          <Link to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>

        <li
          onClick={() => {
            setMenu("mens");
            closeMenu();
          }}
        >
          <Link to="/mens">Men</Link>
          {menu === "mens" && <hr />}
        </li>

        <li
          onClick={() => {
            setMenu("womens");
            closeMenu();
          }}
        >
          <Link to="/womens">Women</Link>
          {menu === "womens" && <hr />}
        </li>

        <li
          onClick={() => {
            setMenu("kids");
            closeMenu();
          }}
        >
          <Link to="/kids">Kids</Link>
          {menu === "kids" && <hr />}
        </li>

      </ul>

    </div>
  );
};

export default Navbar;