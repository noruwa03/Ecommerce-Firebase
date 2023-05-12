import Image from "next/image";
import { NextPageWithLayout } from "./_app";
import type { FormEvent, ReactElement } from "react";
import { ChangeEvent } from "react";
import SignInFlow from "@/assets/icons/signin.svg";
import Link from "next/link"
import { useState, useRef } from "react";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { storeProduct } from "../store/features/vendor";
import { Loading } from "@/components/loader/loading";
import Error from "@/components/modal/Error";
import Success from "@/components/modal/Success";
import { closeModal } from "../store/features/vendor";

const Create: NextPageWithLayout = () => {
  const state = useAppSelector((state) => state.vendor);
  const currentUser = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [productDetail, setProductDetail] = useState({
    product_name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  const [multipleFile, setMultipleFile] = useState<string | any>("");

  const [coverImage, setCoverImage] = useState("");

  const [displayImage, setDisplayImage] = useState("");

  const image = useRef<HTMLInputElement>(null);

  const imageInputClick = () => image.current?.click();

  const imageChange = (evt: any) => {
    setCoverImage(evt.target.files[0]);

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

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    const formData = {
      productInfo: productDetail,
      currentUserId: currentUser.user.uid,
      coverImage: coverImage,
      productImages: multipleFile,
    };

    dispatch(storeProduct(formData));
    setProductDetail({
      product_name: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
    });
    setCoverImage("");
    setMultipleFile("");
  };

  const close = () => dispatch(closeModal());

  if (!currentUser.user) {
    return (
      <>
        <UnauthorizedUser />
      </>
    );
  }

  return (
    <>
      {state.loading ? <Loading /> : null}
      {state.error ? <Error message={state.error} close={close} /> : null}
      {state.success ? <Success message={state.success} close={close} /> : null}
      <section className="pt-14 pb-20 lg:px-16 sm:px-8 px-6">
        <div className="grid place-content-end">
          <Link
            href="/dashboard"
            className="font-semibold  text-base text-center px-8 py-2 border-2 border-red-500 text-slate-900 mb-8 rounded-md"
          >
            Dashboard
          </Link>
        </div>
        <div className="lg:p-8 sm:p-2 rounded-md sm:shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-200">
          <h1 className="font-quicksand font-semibold lg:text-2xl text-xl">
            Product Info
          </h1>
          <h2 className="font-quicksand text-base mt-4 mb-12">
            Add common information like Product Name, Description etc.
          </h2>
          <form onSubmit={submitHandler}>
            <div className="grid place-content-center mb-12">
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
            </div>

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
                <h2 className="font-quicksand mb-2">Images</h2>
                <input
                  type="file"
                  multiple
                  onChange={multipleImage}
                  required
                  className="px-0 py-0 w-full outline-none border-[1px] border-slate-100 rounded-md text-red-500"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Product Name</h2>
                <input
                  type="text"
                  name="product_name"
                  value={productDetail.product_name}
                  onChange={onChangeHandler}
                  required
                  className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Price</h2>
                <input
                  type="number"
                  name="price"
                  value={productDetail.price}
                  onChange={onChangeHandler}
                  required
                  className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Quantity</h2>
                <input
                  type="number"
                  name="quantity"
                  value={productDetail.quantity}
                  onChange={onChangeHandler}
                  required
                  className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Category</h2>
                <input
                  type="text"
                  name="category"
                  value={productDetail.category}
                  onChange={onChangeHandler}
                  required
                  className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full text-base text-slate-700"
                />
              </div>

              <div className="col-span-4">
                <h2 className="font-quicksand mb-2">Description</h2>
                <textarea
                  id=""
                  name="description"
                  value={productDetail.description}
                  onChange={onChangeHandler}
                  required
                  className="outline-none border-[1px] border-gray-100 focus:border-red-300 px-4 py-2 rounded-lg w-full h-[10rem] text-base text-slate-700 resize-none"
                />
              </div>
            </div>
            <button className="px-6 py-2 font- font-semibold text-white bg-red-400 rounded-md my-8">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

Create.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Create;
