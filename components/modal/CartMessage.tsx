import React from 'react'

interface ICART {
  message: string,
  close: () => void
}

const CartMessage = (props: ICART) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-50">
        <div className="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg">
          <div className="font-quicksand font-semibold lg:text-xl text-base text-center text-red-500 my-4">
            {props.message}
          </div>
          <div onClick={props.close} className="grid place-content-center my-6">
            <div className="font-quicksand px-8 py-2 text-sm bg-red-400 rounded-md text-white font-semibold cursor-pointer">
              Ok
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartMessage;