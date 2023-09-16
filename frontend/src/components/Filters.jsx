import React, { useState } from "react";
import { MdKeyboardArrowDown, MdOutlineClose } from "react-icons/md";

export default function Filters({ filterQuery, setFilterQuery }) {
  const [expand, setExpand] = useState({
    price: false,
    productType: false,
    size: false,
  });
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [warning, seTWarning] = useState(false);
  const prices = [
    { label: `Under ₹200`, range: ["0", "200"] },
    { label: "₹200 to ₹500", range: ["200", "500"] },
    { label: "₹500 to ₹1000", range: ["500", "1000"] },
    { label: "₹1000 & Above", range: ["1000", "100000"] },
  ];
  const productTypeData = ["tShirt", "shirt", "crop-top", "hoodies", "joggers"];
  const sizesData = ["s", "m", "l"];

  // This is clear all button
  let content = null;
  if (
    filterQuery.productType.length > 0 ||
    filterQuery.price.length > 0 ||
    filterQuery.size.length > 0
  ) {
    content = (
      <div className="flex justify-center mt-3">
        <button
          onClick={() => {
            setFilterQuery({
              ...filterQuery,
              productType: [],
              price: [],
              size: [],
            });
            location.reload();
          }}
          className="px-2 py-1 mx-auto text-xs bg-red-200 rounded-md hover:scale-105 duration-150 "
        >
          Clear all
        </button>
      </div>
    );
  }

  const handelGo = () => {
    seTWarning(false);
    if (priceRange.from === "" || priceRange.to === "") {
      seTWarning(true);
      return;
    } else {
      setFilterQuery({
        ...filterQuery,
        price: [priceRange.from, priceRange.to],
      });
    }
  };
  return (
    <div className="sticky top-20">
      <h2 className="font-bold text-xl">Filters</h2>
      {/* Showing which filters applied */}
      <div className="flex flex-wrap text-xs">
        {filterQuery.price.length > 0 && (
          <div className="flex items-center space-x-2 mr-3 my-1 bg-gray-200 p-1">
            <span>
              ₹{filterQuery.price[0]} - ₹{filterQuery.price[1]}{" "}
            </span>
            <MdOutlineClose
              size={17}
              className="cursor-pointer hover:bg-red-200"
              onClick={() => {
                setFilterQuery({
                  ...filterQuery,
                  price: [],
                });
              }}
            />
          </div>
        )}

        {filterQuery.productType &&
          filterQuery.productType.map((p, index) => {
            return (
              <div
                key={index}
                className="flex items-center space-x-2 mr-3 my-1 bg-gray-200 p-1"
              >
                <span>{p}</span>
                <MdOutlineClose
                  size={17}
                  className="cursor-pointer hover:bg-red-200"
                  onClick={() => {
                    setFilterQuery({
                      ...filterQuery,
                      productType: filterQuery.productType.filter(
                        (pt) => pt !== p
                      ),
                    });
                  }}
                />
              </div>
            );
          })}

        {filterQuery.size &&
          filterQuery.size.map((s, index) => {
            return (
              <div
                key={index}
                className="flex items-center space-x-2 mr-3 my-1 bg-gray-200 p-1"
              >
                <span>{s}</span>
                <MdOutlineClose
                  size={17}
                  className="cursor-pointer hover:bg-red-200"
                  onClick={() => {
                    setFilterQuery({
                      ...filterQuery,
                      size: filterQuery.size.filter((sz) => sz !== s),
                    });
                  }}
                />
              </div>
            );
          })}
      </div>
      {content}
      <hr className="my-3" />
      {/* Price */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => {
            setExpand({ ...expand, price: !expand.price });
          }}
        >
          <span className="font-semibold text-sm">PRICE</span>
          <MdKeyboardArrowDown
            size={25}
            className={`${expand.price && "rotate-180 duration-300"}`}
          />
        </div>
        <ul
          className={` text-xs text-gray-700 mt-2 ${
            !expand.price && "hidden"
          } `}
        >
          {prices.map((price, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setFilterQuery({
                    ...filterQuery,
                    price: [price.range[0], price.range[1]],
                  });
                }}
                className="cursor-pointer mb-[6px] hover:text-blue-500"
              >
                {price.label}
              </li>
            );
          })}

          <li className="mb-[6px] flex justify-between items-center">
            <input
              type="number"
              placeholder="&#8377; 0"
              onChange={(e) => {
                setPriceRange({ from: e.target.value, to: priceRange.to });
              }}
              className="w-1/3 p-2 outline-none border rounded-md "
            />
            <span>to</span>
            <input
              type="number"
              placeholder="&#8377; 100000"
              className="w-1/3 p-2 outline-none border rounded-md "
              onChange={(e) => {
                setPriceRange({ from: priceRange.from, to: e.target.value });
              }}
            />
            <button
              onClick={handelGo}
              className="p-2 bg-white rounded-md shadow-sm border hover:border-blue-500 "
            >
              Go
            </button>
          </li>
          <li className={`text-red-500 text-xs ${!warning && "hidden"}`}>
            Please fill range
          </li>
        </ul>
      </div>
      <hr className="my-3" />
      {/* Product type */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => {
            setExpand({ ...expand, productType: !expand.productType });
          }}
        >
          <span className="font-semibold text-sm">PRODUCT TYPE</span>
          <MdKeyboardArrowDown
            size={25}
            className={`${expand.productType && "rotate-180 duration-300"}`}
          />
        </div>
        <ul
          className={` text-xs text-gray-700 mt-2  ${
            !expand.productType && "hidden"
          } `}
        >
          {productTypeData.map((p, index) => {
            return (
              <li key={index} className="flex items-center mb-2">
                <input
                  id={p}
                  type="checkbox"
                  value={p}
                  onChange={(e) => {
                    if (filterQuery.productType.includes(e.target.value)) {
                      setFilterQuery({
                        ...filterQuery,
                        productType: filterQuery.productType.filter(
                          (pt) => pt !== e.target.value
                        ),
                      });
                    } else {
                      setFilterQuery({
                        ...filterQuery,
                        productType: [
                          ...filterQuery.productType,
                          e.target.value,
                        ],
                      });
                    }
                  }}
                  className="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
                />
                <label
                  htmlFor={p}
                  className="ml-2 capitalize cursor-pointer text-xs text-gray-900"
                >
                  {p === "tShirt" ? "t-shirt" : p}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="my-3" />
      {/* Size */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => {
            setExpand({ ...expand, size: !expand.size });
          }}
        >
          <span className="font-semibold text-sm">SIZE</span>
          <MdKeyboardArrowDown
            size={25}
            className={`${expand.size && "rotate-180 duration-300"}`}
          />
        </div>
        <ul
          className={` text-xs flex text-gray-700 mt-2 space-x-4 ${
            !expand.size && "hidden"
          } `}
        >
          {sizesData.map((s, index) => {
            return (
              <li
                key={index}
                className={`p-2 px-3  bg-white capitalize rounded-md border text-center cursor-pointer ${
                  filterQuery.size.includes(s) && "border-blue-500"
                }`}
                onClick={() => {
                  if (filterQuery.size.includes(s)) {
                    setFilterQuery({
                      ...filterQuery,
                      size: filterQuery.size.filter((pt) => pt !== s),
                    });
                  } else {
                    setFilterQuery({
                      ...filterQuery,
                      size: [...filterQuery.size, s],
                    });
                  }
                }}
              >
                {s}
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="my-3" />
    </div>
  );
}
