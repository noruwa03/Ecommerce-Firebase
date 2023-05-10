import React from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/router";

const TheNavBar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const nav_item = useRef<HTMLDivElement>(null);
  const menu_btn = useRef<HTMLDivElement>(null);

  const menuHandler = () => {
    menu_btn.current?.classList.toggle("active");
    nav_item.current?.classList.toggle("hidden");
  };
  return (
    <>
      <nav className="lg:grid lg:grid-cols-10 lg:sticky  items-center lg:h-24 fixed top-0 left-0 h-[3.8rem] bg-white z-30 px-16 lg:bg-white shadow-md shadow-slate-100 w-full">
        <Link
          href="/"
          className="lg:col-span-2 flex items-center lg:relative lg:top-0 lg:left-0 fixed top-4 left-4 z-50"
        >
          <Image src={Logo} alt="" className="lg:w-11 lg:h-11 w-7 h-7" />{" "}
          <span className="text-base text-slate-900 font-semibold font-quicksand ml-2">
            shopper<span className="text-red-300">Cart</span>
          </span>{" "}
        </Link>
        <div
          className="lg:col-span-6 lg:flex lg:relative lg:h-[2rem] hidden items-center justify-center bg-white lg:shadow-none shadow-md shadow-slate-100 fixed top-0 left-0 h-[20rem] w-full"
          ref={nav_item}
        >
          <ul className="flex lg:flex-row lg:items-center lg:justify-center lg:space-x-16 lg:space-y-0 lg:px-0 px-6 space-y-4 flex-col items-start justify-center h-full">
            <li>
              <Link
                href="/"
                className={
                  currentRoute === "/"
                    ? "font-quicksand font-semibold uppercase text-slate-500 text-sm hover:text-slate-400 underline decoration-2 decoration-wavy decoration-red-300"
                    : "font-quicksand font-semibold uppercase text-slate-400 text-sm hover:text-slate-500 hover:underline hover:decoration-2 hover:decoration-wavy hover:decoration-red-300"
                }
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/store"
                className={
                  currentRoute === "/store"
                    ? "font-quicksand font-semibold uppercase text-slate-500 text-sm hover:text-slate-400 underline decoration-2 decoration-wavy decoration-red-300"
                    : "font-quicksand font-semibold uppercase text-slate-400 text-sm hover:text-slate-500 hover:underline hover:decoration-2 hover:decoration-wavy hover:decoration-red-300"
                }
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="font-quicksand font-semibold uppercase text-slate-400 text-sm hover:text-slate-500 hover:underline hover:decoration-2 hover:decoration-wavy hover:decoration-red-300"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2 flex items-center justify-end sm:space-x-14 space-x-6 lg:relative lg:top-0 lg:right-0 fixed top-[1.4rem] sm:right-24 right-20 z-50">
          <Link href="/sign-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              className="bi bi-person  fill-slate-800 "
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </Link>
          <div className="relative">
            <Link href="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className={
                  currentRoute === "/cart"
                    ? "bi bi-bag fill-red-500"
                    : "bi bi-bag fill-slate-800"
                }
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </Link>
            <span className="absolute lg:-top-5 sm:-top-4 -top-4 -right-3 bg-red-400 text-white font-semibold font-quicksand text-xs sm:w-7 sm:h-7 w-6 h-6 rounded-full grid place-content-center">
              10
            </span>{" "}
          </div>
        </div>
        <div className="lg:hidden block fixed top-2 right-3 z-50">
          <div onClick={menuHandler} className="menu-btn" ref={menu_btn}>
            <div className="menu-btn__burger"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TheNavBar;
