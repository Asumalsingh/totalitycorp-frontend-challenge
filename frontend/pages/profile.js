import React, { useEffect, useContext, useState } from "react";
import userContext from "../src/context/user/userContext";
import axios from "axios";
import Footer from "../src/components/Footer";

export default function profile() {
  const { user } = useContext(userContext);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (user.data) {
      axios
        .get(`${BASE_URL}/order/get`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      location.replace("/");
    }
  }, []);

  const handelLogout = () => {
    localStorage.removeItem("auth-token");
    location.replace("/");
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5 py-20">
        {user.data && (
          <div className="bg-white rounded-lg p-4 mb-8">
            <p>
              <span className="font-semibold"> Name : </span> {user.data.name}
            </p>
            <p>
              <span className="font-semibold"> Email : </span> {user.data.email}
            </p>

            <button
              onClick={handelLogout}
              className="px-4 py-1 rounded-md border border-red-300 mt-4 text-red-500"
            >
              Logout
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-3xl">Your Orders</h2>
          {orders &&
            orders.map((order, index) => (
              <div className="border rounded-lg p-2 mb-3" key={order._id}>
                <div className="grid grid-cols md:grid-cols-2 gap-6 divide-y md:divide-x">
                  <div className="">
                    <p className="font-semibold text-xl mb-2">
                      OrderId:{" "}
                      <span className="text-gray-500"> {order._id}</span>
                    </p>
                    {order.products.map((product) => (
                      <div className="flex space-x-2 mb-2" key={product._id}>
                        <figure className="w-20">
                          <img src={product.image} alt="ph" />
                        </figure>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="font-medium text-sm">{product.price}</p>
                          <p className="text-xs text-gray-500">
                            qty: {product?.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="md:pl-3 flex flex-col justify-between h-full ">
                    <div className="">
                      <p className="font-semibold text-xl mb-2">Shipping</p>
                      <p>Email : {order.shipping.email}</p>
                      <p>Name : {order.shipping.name}</p>
                      <p>Phone : {order.shipping.phone}</p>

                      <p className="mt-2">
                        Address: {order.shipping.address.line1}
                      </p>
                      <p>City: {order.shipping.address.city}</p>
                      <p>Country: {order.shipping.address.country}</p>
                    </div>

                    <div className="bg-yellow-100 p-2 mt-2">
                      <p className="font-semibold text-lg">
                        Total: {order.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
