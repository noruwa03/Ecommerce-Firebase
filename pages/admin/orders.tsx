import { NextPageWithLayout } from "../_app";
import { useState, useEffect, Fragment } from "react";
import type { ReactElement } from "react";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { getAdminOrder } from "@/store/features/order";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";
import Success from "@/components/modal/Success";
import Link from "next/link";
import EditOrder from "@/components/modal/EditOrder";
import { closeOrderModal } from "@/store/features/order";

const AllOrders: NextPageWithLayout = () => {
  const currentUser = useAppSelector((state) => state.auth);
  const order = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdminOrder());
  }, [currentUser, dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [updateDetail, setUpdateDetail] = useState({
    id: "",
    status: "",
  });

  const showEditModal = (args: any): void => {
    setShowModal(true);
    setUpdateDetail({ id: args.id, status: args.status });
  };

  const close = (): void => {
    setShowModal(false);
  };

  const closeSuccessModal = () => {
    dispatch(closeOrderModal());
  };

  if (!currentUser.user || currentUser.user.vendor === false) {
    return (
      <>
        <UnauthorizedUser />
      </>
    );
  }

  return (
    <>
      {" "}
      {showModal ? (
        <EditOrder
          id={updateDetail.id}
          status={updateDetail.status}
          close={close}
        />
      ) : null}
      {order.success ? (
        <Success message={order.success} close={closeSuccessModal} />
      ) : null}
      {order.loading ? <ScreenLoader /> : null}
      {order.error ? <ScreenError message={order.error} /> : null}
      <section className="lg:py-20 py-14 lg:px-16 md:px-8 px-4">
        {order.adminOrder.length === 0 ? (
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
                href="/dashboard"
                className="font-quicksand lg:text-lg text-base  text-slate-600 font-bold underline decoration-wavy decoration-red-300"
              >
                No orders yet
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
                <div className="lg:block md:block  md:col-span-3 col-span-4 font-quicksand font-semibold lg:col-span-2">
                  Status
                </div>
                <div className="lg:block  md:hidden hidden font-quicksand font-semibold lg:col-span-4">
                  Payment ID
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
            {order.adminOrder.map((res: any) => {
              return (
                <Fragment key={res.id}>
                  <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white w-full rounded-sm py-3 px-5">
                    <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-6 mt-3 font-medium">
                      <div className="lg:block md:block  md:col-span-3 col-span-4 font-quicksand lg:col-span-2">
                        {res.status === "Processing" ? (
                          <span className="text-yellow-500">{res.status}</span>
                        ) : res.status === "Delivered" ? (
                          <span className="text-green-500">{res.status}</span>
                        ) : (
                          <span className="">{res.status}</span>
                        )}
                      </div>
                      <div className="lg:block  md:hidden hidden font-quicksand lg:col-span-4">
                        {res.paymentID}
                      </div>
                      <div className="lg:block md:block hidden md:col-span-2 font-quicksand col-span-2">
                        ₦ {Intl.NumberFormat("en-US").format(res.totalPrice)}
                      </div>
                      <div className="lg:block md:hidden hidden font-quicksand col-span-2">
                        {res.orderItem.length}
                      </div>
                      <div className="lg:flex flex-row items-center space-x-8 md:flex flex md:col-span-1 font-quicksand col-span-2">
                        <Link
                          href={`/order/${res.id}`}
                          className="px-6 py-2 bg-green-100/70 text-sm rounded-lg font-quicksand font-semibold"
                        >
                          View
                        </Link>
                        {currentUser.user.vendor === true ? (
                          <button
                            onClick={() => showEditModal(res)}
                            className="hidden lg:block p-2 bg-red-100/70 text-sm rounded-lg font-quicksand font-semibold"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              className="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                          </button>
                        ) : null}
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

AllOrders.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default AllOrders;
