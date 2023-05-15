import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { Fragment, useEffect } from "react";
import { getProduct } from "@/store/features/vendor";
import { addToCart, closeModal } from "@/store/features/cart";
import CartMessage from "@/components/modal/CartMessage";

export default function Home() {
  if (auth.currentUser) {
    console.log(auth.currentUser);
  } else {
    console.log("No user");
  }

  const state = useAppSelector((state) => state.vendor);
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const addPrdToCart = (payload: any) => {
    const item = {
      id: payload.id,
      name: payload.product_name,
      price: Number(payload.price),
      photoURL: payload.photoURL
        ? payload.photoURL
        : "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png",
      quantity: 1,
    };

    dispatch(addToCart(item));
  };

  const close = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Head>
        <title>ShopperCart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      {state.error ? <ScreenError message={state.error} /> : null}
      {state.loading ? (
        <ScreenLoader />
      ) : (
        <>
          {state.product.length === 0 ? (
            <>
              <div className="grid place-content-center mt-28">
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
            <>
              {" "}
              {cartState.message.length > 0 ? (
                <CartMessage message={cartState.message} close={close} />
              ) : null}
              <>
                <section className="lg:pt-20 pt-32 pb-20 lg:px-16 sm:px-8 px-6">
                  <div className="grid lg:grid-cols-8 sm:grid-cols-8 grid-cols-2 gap-8">
                    {state.product.map((res: any) => {
                      return (
                        <Fragment key={res.id}>
                          <div className="lg:col-span-2 sm:col-span-4 col-span-2">
                            <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-md pb-6 relative">
                              <div className="w-full h-48 overflow-hidden">
                                {res.photoURL === "" ? (
                                  <Link href={`product/${res.id}`}>
                                    <Image
                                      priority={true}
                                      unoptimized={true}
                                      loader={() =>
                                        "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                                      }
                                      src={
                                        "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                                      }
                                      alt="Shoe"
                                      width={50}
                                      height={50}
                                      className="w-full h-full object-cover transition-all duration-150 scale-110 hover:scale-100"
                                    />
                                  </Link>
                                ) : (
                                  <Link href={`product/${res.id}`}>
                                    <Image
                                      priority={true}
                                      unoptimized={true}
                                      loader={() => res.photoURL}
                                      src={res.photoURL}
                                      alt={res.id}
                                      width={50}
                                      height={50}
                                      className="w-full h-full object-cover transition-all duration-150 scale-110 hover:scale-100"
                                    />
                                  </Link>
                                )}
                              </div>
                              <div
                                onClick={() => addPrdToCart(res)}
                                className="absolute top-44 right-8 w-12 h-12 rounded-full bg-white grid place-content-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-400 cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-cart3 fill-red-400"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                              </div>
                              <div className="px-4 mt-12">
                                <h1 className="font-quicksand text-base text-slate-800 font-semibold capitalize">
                                  <Link
                                    href={`product/${res.id}`}
                                    className="underline decoration-wavy decoration-red-300"
                                  >
                                    {res.product_name.substring(0, 25)}
                                    {res.product_name.length >= 25 && "..."}
                                  </Link>
                                </h1>
                                <div className="flex flex-row items-center flex-wrap justify-between mt-2">
                                  <h2 className="font-quicksand text-[0.87em] text-slate-600 capitalize">
                                    {res.category}
                                  </h2>
                                  <h3 className="font-quicksand text-[0.87em] text-slate-600 px-6 py-2 bg-gray-50 rounded-lg  font-semibold">
                                    ₦{" "}
                                    {Intl.NumberFormat("en-US").format(
                                      res.price
                                    )}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </section>
              </>
            </>
          )}
        </>
      )}
    </>
  );
}
