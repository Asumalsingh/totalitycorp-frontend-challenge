import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function BoysHome() {
  const [mensData, setMensData] = useState();
  useEffect(() => {
    // to get mens data
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/all?collection=mens`)
      .then((response) => {
        setMensData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className="max-w-screen-xl mx-auto px-5 mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {mensData &&
          mensData.slice(0, 4).map((data) => {
            return (
              <div className="border rounded-b-md hover:shadow-md" key={data._id}>
                <ProductCard product={data} />
              </div>
            );
          })}
      </div>

      <div className="flex justify-center mt-8">
        <span className="px-4 py-2 rounded-md bg-blue-500 text-white hover:scale-105 duration-100">
          <Link href="/collections?category=mens">Show More</Link>
        </span>
      </div>
    </section>
  );
}
