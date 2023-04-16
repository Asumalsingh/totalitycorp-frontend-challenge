import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Filters() {
  const [expand, setExpand] = useState({
    price: false,
    productType: false,
    size: false,
  });
  return (
    <div>
      <h2 className="font-bold text-xl">Filters</h2>
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
          <li className="cursor-pointer mb-[6px] hover:text-blue-500">
            Under &#8377;200
          </li>
          <li className="cursor-pointer mb-[6px] hover:text-blue-500">
            &#8377;200 to &#8377;500
          </li>
          <li className="cursor-pointer mb-[6px] hover:text-blue-500">
            &#8377;500 to &#8377;1000
          </li>
          <li className="cursor-pointer mb-[6px] hover:text-blue-500">
            &#8377;1000 & Above
          </li>

          <li className="mb-[6px] flex justify-between items-center">
            <input
              type="number"
              placeholder="&#8377; 0"
              className="w-1/3 p-2 outline-none border rounded-md "
            />
            <span>to</span>
            <input
              type="number"
              placeholder="&#8377; 100000"
              className="w-1/3 p-2 outline-none border rounded-md "
            />
            <button className="p-2 bg-white rounded-md shadow-sm border hover:border-blue-500 ">
              Go
            </button>
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
          <li class="flex items-center mb-2">
            <input
              id="t-shirt"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
            />
            <label
              htmlFor="t-shirt"
              class="ml-2 text-xs  text-gray-900 dark:text-gray-300"
            >
              T-Shirt
            </label>
          </li>
          <li class="flex items-center mb-2">
            <input
              id="t-shirt"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
            />
            <label
              htmlFor="t-shirt"
              class="ml-2 text-xs  text-gray-900 dark:text-gray-300"
            >
              Shirt
            </label>
          </li>
          <li class="flex items-center mb-2">
            <input
              id="t-shirt"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
            />
            <label
              htmlFor="t-shirt"
              class="ml-2 text-xs text-gray-900 dark:text-gray-300"
            >
              Hoodies
            </label>
          </li>
          <li class="flex items-center mb-2">
            <input
              id="t-shirt"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
            />
            <label htmlFor="t-shirt" class="ml-2 text-xs text-gray-900">
              Crop-Top
            </label>
          </li>
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
          <li className="p-2  bg-white rounded-md border text-center cursor-pointer">
            S (90)
          </li>
          <li className="p-2  bg-white rounded-md border text-center cursor-pointer">
            M
          </li>
          <li className="p-2  bg-white rounded-md border text-center cursor-pointer">
            L
          </li>
        </ul>
      </div>
      <hr className="my-3" />
    </div>
  );
}
