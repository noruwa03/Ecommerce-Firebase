import React from 'react'

const BillingInfo = () => {
  return (
    <>
      <section className="py-20">
        <div className="lg:p-8 p-4 rounded-md shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-400">
          <h1 className="font-quicksand font-semibold lg:text-2xl text-2xl">
            Billing Info
          </h1>
          <h2 className="font-quicksand text-base mt-4">
            Add information like Full Name, Email etc.
          </h2>
          <form>
            <div className="grid lg:grid-cols-6 grid-cols-4 gap-6 mt-8">
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Full Name</h2>
                <input
                  type="text"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Email</h2>
                <input
                  type="email"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Phone No</h2>
                <input
                  type="number"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">City</h2>
                <input
                  type="text"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">State</h2>
                <input
                  type="text"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Country</h2>
                <input
                  type="text"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md"
                />
              </div>
              {/* <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <h2 className="font-quicksand mb-2">Pincode</h2>
                <input
                  type="number"
                  className="px-3 py-2 w-full outline-none border-2 border-slate-300 rounded-md"
                />
              </div> */}
              <div className="col-span-4">
                <h2 className="font-quicksand mb-2">Address</h2>
                <textarea
                  name=""
                  id=""
                  className="px-3 py-2 h-[10rem] w-full outline-none border-2 border-slate-100 rounded-md resize-none"
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
}

export default BillingInfo