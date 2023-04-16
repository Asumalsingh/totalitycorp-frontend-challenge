import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BoysHome() {
  return (
    <section className="max-w-screen-xl mx-auto px-5 mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

      <div className="flex justify-center mt-8">
        <span className="px-4 py-2 rounded-md bg-blue-500 text-white hover:scale-105 duration-100">
          <Link href="/collections/mens">Show More</Link>
        </span>
      </div>
    </section>
  );
}
