import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import "./CSS/Shop.css";

import banner_mens from "../Components/Assets/banner_mens.png";
import banner_womens from "../Components/Assets/banner_womens.png";
import banner_kids from "../Components/Assets/banner_kids.png";

const Shop = () => {
  const { all_product, loading } = useContext(ShopContext);

  const [selectedMainCat, setSelectedMainCat] = useState("men");
  const [selectedSubCat, setSelectedSubCat] = useState("all");

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0", fontWeight: "bold" }}>
        Loading products...
      </div>
    );
  }

  const currentBanner =
    selectedMainCat === "women"
      ? banner_womens
      : selectedMainCat === "kids"
      ? banner_kids
      : banner_mens;

  // Maps each subcategory button to all the possible "type" values used
  // across men/women/kids data (the raw data isn't 100% consistent in naming,
  // e.g. men's footwear uses "footwear" while kids' uses "shoe").
  const subCategoryTypeMap = {
    shirt: ["shirt"],
    pant: ["pant"],
    shoe: ["shoe", "footwear", "slipper", "slippers"],
    watch: ["watch"],
    perfume: ["perfume", "fragrances", "fragrance"],
    belt: ["belt", "belts"],
    cap: ["cap"],
  };

  // Section headings shown when "All" is selected — groups the shop into
  // labeled blocks in a fixed order (Accessories bundles watch/perfume/belt/cap).
  const sections = [
    { label: "Shirts & Jerseys", types: subCategoryTypeMap.shirt },
    { label: "Pants & Trousers", types: subCategoryTypeMap.pant },
    { label: "Footwear", types: subCategoryTypeMap.shoe },
    {
      label: "Accessories",
      types: [
        ...subCategoryTypeMap.watch,
        ...subCategoryTypeMap.perfume,
        ...subCategoryTypeMap.belt,
        ...subCategoryTypeMap.cap,
      ],
    },
  ];

  const getType = (product) =>
    (product.type || product.subCategory || product.subcategory || "").toLowerCase().trim();

  // Products matching the selected main category (men / women / kids)
  const mainCategoryProducts = (all_product || []).filter((product) => {
    const cat = (product.category || "").toLowerCase().trim();
    return cat === selectedMainCat;
  });

  // When a specific subcategory is chosen, show a single flat grid (no headings)
  const singleSubCategoryProducts =
    selectedSubCat !== "all"
      ? mainCategoryProducts.filter((product) => {
          const acceptableTypes = subCategoryTypeMap[selectedSubCat] || [selectedSubCat];
          return acceptableTypes.includes(getType(product));
        })
      : [];

  const subCategories = [
    { label: "All", value: "all" },
    { label: "Shirts & Jerseys", value: "shirt" },
    { label: "Pants & Trousers", value: "pant" },
    { label: "Footwear", value: "shoe" },
    { label: "Watches", value: "watch" },
    { label: "Perfumes", value: "perfume" },
    { label: "Belts", value: "belt" },
    { label: "Caps", value: "cap" },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "40px" }}>
      <div className="shop-container">
        
        {/* CENTERED ANIMATED BANNER */}
        <div className="banner-wrapper">
          <img 
            key={selectedMainCat} 
            src={currentBanner} 
            alt="Banner" 
            className="animated-banner"
          />
        </div>

        {/* MAIN CATEGORY BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
          {["men", "women", "kids"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedMainCat(cat);
                setSelectedSubCat("all");
              }}
              style={{
                padding: "8px 24px",
                borderRadius: "20px",
                border: "none",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                backgroundColor: selectedMainCat === cat ? "#00a8e8" : "#0b132b",
                color: "#ffffff",
                textTransform: "capitalize",
              }}
            >
              {cat === "men" ? "Mens" : cat === "women" ? "Womens" : "Kids"}
            </button>
          ))}
        </div>

        {/* SUBCATEGORY NAVIGATION / DROPDOWN */}
        <div className="subcategory-wrapper">
          <select
            className="subcategory-dropdown"
            value={selectedSubCat}
            onChange={(e) => setSelectedSubCat(e.target.value)}
          >
            {subCategories.map((sub) => (
              <option key={sub.value} value={sub.value}>
                {sub.label}
              </option>
            ))}
          </select>

          <div className="subcategory-buttons">
            {subCategories.map((sub) => (
              <button
                key={sub.value}
                onClick={() => setSelectedSubCat(sub.value)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: "1px solid #cbd5e1",
                  fontWeight: "600",
                  fontSize: "11px",
                  cursor: "pointer",
                  backgroundColor: selectedSubCat === sub.value ? "#cbd5e1" : "#ffffff",
                  color: "#334155",
                  transition: "all 0.2s ease",
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        {selectedSubCat === "all" ? (
          // "All" selected — show grouped sections with category headings
          (() => {
            const groupedSections = sections
              .map((section) => ({
                ...section,
                items: mainCategoryProducts.filter((product) =>
                  section.types.includes(getType(product))
                ),
              }))
              .filter((section) => section.items.length > 0);

            if (groupedSections.length === 0) {
              return (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280", fontSize: "14px" }}>
                  Is category mein abhi koi items nahi hain.
                </div>
              );
            }

            return groupedSections.map((section) => (
              <div key={section.label} style={{ marginBottom: "36px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#0b132b",
                    marginBottom: "14px",
                    paddingLeft: "4px",
                    borderLeft: "4px solid #00a8e8",
                  }}
                >
                  {section.label}
                </h3>

                <div className="shop-products-grid">
                  {section.items.map((item, index) => (
                    <Item
                      key={item.id ? `${item.id}-${index}` : index}
                      id={item.id || item._id}
                      name={item.title || item.name}
                      image={item.image}
                      new_price={item.price || item.new_price}
                      old_price={item.old_price}
                    />
                  ))}
                </div>
              </div>
            ));
          })()
        ) : singleSubCategoryProducts.length > 0 ? (
          // A specific subcategory selected — flat grid, no headings
          <div className="shop-products-grid">
            {singleSubCategoryProducts.map((item, index) => (
              <Item 
                key={item.id ? `${item.id}-${index}` : index} 
                id={item.id || item._id} 
                name={item.title || item.name} 
                image={item.image} 
                new_price={item.price || item.new_price} 
                old_price={item.old_price} 
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280", fontSize: "14px" }}>
            Is category mein abhi koi items nahi hain.
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;