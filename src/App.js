import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop'; 
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Wishlist from './Pages/Wishlist';

function App() {
  return (
    
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-50">
      <BrowserRouter>
        <Navbar />
        
       
        <main className="flex-grow w-full">
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
            
            <Route path="/product" element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/wishlist' element={<Wishlist/>} />
          </Routes>
        </main>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;