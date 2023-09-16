import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import userContext from "../../src/context/user/userContext";
import Auth from "../../src/components/Auth";

export default function ProductType() {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [authPopup, setAuthPopup] = useState(false);
  const router = useRouter();
  const query = router.query.productId;

  const { user } = useContext(userContext);

  useEffect(() => {
    if (query) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/getOne/${query}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [query]);

  const handelBuyNow = () => {
    if (user.data) {
      // Buy now
      console.log("Buy now");
    } else {
      setAuthPopup(true);
    }
  };

  const handelAddToCart = () => {
    if (user.data) {
      // Add to cart
      console.log("add to cart");
    } else {
      setAuthPopup(true);
    }
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
    <>
      <section className="max-w-screen-xl mx-auto px-5 py-28">
        {product && (
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div>
              <img
                src={product.image.url}
                alt="product-image"
                className="w-80 h-auto shadow-sm"
              />
            </div>
            <div className="mt-3">
              <p className="font-semibold text-3xl mb-3">
                {editName(product.name)}
              </p>

              <div className="flex space-x-3 items-center">
                <p className="font-semibold">₹ {product.price}</p>
                <p className="text-xs text-gray-400">
                  M.R.P: <span className=" line-through">₹ {product.mrp}</span>
                </p>
              </div>
              <hr className=" my-4" />

              {/* Size */}
              <p className="text-gray-500 text-sm">Size : {selectedSize}</p>
              <div className="flex mb-4">
                {product.size.map((s) => {
                  return (
                    <span
                      key={s}
                      onClick={() => {
                        if (selectedSize === s) {
                          setSelectedSize("");
                        } else {
                          setSelectedSize(s);
                        }
                      }}
                      className={`capitalize px-3 py-1 m-1 rounded-md cursor-pointer border ${
                        selectedSize === s && "border-blue-500"
                      }`}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>

              {/* Quantity */}
              <p className="text-gray-500 text-sm">Quantity : {quantity}</p>
              <div className="border divide-x mt-1 mb-4 flex items-center justify-between rounded-md w-32">
                <button
                  disabled={quantity === 0}
                  className="px-4 py-2"
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-4 py-2"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>

              {/* Buy or add to cart */}
              <div className="flex space-x-6">
                <button
                  onClick={handelBuyNow}
                  className="px-6 py-2 shadow-lg shadow-blue-200 hover:scale-105 duration-300 rounded-md cursor-pointer bg-blue-500 text-white"
                >
                  Buy Now
                </button>
                <button
                  onClick={handelAddToCart}
                  className="px-6 py-2 shadow-lg shadow-blue-100 hover:scale-105 duration-300 rounded-md cursor-pointer border border-blue-400 text-blue-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      {authPopup && <Auth setAuthPopup={setAuthPopup} />}
    </>
  );
}
