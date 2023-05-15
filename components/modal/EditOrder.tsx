import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/appHook/hooks";
import { updateOrder } from "@/store/features/order";
import { getAdminOrder } from "@/store/features/order";

interface IEDIT {
  id: string | any;
  status: string;
  close: () => void;
}

const EditOrder = (props: IEDIT) => {
  const [orderStatus, setOrderStatus] = useState(props.status);
  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setOrderStatus(evt.target.value);
  };

  const dispatch = useAppDispatch();

  const payload = {
    id: props.id,
    status: orderStatus,
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(updateOrder(payload)).unwrap().then(() => {
      props.close()
       dispatch(getAdminOrder());
    });
  };

  return (
    <>
      {" "}
      <div className="fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-20">
        <div className="lg:w-2/5 w-4/5 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-8 bg-white shadow-sm shadow-green-300 rounded-lg">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={orderStatus}
              onChange={changeHandler}
              className="outline-none border-[1px] border-gray-200 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-5 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-sm lg:text-base text-slate-700"
              required
            />
            <button className="w-full border-2 border-red-500 bg-red-500 py-2 outline-none text-white text-sm font-bold mt-0 rounded-lg">
              Update
            </button>
          </form>
          <button
            onClick={props.close}
            className="mt-3 w-full border-2 border-red-500 py-2 outline-none text-red-500 text-sm font-bold rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
