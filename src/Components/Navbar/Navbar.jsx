import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo_big.png';
import cart_icon from '../Assets/cart_icon.png';
import wishlist_icon from '../Assets/wishlist_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, wishlistItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdownRef = useRef();

  // Toggle open/close function
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  // Function to close menu automatically when any link is clicked
  const closeMenu = () => {
    if (menuRef.current.classList.contains('nav-menu-visible')) {
      menuRef.current.classList.remove('nav-menu-visible');
      if (dropdownRef.current) {
        dropdownRef.current.classList.remove('open');
      }
    }
  }

  const wishlistCount = wishlistItems ? wishlistItems.length : 0;
  const cartCount = getTotalCartItems();

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => { setMenu("shop"); closeMenu(); }} className="nav-logo">
        <img src={logo} alt="" />
        <p>VESTRO X</p>
      </Link>

      <img ref={dropdownRef} className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Menu" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop"); closeMenu(); }}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Shop</Link>
          {menu === "shop" ? <hr/> : <></>}
        </li>
        <li onClick={() => { setMenu("mens"); closeMenu(); }}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/mens'>Men</Link>
          {menu === "mens" ? <hr/> : <></>}
        </li>
        <li onClick={() => { setMenu("womens"); closeMenu(); }}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/womens'>Women</Link>
          {menu === "womens" ? <hr/> : <></>}
        </li>
        <li onClick={() => { setMenu("kids"); closeMenu(); }}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/kids'>Kids</Link>
          {menu === "kids" ? <hr/> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/wishlist' className="nav-icon-container" onClick={closeMenu}>
          <img src={wishlist_icon} alt="Wishlist" style={{ width: '28px' }} />
          {wishlistCount > 0 && <div className="nav-cart-count">{wishlistCount}</div>}
        </Link>

        <Link to='/login' onClick={closeMenu}><button>Login</button></Link>

        <Link to='/cart' className="nav-icon-container" onClick={closeMenu}>
          <img src={cart_icon} alt="Cart" style={{ width: '30px' }} />
          {cartCount > 0 && <div className="nav-cart-count">{cartCount}</div>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;