import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

import banner_mens from '../Components/Assets/banner_mens.png';
import banner_women from '../Components/Assets/banner_womens.png';
import banner_kids from '../Components/Assets/banner_kids.png';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  let currentBanner = banner_mens;
  let sectionTypes = [];

  if (props.category === "men") {
    currentBanner = banner_mens;
    sectionTypes = [
      { key: "shirt", title: "Shirts & Jerseys" },
      { key: "pant", title: "Pants & Trousers" },
      { key: "footwear", title: "Footwear & Shoes" },
      { key: "slippers", title: "Slippers & Slides" },
      { key: "watch", title: "Watches" },
      { key: "belts", title: "Belts" },
      { key: "fragrances", title: "Fragrances & Perfumes" },
      { key: "cap", title: "Caps" }
    ];
  } else if (props.category === "women") {
    currentBanner = banner_women;
    sectionTypes = [
      { key: "shirt", title: "Shirts & Tops" },
      { key: "pant", title: "Pants & Trousers" },
      { key: "footwear", title: "Footwear & Sneakers" },
      { key: "slippers", title: "Slippers & Sandals" },
      { key: "watch", title: "Watches" },
      { key: "belt", title: "Belts" },       // Women belts section
      { key: "perfume", title: "Perfumes" }, // Women perfumes section
      { key: "cap", title: "Caps" }          // Women caps section
    ];
  } else if (props.category === "kids") {
    currentBanner = banner_kids;
    sectionTypes = [
      { key: "shirt", title: "T-Shirts & Shirts" },
      { key: "pant", title: "Shorts & Pants" },
      { key: "footwear", title: "Footwear" },
      { key: "slippers", title: "Slippers & Slides" },
      { key: "watch", title: "Watches" },
      { key: "belts", title: "Belts" },
      { key: "fragrances", title: "Perfumes" },
      { key: "cap", title: "Caps" }
    ];
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={currentBanner} alt="Banner" />

      <div className="shopcategory-sections" style={{ width: '80%', margin: '0 auto' }}>
        {sectionTypes.map((section, index) => {
          const categoryProducts = all_product.filter(
            item => item.category === props.category && item.type === section.key
          );

          if (categoryProducts.length === 0) return null;

          return (
            <div key={index} style={{ marginTop: '50px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#d0d0d0' }}></div>
                <h2 style={{ padding: '0 20px', fontSize: '24px', fontWeight: '700', color: '#333', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {section.title}
                </h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#d0d0d0' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                {categoryProducts.map((item, i) => (
                  <Item 
                    key={i} 
                    id={item.id} 
                    name={item.name} 
                    image={item.image} 
                    new_price={item.new_price} 
                    old_price={item.old_price} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shopcategory-loadmore" style={{ margin: '80px auto' }}>
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;