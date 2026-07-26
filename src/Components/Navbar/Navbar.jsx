import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo_big.png';
import cart_icon from '../Assets/cart_icon.png';
import wishlist_icon from '../Assets/wishlist_icon.png'; // Agar wishlist icon ho, warna koi bhi icon path dein
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, getTotalWishlistItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Logo" />
        <p>SHOPORA</p>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />
      
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("mens")}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("womens")}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>

      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}

        {/* Wishlist Icon with Counter */}
        <Link to='/wishlist' className='nav-icon-container'>
          <img src={wishlist_icon} alt="Wishlist" style={{ width: '30px' }} />
          <div className='nav-cart-count'>{getTotalWishlistItems()}</div>
        </Link>

        {/* Cart Icon with Counter */}
        <Link to='/cart' className='nav-icon-container'>
          <img src={cart_icon} alt="Cart" />
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;