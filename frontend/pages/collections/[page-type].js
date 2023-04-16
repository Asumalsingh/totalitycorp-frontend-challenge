import React, { useState } from "react";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import Filters from "../../src/components/Filters";

export default function AllProduct() {
  const [sortList, setSortList] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const sortByData = [
    "Featured",
    "Price, high to low",
    "Price, low to high",
    "Date, old to new",
    "Date, new to old",
  ];

  return (
    <section className="max-w-screen-xl mx-auto px-5 py-28">
      <div className="text-center mb-8">
        <span className="text-4xl font-bold">Mens</span>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-1">
          <Filters />
        </div>
        <div className="col-span-4">
          <div className="flex justify-between mb-4 relative">
            <span>28 Products</span>
            <div className="flex space-x-2 items-center">
              <span className="font-semibold text-sm">Sort by: </span>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setSortList(!sortList);
                }}
              >
                <span className="text-sm"> {sortBy} </span>
                <MdKeyboardArrowDown
                  size={25}
                  className={`${sortList && "rotate-180"} duration-300`}
                />
              </div>
              <ul
                className={`card absolute top-7 right-0 ${
                  sortList ? "block" : "hidden"
                }`}
              >
                {sortByData.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="cursor-pointer hover:text-blue-500 text-sm my-1"
                      onClick={() => {
                        setSortBy(item);
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="border rounded-b-lg cursor-pointer">
              <Image
                src="/images/boys-tshirt-1.jpg"
                width={2000}
                height={2000}
              ></Image>
              <div className="text-center my-2">
                <p>T-Shirt</p>
                <p className="text-xs">&#8377;500</p>
              </div>
            </div>
            <div className="border rounded-b-lg cursor-pointer">
              <Image
                src="/images/boys-tshirt-1.jpg"
                width={2000}
                height={2000}
              ></Image>
              <div className="text-center my-2">
                <p>T-Shirt</p>
                <p className="text-xs">&#8377;500</p>
              </div>
            </div>
            <div className="border rounded-b-lg cursor-pointer">
              <Image
                src="/images/boys-tshirt-1.jpg"
                width={2000}
                height={2000}
              ></Image>
              <div className="text-center my-2">
                <p>T-Shirt</p>
                <p className="text-xs">&#8377;500</p>
              </div>
            </div>
            <div className="border rounded-b-lg cursor-pointer">
              <Image
                src="/images/boys-tshirt-1.jpg"
                width={2000}
                height={2000}
              ></Image>
              <div className="text-center my-2">
                <p>T-Shirt</p>
                <p className="text-xs">&#8377;500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
