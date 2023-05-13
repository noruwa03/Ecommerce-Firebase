import React from "react";

interface ISUCCESS {
  message: string;
}

const DeleteImageSuccess = (props: ISUCCESS) => {
  const reloadWindow = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-40">
        <div className="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg">
          <div className="font-quicksand font-semibold lg:text-xl text-base text-center text-green-500 my-4">
            {props.message}
          </div>
          <div className="grid place-content-center my-6">
            <div
              onClick={reloadWindow}
              className="font-quicksand px-8 py-2 text-sm bg-red-400 rounded-md text-white font-semibold cursor-pointer"
            >
              Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteImageSuccess;
