import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo_big.png'
import cart_icon from '../Assets/cart_icon.png'
import wishlist_icon from '../Assets/wishlist_icon.png'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const { getTotalCartItems, wishlistItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className='nav-top-row'>
        <div className='nav-logo'>
          <img src={logo} alt="VESTRO X Logo" />
          <p>VESTRO X</p>
        </div>

        <div className='nav-search-box'>
          <input type="text" placeholder='Search products, brands and categories...' />
          <img 
            src="https://cdn-icons-png.flaticon.com/512/622/622669.png" 
            alt="Search" 
            className="search-icon-img" 
          />
        </div>

        <div className='nav-login-cart'>
          {/* Wishlist Icon with Live Count */}
          <div className='nav-wishlist-icon-container' style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Link to='/wishlist' className='nav-wishlist-link'>
              <img src={wishlist_icon} alt="Wishlist" style={{ width: '22px', height: '22px' }} />
            </Link>
            {wishlistItems && wishlistItems.length > 0 && (
              <div className='nav-cart-count'>{wishlistItems.length}</div>
            )}
          </div>

          {/* Cart Icon with Live Count */}
          <div className='nav-cart-icon-container'>
            <Link to='/cart'>
              <img src={cart_icon} alt="Cart" style={{ width: '24px' }} />
            </Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </div>

          <Link to='/login' style={{ textDecoration: 'none' }}>
            <button className='login-register-btn'>LOGIN | REGISTER</button>
          </Link>
        </div>
      </div>

      <div className='nav-bottom-row'>
        <ul className='nav-menu'>
          <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/shop' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to='/myorders' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;