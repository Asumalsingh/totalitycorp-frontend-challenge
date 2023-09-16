import React, { useState, useEffect } from "react";
import cartContext from "./cartContext";
import axios from "axios";
const CartProvider = (props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [cartItems, setCartItems] = useState({ loading: true, data: null });
  const [processing, setprocessing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getCartItems();
    } else {
      setCartItems({ ...cartItems, loading: false });
    }
  }, []);

  // console.log("provider: ", cartItems);

  // add to cart items
  const addItemToCart = (productId, formData) => {
    axios
      .post(`${BASE_URL}/cart/add/${productId}`, formData, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCartItems({
          loading: false,
          data: cartItems.data.concat(response.data),
        });
        alert("Added to cart successfully");
      })
      .catch((error) => {
        // console.log(error);
        alert(error.response.data.message);
      });
  };

  // Get all cart items
  const getCartItems = () => {
    axios
      .get(`${BASE_URL}/cart/getAll`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        setCartItems({ loading: false, data: response?.data });
      })
      .catch((error) => {
        setCartItems({ ...cartItems, loading: false });
        alert(error.response.data.message);
      });
  };

  const updateCartItem = (itemIndex, quantity, checked, itemId) => {
    const formData = { quantity, checked };
    setprocessing(true);
    axios
      .put(`${BASE_URL}/cart/update/${itemId}`, formData, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        const updatedItems = cartItems.data;
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity,
          checked,
        };
        setCartItems({ loading: false, data: updatedItems });
        setprocessing(false);
      })
      .catch((error) => {
        console.log(error);
        setprocessing(false);
        // alert(error.response.data.message);
      });
  };

  // delete cart item
  const deleteCartItem = (itemId) => {
    axios
      .delete(`${BASE_URL}/cart/delete/${itemId}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        const updatedItems = cartItems.data.filter(
          (item) => item._id !== itemId
        );
        setCartItems({ loading: false, data: updatedItems });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        deleteCartItem,
        addItemToCart,
        updateCartItem,
        processing,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};

export default CartProvider;
