import React, { useEffect, useState, useContext } from "react";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import Filters from "../../src/components/Filters";
import { useRouter } from "next/router";
import ProductCard from "../../src/components/ProductCard";
import productContext from "../../src/context/product/productContext";
import { BiFilterAlt } from "react-icons/bi";

export default function AllProduct() {
  const [sortList, setSortList] = useState(false);
  const [sortBy, setSortBy] = useState({ value: "f", label: "Featured" });
  const sortByData = [
    {
      value: "f",
      label: "Featured",
    },
    { value: "plh", label: "Price, low to high" },
    { value: "phl", label: "Price, high to low" },
  ];
  const [filterQuery, setFilterQuery] = useState({
    collection: null,
    productType: [],
    price: [],
    size: [],
  });
  const [openFilter, setOpenFilter] = useState(false);

  const router = useRouter();
  const query = router.query.collectionType;
  const { getProducts, products } = useContext(productContext);

  useEffect(() => {
    if (query) {
      if (query === "all") {
        setFilterQuery({ ...filterQuery, collection: "" });
      } else {
        setFilterQuery({ ...filterQuery, collection: query });
      }
    }
  }, [query]);

  useEffect(() => {
    if (filterQuery.collection !== null) getProducts(filterQuery);
  }, [filterQuery, query]);

  return (
    <section className="max-w-screen-xl mx-auto px-5 py-20">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold capitalize">
          {router.query.collectionType}{" "}
          {router.query.collectionType === "all" && "Products"}
        </p>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="hidden md:block col-span-1">
          <Filters filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          {/* Total product and sort by */}
          <div className="flex justify-between mb-4 relative">
            <div className="flex items-center space-x-2 relative">
              <button
                onClick={() => setOpenFilter(true)}
                className="rounded-full sm:hidden flex items-start justify-start bg-gray-200 p-2"
              >
                <BiFilterAlt size={20} />
              </button>
              <p>{products.data && products.data.length} Products</p>

              {/* Filters for mobile */}
              {openFilter && (
                <div
                  className="relative z-30"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div
                    onClick={() => setOpenFilter(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                  ></div>
                  <div className="fixed  bg-white max-w-md mx-auto top-24 left-2 right-2 rounded-xl p-6">
                    <MdClose
                      size={36}
                      onClick={() => setOpenFilter(false)}
                      className="cursor-pointer  rounded-tr-xl hover:text-red-400 duration-200 absolute right-0 top-0 bg-primary text-gray-500 bg-gray-100"
                    />

                    <Filters
                      filterQuery={filterQuery}
                      setFilterQuery={setFilterQuery}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-2 items-center">
              <span className="font-semibold text-sm">Sort by: </span>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setSortList(!sortList);
                }}
              >
                <span className="text-sm"> {sortBy.label} </span>
                <MdKeyboardArrowDown
                  size={25}
                  className={`${sortList && "rotate-180"} duration-300`}
                />
              </div>
              <ul
                className={`w-48 bg-white shadow-sm rounded-sm px-4 py-2 absolute top-7 right-0 ${
                  sortList ? "block" : "hidden"
                }`}
              >
                {sortByData.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="cursor-pointer hover:text-blue-500 text-xs my-2"
                      onClick={() => {
                        setSortBy(item);
                        setSortList(false);
                      }}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {products.loading ? (
            <div className="flex text-2xl mt-40 justify-center items-center">
              Loading. . .
            </div>
          ) : products.data === null || products.data.length === 0 ? (
            <div className="flex justify-center items-center">
              No data available
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.data
                ?.slice()
                .sort((a, b) =>
                  sortBy.value === "plh"
                    ? a.price - b.price
                    : sortBy.value === "phl"
                    ? b.price - a.price
                    : ""
                )
                .map((product) => {
                  return (
                    <div
                      className="bg-white border rounded-lg hover:shadow-md duration-200 hover:shadow-blue-200"
                      key={product._id}
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
