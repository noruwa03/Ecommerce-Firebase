import { NextPageWithLayout } from "./_app";
import type { ReactElement, FormEvent } from "react";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import signupFlow from "@/assets/icons/signup.svg";
import Google from "@/assets/icons/google.svg";
import { Loading } from "@/components/loader/loading";
import { signUp, closeModal } from "@/store/features/auth";

import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import Error from "@/components/modal/Error";
import { UserInput } from "@/models/userInput.type";
import EmailVerification from "@/components/modal/EmailVerification";

const SignUp: NextPageWithLayout = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userInput: UserInput = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(userInput);
  const [passwordError, setPasswordError] = useState<string>("");

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (input.password.length < 6) {
      setPasswordError("Password should be greater than 6 characters");
    } else {
      setPasswordError("");
      dispatch(signUp(input));
    }
  };

  const close = () => dispatch(closeModal());

  return (
    <>
      {state.loading ? <Loading /> : null}
      {state.error ? <Error message={state.error} close={close} /> : null}
      {state.emailVerification ? <EmailVerification /> : null}
      <section className="lg:px-0 sm:px-8 px-6">
        <div className="grid lg:grid-cols-8 grid-cols-4">
          <div className="lg:col-span-4 lg:block hidden">
            {state.loading}
            <div className="w-full h-screen">
              <Image
                priority={true}
                unoptimized={true}
                loader={() => signupFlow}
                src={signupFlow}
                alt="Signup Flow"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="lg:col-span-4 col-span-4 lg:pt-32 lg:pb-0 pt-24 pb-16">
            <form onSubmit={submitHandler}>
              <div className="lg:w-3/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5 ">
                <h1 className="text-slate-700 font-serif font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-4 mb-8">
                  Sign up to <span className="text-red-400">shopper</span>Cart
                </h1>
                <div className="font-serif text-sm text-slate-700 text-start mb-6">
                  Already a member?{" "}
                  <Link href="/sign-in" className="text-red-400">
                    Sign in
                  </Link>
                </div>
                <label htmlFor="" className="text-slate-700 font-serif text-sm">
                  E-mail
                </label>
                <input
                  type="email"
                  className="outline-none border-[1px] border-gray-100 focus:border-red-400 px-4 py-3 rounded-lg w-full mb-5 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                  placeholder="name@gmail.com"
                  name="email"
                  value={input.email}
                  onChange={onChangeHandler}
                  required
                />
                <label htmlFor="" className="text-slate-700 font-serif text-sm">
                  Password
                </label>
                <input
                  type="password"
                  className="outline-none border-[1px] border-gray-100 focus:border-red-400 px-4 py-3 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                  placeholder="6+ characters"
                  name="password"
                  value={input.password}
                  onChange={onChangeHandler}
                  required
                />
                {passwordError.length > 0 ? (
                  <div v-show="error" className="text-red-400 text-xs">
                    {passwordError}
                  </div>
                ) : null}
                <button className="w-full bg-red-400 py-3 outline-none text-white font-serif text-sm font-bold my-6 rounded-lg">
                  Create an account
                </button>

                <div className="w-full px-4 py-3 shadow-sm shadow-gray-200  bg-white rounded-lg flex flex-row items-center justify-center text-slate-600 space-x-6 font-serif font-medium text-sm cursor-pointer hover:bg-gray-50">
                  <Image
                    src={Google}
                    alt="Google"
                    priority={true}
                    className="w-4 h-4"
                  />
                  <p>Sign in with Google</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

SignUp.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SignUp;
