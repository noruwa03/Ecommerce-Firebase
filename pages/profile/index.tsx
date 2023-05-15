import { NextPageWithLayout } from "../_app";
import type { FormEvent, ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import UnauthorizedUser from "@/components/modal/UnauthorizedUser";
import { updateUserProfile } from "@/store/features/auth";
import { Loading } from "@/components/loader/loading";
import Error from "@/components/modal/Error";
import Success from "@/components/modal/Success";
import { closeModal } from "@/store/features/auth";

const Profile: NextPageWithLayout = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>(
    state.user
      ? state.user.displayName
        ? state.user.displayName
        : ""
      : ""
  );
   const [userPhoneNo, setUserPhoneNo] = useState<string>(
     state.user ? (state.user.phone_no ? state.user.phone_no : "") : ""
   );

  const close = () => dispatch(closeModal());

  const [file, setFile] = useState<string | any>("");

  const [displayImage, setDisplayImage] = useState(
    state.user
      ? state.user.photoURL
        ? `${state.user.photoURL}`
        : ""
      : ""
  );

  const image = useRef<HTMLInputElement>(null);

  const imageInputClick = () => image.current?.click();

  const imageChange = (evt: any) => {
    setFile(evt.target.files[0]);

    setDisplayImage(URL.createObjectURL(evt.target.files[0]));
  };

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    const formData = {
      fullname: userName,
      phone_no: userPhoneNo,
      imageFile: file,
    };
    dispatch(updateUserProfile(formData));
  };

  if (!state.user) {
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
      <section className="lg:pt-14 pt-6 lg:px-16 sm:px-8 px-6 pb-16">
        <div className="grid place-content-end">
          <Link
            href="/dashboard"
            className="font-semibold  text-base text-center px-8 py-3 bg-red-400 text-white mb-8 rounded-md"
          >
            Dashboard
          </Link>
        </div>
        <form onSubmit={submitHandler}>
          <div className="lg:w-2/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5">
            <h1 className="font-quicksand  text-slate-700 font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-8 mb-16">
              Profile Information
            </h1>

            <div className="grid place-content-center mb-12">
              {displayImage ? (
                <div className="w-32 h-32 rounded-full relative">
                  <Image
                    priority={true}
                    unoptimized={true}
                    loader={() => displayImage}
                    src={displayImage}
                    alt=""
                    width={50}
                    height={50}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-1 p-2 rounded-full bg-gray-100 border-2 border-red-200 grid place-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                      onClick={imageInputClick}
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

            <input
              type="file"
              name=""
              id=""
              className="hidden"
              accept="image/png, image/jpg, image/jpeg"
              ref={image}
              onChange={imageChange}
            />

            <label
              htmlFor="userName"
              className="font-quicksand font-bold text-slate-700 text-sm"
            >
              Name
            </label>
            <input
              type="text"
              className="outline-none border-[1px] border-gray-100 focus:border-red-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-base text-slate-700"
              placeholder=""
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label
              htmlFor="userPhoneNo"
              className="font-quicksand font-bold text-slate-700 text-sm"
            >
              Phone No
            </label>
            <input
              type="tel"
              className="outline-none border-[1px] border-gray-100 focus:border-red-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-base text-slate-700"
             
              id="userPhoneNo"
              value={userPhoneNo}
              onChange={(e) => setUserPhoneNo(e.target.value)}
            />

            <button className="font-quicksand w-full bg-red-400 py-2 outline-none text-white text-sm font-bold my-6 rounded-lg">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

Profile.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Profile;
