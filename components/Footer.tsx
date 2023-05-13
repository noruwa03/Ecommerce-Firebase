import React from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4 sm:gap-x-0 gap-x-4 lg:gap-y-0 gap-y-8 items-start lg:px-16 sm:px-8 px-6 pt-24 pb-16 lg:py-20">
        <div className="lg:col-span-3 sm:col-span-3 col-span-2">
          <Image
            priority={true}
            unoptimized={true}
            loader={() => Logo}
            src={Logo}
            height={100}
            width={100}
            alt=""
          />
        </div>
        <div className="lg:col-span-3 sm:col-span-3 col-span-2">
          <h2 className="uppercase font-quicksand text-slate-800 font-bold text-sm mb-5">
            About
          </h2>

          <Link
            href=""
            className="font-quicksand text-slate-500 hover:underline hover:decoration-2 hover:decoration-red-400 hover:decoration-wavy mb-2 font-semibold"
          >
            How to shop
          </Link>
        </div>
        <div className="lg:col-span-3 sm:col-span-3 col-span-2">
          <h2 className="uppercase font-quicksand text-slate-800 font-bold  text-sm mb-5">
            Services
          </h2>

          <Link
            href=""
            className="font-quicksand block text-slate-500 hover:underline hover:decoration-2 hover:decoration-red-400 hover:decoration-wavy mb-2 font-semibold"
          >
            Delivery
          </Link>
          <Link
            href=""
            className="font-quicksand block text-slate-500 hover:underline hover:decoration-2 hover:decoration-red-400 hover:decoration-wavy mb-2 font-semibold"
          >
            Return
          </Link>
          <Link
            href=""
            className="font-quicksand block text-slate-500 hover:underline hover:decoration-2 hover:decoration-red-400 hover:decoration-wavy mb-2 font-semibold"
          >
            Warranty
          </Link>
        </div>
        <div className="lg:col-span-3 sm:col-span-3 col-span-2">
          <h2 className="uppercase font-quicksand text-slate-800 font-bold text-sm mb-5">
            Management
          </h2>
          <Link
            href="orders"
            className="font-quicksand text-slate-500 hover:underline hover:decoration-2 hover:decoration-red-400 hover:decoration-wavy mb-2 font-semibold"
          >
            Orders
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
