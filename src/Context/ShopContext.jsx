import React, { createContext, useState } from "react";
import all_product_data from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProductList] = useState(all_product_data);
  const [loading] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
  };

  const addToWishlist = (itemId) => {
    if (!wishlistItems.includes(itemId)) {
      setWishlistItems((prev) => [...prev, itemId]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((id) => String(id) !== String(itemId)));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = allProductList.find((product) => String(product.id) === String(item));
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

  return (
    <ShopContext.Provider
      value={{
        all_product: allProductList,
        loading,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        isCartOpen,
        setIsCartOpen,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;