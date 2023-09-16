import React, { useState, useContext } from "react";
import Auth from "./Auth";
import userContext from "../context/user/userContext";
import cartContext from "../context/cart/cartContext";

export default function ProductCard({ product }) {
  const [authPopup, setAuthPopup] = useState(false);
  const { user } = useContext(userContext);
  const { addItemToCart } = useContext(cartContext);

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

  const handelAddToCart = () => {
    const formData = new FormData();
    formData.append("quantity", 1);
    if (user.data) {
      // Add to cart
      addItemToCart(product._id, formData);
    } else {
      setAuthPopup(true);
    }
  };

  return (
    <>
      <div>
        <img
          src={product.image.url}
          alt="Product image"
          className="h-72 w-auto mx-auto rounded-t-lg"
        ></img>

        <div className="my-2 px-4">
          <p className="font-medium text-gray-800 mb-1">
            {editName(product.name)}
          </p>
          <div className="">
            <p className="text-xs font-medium">
              ₹ {product.price}{" "}
              <span className="text-xs ml-1 text-gray-500 line-through">
                ₹ {product.mrp}
              </span>{" "}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handelAddToCart}
              className="px-6 mt-3  hover:bg-blue-700 duration-300 py-[5px] text-white rounded-full bg-blue-500 text-xs"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {authPopup && <Auth setAuthPopup={setAuthPopup} />}
    </>
  );
}
