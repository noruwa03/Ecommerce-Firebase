import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import { useEffect, Fragment } from "react";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { getProductOrder } from "@/store/features/order";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";

const Orders: NextPageWithLayout = () => {

  const currentUser = useAppSelector((state) => state.auth);
  const myOrder = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductOrder());
  }, [currentUser, dispatch]);
  
   if (!currentUser.user) {
     return (
       <>
         <UnauthorizedUser />
       </>
     );
   }

  
  return (
    <>
      {myOrder.loading ? <ScreenLoader /> : null}
      {myOrder.error ? <ScreenError message={myOrder.error} /> : null}
      <section className="py-20 lg:px-16 md:px-8 px-4">
        {myOrder.productOrder.length === 0 ? (
          <>
            <div className="grid place-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-journal-text fill-slate-700"
                viewBox="0 0 16 16"
              >
                <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>
             
            </div>
            <div className="text-center mt-6">
              {" "}
              <Link
                href="/"
                className="font-quicksand lg:text-lg text-base  text-slate-600 font-bold underline decoration-wavy decoration-red-300"
              >
                No orders continue shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white w-full  rounded-tl-xl rounded-tr-xl p-5">
              <h1 className="font-quicksand font-bold text-xl text-slate-700">
                Orders
              </h1>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-6 mt-3">
                <div className="lg:block md:hidden hidden font-quicksand font-semibold col-span-2">
                  Payment Type
                </div>
                <div className="lg:block md:block md:col-span-3 font-quicksand font-semibold lg:col-span-4 col-span-4">
                  Status
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
            {myOrder.productOrder.map((res: any) => {
              return (
                <Fragment key={res.id}>
                  <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white w-full rounded-sm py-3 px-5">
                    <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-6 mt-3">
                      <div className="lg:block md:hidden hidden font-quicksand  col-span-2">
                        Paypal
                      </div>
                      <div className="lg:block md:block md:col-span-3 font-quicksand  lg:col-span-4 col-span-4">
                        Pending
                      </div>
                      <div className="lg:block md:block hidden md:col-span-2 font-quicksand col-span-2">
                        ₦ {Intl.NumberFormat("en-US").format(res.totalPrice)}
                      </div>
                      <div className="lg:block md:hidden hidden font-quicksand col-span-2">
                        {res.orderItem.length}
                      </div>
                      <div className="lg:flex flex-row items-center space-x-8 md:flex flex md:col-span-1 font-quicksand col-span-2">
                        <Link
                          href={`order/${res.id}`}
                          className="px-6 py-2 bg-green-100/70 text-sm rounded-lg font-quicksand font-semibold"
                        >
                          View
                        </Link>
                       
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </>
        )}
      </section>
    </>
  );
};


Orders.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Orders;
