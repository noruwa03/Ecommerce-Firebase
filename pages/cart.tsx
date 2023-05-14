import Tv from "@/assets/images/tv.jpg";
import BillingInfo from "@/components/screens/BillingInfo";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { useAppSelector, useAppDispatch } from "@/appHook/hooks";
import { removeItemFromCart, resetCart, closeModal } from "@/store/features/cart";
import CartMessage from "@/components/modal/CartMessage";
import Link from "next/link";

const Cart = () => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [cartItem, setCartItem] = useState<any>([]);

  useEffect(() => {
    setCartItem(cartState.cartItem);
  }, [cartState.cartItem]);

  const [showbillingForm, setBillingForm] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const billingHandler = (): any => setBillingForm(true);

  const remove = (id: string | any) => {
    dispatch(removeItemFromCart(id));
  };

  const close = () => {
    dispatch(closeModal());
  };

  const reset = () => {
    dispatch(resetCart());
  }

  const handleDecrement = (id: string | number) => {
    setCartItem((cart: any) => cart.map((item: any) => id === item.id ? {...item, quantity: item.quantity - (item.quantity > 1? 1:0)}: item));
  }

  const handleIncrement = (id: string | number) => {
    setCartItem((cart: any) =>
      cart.map((item: any) =>
        id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
          : item
      )
    );
  };

  return (
    <>
      {cartState.message.length > 0 ? (
        <CartMessage message={cartState.message} close={close} />
      ) : null}
      {cartState.cartItem.length === 0 ? (
        <div className="lg:pt-20 lg:pb-20 pt-32 pb-16">
          {" "}
          <div className="grid place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="currentColor"
              className="bi bi-bag-check fill-slate-700"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </div>
          <div className="text-center mt-6">
            {" "}
            <Link
              href="/"
              className="font-quicksand lg:text-lg text-base  text-slate-600 font-bold underline decoration-wavy decoration-red-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <section className="py-20 lg:px-28 md:px-8 px-6">
            <div className="flex items-center justify-between">
              <h1 className="font-quicksand font-semibold lg:text-3xl text-lg text-slate-800">
                Cart
              </h1>
              <button onClick={reset} className="py-2 px-2 border-b-2 border-slate-700 rounded-md text-sm font-semibold font-quicksand bg-white hover:bg-gray-50 flex items-center space-x-3 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                <span>Clear Cart</span>
              </button>
            </div>
            {cartItem.map((res: any) => {
              return (
                <Fragment key={res.id}>
                  {" "}
                  <div className="my-4">
                    <div className="grid lg:grid-cols-10 grid-cols-4 items-center lg:gap-6 gap-2 lg:py-0  py-6 ">
                      <div className="lg:col-span-2 col-span-2">
                        <Image
                          priority={true}
                          unoptimized={true}
                          loader={() => res.photoURL}
                          src={res.photoURL}
                          alt={res.id}
                          width={150}
                          height={150}
                          className="w-full"
                        />
                      </div>
                      <div className="lg:col-span-4 col-span-2">
                        <h2 className="font-quicksand font-bold sm:text-xl text-base capitalize">
                          {res.name}
                        </h2>
                        <h3 className="font-quicksand font-semibold sm:text-lg text-base capitalize">
                          # {res.price}
                        </h3>
                        <h3 className="font-quicksand font-semibold sm:text-lg text-sm capitalize">
                          Total Price:{" "}
                          {Number(res.quantity) * Number(res.price)}
                        </h3>
                      </div>
                      <div className="lg:col-span-2 col-span-2 flex flex-row items-center justify-between space-x-8">
                        <button
                          className="p-2 rounded-md shadow-sm shadow-gray-300"
                          onClick={() => handleDecrement(res.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                            />
                          </svg>
                        </button>

                        <h2 className="font-quicksand  text-base font-semibold">
                          {res.quantity}
                        </h2>

                        <button
                          className="p-2 rounded-md shadow-sm shadow-gray-300"
                          onClick={() => handleIncrement(res.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="lg:col-span-2 col-span-2 grid place-content-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3 cursor-pointer"
                          viewBox="0 0 16 16"
                          onClick={() => remove(res.id)}
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              );
            })}

            <div className="flex sm:flex-row items-center flex-col lg:space-y-0 space-y-4 justify-between mt-6">
              <h3 className="font-quicksand sm:text-2xl text-base font-semibold mt-5">
                Total price: 3321
              </h3>
              <button className="py-3 px-4 border-2 border-red-300 rounded-md text-red-300 sm:text-base text-sm font-semibold font-quicksand bg-white hover:bg-gray-50 flex items-center space-x-3 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-check2-circle fill-red-300 hover:fill-green-300"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>

                <span onClick={billingHandler}>Checkout</span>
              </button>
            </div>

            <>
              <div>{showbillingForm === true ? <BillingInfo /> : null}</div>
            </>
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
