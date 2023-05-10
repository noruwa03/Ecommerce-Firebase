import React from 'react'

const ScreenLoader = () => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full bg-[#000000] z-50">
        <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScreenLoader