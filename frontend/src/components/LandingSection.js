import React from "react";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";

export default function LandingSection() {
  return (
    <>
      <section
        className="h-screen hidden lg:flex justify-start items-center"
        style={{
          backgroundImage: `url("/images/img-2.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className=" ml-14">
          <p className="text-white font-bold text-6xl">Unleash your style</p>
          <p className="text-white font-bold my-4 text-6xl">With us</p>
          <span className="px-5 shadow-md py-2 text-white bg-blue-500 rounded-full hover:scale-105 duration-100  ">
            <Link href="/collections/all-products">Shop now</Link>
          </span>
        </div>
      </section>
      <section
        className="h-screen lg:hidden"
        style={{
          backgroundImage: `url("/images/img-2-mobile.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></section>
    </>
  );
}
