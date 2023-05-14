import Shoe from "@/assets/images/shoe0.jpg";
import { NextPageWithLayout } from "../../_app";
import Link from "next/link";
import Image from "next/image";
import SignInFlow from "@/assets/icons/signin.svg";
import { useRouter } from "next/router";
import { Loading } from "@/components/loader/loading";
import ScreenLoader from "@/components/loader/ScreenLoader";
import ScreenError from "@/components/modal/ScreenError";
import Error from "@/components/modal/Error";
import Success from "@/components/modal/Success";
import DeleteImageSuccess from "@/components/modal/DeleteImageSuccess";
import { closeModal, deleteProductImage } from "@/store/features/vendor";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import {
  useEffect,
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  Fragment,
  ReactElement,
} from "react";
import { getSingleProduct, updateProduct } from "@/store/features/vendor";

const Edit: NextPageWithLayout = () => {
  const { query } = useRouter();

  const state = useAppSelector((state) => state.vendor);
  const dispatch = useAppDispatch();

  const [productDetail, setProductDetail] = useState({
    product_name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getSingleProduct(query.slug));
  }, [dispatch, query.slug]);

  // console.log(state.singleProduct);

  const [multipleFile, setMultipleFile] = useState<string | any>("");

  const [file, setFile] = useState<string | any>();

  const [displayImage, setDisplayImage] = useState("");

  const image = useRef<HTMLInputElement>(null);

  const imageInputClick = () => image.current?.click();

  const imageChange = (evt: any) => {
    setFile(evt.target.files[0]);

    setDisplayImage(URL.createObjectURL(evt.target.files[0]));
  };

  const multipleImage = (evt: any) => {
    setMultipleFile([...evt.target.files]);
  };

  const onChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;

    setProductDetail((prev) => ({ ...prev, [name]: value }));
  };

  const getInputFields = () => {
    setDisplayImage(state.singleProduct[0].photoURL);
    setProductDetail({
      product_name: state.singleProduct[0].product_name
        ? state.singleProduct[0].product_name
        : "",
      price: state.singleProduct[0].price ? state.singleProduct[0].price : "",
      quantity: state.singleProduct[0].quantity
        ? state.singleProduct[0].quantity
        : "",
      category: state.singleProduct[0].category
        ? state.singleProduct[0].category
        : "",
      description: state.singleProduct[0].description
        ? state.singleProduct[0].description
        : "",
    });
  };

  const close = () => dispatch(closeModal());

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();

    const formData = {
      id: query.slug,
      productInfo: productDetail,
      oldCoverImageName: state.singleProduct[0].coverImageName,
      newCoverImageFile: file,
      productImages: multipleFile,
      multipleURL: state.singleProduct[0].multipleURL,
    };

    dispatch(updateProduct(formData));

    setDisplayImage("");
    setMultipleFile([]);
    setProductDetail({
      product_name: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
    });
  };

  const delImage = (payload: any) => {
    const delInfo = {
      id: query.slug,
      delRef: payload,
      multipleURL: state.singleProduct[0].multipleURL,
    };
    dispatch(deleteProductImage(delInfo));
  };

  if (state.singleProduct.length === 0) {
    return (
      <>
        <ScreenLoader />
      </>
    );
  }

  return (
    <>
      {state.singleProduct === "No product" ? (
        <ScreenError message="No product" />
      ) : (
        <section className="pt-6 pb-20 lg:px-16 sm:px-8 px-6">
          <div className="grid place-content-end">
            <Link
              href="/dashboard"
              className="font-semibold  text-base text-center px-8 py-3 bg-red-400 text-white mb-8 rounded-md"
            >
              Dashboard
            </Link>
          </div>
          <div className="lg:p-8 sm:p-2 rounded-md md:shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-200">
            <div className="grid place-content-center my-4">
              <div
                className="py-3 px-8 text-white bg-red-400 rounded-md cursor-pointer font-medium"
                onClick={getInputFields}
              >
                Get Input Fields
              </div>
            </div>
            <h1 className="font-quicksand font-semibold lg:text-2xl text-2xl">
              Update Info
            </h1>
            <h2 className="font-quicksand text-base mt-4">
              Update necessary information, Prefill input fields by clicking the
              button above.
            </h2>

            <form onSubmit={submitHandler}>
              <div className="grid lg:grid-cols-8 sm:grid-cols-6 grid-cols-2 gap-8 my-6 lg:space-y-0 space-y-8">
                <div className="lg:col-span-2 sm:col-span-3 col-span-2">
                  <div className="w-full h-48 relative">
                    {displayImage ? (
                      <div className="">
                        <Image
                          priority={true}
                          unoptimized={true}
                          loader={() => `${displayImage}`}
                          src={displayImage}
                          alt="Cover Image"
                          width={50}
                          height={50}
                          className="h-full w-full object-cover"
                        />
                        <div
                          className="absolute bottom-2 right-2 p-2 rounded-full bg-white border-2 border-red-200 grid place-content-center"
                          onClick={imageInputClick}
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
                        </div>
                      </div>
                    ) : (
                      <div className="">
                        <Image
                          priority={true}
                          unoptimized={true}
                          loader={() =>
                            "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                          }
                          src={
                            "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                          }
                          alt="Cover Image"
                          width={50}
                          height={50}
                          className="h-full w-full object-cover"
                        />
                        <div
                          className="absolute bottom-2 right-2 p-2 rounded-full bg-white border-2 border-red-200 grid place-content-center"
                          onClick={imageInputClick}
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
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {state.singleProduct[0].multipleURL.length < 3 ? (
                  <h1 className="lg:col-span-2 sm:col-span-3 col-span-2 font-quicksand font-semibold text-red-400 flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-images"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                    </svg>
                    <span>Aleast two image photo should be present.</span>
                  </h1>
                ) : (
                  state.singleProduct[0].multipleURL.map(
                    (res: any, index: number) => {
                      return (
                        <Fragment key={index}>
                          <div className="lg:col-span-2 sm:col-span-3 col-span-2">
                            <div className="w-full h-48 relative">
                              <Image
                                priority={true}
                                unoptimized={true}
                                loader={() => `${res.imageURL}`}
                                src={res.imageURL}
                                alt={res.imageName}
                                width={50}
                                height={50}
                                className="h-full w-full object-cover"
                              />
                              <div
                                className="absolute top-2 right-2 p-2 rounded-full bg-white border-2 border-red-200 grid place-content-center"
                                onClick={() => delImage(res)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-x-lg fill-red-200 stroke-red-200"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      );
                    }
                  )
                )}
              </div>
              {/* <div className="grid place-content-center mb-12">
              {displayImage ? (
                <div className="sm:w-96 h-32 w-64 bg-red-200 relative">
                  <Image
                    src={displayImage}
                    alt=""
                    width={50}
                    height={50}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-white border-2 border-red-200 grid place-content-center"
                    onClick={imageInputClick}
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
                  </div>
                </div>
              ) : (
                <div
                  className="border-[1px] border-dashed border-red-400 grid place-content-center w-64 h-16 mt-8 mb-6 cursor-pointer"
                  onClick={imageInputClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-cloud-arrow-up fill-red-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                    />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                  </svg>
                </div>
              )}
            </div> */}

              <div className="grid lg:grid-cols-6 grid-cols-4 gap-6 mt-8">
                <input
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  accept="image/png, image/jpg, image/jpeg"
                  ref={image}
                  onChange={imageChange}
                />

                <div className="lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="font-quicksand" htmlFor="images">
                    Images
                  </label>
                  <input
                    id="images"
                    type="file"
                    multiple
                    onChange={multipleImage}
                    className="px-0 py-0 w-full outline-none border-[1px] border-slate-100 rounded-md text-red-500 mt-2"
                  />
                </div>
                <div className="lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="font-quicksand" htmlFor="product_name">
                    Product Name
                  </label>
                  <input
                    id="product_name"
                    type="text"
                    name="product_name"
                    value={productDetail.product_name}
                    onChange={onChangeHandler}
                    className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700 mt-2"
                  />
                </div>

                <div className="lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="font-quicksand" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={productDetail.price}
                    onChange={onChangeHandler}
                    className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700 mt-2"
                  />
                </div>

                <div className="lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="font-quicksand" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value={productDetail.quantity}
                    onChange={onChangeHandler}
                    className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700 mt-2"
                  />
                </div>

                <div className="lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="font-quicksand" htmlFor="category">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    name="category"
                    value={productDetail.category}
                    onChange={onChangeHandler}
                    className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700 mt-2"
                  />
                </div>

                <div className="col-span-4">
                  <label className="font-quicksand" htmlFor="description">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={productDetail.description}
                    onChange={onChangeHandler}
                    className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full h-[10rem] text-base text-slate-700 resize-none mt-2"
                  />
                </div>
              </div>
              <button className="w-full py-2 font-semibold text-white bg-red-400 rounded-md my-8">
                Update
              </button>
            </form>
          </div>
        </section>
      )}

      {state.loading ? <Loading /> : null}
      {state.error ? <Error message={state.error} close={close} /> : null}
      {state.success ? <Success message={state.success} close={close} /> : null}
      {state.delete_image_success ? (
        <DeleteImageSuccess message={state.delete_image_success} />
      ) : null}
    </>
  );
};

Edit.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Edit;
