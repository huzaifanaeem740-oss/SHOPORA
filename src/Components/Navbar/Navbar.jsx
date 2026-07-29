import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo_big.png'
import cart_icon from '../Assets/cart_icon.png'
import wishlist_icon from '../Assets/wishlist_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const { getTotalCartItems, wishlistItems } = useContext(ShopContext);

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
          <li><Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
          <li><Link to='/shop' style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link></li>
          <li><Link to='/contact' style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</Link></li>
          <li><Link to='/about' style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link></li>
        </ul>
      </div>

      {/* Marquee Strip */}
      <div className="nav-marquee-strip">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          VESTRO X WISHLIST | VESTRO X | VESTRO X | VESTRO X | VESTRO X
        </marquee>
      </div>
    </div>
  )
}

export default Navbar