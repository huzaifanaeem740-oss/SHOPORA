import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo_big.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className='nav-top-row'>
        <div className='nav-logo'>
          <img src={logo} alt="" />
          <p>VESTRO X</p>
        </div>

        <div className='nav-search-box'>
          <input type="text" placeholder='Search products, brands and categories...' />
          <span className="search-icon">🔍</span>
        </div>

        <div className='nav-login-cart'>
          {/* Wishlist Heart Icon */}
          <Link to='/wishlist' className='nav-wishlist-link'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-wishlist-icon">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>

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
          <li><Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
          <li><Link to='/shop' style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link></li>
          <li><Link to='/contact' style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</Link></li>
          <li><Link to='/about' style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar