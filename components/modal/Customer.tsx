import React from "react";
import Link from "next/link";
const Customer = () => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-50">
        <div className="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg">
          <div className="font-quicksand font-semibold lg:text-xl text-base text-center text-red-500 my-4">
            Click the link below
          </div>
          <div className="text-center my-6">
            <Link
              href="/orders"
              className="font-quicksand px-8 py-2 text-sm bg-red-400 rounded-md text-white font-semibold"
            >
              Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
