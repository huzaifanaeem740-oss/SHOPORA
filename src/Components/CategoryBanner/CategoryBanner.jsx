import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");

  // Exact category filter
  let categoryProducts = all_product.filter(
    (item) => item.category.toLowerCase() === props.category.toLowerCase()
  );

  // Logical Sorting Logic
  if (sortOption === "low-to-high") {
    categoryProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortOption === "high-to-low") {
    categoryProducts.sort((a, b) => b.new_price - a.new_price);
  } else if (sortOption === "newest") {
    categoryProducts.sort((a, b) => b.id - a.id);
  }

  // Sub-sections filtering
  const shirts = categoryProducts.filter((i) => i.type === "shirt");
  const pants = categoryProducts.filter((i) => i.type === "pant");
  const footwear = categoryProducts.filter((i) => i.type === "footwear");
  const slippers = categoryProducts.filter((i) => i.type === "slippers");
  const belts = categoryProducts.filter((i) => i.type === "belts" || i.type === "belt");
  const perfumes = categoryProducts.filter((i) => i.type === "fragrances" || i.type === "perfumes" || i.type === "perfume");

  const isMen = props.category.toLowerCase() === "men";

  return (
    <div className="shop-category">
      {/* Grey Modern Banner - Centered & Rounded Button */}
      <div className="category-grey-banner">
        <div className="banner-badge-text">
          {isMen ? "VESTRO MEN'S COLLECTION" : "VESTRO WOMEN'S COLLECTION"}
        </div>
        <h1 className="banner-main-heading">ELEGANCE & PURE STYLE</h1>
        <p className="banner-sub-slogan">
          JUST IN • ELEVATE YOUR EVERYDAY FITS WITH VESTRO
        </p>
        <button className="banner-explore-btn-rounded">
          EXPLORE COLLECTION &rarr;
        </button>
      </div>

      {/* Main Title & Logical Sort Dropdown */}
      <div className="category-header-bar">
        <div className="category-page-title">
          <h2>{isMen ? "MEN'S PRODUCTS" : "WOMEN'S PRODUCTS"}</h2>
          <div className="title-underline"></div>
        </div>

        {/* Logical Sort Option */}
        <div className="shopcategory-sort-container">
          <label htmlFor="sortSelect">Sort by: </label>
          <select 
            id="sortSelect"
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value="default">Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* 1. Shirts & Jerseys Section */}
      {shirts.length > 0 && (
        <div className="product-section">
          <h3 className="section-title">SHIRTS & JURSEY'S</h3>
          <div className="shopcategory-products">
            {shirts.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </div>
      )}

      {/* 2. Pants & Trousers Section */}
      {pants.length > 0 && (
        <div className="product-section">
          <h3 className="section-title">PANTS & TROUSERS</h3>
          <div className="shopcategory-products">
            {pants.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </div>
      )}

      {/* 3. Footwear Section */}
      {footwear.length > 0 && (
        <div className="product-section">
          <h3 className="section-title">FOOTWEAR & SNEAKERS</h3>
          <div className="shopcategory-products">
            {footwear.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </div>
      )}

      {/* 4. Slippers Section */}
      {slippers.length > 0 && (
        <div className="product-section">
          <h3 className="section-title">SLIPPERS & SANDALS</h3>
          <div className="shopcategory-products">
            {slippers.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </div>
      )}

      {/* ACCESSORIES BLACK PATTI BANNER */}
      {(belts.length > 0 || perfumes.length > 0) && (
        <div className="accessories-black-bar">
          <h2>ACCESSORIES</h2>
        </div>
      )}

      {/* 5. Belts Section (Under Accessories) */}
      {belts.length > 0 && (
        <div className="product-section">
          <h3 className="section-title">BELTS</h3>
          <div className="shopcategory-products">
            {belts.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </div>
      )}

      {/* 6. Perfumes Section (Under Accessories & Belts) */}
      {perfumes.length > 0 && (
        <div className="product-section">
          <h3 className="section-title">PERFUMES & FRAGRANCES</h3>
          <div className="shopcategory-products">
            {perfumes.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;