import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import userContext from "../context/user/userContext";
import cartContext from "../context/cart/cartContext";
import Auth from "./Auth";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const data = [
    { name: "Home", url: "/" },
    { name: "Shop All", url: "/collections/all" },
    { name: "Shop Men", url: "/collections/mens" },
    { name: "Shop Women", url: "/collections/womens" },
  ];

  const { user } = useContext(userContext);
  const { cartItems } = useContext(cartContext);

  // console.log("nav user: ", user);
  return (
    <>
      <nav className="flex z-20 justify-between items-center w-full h-16 px-5 md:px-10 shadow-sm backdrop-blur-md fixed">
        {/* Left side navbar */}
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl z-20 font-bold  cursor-pointer">
            <Link href="/" className="">
              <span className="text-blue-500">AK </span>STORE
            </Link>
          </h1>
          <ul className="hidden lg:flex">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className="mx-3 capitalize cursor-pointer font-medium hover:text-blue-500 hover:scale-105 duration-100"
                >
                  <Link href={item.url}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Right side navbar */}
        <div>
          {user && user.loading ? null : user && user.data ? (
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/cart">
                <div className="bg-gray-100 relative hover:bg-gray-200 duration-200 rounded-full p-2">
                  <MdOutlineShoppingCart size={25} className="text-gray-600" />
                  {cartItems.data?.length > 0 && (
                    <div className="bg-red-600 text-white absolute top-0 right-0 p-1 w-4 h-4 rounded-full flex justify-center items-center">
                      <span className="text-[0.6rem]">
                        {cartItems.data?.length > 9
                          ? "9+"
                          : cartItems.data?.length}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <Link href="/profile">
                <div className="flex space-x-2 items-center group bg-gray-100 rounded-full pl-4 py-1 px-1 hover:bg-gray-100 duration-50">
                  <span className="font-medium">{user.data.name}</span>
                  <FaUserCircle
                    size={30}
                    className="text-gray-500 cursor-pointer group-hover:text-blue-500 duration-300"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex space-x-4">
              <button
                onClick={() => setAuthPopup(true)}
                className="px-6 py-2 shadow-lg shadow-blue-200 font-medium border border-blue-500 hover:scale-105 duration-200 text-sm rounded-full bg-blue-500 text-white"
              >
                Login
              </button>
            </div>
          )}

          <FaBars
            size={30}
            onClick={() => setNav(true)}
            className="cursor-pointer text-gray-500 lg:hidden"
          />
        </div>

        {nav && (
          <div className="z-10 w-full py-24 px-5 fixed top-0 left-0 h-screen bg-gray-50">
            <FaTimes
              size={30}
              className="absolute top-6 right-4 text-gray-500"
              onClick={() => {
                setNav(false);
              }}
            />
            <ul className="">
              {user && user.data && (
                <div>
                  <Link
                    href="/profile"
                    onClick={() => {
                      setNav(false);
                    }}
                  >
                    <div className="flex space-x-2 items-center mb-2 bg-gray-100 p-3 rounded-md">
                      <FaUserCircle
                        size={30}
                        className="text-gray-500 cursor-pointer"
                      />
                      <span className="font-medium">{user.data.name}</span>
                    </div>
                  </Link>
                  <Link
                    href="/cart"
                    className="mt-4"
                    onClick={() => {
                      setNav(false);
                    }}
                  >
                    <div className="flex space-x-2 font-medium items-center mb-2 bg-gray-100 p-3 rounded-md">
                      <MdOutlineShoppingCart
                        size={30}
                        className="text-gray-600"
                      />
                      <span>Cart</span>
                    </div>
                  </Link>
                </div>
              )}

              {data.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={item.url}
                      onClick={() => {
                        setNav(false);
                      }}
                    >
                      <p className="mb-2 bg-gray-100 p-3 rounded-md capitalize cursor-pointer font-medium hover:text-blue-500 hover:scale-105 duration-100">
                        {item.name}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {user && !user.loading && user.data == null && (
              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 text-sm rounded-full border text-blue-500 border-blue-500"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      {authPopup && <Auth setAuthPopup={setAuthPopup} />}
    </>
  );
}
