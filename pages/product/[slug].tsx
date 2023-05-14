import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { useEffect, useState, Fragment } from "react";
import { getSingleProduct } from "@/store/features/vendor";
import { addToCart, closeModal } from "@/store/features/cart";
import CartMessage from "@/components/modal/CartMessage";

const ProductDetail = () => {
  const { query } = useRouter();

  const state = useAppSelector((state) => state.vendor);
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(query.slug));
  }, [dispatch, query.slug]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage
      ? state.singleProduct[0].multipleURL.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage =
      currentIndex === state.singleProduct[0].multipleURL.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (imageIndex: number) => {
    setCurrentIndex(imageIndex);
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addPrdToCart = (payload: any) => {
    const item = {
      id: payload.id,
      name: payload.product_name,
      price: Number(payload.price),
      photoURL: payload.photoURL
        ? payload.photoURL
        : "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png",
      quantity: quantity,
    };

    dispatch(addToCart(item));
  };

  const close = () => {
    dispatch(closeModal());
  };

  if (state.loading) {
    return (
      <>
        <ScreenLoader />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>ShopperCart - Product</title>
        <meta name="description" content="Lg smart tv" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      {state.singleProduct === "No product" ? (
        <ScreenError message="No product" />
      ) : (
        <>
          {cartState.message.length > 0 ? (
            <CartMessage message={cartState.message} close={close} />
          ) : null}
          <section className="lg:pt-12 pt-24 pb-20 lg:px-28 sm:px-8 px-6">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-10">
              <div className="lg:col-span-2 col-span-2 relative">
                <div className="relative">
                  <div
                    onClick={goToPrevious}
                    className="cursor-pointer absolute top-[50%] -translate-y-[50%] left-2 grid place-content-center sm:p-4 p-3 bg-[#000000cc] rounded-full z-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-compact-left fill-white scale-110 stroke-white"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
                      />
                    </svg>
                  </div>

                  <div
                    onClick={goToNext}
                    className=" cursor-pointer absolute top-[50%] -translate-y-[50%] right-2 grid place-content-center sm:p-4 p-3 bg-[#000000cc] rounded-full z-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-compact-right fill-white scale-110 stroke-white"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                      />
                    </svg>
                  </div>
                  {state.singleProduct[0]?.multipleURL.length > 0 && (
                    <Image
                      priority={true}
                      unoptimized={true}
                      loader={() =>
                        `${state.singleProduct[0]?.multipleURL[currentIndex].imageURL}`
                      }
                      src={
                        state.singleProduct[0]?.multipleURL[currentIndex]
                          .imageURL
                      }
                      alt={
                        state.singleProduct[0]?.multipleURL[currentIndex]
                          .imageName
                      }
                      width={50}
                      height={50}
                      className="w-full"
                    />
                  )}
                </div>
                <div className="flex snap-x snap-mandatory  w-full mx:auto overflow-x-scroll mt-5 lg:py-4 py-4 space-x-4">
                  {state.singleProduct[0]?.multipleURL.map(
                    (res: any, index: number) => {
                      return (
                        <Fragment key={res.imageName}>
                          <Image
                            priority={true}
                            unoptimized={true}
                            loader={() => `${res.imageURL}`}
                            src={res.imageURL}
                            alt={res.imageName}
                            width={50}
                            height={50}
                            className="snap-center lg:w-[6rem] lg:h-[4.4rem] h-[3.7rem] w-[5rem] aspect-[4/3] border-2 border-white hover:border-red-400 cursor-pointer object-cover"
                            onClick={() => goToImage(index)}
                          />
                        </Fragment>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="md:col-span-2 col-span-2">
                <h1 className="font-quicksand md:text-3xl text-lg font-semibold capitalize text-slate-800">
                  {state.singleProduct[0]?.product_name}
                </h1>
                <hr className="my-4" />
                <p className="font-quicksand text-base text-slate-900">
                  {state.singleProduct[0]?.description.substring(0, 150)}
                  {state.singleProduct[0]?.description.length >= 150 && "..."}
                </p>
                <p className="font-quicksand lg:text-2xl text-base font-semibold text-slate-900 mt-4">
                  ₦{" "}
                  {Intl.NumberFormat("en-US").format(
                    state.singleProduct[0]?.price
                  )}
                </p>
                <p className="font-quicksand text-base text-slate-900 mt-4">
                  Availability:{" "}
                  {state.singleProduct[0]?.quantity > 0 ? (
                    <span className="ml-3 px-6 py-2 bg-green-100/70 text-xs rounded-lg">
                      In stock
                    </span>
                  ) : (
                    <span className="ml-3 px-6 py-2 bg-red-100/70 text-xs rounded-lg">
                      Out of stock
                    </span>
                  )}
                </p>
                <p className="font-quicksand text-base text-slate-900 mt-4">
                  Quantity: <span> {state.singleProduct[0]?.quantity}</span>
                </p>
                <div className="flex flex-row items-center space-x-5 mt-6">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 rounded-md shadow-sm shadow-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-dash-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                      />
                    </svg>
                  </button>

                  <h2 className="font-quicksand texl-lg font-semibold">
                    {quantity}
                  </h2>

                  <button
                    onClick={increaseQuantity}
                    className="p-2 rounded-md shadow-sm shadow-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => addPrdToCart(state.singleProduct[0])}
                  className="py-3 px-4 border-2 border-slate-700 rounded-md text-base font-semibold font-quicksand bg-white hover:bg-gray-50 flex items-center space-x-3 mt-6 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bag-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
                <div className="grid grid-cols-4 mt-8 gap-6">
                  <div className="py-4 lg:col-span-2 col-span-4 grid place-content-center text-base font-semibold rounded-md bg-gray-50 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] ">
                    More from shopperCart
                  </div>
                  <div className="py-4 lg:col-span-2 col-span-4 grid place-content-center text-base font-semibold text-green-400 bg-slate-800 rounded-md shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)]  ">
                    <div className="flex flex-row items-center">
                      <span>Chat on whatsapp</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-whatsapp ml-3 fill-green-400"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetail;
