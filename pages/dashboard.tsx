import React from "react";
import { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Tv from "@/assets/images/tv.jpg";
import Image from "next/image";
import Link from "next/link";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { signOutCurrentUser } from "@/store/features/auth/index";
import { useRouter } from "next/router";

const Dashboard: NextPageWithLayout = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  if (!state.user) {
    router.replace("/");
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
      <section className="lg:pt-0 pt-0 pb-4 lg:px-0 sm:px-0 px-0">
        <div className="relative">
          <div className="w-full sm:h-44 h-36 relative">
            {state.user.storeBGPhotoURL === "" ? (
              <Image
                priority={true}
                unoptimized={true}
                loader={() =>
                  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                }
                src={
                  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
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
          <div className="absolute sm:top-24 top-20 sm:left-10  left-2 sm:w-32 sm:h-32 w-28 h-28 rounded-full bg-white grid place-content-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-green-400">
            {state.user.photoURL === "" ? (
              <Image
                priority={true}
                unoptimized={true}
                loader={() =>
                  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                }
                src={
                  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                }
                alt=""
                width={50}
                height={50}
                className="sm:w-32 sm:h-32 w-28 h-28 rounded-full object-cover"
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
            <h1 className="font-quicksand text-base text-slate-800 font-semibold capitalize">
              {state.user.storeName ? state.user.storeName : state.user.email}
            </h1>
            <div className="mt-2">
              <h2 className="font-quicksand text-[0.87em] text-slate-600 capitalize">
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
      <section className="pt-8 pb-20 lg:px-16 sm:px-8 px-6">
        <div className="my-8">
          <div className="grid lg:grid-cols-8 md:grid-cols-10 grid-cols-4 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] bg-white py-6 sm:px-8 px-4 rounded-tl-lg rounded-tr-lg">
            <div className="lg:col-span-2 lg:block md:block block md:col-span-4 col-span-2 font-quicksand text-base text-slate-600">
              Product
            </div>
            <div className="lg:col-span-1 lg:block  md:hidden hidden font-quicksand text-base text-slate-600">
              Sku
            </div>
            <div className="lg:col-span-1 lg:block  md:block block md:col-span-2 col-span-2 font-quicksand text-base text-slate-600">
              Availability
            </div>
            <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2 font-quicksand text-base text-slate-600">
              Quantity
            </div>
            <div className="lg:col-span-2 lg:block  md:hidden hidden font-quicksand text-base text-slate-600">
              About
            </div>
            <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2  font-quicksand text-base text-slate-600">
              Action
            </div>
          </div>
          <div className="[&>*:nth-child(odd)]:bg-gray-50 [&>*:nth-child(even)]:bg-white">
            <div className="grid lg:grid-cols-8 md:grid-cols-10 grid-cols-4 items-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)]  py-2 sm:px-8 px-4 rounded-sm">
              <div className="lg:col-span-2 lg:block md:block block md:col-span-4 col-span-2 font-quicksand text-[0.87em] text-slate-600">
                <div className="flex flex-row items-center lg:space-x-4">
                  <Image
                    src={Tv}
                    alt=""
                    width={50}
                    height={50}
                    className="lg:block hidden"
                  />
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold">Test</h3>
                    <p>#8774</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 lg:block  md:hidden hidden font-quicksand text-[0.87em] text-slate-600">
                GAN-37784
              </div>
              <div className="lg:col-span-1 lg:block  md:block block md:col-span-2 col-span-2 font-quicksand  text-slate-600">
                <span className="px-6 py-2 bg-green-100/70 rounded-lg text-xs font-semibold">
                  In stock
                </span>
              </div>
              <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2 font-quicksand text-[0.87em] text-slate-600">
                32
              </div>
              <div className="lg:col-span-2 lg:block  md:hidden hidden font-quicksand text-[0.87em] text-slate-600">
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold">Test</h3>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
              <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2  font-quicksand text-[0.87em] text-slate-600">
                <div className="flex flex-row items-center space-x-8">
                  <Link href="">
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
                  </Link>
                  <Link href="">
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
            <div className="grid lg:grid-cols-8 md:grid-cols-10 grid-cols-4 items-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)]  py-2 sm:px-8 px-4 rounded-sm">
              <div className="lg:col-span-2 lg:block md:block block md:col-span-4 col-span-2 font-quicksand text-[0.87em] text-slate-600">
                <div className="flex flex-row items-center lg:space-x-4">
                  <Image
                    src={Tv}
                    alt=""
                    width={50}
                    height={50}
                    className="lg:block hidden"
                  />
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold">Test</h3>
                    <p>#8774</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 lg:block  md:hidden hidden font-quicksand text-[0.87em] text-slate-600">
                GAN-37784
              </div>
              <div className="lg:col-span-1 lg:block  md:block block md:col-span-2 col-span-2 font-quicksand  text-slate-600">
                <span className="px-6 py-2 bg-green-100/70 rounded-lg text-xs font-semibold">
                  In stock
                </span>
              </div>
              <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2 font-quicksand text-[0.87em] text-slate-600">
                32
              </div>
              <div className="lg:col-span-2 lg:block  md:hidden hidden font-quicksand text-[0.87em] text-slate-600">
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold">Test</h3>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
              <div className="lg:col-span-1 lg:block  md:block hidden md:col-span-2  font-quicksand text-[0.87em] text-slate-600">
                <div className="flex flex-row items-center space-x-8">
                  <Link href="">
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
                  </Link>
                  <Link href="">
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
    </>
  );
};

Dashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Dashboard;
