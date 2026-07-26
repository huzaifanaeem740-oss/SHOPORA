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
    wishlist[index] = false;
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
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const toggleWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
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

  // Yeh function missing tha jiski wajah se error aaya
  const getTotalWishlistItems = () => {
    let totalWishlist = 0;
    for (const item in wishlistItems) {
      if (wishlistItems[item]) {
        totalWishlist += 1;
      }
    }
    return totalWishlist;
  };

  const contextValue = {
    all_product,
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    toggleWishlist,
    getTotalCartAmount,
    getTotalCartItems,
    getTotalWishlistItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;