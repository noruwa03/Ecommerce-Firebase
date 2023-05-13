import React from "react";
import Link from "next/link";

const EmailVerification = () => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
        <div className="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-6 bg-white shadow-sm shadow-green-300 rounded-lg">
          <div className="font-quicksand font-semibold text-center text-slate-700 my-4">
            A link to verify your email will be sent to you shortly.
          </div>
          <div className="text-center my-6">
            <Link
              href="/dashboard"
              className="font-quicksand px-8 py-3 text-base bg-red-400 rounded-md text-white font-semibold"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
