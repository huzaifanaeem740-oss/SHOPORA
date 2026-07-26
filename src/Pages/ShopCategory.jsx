import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('shirts');

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      
      <div className="category-filter-bar">
        <span 
          className={activeTab === 'shirts' ? 'active-filter-btn' : ''} 
          onClick={() => scrollToSection('shirts')}
        >
          Shirts
        </span>
        <span 
          className={activeTab === 'trousers' ? 'active-filter-btn' : ''} 
          onClick={() => scrollToSection('trousers')}
        >
          Trousers
        </span>
        <span 
          className={activeTab === 'footwear' ? 'active-filter-btn' : ''} 
          onClick={() => scrollToSection('footwear')}
        >
          Footwear
        </span>
        <span 
          className={activeTab === 'watches' ? 'active-filter-btn' : ''} 
          onClick={() => scrollToSection('watches')}
        >
          Watches
        </span>
        <span 
          className={activeTab === 'perfumes' ? 'active-filter-btn' : ''} 
          onClick={() => scrollToSection('perfumes')}
        >
          Perfumes
        </span>
        <span 
          className={activeTab === 'accessories' ? 'active-filter-btn' : ''} 
          onClick={() => scrollToSection('accessories')}
        >
          Belts & Caps
        </span>
      </div>

      <div className="shopcategory-products">
        {/* Shirts & Jerseys */}
        <div id="shirts" className="category-section-block">
          <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#171717' }}>Shirts & Jerseys</h2>
          <div className="shopcategory-products-grid">
            {all_product.map((item, i) => {
              const name = item.name.toLowerCase();
              const isMatch = props.category === item.category;
              const isShirt = name.includes('tee') || name.includes('shirt') || name.includes('jersey') || name.includes('top') || item.subCategory === 'shirts';
              const isExcluded = name.includes('watch') || name.includes('shoe') || name.includes('boot') || name.includes('perfume') || name.includes('fragrance') || name.includes('belt') || name.includes('cap') || name.includes('steel') || name.includes('lv') || name.includes('turf') || name.includes('slipper') || name.includes('slide') || name.includes('sneaker');

              if (isMatch && isShirt && !isExcluded) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* Trousers, Pants & Shorts */}
        <div id="trousers" className="category-section-block" style={{ marginTop: '50px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#171717' }}>Trousers & Pants</h2>
          <div className="shopcategory-products-grid">
            {all_product.map((item, i) => {
              const name = item.name.toLowerCase();
              const isMatch = props.category === item.category;
              const isTrouser = name.includes('pant') || name.includes('trouser') || name.includes('jean') || name.includes('track') || name.includes('cargo') || name.includes('short') || item.subCategory === 'trousers' || item.subCategory === 'shorts';
              const isWatchOrAccessory = name.includes('watch') || name.includes('steel') || name.includes('skeleton') || name.includes('wheel') || name.includes('belt') || name.includes('cap');

              if (isMatch && isTrouser && !isWatchOrAccessory) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* Footwear */}
        <div id="footwear" className="category-section-block" style={{ marginTop: '50px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#171717' }}>Footwear</h2>
          <div className="shopcategory-products-grid">
            {all_product.map((item, i) => {
              const name = item.name.toLowerCase();
              const isMatch = props.category === item.category;
              const isExcluded = name.includes('shirt') || name.includes('tee') || name.includes('top') || name.includes('jersey') || name.includes('performance') || name.includes('active') || name.includes('pant') || name.includes('trouser') || name.includes('jean') || name.includes('denim') || name.includes('short') || name.includes('watch') || name.includes('steel') || name.includes('belt') || name.includes('cap') || name.includes('wallet') || name.includes('hat') || name.includes('simple pink') || name.includes('perfume') || name.includes('fragrance') || name.includes('spray') || name.includes('scent') || name.includes('eau') || name.includes('cologne') || name.includes('gojo') || name.includes('naseem') || name.includes('french') || name.includes('l\'homme') || name.includes('sauvage') || name.includes('oud') || name.includes('gio') || name.includes('attrape') || name.includes('imagination') || name.includes('pacific') || name.includes('symphony');

              if (isMatch && !isExcluded) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* Watches */}
        <div id="watches" className="category-section-block" style={{ marginTop: '50px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#171717' }}>Watches</h2>
          <div className="shopcategory-products-grid">
            {all_product.map((item, i) => {
              const name = item.name.toLowerCase();
              const isMatch = props.category === item.category;
              const isWatch = name.includes('watch') || name.includes('steel') || name.includes('clock') || name.includes('skeleton') || name.includes('wheel') || item.subCategory === 'watches';

              if (isMatch && isWatch) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* Perfumes */}
        <div id="perfumes" className="category-section-block" style={{ marginTop: '50px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#171717' }}>Perfumes & Fragrances</h2>
          <div className="shopcategory-products-grid">
            {all_product.map((item, i) => {
              const name = item.name.toLowerCase();
              const isMatch = props.category === item.category;
              const isPerfume = name.includes('perfume') || name.includes('fragrance') || name.includes('spray') || name.includes('scent') || name.includes('cologne') || name.includes('gojo') || name.includes('lv') || name.includes('louis') || name.includes('sauvage') || name.includes('oud') || name.includes('gio') || name.includes('naseem') || name.includes('french') || name.includes('l\'homme') || name.includes('eau') || name.includes('attrape') || name.includes('imagination') || name.includes('pacific') || name.includes('symphony') || name.includes('azure') || name.includes('essence') || name.includes('prestige') || name.includes('miris') || item.subCategory === 'perfumes';
              const isWatch = name.includes('watch') || name.includes('steel') || name.includes('skeleton') || name.includes('wheel');
              const isCapOrAccessory = name.includes('cap') || name.includes('hat') || name.includes('cat outdoor') || name.includes('simple pink');

              if (isMatch && isPerfume && !isWatch && !isCapOrAccessory) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              }
              return null;
            })}
          </div>
        </div>

        {/* Belts & Caps */}
        <div id="accessories" className="category-section-block" style={{ marginTop: '50px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#171717' }}>Belts & Caps</h2>
          <div className="shopcategory-products-grid">
            {all_product.map((item, i) => {
              const name = item.name.toLowerCase();
              const isMatch = props.category === item.category;
              const isAccessory = name.includes('belt') || name.includes('cap') || name.includes('wallet') || name.includes('hat') || name.includes('cat outdoor') || name.includes('simple pink') || item.subCategory === 'accessories';

              if (isMatch && isAccessory) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;