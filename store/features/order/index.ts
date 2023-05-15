import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { addDoc, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface IORDER {
  loading: boolean;
  error: string;
  success: string;
  productOrder: any;
  productOrderDetail: any;
}

const initialState: IORDER = {
  loading: false,
  error: "",
  success: "",
  productOrder: [],
  productOrderDetail: [],
};

export const storeOrder = createAsyncThunk(
  "storeOrder/orderItem",
  async (payload: any) => {
    await addDoc(collection(firestore, "orders"), {
      uid: payload.uid,
      totalPrice: payload.totalPrice,
      customerDetail: payload.customerDetail,
      orderItem: payload.orderItem,
      paymentType: "Paypal",
      status: "Pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return "";
  }
);

export const getProductOrder = createAsyncThunk(
  "getProductOrder/fetchCustomerOrder",
  async (_, { getState }) => {
    const appState = getState() as RootState;

    const orderRef = collection(firestore, "orders");
    const orderQuery = query(
      orderRef,
      where("uid", "==", appState.auth.user.uid)
    );

    const orders = getDocs(orderQuery).then((docRes) => {
      if (docRes.empty) {
        return [];
      } else {
        const result: any = [];
        docRes.forEach((docData) => {
          result.push({ ...docData.data(), id: docData.id });
        });

        return result;
      }
    });

    return orders;
  }
);

export const getProductOrderDetail = createAsyncThunk(
  "getProductOrderDetail/fetchSingleProductOrder",
  async (payload: string | any) => {
    const docRef = doc(firestore, "orders", payload);

    const result = await getDoc(docRef);

    if (result.exists()) {
      const content: any = [];
      content.push({ ...result.data(), id: result.id });
      return content;
    } else {
      return "No product";
    }
  }
);



const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(storeOrder.rejected, (state) => {
      state.loading = false;
      state.error = "An error occured";
    });
    builder.addCase(storeOrder.fulfilled, (state) => {
      state.loading = false;
      state.success = "Checkout was successful";
    });

    // Orders
    builder.addCase(getProductOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductOrder.rejected, (state) => {
      state.loading = false;
      state.error = "An error occured";
    });
    builder.addCase(
      getProductOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.productOrder = action.payload;
      }
    );

    //Get Single Order Detail
    builder.addCase(getProductOrderDetail.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getProductOrderDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.productOrderDetail = action.payload;
        }
      );
  },
});

export default orderSlice.reducer;
export const { closeOrderModal } = orderSlice.actions;
