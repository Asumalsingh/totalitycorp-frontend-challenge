import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const data = [
    { name: "Home", url: "/" },
    { name: "Shop All", url: "/collections/all-products" },
    { name: "Shop Men", url: "/collections/mens" },
    { name: "Shop Women", url: "/collections/womens" },
  ];

  return (
    <nav className="flex z-20 justify-between items-center w-full h-16 px-5 md:px-10 shadow-sm backdrop-blur-md fixed">
      {/* Left side navbar */}
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl z-20 font-bold  cursor-pointer">
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
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-md border text-blue-500 border-blue-500 "
          >
            Login
          </Link>

          <Link
            href="/signUp"
            className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white"
          >
            Sign up
          </Link>
        </div>

        <FaBars
          size={30}
          onClick={() => setNav(true)}
          className="cursor-pointer text-gray-500 lg:hidden"
        />
      </div>

      {nav && (
        <div className="z-10 w-full py-24 fixed top-0 left-0 h-screen bg-gray-50">
          <FaTimes
            size={30}
            className="absolute top-6 right-4 text-gray-500"
            onClick={() => {
              setNav(false);
            }}
          />
          <ul className="flex flex-col items-center ">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className="mx-3 mb-4 capitalize cursor-pointer font-medium hover:text-blue-500 hover:scale-105 duration-100"
                >
                  <Link href={item.url}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 text-sm rounded-md border text-blue-500 border-blue-500 ">
              Login
            </button>
            <button className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
