import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function GirlsHome() {
  const [womensData, setWomensData] = useState();
  useEffect(() => {
    // to get womens data
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/all?collection=womens`)
      .then((response) => {
        setWomensData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className="max-w-screen-xl mx-auto px-5 mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {womensData &&
          womensData.slice(1, 5).map((data) => {
            return (
              <div
                className="border rounded-b-md hover:shadow-md"
                key={data._id}
              >
                <ProductCard product={data} />
              </div>
            );
          })}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/collections?category=womens">
          <div className="px-4 py-2 rounded-md bg-blue-500 text-white  cursor-pointer hover:scale-105 duration-100">
            Show More
          </div>
        </Link>
      </div>
    </section>
  );
}
