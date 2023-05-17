import { NextPageWithLayout } from ".././_app";
import type { ReactElement } from "react";
import Image from "next/image";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { useEffect, Fragment } from "react";
import { getProductOrderDetail } from "@/store/features/order";
import { useRouter } from "next/router";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";

const OrderDetail: NextPageWithLayout = () => {
  const currentUser = useAppSelector((state) => state.auth);
  const myOrder = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  const { query } = useRouter();

  useEffect(() => {
    dispatch(getProductOrderDetail(query.slug));
  }, [dispatch, query.slug]);

  if (!currentUser.user) {
    return (
      <>
        <UnauthorizedUser />
      </>
    );
  }

  return (
    <>
      {myOrder.loading ? (
        <ScreenLoader />
      ) : (
        <>
          {myOrder.productOrderDetail === "No product" ? (
            <ScreenError message="No product" />
          ) : (
            <>
              <section className="py-20 lg:px-16 md:px-8 px-4">
                <div className="grid lg:grid-cols-8 grid-cols-2 gap-12">
                  <div className="lg:col-span-4 col-span-2 divide-y">
                    <div className="flex flex-wrap items-center pt-4  mb-3">
                      <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        Fullname
                      </h2>
                      <p className="w-[50%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.fullname}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center pt-10 mb-3">
                      <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        Email
                      </h2>
                      <p className="w-[50%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.email}
                      </p>
                    </div>
                    <div className="flex  flex-wrap items-center  pt-10  mb-3">
                      <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        Phone No
                      </h2>
                      <p className="w-[50%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.phone_no}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center   pt-10  mb-3">
                      <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        City
                      </h2>
                      <p className="w-[50%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.city}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center   pt-10  mb-3">
                      <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        State
                      </h2>
                      <p className="w-[50%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.state}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center pt-10  mb-3">
                      <h2 className="w-[50%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        Country
                      </h2>
                      <p className="w-[50%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.country}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center pt-10 lg:space-y-0 space-y-4  mb-3">
                      <h2 className="w-[100%] font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        Address
                      </h2>
                      <p className="w-[100%] break-words font-quicksand font-semibold lg:text-base text-sm text-slate-600">
                        {myOrder.productOrderDetail[0]?.customerDetail.address}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-4 col-span-2  divide-y">
                    {myOrder.productOrderDetail[0]?.orderItem.map(
                      (res: any) => {
                        return (
                          <Fragment key={res.id}>
                            <div className="flex flex-wrap items-start justify-between pt-4  mb-3">
                              <div className="w-[20%] ">
                                <Image
                                  priority={true}
                                  unoptimized={true}
                                  loader={() => res.photoURL}
                                  src={res.photoURL}
                                  alt={res.id}
                                  width={100}
                                  height={100}
                                  className="w-full"
                                />
                              </div>
                              <div className="w-[76%]">
                                <p className="font-quicksand font-bold lg:text-base text-base text-slate-600 break-words">
                                  {res.name}
                                </p>
                                <p className="font-quicksand font-bold lg:text-base text-sm text-slate-600">
                                  ₦{" "}
                                  {Intl.NumberFormat("en-US").format(res.price)}{" "}
                                  * {res.quantity} = ₦{" "}
                                  {Intl.NumberFormat("en-US").format(
                                    Number(res.quantity) * Number(res.price)
                                  )}
                                </p>
                                <p className="font-quicksand font-bold lg:text-base text-sm text-slate-600">
                                  Quantity: {res.quantity}
                                </p>
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

OrderDetail.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default OrderDetail;
