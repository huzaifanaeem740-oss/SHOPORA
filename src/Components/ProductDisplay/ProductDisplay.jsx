import React, { useContext, useState, useEffect } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Screen width track karne ke liye state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 1024;

  return (
    <div className='productdisplay' style={{ alignItems: isMobile ? 'center' : 'flex-start' }}>
      <div className="productdisplay-breadcrumb">
        HOME &gt; SHOP &gt; {product.category ? product.category.toUpperCase() : 'MEN'} &gt; {product.name}
      </div>
      <div className="productdisplay-container" style={{ flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start' }}>
        <div className="productdisplay-left" style={{ flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: isMobile ? 'center' : 'flex-start' }}>
          <div className="productdisplay-img-list" style={{ flexDirection: isMobile ? 'row' : 'column' }}>
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">PKR {product.old_price}</div>
            <div className="productdisplay-right-price-new">PKR {product.new_price}</div>
          </div>
          <div className="productdisplay-right-description">
            A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>
          <button onClick={() => { addToCart(Number(product.id)) }}>ADD TO CART</button>
          <p className="productdisplay-right-category"><span>Category :</span>Women , T-Shirt, Crop Top</p>
          <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay