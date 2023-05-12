import { useEffect, Fragment } from "react";
import { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Tv from "@/assets/images/tv.jpg";
import Image from "next/image";
import Link from "next/link";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { signOutCurrentUser } from "@/store/features/auth/index";
import { Loading } from "@/components/loader/loading";
import DeleteImageSuccess from "@/components/modal/DeleteImageSuccess";
import Error from "@/components/modal/Error";

import { getDashboardProduct, removeProductFromDB, closeModal } from "@/store/features/vendor";

const Dashboard: NextPageWithLayout = () => {
  const state = useAppSelector((state) => state.auth);
  const vendorProduct = useAppSelector((state) => state.vendor);
  const dispatch = useAppDispatch();

  const close = () => dispatch(closeModal());

  useEffect(() => {
    dispatch(getDashboardProduct());
  }, [state, dispatch]);


  const removeProduct = (payload: any) => {
    dispatch(removeProductFromDB((payload)));
  }



  if (!state.user) {
    return (
      <>
        <UnauthorizedUser />
      </>
    );
  }
  return (
    <>
      {vendorProduct.delete_image_success ? (
        <DeleteImageSuccess message={vendorProduct.delete_image_success} />
      ) : null}
      <section className="lg:pt-0 pt-0 pb-4 lg:px-0 sm:px-0 px-0">
        <div className="relative">
          <div className="w-full sm:h-44 h-36 relative">
            {state.user.storeBGPhotoURL === "" ? (
              <Image
                priority={true}
                unoptimized={true}
                loader={() =>
                  "https://img.freepik.com/free-vector/abstract-colorful-technology-dotted-wave-background_1035-17450.jpg"
                }
                src={
                  "https://img.freepik.com/free-vector/abstract-colorful-technology-dotted-wave-background_1035-17450.jpg"
                }
                alt=""
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                priority={true}
                unoptimized={true}
                loader={() => state.user.storeBGPhotoURL}
                src={state.user.storeBGPhotoURL}
                alt=""
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute lg:top-6 top-4 lg:right-6 right-2">
              <div
                onClick={() => dispatch(signOutCurrentUser)}
                className="font-semibold  text-base text-center px-5 py-2 bg-red-400 text-white lg:mb-4 mb-8 rounded-md cursor-pointer"
              >
                Signout
              </div>
            </div>
            <div className="absolute bottom-8 lg:right-6 right-2">
              <Link
                href="create"
                className="py-2 px-4 bg-red-400 rounded-md text-white font-medium  sm:mt-0 mt-2"
              >
                Create
              </Link>
            </div>
            <div className="absolute -bottom-2 left-24 z-20">
              <Link
                href="/profile"
                className="p-2 rounded-full bg-gray-100 border-2 border-red-200 grid place-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="absolute sm:top-24 top-20 sm:left-10  left-2 sm:w-32 sm:h-32 w-28 h-28 rounded-full bg-white grid place-content-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-200">
            {state.user.photoURL === "" ? (
              <Image
                priority={true}
                unoptimized={true}
                loader={() =>
                  "data:image/png;base64,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"
                }
                src={
                  "data:image/png;base64,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"
                }
                alt=""
                width={50}
                height={50}
                className="sm:w-32 sm:h-32 w-28 h-28 rounded-full object-contain"
              />
            ) : (
              <Image
                priority={true}
                unoptimized={true}
                loader={() => state.user.photoURL}
                src={state.user.photoURL}
                alt=""
                width={50}
                height={50}
                className="sm:w-32 sm:h-32 w-28 h-28 rounded-full object-cover"
              />
            )}
          </div>
          <div className="sm:px-10 px-6 mt-14">
            <h1 className="font-quicksand text-base text-slate-800 font-semibold">
              {state.user.storeName ? state.user.storeName : state.user.email}
            </h1>
            <div className="mt-2 lg:w-3/5 w-5/5">
              <h2 className="font-quicksand text-[0.87em] text-slate-600">
                {state.user.storeInfo ? state.user.storeInfo : ""}
              </h2>
            </div>
            <div className="mt-2">
              <Link
                href="/store-profile"
                className="font-quicksand text-base text-slate-700 font-medium underline decoration-wavy"
              >
                Store Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
      {vendorProduct.loading ? (
        <Loading />
      ) : vendorProduct.error ? (
        <Error message={vendorProduct.error} close={close} />
      ) : vendorProduct.dashboardProduct.length === 0 ? (
        <>
          <div className="grid place-content-center mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list-columns-reverse"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
          </div>
          <div className="font-quicksand text-center lg:text-xl text-base font-bold mt-6">
            No product yet
          </div>
        </>
      ) : (
        <section className="pt-8 pb-20 lg:px-16 sm:px-8 px-6">
          <div className="my-8">
            <div className="grid lg:grid-cols-8 md:grid-cols-10 grid-cols-4 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white py-6 sm:px-8 px-4 rounded-tl-lg rounded-tr-lg">
              <div className="font-semibold lg:col-span-2 lg:block md:block block md:col-span-4 col-span-2 font-quicksand text-base text-slate-600">
                Product
              </div>
              <div className="font-semibold lg:col-span-1 lg:block  md:hidden hidden font-quicksand text-base text-slate-600">
                Sku
              </div>
              <div className="font-semibold lg:col-span-1 lg:block  md:block block md:col-span-2 col-span-2 font-quicksand text-base text-slate-600">
                Availability
              </div>
              <div className="font-semibold lg:col-span-1 lg:block  md:block hidden md:col-span-2 font-quicksand text-base text-slate-600">
                Quantity
              </div>
              <div className="font-semibold lg:col-span-2 lg:block  md:hidden hidden font-quicksand text-base text-slate-600">
                About
              </div>
              <div className="font-semibold lg:col-span-1 lg:block  md:block hidden md:col-span-2  font-quicksand text-base text-slate-600">
                Action
              </div>
            </div>
            <div className="[&>*:nth-child(odd)]:bg-gray-50 [&>*:nth-child(even)]:bg-white">
              {vendorProduct.dashboardProduct.map((res: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <div className="grid lg:grid-cols-8 md:grid-cols-10 grid-cols-4 items-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)]  py-2 sm:px-8 px-4 rounded-sm">
                      <div className="lg:col-span-2 lg:block md:block block md:col-span-4 col-span-2 font-quicksand text-[0.87em] text-slate-600">
                        <div className="flex flex-row items-center lg:space-x-4">
                          {res.photoURL === "" ? (
                            <Image
                              priority={true}
                              unoptimized={true}
                              loader={() =>
                                "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                              }
                              src={
                                "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                              }
                              alt="Cover image"
                              width={50}
                              height={50}
                              className="lg:block hidden"
                            />
                          ) : (
                            <Image
                              priority={true}
                              unoptimized={true}
                              loader={() => `${res.photoURL}`}
                              src={res.photoURL}
                              alt="Cover image"
                              width={50}
                              height={50}
                              className="lg:block hidden"
                            />
                          )}

                          <div className="flex flex-col items-start">
                            <h3 className="font-semibold">
                              {res.product_name.substring(0, 15)}
                              {res.product_name.length >= 15 && "..."}
                            </h3>
                            <p>#{res.price}</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-1 lg:block  md:hidden hidden font-quicksand text-[0.87em] text-slate-600">
                        GAN-37784
                      </div>
                      <div className="lg:col-span-1 lg:block  md:block block md:col-span-2 col-span-2 font-quicksand  text-slate-600">
                        {res.quantity > 0 ? (
                          <span className="px-6 py-2 bg-green-100/70 rounded-lg text-xs font-semibold">
                            In stock
                          </span>
                        ) : (
                          <span className="px-6 py-2 bg-red-100/70 rounded-lg text-xs font-semibold">
                            Out of stock
                          </span>
                        )}
                      </div>
                      <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2 font-quicksand text-[0.87em] text-slate-600">
                        {res.quantity}
                      </div>
                      <div className="lg:col-span-2 lg:block  md:hidden hidden font-quicksand text-[0.87em] text-slate-600">
                        {res.description.substring(0, 40)}
                        {res.description.length >= 20 && "..."}
                      </div>
                      <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2  font-quicksand text-[0.87em] text-slate-600">
                        <div className="flex flex-row items-center space-x-8">
                          <svg
                            onClick={() => removeProduct(res)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3 cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                          <Link href={`/edit/${res.id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>

            <div className="flex flex-row items-center justify-between shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white py-6 sm:px-8 px-4 rounded-bl-lg rounded-br-lg">
              <div className="flex flex-row items-center sm:space-x-6 space-x-4">
                <div className="sm:px-6 py-2 px-4  cursor-pointer rounded-md font-quicksand  text-[0.87em] text-slate-600 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white">
                  Prev
                </div>
                <div className="sm:px-6 py-2 px-4  cursor-pointer rounded-md  font-quicksand text-[0.87em] text-slate-600 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white">
                  Next
                </div>
              </div>
              <h3 className="font-quicksand sm:text-[0.87em] text-xs text-slate-600 ">
                Page 1 of 10
              </h3>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

Dashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Dashboard;
