import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from './Context/ShopContext'; // Apna context path check kar lein

import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import AdminPanel from './Admin/AdminPanel';
import AboutUs from './Pages/AboutUs';
import CartDrawer from './Components/CartDrawer/CartDrawer';
import Wishlist from './Pages/Wishlist';


function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  // Context se sab kuch nikal liya
  const { cartItems, removeFromCart, getTotalCartAmount, all_product, isCartOpen, setIsCartOpen } = useContext(ShopContext);

  return (
    <>
      {!isAdmin && <Navbar onCartClick={() => setIsCartOpen(true)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory category="men" />} />
        <Route path="/womens" element={<ShopCategory category="women" />} />
        <Route path="/kids" element={<ShopCategory category="kid" />} />
<Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product">
          <Route index element={<Product />} />
          <Route path=":productId" element={<Product />} />
        </Route>

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      {!isAdmin && <Footer />}

      {/* Global Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        allProducts={all_product}
        removeFromCart={removeFromCart}
        getTotalCartAmount={getTotalCartAmount}
        navigate={navigate}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;