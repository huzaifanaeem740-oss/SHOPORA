import React, { useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo_big from '../Assets/logo_big.png';
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext';
import heart_icom from '../Assets/heart_icom.png'
import dropdown_icon from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { getTotalCartItems, getTotalWishlistItems } = useContext(ShopContext);
  
  const menuRef = useRef();
  const dropdownRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const closeMenu = () => {
    menuRef.current.classList.remove('nav-menu-visible');
    if (dropdownRef.current) {
      dropdownRef.current.classList.remove('open');
    }
  };

  return (
    <div className='navbar'>
      {/* 1. Left: Logo */}
      <div className='nav-logo'>
        <img src={logo_big} alt="" />
        <p>SHOPORA</p>
      </div>

      {/* 2. Center: Menu Links (Shop, Men, Women, Kids) */}
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={closeMenu} className={currentPath === '/' ? 'active' : ''}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
          {currentPath === '/' ? <hr /> : <></>}
        </li>
        <li onClick={closeMenu} className={currentPath === '/mens' ? 'active' : ''}>
          <Link to='/mens' style={{ textDecoration: 'none', color: 'inherit' }}>Men</Link>
          {currentPath === '/mens' ? <hr /> : <></>}
        </li>
        <li onClick={closeMenu} className={currentPath === '/womens' ? 'active' : ''}>
          <Link to='/womens' style={{ textDecoration: 'none', color: 'inherit' }}>Women</Link>
          {currentPath === '/womens' ? <hr /> : <></>}
        </li>
        <li onClick={closeMenu} className={currentPath === '/kids' ? 'active' : ''}>
          <Link to='/kids' style={{ textDecoration: 'none', color: 'inherit' }}>Kids</Link>
          {currentPath === '/kids' ? <hr /> : <></>}
        </li>
      </ul>

      {/* 3. Right: Login, Icons, and Dropdown */}
      <div className="nav-right-section">
        <div className="nav-login-cart">
          <Link to='/login' onClick={closeMenu}><button>Login</button></Link>
          
          <div className="nav-icons-group">
            <div className="nav-icon-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Link to='/wishlist' onClick={closeMenu}><img src={heart_icom} alt="wishlist" style={{ width: '30px' }} /></Link>
              <div className="nav-cart-count" style={{ position: 'absolute', top: '-5px', right: '-8px' }}>
                {getTotalWishlistItems ? getTotalWishlistItems() : 0}
              </div>
            </div>

            <div className="nav-icon-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Link to='/cart' onClick={closeMenu}><img src={cart_icon} alt="cart" style={{ width: '30px' }} /></Link>
              <div className="nav-cart-count" style={{ position: 'absolute', top: '-5px', right: '-8px' }}>
                {getTotalCartItems ? getTotalCartItems() : 0}
              </div>
            </div>
          </div>
        </div>

        <img ref={dropdownRef} className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="menu" />
      </div>
    </div>
  );
};

export default Navbar;