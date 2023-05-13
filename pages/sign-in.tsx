import { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Google from "@/assets/icons/google.svg";
import SignInFlow from "@/assets/icons/signin.svg";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { UserInput } from "@/models/userInput.type";
import { Loading } from "@/components/loader/loading";
import Error from "@/components/modal/Error";
import { signIn, closeModal } from "@/store/features/auth";

const SignIn: NextPageWithLayout = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const userInput: UserInput = {
    email: "",
    password: "",
  };

  const [input, setInput] = useState(userInput);

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(signIn(input));
  };

  const close = () => dispatch(closeModal());

  return (
    <>
      {state.loading ? <Loading /> : null}
      {state.error ? <Error message={state.error} close={close} /> : null}
      <section className="lg:px-0 sm:px-8 px-6">
        <div className="grid lg:grid-cols-8 grid-cols-4">
          <div className="lg:col-span-4 col-span-4 lg:pt-32 lg:pb-0 pt-24 pb-16">
            <form onSubmit={submitHandler}>
              <div className="lg:w-3/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5">
                <h1 className="text-slate-700 font-serif font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-4 mb-8">
                  Welcome Back
                </h1>
                <div className="w-full px-4 py-3 shadow-sm shadow-gray-200 bg-white rounded-lg flex flex-row items-center text-slate-700 space-x-6 font-semibold text-sm cursor-pointer hover:bg-gray-50">
                  <Image
                    priority={true}
                    unoptimized={true}
                    loader={() => Google}
                    src={Google}
                    alt="Google"
                    className="w-4 h-4"
                  />
                  <p>Signin with Google</p>
                </div>
                <div className="uppercase lg:text-sm text-xs font-bold text-slate-500 font-serif text-center my-10">
                  Or Login with Email
                </div>

                <input
                  type="email"
                  className="outline-none border-[1px] border-gray-100 focus:border-red-400 px-4 py-2 rounded-lg w-full mb-4 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                  placeholder="name@gmail.com"
                  name="email"
                  value={input.email}
                  onChange={onChangeHandler}
                />
                <input
                  type="password"
                  className="outline-none border-[1px] border-gray-100 focus:border-red-400 px-4 py-2 rounded-lg w-full mb-4 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                  placeholder="********"
                  name="password"
                  value={input.password}
                  onChange={onChangeHandler}
                />
                <button className="w-full bg-red-400 py-2 outline-none text-white text-sm font-serif font-bold my-6 rounded-lg">
                  Sign in
                </button>
              </div>
            </form>
            <div className="font-serif text-sm text-slate-700 text-center">
              Don&apos;t have an account yet?
              <Link href="sign-up" className="text-red-400 ml-2">
                Sign up
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:block hidden">
            <div className="w-full h-screen">
              <Image
                src={SignInFlow}
                alt="Signin Flow"
                priority={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SignIn.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SignIn;
