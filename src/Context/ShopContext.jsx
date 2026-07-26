import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const getDefaultWishlist = () => {
  let wishlist = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    wishlist[index] = 0;
  }
  return wishlist;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  };

  const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  };

  // Toggle Wishlist function (agar item pehle se hai toh remove karega, nahi toh add karega)
  const toggleWishlist = (itemId) => {
    setWishlistItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? 0 : 1
    }));
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

  const getTotalWishlistItems = () => {
    let totalWishlist = 0;
    for (const item in wishlistItems) {
      if (wishlistItems[item] > 0) {
        totalWishlist += 1; // Har unique item ko 1 count karega
      }
    }
    return totalWishlist;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist, // <-- Yeh yahan shamil kar diya gaya hai
    getTotalWishlistItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;