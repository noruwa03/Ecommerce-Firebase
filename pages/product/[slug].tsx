import Head from "next/head";
import Tv from "@/assets/images/tv.jpg";
import Shoe from "@/assets/images/shoe0.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { useEffect, useState, Fragment } from "react";
import { getSingleProduct } from "@/store/features/vendor";

const ProductDetail = () => {
  const { query } = useRouter();


  const state = useAppSelector((state) => state.vendor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(query.slug));
  }, [dispatch, query.slug]);

  // console.log(state.singleProduct);

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
    setCurrentIndex(imageIndex)
  }

  if (state.singleProduct.length === 0) {
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
      ) : null}
      <section className="lg:pt-12 pt-24 pb-20 lg:px-28 sm:px-8 px-6">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-10">
          <div className="lg:col-span-2 col-span-2 relative">
            <div
              onClick={goToPrevious}
              className=" cursor-pointer absolute top-[35%] -translate-y-[50%] left-2 grid place-content-center p-4 bg-[#000000cc] rounded-full"
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
              className=" cursor-pointer absolute top-[35%] -translate-y-[50%] right-2 grid place-content-center p-4 bg-[#000000cc] rounded-full"
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

            <Image
              priority={true}
              unoptimized={true}
              loader={() =>
                `${state.singleProduct[0].multipleURL[currentIndex].imageURL}`
              }
              src={state.singleProduct[0].multipleURL[currentIndex].imageURL}
              alt="Shoe"
              width={50}
              height={50}
              className="w-full"
            />
            <div className="flex flex-row flex-wrap items-center  mt-5">
              {state.singleProduct[0].multipleURL.map(
                (res: any, index: number) => {
                  return (
                    <Fragment key={res.imageName}>
                      <Image
                        priority={true}
                        unoptimized={true}
                        loader={() => `${res.imageURL}`}
                        src={res.imageURL}
                        alt=""
                        width={50}
                        height={50}
                        className="lg:w-[7rem] w-[5rem] aspect-[4/3] lg:mr-6 mr-3 lg:mb-6 mb-3 border-2 border-white hover:border-red-400 cursor-pointer"
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
              {state.singleProduct[0].product_name}
            </h1>
            <hr className="my-4" />
            <p className="font-quicksand text-base text-slate-900">
              {state.singleProduct[0].description}
            </p>
            <p className="font-quicksand lg:text-2xl text-base font-semibold text-slate-900 mt-4">
              # {state.singleProduct[0].price}
            </p>
            <p className="font-quicksand text-base text-slate-900 mt-4">
              Availability:{" "}
              {state.singleProduct[0].quantity > 0 ? (
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
              Quantity: <span> {state.singleProduct[0].quantity}</span>
            </p>
            <div className="flex flex-row items-center space-x-5 mt-6">
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
                    fillRule="evenodd"
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
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </button>
            </div>
            <button className="py-3 px-4 border-2 border-slate-700 rounded-md text-base font-semibold font-quicksand bg-white hover:bg-gray-50 flex items-center space-x-3 mt-6 ">
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

        {/* <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-green-400 grid lg:grid-cols-6 grid-cols-2 p-8 my-24 rounded-lg lg:divide-x lg:space-y-0  space-y-8">
          <div className="col-span-2 grid place-content-center ">
            {" "}
            <div className="flex flex-row items-center">
              <span className="font-quicksand font-semibold ">
                Warranty: 7 days
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle fill-green-400 ml-4"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </div>{" "}
          </div>
          <div className="col-span-2 grid place-content-center">
            <div className="flex flex-row items-center">
              <span className="font-quicksand font-semibold ">
                Return Policy: No return policy
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bootstrap-reboot fill-green-400 ml-4"
                viewBox="0 0 16 16"
              >
                <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
              </svg>
            </div>
          </div>
          <div className="col-span-2 grid place-content-center">
            {" "}
            <div className="flex flex-row items-center">
              <span className="font-quicksand font-semibold ">
                Return Policy: No return policy
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bootstrap-reboot fill-green-400 ml-4"
                viewBox="0 0 16 16"
              >
                <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
              </svg>
            </div>
          </div>
        </div> */}

        {/* Review */}
        {/* <div className="my-32">
          <h2 className="font-quicksand text-lg uppercase font-bold mb-4">
            Review
          </h2>
          <div className="grid lg:grid-cols-8 grid-6">
            <div className="col-span-6">
              <div className="flex flex-row flex-wrap items-center justify-between">
                <h3 className="font-quicksand capitalize font-semibold">
                  Sarah walker
                </h3>
                <div className="flex flex-row flex-wrap items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill fill-yellow-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill fill-yellow-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill fill-yellow-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
              </div>
              <p className="font-quicksand my-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
                vel nulla facilis doloribus veritatis officiis! Commodi
                consequuntur laborum repudiandae rerum at aut voluptate
                obcaecati maxime, sequi est optio reiciendis incidunt?
              </p>
              <p className="font-quicksand text-base text-gray-400 my-4">
                02/04/2023
              </p>
            </div>
          </div>
        </div> */}

        <h2 className="font-quicksand font-semibold mt-28 mb-6">
          Other item you might be interested in{" "}
        </h2>
        <div className="grid lg:grid-cols-8 sm:grid-cols-4 grid-cols-2 gap-8">
          <div className="lg:col-span-2 col-span-2">
            <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-md pb-6 relative">
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={Shoe}
                  alt="Shoe"
                  className="w-full h-full object-cover transition-all duration-150 scale-110 hover:scale-100"
                />
              </div>
              <div className="absolute top-44 right-8 w-12 h-12 rounded-full bg-white grid place-content-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-400">
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
              <div className="px-4 mt-8">
                <h1 className="font-quicksand text-base text-slate-800 font-semibold capitalize">
                  <Link
                    href=""
                    className="underline decoration-wavy decoration-red-300"
                  >
                    Lg smart tv
                  </Link>
                </h1>
                <div className="flex flex-row items-center flex-wrap justify-between mt-2">
                  <h2 className="font-quicksand text-[0.87em] text-slate-600 capitalize">
                    Men clothing
                  </h2>
                  <h3 className="font-quicksand text-[0.87em] text-slate-600 px-6 py-2 bg-gray-50 rounded-lg  font-semibold">
                    #89844
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-2">
            <div className="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-md pb-6 relative">
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={Shoe}
                  alt="Shoe"
                  className="w-full h-full object-cover transition-all duration-150 scale-110 hover:scale-100"
                />
              </div>
              <div className="absolute top-44 right-8 w-12 h-12 rounded-full bg-white grid place-content-center shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-400">
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
              <div className="px-4 mt-8">
                <h1 className="font-quicksand text-base text-slate-800 font-semibold capitalize">
                  <Link
                    href=""
                    className="underline decoration-wavy decoration-red-300"
                  >
                    Lg smart tv
                  </Link>
                </h1>
                <div className="flex flex-row items-center flex-wrap justify-between mt-2">
                  <h2 className="font-quicksand text-[0.87em] text-slate-600 capitalize">
                    Men clothing
                  </h2>
                  <h3 className="font-quicksand text-[0.87em] text-slate-600 px-6 py-2 bg-gray-50 rounded-lg  font-semibold">
                    #89844
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
