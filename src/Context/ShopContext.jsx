import React, { createContext, useState, useEffect } from "react";
import all_product_data from "../Components/Assets/all_product";
import { getStoredProducts } from "../ProductStore";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProductList, setAllProductList] = useState(() => {
    const stored = getStoredProducts();
    return [...stored, ...all_product_data];
  });

  const [cartItems, setCartItems] = useState(() => getDefaultCart([...getStoredProducts(), ...all_product_data]));
  
  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Nayi Wishlist States ---
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const updateProducts = () => {
      const stored = getStoredProducts();
      setAllProductList([...stored, ...all_product_data]);
    };

    updateProducts();
    window.addEventListener('focus', updateProducts);
    return () => window.removeEventListener('focus', updateProducts);
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
  };

  // --- Wishlist Functions ---
  const addToWishlist = (itemId) => {
    if (!wishlistItems.includes(itemId)) {
      setWishlistItems((prev) => [...prev, itemId]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter(id => String(id) !== String(itemId)));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProductList.find((product) => String(product.id) === String(item));
        if (itemInfo) {
          totalAmount += Number(itemInfo.new_price || 0) * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product: allProductList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    isCartOpen,
    setIsCartOpen,
    wishlistItems,       // Added
    addToWishlist,       // Added
    removeFromWishlist   // Added
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;