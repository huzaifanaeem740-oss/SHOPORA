import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);


const getDefaultCart = () => {

  let cart = {};

  for (let i = 1; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }

  return cart;

};



const getDefaultWishlist = () => {

  let wishlist = {};

  for (let i = 1; i < all_product.length + 1; i++) {
    wishlist[i] = 0;
  }

  return wishlist;

};



const ShopContextProvider = (props) => {


  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist());



  // ADD TO CART

  const addToCart = (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1
    }));

  };



  // REMOVE FROM CART

  const removeFromCart = (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));

  };



  // ADD TO WISHLIST

  const addToWishlist = (itemId) => {

    setWishlistItems((prev) => ({
      ...prev,
      [itemId]: 1
    }));

  };



  // REMOVE FROM WISHLIST

  const removeFromWishlist = (itemId) => {

    setWishlistItems((prev) => ({
      ...prev,
      [itemId]: 0
    }));

  };



  // TOTAL CART ITEMS

  const getTotalCartItems = () => {

    let totalItem = 0;


    for (const item in cartItems) {

      if(cartItems[item] > 0){

        totalItem += cartItems[item];

      }

    }


    return totalItem;

  };



  // TOTAL WISHLIST ITEMS

  const getTotalWishlistItems = () => {

    let totalItem = 0;


    for (const item in wishlistItems) {

      if(wishlistItems[item] > 0){

        totalItem += wishlistItems[item];

      }

    }


    return totalItem;

  };



  // TOTAL CART AMOUNT

  const getTotalCartAmount = () => {

    let totalAmount = 0;


    for(const item in cartItems){

      if(cartItems[item] > 0){

        let product = all_product.find(
          (e)=> e.id === Number(item)
        );


        if(product){

          totalAmount += product.new_price * cartItems[item];

        }

      }

    }


    return totalAmount;

  };




  const contextValue = {

    all_product,

    cartItems,

    wishlistItems,


    addToCart,

    removeFromCart,


    addToWishlist,

    removeFromWishlist,


    getTotalCartItems,

    getTotalWishlistItems,

    getTotalCartAmount

  };



  return (

    <ShopContext.Provider value={contextValue}>

      {props.children}

    </ShopContext.Provider>

  );

};


export default ShopContextProvider;