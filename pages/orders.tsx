import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";

const Orders: NextPageWithLayout = () => {
  return (
    <>
      <section className="py-20 lg:px-28 md:px-8 px-6">
        <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white w-full  rounded-tl-xl rounded-tr-xl p-5">
          <h1 className="font-quicksand font-bold text-lg text-slate-700">
            All Bids
          </h1>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-6 mt-3">
            <div className="lg:block md:hidden hidden font-quicksand font-semibold col-span-2">
              Payment Type
            </div>
            <div className="lg:block md:block md:col-span-3 font-quicksand font-semibold lg:col-span-4 col-span-4">
              Product Name
            </div>
            <div className="lg:block md:block hidden md:col-span-2 font-quicksand font-semibold col-span-2">
              Total Price
            </div>
            <div className="lg:block md:hidden hidden font-quicksand font-semibold col-span-2">
              Quantiy
            </div>
            <div className="lg:block md:block md:col-span-1 font-quicksand font-semibold col-span-2">
              Action
            </div>
          </div>
        </div>

        <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white w-full rounded-sm py-3 px-5">
          <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-6 mt-3">
            <div className="lg:block md:hidden hidden font-quicksand  col-span-2">
              Cash on Delivery
            </div>
            <div className="lg:block md:block md:col-span-3 font-quicksand  lg:col-span-4 col-span-4">
              Lg Ultra Smart tv
            </div>
            <div className="lg:block md:block hidden md:col-span-2 font-quicksand col-span-2">
              #24000
            </div>
            <div className="lg:block md:hidden hidden font-quicksand col-span-2">
              5
            </div>
            <div className="lg:flex flex-row items-center space-x-8 md:flex flex md:col-span-1 font-quicksand col-span-2">
              <Link href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white w-full rounded-sm py-3 px-5">
          <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-6 mt-3">
            <div className="lg:block md:hidden hidden font-quicksand  col-span-2">
              Cash on Delivery
            </div>
            <div className="lg:block md:block md:col-span-3 font-quicksand  lg:col-span-4 col-span-4">
              Lg Ultra Smart tv
            </div>
            <div className="lg:block md:block hidden md:col-span-2 font-quicksand col-span-2">
              #24000
            </div>
            <div className="lg:block md:hidden hidden font-quicksand col-span-2">
              5
            </div>
            <div className="lg:flex flex-row  items-center space-x-8 md:flex flex md:col-span-1 font-quicksand col-span-2">
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


Orders.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Orders;
