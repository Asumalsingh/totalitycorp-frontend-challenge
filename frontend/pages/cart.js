import React, { useContext, useState, useEffect } from "react";
import cartContext from "../src/context/cart/cartContext";
import { BsTrash3 } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";

export default function Cart() {
  const [blurIndex, setBlurIndex] = useState();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { cartItems, processing, deleteCartItem, updateCartItem } =
    useContext(cartContext);

  const handleSelectQuantity = (e, itemId, index, checked) => {
    setBlurIndex(index);
    updateCartItem(index, parseInt(e.target.value), checked, itemId);
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPT_PUBLISHABLE_KEY
    );

    // console.log("Inside checkout");

    // get only selected cart
    const selectedCart = cartItems.data.filter((item) => item.checked === true);
    const body = {
      products: selectedCart,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/stripe/create-checkout-session`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = response.data;
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      localStorage.setItem("ask", result);
      console.log(result);
    } catch (error) {
      // Handle any errors here
      console.error("An error occurred:", error);
    }
  };

  const totalItems = () => {
    let total = 0; // Initialize total to 0
    cartItems.data?.map((item) => {
      if (item.checked) total += item.quantity;
    });
    return total;
  };

  const totalAmount = () => {
    let total = 0; // Initialize total to 0
    cartItems.data?.map((item) => {
      if (item.checked) total += item.quantity * item.details.price;
    });
    return total;
  };

  const editName = (name) => {
    const words = name.split("-");
    // Capitalize the first letter of every word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    // Join the words back into a formatted string
    let formattedStr = words.join(" ");

    return formattedStr;
  };
  return (
    <section className="max-w-screen-xl mx-auto px-5 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className=" sm:col-span-3">
          <ul>
            {cartItems.data?.map((item, index) => {
              return (
                <li key={item._id} className="relative">
                  {processing && blurIndex === index && (
                    <div className="absolute inset-0 bg-black opacity-10 z-30"></div>
                  )}

                  <div className="bg-white w-full mb-2 p-4">
                    <div className="flex space-x-6 ">
                      <figure className="w-24 sm:w-32">
                        <Image
                          src={item.details?.image.url}
                          width={2000}
                          height={2000}
                          alt="pic"
                        ></Image>
                      </figure>
                      <div>
                        <h2 className="sm:text-xl">
                          {item.details && editName(item.details?.name)}
                        </h2>
                        <p className="font-semibold">₹ {item.details?.price}</p>

                        <div>
                          <label
                            htmlFor="countries"
                            className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Quantity:
                          </label>
                          <select
                            id="quntity"
                            value={item.quantity}
                            onChange={(e) =>
                              handleSelectQuantity(
                                e,
                                item._id,
                                index,
                                item.checked
                              )
                            }
                            className="bg-gray-50 border cursor-pointer border-gray-200  text-sm rounded-lg focus:border-blue-500 block w-16 py-1 px-2"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-center space-x-4 mt-4">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {
                          updateCartItem(
                            index,
                            parseInt(item.quantity),
                            !item.checked,
                            item._id
                          );
                          setBlurIndex(index);
                        }}
                        name=""
                        id=""
                        className="w-5 h-5 cursor-pointer"
                      />

                      <button
                        onClick={() => deleteCartItem(item._id)}
                        className="bg-gray-100 hover:text-red-700 hover:bg-red-100 duration-200 rounded-full p-2 cursor-pointer"
                      >
                        <BsTrash3 size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="bg-white p-4 w-full pb-8 shadow-lg shadow-blue-100">
            <p className="font-semibold text-lg">Total Items: {totalItems()}</p>
            <p className="font-medium">Total Amount: ₹{totalAmount()}</p>

            <button
              onClick={handleCheckout}
              disabled={totalItems() === 0}
              className="mt-4 rounded-full disabled:bg-gray-200 disabled:shadow-none disabled:cursor-not-allowed bg-blue-500 text-white text-sm font-medium w-full hover:shadow-md hover:shadow-blue-300 duration-300 px-6 py-[7px]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
