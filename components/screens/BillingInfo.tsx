import { useState, FormEvent, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { storeOrder } from "@/store/features/order";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface ICART {
  totalPrice: number;
  orderItem: [];
}

const BillingInfo = (props: ICART) => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [showPayPalCheckout, setShowPayPalCheckout] = useState(false);



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
    setShowPayPalCheckout(true);
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

          {showPayPalCheckout ? (
            <>
              {" "}
              <div className="fixed top-0 left-0 h-screen w-full bg-[#000000] z-50">
                <div className="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-x-circle absolute top-3 right-4"
                    viewBox="0 0 16 16"
                    onClick={() => setShowPayPalCheckout(false)}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                  <div className="mt-7">
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AbNlAGqctKCy3jOAlCopa41Iavz9AYGmNeQ9dfK81U9tQ3P0ztyss3PWE8nHJUnztdvAjtLxhjiJiPds",
                      }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: `${props.totalPrice}`,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data: any, actions: any) => {
                          return actions.order
                            .capture()
                            .then((details: any) => {
                              const formData = {
                                uid: state.user.uid,
                                totalPrice: props.totalPrice,
                                customerDetail: info,
                                orderItem: props.orderItem,
                                paymentID: details.id,
                              };

                              dispatch(storeOrder(formData));
                            });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default BillingInfo;
