import { useState, FormEvent, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { storeOrder } from "@/store/features/order";


interface ICART {
  totalPrice: number;
  orderItem: [];
}

const BillingInfo = (props: ICART) => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    city: "",
    state: "",
    country: "",
    address: "",
  });

  const onChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = {
      uid: state.user.uid,
      totalPrice: props.totalPrice,
      customerDetail: info,
      orderItem: props.orderItem,
    };

    dispatch(storeOrder(formData))
  };
  return (
    <>
      <section className="py-20">
        <div className="lg:p-8 sm:p-4 rounded-md sm:shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-red-400">
          <h1 className="font-quicksand font-semibold lg:text-2xl text-2xl">
            Billing Info
          </h1>
          <h2 className="font-quicksand text-base mt-4">
            Add information like Full Name, Email etc.
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-6 grid-cols-4 gap-6 mt-8">
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <label className="font-quicksand " htmlFor="fullname">
                  Full Name
                </label>

                <input
                  type="text"
                  id="fullname"
                  required
                  name="fullname"
                  value={info.fullname}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md mt-2"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <label className="font-quicksand " htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  name="email"
                  value={info.email}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md mt-2"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <label className="font-quicksand " htmlFor="phone_no">
                  Phone No
                </label>

                <input
                  type="number"
                  required
                  name="phone_no"
                  value={info.phone_no}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md mt-2"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <label className="font-quicksand " htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  required
                  name="city"
                  value={info.city}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md mt-2"
                />
              </div>

              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <label className="font-quicksand " htmlFor="state">
                  State
                </label>

                <input
                  type="text"
                  required
                  name="state"
                  value={info.state}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md mt-2"
                />
              </div>
              <div className="lg:col-span-2 md:col-span-2 col-span-4">
                <label className="font-quicksand " htmlFor="country">
                  Country
                </label>

                <input
                  id="country"
                  type="text"
                  required
                  name="country"
                  value={info.country}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-full outline-none border-2 border-slate-100 rounded-md mt-2"
                />
              </div>

              <div className="col-span-4">
                <label className="font-quicksand " htmlFor="address">
                  Address
                </label>

                <textarea
                  name="address"
                  id="address"
                  required
                  value={info.address}
                  onChange={onChangeHandler}
                  className="px-3 py-2 h-[10rem] w-full outline-none border-2 border-slate-100 rounded-md resize-none mt-2"
                />
              </div>
            </div>
            <button className="w-full py-2  font-semibold text-white bg-red-400 rounded-md my-8">
              Continue
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default BillingInfo;
