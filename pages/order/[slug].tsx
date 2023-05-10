import { NextPageWithLayout } from ".././_app";
import type { ReactElement } from "react";
import Tv from "@/assets/images/tv.jpg";
import Image from "next/image";

const BidDetail: NextPageWithLayout = () => {
  return (
    <>
      <section className="py-20 lg:px-16 md:px-8 px-6">
        <div className="grid lg:grid-cols-8 grid-cols-2 gap-12">
          <div className="lg:col-span-4 col-span-2 divide-y">
            <div className="flex flex-wrap items-center pt-4  mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Fullname
              </h2>
              <p className="w-[50%]  font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Alex Fin
              </p>
            </div>

            <div className="flex flex-wrap items-center pt-10 mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Email
              </h2>
              <p className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                alex@gmail.com
              </p>
            </div>
            <div className="flex  flex-wrap items-center  pt-10  mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Phone No
              </h2>
              <p className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                +747824
              </p>
            </div>
            <div className="flex flex-wrap items-center   pt-10  mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                City
              </h2>
              <p className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                FCT
              </p>
            </div>
            <div className="flex flex-wrap items-center   pt-10  mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                State
              </h2>
              <p className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Abuja
              </p>
            </div>
            <div className="flex flex-wrap items-center pt-10  mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Country
              </h2>
              <p className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Nigeria
              </p>
            </div>
            <div className="flex flex-wrap items-center pt-10  mb-3">
              <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                Address
              </h2>
              <p className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                32, Maitama cresent avenue, Lubge district
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-2  divide-y">
            <div className="flex flex-wrap items-start pt-4  mb-3">
              <div className="w-[20%] ">
                <Image src={Tv} width={100} height={100} alt="" />
              </div>
              <div className="w-[48%]  ">
                <p className="font-quicksand font-bold lg:text-base text-sm text-slate-600">
                  Lg Smart tv
                </p>
                <p className="font-quicksand font-bold lg:text-base text-xs text-slate-600">
                  #20000
                </p>
                <p className="font-quicksand font-bold lg:text-base text-xs text-slate-600">
                  Quantity: 5
                </p>
              </div>
              <div className="w-[30%]  font-quicksand font-semibold lg:text-sm text-xs text-green-400">
                7 day(s) waranty assured
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

BidDetail.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default BidDetail;
