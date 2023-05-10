import Tv from "@/assets/images/tv.jpg";
import BillingInfo from "@/components/screens/BillingInfo";
import Image from "next/image";
import { useState } from "react"

const Cart = () => {

  const [showbillingForm, setBillingForm] = useState<boolean>(false);

  const billingHandler = () => setBillingForm(true);
  return (
    <>
      <section className="py-20 lg:px-28 md:px-8 px-6">
        <div className="flex items-center justify-between">
          <h1 className="font-quicksand font-semibold lg:text-3xl text-lg text-slate-800">
            Cart
          </h1>
          <button className="py-3 px-4 border-2 border-slate-700 rounded-md text-base font-semibold font-quicksand bg-white hover:bg-gray-50 flex items-center space-x-3 ">
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
            <span>Clear Cart</span>
          </button>
        </div>
        <div className="divide-y">
          <div className="grid lg:grid-cols-10 grid-cols-4 items-center gap-2 lg:py-0  py-6 ">
            <div className="lg:col-span-2 col-span-2">
              <Image src={Tv} alt="" width={150} height={150} />
            </div>
            <div className="lg:col-span-4 col-span-2">
              <h2 className="font-quicksand font-bold sm:texl-2xl text-lg capitalize">
                Lg smart tv
              </h2>
              <h3 className="font-quicksand font-semibold texl-lg capitalize">
                #58443
              </h3>
            </div>
            <div className="lg:col-span-2 col-span-2 flex flex-row items-center space-x-8">
              <button className="p-2 rounded-md shadow-sm shadow-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-dash-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                  />
                </svg>
              </button>

              <h2 className="font-quicksand texl-lg font-semibold">2</h2>

              <button className="p-2 rounded-md shadow-sm shadow-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </button>
            </div>
            <div className="lg:col-span-2 col-span-2 grid place-content-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          </div>

          <div className="grid lg:grid-cols-10 grid-cols-4 items-center gap-2 lg:py-0  py-6">
            <div className="lg:col-span-2 col-span-2">
              <Image src={Tv} alt="" width={150} height={150} />
            </div>
            <div className="lg:col-span-4 col-span-2">
              <h2 className="font-quicksand font-bold sm:texl-2xl text-lg capitalize">
                Lg smart tv
              </h2>
              <h3 className="font-quicksand font-semibold texl-lg capitalize">
                #58443
              </h3>
            </div>
            <div className="lg:col-span-2 col-span-2 flex flex-row items-center space-x-8">
              <button className="p-2 rounded-md shadow-sm shadow-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-dash-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                  />
                </svg>
              </button>

              <h2 className="font-quicksand texl-lg font-semibold">2</h2>

              <button className="p-2 rounded-md shadow-sm shadow-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </button>
            </div>
            <div className="lg:col-span-2 col-span-2 grid place-content-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between mt-6">
          <h3 className="font-quicksand sm:text-2xl text-lg font-semibold mt-5">
            Total price: 3321
          </h3>
          <button className="py-3 px-4 border-2 border-slate-700 rounded-md text-base font-semibold font-quicksand bg-white hover:bg-gray-50 flex items-center space-x-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-check2-circle fill-red-300 hover:fill-green-300"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>

            <span onClick={billingHandler}>Checkout</span>
          </button>
        </div>

        <>
          <div>{showbillingForm === true ? <BillingInfo /> : <></>}</div>
        </>
      </section>
    </>
  );
};

export default Cart;
